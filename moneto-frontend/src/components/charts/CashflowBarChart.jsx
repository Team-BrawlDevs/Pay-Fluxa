import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function CashflowBarChart({
  income,
  essential,
  nonEssential,
  emi
}) {
  const data = [
    { name: "Income", value: income },
    { name: "Essential", value: essential },
    { name: "Non-Essential", value: nonEssential },
    { name: "EMI", value: emi }
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="mb-4 font-semibold">Cashflow Breakdown</h3>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart width={400} height={250} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#7C3AED" />
      </BarChart>
      </ResponsiveContainer>
      
    </div>
  );
}
