
import { create } from 'zustand';
import { Match, Prediction, Team, UserStats, MatchAnalysis } from './types';
import { persist } from 'zustand/middleware';

interface AppState {
  // User Stats
  userStats: UserStats;
  updateUserStats: (stats: Partial<UserStats>) => void;
  incrementPoints: (points: number) => void;
  updateCorrectPrediction: (correct: boolean) => void;
  
  // Predictions
  predictions: Prediction[];
  addPrediction: (prediction: Prediction) => void;
  removePrediction: (matchId: number) => void;
  updatePredictionResult: (matchId: number, result: 'home' | 'draw' | 'away') => void;
  
  // Matches
  matches: Match[];
  setMatches: (matches: Match[]) => void;
  updateMatch: (matchId: number, match: Partial<Match>) => void;
  finalizeMatchResult: (matchId: number, homeScore: number, awayScore: number) => void;
  
  // Teams
  allTeams: Team[];
  setAllTeams: (teams: Team[]) => void;

  // Match Analysis
  matchAnalyses: Record<string, MatchAnalysis>;
  setMatchAnalysis: (homeTeamId: string, awayTeamId: string, analysis: MatchAnalysis) => void;
  getMatchAnalysis: (homeTeamId: string, awayTeamId: string) => MatchAnalysis | null;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial User Stats
      userStats: {
        totalPredictions: 0,
        correctPredictions: 0,
        winRate: 0,
        points: 0,
        streak: 0,
      },
      updateUserStats: (stats) => set((state) => ({
        userStats: { ...state.userStats, ...stats }
      })),
      incrementPoints: (points) => set((state) => {
        const newPoints = state.userStats.points + points;
        return {
          userStats: { ...state.userStats, points: newPoints }
        };
      }),
      updateCorrectPrediction: (correct) => set((state) => {
        const totalPredictions = state.userStats.totalPredictions + 1;
        const correctPredictions = correct 
          ? state.userStats.correctPredictions + 1 
          : state.userStats.correctPredictions;
        const streak = correct 
          ? state.userStats.streak + 1 
          : 0; // Reset streak on wrong prediction
        const winRate = totalPredictions > 0 
          ? Math.round((correctPredictions / totalPredictions) * 100) 
          : 0;
        
        return {
          userStats: {
            ...state.userStats,
            totalPredictions,
            correctPredictions,
            winRate,
            streak
          }
        };
      }),
      
      // Predictions
      predictions: [],
      addPrediction: (prediction) => set((state) => {
        // Check if prediction for this match already exists
        const existingIndex = state.predictions.findIndex(p => p.matchId === prediction.matchId);
        let newPredictions = [...state.predictions];
        
        if (existingIndex !== -1) {
          // Update existing prediction
          newPredictions[existingIndex] = {
            ...prediction,
            createdAt: new Date()
          };
        } else {
          // Add new prediction
          newPredictions.push({
            ...prediction,
            createdAt: new Date()
          });
          
          // Increment total predictions counter
          set((state) => ({
            userStats: {
              ...state.userStats,
              totalPredictions: state.userStats.totalPredictions + 1
            }
          }));
        }
        
        return { predictions: newPredictions };
      }),
      removePrediction: (matchId) => set((state) => ({
        predictions: state.predictions.filter(p => p.matchId !== matchId)
      })),
      updatePredictionResult: (matchId, result) => set((state) => {
        const prediction = state.predictions.find(p => p.matchId === matchId);
        
        if (!prediction) return state;
        
        const correct = prediction.prediction === result;
        
        // Add points if prediction was correct
        if (correct) {
          let pointsToAdd = 0;
          
          // Different points based on prediction type
          switch (result) {
            case 'home':
              pointsToAdd = 3; // Common result
              break;
            case 'draw':
              pointsToAdd = 5; // Less common result
              break;
            case 'away':
              pointsToAdd = 4; // Medium probability
              break;
          }
          
          // Call the increment points function
          get().incrementPoints(pointsToAdd);
          
          // Update correct prediction stats
          get().updateCorrectPrediction(true);
        } else {
          // Update incorrect prediction stats
          get().updateCorrectPrediction(false);
        }
        
        return state;
      }),
      
      // Matches
      matches: [
        {
          id: 1,
          time: "19:00",
          timeGMT: "19:00 GMT",
          startsIn: "14h 22m",
          homeTeam: {
            id: "arsenal",
            name: "London Ágyúk",
            logo: "https://resources.premierleague.com/premierleague/badges/50/t3.png",
            rank: 1,
            form: ["W", "W", "D", "W", "W"],
          },
          awayTeam: {
            id: "chelsea",
            name: "Chelsea",
            logo: "https://resources.premierleague.com/premierleague/badges/50/t8.png",
            rank: 4,
            form: ["W", "D", "W", "W", "L"],
          },
        },
        {
          id: 2,
          time: "16:30",
          timeGMT: "16:30 GMT",
          startsIn: "11h 52m",
          homeTeam: {
            id: "liverpool",
            name: "Liverpool",
            logo: "https://resources.premierleague.com/premierleague/badges/50/t14.png",
            rank: 3,
            form: ["D", "W", "W", "W", "W"],
          },
          awayTeam: {
            id: "mancity",
            name: "Manchester Kék",
            logo: "https://resources.premierleague.com/premierleague/badges/50/t43.png",
            rank: 2,
            form: ["W", "W", "D", "W", "W"],
          },
        },
        {
          id: 3,
          time: "21:00",
          timeGMT: "21:00 GMT",
          startsIn: "16h 22m",
          selectableTeams: true,
        },
      ],
      setMatches: (matches) => set({ matches }),
      updateMatch: (matchId, match) => set((state) => ({
        matches: state.matches.map(m => 
          m.id === matchId ? { ...m, ...match } : m
        )
      })),
      finalizeMatchResult: (matchId, homeScore, awayScore) => set((state) => {
        // First update the match with the score
        const updatedMatches = state.matches.map(m => {
          if (m.id === matchId) {
            return {
              ...m,
              score: {
                home: homeScore,
                away: awayScore
              },
              isFinished: true
            };
          }
          return m;
        });
        
        // Determine the match result
        let result: 'home' | 'draw' | 'away';
        if (homeScore > awayScore) {
          result = 'home';
        } else if (homeScore < awayScore) {
          result = 'away';
        } else {
          result = 'draw';
        }
        
        // Check if there's a prediction for this match and update stats
        const prediction = state.predictions.find(p => p.matchId === matchId);
        if (prediction) {
          setTimeout(() => {
            get().updatePredictionResult(matchId, result);
          }, 0);
        }
        
        return { matches: updatedMatches };
      }),
      
      // Teams
      allTeams: [
        {
          id: "arsenal",
          name: "London Ágyúk",
          logo: "https://resources.premierleague.com/premierleague/badges/50/t3.png",
          rank: 1,
          form: ["W", "W", "D", "W", "W"],
        },
        {
          id: "chelsea",
          name: "Chelsea",
          logo: "https://resources.premierleague.com/premierleague/badges/50/t8.png",
          rank: 4,
          form: ["W", "D", "W", "W", "L"],
        },
        {
          id: "liverpool",
          name: "Liverpool",
          logo: "https://resources.premierleague.com/premierleague/badges/50/t14.png",
          rank: 3,
          form: ["D", "W", "W", "W", "W"],
        },
        {
          id: "mancity",
          name: "Manchester Kék",
          logo: "https://resources.premierleague.com/premierleague/badges/50/t43.png",
          rank: 2,
          form: ["W", "W", "D", "W", "W"],
        },
        {
          id: "manutd",
          name: "Manchester United",
          logo: "https://resources.premierleague.com/premierleague/badges/50/t1.png",
          rank: 5,
          form: ["L", "W", "W", "D", "W"],
        },
        {
          id: "tottenham",
          name: "Tottenham",
          logo: "https://resources.premierleague.com/premierleague/badges/50/t6.png",
          rank: 6,
          form: ["W", "L", "W", "W", "D"],
        },
      ],
      setAllTeams: (teams) => set({ allTeams: teams }),

      // Match Analysis
      matchAnalyses: {},
      setMatchAnalysis: (homeTeamId, awayTeamId, analysis) => set((state) => ({
        matchAnalyses: {
          ...state.matchAnalyses,
          [`${homeTeamId}-${awayTeamId}`]: analysis
        }
      })),
      getMatchAnalysis: (homeTeamId, awayTeamId) => {
        const state = get();
        return state.matchAnalyses[`${homeTeamId}-${awayTeamId}`] || null;
      }
    }),
    {
      name: 'match-prediction-storage',
    }
  )
);
