export type Scenario = {
  id: string;
};

export type AppState = {
  name: string | null;
  remainingDays: number | null;
  totalDays: number | null;
  totalPoints: number | null;
  completedPoints: number | null;
  completionTarget: number | null;
};

export type SprintData = {
  currentRate: number;
  optimumRate: number;
  remainingPoints: number;
  neededRate: number;
  projectedPoints: number;
  carryOverPoints: number;
  pointsTargetToday: number;
  completionTarget: number;
  remainingDays: number;
  totalDays: number;
  totalPoints: number;
  completedPoints: number;
  colors: {
    currentRate: string;
    targetRate: string;
    neededRate: string;
    line: string;
  };
};
