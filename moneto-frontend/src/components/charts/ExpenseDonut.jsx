import { PieChart, Pie, Cell, Tooltip,ResponsiveContainer } from "recharts";

export default function ExpenseDonut({ essential, nonEssential }) {
  const data = [
    { name: "Essential", value: essential },
    { name: "Non-Essential", value: nonEssential }
  ];

  const COLORS = ["#22C55E", "#F59E0B"];

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="mb-4 font-semibold">Expense Split</h3>
      <ResponsiveContainer width="100%" height={180}>
        <PieChart width={300} height={250}>
        <Pie data={data} dataKey="value" outerRadius={80}>
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      </ResponsiveContainer>
      
    </div>
  );
}
