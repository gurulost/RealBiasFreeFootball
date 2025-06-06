import { apiRequest } from "./queryClient";
import type { RankingData, ConferenceStrengthData, BiasAuditData, SystemStatus, AlgorithmParameters } from "./types";

export const api = {
  // Rankings
  async getRankings(trackType: 'live' | 'retro' = 'live', season?: number, week?: number): Promise<RankingData[]> {
    const params = new URLSearchParams({ trackType });
    if (season) params.append('season', season.toString());
    if (week) params.append('week', week.toString());
    
    const response = await apiRequest('GET', `/api/rankings?${params}`);
    return response.json();
  },

  // Conference Strength
  async getConferenceStrength(season: number, week: number): Promise<ConferenceStrengthData[]> {
    const response = await apiRequest('GET', `/api/conference-strength?season=${season}&week=${week}`);
    return response.json();
  },

  // Bias Audit
  async getBiasAudit(season: number, week?: number): Promise<BiasAuditData[]> {
    const params = new URLSearchParams({ season: season.toString() });
    if (week) params.append('week', week.toString());
    
    const response = await apiRequest('GET', `/api/bias-audit?${params}`);
    return response.json();
  },

  // System Status
  async getSystemStatus(): Promise<SystemStatus> {
    const response = await apiRequest('GET', '/api/status');
    return response.json();
  },

  // Algorithm Parameters
  async getAlgorithmParameters(season: number): Promise<AlgorithmParameters> {
    const response = await apiRequest('GET', `/api/algorithm-parameters?season=${season}`);
    return response.json();
  },

  // Export
  async exportRankings(season: number, trackType: 'live' | 'retro' = 'live', week?: number, format: 'json' | 'csv' = 'json') {
    const params = new URLSearchParams({ 
      season: season.toString(), 
      trackType,
      format 
    });
    if (week) params.append('week', week.toString());
    
    const response = await apiRequest('GET', `/api/export/rankings?${params}`);
    
    if (format === 'csv') {
      const blob = new Blob([await response.text()], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cfb_rankings_${season}_${trackType}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } else {
      return response.json();
    }
  }
};
