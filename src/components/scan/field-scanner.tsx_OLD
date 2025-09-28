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
import { Bug, Camera, Leaf, TestTube2, Upload, Video, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

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

  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);


  useEffect(() => {
    if (isCameraOpen) {
      const getCameraPermission = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
          setHasCameraPermission(true);

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing camera:', error);
          setHasCameraPermission(false);
          toast({
            variant: 'destructive',
            title: 'Camera Access Denied',
            description: 'Please enable camera permissions in your browser settings to use this app.',
          });
          setIsCameraOpen(false);
        }
      };

      getCameraPermission();
    } else {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    }
  }, [isCameraOpen, toast]);

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

  const triggerFileSelect = () => {
    setIsCameraOpen(false);
    fileInputRef.current?.click();
  };

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUri = canvas.toDataURL('image/jpeg');
        setImagePreview(dataUri);
        handleAnalysis(dataUri);
      }
      setIsCameraOpen(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="flex flex-col gap-4">
        <Card className="overflow-hidden">
          <div className="relative aspect-[4/3] w-full">
            {isCameraOpen ? (
              <>
                <video ref={videoRef} className="h-full w-full object-cover" autoPlay playsInline muted />
                {hasCameraPermission === false && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                    <Alert variant="destructive" className="m-4">
                      <AlertTitle>Camera Access Required</AlertTitle>
                      <AlertDescription>
                        Please allow camera access to use this feature. You may need to change permissions in your browser settings.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </>
            ) : (
              imagePreview && (
                <Image
                  src={imagePreview}
                  alt="Field scan preview"
                  fill
                  className="object-cover"
                />
              )
            )}

            {!isCameraOpen && !imagePreview && (
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
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={() => setIsCameraOpen(!isCameraOpen)} disabled={loading} variant="outline">
            {isCameraOpen ? <X className="mr-2" /> : <Video className="mr-2" />}
            {isCameraOpen ? 'Close Camera' : 'Open Camera'}
          </Button>
          {isCameraOpen ? (
            <Button onClick={handleCapture} disabled={loading || hasCameraPermission === false}>
              <Camera className="mr-2" />
              Scan
            </Button>
          ) : (
            <Button onClick={triggerFileSelect} disabled={loading}>
              <Upload className="mr-2" />
              Upload Photo
            </Button>
          )}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
        />
        <canvas ref={canvasRef} className="hidden" />
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
                  Use your camera or upload an image of your crop, and our AI will identify
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
