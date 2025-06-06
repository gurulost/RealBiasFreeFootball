import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Shield, Database, Eye, TrendingUp, Award, Clock, FileText } from "lucide-react";

export default function Transparency() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">
          The Real Bias-Free Football Ranking System
        </h1>
        <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
          A Complete Guide to Our Transparent, Data-Driven Methodology
        </p>
        <div className="flex justify-center items-center space-x-6 mt-8">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium">Conference Neutral</span>
          </div>
          <div className="flex items-center space-x-2">
            <Eye className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium">Fully Transparent</span>
          </div>
          <div className="flex items-center space-x-2">
            <Database className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium">Reproducible</span>
          </div>
        </div>
      </div>

      {/* Section 1: Purpose & Vision */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <div className="w-8 h-8 bg-green-600 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-3">1</div>
            Purpose & North-Star Vision
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg text-neutral-700 leading-relaxed">
            Our mission is to create the most bias-free, on-field-only ranking of Division I college football teams that anyone can regenerate from public data.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center mb-3">
                <Shield className="w-5 h-5 text-green-600 mr-2" />
                <h4 className="font-semibold text-green-900">Conference Neutrality</h4>
              </div>
              <p className="text-sm text-green-800">
                No league should be unfairly boosted or penalized simply because most of its games are internal "echo chambers." Our system is explicitly designed to break these chambers.
              </p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center mb-3">
                <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                <h4 className="font-semibold text-blue-900">Schedule-Strength Incentives</h4>
              </div>
              <p className="text-sm text-blue-800">
                Programs should gain more rating equity—win or lose—by playing strong opponents than by stockpiling easy wins against weaker teams.
              </p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center mb-3">
                <Eye className="w-5 h-5 text-purple-600 mr-2" />
                <h4 className="font-semibold text-purple-900">Complete Transparency</h4>
              </div>
              <p className="text-sm text-purple-800">
                A curious fan, data scientist, or committee member must be able to re-run the model, step through every calculation, and arrive at the exact same rankings.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Architecture Overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-3">2</div>
            Architectural Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-neutral-700">
            The system operates on two distinct timelines to serve two different purposes: telling the story of the season as it happens and providing a definitive historical record.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-lg border border-amber-200">
              <div className="flex items-center mb-4">
                <Clock className="w-6 h-6 text-amber-600 mr-2" />
                <h4 className="text-lg font-semibold text-amber-900">LIVE Track (Weekly)</h4>
              </div>
              <div className="space-y-2 text-sm text-amber-800">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mr-2"></div>
                  <span>Sunday 03:00 ET: Ingest Game Data</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mr-2"></div>
                  <span>Build Two-Layer Graph</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mr-2"></div>
                  <span>Stage-1 PageRank (Conferences)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mr-2"></div>
                  <span>Inject Conference Strength</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mr-2"></div>
                  <span>Stage-2 PageRank (Teams)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mr-2"></div>
                  <span>Run Bias Audit & Publish Rankings</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-lg border border-emerald-200">
              <div className="flex items-center mb-4">
                <Award className="w-6 h-6 text-emerald-600 mr-2" />
                <h4 className="text-lg font-semibold text-emerald-900">RETRO Track (End of Season)</h4>
              </div>
              <div className="space-y-2 text-sm text-emerald-800">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mr-2"></div>
                  <span>Run Hindsight Loop with All Game Data</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mr-2"></div>
                  <span>Iterate Until Ratings Converge</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mr-2"></div>
                  <span>Publish Definitive RETRO Table</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mr-2"></div>
                  <span>Historical Record (Once per year)</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 3: Two-Layer PageRank */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <div className="w-8 h-8 bg-purple-600 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-3">3</div>
            The Core Methodology: Two-Layer PageRank System
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-neutral-700">
            To eliminate the "echo chamber" effect where a conference's ranking is skewed by internal games, we use a two-stage PageRank algorithm. This ensures that conference strength is judged solely on out-of-conference performance before team-level rankings are calculated.
          </p>
          
          <div className="space-y-6">
            <div className="bg-neutral-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                <div className="w-6 h-6 bg-purple-600 text-white rounded flex items-center justify-center text-xs font-bold mr-2">1</div>
                Stage 1: Calculating Unbiased Conference Strength
              </h4>
              <p className="text-neutral-700 mb-4">
                The first layer builds a directed graph where nodes are conferences, not teams. Edges are created only from cross-conference games.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-neutral-900 mb-2">How it Works:</h5>
                  <p className="text-sm text-neutral-600">
                    When a team from Conference A beats a team from Conference B, a weighted edge is drawn from Conference B to Conference A. The weight is determined by margin of victory, win probability, and other factors.
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-neutral-900 mb-2">The Result:</h5>
                  <p className="text-sm text-neutral-600">
                    PageRank produces an unbiased Conference Strength (S) score for each conference, reflecting its performance against the rest of the field.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-neutral-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                <div className="w-6 h-6 bg-purple-600 text-white rounded flex items-center justify-center text-xs font-bold mr-2">2</div>
                Stage 2: Calculating Team-Level Rankings
              </h4>
              <p className="text-neutral-700 mb-4">
                Once we have unbiased conference strength scores, we move to the team-level graph.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-neutral-900 mb-2">How it Works:</h5>
                  <p className="text-sm text-neutral-600">
                    This graph includes all games. For intra-conference games, the calculated conference strength (√S) is injected exactly once as a multiplier on the edge weight.
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-neutral-900 mb-2">The Result:</h5>
                  <p className="text-sm text-neutral-600">
                    PageRank on this comprehensive graph produces the definitive team-level rating (R) for every team.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 4: Edge Weight Calculation */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <div className="w-8 h-8 bg-amber-600 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-3">4</div>
            The Anatomy of a Game: Edge Weight Calculation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-neutral-700">
            The "weight" of each game—how much credit flows from the loser to the winner—is determined by a combination of factors, each with a specific purpose.
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full border border-neutral-200 rounded-lg">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="text-left p-4 font-semibold text-neutral-900">Component</th>
                  <th className="text-left p-4 font-semibold text-neutral-900">Formula</th>
                  <th className="text-left p-4 font-semibold text-neutral-900">Default</th>
                  <th className="text-left p-4 font-semibold text-neutral-900">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                <tr>
                  <td className="p-4 font-medium">Margin Factor</td>
                  <td className="p-4 font-mono text-sm">log₂(1 + max(margin, 1))</td>
                  <td className="p-4"><Badge variant="outline">Cap = 5 TDs</Badge></td>
                  <td className="p-4 text-sm">Prevents "style points" from dwarfing the core result of who won</td>
                </tr>
                <tr className="bg-neutral-25">
                  <td className="p-4 font-medium">Venue Factor</td>
                  <td className="p-4 font-mono text-sm">1.1 (Home), 1.0 (Neutral), 0.9 (Away)</td>
                  <td className="p-4"><Badge variant="outline">—</Badge></td>
                  <td className="p-4 text-sm">Adjusts for home-field advantage</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Recency Factor</td>
                  <td className="p-4 font-mono text-sm">exp(-λ * Δweeks)</td>
                  <td className="p-4"><Badge variant="outline">λ = 0.05</Badge></td>
                  <td className="p-4 text-sm">More weight to recent performance (~5% decay per week)</td>
                </tr>
                <tr className="bg-neutral-25">
                  <td className="p-4 font-medium">Shrinkage Weight</td>
                  <td className="p-4 font-mono text-sm">gᵢ / (gᵢ + k)</td>
                  <td className="p-4"><Badge variant="outline">k = 4 games</Badge></td>
                  <td className="p-4 text-sm">Reduces early season volatility by blending with global mean</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Win Probability</td>
                  <td className="p-4 font-mono text-sm">1 / (1 + 10^-(Rₐ - Rₑ)/C)</td>
                  <td className="p-4"><Badge variant="outline">C = 0.40</Badge></td>
                  <td className="p-4 text-sm">Standard Elo-style win probability based on rating difference</td>
                </tr>
                <tr className="bg-neutral-25">
                  <td className="p-4 font-medium">Risk Multipliers</td>
                  <td className="p-4 font-mono text-sm">Credit: (1 - p)ᴮ / 0.5</td>
                  <td className="p-4"><Badge variant="outline">B = 1.0</Badge></td>
                  <td className="p-4 text-sm">Rewards tough opponents, minimizes cupcake games</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Surprise Multiplier</td>
                  <td className="p-4 font-mono text-sm">1 + γ * [-log₂(p)]</td>
                  <td className="p-4"><Badge variant="outline">γ = 0.75, Cap = 3x</Badge></td>
                  <td className="p-4 text-sm">Massive weight to cross-conference upsets</td>
                </tr>
                <tr className="bg-neutral-25">
                  <td className="p-4 font-medium">Bowl Weight Bump</td>
                  <td className="p-4 font-mono text-sm">× 1.10 on credit edge</td>
                  <td className="p-4"><Badge variant="outline">—</Badge></td>
                  <td className="p-4 text-sm">Small bonus for high-stakes, neutral-site matchups</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">PageRank Damping</td>
                  <td className="p-4 font-mono text-sm">d = 0.85</td>
                  <td className="p-4"><Badge variant="outline">—</Badge></td>
                  <td className="p-4 text-sm">Standard PageRank damping factor</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Section 5: LIVE vs RETRO */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-3">5</div>
            LIVE vs. RETRO: Two Tracks for Full Transparency
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-lg border border-amber-200">
              <h4 className="text-lg font-semibold text-amber-900 mb-3 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                LIVE Rankings (Weekly)
              </h4>
              <p className="text-sm text-amber-800 mb-4">
                Generated every Sunday morning using ratings from the previous week to calculate win probabilities and multipliers.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-xs text-amber-700">
                  <CheckCircle className="w-3 h-3 mr-2" />
                  <span>Captures weekly narrative</span>
                </div>
                <div className="flex items-center text-xs text-amber-700">
                  <CheckCircle className="w-3 h-3 mr-2" />
                  <span>Avoids circular logic</span>
                </div>
                <div className="flex items-center text-xs text-amber-700">
                  <CheckCircle className="w-3 h-3 mr-2" />
                  <span>Shows ranking evolution</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-lg border border-emerald-200">
              <h4 className="text-lg font-semibold text-emerald-900 mb-3 flex items-center">
                <Award className="w-5 h-5 mr-2" />
                RETRO Rankings (End of Season)
              </h4>
              <p className="text-sm text-emerald-800 mb-4">
                After the final championship game, a "hindsight loop" re-calculates all weights and ratings iteratively until convergence.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-xs text-emerald-700">
                  <CheckCircle className="w-3 h-3 mr-2" />
                  <span>Definitive historical ranking</span>
                </div>
                <div className="flex items-center text-xs text-emerald-700">
                  <CheckCircle className="w-3 h-3 mr-2" />
                  <span>Free from weekly constraints</span>
                </div>
                <div className="flex items-center text-xs text-emerald-700">
                  <CheckCircle className="w-3 h-3 mr-2" />
                  <span>Complete season analysis</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 6: Implementation & Transparency */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <div className="w-8 h-8 bg-green-600 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-3">6</div>
            Implementation and Transparency
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-neutral-700">
            Our commitment to transparency is built into the system's architecture, from the database schema to the user interface.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-neutral-900 flex items-center">
                <Database className="w-5 h-5 text-blue-600 mr-2" />
                Data Source and Ingestion
              </h4>
              <div className="space-y-3 text-sm text-neutral-600">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                  <span><strong>Single Source of Truth:</strong> College Football Data API as sole data source</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                  <span><strong>Automated Ingestion:</strong> Full season data loaded automatically on startup</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                  <span><strong>Manual Trigger:</strong> UI component for manual data ingestion</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-neutral-900 flex items-center">
                <FileText className="w-5 h-5 text-purple-600 mr-2" />
                Open Code and Auditable Outputs
              </h4>
              <div className="space-y-3 text-sm text-neutral-600">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                  <span><strong>Database Schema:</strong> Complete data dictionary in shared/schema.ts</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                  <span><strong>API Endpoints:</strong> Full data access via REST API</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                  <span><strong>CSV Export:</strong> Download raw data for independent analysis</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-neutral-900 flex items-center">
                <Shield className="w-5 h-5 text-green-600 mr-2" />
                Governance and Reproducibility
              </h4>
              <div className="space-y-3 text-sm text-neutral-600">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                  <span><strong>Freeze Parameters:</strong> All algorithm settings locked before Week 0</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                  <span><strong>Publish Code & Data:</strong> Open source code and weekly data publication</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                  <span><strong>Document Changes:</strong> Clear audit trail for any modifications</span>
                </div>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="bg-gradient-to-r from-neutral-50 to-neutral-100 p-6 rounded-lg border">
            <h4 className="font-semibold text-neutral-900 mb-3">Frontend Visualization</h4>
            <p className="text-sm text-neutral-600 mb-4">
              The website is designed to make these complex concepts understandable and accessible to all users.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-neutral-600">
              <div>
                <strong>Conference Analysis:</strong> Shows PageRank vectors, flow matrices, and injection multipliers
              </div>
              <div>
                <strong>Bias Audit:</strong> Real-time visibility into system neutrality and performance
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conclusion */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold text-blue-900 mb-4">
            Robust Algorithm + Radical Transparency
          </h3>
          <p className="text-blue-800 max-w-3xl mx-auto leading-relaxed">
            By combining a bias-aware algorithm with a radical commitment to transparency, this system provides a college football ranking that is not only accurate but also fully defensible and understandable.
          </p>
          <div className="flex justify-center items-center space-x-8 mt-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-blue-900">Accurate</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center mx-auto mb-2">
                <Shield className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-blue-900">Defensible</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center mx-auto mb-2">
                <Eye className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-blue-900">Understandable</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}