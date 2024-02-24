import { useSearchParams } from "react-router-dom";
import { AppState } from "../types";
import { parseNumber, parseScenarios } from "../parser";

export default function useStore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const store: AppState = {
    name: searchParams.get("name"),
    days: parseNumber(searchParams.get("days")),
    scenarios: parseScenarios(searchParams.get("scenarios")),
  };

  function setStore(modifier: (state: AppState) => AppState) {
    const updatedState = modifier(store);
    const updatedSearchParams = new URLSearchParams();
    if (updatedState.name) {
      updatedSearchParams.set("name", updatedState.name);
    }
    if (updatedState.days) {
      updatedSearchParams.set("days", updatedState.days.toString());
    }
    if (updatedState.scenarios) {
      updatedSearchParams.set(
        "scenarios",
        JSON.stringify(updatedState.scenarios)
      );
    }
    setSearchParams(updatedSearchParams);
  }

  return {
    store,
    setStore,
  };
}
