import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBiasMetrics } from "@/hooks/use-bias-metrics";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart3 } from "lucide-react";

export function ConferenceStrength() {
  const { conferenceStrength, isLoading } = useBiasMetrics();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <Skeleton className="w-3 h-8 rounded" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="w-24 h-2 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!conferenceStrength?.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Conference Strength</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <BarChart3 className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
            <p className="text-neutral-600">Conference strength data unavailable</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Filter out Independent teams from conference display
  const actualConferences = conferenceStrength.filter(conf => 
    !conf.conference.startsWith('IND-')
  );
  
  const sortedConferences = [...actualConferences].sort((a, b) => 
    parseFloat(b.strength) - parseFloat(a.strength)
  );

  const maxStrength = Math.max(...sortedConferences.map(c => parseFloat(c.strength)));
  const minStrength = Math.min(...sortedConferences.map(c => parseFloat(c.strength)));

  const getConferenceColor = (conference: string) => {
    const colors = {
      'SEC': 'bg-red-600',
      'Big Ten': 'bg-blue-600', 
      'Big 12': 'bg-orange-600',
      'ACC': 'bg-purple-600',
      'Pac-12': 'bg-green-600',
      'AAC': 'bg-indigo-600',
      'Mountain West': 'bg-cyan-600',
      'Conference USA': 'bg-pink-600',
      'MAC': 'bg-yellow-600',
      'Sun Belt': 'bg-emerald-600'
    };
    return colors[conference as keyof typeof colors] || 'bg-neutral-600';
  };

  const getBarWidth = (strength: number) => {
    const normalized = (strength - minStrength) / (maxStrength - minStrength);
    return Math.max(10, normalized * 100); // Minimum 10% width
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conference Strength</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedConferences.map((conf) => {
            const strength = parseFloat(conf.strength);
            const deviation = ((strength - 1) * 100);
            
            return (
              <div key={conf.id} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-8 rounded ${getConferenceColor(conf.conference)}`}></div>
                  <span className="text-sm font-medium min-w-20">{conf.conference}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="font-mono text-sm w-12 text-right">
                    {strength.toFixed(2)}
                  </span>
                  <div className="w-24 bg-neutral-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getConferenceColor(conf.conference)}`}
                      style={{ width: `${getBarWidth(strength)}%` }}
                    ></div>
                  </div>
                  <span className={`text-sm font-medium w-12 ${deviation >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {deviation >= 0 ? '+' : ''}{deviation.toFixed(1)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 pt-4 border-t border-neutral-200">
          <p className="text-xs text-neutral-500">
            Conference strength multipliers (√S) applied to intra-conference edges.
            Values above 1.00 indicate stronger conferences.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
