import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

/**
 * Collects all available Gemini API keys from environment variables.
 */
const apiKeys: string[] = [];

function loadKeys() {
  if (apiKeys.length > 0) return; // Already loaded
  const primary = process.env.GOOGLE_API_KEY || process.env.GOOGLE_GENAI_API_KEY || process.env.GEMINI_API_KEY;
  if (primary) apiKeys.push(primary);
  if (process.env.GEMINI_API_KEY_2) apiKeys.push(process.env.GEMINI_API_KEY_2);
  if (process.env.GEMINI_API_KEY_3) apiKeys.push(process.env.GEMINI_API_KEY_3);
  console.log(`[Genkit] Loaded ${apiKeys.length} API key(s) for rotation.`);
}

loadKeys();

/** Round-robin counter */
let _keyIdx = 0;

/** Get the next API key in rotation */
export function getNextKey(): string {
  if (apiKeys.length === 0) return '';
  const key = apiKeys[_keyIdx % apiKeys.length];
  _keyIdx++;
  return key;
}

// Default Genkit instance using the primary key
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: apiKeys[0] || '',
    }),
  ],
  model: 'googleai/gemini-2.0-flash',
});

/**
 * Creates a new Genkit instance using a specific API key.
 */
export function createAi(apiKey: string) {
  return genkit({
    plugins: [
      googleAI({ apiKey }),
    ],
    model: 'googleai/gemini-2.0-flash',
  });
}

/**
 * Helper to run an async function with exponential backoff retry.
 * On rate limit errors, rotates to the next API key before retrying.
 */
export async function withRetry<T>(fn: () => Promise<T>, maxRetries: number = 4): Promise<T> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      const status = error?.status || error?.code || error?.httpCode;
      const msg = String(error?.message || '');
      const isRetryable = status === 429 || status === 503 
        || msg.includes('429') || msg.includes('Too Many Requests') 
        || msg.includes('RESOURCE_EXHAUSTED') || msg.includes('quota');
      
      if (isRetryable && attempt < maxRetries) {
        // Rotate key index so next calls use a different key
        _keyIdx++;
        const nextKeyNum = (_keyIdx % apiKeys.length) + 1;
        const delay = Math.pow(2, attempt) * 1500 + Math.random() * 1000;
        console.warn(`[Genkit Retry] Rate limited. Will use key #${nextKeyNum}/${apiKeys.length}. Retrying in ${Math.round(delay)}ms... (attempt ${attempt + 1}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
  throw new Error('Max retries reached');
}
