import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  insertTeamSchema, 
  insertGameSchema, 
  insertRankingSchema,
  insertConferenceStrengthSchema,
  insertBiasAuditLogSchema,
  insertAlgorithmParametersSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Team routes
  app.get("/api/teams", async (req, res) => {
    try {
      const teams = await storage.getAllTeams();
      res.json(teams);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch teams" });
    }
  });

  app.get("/api/teams/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const team = await storage.getTeam(id);
      if (!team) {
        return res.status(404).json({ error: "Team not found" });
      }
      res.json(team);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch team" });
    }
  });

  app.post("/api/teams", async (req, res) => {
    try {
      const validatedData = insertTeamSchema.parse(req.body);
      const team = await storage.createTeam(validatedData);
      res.status(201).json(team);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid team data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create team" });
    }
  });

  // Game routes
  app.get("/api/games", async (req, res) => {
    try {
      const season = req.query.season ? parseInt(req.query.season as string) : undefined;
      const week = req.query.week ? parseInt(req.query.week as string) : undefined;

      let games;
      if (season && week) {
        games = await storage.getGamesByWeek(season, week);
      } else if (season) {
        games = await storage.getGamesBySeason(season);
      } else {
        return res.status(400).json({ error: "Season parameter is required" });
      }

      res.json(games);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch games" });
    }
  });

  app.post("/api/games", async (req, res) => {
    try {
      const validatedData = insertGameSchema.parse(req.body);
      const game = await storage.createGame(validatedData);
      res.status(201).json(game);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid game data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create game" });
    }
  });

  // Ranking routes
  app.get("/api/rankings", async (req, res) => {
    try {
      const season = req.query.season ? parseInt(req.query.season as string) : undefined;
      const week = req.query.week ? parseInt(req.query.week as string) : undefined;
      const trackType = req.query.trackType as 'live' | 'retro' || 'live';

      let rankings;
      if (season && week) {
        rankings = await storage.getRankingsByWeek(season, week, trackType);
      } else if (season) {
        rankings = await storage.getRankingsBySeason(season, trackType);
      } else {
        rankings = await storage.getLatestRankings(trackType);
      }

      // Enhance rankings with team data
      const enhancedRankings = await Promise.all(
        rankings.map(async (ranking) => {
          const team = await storage.getTeam(ranking.teamId);
          return {
            ...ranking,
            team
          };
        })
      );

      res.json(enhancedRankings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch rankings" });
    }
  });

  app.post("/api/rankings", async (req, res) => {
    try {
      if (Array.isArray(req.body)) {
        const validatedData = req.body.map(item => insertRankingSchema.parse(item));
        const rankings = await storage.createMultipleRankings(validatedData);
        res.status(201).json(rankings);
      } else {
        const validatedData = insertRankingSchema.parse(req.body);
        const ranking = await storage.createRanking(validatedData);
        res.status(201).json(ranking);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid ranking data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create ranking(s)" });
    }
  });

  // Conference strength routes
  app.get("/api/conference-strength", async (req, res) => {
    try {
      const season = parseInt(req.query.season as string);
      const week = parseInt(req.query.week as string);

      if (!season || !week) {
        return res.status(400).json({ error: "Season and week parameters are required" });
      }

      const strengths = await storage.getConferenceStrengthByWeek(season, week);
      res.json(strengths);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch conference strengths" });
    }
  });

  app.post("/api/conference-strength", async (req, res) => {
    try {
      if (Array.isArray(req.body)) {
        const validatedData = req.body.map(item => insertConferenceStrengthSchema.parse(item));
        const strengths = await storage.createMultipleConferenceStrength(validatedData);
        res.status(201).json(strengths);
      } else {
        const validatedData = insertConferenceStrengthSchema.parse(req.body);
        const strength = await storage.createConferenceStrength(validatedData);
        res.status(201).json(strength);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid conference strength data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create conference strength(s)" });
    }
  });

  // Bias audit routes
  app.get("/api/bias-audit", async (req, res) => {
    try {
      const season = parseInt(req.query.season as string);
      const week = req.query.week ? parseInt(req.query.week as string) : undefined;

      if (!season) {
        return res.status(400).json({ error: "Season parameter is required" });
      }

      let logs;
      if (week) {
        logs = await storage.getBiasAuditLogsByWeek(season, week);
      } else {
        logs = await storage.getBiasAuditLogsBySeason(season);
      }

      res.json(logs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch bias audit logs" });
    }
  });

  app.post("/api/bias-audit", async (req, res) => {
    try {
      const validatedData = insertBiasAuditLogSchema.parse(req.body);
      const log = await storage.createBiasAuditLog(validatedData);
      res.status(201).json(log);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid bias audit data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create bias audit log" });
    }
  });

  // Algorithm parameters routes
  app.get("/api/algorithm-parameters", async (req, res) => {
    try {
      const season = parseInt(req.query.season as string);

      if (!season) {
        return res.status(400).json({ error: "Season parameter is required" });
      }

      const parameters = await storage.getAlgorithmParametersBySeason(season);
      if (!parameters) {
        return res.status(404).json({ error: "Algorithm parameters not found for season" });
      }

      res.json(parameters);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch algorithm parameters" });
    }
  });

  app.post("/api/algorithm-parameters", async (req, res) => {
    try {
      const validatedData = insertAlgorithmParametersSchema.parse(req.body);
      const parameters = await storage.createAlgorithmParameters(validatedData);
      res.status(201).json(parameters);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid algorithm parameters", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create algorithm parameters" });
    }
  });

  // Data export routes
  app.get("/api/export/rankings", async (req, res) => {
    try {
      const season = parseInt(req.query.season as string);
      const week = req.query.week ? parseInt(req.query.week as string) : undefined;
      const trackType = req.query.trackType as 'live' | 'retro' || 'live';
      const format = req.query.format as 'json' | 'csv' || 'json';

      if (!season) {
        return res.status(400).json({ error: "Season parameter is required" });
      }

      let rankings;
      if (week) {
        rankings = await storage.getRankingsByWeek(season, week, trackType);
      } else {
        rankings = await storage.getRankingsBySeason(season, trackType);
      }

      // Enhance with team data
      const enhancedRankings = await Promise.all(
        rankings.map(async (ranking) => {
          const team = await storage.getTeam(ranking.teamId);
          return {
            rank: ranking.rank,
            team: team?.school || 'Unknown',
            conference: team?.conference || 'Unknown',
            rating: ranking.rating,
            delta_rank: ranking.deltaRank,
            quality_wins: ranking.qualityWins?.join(', ') || '',
            record: ranking.record || '',
            week: ranking.week,
            season: ranking.season,
            track_type: ranking.trackType
          };
        })
      );

      if (format === 'csv') {
        const headers = ['rank', 'team', 'conference', 'rating', 'delta_rank', 'quality_wins', 'record', 'week', 'season', 'track_type'];
        const csvRows = [
          headers.join(','),
          ...enhancedRankings.map(row => headers.map(header => `"${row[header as keyof typeof row] || ''}"`).join(','))
        ];
        
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename="cfb_rankings_${season}_${trackType}.csv"`);
        res.send(csvRows.join('\n'));
      } else {
        res.json(enhancedRankings);
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to export rankings" });
    }
  });

  // System status route
  app.get("/api/status", async (req, res) => {
    try {
      const latestLiveRankings = await storage.getLatestRankings('live');
      const latestRetroRankings = await storage.getLatestRankings('retro');
      
      let currentWeek = 0;
      let currentSeason = new Date().getFullYear();
      let biasMetric = 0;
      
      if (latestLiveRankings.length > 0) {
        currentWeek = latestLiveRankings[0].week;
        currentSeason = latestLiveRankings[0].season;
      }

      // Get latest bias audit
      const biasLogs = await storage.getBiasAuditLogsBySeason(currentSeason);
      if (biasLogs.length > 0) {
        const latestBiasLog = biasLogs.sort((a, b) => b.week - a.week)[0];
        biasMetric = parseFloat(latestBiasLog.biasMetric || '0');
      }

      res.json({
        currentWeek,
        currentSeason,
        biasMetric,
        systemStatus: 'operational',
        lastUpdate: new Date().toISOString(),
        totalTeams: (await storage.getAllTeams()).length,
        liveRankingsCount: latestLiveRankings.length,
        retroRankingsCount: latestRetroRankings.length
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch system status" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
