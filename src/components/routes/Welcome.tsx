import useStore from "../../store/useStore";
import Button from "../Button";

export default function Welcome() {
  const { setStore } = useStore();
  return (
    <>
      <div className="text-2xl">Welcome</div>
      <div className="py-8">Explainer text</div>
      <Button
        onClick={() => setStore((store) => ({ ...store, view: "columns" }))}
      >
        Start
      </Button>
    </>
  );
}
