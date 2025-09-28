'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Package, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="flex items-center justify-center py-12">
      <Card className="w-full max-w-2xl text-center">
        <CardHeader className="items-center">
          <CheckCircle className="h-20 w-20 text-green-500" />
          <CardTitle className="font-headline text-3xl text-green-600">
            Payment Successful!
          </CardTitle>
          <CardDescription>
            Thank you for your purchase. Your order has been confirmed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm text-muted-foreground">Your Order ID is</p>
            <p className="text-2xl font-bold text-primary">{orderId}</p>
          </div>
          <div className="text-left space-y-2">
            <h4 className="font-semibold">Next Steps:</h4>
            <p className="text-muted-foreground">
              You will receive an SMS confirmation shortly with your delivery details. You can track your order status from the "My Orders" page.
            </p>
          </div>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link href="/marketplace/orders">
                <Package className="mr-2" />
                Track Order
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/marketplace">
                <ArrowLeft className="mr-2" />
                Back to Marketplace
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
