import { useBiasMetrics } from "@/hooks/use-bias-metrics";

export function BiasAlert() {
  const { data } = useBiasMetrics();

  if (!data || data.biasMetric > 4) return null; // Only show when system is neutral

  return (
    <div className="bg-green-600 text-white py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center space-x-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span className="text-sm font-medium">
            Bias Metric: <span className="font-mono">{data.biasMetric.toFixed(1)}%</span> - System Neutral ✓
          </span>
          <span className="text-xs opacity-75">Target: ≤4% after Week 8</span>
        </div>
      </div>
    </div>
  );
}
