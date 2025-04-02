
import React, { useState } from "react";
import { Trophy } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { Team, Match } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

import MatchHeader from "./MatchHeader";
import TeamDisplay from "./TeamDisplay";
import TeamSelector from "./TeamSelector";
import PredictionDots from "./PredictionDots";
import PredictionButtons from "./PredictionButtons";
import SubmitPredictionButton from "./SubmitPredictionButton";

type MatchCardProps = {
  match: Match;
};

const MatchCard = ({ match }: MatchCardProps) => {
  const [selectedPrediction, setSelectedPrediction] = useState<string | null>(null);
  const [homeTeamDropdownOpen, setHomeTeamDropdownOpen] = useState(false);
  const [awayTeamDropdownOpen, setAwayTeamDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { id, time, timeGMT, startsIn, homeTeam, awayTeam, selectableTeams = false, score } = match;

  // Store hooks
  const addPrediction = useAppStore((state) => state.addPrediction);
  const updateUserStats = useAppStore((state) => state.updateUserStats);
  const allTeams = useAppStore((state) => state.allTeams);
  const updateMatch = useAppStore((state) => state.updateMatch);
  const predictions = useAppStore((state) => state.predictions);
  const finalizeMatchResult = useAppStore((state) => state.finalizeMatchResult);
  
  // Check if a prediction exists for this match
  const existingPrediction = predictions.find(p => p.matchId === id);
  
  // Toast
  const { toast } = useToast();

  const canPredict = homeTeam && awayTeam && !selectableTeams;

  const handleTeamSelect = (team: Team, type: "home" | "away") => {
    updateMatch(id, {
      [type === "home" ? "homeTeam" : "awayTeam"]: team
    });
    
    if (type === "home") {
      setHomeTeamDropdownOpen(false);
    } else {
      setAwayTeamDropdownOpen(false);
    }
  };

  // Submit prediction
  const submitPrediction = () => {
    if (!homeTeam || !awayTeam || !selectedPrediction) return;

    setIsSubmitting(true);

    // Add prediction to store
    setTimeout(() => {
      addPrediction({
        matchId: id,
        homeTeam,
        awayTeam,
        prediction: selectedPrediction as "home" | "draw" | "away",
      });

      // Show toast notification
      toast({
        title: "Prediction Saved",
        description: `Your prediction for ${homeTeam.name} vs ${awayTeam.name} has been saved.`,
        duration: 3000,
      });

      // Reset selected prediction
      setSelectedPrediction(null);
      setIsSubmitting(false);
      
      // For demo purposes, we can simulate a match result after 5 seconds
      // In a real app, this would be handled by a server or admin action
      if (import.meta.env.DEV) {
        setTimeout(() => {
          simulateMatchResult(id);
        }, 5000);
      }
    }, 800); // Simulate API call
  };
  
  // For demo/testing purposes only - simulates a match result
  const simulateMatchResult = (matchId: number) => {
    // Generate random scores
    const homeScore = Math.floor(Math.random() * 4);
    const awayScore = Math.floor(Math.random() * 3);
    
    // Finalize the match result
    finalizeMatchResult(matchId, homeScore, awayScore);
    
    // Show toast with result
    toast({
      title: "Match Finished!",
      description: `Final score: ${homeTeam?.name} ${homeScore} - ${awayScore} ${awayTeam?.name}`,
      duration: 5000,
    });
  };

  return (
    <div className="match-card">
      <MatchHeader id={id} time={time} timeGMT={timeGMT} startsIn={startsIn} />

      <div className="space-y-5">
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
              onSelectPrediction={setSelectedPrediction}
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

        {selectableTeams && (
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-2">
              <TeamSelector
                team={homeTeam}
                allTeams={allTeams}
                isOpen={homeTeamDropdownOpen}
                onToggle={() => setHomeTeamDropdownOpen(!homeTeamDropdownOpen)}
                onSelect={(team) => handleTeamSelect(team, "home")}
                type="home"
              />
            </div>

            <div className="col-span-1"></div>

            <div className="col-span-2">
              <TeamSelector
                team={awayTeam}
                allTeams={allTeams}
                isOpen={awayTeamDropdownOpen}
                onToggle={() => setAwayTeamDropdownOpen(!awayTeamDropdownOpen)}
                onSelect={(team) => handleTeamSelect(team, "away")}
                type="away"
              />
            </div>
          </div>
        )}

        {!selectableTeams && (
          <PredictionButtons
            homeTeamName={homeTeam?.name}
            awayTeamName={awayTeam?.name}
            selectedPrediction={selectedPrediction}
            existingPrediction={existingPrediction}
            onSelectPrediction={setSelectedPrediction}
          />
        )}
      </div>

      <SubmitPredictionButton
        canPredict={canPredict}
        selectedPrediction={selectedPrediction}
        existingPrediction={!!existingPrediction}
        isSubmitting={isSubmitting}
        onSubmit={submitPrediction}
      />
      
      {existingPrediction && !score && (
        <div className="mt-3 text-center">
          <button 
            onClick={() => simulateMatchResult(id)}
            className="text-xs text-sports-blue hover:text-sports-blue-dark transition-colors"
          >
            (Demo: Simulate Match Result)
          </button>
        </div>
      )}
    </div>
  );
};

export default MatchCard;
