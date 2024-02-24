import { Scenario } from "./types";

export function parseNumber(data: string | null): number | null {
  if (!data || data === "") {
    return null;
  }

  const number = Number(data);
  if (isNaN(number)) {
    throw new Error("Invalid data: number");
  }
  return number;
}

export function parseScenarios(data: string | null): Scenario[] | null {
  if (!data) {
    return null;
  }
  let items = JSON.parse(data);
  if (!Array.isArray(items)) {
    throw new Error("Invalid data: scenarios");
  }

  return items.map((item) => {
    // validate
    const scenario: Scenario = {
      id: item.id,
      completed: parseNumber(item.completed) || 0,
      total: parseNumber(item.total) || 0,
    };
    return scenario;
  });
}
