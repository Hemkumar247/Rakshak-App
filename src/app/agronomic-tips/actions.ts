"use server";

import { diagnosePlantDisease, DiagnosePlantDiseaseInput, DiagnosePlantDiseaseOutput } from "@/ai/flows/diagnose-plant-disease";

// Fallback diagnosis when AI is unavailable
const fallbackDiagnosis: DiagnosePlantDiseaseOutput = {
    isPlant: true,
    plantName: "Unknown Plant",
    isHealthy: false,
    diseaseName: "Could not analyze — AI temporarily unavailable",
    diagnosis: [
        "The AI analysis service is temporarily unavailable due to high demand.",
        "Please try again in a few minutes for an accurate diagnosis.",
        "You can also consult your local agricultural extension officer."
    ],
    treatment: [
        "Ensure proper watering and drainage for your plant.",
        "Remove any visibly damaged or yellowing leaves.",
        "Consider using organic neem-based pesticide as a general precaution."
    ],
    prevention: [
        "Regularly monitor plants for early signs of disease.",
        "Maintain proper spacing between plants for air circulation.",
        "Use crop rotation to prevent soil-borne diseases."
    ],
};

export async function getPlantDiagnosis(input: DiagnosePlantDiseaseInput): Promise<DiagnosePlantDiseaseOutput> {
    try {
        const result = await diagnosePlantDisease(input);
        return result;
    } catch (error: any) {
        console.error("=== PLANT DIAGNOSIS FAILED ===");
        console.error("Error message:", error?.message);
        console.error("Full error:", JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
        console.warn("Returning fallback plant diagnosis.");
        return fallbackDiagnosis;
    }
}
