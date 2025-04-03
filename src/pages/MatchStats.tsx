
import React from "react";
import MatchStatsContainer from "@/components/match-card/MatchStatsContainer";

const MatchStats = () => {
  return (
    <div className="container mx-auto max-w-3xl py-8 px-4">
      <h1 className="text-2xl font-bold text-white mb-6">Match Statistics</h1>
      <MatchStatsContainer />
    </div>
  );
};

export default MatchStats;
