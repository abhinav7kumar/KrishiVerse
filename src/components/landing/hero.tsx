'use client';

import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Leaf } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const heroImages = [
  PlaceHolderImages.find((p) => p.id === 'field_scan')!,
  {
    id: 'sikkim-farm',
    description: 'Sikkim terraced farms',
    imageUrl: 'https://images.unsplash.com/photo-1598230752589-32d3b0542387?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxzaWNraW0lMjBmYXJtfGVufDB8fHx8MTc1OTM5MTQ1OXww&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'Sikkim farm',
  },
  {
    id: 'organic-crops',
    description: 'Organic crops growing',
    imageUrl: 'https://images.unsplash.com/photo-1597992921303-348e8a6a683e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxvcmdhbmljJTIwY3JvcHN8ZW58MHx8fHwxNzU5MzkxNDU5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'organic crops',
  },
];

export function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-[80vh] min-h-[500px] w-full">
      {heroImages.map((image, index) => (
        <Image
          key={image.id}
          src={image.imageUrl}
          alt={image.description}
          data-ai-hint={image.imageHint}
          fill
          className={cn(
            'object-cover transition-opacity duration-1000',
            currentImage === index ? 'opacity-100' : 'opacity-0'
          )}
          priority={index === 0}
        />
      ))}
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
        <div className="container mx-auto">
          <h1 className="font-headline text-4xl font-bold drop-shadow-md sm:text-5xl md:text-6xl lg:text-7xl">
            Grow Smart. Grow Green. 🌱
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-white/90 drop-shadow-sm md:text-xl">
            Sikkim’s AI-powered platform for sustainable farming and organic
            produce.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild className="group">
              <Link href="/signup">
                Get Started
                <Leaf className="ml-2 h-5 w-5 transform transition-transform duration-300 group-hover:rotate-12" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" onClick={scrollToFeatures}>
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
