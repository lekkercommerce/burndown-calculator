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
  const optimumValueColor = "#efefef";
  const lineChartData = Array.from({ length: days + 1 }).map((_, i) => {
    const predictedValue = itemsAtStart - i * currentRate;
    const optimumValue = itemsAtStart - i * optimumRate;
    return {
      name: i === days - Math.floor(remainingDays) - 1 ? `${i}(today)` : i,
      optimum: formatNumber(optimumValue),
      predicted: formatNumber(predictedValue),
    };
  });
  const barChartData = [
    {
      optimum: optimumRate,
      current: currentRate,
    },
  ];
  return (
    <div className="text-center mb-4 w-full flex flex-col md:flex-row border-t md:border-t-0 border-gray-500">
      <div className="w-full md:w-1/2 pt-6 pb-4 pr-6 h-80">
        <div className="font-bold">Burn down chart</div>
        <ResponsiveContainer width="100%">
          <LineChart
            data={lineChartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fill: "white" }} />
            <YAxis tick={{ fill: "white" }} />
            <Tooltip
              contentStyle={{ backgroundColor: "black" }}
              labelFormatter={(label) => `Day ${label}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="optimum"
              stroke={optimumValueColor}
              strokeWidth={4}
            />
            <Line
              type="monotone"
              dataKey="predicted"
              stroke={color}
              strokeWidth={4}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="w-full md:w-1/2 mt-6 md:mt-0 pt-6 pb-8 pr-6 h-80">
        <div className="font-bold">Velocity</div>
        <ResponsiveContainer width="100%">
          <BarChart data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis tick={false} />
            <YAxis tick={{ fill: "white" }} />
            <Legend />
            <Bar dataKey="optimum" fill={optimumValueColor} />
            <Bar dataKey="current" fill={color} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
