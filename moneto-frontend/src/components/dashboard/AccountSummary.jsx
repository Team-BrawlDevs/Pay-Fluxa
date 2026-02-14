export default function AccountSummary({ accounts, derivedProfile }) {
  const bufferMonths =
    derivedProfile.buffer_savings /
    (derivedProfile.essential_expenses +
      derivedProfile.current_emi);

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="text-lg font-semibold mb-6">Account Summary</h3>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-gray-500">Checking</p>
          <p className="text-2xl font-bold">
            ₹ {accounts.checking?.balance || 0}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Savings</p>
          <p className="text-2xl font-bold">
            ₹ {accounts.savings?.balance || 0}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-gray-500">Emergency Buffer</p>
        <p className="text-xl font-semibold">
          {bufferMonths.toFixed(1)} months coverage
        </p>
      </div>
    </div>
  );
}
