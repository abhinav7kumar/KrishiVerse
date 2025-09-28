import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export type Farmer = {
  rank: number;
  name: string;
  village: string;
  xp: number;
  badge?: LucideIcon;
  id: string;
};

type LeaderboardTableProps = {
  farmers: Farmer[];
};

export function LeaderboardTable({ farmers }: LeaderboardTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px] text-center">Rank</TableHead>
            <TableHead>Farmer</TableHead>
            <TableHead>Village</TableHead>
            <TableHead className="text-right">XP</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {farmers.map((farmer) => {
            const avatar = PlaceHolderImages.find((p) => p.id === farmer.id);
            return (
              <TableRow key={farmer.rank}>
                <TableCell className="text-center font-bold text-lg text-muted-foreground">
                  {farmer.rank}
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={avatar?.imageUrl} alt={farmer.name} />
                      <AvatarFallback>
                        {farmer.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span>{farmer.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {farmer.village}
                </TableCell>
                <TableCell className="text-right font-semibold text-primary">
                  {farmer.xp}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
