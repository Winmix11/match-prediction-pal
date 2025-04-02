
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
    <div className="grid grid-cols-5 gap-4">
      <div className="col-span-2">
        <TeamSelector
          team={homeTeam}
          allTeams={allTeams}
          isOpen={homeTeamDropdownOpen}
          onToggle={onHomeTeamToggle}
          onSelect={(team) => onTeamSelect(team, "home")}
          type="home"
        />
      </div>

      <div className="col-span-1"></div>

      <div className="col-span-2">
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
  );
};

export default SelectableTeamsSection;
