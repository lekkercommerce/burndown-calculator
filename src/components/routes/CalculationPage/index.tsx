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
    store: {
      totalDays,
      remainingDays,
      completedItems,
      totalItems,
      completionTarget,
    },
  } = useStore();

  const sprintData = useMemo<SprintData | null>(() => {
    if (
      totalDays == null ||
      remainingDays == null ||
      completedItems == null ||
      totalItems == null ||
      completionTarget == null
    ) {
      return null;
    }
    // calculate values
    const currentRate = completedItems / (totalDays - remainingDays);
    const optimumRate = totalItems / totalDays;
    const remainingItems = totalItems - completedItems;
    const neededRate = remainingItems / remainingDays;
    const projectedItems = currentRate * remainingDays + completedItems;
    const itemsTargetToday = remainingItems - remainingDays * optimumRate;

    // Set colors
    let currentRateColor = styleVariants.success;
    let targetRateColor = styleVariants.success;
    let neededRateColor = styleVariants.success;
    let line = "#82ca9d";
    const currentVsOptimum = currentRate / optimumRate;
    const targetVsOptimum = itemsTargetToday / optimumRate;
    const optimumVsNeeded = optimumRate / neededRate;
    const targetPercentage = completionTarget / 100;

    // set stat colors
    if (currentVsOptimum < targetPercentage) {
      currentRateColor = styleVariants.error;
      line = "#ff5252";
    }
    if (1 > currentVsOptimum && currentVsOptimum >= targetPercentage) {
      currentRateColor = styleVariants.warning;
      line = "#FDdc47";
    }
    if (targetVsOptimum > 1.2) {
      targetRateColor = styleVariants.error;
    }
    if (1 < targetVsOptimum && targetVsOptimum <= 1.2) {
      targetRateColor = styleVariants.warning;
    }
    if (optimumVsNeeded < targetPercentage) {
      neededRateColor = styleVariants.error;
    }
    if (1 > optimumVsNeeded && optimumVsNeeded >= targetPercentage) {
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
      totalDays,
      remainingDays,
      completedItems,
      totalItems,
      completionTarget,
      colors: {
        currentRate: currentRateColor,
        targetRate: targetRateColor,
        neededRate: neededRateColor,
        line,
      },
    };

    return calculation;
  }, [totalDays, remainingDays, completedItems, totalItems, completionTarget]);

  return (
    <div className="p-6">
      <div className="mb-4 font-bold text-center text-3xl">
        Burndown Calculator
      </div>
      <div className="flex flex-col md:flex-row">
        <Editor
          formDirty={formDirty}
          setFormDirty={setFormDirty}
          hasSprintData={!!sprintData}
        />
        {sprintData ? (
          <div className={formDirty ? "opacity-5" : ""}>
            <Result data={sprintData} />
          </div>
        ) : (
          <div className="flex justify-center items-center w-full p-8">
            <div>
              <p>Some text about results here</p>
              <p>Some other text</p>
            </div>
          </div>
        )}
      </div>
      <div className={`md:mb-80 pt-4 md:pt-0 ${formDirty ? "opacity-5" : ""}`}>
        {sprintData && !formDirty && (
          <BurnChart
            days={sprintData.totalDays}
            remainingDays={sprintData.remainingDays}
            itemsAtStart={sprintData.totalItems}
            currentRate={sprintData.currentRate}
            optimumRate={sprintData.optimumRate}
            color={sprintData.colors.line}
          />
        )}
      </div>
      <div className=" text-center">@something</div>
    </div>
  );
}
