'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/cart-context';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Home,
  Package,
  Store,
  CreditCard,
  Landmark,
  Wallet,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { addDays, format } from 'date-fns';
import { useEffect, useState } from 'react';

const checkoutSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  address: z.string().min(10, 'Please enter a full address'),
  phone: z.string().regex(/^\d{10}$/, 'Please enter a valid 10-digit phone number'),
  paymentMethod: z.enum(['upi', 'card', 'netbanking']),
  upiId: z.string().optional(),
  deliveryOption: z.enum(['doorstep', 'pickup', 'center']),
  promoCode: z.string().optional(),
}).refine(data => {
    if (data.paymentMethod === 'upi') {
      return data.upiId && z.string().email().safeParse(`${data.upiId.replace('@', '.')}@example.com`).success;
    }
    return true;
  }, {
    message: "Please enter a valid UPI ID (e.g., name@bank)",
    path: ["upiId"],
  });

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();

  const deliveryCharge = subtotal > 0 ? 50 : 0;
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + deliveryCharge + tax;
  const estimatedDeliveryDate = format(addDays(new Date(), 3), 'MMMM dd, yyyy');

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: '',
      address: '',
      phone: '',
      paymentMethod: 'upi',
      upiId: 'abhinav.kumar@oksbi',
      deliveryOption: 'doorstep',
      promoCode: '',
    },
  });
  
  const paymentMethod = form.watch('paymentMethod');

  const onSubmit = (data: CheckoutFormValues) => {
    const orderId = `KV-${Date.now()}`;
    const orderDetails = {
      orderId,
      items: cart,
      subtotal,
      deliveryCharge,
      tax,
      total,
      shippingInfo: data,
      estimatedDeliveryDate,
    };
    
    toast({
      title: 'Redirecting to Payment...',
      description: 'Please complete your payment to confirm the order.',
    });

    setTimeout(() => {
      sessionStorage.setItem('latestOrder', JSON.stringify(orderDetails));
      router.push(`/marketplace/confirmation?orderId=${orderId}`);
      clearCart();
    }, 2000);
  };
  
  useEffect(() => {
    if (cart.length === 0 && !sessionStorage.getItem('latestOrder')) {
      router.replace('/marketplace/cart');
    }
  }, [cart, router]);


  return (
    <div className="mx-auto max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-3xl">
            <CreditCard className="h-8 w-8 text-primary" />
            Confirm Your Order
          </CardTitle>
          <CardDescription>
            Please provide your details and confirm your order to proceed to payment.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delivery Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your 10-digit phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Payment Method</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-3 gap-4"
                        >
                          <FormItem>
                            <RadioGroupItem value="upi" id="upi" className="peer sr-only" />
                            <FormLabel htmlFor="upi" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                              <Wallet className="mb-3 h-6 w-6"/>
                              UPI
                            </FormLabel>
                          </FormItem>
                          <FormItem>
                             <RadioGroupItem value="card" id="card" className="peer sr-only" />
                            <FormLabel htmlFor="card" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                              <CreditCard className="mb-3 h-6 w-6"/>
                              Card
                            </FormLabel>
                          </FormItem>
                          <FormItem>
                             <RadioGroupItem value="netbanking" id="netbanking" className="peer sr-only" />
                            <FormLabel htmlFor="netbanking" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                              <Landmark className="mb-3 h-6 w-6"/>
                              Netbanking
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {paymentMethod === 'upi' && (
                  <FormField
                    control={form.control}
                    name="upiId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>UPI ID</FormLabel>
                        <FormControl>
                          <Input placeholder="your-upi-id@bank" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="deliveryOption"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Delivery Option</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-2"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <RadioGroupItem value="doorstep" />
                            </FormControl>
                            <FormLabel className="font-normal flex items-center gap-2">
                              <Home className="h-5 w-5 text-primary" />
                              Doorstep Delivery
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <RadioGroupItem value="pickup" />
                            </FormControl>
                            <FormLabel className="font-normal flex items-center gap-2">
                              <Store className="h-5 w-5 text-secondary" />
                              Pick-up Point
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                              <RadioGroupItem value="center" />
                            </FormControl>
                            <FormLabel className="font-normal flex items-center gap-2">
                              <Package className="h-5 w-5 text-accent" />
                              Govt. Distribution Center
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </div>

              <div className="space-y-6">
                <Card className="bg-muted/50">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.name} x {item.quantity}</span>
                        <span>Rs {(item.priceValue * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-semibold">Rs {subtotal.toFixed(2)}</span>
                    </div>
                     <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery</span>
                      <span className="font-semibold">Rs {deliveryCharge.toFixed(2)}</span>
                    </div>
                     <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax (5%)</span>
                      <span className="font-semibold">Rs {tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>Rs {total.toFixed(2)}</span>
                    </div>
                  </CardContent>
                </Card>
                <Button type="submit" className="w-full text-lg py-6" size="lg" disabled={cart.length === 0}>
                  Proceed to Payment
                  <CreditCard className="ml-2"/>
                </Button>
                <FormField
                  control={form.control}
                  name="promoCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Promo Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter promo code (if any)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}