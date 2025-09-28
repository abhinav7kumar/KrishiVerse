import { LeaderboardTable } from '@/components/leaderboard/leaderboard-table';
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
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-3xl">
            <Trophy className="h-8 w-8 text-secondary" />
            Village Leaderboard
          </CardTitle>
          <CardDescription>
            See the top eco-friendly farmers in your region. Keep up the great
            work!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LeaderboardTable farmers={leaderboardData} />
        </CardContent>
      </Card>
    </div>
  );
}
