import { useSearchParams } from "react-router-dom";
import { AppState } from "../types";
import { parseNumber } from "../parser";

const QUERY_PARAMS = {
  name: "name",
  remainingDays: "rDays",
  totalDays: "tDays",
  completedItems: "completed_items",
  totalItems: "total_items",
};

export default function useStore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const store: AppState = {
    name: searchParams.get(QUERY_PARAMS.name),
    remainingDays: parseNumber(searchParams.get(QUERY_PARAMS.remainingDays)),
    totalDays: parseNumber(searchParams.get(QUERY_PARAMS.totalDays)),
    completedItems: parseNumber(searchParams.get(QUERY_PARAMS.completedItems)),
    totalItems: parseNumber(searchParams.get(QUERY_PARAMS.totalItems)),
  };

  function setStore(modifier: (state: AppState) => AppState) {
    const updatedState = modifier(store);
    const updatedSearchParams = new URLSearchParams();
    if (updatedState.name) {
      updatedSearchParams.set(QUERY_PARAMS.name, updatedState.name);
    }
    if (updatedState.remainingDays !== null) {
      updatedSearchParams.set(
        QUERY_PARAMS.remainingDays,
        updatedState.remainingDays.toString()
      );
    }
    if (updatedState.totalDays !== null) {
      updatedSearchParams.set(
        QUERY_PARAMS.totalDays,
        updatedState.totalDays.toString()
      );
    }
    if (updatedState.completedItems !== null) {
      console.log({ comple: JSON.stringify(updatedState.completedItems) });

      updatedSearchParams.set(
        QUERY_PARAMS.completedItems,
        JSON.stringify(updatedState.completedItems)
      );
    }
    if (updatedState.totalItems !== null) {
      updatedSearchParams.set(
        QUERY_PARAMS.totalItems,
        JSON.stringify(updatedState.totalItems)
      );
    }
    setSearchParams(updatedSearchParams);
  }

  return {
    store,
    setStore,
  };
}
