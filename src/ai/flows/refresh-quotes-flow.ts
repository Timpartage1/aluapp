'use server';

/**
 * @fileOverview Refreshes quotes in the Firestore database using GenAI to rewrite them and make them more relevant.
 *
 * - refreshQuotes - A function that handles the refreshing of quotes.
 * - RefreshQuotesInput - The input type for the refreshQuotes function.
 * - RefreshQuotesOutput - The return type for the refreshQuotes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RefreshQuotesInputSchema = z.object({
  category: z.string().describe('The category of quotes to refresh (e.g., Excellence, Relationships).'),
  quotes: z.array(z.string()).describe('The array of existing quotes to refresh.'),
});
export type RefreshQuotesInput = z.infer<typeof RefreshQuotesInputSchema>;

const RefreshQuotesOutputSchema = z.object({
  refreshedQuotes: z.array(z.string()).describe('The array of refreshed quotes.'),
});
export type RefreshQuotesOutput = z.infer<typeof RefreshQuotesOutputSchema>;

export async function refreshQuotes(input: RefreshQuotesInput): Promise<RefreshQuotesOutput> {
  return refreshQuotesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'refreshQuotesPrompt',
  input: {schema: RefreshQuotesInputSchema},
  output: {schema: RefreshQuotesOutputSchema},
  prompt: `You are an AI assistant designed to rewrite quotes to make them more relevant to the current date.

  Category: {{{category}}}

  Original Quotes:
  {{#each quotes}}{{{this}}}\n{{/each}}

  Refreshed Quotes: Rewrite the original quotes from the category above, so that they are more relevant to the current date. Return the refreshed quotes in an array.
  Ensure that the refreshed quotes retain the original meaning and intent.
  Do not add or remove quotes, only rewrite them.
  Do not include the category, only the rewritten quotes.
  The output should be a JSON array of strings representing the rewritten quotes.
  `,
});

const refreshQuotesFlow = ai.defineFlow(
  {
    name: 'refreshQuotesFlow',
    inputSchema: RefreshQuotesInputSchema,
    outputSchema: RefreshQuotesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
