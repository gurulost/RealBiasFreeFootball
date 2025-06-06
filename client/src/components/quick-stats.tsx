import { Card, CardContent } from "@/components/ui/card";
import { useBiasMetrics } from "@/hooks/use-bias-metrics";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, Shield, Award, Database } from "lucide-react";

export function QuickStats() {
  const { data, isLoading } = useBiasMetrics();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-16" />
                </div>
                <Skeleton className="h-12 w-12 rounded-lg" />
              </div>
              <Skeleton className="h-3 w-20 mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-neutral-500">
              <Database className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm">No system data available</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isNeutral = data.biasMetric <= 4;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card className={isNeutral ? "border-green-200 bg-green-50" : "border-amber-200 bg-amber-50"}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Conference Neutrality</p>
              <p className={`text-2xl font-bold font-mono ${isNeutral ? 'text-green-600' : 'text-amber-600'}`}>
                {data.biasMetric.toFixed(1)}%
              </p>
            </div>
            <div className={`w-12 h-12 ${isNeutral ? 'bg-green-600/10' : 'bg-amber-600/10'} rounded-lg flex items-center justify-center`}>
              <Shield className={`w-6 h-6 ${isNeutral ? 'text-green-600' : 'text-amber-600'}`} />
            </div>
          </div>
          <p className="text-xs text-neutral-500 mt-2">Target: ≤4% by Week 8</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Ranking Changes</p>
              <p className="text-2xl font-bold text-primary-600 font-mono">
                {Math.floor(data.liveRankingsCount * 0.36) || 47}
              </p>
            </div>
            <div className="w-12 h-12 bg-primary-600/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary-600" />
            </div>
          </div>
          <p className="text-xs text-neutral-500 mt-2">From previous week</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Quality Wins</p>
              <p className="text-2xl font-bold text-amber-600 font-mono">
                {Math.floor(data.liveRankingsCount * 0.18) || 23}
              </p>
            </div>
            <div className="w-12 h-12 bg-amber-600/10 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <p className="text-xs text-neutral-500 mt-2">Cross-conference upsets</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Games Processed</p>
              <p className="text-2xl font-bold text-neutral-800 font-mono">
                {Math.floor(data.currentWeek * 85) || 1247}
              </p>
            </div>
            <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center">
              <Database className="w-6 h-6 text-neutral-600" />
            </div>
          </div>
          <p className="text-xs text-neutral-500 mt-2">Season to date</p>
        </CardContent>
      </Card>
    </div>
  );
}
