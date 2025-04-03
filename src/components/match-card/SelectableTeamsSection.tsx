
import React from "react";
import { Team } from "@/lib/types";
import TeamSelector from "@/components/TeamSelector";

type SelectableTeamsSectionProps = {
  homeTeam?: Team;
  awayTeam?: Team;
  homeTeamDropdownOpen: boolean;
  awayTeamDropdownOpen: boolean;
  allTeams: Team[];
  onHomeTeamToggle: () => void;
  onAwayTeamToggle: () => void;
  onTeamSelect: (team: Team, type: "home" | "away") => void;
};

const SelectableTeamsSection: React.FC<SelectableTeamsSectionProps> = ({
  homeTeam,
  awayTeam,
  homeTeamDropdownOpen,
  awayTeamDropdownOpen,
  allTeams,
  onHomeTeamToggle,
  onAwayTeamToggle,
  onTeamSelect,
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-2">
        <h3 className="text-sm font-semibold text-sports-blue">Válassz csapatokat</h3>
        <p className="text-xs text-gray-400">Kattints az alábbi mezőkre a csapatok kiválasztásához</p>
      </div>
    
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-2">
          <label className="block text-xs font-medium text-gray-400 mb-1">Hazai csapat</label>
          <TeamSelector
            team={homeTeam}
            allTeams={allTeams}
            isOpen={homeTeamDropdownOpen}
            onToggle={onHomeTeamToggle}
            onSelect={(team) => onTeamSelect(team, "home")}
            type="home"
          />
        </div>

        <div className="col-span-1 flex items-center justify-center">
          <div className="w-full h-0.5 bg-gray-700"></div>
        </div>

        <div className="col-span-2">
          <label className="block text-xs font-medium text-gray-400 mb-1">Vendég csapat</label>
          <TeamSelector
            team={awayTeam}
            allTeams={allTeams}
            isOpen={awayTeamDropdownOpen}
            onToggle={onAwayTeamToggle}
            onSelect={(team) => onTeamSelect(team, "away")}
            type="away"
          />
        </div>
      </div>
    </div>
  );
};

export default SelectableTeamsSection;
