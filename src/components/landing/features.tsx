'use client';

import { Bot, Gamepad2, ScanLine, Store, Trophy, Leaf } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '../ui/card';
import Link from 'next/link';

const features = [
  {
    title: 'AR Farm Scan',
    description: 'Scan your fields for pests and diseases with your phone.',
    icon: ScanLine,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    title: 'AI Chatbot Agronomist',
    description: 'Get expert advice in multiple languages, 24/7.',
    icon: Bot,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
  {
    title: 'Sustainable Marketplace',
    description: 'Buy and sell organic produce at premium prices.',
    icon: Store,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
  },
  {
    title: 'Gamified Missions',
    description: 'Earn rewards and badges for sustainable practices.',
    icon: Trophy,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
  },
  {
    title: 'Farming Simulator',
    description: 'Learn new techniques in a fun, interactive game.',
    icon: Gamepad2,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
  },
  {
    title: 'Crop Recommendations',
    description: 'AI-powered suggestions for what to plant next.',
    icon: Leaf,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
];

export function Features() {
  return (
    <section id="features" className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-bold text-foreground md:text-4xl">
            A Smarter Way to Farm
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            KrishiVerse provides you with the tools and insights to improve
            yield, reduce waste, and connect with a community of sustainable
            farmers.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Link href="/login" key={feature.title} passHref>
              <Card className="group h-full transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                <CardHeader>
                  <div
                    className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${feature.bgColor}`}
                  >
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
