import { useMemo, useState } from "react";
import useStore from "../../../store/useStore";
import BurnChart from "./BurnChart";
import { formatNumber } from "../../../utils";

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

  const currentRate = selectedScenario.completed / (totalDays - remainingDays);
  const optimumRate = selectedScenario.total / totalDays;
  const remainingItems = selectedScenario.total - selectedScenario.completed;
  const neededRate = remainingItems / remainingDays;
  const projectedItems =
    currentRate * remainingDays + selectedScenario.completed;
  const carryOverItems = selectedScenario.total - projectedItems;
  const itemsTargetToday = remainingItems - (remainingDays - 1) * optimumRate;

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
      <BurnChart
        days={totalDays}
        itemsAtStart={selectedScenario.total}
        currentRate={currentRate}
        optimumRate={optimumRate}
      />
      <table>
        <tbody>
          <tr>
            <td>
              {/* TODO: show different color based on being ahead or behind */}
              <span className="text-xl">{formatNumber(currentRate)}</span>
            </td>
            <td>per day is the current rate</td>
          </tr>
          <tr>
            <td>
              <span className="text-xl">{formatNumber(optimumRate)}</span>
            </td>
            <td> per day is the optimum rate</td>
          </tr>
          <tr>
            <td>
              <span className="text-xl">{formatNumber(neededRate)}</span>
            </td>
            <td>per day is the rate you need to finish</td>
          </tr>
          <tr className="bg-slate-200">
            <td>
              {/* TODO: show different color based on how easy or hard */}
              <span className="text-xl">{itemsTargetToday}</span>
            </td>
            <td>is your target to get back on track</td>
          </tr>
          <tr className="bg-slate-200">
            <td>
              <span className="text-xl">{formatNumber(projectedItems)}</span>
            </td>
            <td>items is the projected end of the sprint</td>
          </tr>
          <tr className="bg-slate-200">
            <td>
              <span className="text-xl">{formatNumber(carryOverItems)}</span>
            </td>
            <td>items will be carried over at the current rate</td>
          </tr>
        </tbody>
      </table>
      <div className="mt-4">
        Rating of how far behind you are based on above 2 items
      </div>
    </div>
  );
}
