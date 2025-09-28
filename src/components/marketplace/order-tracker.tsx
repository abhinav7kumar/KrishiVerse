'use client';

import {
  PackageCheck,
  Package,
  Truck,
  Warehouse,
  Home,
  PackageX,
  ClipboardCheck,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { TrackingEvent } from '@/lib/data';

type OrderTrackerProps = {
  trackingHistory: TrackingEvent[];
  status: string;
};

const statusIcons: { [key: string]: React.ReactNode } = {
  'Order Confirmed': <ClipboardCheck className="h-6 w-6 sm:h-8 sm:w-8" />,
  Packaged: <Package className="h-6 w-6 sm:h-8 sm:w-8" />,
  Shipped: <Warehouse className="h-6 w-6 sm:h-8 sm:w-8" />,
  'Out for Delivery': <Truck className="h-6 w-6 sm:h-8 sm:w-8" />,
  Delivered: <PackageCheck className="h-6 w-6 sm:h-8 sm:w-8" />,
  Cancelled: <PackageX className="h-6 w-6 sm:h-8 sm:w-8" />,
};

const statusOrder = [
  'Order Confirmed',
  'Packaged',
  'Shipped',
  'Out for Delivery',
  'Delivered',
];

export function OrderTracker({ trackingHistory, status }: OrderTrackerProps) {
  if (status === 'Cancelled') {
    const cancelledEvent = trackingHistory.find(
      (e) => e.status === 'Cancelled'
    );
    return (
      <Card className="border-destructive bg-destructive/10">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive text-destructive-foreground">
              <PackageX className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-destructive">
                Order Cancelled
              </h3>
              <p className="text-sm text-muted-foreground">
                {cancelledEvent?.date}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const completedSteps = trackingHistory.filter((t) => t.isCompleted).length;
  const totalSteps = statusOrder.length;
  const currentStepIndex = Math.min(completedSteps - 1, totalSteps - 2);

  const truckPosition =
    completedSteps === totalSteps
      ? '100%'
      : `calc(${(currentStepIndex / (totalSteps - 1)) * 100}% + ${
          currentStepIndex * 1
        }rem)`;

  return (
    <Card>
      <style jsx>{`
        .truck-animation {
          transition: left 1.5s cubic-bezier(0.65, 0, 0.35, 1);
        }
      `}</style>
      <CardContent className="p-4 sm:p-6 overflow-x-auto">
        <div className="relative pt-16 min-w-[500px]">
          <div className="absolute top-20 flex w-full items-center">
            <div className="h-2 w-full rounded-full bg-muted">
              <div
                className="h-2 rounded-full bg-primary transition-all duration-1000"
                style={{ width: `${((completedSteps - 1) / (totalSteps - 1)) * 100}%` }}
              ></div>
            </div>
          </div>

          <div
            className="truck-animation absolute top-16 z-10 -ml-4"
            style={{ left: truckPosition }}
          >
            <Truck className="h-8 w-8 text-primary" />
          </div>

          <div className="relative flex justify-between">
            {statusOrder.map((stepStatus, index) => {
              const event = trackingHistory.find(
                (e) => e.status === stepStatus
              );
              const isCompleted = event?.isCompleted || false;
              const isCurrent =
                index === completedSteps - 1 && status !== 'Delivered';

              return (
                <div
                  key={stepStatus}
                  className="z-10 flex flex-col items-center text-center w-20"
                >
                  <div
                    className={cn(
                      'flex h-12 w-12 items-center justify-center rounded-full border-2 bg-background transition-all duration-500',
                      isCompleted
                        ? 'border-primary bg-primary/10'
                        : 'border-muted-foreground/30',
                      isCurrent && 'animate-pulse border-4'
                    )}
                  >
                    <div
                      className={cn(
                        'transition-colors duration-500',
                        isCompleted
                          ? 'text-primary'
                          : 'text-muted-foreground/50'
                      )}
                    >
                      {statusIcons[stepStatus]}
                    </div>
                  </div>
                  <p
                    className={cn(
                      'mt-2 text-xs font-semibold sm:text-sm',
                      isCompleted
                        ? 'text-foreground'
                        : 'text-muted-foreground'
                    )}
                  >
                    {stepStatus}
                  </p>
                  <p className="text-xs text-muted-foreground">{event?.date.split(', ')[1]}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-8">
          <h4 className="mb-4 text-lg font-semibold">Tracking History</h4>
          <ul className="space-y-4">
            {trackingHistory
              .filter((e) => e.isCompleted)
              .slice()
              .reverse()
              .map((event) => (
                <li key={event.status} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                      <div className="h-2 w-2 rounded-full bg-primary-foreground"></div>
                    </div>
                    <div className="h-full w-px bg-border"></div>
                  </div>
                  <div>
                    <p className="font-semibold">{event.status}</p>
                    <p className="text-sm text-muted-foreground">
                      {event.date}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {event.location}
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
