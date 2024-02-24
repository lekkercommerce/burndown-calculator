import { useMemo, useState } from "react";
import useStore from "../../../store/useStore";

export default function Result() {
  const {
    store: { totalDays, remainingDays, scenarios },
  } = useStore();
  const [scenarioId, setScenarioId] = useState<string | undefined>();
  const selectedScenario = useMemo(
    () => scenarios?.find((sc) => sc.id === scenarioId) || scenarios?.[0],
    [scenarios]
  );

  if (!scenarios || !selectedScenario) {
    return null;
  }

  if (
    !totalDays ||
    !remainingDays ||
    !selectedScenario.completed ||
    !selectedScenario.total
  ) {
    return <div>Invalid data</div>;
  }

  const currentRate = (selectedScenario.completed / totalDays).toFixed(2);
  const expectedRate = Number((selectedScenario.total / totalDays).toFixed(2));
  const neededRate = (
    (selectedScenario.total - selectedScenario.completed) /
    totalDays
  ).toFixed(2);

  // calculate remaining items
  const remainingItems = selectedScenario.total - selectedScenario.completed;
  const itemsAtExpectedRate = remainingDays * expectedRate;
  const itemsTargetToday = (remainingItems - itemsAtExpectedRate).toFixed(2);

  return (
    <div className="border p-4">
      <div className="flex mb-4">
        <div className="mr-4">Scenario</div>
        <select
          value={scenarioId}
          onChange={(e) => setScenarioId(e.target.value)}
          className="border"
        >
          {scenarios.map((sc) => (
            <option key={sc.id} value={sc.id}>
              {sc.id}
            </option>
          ))}
        </select>
      </div>
      <div className="border p-16 text-center">Graph</div>
      <table>
        <tbody>
          <tr>
            <td>
              {/* TODO: show different color based on being ahead or behind */}
              <span className="text-xl">{currentRate}</span>
            </td>
            <td>per day is the current rate</td>
          </tr>
          <tr>
            <td>
              <span className="text-xl">{expectedRate}</span>
            </td>
            <td> per day is the expected rate</td>
          </tr>
          <tr>
            <td>
              <span className="text-xl">{neededRate}</span>
            </td>
            <td>per day is the rate you need to finish</td>
          </tr>
          <tr className="bg-slate-200 text-center">
            <td>
              {/* TODO: show different color based on how easy or hard */}
              <span className="text-xl">{itemsTargetToday}</span>
            </td>
            <td>is your target to get back on track</td>
          </tr>
        </tbody>
      </table>
      <div>Rating of how far behind you are based on above 2 items</div>
      <div className="mt-4">Add some delays to see how they may impact</div>
    </div>
  );
}
