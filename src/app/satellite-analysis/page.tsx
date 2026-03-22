
"use client";

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Map, Satellite, Loader2, Leaf, CheckCircle, Locate } from 'lucide-react';
import Image from 'next/image';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/lib/i18n';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getSatelliteAnalysis } from './actions';
import type { SatelliteFarmAnalysisOutput } from '@/ai/schemas/satellite-analysis-schema';

const formSchema = z.object({
  coordinates: z.string().regex(/^-?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*-?((1[0-7]\d(\.\d+)?|([1-9]?\d)(\.\d+)?))$/, "Invalid coordinates. Please use 'lat, lon' format."),
});

type FormValues = z.infer<typeof formSchema>;

export default function SatelliteAnalysisPage() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [analysisResult, setAnalysisResult] = useState<SatelliteFarmAnalysisOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [isLocating, setIsLocating] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      coordinates: "",
    },
  });

  const handleFindLocation = () => {
    if (!navigator.geolocation) {
      toast({
        variant: "destructive",
        title: "Geolocation not supported",
        description: "Your browser does not support geolocation.",
      });
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        form.setValue("coordinates", `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
        setIsLocating(false);
        toast({
          title: "Location found",
          description: `Coordinates: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
        });
      },
      (error) => {
        console.error("Error finding location:", error);
        setIsLocating(false);
        toast({
          variant: "destructive",
          title: "Location error",
          description: "Could not retrieve your location. Please enter coordinates manually.",
        });
      }
    );
  };

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setAnalysisResult(null);

    try {
      const result = await getSatelliteAnalysis({ ...values, language });
      setAnalysisResult(result);
      toast({
          title: "Analysis Complete",
          description: "Satellite data processed successfully."
      });
    } catch (error) {
       console.error("Failed to get satellite analysis:", error);
       toast({
        variant: "destructive",
        title: t('errorTitle'),
        description: t('errorDescription'),
      });
    } finally {
      setIsLoading(false);
    }
  }

  const renderAnalysis = () => (
     <div className="space-y-6">
        <Tabs defaultValue="image" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="image">{t('satelliteImage')}</TabsTrigger>
                <TabsTrigger value="health">{t('vegetationHealth')}</TabsTrigger>
            </TabsList>
            <TabsContent value="image" className="mt-4">
                <div className="relative w-full aspect-video rounded-md overflow-hidden border">
                    <Image 
                        src={analysisResult?.imageDataUri || `https://placehold.co/800x600.png`} 
                        alt="Satellite view of the farm" 
                        layout="fill" 
                        objectFit="cover"
                        unoptimized={analysisResult?.imageDataUri?.startsWith('data:image')}
                        data-ai-hint="satellite farm"
                        priority={true}
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>
            </TabsContent>
            <TabsContent value="health" className="mt-4">
                <Card>
                    <CardHeader>
                        <CardTitle>NDVI (Vegetation Index)</CardTitle>
                        <CardDescription>
                            {analysisResult?.healthDescription}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-5xl font-bold text-center text-primary">
                            {analysisResult?.ndvi.toFixed(3)}
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
         <Card>
            <CardHeader>
                <CardTitle>{t('soilAnalysis')}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">{analysisResult?.soilAnalysis}</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>{t('recommendations')}</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2">
                    {analysisResult?.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                            <span className="text-foreground/90">{rec}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    </div>
  )

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <h1 className="text-3xl font-headline font-bold tracking-tight">{t('satelliteAnalysisTitle')}</h1>
        <p className="text-muted-foreground">{t('satelliteAnalysisDescription')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Satellite /> {t('newAnalysis')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="coordinates"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('farmCoordinates')}</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input placeholder="e.g., 28.6139, 77.2090" {...field} />
                        </FormControl>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="icon"
                          onClick={handleFindLocation}
                          disabled={isLocating}
                          title={t('findLocation')}
                        >
                          {isLocating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Locate className="h-4 w-4" />}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? t('loading') : t('analyzeField')}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-6">
             {isLoading && (
                <div className="flex flex-col items-center justify-center h-64">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                    <p className="text-lg text-muted-foreground">{t('fetchingSatellite')}</p>
                </div>
            )}

            {analysisResult ? renderAnalysis() : (
                !isLoading && (
                    <div className="flex flex-col items-center justify-center h-64 text-center bg-card rounded-xl p-4">
                        <Satellite className="h-16 w-16 text-muted-foreground/50 mb-4" />
                        <p className="text-muted-foreground text-lg">{t('resultsAppearHere')}</p>
                        <p className="text-muted-foreground/80">{t('enterCoordinatesToStart')}</p>
                    </div>
                )
            )}
        </div>
      </div>
    </div>
  );
}
