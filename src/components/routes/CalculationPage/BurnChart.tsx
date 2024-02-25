import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatNumber } from "../../../utils";

export default function BurnChart({
  itemsAtStart,
  days,
  currentRate,
  optimumRate,
}: {
  itemsAtStart: number;
  days: number;
  currentRate: number;
  optimumRate: number;
}) {
  const lineChartData = Array.from({ length: days + 1 }).map((_, i) => {
    const currentValue = itemsAtStart - i * currentRate;
    const optimumValue = itemsAtStart - i * optimumRate;
    return {
      name: i,
      current: formatNumber(currentValue),
      optimum: formatNumber(optimumValue),
    };
  });
  return (
    <div className="border text-center border-gray-700 mb-4 w-full">
      <div className="w-full pt-6 pb-4 pr-6 h-80">
        <ResponsiveContainer width="100%">
          <LineChart
            data={lineChartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="current"
              stroke="#8884d8"
              strokeWidth={4}
            />
            <Line
              type="monotone"
              dataKey="optimum"
              stroke="#82ca9d"
              strokeWidth={4}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
