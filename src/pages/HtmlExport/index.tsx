
import React, { useEffect, useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import HtmlPreview from './components/HtmlPreview';
import ExportOptions from './components/ExportOptions';
import { generateHtmlContent } from './utils/htmlGenerator';

const HtmlExport = () => {
  const { toast } = useToast();
  const matches = useAppStore((state) => state.matches);
  const allTeams = useAppStore((state) => state.allTeams);
  const userStats = useAppStore((state) => state.userStats);
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Generate HTML content
    const content = generateHtmlContent(matches, allTeams, userStats);
    setHtmlContent(content);
  }, [matches, allTeams, userStats]);

  const downloadHtml = () => {
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'winmix.hu.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "HTML Exportálva!",
      description: "A professzionális HTML fájl letöltése elkezdődött.",
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(htmlContent)
      .then(() => {
        setCopied(true);
        toast({
          title: "Másolás sikeres!",
          description: "A HTML kód a vágólapra másolva.",
        });
        
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        toast({
          title: "Hiba történt!",
          description: "Nem sikerült másolni a vágólapra.",
          variant: "destructive",
        });
      });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center gap-2">
          <Link to="/" className="flex items-center text-primary hover:text-primary/90 transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Vissza a főoldalra
          </Link>
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Professzionális HTML Export</h1>
          <p className="text-muted-foreground">
            Ezen az oldalon professzionális, önálló HTML verzióban exportálhatod a WinMix.hu oldalt.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <ExportOptions 
              onDownload={downloadHtml} 
              onCopy={copyToClipboard} 
              copied={copied} 
            />
          </div>
          
          <div className="lg:col-span-3">
            <HtmlPreview htmlContent={htmlContent} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HtmlExport;
