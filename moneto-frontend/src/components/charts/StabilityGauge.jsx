import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";

export default function StabilityGauge({ value }) {
  const data = [
    {
      name: "Stability",
      value: value * 100
    }
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="mb-4 font-semibold">Stability Index</h3>

      <RadialBarChart
        width={250}
        height={250}
        innerRadius="70%"
        outerRadius="100%"
        data={data}
        startAngle={180}
        endAngle={0}
      >
        <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
        <RadialBar dataKey="value" cornerRadius={10} fill="#5B8DEF" />
      </RadialBarChart>

      <div className="text-center text-2xl font-bold mt-4">
        {(value * 100).toFixed(0)}%
      </div>
    </div>
  );
}
