
import React, { useEffect, useRef } from "react";
import { Team } from "@/lib/types";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type TeamSelectorProps = {
  team?: Team;
  allTeams: Team[];
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (team: Team) => void;
  type: "home" | "away";
};

const TeamSelector: React.FC<TeamSelectorProps> = ({
  team,
  allTeams,
  isOpen,
  onToggle,
  onSelect,
  type,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && isOpen) {
        onToggle();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onToggle]);

  const handleTeamSelect = (team: Team) => {
    onSelect(team);
    onToggle(); // Close the dropdown after selection
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center justify-between w-full px-4 py-2 text-sm bg-gradient-to-r from-sports-blue/10 to-sports-blue/10 hover:from-sports-blue/20 hover:to-sports-blue/20 border border-sports-blue/20 rounded-lg text-white transition-all duration-300"
        onClick={onToggle}
        type="button"
      >
        {team ? (
          <div className="flex items-center gap-2">
            <img
              src={team.logo || "/placeholder.svg"}
              alt={team.name}
              width={20}
              height={20}
              className="w-5 h-5 object-contain"
            />
            {team.name}
          </div>
        ) : (
          `Select ${type} team`
        )}
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform duration-300",
            isOpen ? "rotate-180" : ""
          )}
        />
      </button>
      
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-gray-800 border border-sports-blue/20 rounded-lg shadow-lg shadow-sports-blue/10 backdrop-blur-sm animate-fade-in-fast">
          <div className="max-h-48 overflow-y-auto py-1">
            {allTeams.map((team) => (
              <button
                key={team.id}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-white hover:bg-sports-blue/10 transition-colors duration-200"
                onClick={() => handleTeamSelect(team)}
                type="button"
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
  );
};

export default TeamSelector;
