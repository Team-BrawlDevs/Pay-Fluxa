export default function StepCommitments({ profile, setProfile, next, back }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Monthly Commitments</h2>

      <input
        type="range"
        min="5000"
        max="100000"
        step="5000"
        value={profile.current_emi}
        onChange={(e) =>
          setProfile({ ...profile, current_emi: Number(e.target.value) })
        }
        className="w-full"
      />
      <p className="mb-6">EMI: ₹ {profile.current_emi}</p>

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
