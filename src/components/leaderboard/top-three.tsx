
'use client';

import { Farmer } from './leaderboard-table';
import { Card } from '../ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Crown, Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';

export function TopThree({ farmers }: { farmers: Farmer[] }) {
  const sortedFarmers = [...farmers].sort((a, b) => a.rank - b.rank);
  const [first, second, third] = sortedFarmers;

  const FarmerCard = ({ farmer, rank }: { farmer: Farmer; rank: number }) => {
    const avatar = PlaceHolderImages.find((p) => p.id === farmer.id);

    return (
      <div className={cn(
        'relative flex flex-col items-center transition-all duration-300',
        rank === 1 && '-translate-y-8 hover:-translate-y-10'
      )}>
        <div className="relative">
          {rank === 1 && (
            <Crown className="absolute -top-6 left-1/2 -translate-x-1/2 h-8 w-8 text-yellow-400 rotate-0" />
          )}
          <Avatar className={cn(
            'h-24 w-24 border-4',
            rank === 1 && 'border-yellow-400',
            rank === 2 && 'border-gray-300',
            rank === 3 && 'border-yellow-700'
          )}>
            <AvatarImage src={avatar?.imageUrl} alt={farmer.name} />
            <AvatarFallback className="text-3xl">{farmer.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        <Card className={cn(
          'relative -mt-12 w-full pt-16 pb-4 text-center shadow-lg overflow-visible',
          'bg-gradient-to-br from-background to-muted'
        )}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary text-primary-foreground h-10 w-10 flex items-center justify-center text-xl font-bold border-4 border-background">
            {farmer.rank}
          </div>
          <p className="font-bold text-lg text-primary">{farmer.name}</p>
          <p className="text-sm text-muted-foreground">{farmer.village}</p>
          <p className="font-headline text-2xl font-bold text-secondary mt-2">{farmer.xp} XP</p>
        </Card>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-end px-4 md:px-0">
      <div className="md:order-2">
        {first && <FarmerCard farmer={first} rank={1} />}
      </div>
      <div className="md:order-1">
        {second && <FarmerCard farmer={second} rank={2} />}
      </div>
      <div className="md:order-3">
        {third && <FarmerCard farmer={third} rank={3} />}
      </div>
    </div>
  );
}
