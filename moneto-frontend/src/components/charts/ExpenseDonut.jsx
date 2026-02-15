import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

export default function ExpenseDonut({ essential, nonEssential }) {
  const total = essential + nonEssential;

  const data = [
    {
      name: "Essential",
      value: essential,
      percent: ((essential / total) * 100).toFixed(1)
    },
    {
      name: "Non-Essential",
      value: nonEssential,
      percent: ((nonEssential / total) * 100).toFixed(1)
    }
  ];

  const COLORS = ["#22C55E", "#F59E0B"];

  const renderLabel = ({ percent }) =>
    `${(percent)}%`;

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="mb-4 font-semibold">
        Expense Split
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
            formatter={(value) =>
              `₹ ${value.toLocaleString()}`
            }
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
