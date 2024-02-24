import { useSearchParams } from "react-router-dom";
import { AppState } from "../types";
import { parseNumber, parseScenarios } from "../parser";

const QUERY_PARAMS = {
  name: "name",
  remainingDays: "rDays",
  totalDays: "tDays",
  scenarios: "scenarios",
};

export default function useStore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const store: AppState = {
    name: searchParams.get(QUERY_PARAMS.name),
    totalDays: parseNumber(searchParams.get(QUERY_PARAMS.totalDays)),
    remainingDays: parseNumber(searchParams.get(QUERY_PARAMS.remainingDays)),
    scenarios: parseScenarios(searchParams.get(QUERY_PARAMS.scenarios)),
  };

  function setStore(modifier: (state: AppState) => AppState) {
    const updatedState = modifier(store);
    const updatedSearchParams = new URLSearchParams();
    if (updatedState.name) {
      updatedSearchParams.set(QUERY_PARAMS.name, updatedState.name);
    }
    if (updatedState.remainingDays) {
      updatedSearchParams.set(
        QUERY_PARAMS.remainingDays,
        updatedState.remainingDays.toString()
      );
    }
    if (updatedState.totalDays) {
      updatedSearchParams.set(
        QUERY_PARAMS.totalDays,
        updatedState.totalDays.toString()
      );
    }
    if (updatedState.scenarios) {
      updatedSearchParams.set(
        QUERY_PARAMS.scenarios,
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
