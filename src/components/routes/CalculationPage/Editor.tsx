import { useState } from "react";
import Button from "../../Button";
import { generateRandomString } from "../../../utils";
import useStore from "../../../store/useStore";
import { parseNumber } from "../../../parser";
import { Scenario } from "../../../types";

type FormScenario = {
  id: string;
  total: string;
  completed: string;
};

export default function Editor() {
  const { store, setStore } = useStore();
  const [scenarios, setScenarios] = useState<FormScenario[]>(
    store.scenarios?.map(parseFormScenarios) || [
      { id: generateRandomString(), total: "", completed: "" },
    ]
  );
  const [name, setName] = useState(store.name || "New ");
  const [totalDays, setTotalDays] = useState<string>(
    store.totalDays?.toString() || ""
  );
  const [remainingDays, setRemainingDays] = useState<string>(
    store.remainingDays?.toString() || ""
  );

  function parseFormScenarios(sc: Scenario): FormScenario {
    return {
      id: sc.id,
      completed: sc.completed?.toString() || "",
      total: sc.total?.toString() || "",
    };
  }

  function addScenario() {
    setScenarios([
      ...scenarios,
      { id: generateRandomString(), total: "0", completed: "0" },
    ]);
  }
  function updateScenario(updatedScenario: FormScenario) {
    setScenarios([
      ...scenarios.filter((c) => c.id !== updatedScenario.id),
      updatedScenario,
    ]);
  }
  function onSave() {
    // TODO: validate with react hook form
    setStore(() => ({
      view: "result",
      name,
      remainingDays: parseNumber(remainingDays),
      totalDays: parseNumber(totalDays),
      scenarios: scenarios.map((sc) => ({
        id: sc.id,
        completed: parseNumber(sc.completed),
        total: parseNumber(sc.total),
      })),
    }));
  }

  return (
    <div className="p-8">
      <div className=" mx-4 mb-4">
        <a href="/calc" className="mr-4">
          <Button>RESET</Button>
        </a>
        <input
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
          className="border p-1 text-2xl"
        />
      </div>
      <div className="text-lg flex items-center space-x-4">
        <label>Days left in sprint</label>
        <input
          value={remainingDays}
          onChange={(e) => setRemainingDays(trimNumber(e.target.value))}
          className="border p-1"
        />
      </div>
      <div className="text-lg flex items-center space-x-4">
        <label>Total days</label>
        <input
          value={totalDays}
          onChange={(e) => setTotalDays(trimNumber(e.target.value))}
          className="border p-1"
        />
      </div>
      <div className="border">
        <div className="text-xl">Scenarios</div>
        <table className="">
          <thead>
            <tr>
              <th>Completed</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {scenarios.map((scenario) => (
              <ScenarioRow
                key={scenario.id}
                scenario={scenario}
                updateScenario={updateScenario}
              />
            ))}
          </tbody>
        </table>
        <div className="my-4 ml-8">
          <Button onClick={addScenario}>add scenario</Button>
        </div>
      </div>
      <Button onClick={onSave}>Save</Button>
    </div>
  );
}

function ScenarioRow({
  scenario,
  updateScenario,
}: {
  scenario: FormScenario;
  updateScenario: (updatedScenario: FormScenario) => void;
}) {
  return (
    <tr key={scenario.id}>
      <td>
        <input
          className="border text-right px-2"
          type="text"
          value={scenario.completed === null ? "" : scenario.completed}
          onChange={(e) =>
            updateScenario({
              ...scenario,
              completed: trimNumber(e.target.value),
            })
          }
        />
      </td>
      <td>
        <input
          className="border text-right px-2"
          value={scenario.total === null ? "" : scenario.total}
          onChange={(e) =>
            updateScenario({
              ...scenario,
              total: trimNumber(e.target.value),
            })
          }
        />
      </td>
    </tr>
  );
}

function trimNumber(value: string) {
  return value;
  // TODO: text
}
