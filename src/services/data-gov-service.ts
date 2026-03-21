/**
 * @fileOverview A service to fetch real-time crop market price data from data.gov.in.
 */

'use server';

export interface PriceData {
    arrival_date: string;
    min_price: number;
    max_price: number;
    modal_price: number;
}

interface CommodityPriceInput {
    commodity: string;
    state: string;
    market: string;
}

interface DataGovRecord {
    state: string;
    district: string;
    market: string;
    commodity: string;
    variety: string;
    arrival_date: string; // DD/MM/YYYY
    min_price: string;
    max_price: string;
    modal_price: string;
}

const BASE_URL = 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070';

async function fetchData(params: URLSearchParams) {
    const apiKey = process.env.DATA_GOV_IN_API_KEY;
    if (!apiKey || apiKey === "your_data_gov_in_api_key_here") {
      console.warn("Using mock data.gov.in data because API key is not configured.");
      if (params.get('fields') === 'state') return [{ state: "Maharashtra" }, { state: "Punjab" }];
      if (params.get('fields') === 'market') return [{ market: "Pune" }, { market: "Mumbai" }, { market: "Ludhiana" }];
      
      const mockedDate = new Date();
      return Array.from({length: 10}).map((_, i) => {
          const d = new Date(mockedDate);
          d.setDate(d.getDate() - i);
          return {
              state: params.get('filters[state]') || "Mock State",
              district: "Mock District",
              market: params.get('filters[market]') || "Mock Market",
              commodity: params.get('filters[commodity]') || "Mock Commodity",
              variety: "Common",
              arrival_date: d.toLocaleDateString('en-GB'), // DD/MM/YYYY
              min_price: (2000 + Math.random() * 200).toFixed(2),
              max_price: (2500 + Math.random() * 200).toFixed(2),
              modal_price: (2300 + Math.random() * 200).toFixed(2)
          };
      });
    }
    params.append('api-key', apiKey);
    params.append('format', 'json');

    const url = `${BASE_URL}?${params.toString()}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error("data.gov.in API Error Response:", await response.text());
            throw new Error(`API request failed with status: ${response.status}`);
        }
        const data = await response.json();
        return data.records;
    } catch (error) {
        console.error("Failed to fetch from data.gov.in:", error);
        throw new Error("Could not fetch live market data.");
    }
}


export async function getDistinctStates(): Promise<string[]> {
    const params = new URLSearchParams();
    params.append('fields', 'state');
    params.append('limit', '1000'); // Assuming there are fewer than 1000 state entries
    const records = await fetchData(params);
    const states = [...new Set<string>(records.map((r: { state: string }) => r.state))];
    return states.sort();
}

export async function getMarketsForState(state: string): Promise<string[]> {
    const params = new URLSearchParams();
    params.append('fields', 'market');
    params.append('filters[state]', state);
    params.append('limit', '1000'); // Assuming fewer than 1000 markets per state
    const records = await fetchData(params);
    const markets = [...new Set<string>(records.map((r: { market: string }) => r.market))];
    return markets.sort();
}

export async function getCommodityPriceData(input: CommodityPriceInput): Promise<PriceData[]> {
    const { commodity, state, market } = input;
    
    const params = new URLSearchParams();
    params.append('filters[state]', state);
    params.append('filters[market]', market);
    params.append('filters[commodity]', commodity);
    params.append('sort[arrival_date]', 'desc');
    params.append('limit', '10'); // Fetch last 10 records for a trend

    const records: DataGovRecord[] = await fetchData(params);

    if (!records || records.length === 0) {
        return [];
    }
  
    // The API returns records sorted descending, so we reverse to get chronological order for charting
    const priceData = records.map((record: DataGovRecord) => ({
        arrival_date: record.arrival_date,
        min_price: parseFloat(record.min_price),
        max_price: parseFloat(record.max_price),
        modal_price: parseFloat(record.modal_price)
    })).reverse();
  
    return priceData;
}
