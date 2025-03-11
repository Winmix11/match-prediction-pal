
export type TeamFormItem = "W" | "D" | "L" | "G" | "Y" | "V";

export type Team = {
  id: string;
  name: string;
  logo: string;
  rank?: number;
  form?: TeamFormItem[];
};

export type Match = {
  id: number;
  time: string;
  timeGMT: string;
  startsIn: string;
  homeTeam?: Team;
  awayTeam?: Team;
  selectableTeams?: boolean;
};

export type Prediction = {
  matchId: number;
  homeTeam: Team;
  awayTeam: Team;
  prediction: "home" | "draw" | "away";
  createdAt?: Date;
};

export type UserStats = {
  totalPredictions: number;
  correctPredictions: number;
  winRate: number;
  points: number;
  streak: number;
};
