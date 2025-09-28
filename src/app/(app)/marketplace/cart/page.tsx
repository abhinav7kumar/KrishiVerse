'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/cart-context';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, subtotal } = useCart();
  const deliveryCharge = subtotal > 0 ? 50 : 0;
  const total = subtotal + deliveryCharge;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-start">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-3xl">
              <ShoppingCart className="h-8 w-8 text-primary" />
              Your Shopping Cart
            </CardTitle>
            <CardDescription>
              Review and manage the items in your cart.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-muted-foreground/30 py-12 text-center">
                <ShoppingCart className="h-16 w-16 text-muted-foreground/50" />
                <h3 className="text-xl font-semibold">Your cart is empty</h3>
                <p className="text-muted-foreground">
                  Looks like you haven't added anything to your cart yet.
                </p>
                <Button asChild>
                  <Link href="/marketplace">Start Shopping</Link>
                </Button>
              </div>
            ) : (
              <div className="divide-y">
                {cart.map((item) => {
                  const placeholder = PlaceHolderImages.find(
                    (p) => p.id === item.id
                  );
                  return (
                    <div
                      key={item.id}
                      className="flex flex-wrap items-center gap-4 py-4"
                    >
                      <div className="relative h-24 w-24 flex-shrink-0 self-start overflow-hidden rounded-md md:h-20 md:w-20">
                        <Image
                          src={placeholder?.imageUrl || ''}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 basis-40">
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.price}
                        </p>
                        <span className="mt-1 inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                          Sustainable
                        </span>
                      </div>
                      <div className="flex flex-1 items-center justify-between gap-2 sm:flex-none">
                        <div className="flex items-center gap-2">
                            <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            >
                            <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center font-bold">
                            {item.quantity}
                            </span>
                            <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                            }
                            >
                            <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="w-24 text-right font-semibold">
                          Rs {(item.priceValue * item.quantity).toFixed(2)}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="sticky top-20">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold">Rs {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery Charge</span>
              <span className="font-semibold">
                Rs {deliveryCharge.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Estimated Delivery</span>
              <span>2-3 days</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>Rs {total.toFixed(2)}</span>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button
              className="w-full"
              disabled={cart.length === 0}
              asChild
            >
              <Link href="/marketplace/checkout">Proceed to Checkout</Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/marketplace">Continue Shopping</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
