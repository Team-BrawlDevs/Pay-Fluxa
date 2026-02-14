export default function StepRisk({ profile, setProfile, finish, back }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Risk Profile</h2>

      <div className="flex gap-4 mb-6">
        {["conservative", "moderate", "aggressive"].map((risk) => (
          <button
            key={risk}
            onClick={() => setProfile({ ...profile, risk_profile: risk })}
            className={`px-4 py-2 rounded-xl border ${
              profile.risk_profile === risk ? "bg-primary text-white" : ""
            }`}
          >
            {risk}
          </button>
        ))}
      </div>

      <div className="flex justify-between">
        <button onClick={back}>Back</button>
        <button
          onClick={finish}
          className="bg-success text-white px-6 py-2 rounded-xl"
        >
          Finish
        </button>
      </div>
    </div>
  );
}
