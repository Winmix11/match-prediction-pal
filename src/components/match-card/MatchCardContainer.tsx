
import React, { ReactNode } from "react";

type MatchCardContainerProps = {
  children: ReactNode;
};

const MatchCardContainer = ({ children }: MatchCardContainerProps) => {
  return (
    <div className="match-card relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-lg overflow-hidden border border-gray-700 p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-sports-blue/30 flex flex-col min-h-[370px]">
      {children}
    </div>
  );
};

export default MatchCardContainer;
