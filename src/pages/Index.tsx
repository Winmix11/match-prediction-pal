
import React, { useEffect, useState } from 'react';
import { useAppStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';
import UserStats from '@/components/UserStats';
import AuthModal from '@/components/AuthModal';
import Hero from '@/components/Hero';
import ActionBar from '@/components/ActionBar';
import MatchesHeader from '@/components/MatchesHeader';
import MatchesList from '@/components/MatchesList';
import Footer from '@/components/Footer';

const Index = () => {
  const matches = useAppStore((state) => state.matches);
  const userStats = useAppStore((state) => state.userStats);
  const [showAnimation, setShowAnimation] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const [filters, setFilters] = useState({
    leagues: [],
    dateRange: 'today',
    teamSearch: '',
  });
  
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    setIsLoading(true);
    // Simulate filter application
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };
  
  useEffect(() => {
    // Trigger animations after component mounts
    setShowAnimation(true);
    
    // Show welcome toast for new users
    if (userStats.totalPredictions === 0) {
      setTimeout(() => {
        toast({
          title: "Üdvözöljük a WinMix.hu oldalon!",
          description: "Készítsen tippeket és nyerjen pontokat!",
          duration: 5000,
        });
      }, 1500);
    }
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [toast, userStats.totalPredictions]);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('hu-HU', {
      weekday: isMobile ? 'short' : 'long',
      month: isMobile ? 'short' : 'long',
      day: 'numeric'
    });
  };
  
  const changeDate = (days: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
    
    // Simulate loading when changing date
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };
  
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sports-blue/15 via-sports-green/5 to-transparent z-0 pointer-events-none"></div>
      
      <Header />
      
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
      
      <main className="container mx-auto px-4 pt-28 md:pt-32 pb-16 relative z-10">
        <Hero 
          showAnimation={showAnimation} 
          onAuthModalOpen={() => setAuthModalOpen(true)}
        />
        
        <div 
          className={cn(
            "mb-10 md:mb-12 transition-all duration-700 delay-200",
            showAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <UserStats />
        </div>

        <ActionBar showAnimation={showAnimation} />
        
        <MatchesHeader
          showAnimation={showAnimation}
          currentDate={currentDate}
          formatDate={formatDate}
          changeDate={changeDate}
        />
        
        <MatchesList
          matches={matches}
          isLoading={isLoading}
          showAnimation={showAnimation}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
