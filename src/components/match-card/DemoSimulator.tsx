
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
        className="text-xs text-sports-blue hover:text-sports-blue-dark transition-colors"
      >
        (Demo: Simulate Match Result)
      </button>
    </div>
  );
};

export default DemoSimulator;
