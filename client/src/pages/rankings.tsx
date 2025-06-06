import { useState } from 'react';
import { WeekSelector } from "@/components/week-selector";
import { RankingsTable } from "@/components/rankings-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRankings } from "@/hooks/use-rankings";

export default function Rankings() {
  const [selectedWeek, setSelectedWeek] = useState(12);
  const [selectedSeason, setSelectedSeason] = useState(2024);
  const [trackType, setTrackType] = useState<'live' | 'retro'>('live');

  const { data: rankings, isLoading } = useRankings(trackType, selectedSeason, selectedWeek);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-4">
          College Football Rankings
        </h1>
        <p className="text-lg text-neutral-600 max-w-3xl">
          Bias-free rankings using our two-layer PageRank algorithm. 
          Choose between live weekly updates and definitive end-of-season retrospective rankings.
        </p>
      </div>

      <Tabs defaultValue="live" onValueChange={(value) => setTrackType(value as 'live' | 'retro')}>
        <div className="flex items-center justify-between mb-6">
          <TabsList className="grid w-fit grid-cols-2">
            <TabsTrigger value="live" className="px-8">
              Live Rankings
            </TabsTrigger>
            <TabsTrigger value="retro" className="px-8">
              Retro Rankings
            </TabsTrigger>
          </TabsList>

          {trackType === 'live' && (
            <WeekSelector
              selectedWeek={selectedWeek}
              selectedSeason={selectedSeason}
              onWeekChange={setSelectedWeek}
              onSeasonChange={setSelectedSeason}
            />
          )}
        </div>

        <TabsContent value="live" className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-blue-900">Live Rankings</h3>
                <p className="text-sm text-blue-700 mt-1">
                  Updated weekly with frozen pre-game expectations, risk multipliers, and shrinkage weighting for early season stability.
                </p>
              </div>
            </div>
          </div>

          <RankingsTable 
            rankings={rankings} 
            isLoading={isLoading}
            showPagination={true}
          />
        </TabsContent>

        <TabsContent value="retro" className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-green-900">Retro Rankings</h3>
                <p className="text-sm text-green-700 mt-1">
                  Definitive end-of-season rankings using full hindsight with EM convergence algorithm. These represent the historical record.
                </p>
              </div>
            </div>
          </div>

          <RankingsTable 
            rankings={rankings} 
            isLoading={isLoading}
            showPagination={true}
          />
        </TabsContent>
      </Tabs>
    </main>
  );
}
