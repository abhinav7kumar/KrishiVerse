import { Header } from '@/components/layout/header';
import { AppSidebar } from '@/components/layout/sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { CartProvider } from '@/context/cart-context';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Header />
          <main className="min-h-[calc(100vh-4rem)] p-4 pt-6 md:p-6 lg:p-8 bg-background">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </CartProvider>
  );
}
