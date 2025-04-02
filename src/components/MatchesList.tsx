
import React from 'react';
import { Match } from '@/lib/types';
import MatchCard from '@/components/MatchCard';
import MatchCardSkeleton from '@/components/MatchCardSkeleton';
import { cn } from '@/lib/utils';

interface MatchesListProps {
  matches: Match[];
  isLoading: boolean;
  showAnimation: boolean;
}

const MatchesList = ({ matches, isLoading, showAnimation }: MatchesListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {isLoading ? (
        Array(3).fill(0).map((_, index) => (
          <div 
            key={`skeleton-${index}`}
            className={cn(
              "transition-all duration-700",
              showAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
            style={{ 
              transitionDelay: showAnimation ? `${(index + 4) * 100}ms` : '0ms'
            }}
          >
            <MatchCardSkeleton />
          </div>
        ))
      ) : (
        matches.map((match, index) => (
          <div 
            key={match.id}
            className={cn(
              "transition-all duration-700",
              showAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
            style={{ 
              transitionDelay: showAnimation ? `${(index + 4) * 100}ms` : '0ms'
            }}
          >
            <MatchCard match={match} />
          </div>
        ))
      )}
    </div>
  );
};

export default MatchesList;
