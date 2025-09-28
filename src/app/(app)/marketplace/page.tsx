'use client';

import { ProduceGrid } from '@/components/marketplace/produce-grid';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { marketplaceProduce, produceCategories } from '@/lib/data';
import { ShoppingCart, Search } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Produce } from '@/lib/data';

export default function MarketplacePage() {
  const [filteredProduce, setFilteredProduce] = useState<Produce[]>(marketplaceProduce);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilter = (category: string) => {
    setActiveCategory(category);
    setSearchTerm('');
    if (category === 'all') {
      setFilteredProduce(marketplaceProduce);
    } else {
      const filtered = marketplaceProduce.filter(
        (p) => p.category === category
      );
      setFilteredProduce(filtered);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    setActiveCategory('all');

    if (term.trim() === '') {
      setFilteredProduce(marketplaceProduce);
      return;
    }

    const searched = marketplaceProduce.filter((p) =>
      p.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProduce(searched);
  };

  return (
    <div className="space-y-8">
      <Card className="bg-primary text-primary-foreground">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-3xl">
            <ShoppingCart className="h-8 w-8" />
            Sustainable Marketplace
          </CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Exclusive access to sell and buy sustainable produce and supplies at
            premium prices.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search for products..."
            className="pl-10"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={activeCategory === 'all' ? 'secondary' : 'outline'}
            onClick={() => handleFilter('all')}
          >
            All
          </Button>
          {produceCategories.map((cat) => (
            <Button
              key={cat.id}
              variant={activeCategory === cat.id ? 'secondary' : 'outline'}
              onClick={() => handleFilter(cat.id)}
              className="flex items-center gap-2"
            >
              <cat.icon className="h-4 w-4" />
              <span>{cat.name}</span>
            </Button>
          ))}
        </div>
      </div>

      <ProduceGrid produce={filteredProduce} />
    </div>
  );
}
