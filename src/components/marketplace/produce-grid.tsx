'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useCart } from '@/context/cart-context';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import type { Produce } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle } from 'lucide-react';

type ProduceGridProps = {
  produce: Produce[];
};

export function ProduceGrid({ produce }: ProduceGridProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (item: Produce) => {
    addToCart(item);
    toast({
      title: 'Added to Cart',
      description: (
        <div className="flex items-center gap-2">
          <CheckCircle className="text-green-500" />
          <span>{item.name} has been added to your cart.</span>
        </div>
      ),
    });
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {produce.map((item) => {
        const placeholder = PlaceHolderImages.find((p) => p.id === item.id);
        return (
          <Card
            key={item.id}
            className="overflow-hidden transition-all hover:shadow-lg"
          >
            <CardHeader className="p-0">
              <div className="relative aspect-video w-full">
                <Image
                  src={placeholder?.imageUrl || ''}
                  alt={item.name}
                  data-ai-hint={placeholder?.imageHint}
                  fill
                  className="object-cover"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="mb-1 text-lg">{item.name}</CardTitle>
              <p className="font-semibold text-primary">{item.price}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button
                className="w-full"
                variant="secondary"
                onClick={() => handleAddToCart(item)}
              >
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
