'use client';

import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Facebook, Twitter, Instagram, Linkedin, Leaf } from 'lucide-react';
import Link from 'next/link';

export function PublicFooter() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <footer className="bg-white">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Logo className="size-6" />
              </div>
              <span className="font-headline text-2xl text-primary">KrishiVerse</span>
            </div>
            <p className="text-muted-foreground">
              Empowering Sikkim’s farmers with AI for a sustainable future.
            </p>
            <div className="flex space-x-4">
              <Link href="#" passHref><Button variant="ghost" size="icon"><Facebook /></Button></Link>
              <Link href="#" passHref><Button variant="ghost" size="icon"><Twitter /></Button></Link>
              <Link href="#" passHref><Button variant="ghost" size="icon"><Instagram /></Button></Link>
              <Link href="#" passHref><Button variant="ghost" size="icon"><Linkedin /></Button></Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:col-span-2 lg:grid-cols-3">
            <div>
              <p className="font-semibold text-foreground">Explore</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="#features" className="text-muted-foreground hover:text-primary">Features</Link></li>
                <li><Link href="/marketplace" className="text-muted-foreground hover:text-primary">Marketplace</Link></li>
                <li><Link href="/dashboard" className="text-muted-foreground hover:text-primary">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-foreground">About Us</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Our Mission</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Careers</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Contact Us</Link></li>
              </ul>
            </div>
            <div className="col-span-2 lg:col-span-1">
              <p className="font-semibold text-foreground">Stay Updated</p>
              <form className="mt-4 space-y-2">
                <Label htmlFor="newsletter-email" className="sr-only">Email</Label>
                <Input id="newsletter-email" type="email" placeholder="Enter your email" />
                <Button className="w-full" type="submit">Subscribe</Button>
              </form>
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} KrishiVerse. All rights reserved.
          </p>
           <button
            onClick={handleScrollToTop}
            className="group fixed bottom-5 right-5 rounded-full bg-primary p-3 text-primary-foreground shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <Leaf className="h-6 w-6 transition-transform group-hover:rotate-12" />
            <span className="sr-only">Scroll to top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
