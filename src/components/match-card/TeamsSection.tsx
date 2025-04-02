
import React from "react";
import { Team } from "@/lib/types";
import TeamDisplay from "@/components/TeamDisplay";
import PredictionDots from "@/components/PredictionDots";

type TeamsSectionProps = {
  homeTeam?: Team;
  awayTeam?: Team;
  score?: {
    home: number;
    away: number;
  };
  selectedPrediction: string | null;
  onSelectPrediction: (prediction: string) => void;
};

const TeamsSection: React.FC<TeamsSectionProps> = ({
  homeTeam,
  awayTeam,
  score,
  selectedPrediction,
  onSelectPrediction,
}) => {
  return (
    <div className="grid grid-cols-5 gap-2 items-center">
      <div className="col-span-2">
        <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-300 mb-3 bg-white/5 px-2 py-1 rounded-md">
          <Trophy className="w-3.5 h-3.5 text-sports-accent" />
          Home Team
        </label>
        <div className="relative aspect-[1/1] overflow-hidden rounded-lg p-3 bg-gradient-to-b from-gray-800/50 to-gray-900/50 flex items-center justify-center transition-all duration-300 border border-sports-blue/20 shadow-lg shadow-sports-blue/5">
          <TeamDisplay team={homeTeam} type="home" />
          
          {score && (
            <div className="absolute top-0 right-0 bg-sports-blue/90 text-white font-bold px-3 py-1 rounded-bl-lg">
              {score.home}
            </div>
          )}
        </div>
      </div>

      <div className="col-span-1 flex flex-col items-center justify-center py-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sports-blue/10 to-sports-green/10 flex items-center justify-center border border-white/10 mb-2">
          {score ? (
            <span className="text-white font-bold text-sm">{score.home} - {score.away}</span>
          ) : (
            <span className="text-white/70 font-bold text-sm">VS</span>
          )}
        </div>

        <PredictionDots 
          selectedPrediction={selectedPrediction} 
          onSelectPrediction={onSelectPrediction}
        />
      </div>

      <div className="col-span-2">
        <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-300 mb-3 bg-white/5 px-2 py-1 rounded-md">
          <Trophy className="w-3.5 h-3.5 text-sports-accent" />
          Away Team
        </label>
        <div className="relative aspect-[1/1] overflow-hidden rounded-lg p-3 bg-gradient-to-b from-gray-800/50 to-gray-900/50 flex items-center justify-center transition-all duration-300 border border-sports-blue/20 shadow-lg shadow-sports-blue/5">
          <TeamDisplay team={awayTeam} type="away" />
          
          {score && (
            <div className="absolute top-0 left-0 bg-sports-blue/90 text-white font-bold px-3 py-1 rounded-br-lg">
              {score.away}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Add the missing Trophy import
import { Trophy } from "lucide-react";

export default TeamsSection;
