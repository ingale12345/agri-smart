import { Card, CardContent } from '@agri-smart/shared/components/ui/card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@agri-smart/shared/lib/utils';

type StatCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  change: string;
  changeType: 'up' | 'down';
  changeText: string;
  iconBg: string; // Tailwind class like "bg-green-100"
};

export function StatCard({
  icon,
  label,
  value,
  change,
  changeType,
  changeText,
  iconBg,
}: StatCardProps) {
  const isPositive = changeType === 'up';

  return (
    <Card className="w-full max-w-xs">
      <CardContent className="flex items-center gap-4 p-4">
        <div className={cn('p-3 rounded-full', iconBg)}>{icon}</div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-semibold">{value}</p>
          <div
            className={cn(
              'text-sm flex items-center',
              isPositive ? 'text-green-600' : 'text-red-500'
            )}
          >
            {isPositive ? (
              <ArrowUpRight size={16} />
            ) : (
              <ArrowDownRight size={16} />
            )}
            <span className="ml-1">
              {change} {changeText}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
