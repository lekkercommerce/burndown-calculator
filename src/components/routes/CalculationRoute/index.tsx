import useStore from "../../../store/useStore";
import Welcome from "../Welcome";
import ColumnEditor from "./ColumnEditor";

export default function CalculationRoute() {
  const { store } = useStore();

  if (!store.view) {
    return <Welcome />;
  }

  return (
    <div className="p-8">
      <div>
        {store.view === "columns" && <ColumnEditor />}
        {store.view === "scenarios" && <ColumnEditor />}
      </div>
    </div>
  );
}
