import useStore from "../../../store/useStore";
import Editor from "./Editor";
import Result from "./Result";

export default function CalculationPage() {
  const { store } = useStore();
  const dataValid = store.days && store.scenarios;
  console.log(store);

  return (
    <div className="p-8">
      <Editor />
      {dataValid && <Result />}
    </div>
  );
}
