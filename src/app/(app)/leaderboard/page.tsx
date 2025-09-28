'use client';

import { LeaderboardTable } from '@/components/leaderboard/leaderboard-table';
import { TopThree } from '@/components/leaderboard/top-three';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { leaderboardData } from '@/lib/data';
import { Trophy } from 'lucide-react';

export default function LeaderboardPage() {
  const topThree = leaderboardData.filter((f) => f.rank <= 3);
  const restOfLeaderboard = leaderboardData.filter((f) => f.rank > 3);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="flex items-center justify-center gap-3 font-headline text-4xl font-bold text-primary">
          <Trophy className="h-10 w-10 text-secondary" />
          Village Leaderboard
        </h1>
        <p className="mt-2 text-muted-foreground">
          See the top eco-friendly farmers in your region. Keep up the great
          work!
        </p>
      </div>

      <TopThree farmers={topThree} />

      <Card>
        <CardHeader>
          <CardTitle>All Farmers</CardTitle>
          <CardDescription>
            The complete ranking of all participants.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LeaderboardTable farmers={restOfLeaderboard} />
        </CardContent>
      </Card>
    </div>
  );
}
