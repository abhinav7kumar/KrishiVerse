'use client';

import { analyzeFieldScan } from '@/ai/flows/analyze-field-scan-for-problems';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Bug, Camera, Leaf, TestTube2, Upload, Video, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type AnalysisResult = {
  problems: string[];
  confidenceScores: number[];
  suggestedTreatments: string[];
};

type ImageAnalysis = {
  src: string;
  analysis: AnalysisResult | null;
  loading: boolean;
};

export function FieldScanner() {
  const [images, setImages] = useState<ImageAnalysis[]>([]);
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrentSlide(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrentSlide(api.selectedScrollSnap());
    };

    api.on('select', onSelect);

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (isCameraOpen) {
      const getCameraPermission = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' },
          });
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
            description:
              'Please enable camera permissions in your browser settings to use this app.',
          });
          setIsCameraOpen(false);
        }
      };

      getCameraPermission();
    } else {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    }
  }, [isCameraOpen, toast]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      if (files.length > 10) {
        toast({
          title: 'Too many files',
          description: 'You can select up to 10 images at a time.',
          variant: 'destructive',
        });
        return;
      }

      const imagePromises = Array.from(files).map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      try {
        const dataUris = await Promise.all(imagePromises);
        const newImages: ImageAnalysis[] = dataUris.map((uri) => ({
          src: uri,
          analysis: null,
          loading: true,
        }));
        setImages(newImages);
        newImages.forEach((img) => handleAnalysis(img.src));
      } catch (error) {
        toast({
          title: 'Error reading files',
          description: 'There was a problem uploading your images.',
          variant: 'destructive',
        });
      }
    }
  };

  const handleAnalysis = async (dataUri: string) => {
    try {
      const result = await analyzeFieldScan({ photoDataUri: dataUri });
      setImages((prev) =>
        prev.map((img) =>
          img.src === dataUri ? { ...img, analysis: result, loading: false } : img
        )
      );
    } catch (error) {
      console.error('Analysis failed:', error);
      toast({
        title: 'Analysis Failed',
        description: 'Could not analyze an image. Please try another one.',
        variant: 'destructive',
      });
      setImages((prev) =>
        prev.map((img) => (img.src === dataUri ? { ...img, loading: false } : img))
      );
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
        const newImage: ImageAnalysis = { src: dataUri, analysis: null, loading: true };
        setImages([newImage]);
        handleAnalysis(dataUri);
      }
      setIsCameraOpen(false);
    }
  };
  
  const currentAnalysis = images[currentSlide];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-start">
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
                        Please allow camera access to use this feature. You may need to change
                        permissions in your browser settings.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </>
            ) : images.length > 0 ? (
              <Carousel setApi={setApi} className="h-full w-full">
                <CarouselContent>
                  {images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="relative h-full w-full">
                        <Image src={image.src} alt={`Field scan preview ${index + 1}`} fill className="object-cover" />
                         {image.loading && (
                           <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                             <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-white border-t-transparent"></div>
                           </div>
                         )}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {images.length > 1 && (
                  <>
                    <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
                    <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
                  </>
                )}
              </Carousel>
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted">
                <p className="text-muted-foreground">Image preview</p>
              </div>
            )}
          </div>
        </Card>
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={() => setIsCameraOpen(!isCameraOpen)} variant="outline">
            {isCameraOpen ? <X className="mr-2" /> : <Video className="mr-2" />}
            {isCameraOpen ? 'Close' : 'Camera'}
          </Button>
          {isCameraOpen ? (
            <Button onClick={handleCapture} disabled={hasCameraPermission === false}>
              <Camera className="mr-2" />
              Scan
            </Button>
          ) : (
            <Button onClick={triggerFileSelect}>
              <Upload className="mr-2" />
              Upload
            </Button>
          )}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
          multiple
        />
        <canvas ref={canvasRef} className="hidden" />
      </div>

      <div className="flex flex-col gap-4">
        <Card className={cn(!currentAnalysis && 'flex items-center justify-center', 'min-h-[300px] md:min-h-full')}>
          <CardHeader>
            <CardTitle>Analysis Results {images.length > 1 ? `(${currentSlide + 1}/${images.length})` : ''}</CardTitle>
          </CardHeader>
          <CardContent>
            {currentAnalysis?.loading && (
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-8 w-1/2" />
                <Skeleton className="h-20 w-full" />
              </div>
            )}
            {currentAnalysis?.analysis && (
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 flex items-center gap-2 font-semibold text-lg">
                    <Bug className="text-destructive" /> Identified Problems
                  </h3>
                  {currentAnalysis.analysis.problems.length > 0 ? (
                    <ul className="list-disc space-y-2 pl-5">
                      {currentAnalysis.analysis.problems.map((problem, index) => (
                        <li key={index} className="flex items-center justify-between">
                          <span>{problem}</span>
                          <Badge variant="destructive">
                            {Math.round(currentAnalysis.analysis!.confidenceScores[index] * 100)}%
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
                  {currentAnalysis.analysis.suggestedTreatments.length > 0 ? (
                    <ul className="list-disc space-y-2 pl-5">
                      {currentAnalysis.analysis.suggestedTreatments.map((treatment, index) => (
                        <li key={index}>{treatment}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">No treatments needed at this time.</p>
                  )}
                </div>
              </div>
            )}
            {!currentAnalysis && (
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
