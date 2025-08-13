'use server';
/**
 * @fileOverview A booking agent that checks for availability and confirms appointments.
 *
 * - createBooking - A function that handles the booking process.
 * - CreateBookingInput - The input type for the createBooking function.
 * - CreateBookingOutput - The return type for the createBooking function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

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

    // TODO: Integrate with Google Calendar API to check for real availability.
    // For now, we simulate the logic that was on the client: all Tuesdays are unavailable.
    if (selectedDate.getDay() === 2) {
      return {
        success: false,
        message: 'Sorry, that date is unavailable. Please choose another date.',
      };
    }
    
    // TODO: Integrate with Firestore to save the appointment.
    // TODO: Integrate with Gmail and Google Calendar to send notifications and create events.
    
    return {
      success: true,
      message: "We've received your request and will confirm via email shortly.",
    };
  }
);
