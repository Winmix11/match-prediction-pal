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
  W: "bg-green-500/20 text-green-400",
  D: "bg-yellow-500/20 text-yellow-400",
  L: "bg-red-500/20 text-red-400",
  G: "bg-blue-500/20 text-blue-400",
  Y: "bg-yellow-500/20 text-yellow-400",
  V: "bg-green-500/20 text-green-400",
};

const MatchCard = ({ match }: MatchCardProps) => {
  const [selectedPrediction, setSelectedPrediction] = useState<string | null>(null);
  const [homeTeamDropdownOpen, setHomeTeamDropdownOpen] = useState(false);
  const [awayTeamDropdownOpen, setAwayTeamDropdownOpen] = useState(false);

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
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-blue-500/10 px-2 py-0.5 rounded">
            <Shield className="w-3 h-3 text-blue-400" />
            <span className="text-[10px] font-medium text-blue-300">#{team.rank}</span>
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

    // Add prediction to store
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
  };

  return (
    <div className="glass-card p-6 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 animate-fade-in">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="flex items-center justify-between mb-5 relative">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">Match {id}</span>
          <div className="px-2 py-0.5 rounded text-xs font-medium bg-blue-500/20 text-blue-400">
            <span className="flex items-center gap-1.5">
              <Timer className="w-3 h-3" />
              Starts in {startsIn}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-medium text-blue-300">{timeGMT}</span>
        </div>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-5 gap-2 items-center">
          <div className="col-span-2">
            <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-300 mb-3 bg-white/5 px-2 py-1 rounded-md">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              Home Team
            </label>
            <div className="relative aspect-[1/1] overflow-hidden rounded-lg p-3 bg-gradient-to-b from-gray-800/50 to-gray-900/50 flex items-center justify-center transition-all duration-300 border border-blue-500/20 shadow-lg shadow-blue-500/5">
              {renderTeamContent(homeTeam, "home")}
            </div>
          </div>

          <div className="col-span-1 flex flex-col items-center justify-center py-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center border border-white/10 mb-2">
              <span className="text-white/70 font-bold text-sm">VS</span>
            </div>

            <div className="flex gap-1.5 mt-1">
              <button
                className={`w-2 h-2 rounded-full transition-all duration-200 ${selectedPrediction === "home" ? "bg-blue-500" : "bg-white/20 hover:bg-white/30"}`}
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
                className={`w-2 h-2 rounded-full transition-all duration-200 ${selectedPrediction === "draw" ? "bg-blue-500" : "bg-white/20 hover:bg-white/30"}`}
                onClick={() => setSelectedPrediction("draw")}
                aria-label="Predict draw"
              />
              <button
                className={`w-2 h-2 rounded-full transition-all duration-200 ${selectedPrediction === "away" ? "bg-blue-500" : "bg-white/20 hover:bg-white/30"}`}
                onClick={() => setSelectedPrediction("away")}
                aria-label="Predict away win"
              />
            </div>
          </div>

          <div className="col-span-2">
            <label className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-300 mb-3 bg-white/5 px-2 py-1 rounded-md">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              Away Team
            </label>
            <div className="relative aspect-[1/1] overflow-hidden rounded-lg p-3 bg-gradient-to-b from-gray-800/50 to-gray-900/50 flex items-center justify-center transition-all duration-300 border border-blue-500/20 shadow-lg shadow-blue-500/5">
              {renderTeamContent(awayTeam, "away")}
            </div>
          </div>
        </div>

        {selectableTeams && (
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-2 relative">
              <button
                className="flex items-center justify-between w-full px-4 py-2 text-sm bg-gradient-to-r from-blue-500/10 to-blue-600/10 hover:from-blue-500/20 hover:to-blue-600/20 border border-blue-500/20 rounded-lg text-white transition-all duration-300"
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
                  className={`w-4 h-4 transition-transform duration-300 ${homeTeamDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>
              
              {/* Dropdown for home team */}
              {homeTeamDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-gray-800 border border-blue-500/20 rounded-lg shadow-lg shadow-blue-500/10 backdrop-blur-sm animate-fade-in-fast">
                  <div className="max-h-48 overflow-y-auto py-1">
                    {allTeams.map((team) => (
                      <button
                        key={team.id}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-white hover:bg-blue-500/10 transition-colors duration-200"
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
                className="flex items-center justify-between w-full px-4 py-2 text-sm bg-gradient-to-r from-blue-500/10 to-blue-600/10 hover:from-blue-500/20 hover:to-blue-600/20 border border-blue-500/20 rounded-lg text-white transition-all duration-300"
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
                  className={`w-4 h-4 transition-transform duration-300 ${awayTeamDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>
              
              {/* Dropdown for away team */}
              {awayTeamDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-gray-800 border border-blue-500/20 rounded-lg shadow-lg shadow-blue-500/10 backdrop-blur-sm animate-fade-in-fast">
                  <div className="max-h-48 overflow-y-auto py-1">
                    {allTeams.map((team) => (
                      <button
                        key={team.id}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-white hover:bg-blue-500/10 transition-colors duration-200"
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
                "px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all duration-200",
                existingPrediction?.prediction === "home" 
                  ? "bg-blue-600 text-white" 
                  : selectedPrediction === "home"
                  ? "bg-blue-600 text-white" 
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              )}
              onClick={() => setSelectedPrediction("home")}
            >
              {homeTeam?.name || "Home"} Win
              {existingPrediction?.prediction === "home" && (
                <Check className="w-3 h-3 text-white ml-1" />
              )}
            </button>
            <button
              className={cn(
                "px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all duration-200",
                existingPrediction?.prediction === "draw" 
                  ? "bg-blue-600 text-white" 
                  : selectedPrediction === "draw"
                  ? "bg-blue-600 text-white" 
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              )}
              onClick={() => setSelectedPrediction("draw")}
            >
              Draw
              {existingPrediction?.prediction === "draw" && (
                <Check className="w-3 h-3 text-white ml-1" />
              )}
            </button>
            <button
              className={cn(
                "px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all duration-200",
                existingPrediction?.prediction === "away" 
                  ? "bg-blue-600 text-white" 
                  : selectedPrediction === "away"
                  ? "bg-blue-600 text-white" 
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              )}
              onClick={() => setSelectedPrediction("away")}
            >
              {awayTeam?.name || "Away"} Win
              {existingPrediction?.prediction === "away" && (
                <Check className="w-3 h-3 text-white ml-1" />
              )}
            </button>
          </div>
        )}
      </div>

      <div className="pt-6">
        <button
          className={cn(
            "inline-flex items-center justify-center gap-2 w-full px-4 py-3",
            "rounded-lg font-medium text-sm transition-all duration-300",
            "relative overflow-hidden",
            canPredict && selectedPrediction
              ? "bg-blue-600 hover:bg-blue-700 text-white group"
              : "bg-gray-800 text-gray-400 cursor-not-allowed"
          )}
          disabled={!canPredict || !selectedPrediction || existingPrediction !== undefined}
          onClick={submitPrediction}
        >
          <span className="absolute inset-0 overflow-hidden rounded-lg">
            <span className="absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full animate-shine opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </span>
          {existingPrediction 
            ? "Prediction Submitted" 
            : "Predict Match"}
          {existingPrediction 
            ? <Check className="w-4 h-4" />
            : <ArrowRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};

export default MatchCard;
