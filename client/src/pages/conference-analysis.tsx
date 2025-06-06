import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useConferenceStrength } from "@/hooks/use-conference-strength";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Download, Info, TrendingUp, Target, Calculator, Eye } from "lucide-react";

export default function ConferenceAnalysis() {
  const [selectedSeason] = useState(2024);
  const [selectedWeek] = useState(15);
  const { data: conferenceData, isLoading } = useConferenceStrength(selectedSeason, selectedWeek);
  const { toast } = useToast();

  // Mock data for demonstration - in real app this would come from API
  const conferenceRankings = [
    { conference: "SEC", pageRank: 0.18542, injectionFactor: 2.04, games: 45, crossConfWins: 32 },
    { conference: "Big Ten", pageRank: 0.16003, injectionFactor: 1.76, games: 41, crossConfWins: 28 },
    { conference: "Big 12", pageRank: 0.14278, injectionFactor: 1.57, games: 38, crossConfWins: 24 },
    { conference: "FBS Independents", pageRank: 0.12054, injectionFactor: 1.33, games: 15, crossConfWins: 9 },
    { conference: "ACC", pageRank: 0.11537, injectionFactor: 1.27, games: 42, crossConfWins: 22 },
    { conference: "Pac-12", pageRank: 0.09521, injectionFactor: 1.05, games: 12, crossConfWins: 6 },
    { conference: "Mountain West", pageRank: 0.06508, injectionFactor: 0.72, games: 35, crossConfWins: 18 },
    { conference: "American Athletic", pageRank: 0.06217, injectionFactor: 0.68, games: 32, crossConfWins: 14 },
    { conference: "Conference USA", pageRank: 0.02568, injectionFactor: 0.28, games: 28, crossConfWins: 8 },
    { conference: "Mid-American", pageRank: 0.01940, injectionFactor: 0.21, games: 24, crossConfWins: 5 },
    { conference: "Sun Belt", pageRank: 0.01400, injectionFactor: 0.15, games: 22, crossConfWins: 4 }
  ];

  const flowMatrix = [
    { from: "SEC", to: "Big Ten", weight: 0.089, games: 3 },
    { from: "SEC", to: "ACC", weight: 0.124, games: 4 },
    { from: "Big Ten", to: "SEC", weight: 0.049, games: 2 },
    { from: "Big Ten", to: "Big 12", weight: 0.067, games: 3 },
    { from: "Big 12", to: "SEC", weight: 0.128, games: 5 },
    { from: "ACC", to: "SEC", weight: 0.021, games: 1 },
  ];

  const crossConfGames = [
    {
      week: 3,
      loserConf: "Big 12",
      winnerConf: "SEC", 
      teams: "Texas vs Georgia",
      baseWeight: 0.05,
      riskMult: 1.80,
      surpriseMult: 2.30,
      edgeWeight: 0.207
    },
    {
      week: 5,
      loserConf: "Pac-12",
      winnerConf: "Big Ten",
      teams: "Oregon vs Ohio State", 
      baseWeight: 0.08,
      riskMult: 2.10,
      surpriseMult: 1.85,
      edgeWeight: 0.311
    },
    {
      week: 8,
      loserConf: "ACC",
      winnerConf: "SEC",
      teams: "Clemson vs Alabama",
      baseWeight: 0.06,
      riskMult: 1.65,
      surpriseMult: 3.20,
      edgeWeight: 0.317
    }
  ];

  const handleExportData = async (type: string) => {
    try {
      // In real implementation, these would be actual API calls
      const mockData = type === 'rankings' ? conferenceRankings :
                      type === 'matrix' ? flowMatrix : crossConfGames;
      
      const csv = convertToCSV(mockData);
      downloadCSV(csv, `conference-${type}-${selectedSeason}.csv`);
      
      toast({
        title: "Export Successful",
        description: `Conference ${type} data has been downloaded.`,
      });
    } catch (error) {
      toast({
        title: "Export Failed", 
        description: "Failed to export data. Please try again.",
        variant: "destructive",
      });
    }
  };

  const convertToCSV = (data: any[]) => {
    if (!data.length) return '';
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(item => Object.values(item).join(','));
    return [headers, ...rows].join('\n');
  };

  const downloadCSV = (csv: string, filename: string) => {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const getStrengthColor = (factor: number) => {
    if (factor >= 1.5) return "bg-green-500";
    if (factor >= 1.2) return "bg-green-400"; 
    if (factor >= 1.0) return "bg-yellow-400";
    if (factor >= 0.8) return "bg-orange-400";
    return "bg-red-400";
  };

  const getStrengthLabel = (factor: number) => {
    if (factor >= 1.5) return "Elite";
    if (factor >= 1.2) return "Strong"; 
    if (factor >= 1.0) return "Average";
    if (factor >= 0.8) return "Below Average";
    return "Weak";
  };

  return (
    <TooltipProvider>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Conference Strength Analysis
          </h1>
          <p className="text-neutral-600">
            Raw PageRank calculations and cross-conference matchup analysis for transparent conference rankings
          </p>
        </div>

        <Alert className="mb-6">
          <Info className="h-4 w-4" />
          <AlertDescription>
            Conference strength is calculated using PageRank analysis of cross-conference games only. 
            Each conference's score represents its share of total "rank flow" across all inter-conference matchups.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="rankings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="rankings">
              <TrendingUp className="w-4 h-4 mr-2" />
              PageRank Rankings
            </TabsTrigger>
            <TabsTrigger value="matrix">
              <Target className="w-4 h-4 mr-2" />
              Flow Matrix
            </TabsTrigger>
            <TabsTrigger value="injection">
              <Calculator className="w-4 h-4 mr-2" />
              Injection Factors
            </TabsTrigger>
            <TabsTrigger value="games">
              <Eye className="w-4 h-4 mr-2" />
              Cross-Conf Games
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rankings">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Conference PageRank Scores</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Each conference's share of total cross-conference rank flow
                    </p>
                  </div>
                  <Button variant="outline" onClick={() => handleExportData('rankings')}>
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {conferenceRankings.map((conf, index) => (
                    <div key={conf.conference} className="flex items-center space-x-4 p-4 rounded-lg bg-neutral-50">
                      <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{conf.conference}</h3>
                          <Badge className={`${getStrengthColor(conf.injectionFactor)} text-white`}>
                            {getStrengthLabel(conf.injectionFactor)}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <Tooltip>
                              <TooltipTrigger>
                                <span className="text-muted-foreground">PageRank Score: </span>
                                <span className="font-mono font-semibold">{conf.pageRank.toFixed(5)}</span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>The conference's share of total rank flow from cross-conference games.</p>
                                <p>Higher values indicate stronger performance against other conferences.</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          
                          <div>
                            <span className="text-muted-foreground">Cross-Conf Record: </span>
                            <span className="font-semibold">{conf.crossConfWins}-{conf.games - conf.crossConfWins}</span>
                          </div>
                          
                          <div>
                            <span className="text-muted-foreground">Win Rate: </span>
                            <span className="font-semibold">{(conf.crossConfWins / conf.games * 100).toFixed(1)}%</span>
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <Progress 
                            value={conf.pageRank * 500} 
                            className="h-2"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="matrix">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Conference Flow Matrix</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Credit flow between conferences from cross-conference matchups
                    </p>
                  </div>
                  <Button variant="outline" onClick={() => handleExportData('matrix')}>
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>From Conference</TableHead>
                      <TableHead>To Conference</TableHead>
                      <TableHead>
                        <Tooltip>
                          <TooltipTrigger>Flow Weight</TooltipTrigger>
                          <TooltipContent>
                            <p>Total weighted credit flow from losses to wins</p>
                            <p>Higher values = more significant head-to-head results</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableHead>
                      <TableHead>Games</TableHead>
                      <TableHead>Avg Per Game</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {flowMatrix.map((flow, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{flow.from}</TableCell>
                        <TableCell className="font-medium">{flow.to}</TableCell>
                        <TableCell>
                          <span className="font-mono font-semibold">{flow.weight.toFixed(3)}</span>
                        </TableCell>
                        <TableCell>{flow.games}</TableCell>
                        <TableCell className="font-mono">{(flow.weight / flow.games).toFixed(3)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="injection">
            <Card>
              <CardHeader>
                <CardTitle>Injection Factor Multipliers</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  How conference strength affects intra-conference game values
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {conferenceRankings.map((conf) => (
                    <div key={conf.conference} className="flex items-center justify-between p-4 rounded-lg bg-neutral-50">
                      <div>
                        <h3 className="font-semibold">{conf.conference}</h3>
                        <p className="text-sm text-muted-foreground">
                          PageRank: {conf.pageRank.toFixed(5)}
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-bold">
                          {conf.injectionFactor.toFixed(2)}x
                        </div>
                        <Tooltip>
                          <TooltipTrigger>
                            <p className="text-sm text-muted-foreground">
                              {conf.injectionFactor > 1 ? '+' : ''}{((conf.injectionFactor - 1) * 100).toFixed(0)}% impact
                            </p>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Intra-conference games are multiplied by this factor</p>
                            <p>Values above 1.0 boost game importance</p>
                            <p>Values below 1.0 reduce game importance</p>
                            <p>Formula: N × PageRank Score (N = number of conferences)</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="games">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Cross-Conference Game Details</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Raw edge weights from individual cross-conference matchups
                    </p>
                  </div>
                  <Button variant="outline" onClick={() => handleExportData('games')}>
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Week</TableHead>
                      <TableHead>Matchup</TableHead>
                      <TableHead>Flow Direction</TableHead>
                      <TableHead>
                        <Tooltip>
                          <TooltipTrigger>Base Weight</TooltipTrigger>
                          <TooltipContent>
                            <p>Margin × venue × decay factors</p>
                            <p>Higher margins = higher base weight</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableHead>
                      <TableHead>
                        <Tooltip>
                          <TooltipTrigger>Risk Mult</TooltipTrigger>
                          <TooltipContent>
                            <p>Risk multiplier: (1 - p_expected)^0.5</p>
                            <p>Higher for games with uncertain outcomes</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableHead>
                      <TableHead>
                        <Tooltip>
                          <TooltipTrigger>Surprise Mult</TooltipTrigger>
                          <TooltipContent>
                            <p>Surprise multiplier for upsets</p>
                            <p>Much higher when favorites lose</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableHead>
                      <TableHead>
                        <Tooltip>
                          <TooltipTrigger>Final Weight</TooltipTrigger>
                          <TooltipContent>
                            <p>Base × Risk × Surprise</p>
                            <p>The actual credit flow between conferences</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {crossConfGames.map((game, index) => (
                      <TableRow key={index}>
                        <TableCell>{game.week}</TableCell>
                        <TableCell className="font-medium">{game.teams}</TableCell>
                        <TableCell>
                          <span className="text-red-600">{game.loserConf}</span>
                          {' → '}
                          <span className="text-green-600">{game.winnerConf}</span>
                        </TableCell>
                        <TableCell className="font-mono">{game.baseWeight.toFixed(3)}</TableCell>
                        <TableCell className="font-mono">{game.riskMult.toFixed(2)}</TableCell>
                        <TableCell className="font-mono">{game.surpriseMult.toFixed(2)}</TableCell>
                        <TableCell className="font-mono font-semibold">{game.edgeWeight.toFixed(3)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </TooltipProvider>
  );
}