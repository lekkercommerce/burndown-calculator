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
