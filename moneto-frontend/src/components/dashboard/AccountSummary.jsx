export default function AccountSummary({ accounts, derivedProfile }) {
  const checking = accounts.checking?.balance || 0;
  const savings = accounts.savings?.balance || 0;

  const monthlyOutflow =
    derivedProfile.essential_expenses +
    derivedProfile.current_emi;

  const bufferMonths =
    monthlyOutflow > 0
      ? savings / monthlyOutflow
      : 0;

  // Buffer health classification
  const getBufferHealth = () => {
    if (bufferMonths < 3) return "Low Coverage";
    if (bufferMonths < 6) return "Moderate";
    return "Strong";
  };

  const getHealthColor = () => {
    if (bufferMonths < 3) return "bg-red-100 text-red-600";
    if (bufferMonths < 6) return "bg-yellow-100 text-yellow-600";
    return "bg-green-100 text-green-600";
  };

  // Progress (max visual at 6 months)
  const progress =
    Math.min((bufferMonths / 6) * 100, 100);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-6">
        Account Summary
      </h3>

      {/* BALANCE GRID */}
      <div className="grid grid-cols-2 gap-8">

        <div>
          <p className="text-sm text-gray-500">
            Checking Balance
          </p>
          <p className="text-2xl font-semibold mt-1">
            ₹ {checking.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Savings Balance
          </p>
          <p className="text-2xl font-semibold mt-1">
            ₹ {savings.toLocaleString()}
          </p>
        </div>

      </div>

      {/* BUFFER SECTION */}
      <div className="mt-8">

        <div className="flex justify-between items-center mb-3">
          <p className="text-sm text-gray-500">
            Emergency Buffer
          </p>

          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getHealthColor()}`}>
            {getBufferHealth()}
          </span>
        </div>

        <p className="text-lg font-semibold mb-4">
          {bufferMonths.toFixed(1)} months coverage
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div
            className="h-2 bg-primary rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-xs text-gray-500 mt-2">
          Recommended minimum: 3–6 months
        </p>

      </div>
    </div>
  );
}
