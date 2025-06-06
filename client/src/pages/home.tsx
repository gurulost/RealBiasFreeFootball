import { QuickStats } from "@/components/quick-stats";
import { RankingsTable } from "@/components/rankings-table";
import { BiasAuditDashboard } from "@/components/bias-dashboard";
import { MethodologySection } from "@/components/methodology-section";
import { ConferenceStrength } from "@/components/conference-strength";
import { DataIngestion } from "@/components/data-ingestion";
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
              2024 Season Definitive Rankings
            </h2>
            <p className="text-neutral-600 mt-1">
              Complete post-season rankings including all bowl games and playoffs • 
              <span className="font-mono text-sm ml-2">
                Final rankings after all 2024-2025 postseason games
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Show data ingestion if no rankings available */}
      {(!rankings || rankings.length === 0) && (
        <div className="mb-8 flex justify-center">
          <DataIngestion />
        </div>
      )}

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
