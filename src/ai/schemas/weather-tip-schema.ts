/**
 * @fileOverview Zod schemas and TypeScript types for the weather-based farm tip flow.
 */
import {z} from 'genkit';

export const WeatherBasedFarmTipInputSchema = z.object({
  condition: z.string().describe("The weather condition for the day (e.g., 'Sunny', 'Partly Cloudy', 'Rain')."),
  tempHigh: z.number().describe('The high temperature for the day in Celsius.'),
  tempLow: z.number().describe('The low temperature for the day in Celsius.'),
  rainChance: z.number().describe('The percentage chance of rain.'),
  humidity: z.number().describe('The humidity percentage.'),
  language: z.string().describe("The language for the response (e.g., 'en' for English, 'hi' for Hindi, 'ta' for Tamil)."),
});
export type WeatherBasedFarmTipInput = z.infer<typeof WeatherBasedFarmTipInputSchema>;

export const WeatherBasedFarmTipOutputSchema = z.object({
  tip: z.string().describe('A short, actionable farming tip based on the weather conditions.'),
  analysis: z.string().describe('Detailed agronomist analysis of how the weather affects crops and soil.'),
  actionablePlan: z.array(z.string()).describe('A bulleted list of 3-4 specific steps for the farmer.'),
});
export type WeatherBasedFarmTipOutput = z.infer<typeof WeatherBasedFarmTipOutputSchema>;
