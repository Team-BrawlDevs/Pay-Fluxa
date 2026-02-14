export default function InsightCard({ insight }) {
  const colorMap = {
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    danger: "bg-red-100 text-red-800"
  };

  return (
    <div className={`p-4 rounded-xl ${colorMap[insight.type]}`}>
      {insight.message}
    </div>
  );
}
