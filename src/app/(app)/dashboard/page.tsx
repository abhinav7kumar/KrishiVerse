import { MissionsCard } from '@/components/dashboard/missions-card';
import { RecommendationsCard } from '@/components/dashboard/recommendations-card';
import { StatsCards } from '@/components/dashboard/stats-cards';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="mb-4 font-headline text-3xl font-bold text-primary">
          Welcome, Farmer!
        </h2>
        <p className="text-muted-foreground">
          Here&apos;s your farm&apos;s overview for today. Let&apos;s grow something amazing.
        </p>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <RecommendationsCard />
        </div>
        <div className="lg:col-span-2">
          <MissionsCard />
        </div>
      </div>
    </div>
  );
}
