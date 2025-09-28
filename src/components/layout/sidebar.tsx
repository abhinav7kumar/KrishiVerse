'use client';

import {
  Bot,
  Gamepad2,
  History,
  LayoutDashboard,
  Leaf,
  ScanLine,
  ShoppingCart,
  Store,
  Trophy,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Logo } from '@/components/icons';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/cart-context';
import { Badge } from '../ui/badge';

const navItems = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    tooltip: 'Dashboard',
  },
  {
    href: '/scan',
    label: 'Farm Scan',
    icon: ScanLine,
    tooltip: 'Scan Your Farm',
  },
  {
    href: '/chatbot',
    label: 'AI Chatbot',
    icon: Bot,
    tooltip: 'Chat with AI',
  },
  {
    href: '/leaderboard',
    label: 'Leaderboard',
    icon: Trophy,
    tooltip: 'Village Leaderboard',
  },
  {
    href: '/marketplace',
    label: 'Marketplace',
    icon: Store,
    tooltip: 'Sustainable Produce',
    isGroup: true,
  },
  {
    href: '/marketplace/cart',
    label: 'Cart',
    icon: ShoppingCart,
    isSubItem: true,
    hasBadge: true,
  },
  {
    href: '/marketplace/orders',
    label: 'My Orders',
    icon: History,
    isSubItem: true,
    exactMatch: true,
  },
  {
    href: '/simulation',
    label: 'Sim-Farm',
    icon: Gamepad2,
    tooltip: 'Farming Simulator',
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { cart } = useCart();
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Logo className="size-5" />
          </div>
          <span className="font-headline text-xl text-primary">KrishiVerse</span>
          <SidebarTrigger className="ml-auto" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => {
            const isActive = item.exactMatch
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <SidebarMenuItem key={item.label}>
                <Link href={item.href} passHref>
                  <SidebarMenuButton
                    as="a"
                    isActive={isActive}
                    tooltip={
                      item.tooltip
                        ? {
                            children: item.tooltip,
                            className: 'font-body',
                          }
                        : undefined
                    }
                  >
                    <item.icon />
                    <span className={cn(isActive && 'font-bold')}>
                      {item.label}
                    </span>
                    {item.hasBadge && cartItemCount > 0 && (
                      <Badge className="ml-auto" variant="secondary">
                        {cartItemCount}
                      </Badge>
                    )}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
