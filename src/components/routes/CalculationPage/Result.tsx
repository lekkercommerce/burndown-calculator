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
  // graph and stats colors
  const colors = useMemo(() => {
    const variant = {
      error: "bg-error",
      warning: "bg-warning",
      success: "bg-success",
    };
    let currentRateColor: HTMLProps<HTMLElement>["className"] = variant.success;
    let targetRateColor: HTMLProps<HTMLElement>["className"] = variant.success;
    let neededRateColor: HTMLProps<HTMLElement>["className"] = variant.success;
    let line = "#82ca9d";
    const currentVsOptimum = currentRate / optimumRate;
    const optimumVsTarget = optimumRate / itemsTargetToday;
    const optimumVsNeeded = optimumRate / neededRate;

    if (currentVsOptimum < 0.75) {
      currentRateColor = variant.error;
      line = "#ff5252";
    }
    if (1 > currentVsOptimum && currentVsOptimum >= 0.75) {
      currentRateColor = variant.warning;
      line = "#FDdc47";
    }

    if (optimumVsTarget < 0.75) {
      targetRateColor = variant.error;
    }
    if (1 > optimumVsTarget && optimumVsTarget >= 0.75) {
      targetRateColor = variant.warning;
    }

    if (optimumVsNeeded < 0.75) {
      neededRateColor = variant.error;
    }
    if (1 > optimumVsNeeded && optimumVsNeeded >= 0.75) {
      neededRateColor = variant.warning;
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
      <table className="">
        <tbody>
          <tr>
            <td>
              <div className="stats-card bg-blue-500">
                {formatNumber(optimumRate)}
              </div>
            </td>
            <td>per day is the optimum velocity</td>
          </tr>
          <tr>
            <td>
              <div className={`stats-card ${colors.currentRate}`}>
                {formatNumber(currentRate)}
              </div>
            </td>
            <td>per day is the current rate</td>
          </tr>

          <tr>
            <td>
              <div className={`stats-card ${colors.neededRate}`}>
                {formatNumber(neededRate)}
              </div>
            </td>
            <td>per day is the rate you need to finish</td>
          </tr>
          <tr className="border-y-4">
            <td>
              <div className={`stats-card ${colors.targetRate} my-1.5`}>
                {itemsTargetToday}
              </div>
            </td>
            <td>items today will get you to the optimum velocity</td>
          </tr>
          <tr>
            <td>
              <div className={`stats-card ${colors.currentRate}`}>
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
              <div className={`stats-card ${colors.currentRate}`}>
                {carryOverItems < 0
                  ? formatNumber(-carryOverItems)
                  : formatNumber(carryOverItems)}
              </div>
            </td>
            <td>
              {carryOverItems < 0
                ? "items can be pulled into the sprint at the current rate"
                : "items will be incomplete at the end of the sprint"}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="mt-4 flex space-x-4">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-success rounded mr-1"></div>
          <div>Good</div>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-warning rounded mr-1.5"></div>
          <div>Okay</div>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-error rounded mr-2"></div>
          <div>Bad</div>
        </div>
      </div>
    </div>
  );
}
