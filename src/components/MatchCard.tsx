
import React, { useState, useCallback } from "react";
import { Clock, Timer, Trophy, Shield, ChevronDown, ArrowRight, Star, Check, X } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { Team, TeamFormItem, Match } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type MatchCardProps = {
  match: Match;
};

const formLabels: Record<TeamFormItem, string> = {
  W: "Win",
  D: "Draw",
  L: "Loss",
  G: "Goal",
  Y: "Yellow Card",
  V: "Victory",
};

const formColors: Record<TeamFormItem, string> = {
  W: "bg-sports-green/20 text-sports-green",
  D: "bg-sports-accent/20 text-sports-accent",
  L: "bg-red-500/20 text-red-400",
  G: "bg-sports-blue/20 text-sports-blue",
  Y: "bg-sports-accent/20 text-sports-accent",
  V: "bg-sports-green/20 text-sports-green",
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

  const renderTeamForm = (form?: TeamFormItem[]) => {
    if (!form || form.length === 0) return null;

    return (
      <div className="flex gap-0.5 mt-2">
        {form.map((item, index) => (
          <span
            key={index}
            className={`text-[10px] font-medium px-1 rounded ${formColors[item]}`}
            title={formLabels[item]}
          >
            {item}
          </span>
        ))}
      </div>
    );
  };

  const renderTeamContent = (team?: Team, type: "home" | "away" = "home") => {
    if (!team) {
      return (
        <div className="text-gray-400 flex flex-col items-center gap-2">
          <Star className="w-8 h-8 opacity-40" />
          <span className="text-xs">Select {type} team</span>
        </div>
      );
    }

    return (
      <div className="text-center transform transition-all duration-300 hover:scale-105">
        <div className="w-16 h-16 mx-auto relative mb-2">
          <img
            src={team.logo || "/placeholder.svg"}
            alt={team.name}
            width={64}
            height={64}
            className="object-contain w-full h-full filter drop-shadow-lg"
          />
        </div>
        <span className="text-white text-sm font-medium">{team.name}</span>
        {renderTeamForm(team.form)}
        {team.rank && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-sports-blue/10 px-2 py-0.5 rounded">
            <Shield className="w-3 h-3 text-sports-blue" />
            <span className="text-[10px] font-medium text-sports-blue">{team.rank}</span>
          </div>
        )}
      </div>
    );
  };

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
      <div className="flex items-center justify-between mb-5 relative">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-xs sm:text-sm font-semibold text-sports-blue bg-sports-blue/10 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">Match {id}</span>
          <div className="px-2 py-0.5 rounded text-xs font-medium bg-sports-blue/20 text-sports-blue">
            <span className="flex items-center gap-1.5">
              <Timer className="w-3 h-3" />
              <span className="hidden sm:inline">Starts in</span> {startsIn}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-sports-blue" />
          <span className="text-xs font-medium text-sports-blue">{timeGMT}</span>
        </div>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-5 gap-2 items-center">
          <div className="col-span-2">
            <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-300 mb-3 bg-white/5 px-2 py-1 rounded-md">
              <Trophy className="w-3.5 h-3.5 text-sports-accent" />
              Home Team
            </label>
            <div className="relative aspect-[1/1] overflow-hidden rounded-lg p-3 bg-gradient-to-b from-gray-800/50 to-gray-900/50 flex items-center justify-center transition-all duration-300 border border-sports-blue/20 shadow-lg shadow-sports-blue/5">
              {renderTeamContent(homeTeam, "home")}
            </div>
          </div>

          <div className="col-span-1 flex flex-col items-center justify-center py-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sports-blue/10 to-sports-green/10 flex items-center justify-center border border-white/10 mb-2">
              <span className="text-white/70 font-bold text-sm">VS</span>
            </div>

            <div className="flex gap-1.5 mt-1">
              <button
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-200",
                  selectedPrediction === "home" ? "bg-sports-blue" : "bg-white/20 hover:bg-white/30"
                )}
                onClick={() => setSelectedPrediction("home")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedPrediction("home");
                  }
                }}
                tabIndex={0}
                role="radio"
                aria-checked={selectedPrediction === "home"}
                aria-label={`Prediction: ${homeTeam?.name || "Home"} win`}
              />
              <button
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-200",
                  selectedPrediction === "draw" ? "bg-sports-blue" : "bg-white/20 hover:bg-white/30"
                )}
                onClick={() => setSelectedPrediction("draw")}
                aria-label="Predict draw"
              />
              <button
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-200",
                  selectedPrediction === "away" ? "bg-sports-blue" : "bg-white/20 hover:bg-white/30"
                )}
                onClick={() => setSelectedPrediction("away")}
                aria-label="Predict away win"
              />
            </div>
          </div>

          <div className="col-span-2">
            <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-300 mb-3 bg-white/5 px-2 py-1 rounded-md">
              <Trophy className="w-3.5 h-3.5 text-sports-accent" />
              Away Team
            </label>
            <div className="relative aspect-[1/1] overflow-hidden rounded-lg p-3 bg-gradient-to-b from-gray-800/50 to-gray-900/50 flex items-center justify-center transition-all duration-300 border border-sports-blue/20 shadow-lg shadow-sports-blue/5">
              {renderTeamContent(awayTeam, "away")}
            </div>
          </div>
        </div>

        {selectableTeams && (
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-2 relative">
              <button
                className="flex items-center justify-between w-full px-4 py-2 text-sm bg-gradient-to-r from-sports-blue/10 to-sports-blue/10 hover:from-sports-blue/20 hover:to-sports-blue/20 border border-sports-blue/20 rounded-lg text-white transition-all duration-300"
                onClick={() => setHomeTeamDropdownOpen(!homeTeamDropdownOpen)}
              >
                {homeTeam ? (
                  <div className="flex items-center gap-2">
                    <img
                      src={homeTeam.logo || "/placeholder.svg"}
                      alt={homeTeam.name}
                      width={20}
                      height={20}
                      className="w-5 h-5 object-contain"
                    />
                    {homeTeam.name}
                  </div>
                ) : (
                  "Select home team"
                )}
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-300",
                    homeTeamDropdownOpen ? "rotate-180" : ""
                  )}
                />
              </button>
              
              {/* Dropdown for home team */}
              {homeTeamDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-gray-800 border border-sports-blue/20 rounded-lg shadow-lg shadow-sports-blue/10 backdrop-blur-sm animate-fade-in-fast">
                  <div className="max-h-48 overflow-y-auto py-1">
                    {allTeams.map((team) => (
                      <button
                        key={team.id}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-white hover:bg-sports-blue/10 transition-colors duration-200"
                        onClick={() => handleTeamSelect(team, "home")}
                      >
                        <img
                          src={team.logo || "/placeholder.svg"}
                          alt={team.name}
                          width={20}
                          height={20}
                          className="w-5 h-5 object-contain"
                        />
                        {team.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="col-span-1"></div>

            <div className="col-span-2 relative">
              <button
                className="flex items-center justify-between w-full px-4 py-2 text-sm bg-gradient-to-r from-sports-blue/10 to-sports-blue/10 hover:from-sports-blue/20 hover:to-sports-blue/20 border border-sports-blue/20 rounded-lg text-white transition-all duration-300"
                onClick={() => setAwayTeamDropdownOpen(!awayTeamDropdownOpen)}
              >
                {awayTeam ? (
                  <div className="flex items-center gap-2">
                    <img
                      src={awayTeam.logo || "/placeholder.svg"}
                      alt={awayTeam.name}
                      width={20}
                      height={20}
                      className="w-5 h-5 object-contain"
                    />
                    {awayTeam.name}
                  </div>
                ) : (
                  "Select away team"
                )}
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-300",
                    awayTeamDropdownOpen ? "rotate-180" : ""
                  )}
                />
              </button>
              
              {/* Dropdown for away team */}
              {awayTeamDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-gray-800 border border-sports-blue/20 rounded-lg shadow-lg shadow-sports-blue/10 backdrop-blur-sm animate-fade-in-fast">
                  <div className="max-h-48 overflow-y-auto py-1">
                    {allTeams.map((team) => (
                      <button
                        key={team.id}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-white hover:bg-sports-blue/10 transition-colors duration-200"
                        onClick={() => handleTeamSelect(team, "away")}
                      >
                        <img
                          src={team.logo || "/placeholder.svg"}
                          alt={team.name}
                          width={20}
                          height={20}
                          className="w-5 h-5 object-contain"
                        />
                        {team.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {!selectableTeams && (
          <div className="grid grid-cols-3 gap-2 mt-3">
            <button
              className={cn(
                "prediction-btn",
                existingPrediction?.prediction === "home" 
                  ? "prediction-btn-active" 
                  : selectedPrediction === "home"
                  ? "prediction-btn-active" 
                  : "prediction-btn-inactive"
              )}
              onClick={() => !existingPrediction && setSelectedPrediction("home")}
              disabled={!!existingPrediction}
            >
              {homeTeam?.name || "Home"} Win
              {existingPrediction?.prediction === "home" && (
                <Check className="w-3 h-3 text-white inline-block ml-1" />
              )}
            </button>
            <button
              className={cn(
                "prediction-btn",
                existingPrediction?.prediction === "draw" 
                  ? "prediction-btn-active" 
                  : selectedPrediction === "draw"
                  ? "prediction-btn-active" 
                  : "prediction-btn-inactive"
              )}
              onClick={() => !existingPrediction && setSelectedPrediction("draw")}
              disabled={!!existingPrediction}
            >
              Draw
              {existingPrediction?.prediction === "draw" && (
                <Check className="w-3 h-3 text-white inline-block ml-1" />
              )}
            </button>
            <button
              className={cn(
                "prediction-btn",
                existingPrediction?.prediction === "away" 
                  ? "prediction-btn-active" 
                  : selectedPrediction === "away"
                  ? "prediction-btn-active" 
                  : "prediction-btn-inactive"
              )}
              onClick={() => !existingPrediction && setSelectedPrediction("away")}
              disabled={!!existingPrediction}
            >
              {awayTeam?.name || "Away"} Win
              {existingPrediction?.prediction === "away" && (
                <Check className="w-3 h-3 text-white inline-block ml-1" />
              )}
            </button>
          </div>
        )}
      </div>

      <div className="pt-6 mt-auto">
        <button
          className={cn(
            "inline-flex items-center justify-center gap-2 w-full px-4 py-3",
            "rounded-lg font-medium text-sm transition-all duration-300",
            "relative overflow-hidden",
            canPredict && selectedPrediction && !existingPrediction
              ? "bg-sports-blue hover:bg-sports-blue-dark text-white group"
              : existingPrediction 
              ? "bg-sports-green text-white cursor-default"
              : "bg-gray-800 text-gray-400 cursor-not-allowed"
          )}
          disabled={!canPredict || !selectedPrediction || existingPrediction !== undefined || isSubmitting}
          onClick={submitPrediction}
        >
          <span className="absolute inset-0 overflow-hidden rounded-lg">
            <span className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full animate-shine opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </span>
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </>
          ) : (
            <>
              {existingPrediction 
                ? "Prediction Submitted" 
                : "Predict Match"}
              {existingPrediction 
                ? <Check className="w-4 h-4" />
                : <ArrowRight className="w-4 h-4" />}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default MatchCard;
