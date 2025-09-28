// This file is machine-generated - edit at your own risk.

'use server';

/**
 * @fileOverview An AI chatbot that answers farmer's agronomy questions, with optional image context.
 *
 * - answerAgronomyQuestions - A function that answers agronomy questions.
 * - AnswerAgronomyQuestionsInput - The input type for the answerAgronomyQuestions function.
 * - AnswerAgronomyQuestionsOutput - The return type for the answerAgronomyQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerAgronomyQuestionsInputSchema = z.object({
  query: z.string().describe('The agronomy question asked by the farmer.'),
  language: z.enum(['Nepali', 'Hindi', 'English']).describe('The language of the query.'),
  photoDataUri: z.optional(z.string().describe(
      "An optional photo related to the query, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    )),
});
export type AnswerAgronomyQuestionsInput = z.infer<typeof AnswerAgronomyQuestionsInputSchema>;

const AnswerAgronomyQuestionsOutputSchema = z.object({
  answer: z.string().describe('The answer to the agronomy question.'),
});
export type AnswerAgronomyQuestionsOutput = z.infer<typeof AnswerAgronomyQuestionsOutputSchema>;

export async function answerAgronomyQuestions(input: AnswerAgronomyQuestionsInput): Promise<AnswerAgronomyQuestionsOutput> {
  return answerAgronomyQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerAgronomyQuestionsPrompt',
  input: {schema: AnswerAgronomyQuestionsInputSchema},
  output: {schema: AnswerAgronomyQuestionsOutputSchema},
  prompt: `You are a multilingual AI assistant that helps farmers with their agronomy questions.
You are able to answer questions about organic pesticide mixes, sowing dates, and government subsidy eligibility.
If an image is provided, use it as the primary context for your answer.
You must respond in the same language as the query.

Here is the question: {{{query}}}
Language: {{{language}}}
{{#if photoDataUri}}
Image context:
{{media url=photoDataUri}}
{{/if}}
`,
});

const answerAgronomyQuestionsFlow = ai.defineFlow(
  {
    name: 'answerAgronomyQuestionsFlow',
    inputSchema: AnswerAgronomyQuestionsInputSchema,
    outputSchema: AnswerAgronomyQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
