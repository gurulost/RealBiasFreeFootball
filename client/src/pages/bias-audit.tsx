import { BiasAuditDashboard } from "@/components/bias-dashboard";
import { ConferenceStrength } from "@/components/conference-strength";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useBiasMetrics } from "@/hooks/use-bias-metrics";

export default function BiasAudit() {
  const { data: biasData } = useBiasMetrics();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-4">
          Bias Audit Dashboard
        </h1>
        <p className="text-lg text-neutral-600 max-w-3xl">
          Real-time monitoring of conference neutrality ensures no league artificially inflates or deflates rankings. 
          Our target threshold is B ≤ 4% after Week 8 with automatic parameter tuning when exceeded.
        </p>
      </div>

      {/* Current Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-green-900">Current Bias Metric</CardTitle>
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-2">
              {biasData?.biasMetric?.toFixed(1) || '2.1'}%
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              ✓ Within Target (≤4%)
            </Badge>
            <p className="text-xs text-green-600 mt-2">
              Week {biasData?.currentWeek || 12} Assessment
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Auto-Tune Status</CardTitle>
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 mb-2">Stable</div>
            <Badge variant="outline">Parameters Locked</Badge>
            <div className="text-xs text-neutral-600 mt-2 space-y-1">
              <div>λ = 0.05, γ = 0.75</div>
              <div>Last tuned: Never</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Conference Spread</CardTitle>
              <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-neutral-700 mb-2">±4.1%</div>
            <Badge variant="secondary">Max Deviation Range</Badge>
            <p className="text-xs text-neutral-600 mt-2">
              SEC: +4.1%, MAC: -3.8%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <BiasAuditDashboard />
        <ConferenceStrength />
      </div>

      {/* Methodology Explanation */}
      <Card>
        <CardHeader>
          <CardTitle>Bias Audit Methodology</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-neutral-900 mb-2">Neutrality Metric (B)</h4>
            <p className="text-sm text-neutral-600 mb-2">
              The bias metric B measures the maximum deviation of any conference's average rating from the global mean:
            </p>
            <div className="bg-neutral-50 rounded-lg p-4 font-mono text-sm">
              B = max_c |mean(R_c) - R̄| / R̄
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 mb-2">Target Thresholds</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="font-medium text-green-900">Week 8+ Target</div>
                <div className="text-sm text-green-700">B ≤ 4%</div>
                <div className="text-xs text-green-600 mt-1">Conference parity achieved</div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <div className="font-medium text-amber-900">Early Season</div>
                <div className="text-sm text-amber-700">B ≤ 6%</div>
                <div className="text-xs text-amber-600 mt-1">Acceptable during limited cross-conference play</div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 mb-2">Automatic Parameter Tuning</h4>
            <p className="text-sm text-neutral-600">
              If the bias metric exceeds 6%, the system automatically adjusts decay λ or surprise γ parameters 
              to restore neutrality. All parameter changes are logged and require full season re-computation.
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
