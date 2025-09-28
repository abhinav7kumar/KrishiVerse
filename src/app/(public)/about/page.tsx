import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-cream py-12 md:py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-3 font-headline text-4xl font-bold text-primary">
              <Leaf className="h-10 w-10 text-primary" />
              About KrishiVerse
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-lg text-muted-foreground">
            <p>
              KrishiVerse was born from a simple yet powerful idea: to empower
              the farmers of Sikkim with the technology they need to thrive in a
              changing world. Our mission is to blend sustainable, organic
              farming practices with the power of Artificial Intelligence.
            </p>
            <p>
              We provide tools for farmers to increase their yield, reduce
              waste, and connect directly with markets that value their hard
              work and commitment to quality. From AI-powered crop analysis to a
              gamified learning platform, we are building a digital ecosystem
              that supports a greener, more prosperous future for agriculture in
              Sikkim.
            </p>
            <p>
              Join us on our journey to cultivate a smarter, more sustainable
              tomorrow.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
