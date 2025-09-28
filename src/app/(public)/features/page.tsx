

'use client';

import { Bot, Gamepad2, ScanLine, Store, Trophy, Leaf, Sparkles } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const features = [
  {
    title: 'AR Farm Scan',
    description: 'Use your phone’s camera to scan fields and crops. Our AI instantly identifies pests, diseases, and nutrient deficiencies, providing you with immediate, actionable advice.',
    icon: ScanLine,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    link: '/login'
  },
  {
    title: 'AI Chatbot Agronomist',
    description: 'Get expert agricultural advice 24/7. Our AI chatbot understands multiple languages and can answer your questions about everything from sowing dates to organic pesticides.',
    icon: Bot,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    link: '/login'
  },
  {
    title: 'Sustainable Marketplace',
    description: 'A dedicated platform to buy and sell organic produce and sustainable supplies. Connect directly with buyers who value quality and eco-friendly practices, ensuring you get premium prices.',
    icon: Store,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
    link: '/login'
  },
  {
    title: 'Gamified Missions & Leaderboard',
    description: 'Engage in fun, educational missions that teach sustainable farming practices. Earn XP, unlock badges, and compete with farmers in your village on the leaderboard.',
    icon: Trophy,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    link: '/login'
  },
  {
    title: 'Farming Simulator',
    description: 'Learn and experiment with new farming techniques in a risk-free virtual environment. Our Sim-Farm helps you understand complex topics like crop rotation and water management.',
    icon: Gamepad2,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    link: '/login'
  },
  {
    title: 'AI Crop Recommendations',
    description: 'Receive personalized crop suggestions based on your farm’s specific data, including soil health, local weather patterns, and government guidelines to maximize your yield.',
    icon: Leaf,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    link: '/login'
  },
];

const heroImage = {
  id: 'sikkim-farm',
  description: 'Sikkim terraced farms',
  imageUrl: 'https://images.unsplash.com/photo-1598230752589-32d3b0542387?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxzaWNraW0lMjBmYXJtfGVufDB8fHx8MTc1OTM5MTQ1OXww&ixlib=rb-4.1.0&q=80&w=1080',
  imageHint: 'Sikkim farm',
};


export default function FeaturesPage() {
  return (
    <div className="bg-cream">
      <section className="relative h-[60vh] min-h-[400px] w-full">
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          data-ai-hint={heroImage.imageHint}
          fill
          className={'object-cover'}
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
            <div className="container mx-auto px-4">
                <h1 className="font-headline text-4xl font-bold drop-shadow-md sm:text-5xl md:text-6xl">
                    The Future of Farming is Here
                </h1>
                <p className="mt-4 max-w-3xl text-lg text-white/90 drop-shadow-sm md:text-xl">
                    Explore the powerful AI-driven tools designed to help you thrive.
                </p>
            </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
                <Card key={feature.title} className="flex flex-col transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <CardHeader>
                    <div
                        className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${feature.bgColor}`}
                    >
                        <feature.icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <CardDescription>{feature.description}</CardDescription>
                    </CardContent>
                    <CardContent>
                        <Button asChild variant="secondary">
                            <Link href={feature.link}>Try Now</Link>
                        </Button>
                    </CardContent>
                </Card>
            ))}
          </div>
           <div className="mt-20 text-center">
            <h3 className="font-headline text-3xl font-bold text-foreground">Ready to Get Started?</h3>
            <p className="mt-2 text-muted-foreground">Join the KrishiVerse community today and revolutionize your farm.</p>
            <Button asChild size="lg" className="mt-6">
              <Link href="/signup">
                <Sparkles className="mr-2 h-5 w-5" />
                Sign Up for Free
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
