export type Scenario = {
  id: string;
  total: number | null;
  completed: number | null;
};

export type AppState = {
  name: string | null;
  remainingDays: number | null;
  totalDays: number | null;
  scenarios: Scenario[] | null;
};
