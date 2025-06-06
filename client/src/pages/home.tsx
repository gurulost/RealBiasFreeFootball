import { QuickStats } from "@/components/quick-stats";
import { RankingsTable } from "@/components/rankings-table";
import { BiasAuditDashboard } from "@/components/bias-dashboard";
import { MethodologySection } from "@/components/methodology-section";
import { ConferenceStrength } from "@/components/conference-strength";
import { useRankings } from "@/hooks/use-rankings";
import { useBiasMetrics } from "@/hooks/use-bias-metrics";

export default function Home() {
  const { data: rankings, isLoading: rankingsLoading } = useRankings('live');
  const { data: biasData } = useBiasMetrics();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">
              Week {biasData?.currentWeek || 12} Live Rankings
            </h2>
            <p className="text-neutral-600 mt-1">
              Updated weekly with risk multipliers and surprise factors • 
              <span className="font-mono text-sm ml-2">
                Next update: {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZoneName: 'short'
                })}
              </span>
            </p>
          </div>
        </div>
      </div>

      <QuickStats />
      
      <div className="mb-8">
        <RankingsTable 
          rankings={rankings} 
          isLoading={rankingsLoading}
          showPagination={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <BiasAuditDashboard />
        <ConferenceStrength />
      </div>

      <MethodologySection />
    </main>
  );
}
