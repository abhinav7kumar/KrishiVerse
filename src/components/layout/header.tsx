
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { LogOut, User, ShoppingCart, History } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/context/cart-context';
import { Badge } from '../ui/badge';
import { useEffect, useMemo, useState } from 'react';

const baseTitleMap: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/scan': 'AR Farm Scan',
  '/chatbot': 'AI Chatbot',
  '/leaderboard': 'Village Leaderboards',
  '/marketplace': 'Sustainable Marketplace',
  '/marketplace/cart': 'Your Cart',
  '/marketplace/checkout': 'Checkout',
  '/marketplace/confirmation': 'Order Confirmed',
  '/marketplace/orders': 'My Orders',
  '/simulation': 'Farming Simulator',
};

type UserData = {
  name: string;
  email: string;
};

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { cart } = useCart();
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('krishi-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const title = useMemo(() => {
    if (pathname.startsWith('/marketplace/orders/')) {
      const orderId = pathname.split('/').pop();
      return `Track Order: ${orderId}`;
    }
    return baseTitleMap[pathname] || 'KrishiVerse';
  }, [pathname]);

  const handleLogout = () => {
    sessionStorage.removeItem('krishi-user');
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <SidebarTrigger className="md:hidden" />
      <h1 className="font-headline text-lg font-semibold text-foreground md:text-xl">
        {title}
      </h1>
      <div className="ml-auto flex items-center gap-2">
        <Link href="/marketplace/cart">
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart />
            {cartItemCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full p-0"
              >
                {cartItemCount}
              </Badge>
            )}
          </Button>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src="https://picsum.photos/seed/farmer/100/100"
                  alt={user?.name || 'Farmer'}
                />
                <AvatarFallback>{user?.name.charAt(0) || 'F'}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            {user && (
              <>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuItem asChild>
              <Link href="/dashboard">
                <User className="mr-2" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/marketplace/orders">
                <History className="mr-2" />
                My Orders
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
