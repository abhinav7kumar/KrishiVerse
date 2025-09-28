'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { mockOrders, type Order } from '@/lib/data';
import { cn } from '@/lib/utils';
import {
  History,
  PackageCheck,
  PackageX,
  Truck,
  Eye,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function OrdersPage() {
  const [orders] = useState<Order[]>(mockOrders);

  const filteredOrders = (status?: Order['status']) => {
    if (!status) return orders;
    return orders.filter((order) => order.status === status);
  };

  const statusConfig = {
    Pending: {
      color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      icon: <History className="h-4 w-4" />,
    },
    Shipped: {
      color: 'bg-blue-100 text-blue-800 border-blue-300',
      icon: <Truck className="h-4 w-4" />,
    },
    Delivered: {
      color: 'bg-green-100 text-green-800 border-green-300',
      icon: <PackageCheck className="h-4 w-4" />,
    },
    Cancelled: {
      color: 'bg-red-100 text-red-800 border-red-300',
      icon: <PackageX className="h-4 w-4" />,
    },
  };

  const OrderTable = ({ ordersToShow }: { ordersToShow: Order[] }) => (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden sm:table-cell text-right">Total</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ordersToShow.length > 0 ? (
            ordersToShow.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">
                  <Link
                    href={`/marketplace/orders/${order.id}`}
                    className="text-primary hover:underline"
                  >
                    {order.id}
                  </Link>
                  <div className="text-muted-foreground text-xs md:hidden mt-1">{order.date}</div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{order.date}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      'flex w-fit items-center gap-2',
                      statusConfig[order.status].color
                    )}
                  >
                    {statusConfig[order.status].icon}
                    <span>{order.status}</span>
                  </Badge>
                </TableCell>
                <TableCell className="hidden sm:table-cell text-right font-semibold">
                  Rs {order.total.toFixed(2)}
                </TableCell>
                <TableCell className="text-center">
                  <Button asChild variant="ghost" size="icon">
                    <Link href={`/marketplace/orders/${order.id}`}>
                      <Eye className="h-5 w-5 text-muted-foreground" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No orders found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-3xl">
          <History className="h-8 w-8 text-primary" />
          My Orders
        </CardTitle>
        <CardDescription>
          View your complete order history and track the status of your
          deliveries.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-3 h-auto sm:w-auto sm:inline-flex">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="Pending">Pending</TabsTrigger>
            <TabsTrigger value="Shipped">Shipped</TabsTrigger>
            <TabsTrigger value="Delivered">Delivered</TabsTrigger>
            <TabsTrigger value="Cancelled">Cancelled</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <OrderTable ordersToShow={filteredOrders()} />
          </TabsContent>
          <TabsContent value="Pending" className="mt-4">
            <OrderTable ordersToShow={filteredOrders('Pending')} />
          </TabsContent>
          <TabsContent value="Shipped" className="mt-4">
            <OrderTable ordersToShow={filteredOrders('Shipped')} />
          </TabsContent>
          <TabsContent value="Delivered" className="mt-4">
            <OrderTable ordersToShow={filteredOrders('Delivered')} />
          </TabsContent>
          <TabsContent value="Cancelled" className="mt-4">
            <OrderTable ordersToShow={filteredOrders('Cancelled')} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
