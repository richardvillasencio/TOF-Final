
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
    const msalConfig = {
      auth: {
        clientId: process.env.AZURE_CLIENT_ID!,
        authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}`,
        clientSecret: process.env.AZURE_CLIENT_SECRET!,
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
      throw new Error('Could not acquire token for Graph API.');
    }
    return tokenResponse.accessToken;
  } catch (error) {
    console.error("[Booking Flow] Error acquiring Graph API token:", error);
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
    throw new Error('There was an error checking calendar availability. The service may be down.');
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
        if (!process.env.AZURE_CLIENT_ID || !process.env.AZURE_TENANT_ID || !process.env.AZURE_CLIENT_SECRET) {
            console.error('Azure client credentials are not configured correctly. Check your environment variables.');
            return {
                success: false,
                message: 'The booking service is not configured correctly. Please contact the administrator.',
            }
        }

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
        
        return {
        success: true,
        message: "Your appointment is confirmed! We look forward to seeing you.",
        };
    } catch (err: any) {
         console.error('[Booking Flow] Flow execution failed:', err);
         return {
            success: false,
            message: err.message || 'An unexpected error occurred during the booking process.',
         }
    }
  }
);
