
"use client";

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Bot, Loader2, CheckCircle, MapPin, FlaskConical } from 'lucide-react';
import Image from 'next/image';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getSmartCropSuggestions } from './actions';
import { useLanguage } from '@/lib/i18n';
import type { SmartCropSuggestionsOutput } from '@/ai/flows/smart-crop-suggestions';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  farmLocation: z.string().min(2, "Farm location is required."),
});

type Recommendation = SmartCropSuggestionsOutput['recommendations'][0];

export default function CropSuggestionsPage() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [recommendations, setRecommendations] = useState<Recommendation[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      farmLocation: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setRecommendations(null);
    try {
      const result = await getSmartCropSuggestions({ ...values, language });
      setRecommendations(result.recommendations);
    } catch (error) {
      console.error("Failed to get crop suggestions:", error);
      toast({
        variant: "destructive",
        title: t('errorTitle'),
        description: t('errorDescription'),
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGetLocation() {
    if (!navigator.geolocation) {
      toast({
        variant: "destructive",
        title: "Geolocation Not Supported",
        description: "Your browser does not support geolocation.",
      });
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
          if (!response.ok) throw new Error("Failed to fetch address");
          const data = await response.json();
          const locationString = data.display_name || `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`;
          form.setValue('farmLocation', locationString, { shouldValidate: true });
          toast({
            title: "Location Found",
            description: "Your location has been filled in.",
          });
        } catch (e) {
            console.error("Reverse geocoding failed", e);
            const locationString = `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`;
            form.setValue('farmLocation', locationString, { shouldValidate: true });
            toast({
                variant: "destructive",
                title: "Could not fetch address",
                description: "Using coordinates instead.",
            });
        } finally {
            setIsLocating(false);
        }
      },
      (error) => {
        setIsLocating(false);
        let description = "An unknown error occurred.";
        if (error.code === error.PERMISSION_DENIED) {
            description = "You denied the request for Geolocation.";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
            description = "Location information is unavailable.";
        } else if (error.code === error.TIMEOUT) {
            description = "The request to get user location timed out.";
        }
        toast({
          variant: "destructive",
          title: "Error Getting Location",
          description,
        });
      }
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <h1 className="text-3xl font-headline font-bold tracking-tight">{t('cropSuggestionsTitle')}</h1>
        <p className="text-muted-foreground">{t('cropSuggestionsDescription')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Bot /> {t('getSuggestions')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="farmLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('farmLocation')}</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input placeholder={t('farmLocationPlaceholder')} {...field} />
                        </FormControl>
                        <Button type="button" variant="outline" onClick={handleGetLocation} disabled={isLocating} aria-label="Use My Location">
                            {isLocating ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
                        </Button>
                      </div>
                      <FormDescription>
                        {t('cropSuggestionsDescription')}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? t('loading') : t('getSuggestions')}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="animate-fade-in space-y-6">
          {isLoading && (
            <div className="flex items-center justify-center h-96">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          )}
          {recommendations && (
             <div className="space-y-6">
              <h2 className="text-2xl font-headline font-bold text-center">{t('recommendations')}</h2>
              {recommendations.map((rec) => (
                <Card key={rec.cropName} className="overflow-hidden">
                    <div className="relative h-48 w-full">
                        <Image 
                            src={rec.imageDataUri || `https://placehold.co/600x400.png`} 
                            alt={rec.cropName} 
                            layout="fill" 
                            objectFit="cover"
                            data-ai-hint={rec.cropName}
                            unoptimized={rec.imageDataUri?.startsWith('data:image')}
                            priority={true}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold font-headline text-primary">{rec.cropName}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        {t('reasonsForRecommendation')}
                      </h3>
                      <ul className="space-y-2">
                          {rec.reasoning.map((reason, index) => (
                              <li key={index} className="flex items-start gap-2 ml-7">
                                  <span className="text-foreground/90">{reason}</span>
                              </li>
                          ))}
                      </ul>
                    </div>
                    {rec.fertilizerRecommendations && rec.fertilizerRecommendations.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-blue-600 dark:text-blue-400">
                          <FlaskConical className="h-5 w-5" />
                          {t('fertilizerRecommendations')}
                        </h3>
                        <ul className="space-y-2">
                            {rec.fertilizerRecommendations.map((fer, index) => (
                                <li key={index} className="flex items-start gap-2 ml-7 border-l-2 border-blue-200 pl-4 py-1">
                                    <span className="text-foreground/90 italic">{fer}</span>
                                </li>
                            ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          {!isLoading && !recommendations && (
            <div className="flex flex-col items-center justify-center h-96 text-center bg-card rounded-lg">
              <Bot className="h-16 w-16 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground text-lg">Your crop recommendations will appear here.</p>
              <p className="text-muted-foreground/80">Enter a location or use your current one to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
