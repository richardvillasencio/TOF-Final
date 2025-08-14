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
  name: z.string().describe('The full name of the person making the booking.'),
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
const msalConfig = {
  auth: {
    clientId: process.env.AZURE_CLIENT_ID!,
    authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}`,
    clientSecret: process.env.AZURE_CLIENT_SECRET!,
  },
};

const cca = new ConfidentialClientApplication(msalConfig);
const CALENDAR_USER_ID = 'rv@derheiminc.com'; 

async function getGraphToken() {
  const clientCredentialRequest = {
    scopes: ['https://graph.microsoft.com/.default'],
  };
  return await cca.acquireTokenByClientCredential(clientCredentialRequest);
}

async function isTimeSlotAvailable(startTime: Date, endTime: Date): Promise<boolean> {
  try {
    const tokenResponse = await getGraphToken();
    if (!tokenResponse) {
      throw new Error('Could not acquire token for Graph API.');
    }

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
      availabilityViewInterval: 60, // Check in 60-minute intervals
    };

    const response = await fetch(scheduleApiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${tokenResponse.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error('Graph API Error:', response.status, errorBody);
        throw new Error(`Graph API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    // Check if there are any schedule items returned. If empty, the slot is free.
    const scheduleItems = data.value[0]?.scheduleItems || [];
    return scheduleItems.length === 0;

  } catch (error) {
    console.error('Error in isTimeSlotAvailable:', error);
    // Important: Fail-safe to prevent booking if the check fails.
    return false;
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
    const selectedDate = new Date(input.selectedDate);
    // Assume a 1-hour appointment for now
    const endDate = new Date(selectedDate.getTime() + 60 * 60 * 1000); 

    const isAvailable = await isTimeSlotAvailable(selectedDate, endDate);

    if (!isAvailable) {
      return {
        success: false,
        message: 'Sorry, that date is unavailable. Please choose another date.',
      };
    }
    
    // Save the appointment to Firestore
    if (adminDb) {
        try {
            const appointmentRef = adminDb.collection('appointments').doc();
            await appointmentRef.set({
                ...input,
                status: 'confirmed', // Status is confirmed as we've checked availability
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
         return {
            success: false,
            message: 'Database connection not available. Please try again later.',
        }
    }
    
    return {
      success: true,
      message: "Your appointment is confirmed! We look forward to seeing you.",
    };
  }
);
