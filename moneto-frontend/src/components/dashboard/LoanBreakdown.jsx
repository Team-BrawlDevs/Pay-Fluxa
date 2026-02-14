export default function LoanBreakdown({ loans, assessment, derivedProfile }) {
  const loan = loans?.home_loan;
  if (!loan || !derivedProfile) return null;

  // 📊 EMI Burden %
  const emiBurden =
    (loan.emi / derivedProfile.monthly_income) * 100;

  // 📊 Loan Health Classification
  const getLoanHealth = () => {
    if (emiBurden > 40) return "High Pressure";
    if (emiBurden > 25) return "Moderate";
    return "Healthy";
  };

  const getHealthColor = () => {
    if (emiBurden > 40) return "bg-red-100 text-red-600";
    if (emiBurden > 25) return "bg-yellow-100 text-yellow-600";
    return "bg-green-100 text-green-600";
  };

  // 📊 Tenure Progress
  const totalTenure = 60; // assumed original tenure
  const progress =
    ((totalTenure - loan.remaining_tenure_months) /
      totalTenure) *
    100;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-6">
        Loan Breakdown
      </h3>

      <div className="grid grid-cols-2 gap-y-8 gap-x-10">

        {/* EMI */}
        <div>
          <p className="text-sm text-gray-500">EMI</p>
          <p className="text-xl font-semibold mt-1">
            ₹ {loan.emi.toLocaleString()}
          </p>
        </div>

        {/* Interest Rate */}
        <div>
          <p className="text-sm text-gray-500">Interest Rate</p>
          <p className="text-xl font-semibold mt-1">
            {(loan.interest_rate * 100).toFixed(0)}%
          </p>
        </div>

        {/* Tenure */}
        <div>
          <p className="text-sm text-gray-500">Tenure Left</p>
          <p className="text-xl font-semibold mt-1">
            {loan.remaining_tenure_months} months
          </p>
        </div>

        {/* EMI Burden */}
        <div>
          <p className="text-sm text-gray-500">EMI Burden</p>
          <p className={`text-xl font-semibold mt-1 ${
            emiBurden > 40 ? "text-red-600" : "text-green-600"
          }`}>
            {emiBurden.toFixed(1)}%
          </p>
        </div>

        {/* Loan Health */}
        <div>
          <p className="text-sm text-gray-500">Loan Health</p>
          <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${getHealthColor()}`}>
            {getLoanHealth()}
          </span>
        </div>

        {/* Protection Mode */}
        <div>
          <p className="text-sm text-gray-500">Protection Mode</p>
          <span
            className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
              assessment.contract_mode === "Protected"
                ? "bg-blue-100 text-blue-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {assessment.contract_mode}
          </span>
        </div>

        {/* Tenure Progress Bar */}
        <div className="col-span-2">
          <p className="text-sm text-gray-500 mb-2">
            Repayment Progress
          </p>

          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div
              className="h-2 bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-xs text-gray-500 mt-2">
            {progress.toFixed(0)}% completed
          </p>
        </div>

      </div>
    </div>
  );
}
