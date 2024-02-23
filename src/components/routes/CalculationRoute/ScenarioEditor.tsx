import { useState } from "react";
import { Scenario } from "../../../types";
import Button from "../../Button";
import { generateRandomString } from "../../../utils";

export default function ScenarioEditor({
  scenarios: initialScenarios,
  setScenarios: saveScenarios,
}: {
  scenarios: Scenario[];
  setScenarios: (scenarios: Scenario[]) => void;
}) {
  const [scenarios, setScenarios] = useState<Scenario[]>(initialScenarios);

  function addScenario() {
    setScenarios([
      ...scenarios,
      { id: generateRandomString(), columnId: "", points: 0 },
    ]);
  }
  function updateScenario(updatedScenario: Scenario) {
    setScenarios([
      ...scenarios.filter((c) => c.id !== updatedScenario.id),
      updatedScenario,
    ]);
  }
  function onSave() {
    saveScenarios(scenarios);
  }
  return (
    <div className="p-8">
      <div>Scenarios</div>
      <div>
        {scenarios.map((scenario) => (
          <div key={scenario.id}>
            <input
              className="border"
              value={scenario.points}
              onChange={(e) =>
                updateScenario({
                  ...scenario,
                  points: e.target.value ? Number(e.target.value) : 0,
                })
              }
            />
          </div>
        ))}
        <Button onClick={addScenario}>add scenario</Button>
        <Button onClick={onSave}>Save</Button>
      </div>
    </div>
  );
}
