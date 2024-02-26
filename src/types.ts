export type Scenario = {
  id: string;
};

export type AppState = {
  name: string | null;
  remainingDays: number | null;
  totalDays: number | null;
  totalItems: number | null;
  completedItems: number | null;
};

export type SprintData = {
  currentRate: number;
  optimumRate: number;
  remainingItems: number;
  neededRate: number;
  projectedItems: number;
  carryOverItems: number;
  itemsTargetToday: number;
  source: {
    remainingDays: number;
    totalDays: number;
    totalItems: number;
    completedItems: number;
  };
  colors: {
    currentRate: string;
    targetRate: string;
    neededRate: string;
    line: string;
  };
};
