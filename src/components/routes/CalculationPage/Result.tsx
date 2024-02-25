import useStore from "../../../store/useStore";
import BurnChart from "./BurnChart";
import { formatNumber } from "../../../utils";
import { HTMLProps, useMemo } from "react";

export default function Result() {
  const {
    store: { totalDays, remainingDays, completedItems, totalItems },
  } = useStore();

  if (!totalDays || !remainingDays || !completedItems || !totalItems) {
    return <div>Invalid data</div>;
  }
  const currentRate = completedItems / (totalDays - remainingDays);
  const optimumRate = totalItems / totalDays;
  const remainingItems = totalItems - completedItems;
  const neededRate = remainingItems / remainingDays;
  const projectedItems = currentRate * remainingDays + completedItems;
  const carryOverItems = totalItems - projectedItems;
  const itemsTargetToday = remainingItems - (remainingDays - 1) * optimumRate;
  const colors = useMemo(() => {
    let currentRateColor: HTMLProps<HTMLElement>["className"] = "bg-green-300";
    let targetRateColor: HTMLProps<HTMLElement>["className"] = "bg-green-300";
    let neededRateColor: HTMLProps<HTMLElement>["className"] = "bg-green-300";
    let line = "#82ca9d";
    const currentVsOptimum = currentRate / optimumRate;
    const optimumVsTarget = optimumRate / itemsTargetToday;
    const optimumVsNeeded = optimumRate / neededRate;
    console.log({ currentVsOptimum, optimumVsTarget, optimumVsNeeded });

    if (currentVsOptimum < 0.75) {
      currentRateColor = "bg-red-300";
      line = "#cd5252";
    }
    if (1 > currentVsOptimum && currentVsOptimum >= 0.75) {
      currentRateColor = "bg-yellow-300";
      line = "#FDdc47";
    }

    if (optimumVsTarget < 0.75) {
      targetRateColor = "bg-red-300";
    }
    if (1 > optimumVsTarget && optimumVsTarget >= 0.75) {
      targetRateColor = "bg-yellow-300";
    }

    if (optimumVsNeeded < 0.75) {
      neededRateColor = "bg-red-300";
    }
    if (1 > optimumVsNeeded && optimumVsNeeded >= 0.75) {
      neededRateColor = "bg-yellow-300";
    }

    return {
      currentRate: currentRateColor,
      targetRate: targetRateColor,
      neededRate: neededRateColor,
      line,
    };
  }, [currentRate, optimumRate]);

  return (
    <div className="border p-4">
      <BurnChart
        days={totalDays}
        remainingDays={remainingDays}
        itemsAtStart={totalItems}
        currentRate={currentRate}
        optimumRate={optimumRate}
        color={colors.line}
      />
      <table>
        <tbody>
          <tr>
            <td>
              <span className="text-xl">{formatNumber(optimumRate)}</span>
            </td>
            <td> per day is the optimum rate</td>
          </tr>
          <tr>
            <td>
              <div className={`text-xl ${colors.currentRate}`}>
                {formatNumber(currentRate)}
              </div>
            </td>
            <td>per day is the current rate</td>
          </tr>

          <tr>
            <td>
              <div className={`text-xl ${colors.neededRate}`}>
                {formatNumber(neededRate)}
              </div>
            </td>
            <td>per day is the rate you need to finish</td>
          </tr>
          <tr className="border-t-4">
            <td>
              <div className={`text-xl ${colors.targetRate}`}>
                {itemsTargetToday}
              </div>
            </td>
            <td>items today will get you to the optimum rate</td>
          </tr>
          <tr>
            <td>
              <div className={`text-xl ${colors.currentRate}`}>
                {formatNumber(projectedItems)}
              </div>
            </td>
            <td>
              is the predicted number of completed items at the end of the
              sprint
            </td>
          </tr>
          <tr>
            <td>
              <div className={`text-xl ${colors.currentRate}`}>
                {carryOverItems < 0
                  ? formatNumber(-carryOverItems)
                  : formatNumber(carryOverItems)}
              </div>
            </td>
            <td>
              {carryOverItems < 0
                ? "items can be pulled into the sprint at the current rate"
                : "items will be incomplete at the ned of the sprint"}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="mt-4">
        Rating of how far behind you are based on above 2 items
      </div>
    </div>
  );
}
