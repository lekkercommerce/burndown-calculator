import { CalculationView, Column } from "../types";

export function parseView(data: string | null): CalculationView | null {
  if (!data) {
    return null;
  }
  if (!["columns", "scenarios"].includes(data)) {
    throw new Error("Invalid data: view");
  }
  return data as CalculationView;
}

export function parseColumns(data: string | null): Column[] | null {
  if (!data) {
    return null;
  }
  let items = JSON.parse(data);
  if (!Array.isArray(items)) {
    throw new Error("Invalid data: columns");
  }

  return items.map((item) => {
    // validate
    return {
      id: item.id,
      name: item.name,
      type: item.type,
    };
  });
}
