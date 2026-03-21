/**
 * Mock Weather Database
 * Pre-computed, realistic agricultural weather data for instant loading.
 * Contains 5 distinct regional profiles based on real March 2026 climate patterns.
 */

export interface MockForecastDay {
  day: string;
  condition: string;
  high: number;
  low: number;
  humidity: number;
  rainChance: number;
  windSpeed: number;
  uvIndex: number;
}

export interface MockWeatherProfile {
  locationName: string;
  current: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    condition: string;
    feelsLike: number;
    uvIndex: number;
  };
  forecast: MockForecastDay[];
  weeklyFarmPlan: string[];
  weeklyAnalysis: string;
}

// ─── PROFILE 1: CHENNAI / TAMIL NADU ────────────────────────────────────────

const CHENNAI_PROFILE: MockWeatherProfile = {
  locationName: "Chennai, Tamil Nadu",
  current: {
    temperature: 31,
    humidity: 62,
    windSpeed: 14,
    condition: "Sunny",
    feelsLike: 34,
    uvIndex: 9,
  },
  forecast: [
    { day: "Today",     condition: "Sunny",         high: 31, low: 26, humidity: 60, rainChance: 15, windSpeed: 14, uvIndex: 9 },
    { day: "Tomorrow",  condition: "Sunny",         high: 31, low: 26, humidity: 58, rainChance: 10, windSpeed: 12, uvIndex: 9 },
    { day: "Monday",    condition: "Partly Cloudy", high: 31, low: 25, humidity: 61, rainChance: 15, windSpeed: 11, uvIndex: 8 },
    { day: "Tuesday",   condition: "Clear",         high: 32, low: 25, humidity: 55, rainChance: 5,  windSpeed: 10, uvIndex: 9 },
    { day: "Wednesday", condition: "Sunny",         high: 32, low: 25, humidity: 54, rainChance: 0,  windSpeed: 13, uvIndex: 10 },
    { day: "Thursday",  condition: "Partly Cloudy", high: 31, low: 24, humidity: 65, rainChance: 5,  windSpeed: 15, uvIndex: 7 },
    { day: "Friday",    condition: "Sunny",         high: 32, low: 25, humidity: 52, rainChance: 0,  windSpeed: 14, uvIndex: 9 },
  ],
  weeklyFarmPlan: [
    "Irrigate fields early morning (before 7 AM) to minimize evapotranspiration losses during the 31-32°C daytime heat.",
    "Apply mulch (rice straw or coco-peat) around root zones to retain soil moisture through the consistently dry week ahead.",
    "Scout for aphids and whiteflies — warm, dry conditions with 52-65% humidity are ideal for pest outbreaks.",
  ],
  weeklyAnalysis: "This week's forecast indicates a sustained dry spell with temperatures ranging 31-32°C and humidity between 52-65%. High UV index (7-10) will accelerate evapotranspiration, so expect soil moisture depletion by mid-week. The minimal rain chance (0-15%) means irrigation is critical. Wind speeds of 10-15 kph will further dry exposed topsoil. Overall, conditions favor rapid crop growth but demand disciplined water management.",
};

// ─── PROFILE 2: BANGALORE / KARNATAKA ───────────────────────────────────────

const BANGALORE_PROFILE: MockWeatherProfile = {
  locationName: "Bangalore, Karnataka",
  current: {
    temperature: 28,
    humidity: 55,
    windSpeed: 10,
    condition: "Partly Cloudy",
    feelsLike: 30,
    uvIndex: 7,
  },
  forecast: [
    { day: "Today",     condition: "Partly Cloudy", high: 28, low: 19, humidity: 55, rainChance: 20, windSpeed: 10, uvIndex: 7 },
    { day: "Tomorrow",  condition: "Sunny",         high: 29, low: 19, humidity: 50, rainChance: 10, windSpeed: 9,  uvIndex: 8 },
    { day: "Monday",    condition: "Sunny",         high: 30, low: 20, humidity: 48, rainChance: 5,  windSpeed: 8,  uvIndex: 9 },
    { day: "Tuesday",   condition: "Partly Cloudy", high: 29, low: 20, humidity: 52, rainChance: 15, windSpeed: 11, uvIndex: 7 },
    { day: "Wednesday", condition: "Light Rain",    high: 27, low: 19, humidity: 70, rainChance: 60, windSpeed: 14, uvIndex: 4 },
    { day: "Thursday",  condition: "Cloudy",        high: 26, low: 18, humidity: 72, rainChance: 40, windSpeed: 12, uvIndex: 3 },
    { day: "Friday",    condition: "Partly Cloudy", high: 28, low: 19, humidity: 58, rainChance: 15, windSpeed: 10, uvIndex: 6 },
  ],
  weeklyFarmPlan: [
    "Prepare fields for mid-week rain — clear drainage channels and avoid fertilizer application on Monday/Tuesday to prevent runoff.",
    "Delay pesticide spraying until after Wednesday's expected showers to prevent wash-off and maximize chemical efficacy.",
    "Harvest any mature produce before Wednesday to avoid rain damage to exposed crops.",
  ],
  weeklyAnalysis: "Bangalore expects a mixed week with clear skies early on (28-30°C) transitioning to rainfall mid-week. Wednesday shows a 60% rain probability with humidity spiking to 70-72%, creating conditions favorable for fungal infections like powdery mildew. Temperatures will dip to 26°C by Thursday. Farmers should use the dry early-week window for critical field operations and prepare protective measures before the wet spell.",
};

// ─── PROFILE 3: DELHI / NORTH INDIA ─────────────────────────────────────────

const DELHI_PROFILE: MockWeatherProfile = {
  locationName: "Delhi, NCR",
  current: {
    temperature: 33,
    humidity: 38,
    windSpeed: 18,
    condition: "Sunny",
    feelsLike: 35,
    uvIndex: 10,
  },
  forecast: [
    { day: "Today",     condition: "Sunny",         high: 33, low: 20, humidity: 38, rainChance: 0,  windSpeed: 18, uvIndex: 10 },
    { day: "Tomorrow",  condition: "Sunny",         high: 34, low: 21, humidity: 35, rainChance: 0,  windSpeed: 20, uvIndex: 10 },
    { day: "Monday",    condition: "Sunny",         high: 35, low: 22, humidity: 32, rainChance: 0,  windSpeed: 22, uvIndex: 11 },
    { day: "Tuesday",   condition: "Sunny",         high: 35, low: 22, humidity: 30, rainChance: 0,  windSpeed: 19, uvIndex: 11 },
    { day: "Wednesday", condition: "Partly Cloudy", high: 34, low: 21, humidity: 40, rainChance: 5,  windSpeed: 16, uvIndex: 9 },
    { day: "Thursday",  condition: "Sunny",         high: 34, low: 21, humidity: 36, rainChance: 0,  windSpeed: 17, uvIndex: 10 },
    { day: "Friday",    condition: "Sunny",         high: 35, low: 22, humidity: 33, rainChance: 0,  windSpeed: 21, uvIndex: 11 },
  ],
  weeklyFarmPlan: [
    "Implement flood irrigation or drip systems immediately — the entire week shows 0% rain with temperatures hitting 35°C and humidity as low as 30%.",
    "Deploy shade nets over newly transplanted seedlings; UV index of 10-11 will cause severe leaf scorching on unprotected crops.",
    "Harvest wheat before midday to prevent grain shattering — high winds (18-22 kph) and extreme heat promote brittleness.",
  ],
  weeklyAnalysis: "Delhi is entering an extreme dry heat phase. Temperatures will climb to 35°C with near-zero rain probability all week. Humidity levels (30-40%) are critically low for agriculture, leading to rapid topsoil drying and high evapotranspiration. UV index consistently at 10-11 means severe solar radiation stress on all crops. The strong winds (16-22 kph) compound the drying effect. This is a high-risk week — prioritize water conservation, crop protection, and harvest timing.",
};

// ─── PROFILE 4: MUMBAI / MAHARASHTRA ────────────────────────────────────────

const MUMBAI_PROFILE: MockWeatherProfile = {
  locationName: "Mumbai, Maharashtra",
  current: {
    temperature: 32,
    humidity: 70,
    windSpeed: 16,
    condition: "Partly Cloudy",
    feelsLike: 37,
    uvIndex: 8,
  },
  forecast: [
    { day: "Today",     condition: "Partly Cloudy", high: 32, low: 25, humidity: 70, rainChance: 10, windSpeed: 16, uvIndex: 8 },
    { day: "Tomorrow",  condition: "Sunny",         high: 33, low: 25, humidity: 68, rainChance: 5,  windSpeed: 14, uvIndex: 9 },
    { day: "Monday",    condition: "Partly Cloudy", high: 33, low: 26, humidity: 72, rainChance: 15, windSpeed: 12, uvIndex: 7 },
    { day: "Tuesday",   condition: "Cloudy",        high: 31, low: 26, humidity: 78, rainChance: 30, windSpeed: 10, uvIndex: 5 },
    { day: "Wednesday", condition: "Light Rain",    high: 30, low: 25, humidity: 82, rainChance: 55, windSpeed: 18, uvIndex: 4 },
    { day: "Thursday",  condition: "Partly Cloudy", high: 31, low: 25, humidity: 75, rainChance: 20, windSpeed: 15, uvIndex: 6 },
    { day: "Friday",    condition: "Sunny",         high: 33, low: 26, humidity: 65, rainChance: 5,  windSpeed: 13, uvIndex: 8 },
  ],
  weeklyFarmPlan: [
    "Apply fungicide preventively on Monday — humidity rising to 78-82% mid-week creates prime conditions for late blight and downy mildew.",
    "Skip irrigation Tuesday through Thursday; anticipated rainfall and high humidity will keep soil sufficiently moist.",
    "Begin planting early Kharif varieties (okra, moong dal) toward the weekend — post-rain moisture and 33°C warmth provide ideal germination conditions.",
  ],
  weeklyAnalysis: "Mumbai's coastal climate brings a humid week with moisture levels climbing to 82% by Wednesday. The combination of 30-33°C heat and 70-82% humidity creates a tropical stress zone ideal for fungal diseases. A light rain event mid-week (55% probability) will provide natural irrigation but also raise disease risk. The week bookended by sunny conditions (Friday) offers a recovery window. The salt-laden coastal winds (10-18 kph) may cause leaf tip burn on sensitive vegetables.",
};

// ─── PROFILE 5: KOLKATA / WEST BENGAL ───────────────────────────────────────

const KOLKATA_PROFILE: MockWeatherProfile = {
  locationName: "Kolkata, West Bengal",
  current: {
    temperature: 30,
    humidity: 75,
    windSpeed: 8,
    condition: "Cloudy",
    feelsLike: 36,
    uvIndex: 6,
  },
  forecast: [
    { day: "Today",     condition: "Cloudy",        high: 30, low: 23, humidity: 75, rainChance: 25, windSpeed: 8,  uvIndex: 6 },
    { day: "Tomorrow",  condition: "Light Rain",    high: 29, low: 23, humidity: 80, rainChance: 65, windSpeed: 12, uvIndex: 4 },
    { day: "Monday",    condition: "Light Rain",    high: 28, low: 22, humidity: 85, rainChance: 70, windSpeed: 15, uvIndex: 3 },
    { day: "Tuesday",   condition: "Cloudy",        high: 29, low: 23, humidity: 80, rainChance: 35, windSpeed: 10, uvIndex: 5 },
    { day: "Wednesday", condition: "Partly Cloudy", high: 30, low: 23, humidity: 72, rainChance: 15, windSpeed: 9,  uvIndex: 7 },
    { day: "Thursday",  condition: "Sunny",         high: 31, low: 24, humidity: 68, rainChance: 5,  windSpeed: 8,  uvIndex: 8 },
    { day: "Friday",    condition: "Sunny",         high: 32, low: 24, humidity: 64, rainChance: 0,  windSpeed: 10, uvIndex: 9 },
  ],
  weeklyFarmPlan: [
    "Do NOT irrigate until Wednesday — heavy rain expected tomorrow and Monday (65-70% probability) will saturate fields; focus on drainage instead.",
    "Apply neem-based bio-pesticide after Tuesday's rain clears — the 80-85% humidity will trigger a jute pest and rice stem borer surge.",
    "Use the dry Thursday-Friday window (UV 8-9, 0-5% rain) for transplanting Boro rice seedlings or sowing summer vegetables.",
  ],
  weeklyAnalysis: "Kolkata faces a wet start to the week with 65-70% rain probability on Sunday-Monday and humidity peaking at 85%. This creates waterlogging risk, especially in low-lying paddy fields. Temperatures remain moderate (28-30°C) and will recover to 32°C by Friday as skies clear. The high humidity early in the week is a major concern for pest proliferation and fungal attacks on jute and rice crops. The late-week clearing provides an excellent planting window — soil will be well-saturated and temperatures warming.",
};

// ─── LOOKUP FUNCTION ────────────────────────────────────────────────────────

/**
 * Get instant mock weather data from the local database.
 * Matches the location string to the closest known profile.
 */
export function getMockWeatherProfile(location: string): MockWeatherProfile {
  const loc = location.toLowerCase();

  // Chennai / Tamil Nadu
  if (loc.includes("chennai") || loc.includes("nanganallur") || loc.includes("tamil nadu") || loc.includes("madras") || loc.includes("coimbatore") || loc.includes("madurai")) {
    return JSON.parse(JSON.stringify(CHENNAI_PROFILE));
  }

  // Bangalore / Karnataka
  if (loc.includes("bangalore") || loc.includes("bengaluru") || loc.includes("karnataka") || loc.includes("mysore") || loc.includes("mysuru") || loc.includes("hubli")) {
    return JSON.parse(JSON.stringify(BANGALORE_PROFILE));
  }

  // Delhi / North India
  if (loc.includes("delhi") || loc.includes("noida") || loc.includes("gurgaon") || loc.includes("gurugram") || loc.includes("faridabad") || loc.includes("lucknow") || loc.includes("jaipur") || loc.includes("chandigarh") || loc.includes("punjab") || loc.includes("haryana")) {
    return JSON.parse(JSON.stringify(DELHI_PROFILE));
  }

  // Mumbai / Maharashtra / West India
  if (loc.includes("mumbai") || loc.includes("pune") || loc.includes("maharashtra") || loc.includes("goa") || loc.includes("ahmedabad") || loc.includes("gujarat") || loc.includes("surat") || loc.includes("nashik") || loc.includes("nagpur")) {
    return JSON.parse(JSON.stringify(MUMBAI_PROFILE));
  }

  // Kolkata / East India
  if (loc.includes("kolkata") || loc.includes("calcutta") || loc.includes("west bengal") || loc.includes("bhubaneswar") || loc.includes("odisha") || loc.includes("patna") || loc.includes("bihar") || loc.includes("ranchi") || loc.includes("jharkhand") || loc.includes("guwahati") || loc.includes("assam")) {
    return JSON.parse(JSON.stringify(KOLKATA_PROFILE));
  }

  // Default: return Chennai profile with user's location name
  const profile = JSON.parse(JSON.stringify(CHENNAI_PROFILE));
  profile.locationName = location;
  return profile;
}
