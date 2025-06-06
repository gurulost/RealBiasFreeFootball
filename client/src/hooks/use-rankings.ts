import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useRankings(trackType: 'live' | 'retro' = 'live', season?: number, week?: number) {
  return useQuery({
    queryKey: ['rankings', trackType, season, week],
    queryFn: () => api.getRankings(trackType, season, week),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}
