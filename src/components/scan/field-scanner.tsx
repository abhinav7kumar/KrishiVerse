'use client';

import { analyzeFieldScan } from '@/ai/flows/analyze-field-scan-for-problems';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Bug, Leaf, TestTube2, Upload } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';

type AnalysisResult = {
  problems: string[];
  confidenceScores: number[];
  suggestedTreatments: string[];
};

export function FieldScanner() {
  const [imagePreview, setImagePreview] = useState<string | null>(
    PlaceHolderImages.find((img) => img.id === 'field_scan')?.imageUrl || null
  );
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAnalysis(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUri = reader.result as string;
        setImagePreview(dataUri);
        handleAnalysis(dataUri);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalysis = async (dataUri: string) => {
    setLoading(true);
    try {
      const result = await analyzeFieldScan({ photoDataUri: dataUri });
      setAnalysis(result);
    } catch (error) {
      console.error('Analysis failed:', error);
      toast({
        title: 'Analysis Failed',
        description: 'Could not analyze the image. Please try another one.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const triggerFileSelect = () => fileInputRef.current?.click();

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="flex flex-col gap-4">
        <Card className="overflow-hidden">
          <div className="relative aspect-[4/3] w-full">
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Field scan preview"
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted">
                <p className="text-muted-foreground">Image preview</p>
              </div>
            )}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-white border-t-transparent"></div>
              </div>
            )}
          </div>
        </Card>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />
        <Button onClick={triggerFileSelect} disabled={loading}>
          <Upload className="mr-2" />
          {loading ? 'Uploading...' : 'Upload a Photo'}
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        <Card className={cn(!analysis && !loading && 'flex items-center justify-center', 'min-h-[200px]')}>
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
          </CardHeader>
          <CardContent>
            {loading && (
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-20 w-full" />
              </div>
            )}
            {analysis && (
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 flex items-center gap-2 font-semibold text-lg">
                    <Bug className="text-destructive" /> Identified Problems
                  </h3>
                  {analysis.problems.length > 0 ? (
                    <ul className="list-disc space-y-2 pl-5">
                      {analysis.problems.map((problem, index) => (
                        <li key={index} className="flex items-center justify-between">
                          <span>{problem}</span>
                          <Badge variant="destructive">
                            {Math.round(analysis.confidenceScores[index] * 100)}%
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">No problems detected. Looks healthy!</p>
                  )}
                </div>
                <div>
                  <h3 className="mb-2 flex items-center gap-2 font-semibold text-lg">
                    <Leaf className="text-primary" /> Suggested Eco-Treatments
                  </h3>
                  {analysis.suggestedTreatments.length > 0 ? (
                    <ul className="list-disc space-y-2 pl-5">
                      {analysis.suggestedTreatments.map((treatment, index) => (
                        <li key={index}>{treatment}</li>
                      ))}
                    </ul>
                  ) : (
                     <p className="text-muted-foreground">No treatments needed at this time.</p>
                  )}
                </div>
              </div>
            )}
            {!analysis && !loading && (
              <Alert className="border-dashed">
                <TestTube2 className="h-4 w-4" />
                <AlertTitle>Awaiting Analysis</AlertTitle>
                <AlertDescription>
                  Upload an image of your crop, and our AI will identify
                  potential issues for you.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
