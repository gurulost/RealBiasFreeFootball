import { QuickStats } from "@/components/quick-stats";
import { RankingsTable } from "@/components/rankings-table";
import { BiasAuditDashboard } from "@/components/bias-dashboard";
import { MethodologySection } from "@/components/methodology-section";
import { ConferenceStrength } from "@/components/conference-strength";
import { DataIngestion } from "@/components/data-ingestion";
import { useRankings } from "@/hooks/use-rankings";
import { useBiasMetrics } from "@/hooks/use-bias-metrics";

export default function Home() {
  const { data: rankings, isLoading: rankingsLoading } = useRankings('retro', 2024, 15);
  const { data: biasData } = useBiasMetrics();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <div className="bg-gradient-card rounded-2xl p-8 shadow-elegant-lg border-0">
          <h1 className="text-4xl font-bold text-foreground mb-4 tracking-tight">
            2024 Season Final Rankings
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Definitive college football rankings powered by our bias-free two-layer PageRank algorithm. 
            Complete post-season analysis including all bowl games and playoff results.
          </p>
          <div className="flex items-center justify-center space-x-6 mt-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-muted-foreground">134 Teams Ranked</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-muted-foreground">798 Games Analyzed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-muted-foreground">13 Conferences</span>
            </div>
          </div>
        </div>
      </div>

      {/* Show data ingestion if no rankings available */}
      {(!rankings || rankings.length === 0) && (
        <div className="mb-12 flex justify-center">
          <DataIngestion />
        </div>
      )}

      <div className="space-y-12">
        <QuickStats />
        
        <div className="animate-slide-up">
          <RankingsTable 
            rankings={rankings} 
            isLoading={rankingsLoading}
            showPagination={true}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <BiasAuditDashboard />
          <ConferenceStrength />
        </div>

        <div className="animate-slide-up" style={{ animationDelay: '400ms' }}>
          <MethodologySection />
        </div>
      </div>
    </main>
  );
}
