'use client';

import { leaderboardData } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Award, Leaf } from 'lucide-react';

const testimonials = [
  {
    id: 'priya',
    quote: "KrishiVerse's AI chatbot helped me identify a pest infestation early and saved my entire crop. The organic solutions worked wonders!",
  },
  {
    id: 'aarav',
    quote: 'The marketplace connected me directly with buyers in the city. I got a much better price for my organic vegetables this year.',
  },
  {
    id: 'rohan',
    quote: 'The gamified missions are a fun way to learn about sustainability. My village is now competing to be the greenest!',
  },
];

export function Testimonials() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-bold text-foreground md:text-4xl">
            From the Heart of Sikkim
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Hear from farmers who are transforming their livelihoods with
            KrishiVerse.
          p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => {
            const farmer = leaderboardData.find((f) => f.id === testimonial.id);
            const avatar = PlaceHolderImages.find((p) => p.id === farmer?.id);
            if (!farmer || !avatar) return null;

            return (
              <Card key={farmer.id}>
                <CardContent className="p-6">
                  <p className="italic text-muted-foreground">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="mt-4 flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={avatar.imageUrl} alt={farmer.name} />
                      <AvatarFallback>{farmer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">
                        {farmer.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {farmer.village}
                      </p>
                    </div>
                    {farmer.badge && (
                      <farmer.badge className="ml-auto h-6 w-6 text-yellow-500" />
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
