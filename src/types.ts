export enum ColumnType {
  Todo = 0,
  InProgress = 1,
  Done = 2,
}

export type Column = {
  id: string;
  name: string;
  type: ColumnType;
};

export type Scenario = {
  id: string;
  points: number;
  columnId: string;
};

export type CalculationView = "columns" | "scenarios" | "result" | null;

export type AppState = {
  view: CalculationView;
  columns: Column[] | null;
  scenarios: Scenario[] | null;
};
