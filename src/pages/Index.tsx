
import React, { useEffect, useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Trophy, Timer, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import MatchCard from '@/components/MatchCard';
import UserStats from '@/components/UserStats';
import ActionsDropdown from '@/components/ActionsDropdown';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const Index = () => {
  const matches = useAppStore((state) => state.matches);
  const userStats = useAppStore((state) => state.userStats);
  const predictions = useAppStore((state) => state.predictions);
  const [showAnimation, setShowAnimation] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const { toast } = useToast();
  
  useEffect(() => {
    // Trigger animations after component mounts
    setShowAnimation(true);
    
    // Show welcome toast
    if (userStats.totalPredictions === 0) {
      toast({
        title: "Welcome to MatchPredict",
        description: "Make your first prediction to earn points!",
        duration: 5000,
      });
    }
  }, [toast, userStats.totalPredictions]);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const changeDate = (days: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };
  
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-900/5 to-transparent z-0 pointer-events-none"></div>
      
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-16 relative z-10">
        <div className="mb-16">
          <h1 
            className={cn(
              "text-4xl md:text-5xl font-bold text-white text-center mb-3 transition-all duration-700",
              showAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            Predict Football <span className="text-blue-400">Matches</span>
          </h1>
          <p 
            className={cn(
              "text-lg text-gray-400 text-center max-w-2xl mx-auto transition-all duration-700 delay-100",
              showAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            Test your football knowledge, make predictions, and compete for the top spot.
          </p>
        </div>
        
        <div 
          className={cn(
            "mb-12 transition-all duration-700 delay-200",
            showAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <UserStats />
        </div>

        <div className="mb-8 flex justify-end">
          <div 
            className={cn(
              "transition-all duration-700 delay-300",
              showAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <ActionsDropdown />
          </div>
        </div>
        
        <div className="mb-8">
          <div 
            className={cn(
              "flex items-center justify-between transition-all duration-700 delay-300",
              showAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-400" />
              Today's Matches
            </h2>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-muted/50 rounded-lg">
                <button 
                  className="p-2 hover:bg-muted/80 rounded-l-lg transition-colors duration-200"
                  onClick={() => changeDate(-1)}
                >
                  <ChevronLeft className="h-4 w-4 text-white" />
                </button>
                
                <div className="px-3 py-1 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-400" />
                  <span className="text-xs font-medium text-white">{formatDate(currentDate)}</span>
                </div>
                
                <button 
                  className="p-2 hover:bg-muted/80 rounded-r-lg transition-colors duration-200"
                  onClick={() => changeDate(1)}
                >
                  <ChevronRight className="h-4 w-4 text-white" />
                </button>
              </div>
              
              <div className="bg-muted/50 px-3 py-1.5 rounded-lg flex items-center gap-2">
                <Timer className="h-4 w-4 text-blue-400" />
                <span className="text-xs font-medium text-white">All Times in GMT</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {matches.map((match, index) => (
            <div 
              key={match.id}
              className={cn(
                "transition-all duration-700",
                showAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                `delay-[${(index + 3) * 100}ms]`
              )}
              style={{ 
                transitionDelay: showAnimation ? `${(index + 4) * 100}ms` : '0ms'
              }}
            >
              <MatchCard match={match} />
            </div>
          ))}
        </div>
      </main>
      
      <footer className="py-6 border-t border-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 overflow-hidden rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 p-0.5">
                <div className="h-full w-full rounded-sm bg-background flex items-center justify-center">
                  <Trophy className="h-3 w-3 text-blue-400" />
                </div>
              </div>
              <span className="text-sm font-medium text-white">Match<span className="text-blue-400">Predict</span></span>
            </div>
            
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} MatchPredict. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
