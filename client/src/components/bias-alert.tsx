import { useBiasMetrics } from "@/hooks/use-bias-metrics";
import { Shield, CheckCircle2, AlertTriangle } from "lucide-react";

export function BiasAlert() {
  const { data } = useBiasMetrics();

  if (!data) return null;

  const isNeutral = data.biasMetric <= 4;
  const bgClass = isNeutral 
    ? "bg-gradient-to-r from-green-500 to-emerald-600" 
    : "bg-gradient-to-r from-yellow-500 to-orange-600";

  return (
    <div className={`${bgClass} text-white py-3 shadow-elegant`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              {isNeutral ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <AlertTriangle className="w-4 h-4" />
              )}
            </div>
            <div>
              <span className="text-sm font-semibold">
                Bias Monitoring: <span className="font-mono">{data.biasMetric.toFixed(1)}%</span>
              </span>
              <span className="text-xs opacity-90 ml-2">
                {isNeutral ? "System Neutral" : "Monitoring Active"}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <span className="opacity-90">Independent teams isolated</span>
            <span className="opacity-90">Target: ≤4.0%</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="font-medium">Live</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
