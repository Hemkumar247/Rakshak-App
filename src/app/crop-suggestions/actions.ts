"use server";

import { smartCropSuggestions, SmartCropSuggestionsInput, SmartCropSuggestionsOutput } from "@/ai/flows/smart-crop-suggestions";

// Fallback recommendations when AI is unavailable (rate limited, etc.)
const fallbackRecommendations: SmartCropSuggestionsOutput = {
  recommendations: [
    {
      cropName: "Wheat (गेहूँ)",
      reasoning: [
        "Ideal for Rabi season planting (October - December)",
        "Grows well in cool, dry conditions with moderate rainfall",
        "One of India's most profitable and high-demand cereals"
      ],
      imageDataUri: "/images/crops/wheat.jpg"
    },
    {
      cropName: "Mustard (सरसों)",
      reasoning: [
        "Low water requirement — perfect for semi-arid regions",
        "High demand for mustard oil across Indian markets",
        "Short growth cycle of 110-140 days allows quick returns"
      ],
      imageDataUri: "/images/crops/mustard.jpg"
    },
    {
      cropName: "Chickpea (चना)",
      reasoning: [
        "Legume crop that naturally enriches soil nitrogen levels",
        "Requires minimal irrigation and inputs",
        "Significant market demand as a staple Indian pulse"
      ],
      imageDataUri: "/images/crops/chickpea.jpg"
    }
  ]
};

export async function getSmartCropSuggestions(input: SmartCropSuggestionsInput): Promise<SmartCropSuggestionsOutput> {
  try {
    const result = await smartCropSuggestions(input);
    return result;
  } catch (error: any) {
    console.error("Error in getSmartCropSuggestions action:", error?.message);
    console.warn("Returning fallback crop suggestions due to AI error.");
    // Return fallback data instead of crashing so the app remains usable
    return fallbackRecommendations;
  }
}
