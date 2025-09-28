'use server';
/**
 * @fileOverview Analyzes a field scan image to identify potential problems like pests, weeds, or nutrient deficiencies.
 *
 * - analyzeFieldScan - A function that analyzes the field scan and identifies potential problems.
 * - AnalyzeFieldScanInput - The input type for the analyzeFieldScan function.
 * - AnalyzeFieldScanOutput - The return type for the analyzeFieldScan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeFieldScanInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the field, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeFieldScanInput = z.infer<typeof AnalyzeFieldScanInputSchema>;

const AnalyzeFieldScanOutputSchema = z.object({
  problems: z
    .array(z.string())
    .describe('A list of potential problems identified in the field scan.'),
  confidenceScores: z
    .array(z.number())
    .describe('A list of confidence scores for each identified problem.'),
  suggestedTreatments: z
    .array(z.string())
    .describe('A list of suggested eco-friendly treatments for the identified problems.'),
});
export type AnalyzeFieldScanOutput = z.infer<typeof AnalyzeFieldScanOutputSchema>;

export async function analyzeFieldScan(input: AnalyzeFieldScanInput): Promise<AnalyzeFieldScanOutput> {
  return analyzeFieldScanFlow(input);
}

const analyzeFieldScanPrompt = ai.definePrompt({
  name: 'analyzeFieldScanPrompt',
  input: {schema: AnalyzeFieldScanInputSchema},
  output: {schema: AnalyzeFieldScanOutputSchema},
  prompt: `You are an expert agronomist specializing in identifying field problems from images.

You will analyze the provided image of a field and identify any potential problems, such as pests, weeds, or nutrient deficiencies. You will also provide confidence scores for each identified problem and suggest eco-friendly treatments approved under Sikkim’s organic policy.

Analyze the following field scan:
{{media url=photoDataUri}}`,
});

const analyzeFieldScanFlow = ai.defineFlow(
  {
    name: 'analyzeFieldScanFlow',
    inputSchema: AnalyzeFieldScanInputSchema,
    outputSchema: AnalyzeFieldScanOutputSchema,
  },
  async input => {
    const {output} = await analyzeFieldScanPrompt(input);
    return output!;
  }
);
