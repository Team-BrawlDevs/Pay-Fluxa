import { useState } from "react";
import StepIncome from "./StepIncome";
import StepCommitments from "./StepCommitments";
import StepBuffer from "./StepBuffer";
import StepRisk from "./StepRisk";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../lib/firebase";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { evaluateProfile } from "../../api/monetoApi";
import { useNavigate } from "react-router-dom";

export default function WizardContainer() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [profile, setProfile] = useState({
    monthly_income: 60000,
    income_volatility: 3000,
    essential_expenses: 25000,
    non_essential_expenses: 8000,
    current_emi: 12000,
    interest_rate: 0.12,
    remaining_tenure_months: 24,
    buffer_savings: 50000,
    risk_profile: "moderate"
  });

  const next = () => setStep(step + 1);
  const back = () => setStep(step - 1);

  const finish = async () => {
    // Save profile
    await setDoc(doc(db, "users", user.uid), {
      financial_profile: profile
    }, { merge: true });

    // Call backend
    const result = await evaluateProfile({
      user_id: user.uid,
      ...profile
    });

    // Save latest assessment
    await setDoc(doc(db, "users", user.uid), {
      last_assessment: result
    }, { merge: true });

    // Save history snapshot
    await addDoc(
      collection(db, "users", user.uid, "assessment_history"),
      {
        ...result,
        createdAt: new Date()
      }
    );

    navigate("/dashboard");
  };

  return (
    <div className="bg-white p-10 rounded-2xl shadow-md w-full max-w-2xl">
      {step === 1 && (
        <StepIncome profile={profile} setProfile={setProfile} next={next} />
      )}
      {step === 2 && (
        <StepCommitments profile={profile} setProfile={setProfile} next={next} back={back} />
      )}
      {step === 3 && (
        <StepBuffer profile={profile} setProfile={setProfile} next={next} back={back} />
      )}
      {step === 4 && (
        <StepRisk profile={profile} setProfile={setProfile} finish={finish} back={back} />
      )}
    </div>
  );
}
