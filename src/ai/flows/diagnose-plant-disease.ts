'use server';
/**
 * @fileOverview Plant disease diagnosis flow with multi-key rotation.
 * Completely rewritten for production stability.
 */

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'genkit';

const DiagnosePlantDiseaseInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a plant, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  userDescription: z.string().describe('Optional user-provided description of the plant and its symptoms.'),
  language: z.string().describe("The language for the response (e.g., 'en' for English, 'hi' for Hindi, 'ta' for Tamil)."),
});
export type DiagnosePlantDiseaseInput = z.infer<typeof DiagnosePlantDiseaseInputSchema>;

const DiagnosePlantDiseaseOutputSchema = z.object({
  isPlant: z.boolean().describe('Whether the image contains a plant or not.'),
  plantName: z.string().describe("The common name of the identified plant. 'Unknown' if not identifiable."),
  isHealthy: z.boolean().describe('Whether the plant appears to be healthy.'),
  diseaseName: z.string().describe("The common name of the identified disease. 'None' if healthy."),
  diagnosis: z.array(z.string()).describe("A short, crisp list of observations about the plant's health from the image."),
  treatment: z.array(z.string()).describe("A short, crisp list of recommended steps to treat the disease."),
  prevention: z.array(z.string()).describe("A short, crisp list of tips to prevent this disease in the future."),
  diseaseImageUrl: z.string().optional().describe('A reference image URL for the disease.'),
});
export type DiagnosePlantDiseaseOutput = z.infer<typeof DiagnosePlantDiseaseOutputSchema>;

/**
 * Collect all available API keys for rotation.
 */
function getAllKeys(): string[] {
  const keys: string[] = [];
  const primary = process.env.GOOGLE_API_KEY || process.env.GOOGLE_GENAI_API_KEY || process.env.GEMINI_API_KEY;
  if (primary) keys.push(primary);
  if (process.env.GEMINI_API_KEY_2) keys.push(process.env.GEMINI_API_KEY_2);
  if (process.env.GEMINI_API_KEY_3) keys.push(process.env.GEMINI_API_KEY_3);
  return keys;
}

let _keyIndex = 0;

/**
 * Create a fresh Genkit AI instance with a specific key.
 */
function makeAi(apiKey: string) {
  return genkit({
    plugins: [googleAI({ apiKey })],
    model: 'googleai/gemini-2.0-flash',
  });
}

/**
 * Main exported function.
 */
export async function diagnosePlantDisease(input: DiagnosePlantDiseaseInput): Promise<DiagnosePlantDiseaseOutput> {
  const keys = getAllKeys();
  if (keys.length === 0) {
    throw new Error('No Gemini API keys configured. Please set GEMINI_API_KEY in your .env file.');
  }

  const maxRetries = Math.max(keys.length * 2, 4);
  let lastError: any = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const currentKey = keys[_keyIndex % keys.length];
    const currentKeyNum = (_keyIndex % keys.length) + 1;

    try {
      console.log(`[Plant Diagnosis] Attempt ${attempt + 1}/${maxRetries} using key #${currentKeyNum}/${keys.length}`);
      
      const currentAi = makeAi(currentKey);

      const { output: diagnosisResult } = await currentAi.generate({
        prompt: [
          { media: { url: input.photoDataUri } },
          { text: `You are Rakshak AI, an expert plant pathologist and botanist. Your task is to analyze this image of a plant and provide a detailed diagnosis.

Analyze the provided image and the user's description to identify the plant and any diseases or pests affecting it.

Based on your analysis, provide the following in valid JSON format:
1.  "isPlant" (boolean): Determine if the image actually contains a plant.
2.  "plantName" (string): The common name of the plant.
3.  "isHealthy" (boolean): State if the plant is healthy or not.
4.  "diseaseName" (string): The specific name of the disease or pest. If healthy, this should be "None".
5.  "diagnosis" (array of strings): A concise, easy-to-understand list of what is wrong with the plant.
6.  "treatment" (array of strings): A simple, actionable list of steps the farmer can take to treat the issue.
7.  "prevention" (array of strings): A simple, actionable list of steps to prevent the issue from happening again.

Do NOT include the "diseaseImageUrl" field in your response.

The entire response, including all names and descriptions, must be in the following language: ${input.language}.

User's Description: ${input.userDescription || 'No description provided.'}` },
        ],
        output: { schema: DiagnosePlantDiseaseOutputSchema },
        config: { temperature: 0.2 },
      });

      if (!diagnosisResult) {
        throw new Error('AI returned an empty response.');
      }

      // Successfully got a diagnosis — now fetch a reference image (non-critical)
      if (!diagnosisResult.isHealthy && diagnosisResult.diseaseName && diagnosisResult.diseaseName !== 'None') {
        diagnosisResult.diseaseImageUrl = await fetchReferenceImage(
          diagnosisResult.diseaseName,
          diagnosisResult.plantName
        );
      }

      return diagnosisResult;

    } catch (error: any) {
      lastError = error;
      const msg = String(error?.message || '');
      const isRateLimit = msg.includes('429') || msg.includes('Too Many Requests') 
        || msg.includes('RESOURCE_EXHAUSTED') || msg.includes('quota')
        || error?.status === 429 || error?.status === 503;

      if (isRateLimit && attempt < maxRetries - 1) {
        _keyIndex++;
        const delay = Math.pow(2, attempt) * 1500 + Math.random() * 1000;
        console.warn(`[Plant Diagnosis] Rate limited. Switching to key #${(_keyIndex % keys.length) + 1}. Retrying in ${Math.round(delay)}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else if (attempt < maxRetries - 1) {
        // Non-rate-limit error — still retry once with a different key
        _keyIndex++;
        console.warn(`[Plant Diagnosis] Error: ${msg.substring(0, 200)}. Retrying with next key...`);
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else {
        console.error(`[Plant Diagnosis] All ${maxRetries} attempts failed. Last error: ${msg.substring(0, 300)}`);
        throw lastError;
      }
    }
  }

  throw lastError || new Error('Diagnosis failed after all retries.');
}

/**
 * Fetch a reference image from Wikipedia for the diagnosed disease.
 * This is non-critical — always returns a fallback on failure.
 */
async function fetchReferenceImage(diseaseName: string, plantName: string): Promise<string> {
  try {
    // First try: search for the specific disease
    const searchName = diseaseName.split('(')[0].trim();
    const res = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(searchName)}&prop=pageimages&format=json&pithumbsize=600`,
      { signal: AbortSignal.timeout(5000) }
    );
    const data = await res.json();
    const pages = data?.query?.pages;

    if (pages) {
      const pageId = Object.keys(pages)[0];
      if (pageId && pageId !== '-1' && pages[pageId].thumbnail) {
        return pages[pageId].thumbnail.source;
      }
    }

    // Second try: search for the plant name
    const fallbackSearch = plantName.split('(')[0].trim();
    const res2 = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(fallbackSearch)}&prop=pageimages&format=json&pithumbsize=600`,
      { signal: AbortSignal.timeout(5000) }
    );
    const data2 = await res2.json();
    const pages2 = data2?.query?.pages;

    if (pages2) {
      const pageId = Object.keys(pages2)[0];
      if (pageId && pageId !== '-1' && pages2[pageId].thumbnail) {
        return pages2[pageId].thumbnail.source;
      }
    }
  } catch (e) {
    console.warn('[Plant Diagnosis] Reference image fetch failed, using fallback.');
  }

  // Final fallback — a generic plant disease stock photo (already whitelisted in next.config.ts)
  return 'https://images.unsplash.com/photo-1596541656008-012543ebbf98?auto=format&fit=crop&q=80&w=800';
}
