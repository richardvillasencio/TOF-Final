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
import { google } from 'googleapis';


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


// --- Google Calendar Integration ---
const CALENDAR_ID = 'villasenciorichard@gmail.com';

async function isTimeSlotAvailable(startTime: Date, endTime: Date): Promise<boolean> {
    // This is where we will integrate with the Google Calendar API.
    // For now, we will simulate the check. In the next steps, we will replace this
    // with actual API calls after setting up authentication.
    console.log(`Simulating calendar check for ${startTime.toISOString()} to ${endTime.toISOString()}`);
    
    // TODO: Replace this with actual Google Calendar API call.
    // This placeholder will always return "unavailable" until we configure OAuth.
    return false;
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
                status: 'pending', // We'll update this after real calendar confirmation
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
    
    // TODO: Integrate with Gmail and Google Calendar to send notifications and create events.
    
    return {
      success: true,
      message: "We've received your request and will confirm via email shortly.",
    };
  }
);
