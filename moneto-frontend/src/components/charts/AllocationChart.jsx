import { PieChart, Pie, Cell, Tooltip,ResponsiveContainer } from "recharts";

export default function AllocationChart({ allocation }) {
  const data = [
    { name: "Debt", value: allocation.debt * 100 },
    { name: "Equity", value: allocation.equity * 100 },
    { name: "Liquid", value: allocation.liquid * 100 }
  ];

  const COLORS = ["#5B8DEF", "#22C55E", "#F59E0B"];

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="mb-4 font-semibold">Investment Allocation</h3>
      
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
