import useStore from "../../../store/useStore";
import BurnChart from "./BurnChart";
import { formatNumber } from "../../../utils";

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

  return (
    <div className="border p-4">
      <BurnChart
        days={totalDays}
        itemsAtStart={totalItems}
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
