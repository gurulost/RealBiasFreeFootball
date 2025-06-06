import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useBiasMetrics(season?: number, week?: number) {
  const statusQuery = useQuery({
    queryKey: ['system-status'],
    queryFn: () => api.getSystemStatus(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 2,
  });

  const currentSeason = season || statusQuery.data?.currentSeason || new Date().getFullYear();
  
  const biasQuery = useQuery({
    queryKey: ['bias-audit', currentSeason, week],
    queryFn: () => api.getBiasAudit(currentSeason, week),
    enabled: !!currentSeason,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  const conferenceQuery = useQuery({
    queryKey: ['conference-strength', currentSeason, statusQuery.data?.currentWeek],
    queryFn: () => api.getConferenceStrength(currentSeason, statusQuery.data?.currentWeek || 12),
    enabled: !!currentSeason && !!statusQuery.data?.currentWeek,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  return {
    data: statusQuery.data,
    biasLogs: biasQuery.data,
    conferenceStrength: conferenceQuery.data,
    isLoading: statusQuery.isLoading || biasQuery.isLoading || conferenceQuery.isLoading,
    error: statusQuery.error || biasQuery.error || conferenceQuery.error,
  };
}
