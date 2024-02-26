import { useMemo, useState } from "react";
import Editor from "./Editor";
import Result from "./Result";
import useStore from "../../../store/useStore";
import { SprintData } from "../../../types";
import BurnChart from "./BurnChart";
import { styleVariants } from "../../../constants";

export default function CalculationPage() {
  const [formDirty, setFormDirty] = useState(false);
  const {
    store: { totalDays, remainingDays, completedItems, totalItems },
  } = useStore();

  const sprintData = useMemo<SprintData | null>(() => {
    if (
      totalDays == null ||
      remainingDays == null ||
      completedItems == null ||
      totalItems == null
    ) {
      return null;
    }
    // calculate values
    const currentRate = completedItems / (totalDays - remainingDays);
    const optimumRate = totalItems / totalDays;
    const remainingItems = totalItems - completedItems;
    const neededRate = remainingItems / remainingDays;
    const projectedItems = currentRate * remainingDays + completedItems;
    const itemsTargetToday = remainingItems - (remainingDays - 1) * optimumRate;

    // Set colors
    let currentRateColor = styleVariants.success;
    let targetRateColor = styleVariants.success;
    let neededRateColor = styleVariants.success;
    let line = "#82ca9d";
    const currentVsOptimum = currentRate / optimumRate;
    const optimumVsTarget = optimumRate / itemsTargetToday;
    const optimumVsNeeded = optimumRate / neededRate;

    // set stat colors
    if (currentVsOptimum < 0.75) {
      currentRateColor = styleVariants.error;
      line = "#ff5252";
    }
    if (1 > currentVsOptimum && currentVsOptimum >= 0.75) {
      currentRateColor = styleVariants.warning;
      line = "#FDdc47";
    }
    if (optimumVsTarget < 1.2) {
      targetRateColor = styleVariants.error;
    }
    if (1 < optimumVsTarget && optimumVsTarget <= 1.2) {
      targetRateColor = styleVariants.warning;
    }
    if (optimumVsNeeded < 0.75) {
      neededRateColor = styleVariants.error;
    }
    if (1 > optimumVsNeeded && optimumVsNeeded >= 0.75) {
      neededRateColor = styleVariants.warning;
    }

    const calculation: SprintData = {
      currentRate,
      optimumRate,
      remainingItems,
      neededRate: remainingItems / remainingDays,
      projectedItems,
      carryOverItems: totalItems - projectedItems,
      itemsTargetToday,
      source: {
        totalDays,
        remainingDays,
        completedItems,
        totalItems,
      },
      colors: {
        currentRate: currentRateColor,
        targetRate: targetRateColor,
        neededRate: neededRateColor,
        line,
      },
    };

    return calculation;
  }, []);

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row mb-8">
        <Editor formDirty={formDirty} setFormDirty={setFormDirty} />
        {sprintData ? (
          <div className="">
            <Result data={sprintData} />
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <h2>Results here</h2>
          </div>
        )}
      </div>
      {sprintData && (
        <div className="mb-80">
          <BurnChart
            days={sprintData.source.totalDays}
            remainingDays={sprintData.source.remainingDays}
            itemsAtStart={sprintData.source.totalItems}
            currentRate={sprintData.currentRate}
            optimumRate={sprintData.optimumRate}
            color={sprintData.colors.line}
          />
        </div>
      )}
      <div className="">Burn down</div>
    </div>
  );
}
