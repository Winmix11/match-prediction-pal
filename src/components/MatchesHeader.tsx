
import React from 'react';
import { Trophy, Calendar, ChevronLeft, ChevronRight, Timer } from 'lucide-react';
import MatchFilters from '@/components/MatchFilters';
import { cn } from '@/lib/utils';

interface MatchesHeaderProps {
  showAnimation: boolean;
  currentDate: Date;
  formatDate: (date: Date) => string;
  changeDate: (days: number) => void;
}

const MatchesHeader = ({ showAnimation, currentDate, formatDate, changeDate }: MatchesHeaderProps) => {
  return (
    <div className="mb-8">
      <div 
        className={cn(
          "flex flex-col sm:flex-row items-start sm:items-center justify-between transition-all duration-700 delay-300 gap-4 sm:gap-0",
          showAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Trophy className="h-5 w-5 text-sports-accent" />
          Mai Mérkőzések
        </h2>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-muted/50 rounded-lg">
            <button 
              className="p-2 hover:bg-muted/80 rounded-l-lg transition-colors duration-200"
              onClick={() => changeDate(-1)}
            >
              <ChevronLeft className="h-4 w-4 text-white" />
            </button>
            
            <div className="px-3 py-1 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-sports-blue" />
              <span className="text-xs font-medium text-white">{formatDate(currentDate)}</span>
            </div>
            
            <button 
              className="p-2 hover:bg-muted/80 rounded-r-lg transition-colors duration-200"
              onClick={() => changeDate(1)}
            >
              <ChevronRight className="h-4 w-4 text-white" />
            </button>
          </div>
          
          <div className="bg-muted/50 px-3 py-1.5 rounded-lg flex items-center gap-2">
            <Timer className="h-4 w-4 text-sports-blue" />
            <span className="text-xs font-medium text-white">GMT</span>
          </div>
          
          <MatchFilters onChange={(newFilters) => {}} />
        </div>
      </div>
    </div>
  );
};

export default MatchesHeader;
