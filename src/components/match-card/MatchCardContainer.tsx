
import React, { ReactNode } from "react";

type MatchCardContainerProps = {
  children: ReactNode;
};

const MatchCardContainer = ({ children }: MatchCardContainerProps) => {
  return (
    <div className="match-card">
      {children}
    </div>
  );
};

export default MatchCardContainer;
