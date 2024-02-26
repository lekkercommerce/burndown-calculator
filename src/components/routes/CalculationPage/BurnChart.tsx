import {
  Bar,
  BarChart,
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
  remainingDays,
  currentRate,
  optimumRate,
  color,
}: {
  itemsAtStart: number;
  days: number;
  remainingDays: number;
  currentRate: number;
  optimumRate: number;
  color: string;
}) {
  const optimumValueColor = "#808080";
  const lineChartData = Array.from({ length: days + 1 }).map((_, i) => {
    const currentValue = itemsAtStart - i * currentRate;
    const optimumValue = itemsAtStart - i * optimumRate;
    return {
      name: i === days - Math.floor(remainingDays) - 1 ? `${i}(today)` : i,
      current: formatNumber(currentValue),
      optimum: formatNumber(optimumValue),
    };
  });
  const barChartData = [
    {
      name: "Velocity",
      current: currentRate,
      optimum: optimumRate,
    },
  ];
  return (
    <div className="border text-center border-gray-700 mb-4 w-full">
      <div className="w-full pt-6 pb-4 pr-6 h-80">
        <div>Burn down</div>
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
              dataKey="optimum"
              stroke={optimumValueColor}
              strokeWidth={4}
            />
            <Line
              type="monotone"
              dataKey="current"
              stroke={color}
              strokeWidth={4}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="w-full pt-6 pb-8 pr-6 h-80">
        <div>Velocity</div>
        <ResponsiveContainer width="100%">
          <BarChart data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis tick={false} />
            <YAxis />
            <Legend />
            <Bar dataKey="optimum" fill={optimumValueColor} />
            <Bar dataKey="current" fill={color} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
