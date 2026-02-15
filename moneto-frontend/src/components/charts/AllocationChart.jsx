import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

export default function AllocationChart({ allocation }) {
  const data = [
    { name: "Debt", value: allocation.debt * 100 },
    { name: "Equity", value: allocation.equity * 100 },
    { name: "Liquid", value: allocation.liquid * 100 }
  ];

  const COLORS = ["#5B8DEF", "#22C55E", "#F59E0B"];

  const renderLabel = ({ percent }) =>
    `${(percent * 100).toFixed(0)}%`;

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="mb-4 font-semibold">
        Investment Allocation
      </h3>

      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={60}
            outerRadius={85}
            paddingAngle={3}
            label={renderLabel}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip
            formatter={(value) => `${value.toFixed(1)}%`}
          />

          <Legend
            verticalAlign="bottom"
            height={36}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
