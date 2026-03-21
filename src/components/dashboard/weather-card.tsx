// src/components/dashboard/weather-card.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/lib/i18n';
import { Sun, Cloud, CloudRain, CloudSun, CloudDrizzle, CloudLightning, CloudSnow, Moon, CloudFog, ChevronRight, Wind } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '../ui/button';
import { getRealtimeWeather, WeatherData } from '@/app/weather/actions';
import { Skeleton } from '../ui/skeleton';
import { useToast } from '@/hooks/use-toast';

const conditionToIconMap: { [key: string]: React.ElementType } = {
  'Sunny': Sun,
  'Clear': Moon,
  'Partly cloudy': CloudSun,
  'Cloudy': Cloud,
  'Overcast': Cloud,
  'Mist': CloudFog,
  'Patchy rain possible': CloudDrizzle,
  'Patchy snow possible': CloudSnow,
  'Patchy sleet possible': CloudDrizzle,
  'Patchy freezing drizzle possible': CloudDrizzle,
  'Thundery outbreaks possible': CloudLightning,
  'Blowing snow': CloudSnow,
  'Blizzard': CloudSnow,
  'Fog': CloudFog,
  'Freezing fog': CloudFog,
  'Patchy light drizzle': CloudDrizzle,
  'Light drizzle': CloudDrizzle,
  'Freezing drizzle': CloudDrizzle,
  'Heavy freezing drizzle': CloudDrizzle,
  'Patchy light rain': CloudRain,
  'Light rain': CloudRain,
  'Moderate rain at times': CloudRain,
  'Moderate rain': CloudRain,
  'Heavy rain at times': CloudRain,
  'Heavy rain': CloudRain,
  'Light freezing rain': CloudRain,
  'Moderate or heavy freezing rain': CloudRain,
  'Light sleet': CloudDrizzle,
  'Moderate or heavy sleet': CloudDrizzle,
  'Patchy light snow': CloudSnow,
  'Light snow': CloudSnow,
  'Patchy moderate snow': CloudSnow,
  'Moderate snow': CloudSnow,
  'Patchy heavy snow': CloudSnow,
  'Heavy snow': CloudSnow,
  'Ice pellets': CloudSnow,
  'Light rain shower': CloudRain,
  'Moderate or heavy rain shower': CloudRain,
  'Torrential rain shower': CloudRain,
  'Light sleet showers': CloudDrizzle,
  'Moderate or heavy sleet showers': CloudDrizzle,
  'Light snow showers': CloudSnow,
  'Moderate or heavy snow showers': CloudSnow,
  'Light showers of ice pellets': CloudSnow,
  'Moderate or heavy showers of ice pellets': CloudSnow,
  'Patchy light rain with thunder': CloudLightning,
  'Moderate or heavy rain with thunder': CloudLightning,
  'Patchy light snow with thunder': CloudLightning,
  'Moderate or heavy snow with thunder': CloudLightning,
};


export function WeatherCard() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState('Chennai');

  useEffect(() => {
    const fetchWeatherForLocation = async (loc: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getRealtimeWeather(loc);
            setWeatherData(data);
        } catch (err) {
            console.error("Failed to fetch weather data for card:", err);
            setError("Could not load weather.");
        } finally {
            setIsLoading(false);
        }
    };
    // Load instantly from mock DB — no geolocation needed
    fetchWeatherForLocation('Chennai');
  }, []);


  const renderContent = () => {
    if (isLoading) {
      return (
        <>
           <Skeleton className="h-10 w-24 mx-auto" />
           <Separator className="my-2" />
           <div className="flex justify-between text-center">
             {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                    <Skeleton className="h-4 w-8" />
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-4 w-10" />
                </div>
             ))}
           </div>
        </>
      )
    }

    if (error || !weatherData) {
        return <p className="text-sm text-center text-destructive">{error || "No data available."}</p>;
    }

    const forecast = weatherData.forecast.slice(0, 5).map((day) => {
        let shortDay: string;
        if (day.day === 'Today' || day.day === 'Tomorrow') {
            shortDay = day.day;
        } else {
            // Abbreviate the day name, e.g., "Wednesday" -> "Wed"
            shortDay = day.day.substring(0, 3);
        }
        return {
            ...day,
            shortDay,
            Icon: conditionToIconMap[day.condition] || Sun,
        };
    });
    
    return (
        <>
            <div className="text-4xl font-bold text-center py-2">{weatherData.current.temperature}°C</div>
            <Separator className="my-2" />
            <div className="flex justify-between text-center">
            {forecast.map(({ day, Icon, high, shortDay }) => (
                <div key={day} className="flex flex-col items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">{shortDay}</span>
                <Icon className="h-6 w-6 text-foreground" />
                <span className="text-sm font-semibold">{high}°C</span>
                </div>
            ))}
            </div>
        </>
    )
  }

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Sun className="text-accent" />
          {t('weather')}
        </CardTitle>
        <CardDescription>5-day local forecast</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow">
        {renderContent()}
        <div className="flex-grow" />
        <Button asChild variant="ghost" className="mt-4 self-end text-sm text-primary hover:text-primary/90">
          <Link href="/weather">
            {t('learnMore')}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
