'use client';

import { Badge } from '@/components/ui/badge';
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
import { cn } from '@/lib/utils';
import { History, PackageCheck, PackageX, Truck } from 'lucide-react';
import { useState } from 'react';

type OrderItem = {
  name: string;
  quantity: number;
};

type Order = {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
};

const mockOrders: Order[] = [
  {
    id: 'KV-1688556230987',
    date: 'July 5, 2024',
    items: [
      { name: 'Organic Tomatoes', quantity: 2 },
      { name: 'Hand Spade', quantity: 1 },
    ],
    total: 590.0,
    status: 'Delivered',
  },
  {
    id: 'KV-1688469830987',
    date: 'July 4, 2024',
    items: [{ name: 'Organic Compost', quantity: 3 }],
    total: 750.0,
    status: 'Shipped',
  },
  {
    id: 'KV-1688383430987',
    date: 'July 3, 2024',
    items: [
      { name: 'Sikkim Oranges', quantity: 5 },
      { name: 'Garden Rake', quantity: 1 },
    ],
    total: 1000.0,
    status: 'Pending',
  },
  {
    id: 'KV-1688297030987',
    date: 'July 2, 2024',
    items: [{ name: 'Himalayan Apples', quantity: 2 }],
    total: 400.0,
    status: 'Cancelled',
  },
];

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
            <TableHead>Date</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ordersToShow.length > 0 ? (
            ordersToShow.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium text-primary">
                  {order.id}
                </TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  {order.items.map((item) => item.name).join(', ')}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      'flex w-fit items-center gap-2',
                      statusConfig[order.status].color
                    )}
                  >
                    {statusConfig[order.status].icon}
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-semibold">
                  Rs {order.total.toFixed(2)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
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
          <TabsList>
            <TabsTrigger value="all">All Orders</TabsTrigger>
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
