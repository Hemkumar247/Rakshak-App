"use server";

import type { WeatherBasedFarmTipInput, WeatherBasedFarmTipOutput } from "@/ai/schemas/weather-tip-schema";
import { getMockWeatherProfile, type MockWeatherProfile } from "./mock-weather-db";

export interface WeatherData {
    locationName: string;
    current: {
      temperature: number;
      humidity: number;
      windSpeed: number;
      condition: string;
      feelsLike: number;
      uvIndex: number;
    };
    forecast: {
      day: string;
      condition: string;
      high: number;
      low: number;
      humidity: number;
      rainChance: number;
      windSpeed: number;
      uvIndex: number;
      icon: any;
    }[];
    weeklyFarmPlan: string[];
    weeklyAnalysis: string;
}

export async function getAIFarmTip(input: WeatherBasedFarmTipInput): Promise<WeatherBasedFarmTipOutput> {
    return { 
      tip: "Optimize irrigation for high heat retention.",
      analysis: "Current conditions indicate high evapotranspiration rates. Soil heat is likely elevated which may stress shallow-rooted crops.",
      actionablePlan: [
        "Apply mulch to retain soil moisture.",
        "Schedule irrigation before 8 AM.",
        "Inspect for pest activity.",
      ]
    };
}

export async function getRealtimeWeather(location: string): Promise<WeatherData> {
    // Instantly load from mock database — no network calls needed
    const profile: MockWeatherProfile = getMockWeatherProfile(location);

    return {
        locationName: profile.locationName,
        current: profile.current,
        forecast: profile.forecast.map(day => ({
            ...day,
            icon: null, // Mapped on client side
        })),
        weeklyFarmPlan: profile.weeklyFarmPlan,
        weeklyAnalysis: profile.weeklyAnalysis,
    };
}
