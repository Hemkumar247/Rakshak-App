"use client";

import { useState, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Upload, Loader2, Leaf, HeartPulse, ShieldCheck, Bug, Pill, AlertCircle, Sparkles, Image as ImageIcon } from 'lucide-react';
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
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getPlantDiagnosis } from './actions';
import { useLanguage } from '@/lib/i18n';
import type { DiagnosePlantDiseaseOutput } from '@/ai/flows/diagnose-plant-disease';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const formSchema = z.object({
  userDescription: z.string().optional(),
  photo: z.instanceof(File).refine(file => file.size > 0, "A photo of the plant is required."),
});

type FormValues = z.infer<typeof formSchema>;

export default function PlantDiagnosisPage() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [diagnosis, setDiagnosis] = useState<DiagnosePlantDiseaseOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userDescription: "",
      photo: new File([], ""),
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue('photo', file, { shouldValidate: true });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const toDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
  };

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setDiagnosis(null);
    try {
        const photoDataUri = await toDataUri(values.photo);
        const result = await getPlantDiagnosis({ 
            photoDataUri, 
            userDescription: values.userDescription || "", 
            language 
        });
        setDiagnosis(result);
    } catch (error) {
        console.error("Failed to get plant diagnosis:", error);
        toast({
            variant: "destructive",
            title: t('errorTitle'),
            description: t('errorDescription'),
        });
    } finally {
        setIsLoading(false);
    }
  }

  const renderResultSection = (title: string, items: string[], Icon: React.ElementType, color: string) => (
    <div>
        <h3 className={`text-xl font-headline font-bold mb-3 flex items-center gap-2 ${color}`}>
            <Icon className="h-6 w-6" /> {title}
        </h3>
        {items && items.length > 0 ? (
            <ul className="space-y-2 list-inside pl-2 text-foreground/90">
                {items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        <span className="flex-1">{item}</span>
                    </li>
                ))}
            </ul>
        ) : <p className="text-muted-foreground">{t('noInfo')}</p>}
    </div>
);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center">
        <h1 className="text-3xl font-headline font-bold tracking-tight">{t('plantDiagnosisTitle')}</h1>
        <p className="text-muted-foreground">{t('plantDiagnosisDescription')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                    <Sparkles /> {t('newDiagnosis' as any)}
                </CardTitle>
            </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="photo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('plantPhoto')}</FormLabel>
                      <FormControl>
                        <div
                          className="relative border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors bg-background/50"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                           {preview ? (
                            <div className="relative w-full h-48 rounded-md overflow-hidden">
                                <Image src={preview} alt="Plant preview" layout="fill" objectFit="contain" />
                            </div>
                           ) : (
                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                <Upload className="h-10 w-10" />
                                <p>{t('uploadInstruction')}</p>
                                <p className="text-xs">{t('uploadSubtext')}</p>
                            </div>
                           )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="userDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('optionalNotes')}</FormLabel>
                      <FormControl>
                        <Textarea rows={4} placeholder={t('optionalNotesPlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading || !form.formState.isValid} className="w-full">
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? t('loading') : t('getDiagnosis')}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="animate-fade-in">
          <Card className="min-h-[400px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <HeartPulse /> {t('diagnosisResult' as any)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {isLoading && (
                <div className="flex flex-col items-center justify-center h-64">
                  <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                  <p className="text-lg text-muted-foreground">{t('aiAnalyzing')}</p>
                </div>
              )}
              {diagnosis && (
                <div>
                  { !diagnosis.isPlant ? (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>{t('notAPlantTitle')}</AlertTitle>
                      <AlertDescription>{t('notAPlantDescription')}</AlertDescription>
                    </Alert>
                  ) : (
                    <div className="space-y-6">
                        <Card className="bg-background/50">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold font-headline text-primary">{diagnosis.plantName}</CardTitle>
                                <CardDescription className="flex items-center gap-2">
                                {diagnosis.isHealthy ? (
                                    <>
                                        <ShieldCheck className="text-green-500"/>
                                        <span className="font-semibold text-green-500">{t('healthy')}</span>
                                    </>
                                ) : (
                                    <>
                                        <Bug className="text-destructive"/>
                                        <span className="font-semibold text-destructive">{diagnosis.diseaseName}</span>
                                    </>
                                )}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                       
                        {renderResultSection(t('diagnosis'), diagnosis.diagnosis, Bug, "text-destructive")}
                        
                        {!diagnosis.isHealthy && diagnosis.diseaseImageUrl && (
                            <div>
                                <h3 className="text-xl font-headline font-bold mb-3 flex items-center gap-2 text-orange-600">
                                    <ImageIcon className="h-6 w-6" /> Reference Image
                                </h3>
                                <p className="text-sm text-muted-foreground mb-2">Does your plant look like this? This helps confirm the diagnosis.</p>
                                <div className="relative w-full h-48 rounded-md overflow-hidden border">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img 
                                        src={diagnosis.diseaseImageUrl} 
                                        alt={`Reference image for ${diagnosis.diseaseName}`} 
                                        className="w-full h-full object-cover"
                                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                    />
                                </div>
                            </div>
                        )}

                        {renderResultSection(t('treatment'), diagnosis.treatment, Pill, "text-green-600")}
                        {renderResultSection(t('prevention'), diagnosis.prevention, ShieldCheck, "text-blue-600")}
                    </div>
                  )}
                </div>
              )}
              {!isLoading && !diagnosis && (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <Leaf className="h-16 w-16 text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground text-lg">{t('resultsAppearHere')}</p>
                  <p className="text-muted-foreground/80">{t('uploadToStart')}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
