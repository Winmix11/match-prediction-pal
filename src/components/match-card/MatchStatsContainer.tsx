
import React from "react";
import MatchCardContainer from "./MatchCardContainer";
import MatchHeader from "../MatchHeader";
import { MatchStats } from "./MatchStats";

interface MatchStatsContainerProps {
  matchId?: number;
}

const MatchStatsContainer = ({ matchId = 1 }: MatchStatsContainerProps) => {
  return (
    <MatchCardContainer>
      <MatchHeader 
        id={matchId} 
        time="19:30" 
        timeGMT="16:30 GMT" 
        startsIn="Finished" 
      />
      
      <MatchStats />
    </MatchCardContainer>
  );
};

export default MatchStatsContainer;
