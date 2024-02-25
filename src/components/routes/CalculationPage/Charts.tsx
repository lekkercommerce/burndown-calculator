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

export default function Charts({
  start,
  projectedEnd,
}: {
  start: number;
  projectedEnd: number;
}) {
  return (
    <ResponsiveContainer width={500} height={400}>
      <LineChart
        data={[
          { name: "current", current: start, optimum: start },
          { name: "optimum", current: projectedEnd, optimum: 0 },
        ]}
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
  );
}
