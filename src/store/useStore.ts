import { useSearchParams } from "react-router-dom";
import { AppState } from "../types";
import { parseView, parseColumns } from "./parser";

export default function useStore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const store: AppState = {
    view: parseView(searchParams.get("view")),
    columns: parseColumns(searchParams.get("columns")),
    scenarios: null,
  };

  function setStore(modifier: (state: AppState) => AppState) {
    const updatedState = modifier(store);
    const updatedSearchParams = new URLSearchParams();
    if (updatedState.view) {
      updatedSearchParams.set("view", updatedState.view);
    }
    if (updatedState.columns) {
      updatedSearchParams.set("columns", JSON.stringify(updatedState.columns));
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
