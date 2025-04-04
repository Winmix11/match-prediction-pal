
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface MatchStatsProps {
  className?: string;
}

export const MatchStats = ({ className }: MatchStatsProps) => {
  return (
    <div className={cn("flex flex-col gap-4 p-4", className)}>
      {/* Score Section */}
      <div className="flex items-center justify-between gap-4 text-center bg-gray-800/50 rounded-lg p-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white">Wolverhampton</h3>
          <span className="text-sm text-gray-400">Home</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold text-sports-blue">4 - 0</div>
          <div className="text-sm text-gray-400">HT: 2 - 0</div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white">West Ham</h3>
          <span className="text-sm text-gray-400">Away</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 bg-gray-800/50 p-4 rounded-lg">
        <div className="space-y-1">
          <p className="text-sm text-gray-400">Total Goals</p>
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-white">4 Goals</p>
            <Button size="sm" variant="outline" className="bg-sports-blue/20 text-sports-blue border-sports-blue/30 hover:bg-sports-blue/30">
              Over 2.5
            </Button>
          </div>
        </div>
        
        <div className="space-y-1">
          <p className="text-sm text-gray-400">Both Teams Scored</p>
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-white">No</p>
            <span className="flex items-center justify-center h-7 w-7 rounded-full bg-red-500/20">
              <X className="h-4 w-4 text-red-500" />
            </span>
          </div>
        </div>
        
        <div className="space-y-1">
          <p className="text-sm text-gray-400">Half Time Result</p>
          <p className="text-lg font-semibold text-white">Wolverhampton Win</p>
          <p className="text-sm text-gray-500">2 - 0</p>
        </div>
        
        <div className="space-y-1">
          <p className="text-sm text-gray-400">Full Time Result</p>
          <p className="text-lg font-semibold text-white">Wolverhampton Win</p>
          <p className="text-sm text-gray-500">4 - 0</p>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="bg-gray-800/50 p-4 rounded-lg space-y-3">
        <div className="flex items-center justify-between px-2 py-1">
          <span className="text-sm text-gray-400">HT Both Teams Scored</span>
          <span className="flex items-center justify-center h-6 w-6 rounded-full bg-red-500/20">
            <X className="h-3 w-3 text-red-500" />
          </span>
        </div>
        
        <div className="flex items-center justify-between px-2 py-1">
          <span className="text-sm text-gray-400">HT Goals Over/Under 1.5</span>
          <Button size="sm" variant="outline" className="h-6 px-2 py-0 bg-sports-blue/20 text-sports-blue border-sports-blue/30 hover:bg-sports-blue/30">
            Over
          </Button>
        </div>
        
        <div className="flex items-center justify-between px-2 py-1">
          <span className="text-sm text-gray-400">Second Half Goals</span>
          <span className="font-medium text-white">2</span>
        </div>
      </div>
    </div>
  );
};

export default MatchStats;
