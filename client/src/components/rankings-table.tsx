import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import type { RankingData } from "@/lib/types";
import { Download, Filter } from "lucide-react";

interface RankingsTableProps {
  rankings?: RankingData[];
  isLoading?: boolean;
  showPagination?: boolean;
}

export function RankingsTable({ rankings = [], isLoading, showPagination = false }: RankingsTableProps) {
  const [conferenceFilter, setConferenceFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();
  const itemsPerPage = 25;

  const filteredRankings = rankings.filter(ranking => 
    !conferenceFilter || ranking.team?.conference === conferenceFilter
  );

  const paginatedRankings = showPagination 
    ? filteredRankings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : filteredRankings.slice(0, 25);

  const totalPages = Math.ceil(filteredRankings.length / itemsPerPage);
  
  const conferences = Array.from(new Set(
    rankings.map(r => r.team?.conference).filter(Boolean)
  )).sort();

  const handleExportCSV = async () => {
    try {
      if (rankings.length > 0) {
        await api.exportRankings(
          rankings[0].season, 
          rankings[0].trackType as 'live' | 'retro',
          rankings[0].week,
          'csv'
        );
        toast({
          title: "Export Successful",
          description: "Rankings CSV has been downloaded.",
        });
      }
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export rankings. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getRankChangeIcon = (delta: number | null) => {
    if (!delta || delta === 0) {
      return <span className="font-mono text-sm text-neutral-500">--</span>;
    }
    
    if (delta > 0) {
      return (
        <div className="flex items-center text-green-600">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7l4-4m0 0l4 4m-4-4v18"></path>
          </svg>
          <span className="font-mono text-sm">+{delta}</span>
        </div>
      );
    }
    
    return (
      <div className="flex items-center text-red-600">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 17l-4 4m0 0l-4-4m4 4V3"></path>
        </svg>
        <span className="font-mono text-sm">{delta}</span>
      </div>
    );
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!rankings.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <svg className="w-12 h-12 text-neutral-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            <h3 className="text-lg font-medium text-neutral-900 mb-2">No Rankings Available</h3>
            <p className="text-neutral-600">Rankings data is not available for the selected period.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>
            {rankings[0]?.trackType === 'live' ? 'Live' : 'Retro'} Rankings - Week {rankings[0]?.week}
          </CardTitle>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-neutral-500" />
              <label className="text-sm text-neutral-600">Conference:</label>
              <Select value={conferenceFilter} onValueChange={setConferenceFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Conferences" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Conferences</SelectItem>
                  {conferences.map(conf => (
                    <SelectItem key={conf} value={conf}>{conf}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" size="sm" onClick={handleExportCSV}>
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Rank</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Team</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Conference</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Change</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Quality Wins</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Record</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {paginatedRankings.map((ranking) => (
                <tr key={ranking.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-mono text-lg font-semibold text-neutral-900">
                      {ranking.rank}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style={{ backgroundColor: ranking.team?.color || '#6B7280' }}
                      >
                        {ranking.team?.abbreviation || ranking.team?.school?.substring(0, 3).toUpperCase() || 'TM'}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-neutral-900">
                          {ranking.team?.school || 'Unknown Team'}
                        </div>
                        {ranking.team?.mascot && (
                          <div className="text-xs text-neutral-500">{ranking.team.mascot}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                    {ranking.team?.conference || 'Unknown'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-mono text-sm font-semibold">
                      {parseFloat(ranking.rating).toFixed(3)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getRankChangeIcon(ranking.deltaRank)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {ranking.qualityWins?.slice(0, 2).map((win, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {win}
                        </Badge>
                      ))}
                      {(ranking.qualityWins?.length || 0) > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{(ranking.qualityWins?.length || 0) - 2} more
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-mono text-sm">{ranking.record || 'N/A'}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {showPagination && totalPages > 1 && (
          <div className="px-6 py-4 border-t border-neutral-200 bg-neutral-50">
            <div className="flex items-center justify-between">
              <p className="text-sm text-neutral-600">
                Showing{" "}
                <span className="font-medium">
                  {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredRankings.length)}
                </span>{" "}
                of <span className="font-medium">{filteredRankings.length}</span> teams
              </p>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="px-3 py-1 text-sm bg-primary-600 text-white rounded-lg">
                  {currentPage}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
