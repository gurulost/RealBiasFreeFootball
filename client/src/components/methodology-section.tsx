import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Shield, Database } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

export function MethodologySection() {
  const { data: algorithmParams, isLoading } = useQuery({
    queryKey: ['/api/algorithm-parameters'],
    queryFn: () => api.getAlgorithmParameters(2024),
  });

  return (
    <Card>
      <CardHeader>
        <div className="text-center">
          <CardTitle className="text-2xl mb-2">Two-Layer PageRank Methodology</CardTitle>
          <p className="text-neutral-600">Bias-free college football rankings using authentic game data and advanced graph theory</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-neutral-900 mb-3 flex items-center">
                <div className="w-8 h-8 bg-primary-600 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-3">1</div>
                Stage 1: Conference Strength
              </h4>
              <p className="text-neutral-600 text-sm mb-3">
                PageRank algorithm processes <strong>cross-conference games only</strong> to determine unbiased conference strength ratings.
              </p>
              <div className="bg-neutral-50 rounded-lg p-4">
                <p className="text-xs text-neutral-500 mb-2">Key Features:</p>
                <ul className="text-xs text-neutral-600 space-y-1">
                  <li>• Surprise multiplier for upsets (Shannon information)</li>
                  <li>• Risk multipliers based on win probability</li>
                  <li>• Recency decay (λ = {algorithmParams ? algorithmParams.decayLambda : "0.05"} per week)</li>
                  <li>• Margin factor with cap at {algorithmParams ? `${algorithmParams.marginCap} TDs` : "5 touchdowns"}</li>
                </ul>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-neutral-900 mb-3 flex items-center">
                <div className="w-8 h-8 bg-amber-600 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-3">2</div>
                Stage 2: Team Rankings
              </h4>
              <p className="text-neutral-600 text-sm mb-3">
                Second PageRank run includes <strong>all games</strong> with conference strength (√S) injected into intra-conference edges.
              </p>
              <div className="bg-neutral-50 rounded-lg p-4">
                <p className="text-xs text-neutral-500 mb-2">Bias Prevention:</p>
                <ul className="text-xs text-neutral-600 space-y-1">
                  <li>• Conference strength applied exactly once</li>
                  <li>• No circular feedback loops</li>
                  <li>• Shrinkage weighting for early season</li>
                  <li>• Bowl game bonus multipliers</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-neutral-900 mb-3">Algorithm Parameters</h4>
              {isLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex justify-between items-center py-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                  ))}
                </div>
              ) : algorithmParams ? (
                <div className="space-y-3">
                  {[
                    { label: "Margin Cap", value: `${algorithmParams.marginCap} TDs` },
                    { label: "Recency Decay (λ)", value: algorithmParams.decayLambda },
                    { label: "Shrinkage (k)", value: `${algorithmParams.shrinkageK} games` },
                    { label: "Win Prob Constant (C)", value: algorithmParams.winProbC },
                    { label: "Surprise Factor (γ)", value: algorithmParams.surpriseGamma },
                    { label: "PageRank Damping", value: algorithmParams.pagerankDamping }
                  ].map((param, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-neutral-100 last:border-b-0">
                      <span className="text-sm text-neutral-600">{param.label}</span>
                      <Badge variant="outline" className="font-mono text-xs">{param.value}</Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-neutral-500 text-sm">
                  Algorithm parameters unavailable
                </div>
              )}
            </div>

            <div>
              <h4 className="text-lg font-semibold text-neutral-900 mb-3">Quality Assurance</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-green-900">Automated Bias Monitoring</p>
                    <p className="text-xs text-green-700">B-metric ≤4% target after Week 8</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Shield className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Deterministic Builds</p>
                    <p className="text-xs text-blue-700">Reproducible results from public data</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-200 pt-6">
          <div className="flex items-center justify-center space-x-8">
            <div className="text-center">
              <Database className="w-6 h-6 text-neutral-600 mx-auto mb-1" />
              <p className="text-sm font-semibold text-neutral-900">Data Source</p>
              <p className="text-xs text-neutral-600">CollegeFootballData.com API</p>
            </div>
            <div className="w-px h-8 bg-neutral-200"></div>
            <div className="text-center">
              <CheckCircle className="w-6 h-6 text-neutral-600 mx-auto mb-1" />
              <p className="text-sm font-semibold text-neutral-900">Update Schedule</p>
              <p className="text-xs text-neutral-600">Weekly Sunday 03:00 ET</p>
            </div>
            <div className="w-px h-8 bg-neutral-200"></div>
            <div className="text-center">
              <Shield className="w-6 h-6 text-neutral-600 mx-auto mb-1" />
              <p className="text-sm font-semibold text-neutral-900">Code Availability</p>
              <p className="text-xs text-neutral-600">Open source, reproducible</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
