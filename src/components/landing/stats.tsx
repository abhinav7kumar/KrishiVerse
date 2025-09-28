'use client';

import { useEffect, useRef, useState } from 'react';
import { Droplets, Leaf, Globe } from 'lucide-react';

const stats = [
  {
    icon: Droplets,
    label: 'Water Saved Today (Litres)',
    target: 850000,
    color: 'text-blue-500',
  },
  {
    icon: Leaf,
    label: 'Organic Farms Active',
    target: 1200,
    color: 'text-green-500',
  },
  {
    icon: Globe,
    label: 'CO₂ Reduced (Tonnes)',
    target: 500,
    color: 'text-gray-500',
  },
];

function Counter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTime: number | null = null;
          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            setCount(Math.floor(target * percentage));
            if (progress < duration) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref} className="font-headline text-4xl font-bold md:text-5xl">
      {count.toLocaleString()}
    </span>
  );
}

export function Stats() {
  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 text-center md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <stat.icon className={`mb-4 h-12 w-12 ${stat.color}`} />
              <Counter target={stat.target} />
              <p className="mt-2 text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
