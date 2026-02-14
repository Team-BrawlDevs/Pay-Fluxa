export default function LifeStateBadge({ state }) {
  const colorMap = {
    Stable: "bg-green-100 text-green-800",
    Watch: "bg-yellow-100 text-yellow-800",
    Stress: "bg-orange-100 text-orange-800",
    Critical: "bg-red-100 text-red-800"
  };

  return (
    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${colorMap[state]}`}>
      {state}
    </span>
  );
}
