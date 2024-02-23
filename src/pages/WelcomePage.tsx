import Button from "../components/Button";
import { SetPage } from "../types";

export default function WelcomePage({ setPage }: { setPage: SetPage }) {
  return (
    <div className="p-8">
      <div className="text-2xl">Welcome</div>
      <div className="py-8">Explainer text</div>
      <Button onClick={() => setPage("columns")}>Start</Button>
    </div>
  );
}
