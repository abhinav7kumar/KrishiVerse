import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { missions as mockMissions } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Trophy } from 'lucide-react';

export type Mission = {
  title: string;
  description: string;
  xp: number;
  isCompleted: boolean;
  icon: React.ElementType;
};

export function MissionsCard() {
  const missions = mockMissions;
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="text-secondary" />
          Weekly Missions
        </CardTitle>
        <CardDescription>
          Complete tasks to earn XP and rewards!
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {missions.map((mission, index) => (
          <div
            key={index}
            className={cn(
              'flex items-start gap-4 rounded-lg border p-4 transition-colors',
              mission.isCompleted ? 'bg-secondary/20' : 'bg-background'
            )}
          >
            <mission.icon
              className={cn(
                'mt-1 h-5 w-5',
                mission.isCompleted
                  ? 'text-secondary'
                  : 'text-muted-foreground'
              )}
            />
            <div className="flex-1">
              <p
                className={cn(
                  'font-semibold',
                  mission.isCompleted && 'line-through text-muted-foreground'
                )}
              >
                {mission.title}
              </p>
              <p className="text-sm text-muted-foreground">
                {mission.description}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-bold text-secondary">+{mission.xp} XP</p>
              <Checkbox checked={mission.isCompleted} className="mt-1" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
