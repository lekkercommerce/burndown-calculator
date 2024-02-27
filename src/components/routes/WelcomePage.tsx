import { Link } from "react-router-dom";
import Button from "../Button";

export default function WelcomePage() {
  return (
    <div className="p-8">
      <div className="text-2xl">Welcome</div>
      <div className="py-8">Explainer text</div>
      <Link to="/calc">
        <Button>Start</Button>
      </Link>
    </div>
  );
}
