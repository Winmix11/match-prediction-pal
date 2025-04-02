
import React from 'react';
import { Trophy } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-6 border-t border-white/5 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 overflow-hidden rounded-md bg-gradient-to-br from-sports-blue to-sports-green p-0.5">
              <div className="h-full w-full rounded-sm bg-background flex items-center justify-center">
                <Trophy className="h-3 w-3 text-sports-blue" />
              </div>
            </div>
            <span className="text-sm font-medium text-white">Win<span className="text-sports-blue">Mix.hu</span></span>
          </div>
          
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} WinMix.hu. Minden jog fenntartva.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
