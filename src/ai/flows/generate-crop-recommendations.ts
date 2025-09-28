'use server';

/**
 * @fileOverview An AI agent that recommends crop choices based on weather, soil health, and government guidelines.
 *
 * - generateCropRecommendations - A function that handles the crop recommendation process.
 * - GenerateCropRecommendationsInput - The input type for the generateCropRecommendations function.
 * - GenerateCropRecommendationsOutput - The return type for the generateCropRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCropRecommendationsInputSchema = z.object({
  weatherPatterns: z
    .string()
    .describe('The local weather patterns including temperature, rainfall, and sunlight.'),
  soilHealthIndex: z.number().describe('A numerical index representing the soil health.'),
  governmentGuidelines: z
    .string()
    .describe('The relevant government guidelines and recommendations for crop selection.'),
});
export type GenerateCropRecommendationsInput = z.infer<
  typeof GenerateCropRecommendationsInputSchema
>;

const GenerateCropRecommendationsOutputSchema = z.object({
  cropRecommendations: z
    .string()
    .describe('A list of recommended crop choices with reasons for each recommendation.'),
  sustainabilityScore: z
    .number()
    .describe(
      'A score indicating the sustainability of the recommended crops based on organic input, water efficiency, and carbon footprint.'
    ),
});
export type GenerateCropRecommendationsOutput = z.infer<
  typeof GenerateCropRecommendationsOutputSchema
>;

export async function generateCropRecommendations(
  input: GenerateCropRecommendationsInput
): Promise<GenerateCropRecommendationsOutput> {
  return generateCropRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCropRecommendationsPrompt',
  input: {schema: GenerateCropRecommendationsInputSchema},
  output: {schema: GenerateCropRecommendationsOutputSchema},
  prompt: `You are an expert agricultural advisor. Based on the following information, recommend the best crop choices for the farmer.

Weather Patterns: {{{weatherPatterns}}}
Soil Health Index: {{{soilHealthIndex}}}
Government Guidelines: {{{governmentGuidelines}}}

Provide a list of recommended crop choices and a sustainability score. Explain the reasons for each recommendation.
`, safetySettings: [
    {
      category: 'HARM_CATEGORY_HATE_SPEECH',
      threshold: 'BLOCK_ONLY_HIGH',
    },
    {
      category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
      threshold: 'BLOCK_NONE',
    },
    {
      category: 'HARM_CATEGORY_HARASSMENT',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE',
    },
    {
      category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
      threshold: 'BLOCK_LOW_AND_ABOVE',
    },
  ],
});

const generateCropRecommendationsFlow = ai.defineFlow(
  {
    name: 'generateCropRecommendationsFlow',
    inputSchema: GenerateCropRecommendationsInputSchema,
    outputSchema: GenerateCropRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
