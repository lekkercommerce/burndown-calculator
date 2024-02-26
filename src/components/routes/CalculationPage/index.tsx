import { useState } from "react";
import Editor from "./Editor";
import Result from "./Result";

export default function CalculationPage() {
  const [formDirty, setFormDirty] = useState(false);

  return (
    <div className="p-8">
      <Editor formDirty={formDirty} setFormDirty={setFormDirty} />
      {!formDirty && <Result />}
    </div>
  );
}
