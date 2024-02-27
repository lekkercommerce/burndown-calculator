import { useMemo, useState } from "react";
import Editor from "./Editor";
import Result from "./Result";
import useStore from "../../../store/useStore";
import { SprintData } from "../../../types";
import BurnChart from "./BurnChart";
import { styleVariants } from "../../../constants";
import clsx from "clsx";

export default function CalculationPage() {
  const [formDirty, setFormDirty] = useState(false);
  const {
    store: {
      totalDays,
      remainingDays,
      completedPoints,
      totalPoints,
      completionTarget,
    },
  } = useStore();

  const sprintData = useMemo<SprintData | null>(() => {
    if (
      totalDays == null ||
      remainingDays == null ||
      completedPoints == null ||
      totalPoints == null ||
      completionTarget == null
    ) {
      return null;
    }
    // TODO: validate if given app state is valid for sprint data

    // calculate values
    const currentRate = completedPoints / (totalDays - remainingDays);
    const optimumRate = totalPoints / totalDays;
    const remainingPoints = totalPoints - completedPoints;
    const neededRate = remainingPoints / remainingDays;
    const projectedPoints = currentRate * remainingDays + completedPoints;
    const pointsTargetToday = remainingPoints - remainingDays * optimumRate;

    // define stat colors
    let currentRateColor = styleVariants.success;
    let targetRateColor = styleVariants.success;
    let neededRateColor = styleVariants.success;
    let line = "#82ca9d";
    const currentVsOptimum = currentRate / optimumRate;
    const targetVsOptimum = pointsTargetToday / optimumRate;
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
      remainingPoints,
      neededRate: remainingPoints / remainingDays,
      projectedPoints,
      carryOverPoints: totalPoints - projectedPoints,
      pointsTargetToday,
      totalDays,
      remainingDays,
      completedPoints,
      totalPoints,
      completionTarget,
      colors: {
        currentRate: currentRateColor,
        targetRate: targetRateColor,
        neededRate: neededRateColor,
        line,
      },
    };

    return calculation;
  }, [
    totalDays,
    remainingDays,
    completedPoints,
    totalPoints,
    completionTarget,
  ]);

  return (
    <div className="px-2 pt-2 pb-8">
      <div className="md:hidden mt-2.5 mb-4 font-bold text-center text-3xl">
        Burndown Calculator
      </div>
      <div className="flex flex-col md:flex-row">
        <Editor
          formDirty={formDirty}
          setFormDirty={setFormDirty}
          hasSprintData={!!sprintData}
        />
        <div className="md:*:pl-16">
          <div className="hidden md:block mt-2.5 font-bold text-center text-3xl">
            Burndown Calculator
          </div>
          {sprintData ? (
            <div
              className={clsx(
                `px-4 py-10 md:py-4`,
                formDirty ? "opacity-5" : ""
              )}
            >
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
      </div>
      <div
        className={clsx("md:mb-8 border-gray-500", formDirty && "opacity-5")}
      >
        {sprintData && (
          <BurnChart
            days={sprintData.totalDays}
            remainingDays={sprintData.remainingDays}
            pointsAtStart={sprintData.totalPoints}
            currentRate={sprintData.currentRate}
            optimumRate={sprintData.optimumRate}
            color={sprintData.colors.line}
          />
        )}
      </div>
      <div className="text-center">@something</div>
    </div>
  );
}
