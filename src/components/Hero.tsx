
import React from 'react';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeroProps {
  showAnimation: boolean;
  onAuthModalOpen: () => void;
}

const Hero = ({ showAnimation, onAuthModalOpen }: HeroProps) => {
  return (
    <div className="mb-12 md:mb-16">
      <h1 
        className={cn(
          "text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-3 transition-all duration-700",
          showAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        Tippelj Labdarúgó <span className="text-sports-blue">Mérkőzésekre</span>
      </h1>
      <p 
        className={cn(
          "text-base sm:text-lg text-gray-400 text-center max-w-2xl mx-auto transition-all duration-700 delay-100",
          showAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        Teszteld futballtudásodat, tippelj mérkőzésekre, és versenyezz a legjobb helyezésért.
      </p>
      
      <div 
        className={cn(
          "flex justify-center mt-6 transition-all duration-700 delay-150",
          showAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        <Button 
          className="bg-sports-blue hover:bg-sports-blue-dark text-white font-medium"
          onClick={onAuthModalOpen}
        >
          <User className="mr-2 h-4 w-4" />
          Bejelentkezés / Regisztráció
        </Button>
      </div>
    </div>
  );
};

export default Hero;
