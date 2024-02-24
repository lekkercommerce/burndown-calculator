export type Scenario = {
  id: string;
  total: number | null;
  completed: number | null;
};

export type AppState = {
  name: string | null;
  days: number | null;
  scenarios: Scenario[] | null;
};
