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

export type AppData = {
  statuses: Column[];
};

export type AppPage = "welcome" | "columns";

export type SetPage = (page: AppPage) => void;
