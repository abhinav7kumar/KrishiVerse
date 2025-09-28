'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { mockOrders } from '@/lib/data';
import { notFound } from 'next/navigation';
import { useMemo } from 'react';
import { OrderTracker } from '@/components/marketplace/order-tracker';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, FileText, Home, Phone, User } from 'lucide-react';

export default function OrderDetailsPage({
  params,
}: {
  params: { orderId: string };
}) {
  const order = useMemo(
    () => mockOrders.find((o) => o.id === params.orderId),
    [params.orderId]
  );

  if (!order) {
    notFound();
  }

  const subtotal = order.total / 1.05 - 50;
  const deliveryCharge = 50;
  const tax = order.total - subtotal - deliveryCharge;

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="icon" className="shrink-0">
          <Link href="/marketplace/orders">
            <ArrowLeft />
          </Link>
        </Button>
        <div>
          <h1 className="font-headline text-xl md:text-3xl font-bold text-primary truncate">
            Order Details
          </h1>
          <p className="text-muted-foreground text-sm md:text-base truncate">
            Tracking information for order{' '}
            <span className="font-semibold text-primary">{order.id}</span>.
          </p>
        </div>
      </div>
      <OrderTracker trackingHistory={order.trackingHistory} status={order.status} />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-start">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText /> Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between py-2"
                >
                  <p>
                    {item.name} <span className="text-muted-foreground">x {item.quantity}</span>
                  </p>
                  {/* Mock price - in a real app, this would be stored with the order */}
                  <p className="font-medium">Rs {(subtotal / order.items.length).toFixed(2)}</p>
                </div>
              ))}
              <Separator className="my-4" />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Subtotal</p>
                  <p className="font-medium">Rs {subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Delivery</p>
                  <p className="font-medium">Rs {deliveryCharge.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Tax (5%)</p>
                  <p className="font-medium">Rs {tax.toFixed(2)}</p>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <p>Total Paid</p>
                  <p>Rs {order.total.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home /> Delivery Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Aarav Sharma</span>
              </div>
              <p>123 Mountain View, Near MG Marg</p>
              <p>Gangtok, Sikkim, 737101</p>
              <div className="flex items-center gap-2 pt-2">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
