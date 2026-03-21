
"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLanguage } from '@/lib/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Thermometer, Droplets, Wind, Sun, Cloud, CloudRain, CloudSun, CloudDrizzle, Sparkles, Loader2, MapPin, LocateFixed, CloudLightning, CloudSnow, Moon, CloudFog, ShieldCheck, Leaf } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { getRealtimeWeather, type WeatherData } from './actions';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const conditionToIconMap: { [key: string]: React.ElementType } = {
  'Sunny': Sun, 'Clear': Moon, 'Partly Cloudy': CloudSun, 'Partly cloudy': CloudSun,
  'Cloudy': Cloud, 'Overcast': Cloud, 'Mist': CloudFog, 'Fog': CloudFog,
  'Light Rain': CloudRain, 'Light rain': CloudRain, 'Moderate rain': CloudRain,
  'Heavy rain': CloudRain, 'Drizzle': CloudDrizzle, 'Light drizzle': CloudDrizzle,
  'Thundery outbreaks possible': CloudLightning, 'Light snow': CloudSnow,
  'Mostly Sunny': Sun,
};

const formSchema = z.object({
  location: z.string().min(2, "Location is required."),
});

type FormValues = z.infer<typeof formSchema>;

export default function WeatherPage() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { location: "" },
  });

  const fetchWeather = async (loc: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getRealtimeWeather(loc);
      setWeatherData(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch weather data.");
      toast({ variant: 'destructive', title: 'Error', description: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-load default data on mount — instant, from local DB
  useEffect(() => {
    fetchWeather('Chennai');
  }, []);

  async function onSubmit(values: FormValues) {
    await fetchWeather(values.location);
  }
  
  async function handleGetLocation() {
    if (!navigator.geolocation) {
      toast({ variant: "destructive", title: "Not Supported", description: "Your browser does not support geolocation." });
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          const address = data.address || {};
          const city = address.city || address.town || address.village || address.city_district || 'Chennai';
          form.setValue('location', city, { shouldValidate: true });
          await fetchWeather(city);
        } catch {
          form.setValue('location', 'Chennai', { shouldValidate: true });
          await fetchWeather('Chennai');
        } finally { setIsLocating(false); }
      },
      () => { setIsLocating(false); fetchWeather('Chennai'); },
      { timeout: 5000 }
    );
  }

  const getConditionIcon = (condition: string) => {
    const Icon = conditionToIconMap[condition] || Sun;
    return <Icon className="h-5 w-5 text-primary" />;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">{t('weatherForecastTitle')}</h1>
        <p className="text-muted-foreground">{t('weatherForecastDescription')}</p>
      </div>

      {/* Location Input */}
      <Card className="shadow-lg border-white/40">
        <CardHeader>
          <CardTitle className="font-headline">{t('farmLocation')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <FormField control={form.control} name="location" render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="sr-only">Location</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder={t('farmLocationPlaceholder')} {...field} className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <Button type="button" variant="outline" onClick={handleGetLocation} disabled={isLocating || isLoading} className="w-full sm:w-auto shrink-0">
                  {isLocating ? <Loader2 className="h-5 w-5 animate-spin" /> : <LocateFixed className="h-5 w-5" />}
                  <span className="ml-2 sm:hidden">Use My Location</span>
                </Button>
              </div>
              <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <span>{t('getSuggestions')}</span>
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Weather Data Display */}
      {weatherData && !isLoading && (
        <>
          {/* Current Conditions */}
          <Card className="shadow-lg border-white/40">
            <CardHeader>
              <CardTitle className="font-headline">
                {t('currentConditions')} in <span className="text-primary">{weatherData.locationName}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
                <div className="flex flex-col items-center gap-1">
                  <Thermometer className="h-7 w-7 text-destructive" />
                  <p className="text-muted-foreground text-xs uppercase tracking-wider">{t('temperature')}</p>
                  <p className="font-bold text-2xl">{weatherData.current.temperature}°C</p>
                  <p className="text-xs text-muted-foreground">Feels {weatherData.current.feelsLike}°C</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Droplets className="h-7 w-7 text-blue-500" />
                  <p className="text-muted-foreground text-xs uppercase tracking-wider">{t('humidity')}</p>
                  <p className="font-bold text-2xl">{weatherData.current.humidity}%</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Wind className="h-7 w-7 text-gray-500" />
                  <p className="text-muted-foreground text-xs uppercase tracking-wider">{t('windSpeed')}</p>
                  <p className="font-bold text-2xl">{weatherData.current.windSpeed} kph</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  {getConditionIcon(weatherData.current.condition)}
                  <p className="text-muted-foreground text-xs uppercase tracking-wider">Condition</p>
                  <p className="font-bold text-lg">{weatherData.current.condition}</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Sun className="h-7 w-7 text-yellow-500" />
                  <p className="text-muted-foreground text-xs uppercase tracking-wider">UV Index</p>
                  <p className="font-bold text-2xl">{weatherData.current.uvIndex}</p>
                  <p className="text-xs text-muted-foreground">{weatherData.current.uvIndex >= 8 ? 'Very High' : weatherData.current.uvIndex >= 6 ? 'High' : 'Moderate'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 7-Day Forecast Table */}
          <Card className="shadow-lg border-white/40">
            <CardHeader>
              <CardTitle className="font-headline">{t('sevenDayForecast')}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-primary/5">
                      <th className="text-left p-4 font-semibold text-muted-foreground uppercase tracking-wider text-xs">Day</th>
                      <th className="text-center p-4 font-semibold text-muted-foreground uppercase tracking-wider text-xs">Condition</th>
                      <th className="text-center p-4 font-semibold text-muted-foreground uppercase tracking-wider text-xs">High</th>
                      <th className="text-center p-4 font-semibold text-muted-foreground uppercase tracking-wider text-xs">Low</th>
                      <th className="text-center p-4 font-semibold text-muted-foreground uppercase tracking-wider text-xs">Humidity</th>
                      <th className="text-center p-4 font-semibold text-muted-foreground uppercase tracking-wider text-xs">Rain %</th>
                      <th className="text-center p-4 font-semibold text-muted-foreground uppercase tracking-wider text-xs">Wind</th>
                      <th className="text-center p-4 font-semibold text-muted-foreground uppercase tracking-wider text-xs">UV</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weatherData.forecast.map((day, i) => (
                      <tr key={day.day} className={`border-b border-white/5 transition-colors hover:bg-primary/5 ${i === 0 ? 'bg-primary/10 font-semibold' : ''}`}>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {getConditionIcon(day.condition)}
                            <span className="font-medium">{day.day}</span>
                          </div>
                        </td>
                        <td className="text-center p-4 text-muted-foreground">{day.condition}</td>
                        <td className="text-center p-4 font-bold text-destructive">{day.high}°C</td>
                        <td className="text-center p-4 font-bold text-blue-400">{day.low}°C</td>
                        <td className="text-center p-4">{day.humidity}%</td>
                        <td className="text-center p-4">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            day.rainChance >= 50 ? 'bg-blue-500/20 text-blue-400' : 
                            day.rainChance >= 20 ? 'bg-yellow-500/20 text-yellow-400' : 
                            'bg-green-500/20 text-green-400'
                          }`}>
                            {day.rainChance}%
                          </span>
                        </td>
                        <td className="text-center p-4">{day.windSpeed} kph</td>
                        <td className="text-center p-4">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            day.uvIndex >= 8 ? 'bg-red-500/20 text-red-400' : 
                            day.uvIndex >= 6 ? 'bg-orange-500/20 text-orange-400' : 
                            'bg-green-500/20 text-green-400'
                          }`}>
                            {day.uvIndex}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Farm Plan — single 3-step plan */}
          <Card className="shadow-lg border-white/40">
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <Leaf className="h-5 w-5 text-primary" />
                Weekly Agronomist Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Analysis Summary */}
              <div className="bg-primary/5 rounded-xl p-5 border border-primary/10">
                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <p className="text-sm text-foreground/80 leading-relaxed italic">
                    {weatherData.weeklyAnalysis}
                  </p>
                </div>
              </div>

              <Separator />

              {/* 3-Step Action Plan */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" /> Your 3-Step Action Plan for This Week
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {weatherData.weeklyFarmPlan.map((step, i) => (
                    <div key={i} className="bg-secondary/20 rounded-xl p-5 flex gap-4 items-start">
                      <div className="shrink-0 h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="font-bold text-primary text-sm">{i + 1}</span>
                      </div>
                      <p className="text-sm text-foreground/90 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-3 text-muted-foreground">Loading forecast...</span>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <Card className="shadow-lg border-destructive/50 text-center py-12">
          <CardContent className="text-destructive">{error}</CardContent>
        </Card>
      )}
    </div>
  );
}