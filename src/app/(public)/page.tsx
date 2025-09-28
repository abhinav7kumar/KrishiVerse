import { Hero } from '@/components/landing/hero';
import { Features } from '@/components/landing/features';
import { Stats } from '@/components/landing/stats';
import { Testimonials } from '@/components/landing/testimonials';

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Features />
      <Stats />
      <Testimonials />
    </div>
  );
}
