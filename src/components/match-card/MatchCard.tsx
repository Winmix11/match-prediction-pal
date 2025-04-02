
import React, { useState } from "react";
import { useAppStore } from "@/lib/store";
import { Team, Match } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

import MatchHeader from "@/components/MatchHeader";
import PredictionButtons from "@/components/PredictionButtons";
import SubmitPredictionButton from "@/components/SubmitPredictionButton";
import MatchCardContainer from "./MatchCardContainer";
import TeamsSection from "./TeamsSection";
import SelectableTeamsSection from "./SelectableTeamsSection";
import DemoSimulator from "./DemoSimulator";

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
    <MatchCardContainer>
      <MatchHeader id={id} time={time} timeGMT={timeGMT} startsIn={startsIn} />

      <div className="space-y-5">
        <TeamsSection 
          homeTeam={homeTeam}
          awayTeam={awayTeam}
          score={score}
          selectedPrediction={selectedPrediction}
          onSelectPrediction={setSelectedPrediction}
        />

        {selectableTeams && (
          <SelectableTeamsSection 
            homeTeam={homeTeam}
            awayTeam={awayTeam}
            homeTeamDropdownOpen={homeTeamDropdownOpen}
            awayTeamDropdownOpen={awayTeamDropdownOpen}
            allTeams={allTeams}
            onHomeTeamToggle={() => setHomeTeamDropdownOpen(!homeTeamDropdownOpen)}
            onAwayTeamToggle={() => setAwayTeamDropdownOpen(!awayTeamDropdownOpen)}
            onTeamSelect={handleTeamSelect}
          />
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
      
      <DemoSimulator 
        existingPrediction={!!existingPrediction}
        score={score}
        matchId={id}
        onSimulateResult={simulateMatchResult}
      />
    </MatchCardContainer>
  );
};

export default MatchCard;
