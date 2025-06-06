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
  const averageBias = biasLogs && biasLogs.length > 0 
    ? biasLogs.reduce((sum, log) => sum + parseFloat(log.biasMetric), 0) / biasLogs.length 
    : data.biasMetric;

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
        {/* Bias Trend Chart */}
        <div className="h-48 bg-neutral-50 rounded-lg p-4 mb-4">
          <div className="h-full flex items-end justify-between space-x-1">
            {biasLogs && biasLogs.length > 0 ? (
              biasLogs.slice(-12).map((log, idx) => {
                const bias = parseFloat(log.biasMetric);
                const height = Math.max((bias / 8) * 100, 8); // Scale to chart height
                const isTarget = bias <= 4;
                return (
                  <div key={idx} className="flex flex-col items-center flex-1">
                    <div 
                      className={`w-full rounded-t transition-all ${isTarget ? 'bg-green-600' : 'bg-amber-600'}`}
                      style={{ height: `${height}%` }}
                      title={`Week ${log.week}: ${bias.toFixed(1)}%`}
                    />
                    <span className="text-xs text-neutral-500 mt-1">{log.week}</span>
                  </div>
                );
              })
            ) : (
              // Current week bar if no historical data
              <div className="flex flex-col items-center flex-1">
                <div 
                  className={`w-full rounded-t ${isNeutral ? 'bg-green-600' : 'bg-amber-600'}`}
                  style={{ height: `${Math.max((data.biasMetric / 8) * 100, 8)}%` }}
                  title={`Current: ${data.biasMetric.toFixed(1)}%`}
                />
                <span className="text-xs text-neutral-500 mt-1">15</span>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-neutral-400">Weekly Bias Trend</span>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-2 bg-green-600 rounded-sm"></div>
              <span className="text-xs text-neutral-500">≤4% Target</span>
              <div className="w-3 h-2 bg-amber-600 rounded-sm"></div>
              <span className="text-xs text-neutral-500">{'>'}4% Monitor</span>
            </div>
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
