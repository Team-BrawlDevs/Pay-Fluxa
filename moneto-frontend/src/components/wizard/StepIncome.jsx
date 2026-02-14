export default function StepIncome({ profile, setProfile, next }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Income Profile</h2>

      <label className="block mb-2">Monthly Income</label>
      <input
        type="range"
        min="20000"
        max="200000"
        step="5000"
        value={profile.monthly_income}
        onChange={(e) =>
          setProfile({ ...profile, monthly_income: Number(e.target.value) })
        }
        className="w-full"
      />
      <p className="mb-6">₹ {profile.monthly_income}</p>

      <button
        onClick={next}
        className="bg-primary text-white px-6 py-2 rounded-xl"
      >
        Next
      </button>
    </div>
  );
}
