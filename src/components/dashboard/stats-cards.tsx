import { CloudRain, Sun, Thermometer, Tractor } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const stats = [
  {
    title: 'Weather',
    value: 'Partly Cloudy',
    icon: Sun,
    description: '28°C, Light Breeze',
  },
  {
    title: 'Rainfall',
    value: '5mm',
    icon: CloudRain,
    description: 'Expected in 2 hours',
  },
  {
    title: 'Soil Health',
    value: '7.8 / 10',
    icon: Tractor,
    description: 'Optimal pH, good moisture',
  },
  {
    title: 'Temperature',
    value: '28°C',
    icon: Thermometer,
    description: 'Feels like 30°C',
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
