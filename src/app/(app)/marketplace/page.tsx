import { ProduceGrid } from '@/components/marketplace/produce-grid';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { marketplaceProduce } from '@/lib/data';
import { ShoppingCart } from 'lucide-react';

export default function MarketplacePage() {
  return (
    <div className="space-y-8">
      <Card className="bg-primary text-primary-foreground">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-3xl">
            <ShoppingCart className="h-8 w-8" />
            Sustainable Marketplace
          </CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Exclusive access to sell your sustainable produce at premium prices. Connect directly with buyers who value quality and eco-friendly farming.
          </CardDescription>
        </CardHeader>
      </Card>
      <ProduceGrid produce={marketplaceProduce} />
    </div>
  );
}
