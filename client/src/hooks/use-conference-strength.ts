import { useQuery } from "@tanstack/react-query";
import { ConferenceStrengthData } from "@/lib/types";
import { api } from "@/lib/api";

export function useConferenceStrength(season?: number, week?: number) {
  return useQuery<ConferenceStrengthData[]>({
    queryKey: ['conference-strength', season, week],
    queryFn: () => api.getConferenceStrength(season || 2024, week || 15),
    enabled: !!season && !!week,
  });
}