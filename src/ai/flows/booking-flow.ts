
'use server';
/**
 * @fileOverview A booking agent that checks for availability and confirms appointments.
 *
 * - createBooking - A function that handles the booking process.
 * - CreateBookingInput - The input type for the createBooking function.
 * - CreateBookingOutput - The return type for the createBooking function.
 */
import { ai } from '@/ai/genkit';
import { adminDb } from '@/lib/firebase/admin';
import { z } from 'genkit';
import { ConfidentialClientApplication } from '@azure/msal-node';

const CreateBookingInputSchema = z.object({
  name: z.string().describe('The full name of a person.'),
  email: z.string().email().describe('The email address of the person.'),
  phone: z.string().optional().describe('The phone number of the person.'),
  selectedDate: z.string().datetime().describe('The ISO 8601 string of the desired booking date.'),
});
export type CreateBookingInput = z.infer<typeof CreateBookingInputSchema>;

const CreateBookingOutputSchema = z.object({
  success: z.boolean().describe('Whether the booking was successful or not.'),
  message: z.string().describe('A message detailing the result of the booking attempt.'),
});
export type CreateBookingOutput = z.infer<typeof CreateBookingOutputSchema>;


// --- Microsoft Graph Integration ---
const CALENDAR_USER_ID = 'rv@derheiminc.com'; 

function getMsalClient() {
    if (!process.env.MS_CLIENT_ID || !process.env.MS_TENANT_ID || !process.env.MS_CLIENT_SECRET) {
        throw new Error("Azure client credentials are not configured correctly in environment variables.");
    }
    const msalConfig = {
      auth: {
        clientId: process.env.MS_CLIENT_ID,
        authority: `https://login.microsoftonline.com/${process.env.MS_TENANT_ID}`,
        clientSecret: process.env.MS_CLIENT_SECRET,
      },
    };
    return new ConfidentialClientApplication(msalConfig);
}

async function getGraphToken(cca: ConfidentialClientApplication) {
  const clientCredentialRequest = {
    scopes: ['https://graph.microsoft.com/.default'],
  };
  try {
    const tokenResponse = await cca.acquireTokenByClientCredential(clientCredentialRequest);
    if (!tokenResponse) {
      throw new Error('Could not acquire token for Graph API, response was empty.');
    }
    return tokenResponse.accessToken;
  } catch (error: any) {
    console.error("[Booking Flow] MSAL Error acquiring Graph API token:", {
        errorCode: error.errorCode,
        errorMessage: error.errorMessage,
        subError: error.subError,
        correlationId: error.correlationId,
    });
    // Do not expose detailed MSAL errors to the client.
    throw new Error('Failed to acquire authentication token for calendar service.');
  }
}

async function isTimeSlotAvailable(startTime: Date, endTime: Date, accessToken: string): Promise<boolean> {
  const scheduleApiUrl = `https://graph.microsoft.com/v1.0/users/${CALENDAR_USER_ID}/calendar/getSchedule`;
  
  const requestBody = {
    schedules: [CALENDAR_USER_ID],
    startTime: {
      dateTime: startTime.toISOString(),
      timeZone: 'UTC',
    },
    endTime: {
      dateTime: endTime.toISOString(),
      timeZone: 'UTC',
    },
  };

  try {
    const response = await fetch(scheduleApiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        Prefer: 'outlook.timezone="UTC"',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error('Microsoft Graph API Error Response:', {
            status: response.status,
            statusText: response.statusText,
            body: errorBody,
        });
        throw new Error(`Graph API request failed with status ${response.status}.`);
    }

    const data = await response.json();
    const scheduleItems = data.value[0]?.scheduleItems || [];
    return scheduleItems.length === 0;

  } catch (error: any) {
    console.error('[Booking Flow] Error in isTimeSlotAvailable during fetch:', error);
    // This is the error that will be propagated to the user-facing message.
    throw new Error('There was an error checking calendar availability. The service may be down.');
  }
}

async function createCalendarEvent(bookingDetails: CreateBookingInput, startTime: Date, endTime: Date, accessToken: string): Promise<void> {
    const createEventUrl = `https://graph.microsoft.com/v1.0/users/${CALENDAR_USER_ID}/events`;

    const event = {
        subject: `Showroom Visit: ${bookingDetails.name}`,
        body: {
            contentType: 'HTML',
            content: `
                A new showroom visit has been booked.<br/><br/>
                <b>Customer:</b> ${bookingDetails.name}<br/>
                <b>Email:</b> ${bookingDetails.email}<br/>
                <b>Phone:</b> ${bookingDetails.phone || 'Not provided'}<br/>
                <b>Time:</b> ${startTime.toLocaleString('en-US', { timeZone: 'UTC' })} - ${endTime.toLocaleString('en-US', { timeZone: 'UTC' })}<br/><br/>
                This is a virtual meeting.
            `,
        },
        start: {
            dateTime: startTime.toISOString(),
            timeZone: 'UTC',
        },
        end: {
            dateTime: endTime.toISOString(),
            timeZone: 'UTC',
        },
        attendees: [
            {
                emailAddress: {
                    address: bookingDetails.email,
                    name: bookingDetails.name,
                },
                type: 'required',
            },
        ],
        isOnlineMeeting: true,
        onlineMeetingProvider: 'teamsForBusiness'
    };

    try {
        const response = await fetch(createEventUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error('Microsoft Graph API Error creating calendar event:', {
                status: response.status,
                statusText: response.statusText,
                body: errorBody,
            });
            // Don't throw to the user, but log it. The booking is still made.
        } else {
            console.log(`[Booking Flow] Successfully created calendar event for ${bookingDetails.email}`);
        }
    } catch (error) {
        console.error('[Booking Flow] Failed to create calendar event:', error);
    }
}

async function sendConfirmationEmail(bookingDetails: CreateBookingInput, accessToken: string): Promise<void> {
    const sendMailUrl = `https://graph.microsoft.com/v1.0/users/${CALENDAR_USER_ID}/sendMail`;

    const formattedDate = new Date(bookingDetails.selectedDate).toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'UTC'
    });

    const emailBody = {
        message: {
            subject: "Your Showroom Visit is Confirmed!",
            body: {
                contentType: "HTML",
                content: `
                    <h1>Booking Confirmed!</h1>
                    <p>Hi ${bookingDetails.name},</p>
                    <p>Thank you for booking a visit with us. Your appointment is confirmed for:</p>
                    <p><b>${formattedDate}</b></p>
                    <p>A meeting link has been sent in a separate calendar invitation. We look forward to speaking with you!</p>
                    <p>If you need to reschedule, please contact us.</p>
                    <br/>
                    <p>Thank you,</p>
                    <p>The TubClone Team</p>
                `
            },
            toRecipients: [
                {
                    emailAddress: {
                        address: bookingDetails.email
                    }
                }
            ],
            ccRecipients: [
                 {
                    emailAddress: {
                        address: CALENDAR_USER_ID
                    }
                }
            ]
        },
        saveToSentItems: "true"
    };

    try {
        const response = await fetch(sendMailUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailBody)
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error('Microsoft Graph API Error sending email:', {
                status: response.status,
                statusText: response.statusText,
                body: errorBody,
            });
            // We don't throw an error here to the user, as the booking itself was successful.
            // We just log it for debugging.
        } else {
            console.log(`[Booking Flow] Successfully sent confirmation email to ${bookingDetails.email}`);
        }
    } catch (error) {
        console.error('[Booking Flow] Failed to send confirmation email:', error);
    }
}


// Exported wrapper function to be called from the client
export async function createBooking(input: CreateBookingInput): Promise<CreateBookingOutput> {
  return createBookingFlow(input);
}

const createBookingFlow = ai.defineFlow(
  {
    name: 'createBookingFlow',
    inputSchema: CreateBookingInputSchema,
    outputSchema: CreateBookingOutputSchema,
  },
  async (input) => {
    try {
        const cca = getMsalClient();
        const accessToken = await getGraphToken(cca);

        const selectedDate = new Date(input.selectedDate);
        const endDate = new Date(selectedDate.getTime() + 60 * 60 * 1000); 

        const isAvailable = await isTimeSlotAvailable(selectedDate, endDate, accessToken);

        if (!isAvailable) {
        return {
            success: false,
            message: 'Sorry, that date is unavailable. Please choose another date.',
        };
        }
        
        if (adminDb) {
            try {
                const appointmentRef = adminDb.collection('appointments').doc();
                await appointmentRef.set({
                    ...input,
                    status: 'confirmed',
                    createdAt: new Date().toISOString(),
                });
            } catch (error) {
                console.error('Error saving appointment to Firestore:', error);
                return {
                    success: false,
                    message: 'There was an error saving your appointment. Please try again.',
                }
            }
        } else {
             console.warn('Firestore Admin DB not available. Skipping database write.');
        }

        // Create the event in the calendar
        await createCalendarEvent(input, selectedDate, endDate, accessToken);

        // Send confirmation email after successful booking
        await sendConfirmationEmail(input, accessToken);
        
        return {
        success: true,
        message: "Your appointment is confirmed! We look forward to seeing you.",
        };
    } catch (err: any) {
         console.error('[Booking Flow] Flow execution failed:', err);
         const userMessage = err.message || 'An unexpected error occurred during the booking process.';
         // Avoid exposing internal implementation details from errors.
         if (userMessage.includes("credentials are not configured")) {
             return {
                 success: false,
                 message: 'The booking service is not configured correctly. Please contact the administrator.'
             }
         }
         return {
            success: false,
            message: userMessage,
         }
    }
  }
);
