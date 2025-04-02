
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Trophy, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NotificationCenter from '@/components/NotificationCenter';
import ActionsDropdown from '@/components/ActionsDropdown';
import { cn } from '@/lib/utils';

interface ActionBarProps {
  showAnimation: boolean;
}

const ActionBar = ({ showAnimation }: ActionBarProps) => {
  return (
    <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
      <div 
        className={cn(
          "flex items-center gap-2 transition-all duration-700 delay-300",
          showAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        <Link to="/html-export">
          <Button variant="outline" size="sm" className="flex items-center gap-2 bg-white/5 text-sports-blue border-sports-blue/20 hover:bg-sports-blue/10">
            <FileText className="h-4 w-4" />
            HTML Export
          </Button>
        </Link>
        
        <Link to="/leaderboard">
          <Button variant="outline" size="sm" className="flex items-center gap-2 bg-white/5 text-sports-green border-sports-green/20 hover:bg-sports-green/10">
            <Trophy className="h-4 w-4" />
            Ranglista
          </Button>
        </Link>
        
        <NotificationCenter />
      </div>
      
      <div 
        className={cn(
          "transition-all duration-700 delay-300",
          showAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        <ActionsDropdown />
      </div>
    </div>
  );
};

export default ActionBar;
