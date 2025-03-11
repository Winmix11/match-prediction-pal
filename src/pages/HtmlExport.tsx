
import React, { useEffect, useState } from 'react';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Download, Copy, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const HtmlExport = () => {
  const { toast } = useToast();
  const matches = useAppStore((state) => state.matches);
  const allTeams = useAppStore((state) => state.allTeams);
  const [htmlContent, setHtmlContent] = useState<string>('');

  useEffect(() => {
    // Generate HTML content
    const content = generateHtmlContent(matches, allTeams);
    setHtmlContent(content);
  }, [matches, allTeams]);

  const generateHtmlContent = (matches: any[], teams: any[]) => {
    return `<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WinMix.hu - Meccs Előrejelzések</title>
    <style>
        /* Reset and base styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            line-height: 1.6;
            color: #f1f5f9;
            background-color: #0b0f19;
        }
        
        /* Container */
        .container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        /* Header */
        header {
            padding: 20px 0;
            background-color: rgba(15, 23, 42, 0.8);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            position: sticky;
            top: 0;
            z-index: 100;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 700;
            font-size: 1.25rem;
        }
        
        .logo-icon {
            background: linear-gradient(to bottom right, #3b82f6, #4f46e5);
            width: 32px;
            height: 32px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            padding: 6px;
        }
        
        .logo-text span {
            color: #3b82f6;
        }
        
        /* Main content */
        main {
            padding: 40px 0;
        }
        
        .hero {
            text-align: center;
            margin-bottom: 60px;
        }
        
        .hero h1 {
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 16px;
            background-image: linear-gradient(to right, #fff, #93c5fd);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .hero p {
            font-size: 1.125rem;
            color: #94a3b8;
            max-width: 600px;
            margin: 0 auto;
        }
        
        /* Stats card */
        .stats-card {
            background: rgba(30, 41, 59, 0.5);
            border-radius: 16px;
            padding: 24px;
            margin-bottom: 40px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
        }
        
        .stats-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        
        .stats-header h2 {
            font-size: 1.25rem;
            font-weight: 600;
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 24px;
        }
        
        .stat-item {
            text-align: center;
        }
        
        .stat-value {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 8px;
            color: #fff;
        }
        
        .stat-label {
            font-size: 0.875rem;
            color: #94a3b8;
            font-weight: 500;
        }
        
        /* Matches */
        .matches-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
        }
        
        .matches-title {
            font-size: 1.25rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .matches-title svg {
            color: #fbbf24;
        }
        
        .date-display {
            display: flex;
            align-items: center;
            padding: 8px 12px;
            background-color: rgba(51, 65, 85, 0.5);
            border-radius: 8px;
            font-size: 0.875rem;
        }
        
        /* Match cards */
        .matches-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 24px;
        }
        
        .match-card {
            background: rgba(30, 41, 59, 0.5);
            border-radius: 16px;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.05);
            transition: all 0.3s ease;
        }
        
        .match-card:hover {
            transform: translateY(-5px);
            border-color: rgba(255, 255, 255, 0.1);
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }
        
        .match-header {
            padding: 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .match-time {
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        
        .match-time-tag {
            background-color: rgba(59, 130, 246, 0.2);
            color: #60a5fa;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 0.75rem;
        }
        
        .match-content {
            padding: 24px 16px;
        }
        
        .teams-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
        }
        
        .team {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            width: 45%;
        }
        
        .team-logo {
            width: 64px;
            height: 64px;
            margin-bottom: 12px;
            object-fit: contain;
        }
        
        .team-name {
            font-weight: 600;
            font-size: 1rem;
        }
        
        .team-rank {
            color: #94a3b8;
            font-size: 0.875rem;
            margin-top: 4px;
        }
        
        .vs {
            font-weight: 700;
            color: #94a3b8;
            font-size: 1.25rem;
        }
        
        .match-actions {
            display: flex;
            justify-content: space-between;
            gap: 12px;
        }
        
        .match-button {
            flex: 1;
            padding: 10px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 0.875rem;
            text-align: center;
            cursor: pointer;
            transition: all 0.2s ease;
            border: none;
            outline: none;
        }
        
        .home-button {
            background-color: rgba(59, 130, 246, 0.2);
            color: #60a5fa;
        }
        
        .home-button:hover {
            background-color: rgba(59, 130, 246, 0.3);
        }
        
        .draw-button {
            background-color: rgba(148, 163, 184, 0.2);
            color: #cbd5e1;
        }
        
        .draw-button:hover {
            background-color: rgba(148, 163, 184, 0.3);
        }
        
        .away-button {
            background-color: rgba(99, 102, 241, 0.2);
            color: #818cf8;
        }
        
        .away-button:hover {
            background-color: rgba(99, 102, 241, 0.3);
        }
        
        /* Footer */
        footer {
            padding: 24px 0;
            border-top: 1px solid rgba(255, 255, 255, 0.05);
            background-color: rgba(15, 23, 42, 0.8);
        }
        
        .footer-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .footer-logo {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .footer-logo-icon {
            background: linear-gradient(to bottom right, #3b82f6, #4f46e5);
            width: 24px;
            height: 24px;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            padding: 4px;
        }
        
        .copyright {
            font-size: 0.75rem;
            color: #64748b;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .stats-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .matches-grid {
                grid-template-columns: 1fr;
            }
            
            .matches-header {
                flex-direction: column;
                align-items: flex-start;
                gap: 16px;
            }
            
            .hero h1 {
                font-size: 2rem;
            }
        }
    </style>
</head>
<body>
    <header>
        <div class="container header-content">
            <div class="logo">
                <div class="logo-icon">🏆</div>
                <div class="logo-text">Win<span>Mix.hu</span></div>
            </div>
        </div>
    </header>

    <main>
        <div class="container">
            <section class="hero">
                <h1>Predict Football <span>Matches</span></h1>
                <p>Test your football knowledge, make predictions, and compete for the top spot.</p>
            </section>

            <section class="stats-card">
                <div class="stats-header">
                    <h2>Your Statistics</h2>
                </div>
                <div class="stats-grid">
                    <div class="stat-item">
                        <div class="stat-value">0</div>
                        <div class="stat-label">Predictions Made</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">0%</div>
                        <div class="stat-label">Win Rate</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">0</div>
                        <div class="stat-label">Total Points</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">0</div>
                        <div class="stat-label">Current Streak</div>
                    </div>
                </div>
            </section>

            <section>
                <div class="matches-header">
                    <h2 class="matches-title">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M15 6l4 4-4 4M9 18l-4-4 4-4"></path>
                        </svg>
                        Today's Matches
                    </h2>
                    <div class="date-display">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;">
                            <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                            <line x1="16" x2="16" y1="2" y2="6"></line>
                            <line x1="8" x2="8" y1="2" y2="6"></line>
                            <line x1="3" x2="21" y1="10" y2="10"></line>
                        </svg>
                        ${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </div>
                </div>

                <div class="matches-grid">
                    ${matches.map(match => `
                    <div class="match-card">
                        <div class="match-header">
                            <div class="match-time">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                                ${match.time}
                            </div>
                            <div class="match-time-tag">
                                ${match.startsIn}
                            </div>
                        </div>
                        <div class="match-content">
                            <div class="teams-container">
                                ${match.homeTeam ? `
                                <div class="team">
                                    <img src="${match.homeTeam.logo}" alt="${match.homeTeam.name}" class="team-logo">
                                    <div class="team-name">${match.homeTeam.name}</div>
                                    <div class="team-rank">Rank: ${match.homeTeam.rank}</div>
                                </div>
                                ` : ''}
                                <div class="vs">VS</div>
                                ${match.awayTeam ? `
                                <div class="team">
                                    <img src="${match.awayTeam.logo}" alt="${match.awayTeam.name}" class="team-logo">
                                    <div class="team-name">${match.awayTeam.name}</div>
                                    <div class="team-rank">Rank: ${match.awayTeam.rank}</div>
                                </div>
                                ` : ''}
                            </div>
                            <div class="match-actions">
                                <button class="match-button home-button">Home Win</button>
                                <button class="match-button draw-button">Draw</button>
                                <button class="match-button away-button">Away Win</button>
                            </div>
                        </div>
                    </div>
                    `).join('')}
                </div>
            </section>
        </div>
    </main>

    <footer>
        <div class="container footer-content">
            <div class="footer-logo">
                <div class="footer-logo-icon">🏆</div>
                <span>Win<span style="color: #3b82f6;">Mix.hu</span></span>
            </div>
            <div class="copyright">
                &copy; ${new Date().getFullYear()} WinMix.hu. All rights reserved.
            </div>
        </div>
    </footer>
</body>
</html>`;
  };

  const downloadHtml = () => {
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'winmix-export.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "HTML Exportálva!",
      description: "A statikus HTML fájl letöltése elkezdődött.",
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(htmlContent)
      .then(() => {
        toast({
          title: "Másolás sikeres!",
          description: "A HTML kód a vágólapra másolva.",
        });
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
          <h1 className="text-3xl font-bold text-white mb-2">HTML Export</h1>
          <p className="text-muted-foreground">
            Ezen az oldalon statikus HTML verzióban exportálhatja a WinMix.hu oldalt.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-card rounded-lg p-4 border border-border">
              <h3 className="text-lg font-medium mb-4">Exportálási lehetőségek</h3>
              
              <div className="space-y-3">
                <Button onClick={downloadHtml} className="w-full" variant="default">
                  <Download className="h-4 w-4 mr-2" />
                  HTML fájl letöltése
                </Button>
                
                <Button onClick={copyToClipboard} className="w-full" variant="outline">
                  <Copy className="h-4 w-4 mr-2" />
                  HTML másolása
                </Button>
              </div>
            </div>
            
            <div className="bg-card rounded-lg p-4 border border-border">
              <h3 className="text-lg font-medium mb-4">Hogyan használd</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>- Töltsd le a HTML fájlt a gombra kattintva</li>
                <li>- A fájl bármilyen webszerveren vagy tárhelyen elhelyezhető</li>
                <li>- Nincs szükség backend-re vagy adatbázisra</li>
                <li>- A jelenlegi adatok kerülnek exportálásra</li>
              </ul>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <div className="bg-card rounded-lg p-4 border border-border">
              <h3 className="text-lg font-medium mb-4">HTML Előnézet</h3>
              <div className="border border-border rounded-lg overflow-hidden h-[600px]">
                <iframe 
                  srcDoc={htmlContent}
                  title="HTML Preview" 
                  className="w-full h-full bg-white"
                  sandbox="allow-same-origin"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HtmlExport;
