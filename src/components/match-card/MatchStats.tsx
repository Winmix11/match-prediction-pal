
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
      <div className="flex items-center justify-between gap-4 text-center">
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

      <Separator className="bg-gray-700" />

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        <StatCard
          label="Total Goals"
          value="4 Goals"
          indicator={
            <Button size="sm" variant="outline" className="bg-sports-blue/20 text-sports-blue border-sports-blue/30 hover:bg-sports-blue/30">
              Over 2.5
            </Button>
          }
        />
        <StatCard
          label="Both Teams Scored"
          value="No"
          indicator={
            <span className="flex items-center justify-center h-7 w-7 rounded-full bg-red-500/20">
              <X className="h-4 w-4 text-red-500" />
            </span>
          }
        />
        <StatCard
          label="Half Time Result"
          value="Wolverhampton Win"
          subValue="2 - 0"
        />
        <StatCard
          label="Full Time Result"
          value="Wolverhampton Win"
          subValue="4 - 0"
        />
      </div>

      {/* Additional Stats */}
      <div className="space-y-3 mt-2">
        <StatRow 
          label="HT Both Teams Scored" 
          value={
            <span className="flex items-center justify-center h-6 w-6 rounded-full bg-red-500/20">
              <X className="h-3 w-3 text-red-500" />
            </span>
          } 
        />
        <StatRow 
          label="HT Goals Over/Under 1.5" 
          value={
            <Button size="sm" variant="outline" className="h-6 px-2 py-0 bg-sports-blue/20 text-sports-blue border-sports-blue/30 hover:bg-sports-blue/30">
              Over
            </Button>
          } 
        />
        <StatRow 
          label="Second Half Goals" 
          value="2" 
        />
      </div>
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: string;
  subValue?: string;
  indicator?: React.ReactNode;
}

const StatCard = ({ label, value, subValue, indicator }: StatCardProps) => (
  <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/90 border border-gray-700 hover:border-sports-blue/30 transition-all duration-300">
    <CardContent className="flex items-center justify-between gap-2 p-3">
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-lg font-semibold text-white">{value}</p>
        {subValue && <p className="text-sm text-gray-500">{subValue}</p>}
      </div>
      {indicator && <div>{indicator}</div>}
    </CardContent>
  </Card>
);

interface StatRowProps {
  label: string;
  value: React.ReactNode;
}

const StatRow = ({ label, value }: StatRowProps) => (
  <div className="flex items-center justify-between px-2 py-1 bg-gray-800/30 rounded-md">
    <span className="text-sm text-gray-400">{label}</span>
    <span className="font-medium text-white">{value}</span>
  </div>
);

export default MatchStats;
