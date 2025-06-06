import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface WeekSelectorProps {
  selectedWeek: number;
  selectedSeason: number;
  onWeekChange: (week: number) => void;
  onSeasonChange: (season: number) => void;
}

export function WeekSelector({ 
  selectedWeek, 
  selectedSeason, 
  onWeekChange, 
  onSeasonChange 
}: WeekSelectorProps) {
  const currentYear = new Date().getFullYear();
  const seasons = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const weeks = Array.from({ length: 15 }, (_, i) => i + 1);

  const getDateRange = (week: number, season: number) => {
    // Approximate date calculation for college football weeks
    const seasonStart = new Date(season, 7, 25); // Late August
    const weekStart = new Date(seasonStart.getTime() + (week - 1) * 7 * 24 * 60 * 60 * 1000);
    const weekEnd = new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000);
    
    return `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}-${weekEnd.toLocaleDateString('en-US', { day: 'numeric' })}, ${season}`;
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <label className="text-sm font-medium text-neutral-700">Season:</label>
        <Select value={selectedSeason.toString()} onValueChange={(value) => onSeasonChange(parseInt(value))}>
          <SelectTrigger className="w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {seasons.map(season => (
              <SelectItem key={season} value={season.toString()}>
                {season}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onWeekChange(Math.max(1, selectedWeek - 1))}
          disabled={selectedWeek === 1}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        
        <div className="bg-neutral-100 px-3 py-2 rounded-lg min-w-48 text-center">
          <div className="font-medium">Week {selectedWeek}</div>
          <div className="text-xs text-neutral-600 font-mono">
            {getDateRange(selectedWeek, selectedSeason)}
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onWeekChange(Math.min(15, selectedWeek + 1))}
          disabled={selectedWeek === 15}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
