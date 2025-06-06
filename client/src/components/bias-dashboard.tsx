import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useBiasMetrics } from "@/hooks/use-bias-metrics";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, AlertTriangle } from "lucide-react";

export function BiasAuditDashboard() {
  const { data, biasLogs, isLoading } = useBiasMetrics();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-48 w-full" />
            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="text-center space-y-2">
                  <Skeleton className="h-4 w-16 mx-auto" />
                  <Skeleton className="h-6 w-12 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Bias Audit Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <AlertTriangle className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
            <p className="text-neutral-600">Bias audit data unavailable</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const isNeutral = data.biasMetric <= 4;
  const averageBias = biasLogs?.reduce((sum, log) => sum + parseFloat(log.biasMetric), 0) / (biasLogs?.length || 1) || data.biasMetric;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Bias Audit Dashboard</CardTitle>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isNeutral ? 'bg-green-600' : 'bg-amber-600'}`}></div>
            <Badge variant={isNeutral ? "default" : "secondary"} className={isNeutral ? "bg-green-600" : "bg-amber-600 text-white"}>
              {isNeutral ? "System Neutral" : "Monitoring"}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Chart Placeholder */}
        <div className="h-48 bg-neutral-50 rounded-lg flex items-center justify-center mb-4">
          <div className="text-center">
            <svg className="w-12 h-12 text-neutral-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            <p className="text-sm text-neutral-500">Weekly Bias Metric (B) Chart</p>
            <p className="text-xs text-neutral-400 mt-1">Target: Green band ≤4%</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-xs text-neutral-500">Current Week</p>
            <p className={`text-lg font-bold font-mono ${isNeutral ? 'text-green-600' : 'text-amber-600'}`}>
              {data.biasMetric.toFixed(1)}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-neutral-500">Week 8 Target</p>
            <p className="text-lg font-bold text-neutral-400 font-mono">≤4.0%</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-neutral-500">Season Average</p>
            <p className="text-lg font-bold text-neutral-600 font-mono">
              {averageBias.toFixed(1)}%
            </p>
          </div>
        </div>

        {isNeutral && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <p className="text-sm text-green-800 font-medium">
                System maintains conference neutrality within target parameters
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
