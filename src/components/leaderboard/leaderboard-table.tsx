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

export type Farmer = {
  rank: number;
  name: string;
  village: string;
  xp: number;
  badge?: LucideIcon;
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
            <TableHead className="w-[100px] text-center">Badge</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {farmers.map((farmer) => (
            <TableRow
              key={farmer.rank}
              className={cn(farmer.rank <= 3 && 'bg-secondary/10')}
            >
              <TableCell className="text-center font-bold text-lg">
                {farmer.rank}
              </TableCell>
              <TableCell className="font-medium">{farmer.name}</TableCell>
              <TableCell className="text-muted-foreground">
                {farmer.village}
              </TableCell>
              <TableCell className="text-right font-semibold text-primary">
                {farmer.xp}
              </TableCell>
              <TableCell className="text-center">
                {farmer.badge && (
                  <farmer.badge className="mx-auto h-6 w-6 text-secondary" />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
