import { formatNumber } from "../../../utils";
import { SprintData } from "../../../types";
import { styleVariants } from "../../../constants";

export default function Result({ data }: { data: SprintData }) {
  const {
    currentRate,
    optimumRate,
    neededRate,
    projectedPoints,
    carryOverPoints,
    pointsTargetToday,
    colors,
  } = data;

  return (
    <>
      <div className="flex space-x-4 mb-2.5">
        <div className="flex items-center">
          <div
            className={`w-4 h-4 rounded mr-1 ${styleVariants.success}`}
          ></div>
          <div>Good</div>
        </div>
        <div className="flex items-center">
          <div
            className={`w-4 h-4 rounded mr-1.5 ${styleVariants.warning}`}
          ></div>
          <div>Not too bad</div>
        </div>
        <div className="flex items-center">
          <div className={`w-4 h-4 rounded mr-2 ${styleVariants.error}`}></div>
          <div>Not good</div>
        </div>
      </div>
      <div className="flex items-center border-b-4 pb-3">
        <div className={`stats-card stats-card-main ${colors.targetRate}`}>
          {formatNumber(pointsTargetToday)}
        </div>
        <div className="text-2xl">points today will get you on track</div>
      </div>
      <table className="stats-table">
        <tbody>
          <tr>
            <td>
              <div className="stats-card bg-blue-500">
                {formatNumber(optimumRate)}
              </div>
            </td>
            <td>per day is the optimum velocity</td>
          </tr>
          {currentRate !== optimumRate && (
            <>
              <tr>
                <td>
                  <div className={`stats-card ${colors.currentRate}`}>
                    {formatNumber(currentRate)}
                  </div>
                </td>
                <td>per day is the current velocity</td>
              </tr>
              <tr>
                <td>
                  <div className={`stats-card ${colors.neededRate}`}>
                    {formatNumber(neededRate)}
                  </div>
                </td>
                <td>
                  per day is the velocity you need to complete all the tasks
                </td>
              </tr>
              <tr className="border-t-4">
                <td>
                  <div className="stats-card bg-gray-700">
                    {formatNumber(projectedPoints)}
                  </div>
                </td>
                <td>
                  is the predicted number of completed points at the end of the
                  sprint
                </td>
              </tr>
              <tr>
                <td>
                  <div className="stats-card bg-gray-700">
                    {formatNumber(carryOverPoints)}
                  </div>
                </td>
                <td>points will be left at the end of the sprint</td>
              </tr>
            </>
          )}
        </tbody>
      </table>
      {currentRate === optimumRate && (
        <div
          className={`rounded-md text-center text-white text-2xl font-semibold py-6 px-10 mt-4 ${styleVariants.success}`}
        >
          On track for a perfect finish
        </div>
      )}
    </>
  );
}
