'use client';

import { generateCropRecommendations } from '@/ai/flows/generate-crop-recommendations';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Sparkles, Sprout } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ProgressCircle } from '../ui/progress-circle';

const formSchema = z.object({
  weatherPatterns: z
    .string()
    .min(10, 'Please describe weather patterns in more detail.'),
  soilHealthIndex: z.number().min(0).max(10),
  governmentGuidelines: z
    .string()
    .min(10, 'Please describe government guidelines in more detail.'),
});

type FormData = z.infer<typeof formSchema>;

type Recommendation = {
  cropRecommendations: string;
  sustainabilityScore: number;
};

export function RecommendationsCard() {
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(
    null
  );
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weatherPatterns: 'Moderate rainfall, ample sunlight, average temperature of 25°C.',
      soilHealthIndex: 7.5,
      governmentGuidelines: 'Promote organic farming, subsidize millets and local vegetables.',
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setRecommendation(null);
    try {
      const result = await generateCropRecommendations(data);
      setRecommendation(result);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error Generating Recommendations',
        description:
          'There was a problem contacting the AI. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="text-primary" />
          AI Crop Recommendations
        </CardTitle>
        <CardDescription>
          Get personalized crop suggestions based on your farm&apos;s data.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-6">
            <FormField
              control={form.control}
              name="weatherPatterns"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Local Weather Patterns</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Hot and humid with heavy monsoon rains" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="soilHealthIndex"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>
                    Soil Health Index: <span className="font-bold">{value}</span>/10
                  </FormLabel>
                  <FormControl>
                    <Slider
                      min={0}
                      max={10}
                      step={0.1}
                      value={[value]}
                      onValueChange={(vals) => onChange(vals[0])}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="governmentGuidelines"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Government Guidelines</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Subsidies on pulses, focus on water-saving crops" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex-col items-start gap-4">
            <Button type="submit" disabled={loading}>
              {loading ? 'Analyzing...' : 'Get Recommendations'}
            </Button>
            {loading && <p className="text-sm text-muted-foreground">AI is thinking, please wait...</p>}
            {recommendation && (
              <Card className="w-full bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Sprout />
                    Your Recommended Crops
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <div className="sm:col-span-2">
                    <p className="whitespace-pre-wrap">{recommendation.cropRecommendations}</p>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Label>Sustainability Score</Label>
                    <ProgressCircle value={recommendation.sustainabilityScore} size={100} />
                  </div>
                </CardContent>
              </Card>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
