
import React from "react";

type DemoSimulatorProps = {
  existingPrediction: boolean;
  score?: {
    home: number;
    away: number;
  };
  matchId: number;
  onSimulateResult: (matchId: number) => void;
};

const DemoSimulator: React.FC<DemoSimulatorProps> = ({
  existingPrediction,
  score,
  matchId,
  onSimulateResult,
}) => {
  if (!existingPrediction || score) {
    return null;
  }

  return (
    <div className="mt-3 text-center">
      <button 
        onClick={() => onSimulateResult(matchId)}
        className="text-sm bg-sports-blue/20 hover:bg-sports-blue/30 text-sports-blue hover:text-white px-3 py-1 rounded-full transition-all duration-200"
      >
        Demo: Szimuláció
      </button>
    </div>
  );
};

export default DemoSimulator;
