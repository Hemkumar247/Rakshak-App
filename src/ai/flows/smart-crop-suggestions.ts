'use server';

/**
 * @fileOverview Smart crop suggestions flow with multi-key rotation.
 */

import {ai, createAi, getNextKey, withRetry} from '@/ai/genkit';
import {z} from 'genkit';
import fs from 'fs';
import path from 'path';

/** Utility to get crops from the local filesystem at runtime */
function getAvailableCrops(): string[] {
  try {
    const cropsDir = path.join(process.cwd(), 'public', 'images', 'crops');
    const files = fs.readdirSync(cropsDir);
    return files
      .filter(f => f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.jpeg'))
      .map(f => {
        const name = f.split('.')[0];
        // Capitalize for the AI prompt
        return name.charAt(0).toUpperCase() + name.slice(1);
      });
  } catch (error) {
    console.error('Failed to read crops directory:', error);
    return ['Wheat', 'Mustard', 'Chickpea', 'Cotton', 'Rice', 'Maize']; // Hard fallback
  }
}

const SmartCropSuggestionsInputSchema = z.object({
  farmLocation: z
    .string()
    .describe('The geographical location of the farm (e.g., city, state, country, or specific address).'),
  language: z.string().describe("The language for the response (e.g., 'en' for English, 'hi' for Hindi, 'ta' for Tamil)."),
});
export type SmartCropSuggestionsInput = z.infer<typeof SmartCropSuggestionsInputSchema>;

const CropRecommendationSchema = z.object({
    cropName: z.string().describe('The name of the suggested crop.'),
    reasoning: z.array(z.string()).describe('A short, crisp list of reasons why this crop is a good choice.'),
    fertilizerRecommendations: z.array(z.string()).describe('Recommended fertilizers and usage instructions to maintain soil health and improve productivity.').optional(),
    imageDataUri: z.string().describe("A generated image of the crop.").optional(),
});

const SmartCropSuggestionsOutputSchema = z.object({
  recommendations: z
    .array(CropRecommendationSchema)
    .describe('A list of crop recommendations.'),
});
export type SmartCropSuggestionsOutput = z.infer<typeof SmartCropSuggestionsOutputSchema>;

export async function smartCropSuggestions(input: SmartCropSuggestionsInput): Promise<SmartCropSuggestionsOutput> {
  return smartCropSuggestionsFlow(input);
}

const smartCropSuggestionsFlow = ai.defineFlow(
  {
    name: 'smartCropSuggestionsFlow',
    inputSchema: SmartCropSuggestionsInputSchema,
    outputSchema: SmartCropSuggestionsOutputSchema,
  },
  async (input) => {
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const supportedCrops = getAvailableCrops();

    // Dynamically define the prompt body to include the current filesystem crops
    const promptBody = `You are an expert agronomist AI, and your task is to provide seasonal crop recommendations. Today's date is ${currentDate}.

  Based on the farm's location, analyze the regional climate, typical soil types, and the current season.
  
  Recommend a list of the 3 most suitable crops for cultivation at this specific time of year in that location. 
  
  CRITICAL INSTRUCTION: You MUST ONLY recommend crops that exist in this exact list of available database items:
  ${supportedCrops.join(', ')}
  
  For each crop, provide a brief, easy-to-understand list of reasons why it is a good choice, and 2-3 specific fertilizer recommendations such that the soil maintains its nature and becomes more adaptable for crop cultivation.
  
  The entire response, including crop names, reasoning, and fertilizer suggestions, must be in the following language: ${input.language}.

  Farm Location: ${input.farmLocation}
  
  Keep the advice very concise and simple for a farmer to understand.`;

    // Execute generation with the dynamic prompt
    const {output} = await withRetry(() => ai.generate({
      prompt: promptBody,
      output: { schema: SmartCropSuggestionsOutputSchema },
      config: { temperature: 0 }
    }));

    if (!output?.recommendations) {
      return { recommendations: [] };
    }

    // Map crops directly to the local images we created in public/images/crops
    for (const rec of output.recommendations) {
      // Find which local file match this suggestion
      const englishMatch = supportedCrops.find(c => rec.cropName.toLowerCase().includes(c.toLowerCase()));
      const imageName = englishMatch ? englishMatch.toLowerCase() : 'wheat';
      
      // Check for common extensions
      const cropsDir = path.join(process.cwd(), 'public', 'images', 'crops');
      let finalExt = 'jpg';
      if (fs.existsSync(path.join(cropsDir, `${imageName}.png`))) finalExt = 'png';
      if (fs.existsSync(path.join(cropsDir, `${imageName}.jpeg`))) finalExt = 'jpeg';
      
      rec.imageDataUri = `/images/crops/${imageName}.${finalExt}`;
    }

    return { recommendations: output.recommendations };
  }
);
