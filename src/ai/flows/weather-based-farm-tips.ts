'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing farming tips based on weather conditions.
 *
 * @exports getWeatherBasedFarmTip - The main function to trigger the tip generation flow.
 */

import {ai, withRetry} from '@/ai/genkit';
import {
  WeatherBasedFarmTipInputSchema,
  WeatherBasedFarmTipOutputSchema,
  type WeatherBasedFarmTipInput,
  type WeatherBasedFarmTipOutput
} from '@/ai/schemas/weather-tip-schema';


export async function getWeatherBasedFarmTip(input: WeatherBasedFarmTipInput): Promise<WeatherBasedFarmTipOutput> {
  return weatherBasedFarmTipFlow(input);
}

const prompt = ai.definePrompt({
  name: 'weatherBasedFarmTipPrompt',
  input: {schema: WeatherBasedFarmTipInputSchema},
  output: {schema: WeatherBasedFarmTipOutputSchema},
  prompt: `You are an expert agronomist providing detailed, actionable farming advice based on weather parameters. 
  
  Please provide a comprehensive farming forecast considering the following weather data:
  - Weather Condition: {{condition}}
  - Temperature: High {{tempHigh}}°C, Low {{tempLow}}°C
  - Rain Probability: {{rainChance}}%
  - Average Humidity: {{humidity}}%

  Your response MUST include:
  1. **Tip**: A very short (one sentence) headline tip.
  2. **Analysis**: A deeper technical analysis (2-3 sentences). Explain how these specific numbers impact:
     - Evapotranspiration (how fast plants lose water)
     - Soil heat and moisture retention
     - Risk of pests/fungus (based on humidity/temp)
  3. **Actionable Plan**: A list of 3-4 specific, short steps the farmer should take TODAY or TOMORROW.
     - Include advice on irrigation (Increase/Decrease/Skip)
     - Advice on general crop protection measures

  The entire response MUST be in the following language: {{language}}.`,
});


const weatherBasedFarmTipFlow = ai.defineFlow(
  {
    name: 'weatherBasedFarmTipFlow',
    inputSchema: WeatherBasedFarmTipInputSchema,
    outputSchema: WeatherBasedFarmTipOutputSchema,
  },
  async input => {
    const {output} = await withRetry(() => prompt(input));
    return output!;
  }
);
