import { formatNumber } from "../../../utils";
import { SprintData } from "../../../types";
import { styleVariants } from "../../../constants";

export default function Result({ data }: { data: SprintData }) {
  const {
    currentRate,
    optimumRate,
    neededRate,
    projectedItems,
    carryOverItems,
    itemsTargetToday,
    colors,
  } = data;

  return (
    <div className="p-4">
      <div className="my-4 flex space-x-4">
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
      <table className="border-t-2">
        <tbody>
          <tr>
            <td>
              <div className="stats-card bg-blue-500">
                {formatNumber(optimumRate)}
              </div>
            </td>
            <td>per day is the optimum speed</td>
          </tr>
          {currentRate < optimumRate && (
            <tr>
              <td>
                <div className={`stats-card ${colors.targetRate} my-1.5`}>
                  {itemsTargetToday >= 0 ? formatNumber(itemsTargetToday) : 0}
                </div>
              </td>
              <td>items today will get you to the optimum speed</td>
            </tr>
          )}
          <tr className={currentRate !== optimumRate ? "border-t-2" : ""}>
            <td>
              <div className={`stats-card ${colors.currentRate}`}>
                {formatNumber(currentRate)}
              </div>
            </td>
            <td>per day is the current speed</td>
          </tr>
          {currentRate !== optimumRate && (
            <>
              <tr>
                <td>
                  <div className={`stats-card ${colors.neededRate}`}>
                    {formatNumber(neededRate)}
                  </div>
                </td>
                <td>per day is the speed you need to complete all the tasks</td>
              </tr>
              <tr className="border-t-2">
                <td>
                  <div className="stats-card bg-gray-500">
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
                  <div className="stats-card bg-gray-500">
                    {formatNumber(carryOverItems)}
                  </div>
                </td>
                <td>items will be left at the end of the sprint</td>
              </tr>
            </>
          )}
        </tbody>
      </table>
      {currentRate === optimumRate && (
        <div
          className={`rounded-md text-center text-white text-2xl py-6 ${styleVariants.success}`}
        >
          The team is on track for a perfect finish
        </div>
      )}
    </div>
  );
}
