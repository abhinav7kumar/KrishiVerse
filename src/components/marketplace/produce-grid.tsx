import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

export type Produce = {
  id: string;
  name: string;
  price: string;
};

type ProduceGridProps = {
  produce: Produce[];
};

export function ProduceGrid({ produce }: ProduceGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {produce.map((item) => {
        const placeholder = PlaceHolderImages.find((p) => p.id === item.id);
        return (
          <Card key={item.id} className="overflow-hidden transition-all hover:shadow-lg">
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
              <Button className="w-full" variant="secondary">
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
