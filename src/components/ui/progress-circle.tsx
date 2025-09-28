'use client';

import { cn } from '@/lib/utils';
import React from 'react';

type ProgressCircleProps = {
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
};

export const ProgressCircle = ({
  value,
  size = 120,
  strokeWidth = 10,
  className,
}: ProgressCircleProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  let colorClass = 'text-primary';
  if (value < 40) {
    colorClass = 'text-destructive';
  } else if (value < 70) {
    colorClass = 'text-secondary';
  }

  return (
    <div
      className={cn('relative flex items-center justify-center', className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          className="text-muted"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={cn('transition-all duration-500', colorClass)}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <span className="absolute text-xl font-bold text-foreground">
        {Math.round(value)}
      </span>
    </div>
  );
};
