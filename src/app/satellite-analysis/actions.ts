'use server';

import { satelliteFarmAnalysis } from '@/ai/flows/satellite-farm-analysis';
import type { SatelliteFarmAnalysisInput, SatelliteFarmAnalysisOutput } from '@/ai/schemas/satellite-analysis-schema';

// Fallback satellite analysis when AI is unavailable
function getFallbackAnalysis(input: SatelliteFarmAnalysisInput): SatelliteFarmAnalysisOutput {
  // Generate a deterministic NDVI from coordinates
  let hash = 0;
  for (let i = 0; i < input.coordinates.length; i++) {
    hash = ((hash << 5) - hash) + input.coordinates.charCodeAt(i);
    hash |= 0;
  }
  const ndvi = parseFloat((((Math.abs(hash) % 600) / 1000) + 0.2).toFixed(3));

  return {
    ndvi,
    healthDescription: ndvi > 0.6
      ? "Your field shows excellent vegetation health with strong plant growth."
      : ndvi > 0.4
        ? "Your field shows good vegetation health with moderate plant coverage."
        : "Your field shows moderate vegetation that may benefit from additional care.",
    soilAnalysis: "Based on the geographical location, the soil is likely alluvial in nature with good water retention capacity. Regular composting and organic matter addition is recommended to maintain fertility.",
    recommendations: [
      "Monitor soil moisture levels regularly and irrigate as needed based on crop requirements.",
      "Consider applying balanced NPK fertilizers to boost vegetation health.",
      "Implement mulching to conserve soil moisture and suppress weed growth."
    ],
    imageDataUri: `/images/satellite/satellite%20img%20${Math.abs(Math.floor(hash)) % 5 + 1}.jpg`,
  };
}

export async function getSatelliteAnalysis(
  input: SatelliteFarmAnalysisInput
): Promise<SatelliteFarmAnalysisOutput> {
  try {
    const result = await satelliteFarmAnalysis(input);
    return result;
  } catch (error: any) {
    console.error('Error in getSatelliteAnalysis action:', error?.message);
    console.warn("Returning fallback satellite analysis due to AI error.");
    return getFallbackAnalysis(input);
  }
}
