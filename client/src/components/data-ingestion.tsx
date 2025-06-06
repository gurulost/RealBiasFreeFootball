import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { api } from '@/lib/api';
import { Download, AlertCircle, CheckCircle } from 'lucide-react';

export function DataIngestion() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const queryClient = useQueryClient();

  const ingestMutation = useMutation({
    mutationFn: () => api.ingestData(2024),
    onMutate: () => {
      setStatus('loading');
      setMessage('Connecting to College Football Data API...');
    },
    onSuccess: (data) => {
      setStatus('success');
      setMessage(`Successfully loaded ${data.season} season data with all postseason games`);
      // Invalidate all ranking-related queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/rankings'] });
      queryClient.invalidateQueries({ queryKey: ['/api/status'] });
      queryClient.invalidateQueries({ queryKey: ['/api/bias-audit'] });
    },
    onError: (error) => {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Failed to load data');
    }
  });

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Load 2024 Season Data
        </CardTitle>
        <CardDescription>
          Import complete 2024 college football season data including all postseason games from the College Football Data API
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {status === 'idle' && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              This will load authentic data for all FBS teams, regular season games, and postseason games 
              completed through early 2025, then calculate definitive end-of-season rankings.
            </p>
            <Button 
              onClick={() => ingestMutation.mutate()}
              disabled={ingestMutation.isPending}
              className="w-full"
            >
              Load 2024 Season Data
            </Button>
          </div>
        )}

        {status === 'loading' && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {message}
            </AlertDescription>
          </Alert>
        )}

        {status === 'success' && (
          <Alert className="border-green-200 bg-green-50 text-green-800">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              {message}
            </AlertDescription>
          </Alert>
        )}

        {status === 'error' && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {message}
            </AlertDescription>
          </Alert>
        )}

        {status !== 'idle' && (
          <Button 
            variant="outline" 
            onClick={() => {
              setStatus('idle');
              setMessage('');
            }}
            className="w-full"
          >
            Reset
          </Button>
        )}
      </CardContent>
    </Card>
  );
}