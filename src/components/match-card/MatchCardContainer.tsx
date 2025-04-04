
import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

type MatchCardContainerProps = {
  children: ReactNode;
  className?: string;
};

const MatchCardContainer = ({ children, className }: MatchCardContainerProps) => {
  return (
    <div className={cn(
      "match-card relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-lg overflow-hidden border border-gray-700 p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-sports-blue/30 flex flex-col min-h-[370px]",
      className
    )}>
      {children}
    </div>
  );
};

export default MatchCardContainer;
