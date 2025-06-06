import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Shield, TrendingUp, BarChart3, Settings, Database } from "lucide-react";

export default function Methodology() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-4">
          Algorithm Methodology & Transparency
        </h1>
        <p className="text-lg text-neutral-600 max-w-3xl">
          Complete mathematical documentation of our two-layer PageRank system with all parameters, 
          multipliers, and design decisions explained for full reproducibility.
        </p>
      </div>

      <Tabs defaultValue="algorithm" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="algorithm">Core Algorithm</TabsTrigger>
          <TabsTrigger value="parameters">Parameters</TabsTrigger>
          <TabsTrigger value="bias-prevention">Bias Prevention</TabsTrigger>
          <TabsTrigger value="implementation">Implementation</TabsTrigger>
        </TabsList>

        <TabsContent value="algorithm" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <div className="bg-primary-600 text-white p-3 rounded-lg mr-4">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle>Two-Layer PageRank</CardTitle>
                    <p className="text-neutral-600">Conference → Team propagation</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-neutral-900 mb-2">Stage 1: Conference Strength</h4>
                  <p className="text-sm text-neutral-700 mb-2">Cross-conference games only → PageRank(G_conf) → S</p>
                  <div className="text-xs font-mono bg-white p-2 rounded border">
                    S = pagerank(G_conf, damping=0.85)
                  </div>
                </div>
                <div className="bg-neutral-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-neutral-900 mb-2">Stage 2: Team Rankings</h4>
                  <p className="text-sm text-neutral-700 mb-2">Inject √S into intra-conf edges → PageRank(G_team) → R</p>
                  <div className="text-xs font-mono bg-white p-2 rounded border">
                    inject_conf_strength(G_team, √S)<br />
                    R = pagerank(G_team, damping=0.85)
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <div className="bg-green-600 text-white p-3 rounded-lg mr-4">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle>Edge Weight Calculation</CardTitle>
                    <p className="text-neutral-600">Base × Risk × Surprise</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">Base Weight</h4>
                    <div className="font-mono bg-white p-2 rounded text-xs mb-2">
                      M × F × R
                    </div>
                    <div className="text-sm text-blue-700 space-y-1">
                      <div><strong>M:</strong> log₂(1+margin)</div>
                      <div><strong>F:</strong> venue factor</div>
                      <div><strong>R:</strong> recency decay</div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-2">Risk Multipliers</h4>
                    <div className="font-mono bg-white p-2 rounded text-xs mb-2">
                      Credit: (1-p)^B<br />
                      Penalty: (p)^B
                    </div>
                    <div className="text-sm text-green-700 space-y-1">
                      <div><strong>p:</strong> pre-game win prob</div>
                      <div><strong>B:</strong> elasticity = 1.0</div>
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-amber-900 mb-2">Surprise Factor</h4>
                    <div className="font-mono bg-white p-2 rounded text-xs mb-2">
                      1 + γ × I<br />
                      I = -log₂(p)
                    </div>
                    <div className="text-sm text-amber-700 space-y-1">
                      <div><strong>γ:</strong> sensitivity = 0.75</div>
                      <div><strong>Max:</strong> 3× multiplier</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="parameters" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <div className="bg-purple-600 text-white p-3 rounded-lg mr-4">
                  <Settings className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle>Algorithm Parameters</CardTitle>
                  <p className="text-neutral-600">Frozen at Week 0 kickoff for reproducibility</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-neutral-900 mb-4">Core Parameters</h4>
                  <div className="space-y-4">
                    {[
                      { 
                        param: "Margin Cap", 
                        value: "5 touchdowns", 
                        description: "Prevents style points from overwhelming who-beat-whom",
                        formula: "log₂(1+min(margin,35))"
                      },
                      { 
                        param: "Decay λ", 
                        value: "0.05 per week", 
                        description: "Each week reduces game weight by ~5%",
                        formula: "exp(-λ × weeks_ago)"
                      },
                      { 
                        param: "Shrinkage k", 
                        value: "4 games", 
                        description: "Bayesian prior for early season stability",
                        formula: "ω = games/(games+k)"
                      }
                    ].map((item, idx) => (
                      <div key={idx} className="border border-neutral-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium text-neutral-900">{item.param}</span>
                          <Badge variant="outline" className="font-mono">{item.value}</Badge>
                        </div>
                        <p className="text-sm text-neutral-600 mb-2">{item.description}</p>
                        <code className="text-xs bg-neutral-100 px-2 py-1 rounded">{item.formula}</code>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-neutral-900 mb-4">Advanced Parameters</h4>
                  <div className="space-y-4">
                    {[
                      { 
                        param: "Win Probability C", 
                        value: "0.40", 
                        description: "Sigmoid steepness for rating differences",
                        formula: "p = 1/(1+10^(-(Ra-Rb)/C))"
                      },
                      { 
                        param: "Risk Elasticity B", 
                        value: "1.0", 
                        description: "Controls strength of risk/reward incentives",
                        formula: "credit = (1-p)^B, penalty = p^B"
                      },
                      { 
                        param: "Surprise γ", 
                        value: "0.75 (cap: 3×)", 
                        description: "Shannon information weighting for upsets",
                        formula: "1 + γ × (-log₂(p))"
                      }
                    ].map((item, idx) => (
                      <div key={idx} className="border border-neutral-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium text-neutral-900">{item.param}</span>
                          <Badge variant="outline" className="font-mono">{item.value}</Badge>
                        </div>
                        <p className="text-sm text-neutral-600 mb-2">{item.description}</p>
                        <code className="text-xs bg-neutral-100 px-2 py-1 rounded">{item.formula}</code>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bias-prevention" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <div className="bg-red-600 text-white p-3 rounded-lg mr-4">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle>Bias Elimination Methods</CardTitle>
                    <p className="text-neutral-600">Mathematical guarantees of neutrality</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-900 mb-2">Two-Layer Separation</h4>
                  <p className="text-sm text-red-700 mb-2">
                    Conference strength computed <em>only</em> from cross-conference games prevents echo chambers.
                  </p>
                  <ul className="text-xs text-red-600 space-y-1">
                    <li>• No intra-conference bias in strength calculation</li>
                    <li>• Conference strength applied exactly once</li>
                    <li>• No circular feedback loops possible</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Automated Monitoring</h4>
                  <p className="text-sm text-blue-700 mb-2">
                    Real-time bias metric B = max(|conf_avg - global_avg|) / global_avg
                  </p>
                  <ul className="text-xs text-blue-600 space-y-1">
                    <li>• Target: B ≤ 4% after Week 8</li>
                    <li>• Auto-tuning triggered if B &gt; 6%</li>
                    <li>• Parameter changes logged and auditable</li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Transparency Requirements</h4>
                  <p className="text-sm text-green-700 mb-2">
                    All data sources, parameters, and calculations are publicly auditable.
                  </p>
                  <ul className="text-xs text-green-600 space-y-1">
                    <li>• Open source implementation</li>
                    <li>• Reproducible from public APIs</li>
                    <li>• Version-controlled parameter changes</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <div className="bg-amber-600 text-white p-3 rounded-lg mr-4">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle>Validation Framework</CardTitle>
                    <p className="text-neutral-600">Quality assurance metrics</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-3">Success Metrics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-neutral-50 rounded">
                        <span className="text-sm font-medium">Bias Metric (Week 8+)</span>
                        <Badge className="bg-green-600">≤ 4%</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-neutral-50 rounded">
                        <span className="text-sm font-medium">Bowl Prediction Accuracy</span>
                        <Badge className="bg-blue-600">≥ 59%</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-neutral-50 rounded">
                        <span className="text-sm font-medium">Top-10 Stability (σ)</span>
                        <Badge className="bg-purple-600">≤ 0.8 spots</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-neutral-50 rounded">
                        <span className="text-sm font-medium">Cupcake Deterrence</span>
                        <Badge className="bg-amber-600">≤ 0.05 rating</Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-neutral-900 mb-3">Testing Protocols</h4>
                    <ul className="text-sm text-neutral-600 space-y-2">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Historical back-testing on 10+ seasons</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Weekly bias metric monitoring</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Bowl game prediction validation</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Cross-validation with other systems</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="implementation" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <div className="bg-indigo-600 text-white p-3 rounded-lg mr-4">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle>Technical Implementation</CardTitle>
                  <p className="text-neutral-600">Architecture and data flow</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-neutral-900 mb-4">Data Pipeline</h4>
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-600 pl-4">
                      <h5 className="font-medium text-blue-900">1. Data Ingestion</h5>
                      <p className="text-sm text-blue-700">
                        College Football Data API with cfbd-python library
                      </p>
                      <code className="text-xs bg-blue-50 px-2 py-1 rounded block mt-1">
                        games = api.get_games(season, week)
                      </code>
                    </div>

                    <div className="border-l-4 border-green-600 pl-4">
                      <h5 className="font-medium text-green-900">2. Graph Construction</h5>
                      <p className="text-sm text-green-700">
                        NetworkX directed graphs with weighted edges
                      </p>
                      <code className="text-xs bg-green-50 px-2 py-1 rounded block mt-1">
                        G.add_edge(loser, winner, weight=credit)
                      </code>
                    </div>

                    <div className="border-l-4 border-purple-600 pl-4">
                      <h5 className="font-medium text-purple-900">3. PageRank Computation</h5>
                      <p className="text-sm text-purple-700">
                        Two-stage eigenvalue computation with damping
                      </p>
                      <code className="text-xs bg-purple-50 px-2 py-1 rounded block mt-1">
                        R = nx.pagerank(G, alpha=0.85)
                      </code>
                    </div>

                    <div className="border-l-4 border-amber-600 pl-4">
                      <h5 className="font-medium text-amber-900">4. Output Generation</h5>
                      <p className="text-sm text-amber-700">
                        CSV, JSON exports with metadata
                      </p>
                      <code className="text-xs bg-amber-50 px-2 py-1 rounded block mt-1">
                        rankings.to_csv('week_N_live.csv')
                      </code>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-neutral-900 mb-4">System Requirements</h4>
                  <div className="space-y-4">
                    <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
                      <h5 className="font-medium text-neutral-900 mb-2">Dependencies</h5>
                      <ul className="text-sm text-neutral-600 space-y-1">
                        <li>• Python ≥ 3.11</li>
                        <li>• NetworkX for graph operations</li>
                        <li>• NumPy for linear algebra</li>
                        <li>• Pandas for data manipulation</li>
                        <li>• cfbd-python for API access</li>
                      </ul>
                    </div>

                    <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
                      <h5 className="font-medium text-neutral-900 mb-2">Scheduling</h5>
                      <ul className="text-sm text-neutral-600 space-y-1">
                        <li>• LIVE: Weekly Sunday 03:00 ET</li>
                        <li>• RETRO: Post-CFP championship</li>
                        <li>• Bias audit: Real-time monitoring</li>
                        <li>• Parameter freeze: Week 0 kickoff</li>
                      </ul>
                    </div>

                    <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
                      <h5 className="font-medium text-neutral-900 mb-2">Storage & Persistence</h5>
                      <ul className="text-sm text-neutral-600 space-y-1">
                        <li>• Raw API responses archived</li>
                        <li>• Weekly graph snapshots</li>
                        <li>• Rating history with deltas</li>
                        <li>• Parameter version control</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Database className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h5 className="font-medium text-blue-900">Reproducibility Guarantee</h5>
                    <p className="text-sm text-blue-700 mt-1">
                      Every ranking can be regenerated from the same input data and parameters. 
                      All random seeds are fixed, and the computation is deterministic across platforms.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
