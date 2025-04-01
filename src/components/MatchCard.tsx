
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

  const { id, time, timeGMT, startsIn, homeTeam, awayTeam, selectableTeams = false } = match;

  // Store hooks
  const addPrediction = useAppStore((state) => state.addPrediction);
  const userStats = useAppStore((state) => state.userStats);
  const updateUserStats = useAppStore((state) => state.updateUserStats);
  const allTeams = useAppStore((state) => state.allTeams);
  const updateMatch = useAppStore((state) => state.updateMatch);
  const predictions = useAppStore((state) => state.predictions);
  
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

      // Update user stats
      updateUserStats({
        totalPredictions: userStats.totalPredictions + 1,
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
    }, 800); // Simulate API call
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
            </div>
          </div>

          <div className="col-span-1 flex flex-col items-center justify-center py-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sports-blue/10 to-sports-green/10 flex items-center justify-center border border-white/10 mb-2">
              <span className="text-white/70 font-bold text-sm">VS</span>
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
    </div>
  );
};

export default MatchCard;
