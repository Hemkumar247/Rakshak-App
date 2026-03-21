// src/app/market-analysis/page.tsx
"use client";

import { useState, useEffect, Suspense } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Loader2, TrendingUp, DollarSign } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

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
import { getMarketPrices, fetchStates, fetchMarkets } from './actions';
import type { MarketPriceData } from './actions';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

const formSchema = z.object({
  commodity: z.string().min(2, "Crop name is required."),
  state: z.string().min(1, "State is required."),
  market: z.string().min(1, "Market name is required."),
});

type FormValues = z.infer<typeof formSchema>;

function MarketAnalysisContent() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const [priceData, setPriceData] = useState<MarketPriceData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [states, setStates] = useState<string[]>([]);
  const [markets, setMarkets] = useState<string[]>([]);
  const [isStatesLoading, setIsStatesLoading] = useState(true);
  const [isMarketsLoading, setIsMarketsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      commodity: "",
      state: "",
      market: "",
    },
  });

  const selectedState = form.watch('state');
  
  // Set commodity from URL search params
  useEffect(() => {
    const cropFromUrl = searchParams.get('crop');
    if (cropFromUrl) {
      form.setValue('commodity', cropFromUrl, { shouldValidate: true });
    }
  }, [searchParams, form]);


  useEffect(() => {
    async function loadStates() {
      try {
        const stateList = await fetchStates();
        setStates(stateList);
      } catch (error) {
        toast({ variant: "destructive", title: "Failed to load states" });
      } finally {
        setIsStatesLoading(false);
      }
    }
    loadStates();
  }, [toast]);

  useEffect(() => {
    if (selectedState) {
      async function loadMarkets() {
        setIsMarketsLoading(true);
        setMarkets([]);
        form.setValue('market', ''); // Reset market when state changes
        try {
          const marketList = await fetchMarkets(selectedState);
          setMarkets(marketList);
        } catch (error) {
          toast({ variant: "destructive", title: `Failed to load markets for ${selectedState}` });
        } finally {
          setIsMarketsLoading(false);
        }
      }
      loadMarkets();
    }
  }, [selectedState, toast, form]);

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setPriceData(null);
    try {
      const result = await getMarketPrices(values.commodity, values.state, values.market);
      setPriceData(result);
    } catch (error) {
      console.error("Failed to get market prices:", error);
      let errorMessage = t('errorDescription');
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast({
        variant: "destructive",
        title: t('errorTitle'),
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">{t('marketAnalysisTitle')}</h1>
        <p className="text-muted-foreground">{t('marketAnalysisDescription')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <Card className="shadow-lg border-white/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <TrendingUp /> Get Market Prices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="commodity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('cropName')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('cropNamePlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      {isStatesLoading ? <Skeleton className="h-10 w-full" /> : (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a state" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {states.map(state => <SelectItem key={state} value={state}>{state}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="market"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Market</FormLabel>
                      {isMarketsLoading ? <Skeleton className="h-10 w-full" /> : (
                        <Select onValueChange={field.onChange} value={field.value} disabled={!selectedState || markets.length === 0}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a market" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                             {markets.map(market => <SelectItem key={market} value={market}>{market}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading || !form.formState.isValid} className="w-full">
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? t('loading') : "Get Prices"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="animate-fade-in space-y-6">
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-96 bg-card rounded-lg shadow-lg border-white/40">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <p className="text-lg text-muted-foreground">Fetching live prices...</p>
            </div>
          )}
          {priceData && (
            <Card className="shadow-lg border-white/40">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Price for <span className="text-primary">{priceData.commodity}</span></CardTitle>
                <CardDescription className="flex items-center gap-4 pt-2">
                    <span className="flex items-center gap-2">{priceData.market}, {priceData.state}</span>
                </CardDescription>
                 <CardDescription>Last updated: {priceData.arrivalDate}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="flex justify-around text-center">
                    <div>
                        <p className="text-muted-foreground text-sm font-medium">MIN PRICE</p>
                        <p className="text-2xl font-bold text-destructive">₹{priceData.minPrice}</p>
                        <p className="text-xs text-muted-foreground">per quintal</p>
                    </div>
                     <div>
                        <p className="text-muted-foreground text-sm font-medium">MAX PRICE</p>
                        <p className="text-2xl font-bold text-green-600">₹{priceData.maxPrice}</p>
                        <p className="text-xs text-muted-foreground">per quintal</p>
                    </div>
                 </div>
              </CardContent>
            </Card>
          )}
          {!isLoading && !priceData && (
            <div className="flex flex-col items-center justify-center h-96 text-center bg-card rounded-lg shadow-lg border-white/40">
              <DollarSign className="h-16 w-16 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground text-lg">Market prices will appear here.</p>
              <p className="text-muted-foreground/80">{t('enterDetails')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MarketAnalysisPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <MarketAnalysisContent />
        </Suspense>
    )
}
