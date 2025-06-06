import { 
  teams, games, rankings, conferenceStrength, biasAuditLogs, algorithmParameters,
  type Team, type InsertTeam,
  type Game, type InsertGame,
  type Ranking, type InsertRanking,
  type ConferenceStrength, type InsertConferenceStrength,
  type BiasAuditLog, type InsertBiasAuditLog,
  type AlgorithmParameters, type InsertAlgorithmParameters
} from "@shared/schema";

export interface IStorage {
  // Team operations
  getTeam(id: number): Promise<Team | undefined>;
  getTeamByCfbdId(cfbdId: number): Promise<Team | undefined>;
  getTeamBySchool(school: string): Promise<Team | undefined>;
  getAllTeams(): Promise<Team[]>;
  createTeam(team: InsertTeam): Promise<Team>;
  updateTeam(id: number, team: Partial<InsertTeam>): Promise<Team | undefined>;

  // Game operations
  getGame(id: number): Promise<Game | undefined>;
  getGameByCfbdId(cfbdId: number): Promise<Game | undefined>;
  getGamesByWeek(season: number, week: number): Promise<Game[]>;
  getGamesBySeason(season: number): Promise<Game[]>;
  createGame(game: InsertGame): Promise<Game>;
  updateGame(id: number, game: Partial<InsertGame>): Promise<Game | undefined>;

  // Ranking operations
  getRanking(id: number): Promise<Ranking | undefined>;
  getRankingsByWeek(season: number, week: number, trackType: 'live' | 'retro'): Promise<Ranking[]>;
  getRankingsBySeason(season: number, trackType: 'live' | 'retro'): Promise<Ranking[]>;
  getLatestRankings(trackType: 'live' | 'retro'): Promise<Ranking[]>;
  createRanking(ranking: InsertRanking): Promise<Ranking>;
  createMultipleRankings(rankings: InsertRanking[]): Promise<Ranking[]>;

  // Conference strength operations
  getConferenceStrength(id: number): Promise<ConferenceStrength | undefined>;
  getConferenceStrengthByWeek(season: number, week: number): Promise<ConferenceStrength[]>;
  createConferenceStrength(strength: InsertConferenceStrength): Promise<ConferenceStrength>;
  createMultipleConferenceStrength(strengths: InsertConferenceStrength[]): Promise<ConferenceStrength[]>;

  // Bias audit operations
  getBiasAuditLog(id: number): Promise<BiasAuditLog | undefined>;
  getBiasAuditLogsByWeek(season: number, week: number): Promise<BiasAuditLog[]>;
  getBiasAuditLogsBySeason(season: number): Promise<BiasAuditLog[]>;
  createBiasAuditLog(log: InsertBiasAuditLog): Promise<BiasAuditLog>;

  // Algorithm parameters operations
  getAlgorithmParameters(id: number): Promise<AlgorithmParameters | undefined>;
  getAlgorithmParametersBySeason(season: number): Promise<AlgorithmParameters | undefined>;
  createAlgorithmParameters(params: InsertAlgorithmParameters): Promise<AlgorithmParameters>;
  updateAlgorithmParameters(id: number, params: Partial<InsertAlgorithmParameters>): Promise<AlgorithmParameters | undefined>;
}

export class MemStorage implements IStorage {
  private teams: Map<number, Team>;
  private games: Map<number, Game>;
  private rankings: Map<number, Ranking>;
  private conferenceStrengths: Map<number, ConferenceStrength>;
  private biasAuditLogs: Map<number, BiasAuditLog>;
  private algorithmParameters: Map<number, AlgorithmParameters>;
  private currentId: number;

  constructor() {
    this.teams = new Map();
    this.games = new Map();
    this.rankings = new Map();
    this.conferenceStrengths = new Map();
    this.biasAuditLogs = new Map();
    this.algorithmParameters = new Map();
    this.currentId = 1;
  }

  // Team operations
  async getTeam(id: number): Promise<Team | undefined> {
    return this.teams.get(id);
  }

  async getTeamByCfbdId(cfbdId: number): Promise<Team | undefined> {
    return Array.from(this.teams.values()).find(team => team.cfbdId === cfbdId);
  }

  async getTeamBySchool(school: string): Promise<Team | undefined> {
    return Array.from(this.teams.values()).find(team => team.school === school);
  }

  async getAllTeams(): Promise<Team[]> {
    return Array.from(this.teams.values());
  }

  async createTeam(insertTeam: InsertTeam): Promise<Team> {
    const id = this.currentId++;
    const team: Team = { ...insertTeam, id };
    this.teams.set(id, team);
    return team;
  }

  async updateTeam(id: number, updateTeam: Partial<InsertTeam>): Promise<Team | undefined> {
    const team = this.teams.get(id);
    if (!team) return undefined;
    const updatedTeam = { ...team, ...updateTeam };
    this.teams.set(id, updatedTeam);
    return updatedTeam;
  }

  // Game operations
  async getGame(id: number): Promise<Game | undefined> {
    return this.games.get(id);
  }

  async getGameByCfbdId(cfbdId: number): Promise<Game | undefined> {
    return Array.from(this.games.values()).find(game => game.cfbdId === cfbdId);
  }

  async getGamesByWeek(season: number, week: number): Promise<Game[]> {
    return Array.from(this.games.values()).filter(game => 
      game.season === season && game.week === week
    );
  }

  async getGamesBySeason(season: number): Promise<Game[]> {
    return Array.from(this.games.values()).filter(game => game.season === season);
  }

  async createGame(insertGame: InsertGame): Promise<Game> {
    const id = this.currentId++;
    const game: Game = { ...insertGame, id };
    this.games.set(id, game);
    return game;
  }

  async updateGame(id: number, updateGame: Partial<InsertGame>): Promise<Game | undefined> {
    const game = this.games.get(id);
    if (!game) return undefined;
    const updatedGame = { ...game, ...updateGame };
    this.games.set(id, updatedGame);
    return updatedGame;
  }

  // Ranking operations
  async getRanking(id: number): Promise<Ranking | undefined> {
    return this.rankings.get(id);
  }

  async getRankingsByWeek(season: number, week: number, trackType: 'live' | 'retro'): Promise<Ranking[]> {
    return Array.from(this.rankings.values()).filter(ranking => 
      ranking.season === season && ranking.week === week && ranking.trackType === trackType
    ).sort((a, b) => a.rank - b.rank);
  }

  async getRankingsBySeason(season: number, trackType: 'live' | 'retro'): Promise<Ranking[]> {
    return Array.from(this.rankings.values()).filter(ranking => 
      ranking.season === season && ranking.trackType === trackType
    ).sort((a, b) => a.rank - b.rank);
  }

  async getLatestRankings(trackType: 'live' | 'retro'): Promise<Ranking[]> {
    const rankingsByTrack = Array.from(this.rankings.values()).filter(r => r.trackType === trackType);
    if (rankingsByTrack.length === 0) return [];
    
    const maxWeek = Math.max(...rankingsByTrack.map(r => r.week));
    const maxSeason = Math.max(...rankingsByTrack.filter(r => r.week === maxWeek).map(r => r.season));
    
    return rankingsByTrack.filter(r => r.season === maxSeason && r.week === maxWeek)
      .sort((a, b) => a.rank - b.rank);
  }

  async createRanking(insertRanking: InsertRanking): Promise<Ranking> {
    const id = this.currentId++;
    const ranking: Ranking = { 
      ...insertRanking, 
      id, 
      createdAt: new Date() 
    };
    this.rankings.set(id, ranking);
    return ranking;
  }

  async createMultipleRankings(insertRankings: InsertRanking[]): Promise<Ranking[]> {
    const rankings: Ranking[] = [];
    for (const insertRanking of insertRankings) {
      const ranking = await this.createRanking(insertRanking);
      rankings.push(ranking);
    }
    return rankings;
  }

  // Conference strength operations
  async getConferenceStrength(id: number): Promise<ConferenceStrength | undefined> {
    return this.conferenceStrengths.get(id);
  }

  async getConferenceStrengthByWeek(season: number, week: number): Promise<ConferenceStrength[]> {
    return Array.from(this.conferenceStrengths.values()).filter(cs => 
      cs.season === season && cs.week === week
    );
  }

  async createConferenceStrength(insertStrength: InsertConferenceStrength): Promise<ConferenceStrength> {
    const id = this.currentId++;
    const strength: ConferenceStrength = { 
      ...insertStrength, 
      id, 
      createdAt: new Date() 
    };
    this.conferenceStrengths.set(id, strength);
    return strength;
  }

  async createMultipleConferenceStrength(insertStrengths: InsertConferenceStrength[]): Promise<ConferenceStrength[]> {
    const strengths: ConferenceStrength[] = [];
    for (const insertStrength of insertStrengths) {
      const strength = await this.createConferenceStrength(insertStrength);
      strengths.push(strength);
    }
    return strengths;
  }

  // Bias audit operations
  async getBiasAuditLog(id: number): Promise<BiasAuditLog | undefined> {
    return this.biasAuditLogs.get(id);
  }

  async getBiasAuditLogsByWeek(season: number, week: number): Promise<BiasAuditLog[]> {
    return Array.from(this.biasAuditLogs.values()).filter(log => 
      log.season === season && log.week === week
    );
  }

  async getBiasAuditLogsBySeason(season: number): Promise<BiasAuditLog[]> {
    return Array.from(this.biasAuditLogs.values()).filter(log => log.season === season);
  }

  async createBiasAuditLog(insertLog: InsertBiasAuditLog): Promise<BiasAuditLog> {
    const id = this.currentId++;
    const log: BiasAuditLog = { 
      ...insertLog, 
      id, 
      createdAt: new Date() 
    };
    this.biasAuditLogs.set(id, log);
    return log;
  }

  // Algorithm parameters operations
  async getAlgorithmParameters(id: number): Promise<AlgorithmParameters | undefined> {
    return this.algorithmParameters.get(id);
  }

  async getAlgorithmParametersBySeason(season: number): Promise<AlgorithmParameters | undefined> {
    return Array.from(this.algorithmParameters.values()).find(params => params.season === season);
  }

  async createAlgorithmParameters(insertParams: InsertAlgorithmParameters): Promise<AlgorithmParameters> {
    const id = this.currentId++;
    const params: AlgorithmParameters = { 
      ...insertParams, 
      id, 
      createdAt: new Date() 
    };
    this.algorithmParameters.set(id, params);
    return params;
  }

  async updateAlgorithmParameters(id: number, updateParams: Partial<InsertAlgorithmParameters>): Promise<AlgorithmParameters | undefined> {
    const params = this.algorithmParameters.get(id);
    if (!params) return undefined;
    const updatedParams = { ...params, ...updateParams };
    this.algorithmParameters.set(id, updatedParams);
    return updatedParams;
  }
}

export const storage = new MemStorage();
