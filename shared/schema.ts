import { pgTable, text, serial, integer, boolean, timestamp, decimal, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const teams = pgTable("teams", {
  id: serial("id").primaryKey(),
  cfbdId: integer("cfbd_id").notNull().unique(),
  school: text("school").notNull(),
  mascot: text("mascot"),
  abbreviation: text("abbreviation"),
  conference: text("conference"),
  confId: text("conf_id"), // Unique conference ID for PageRank calculations
  division: text("division"),
  classification: text("classification"),
  color: text("color"),
  alternateColor: text("alternate_color"),
  logos: jsonb("logos").$type<string[]>(),
});

export const games = pgTable("games", {
  id: serial("id").primaryKey(),
  cfbdId: integer("cfbd_id").notNull().unique(),
  season: integer("season").notNull(),
  week: integer("week").notNull(),
  homeTeam: text("home_team").notNull(),
  awayTeam: text("away_team").notNull(),
  homePoints: integer("home_points"),
  awayPoints: integer("away_points"),
  venue: text("venue"),
  venueId: integer("venue_id"),
  completed: boolean("completed").default(false),
  gameDate: timestamp("game_date"),
  conferenceGame: boolean("conference_game").default(false),
});

export const rankings = pgTable("rankings", {
  id: serial("id").primaryKey(),
  season: integer("season").notNull(),
  week: integer("week").notNull(),
  teamId: integer("team_id").notNull(),
  rank: integer("rank").notNull(),
  rating: decimal("rating", { precision: 10, scale: 6 }).notNull(),
  deltaRank: integer("delta_rank"),
  qualityWins: jsonb("quality_wins").$type<string[]>(),
  record: text("record"),
  trackType: text("track_type").notNull(), // 'live' or 'retro'
  createdAt: timestamp("created_at").defaultNow(),
});

export const conferenceStrength = pgTable("conference_strength", {
  id: serial("id").primaryKey(),
  season: integer("season").notNull(),
  week: integer("week").notNull(),
  conference: text("conference").notNull(),
  strength: decimal("strength", { precision: 10, scale: 6 }).notNull(),
  biasMetric: decimal("bias_metric", { precision: 5, scale: 3 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const biasAuditLogs = pgTable("bias_audit_logs", {
  id: serial("id").primaryKey(),
  season: integer("season").notNull(),
  week: integer("week").notNull(),
  biasMetric: decimal("bias_metric", { precision: 5, scale: 3 }).notNull(),
  maxDeviation: decimal("max_deviation", { precision: 5, scale: 3 }),
  isWithinTarget: boolean("is_within_target").default(true),
  autoTuneTriggered: boolean("auto_tune_triggered").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const algorithmParameters = pgTable("algorithm_parameters", {
  id: serial("id").primaryKey(),
  season: integer("season").notNull(),
  marginCap: integer("margin_cap").default(5),
  decayLambda: decimal("decay_lambda", { precision: 3, scale: 2 }).default("0.05"),
  shrinkageK: integer("shrinkage_k").default(4),
  winProbC: decimal("win_prob_c", { precision: 3, scale: 2 }).default("0.40"),
  riskElasticity: decimal("risk_elasticity", { precision: 3, scale: 2 }).default("1.0"),
  surpriseGamma: decimal("surprise_gamma", { precision: 3, scale: 2 }).default("0.75"),
  surpriseCap: integer("surprise_cap").default(3),
  bowlBonus: decimal("bowl_bonus", { precision: 3, scale: 2 }).default("1.10"),
  pagerankDamping: decimal("pagerank_damping", { precision: 3, scale: 2 }).default("0.85"),
  frozenAt: timestamp("frozen_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Zod schemas for validation
export const insertTeamSchema = createInsertSchema(teams).pick({
  cfbdId: true,
  school: true,
  mascot: true,
  abbreviation: true,
  conference: true,
  confId: true,
  division: true,
  classification: true,
  color: true,
  alternateColor: true,
  logos: true,
});

export const insertGameSchema = createInsertSchema(games).pick({
  cfbdId: true,
  season: true,
  week: true,
  homeTeam: true,
  awayTeam: true,
  homePoints: true,
  awayPoints: true,
  venue: true,
  venueId: true,
  completed: true,
  gameDate: true,
  conferenceGame: true,
});

export const insertRankingSchema = createInsertSchema(rankings).pick({
  season: true,
  week: true,
  teamId: true,
  rank: true,
  rating: true,
  deltaRank: true,
  qualityWins: true,
  record: true,
  trackType: true,
});

export const insertConferenceStrengthSchema = createInsertSchema(conferenceStrength).pick({
  season: true,
  week: true,
  conference: true,
  strength: true,
  biasMetric: true,
});

export const insertBiasAuditLogSchema = createInsertSchema(biasAuditLogs).pick({
  season: true,
  week: true,
  biasMetric: true,
  maxDeviation: true,
  isWithinTarget: true,
  autoTuneTriggered: true,
});

export const insertAlgorithmParametersSchema = createInsertSchema(algorithmParameters).pick({
  season: true,
  marginCap: true,
  decayLambda: true,
  shrinkageK: true,
  winProbC: true,
  riskElasticity: true,
  surpriseGamma: true,
  surpriseCap: true,
  bowlBonus: true,
  pagerankDamping: true,
  frozenAt: true,
});

// Type exports
export type Team = typeof teams.$inferSelect;
export type InsertTeam = z.infer<typeof insertTeamSchema>;

export type Game = typeof games.$inferSelect;
export type InsertGame = z.infer<typeof insertGameSchema>;

export type Ranking = typeof rankings.$inferSelect;
export type InsertRanking = z.infer<typeof insertRankingSchema>;

export type ConferenceStrength = typeof conferenceStrength.$inferSelect;
export type InsertConferenceStrength = z.infer<typeof insertConferenceStrengthSchema>;

export type BiasAuditLog = typeof biasAuditLogs.$inferSelect;
export type InsertBiasAuditLog = z.infer<typeof insertBiasAuditLogSchema>;

export type AlgorithmParameters = typeof algorithmParameters.$inferSelect;
export type InsertAlgorithmParameters = z.infer<typeof insertAlgorithmParametersSchema>;
