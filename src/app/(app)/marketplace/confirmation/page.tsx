'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Package, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type CartItem = {
  id: string;
  name: string;
  price: string;
  priceValue: number;
  quantity: number;
};

type OrderDetails = {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  tax: number;
  total: number;
};

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  useEffect(() => {
    const storedOrder = sessionStorage.getItem('latestOrder');
    if (storedOrder) {
      const parsedOrder: OrderDetails = JSON.parse(storedOrder);
      if (parsedOrder.orderId === orderId) {
        setOrderDetails(parsedOrder);
      }
      // Clean up session storage after retrieving the data
      // sessionStorage.removeItem('latestOrder');
    }
  }, [orderId]);

  return (
    <div className="flex items-center justify-center py-12">
      <Card className="w-full max-w-2xl">
        <CardHeader className="items-center text-center">
          <CheckCircle className="h-20 w-20 text-green-500" />
          <CardTitle className="font-headline text-3xl text-green-600">
            Payment Successful!
          </CardTitle>
          <CardDescription>
            Thank you for your purchase. Your order has been confirmed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground">Your Order ID is</p>
            <p className="text-2xl font-bold text-primary">{orderId}</p>
          </div>
          
          {orderDetails && (
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {orderDetails.items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} x {item.quantity}</span>
                    <span>Rs {(item.priceValue * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">Rs {orderDetails.subtotal.toFixed(2)}</span>
                </div>
                 <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="font-semibold">Rs {orderDetails.deliveryCharge.toFixed(2)}</span>
                </div>
                 <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (5%)</span>
                  <span className="font-semibold">Rs {orderDetails.tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total Paid</span>
                  <span>Rs {orderDetails.total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="text-center space-y-2">
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
