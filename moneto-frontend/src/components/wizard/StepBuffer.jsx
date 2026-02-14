export default function StepBuffer({ profile, setProfile, next, back }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Financial Cushion</h2>

      <input
        type="range"
        min="10000"
        max="300000"
        step="10000"
        value={profile.buffer_savings}
        onChange={(e) =>
          setProfile({ ...profile, buffer_savings: Number(e.target.value) })
        }
        className="w-full"
      />
      <p className="mb-6">Savings: ₹ {profile.buffer_savings}</p>

      <div className="flex justify-between">
        <button onClick={back}>Back</button>
        <button
          onClick={next}
          className="bg-primary text-white px-6 py-2 rounded-xl"
        >
          Next
        </button>
      </div>
    </div>
  );
}
