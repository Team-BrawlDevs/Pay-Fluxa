import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { db } from "../lib/firebase";
import { collection, getDocs, doc, setDoc, addDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { deriveFinancialProfile } from "../api/aggregator";
import { evaluateProfile } from "../api/monetoApi";
import StabilityGauge from "../components/charts/StabilityGauge";
import CashflowBarChart from "../components/charts/CashflowBarChart";
import ExpenseDonut from "../components/charts/ExpenseDonut";
import AllocationChart from "../components/charts/AllocationChart";
import { generateInsights } from "../utils/insightEngine";
import InsightCard from "../components/insights/InsightCard";
import { seedBankData } from "../utils/SeedBankData";
import AccountSummary from "../components/dashboard/AccountSummary";
import LoanBreakdown from "../components/dashboard/LoanBreakdown";
import LifeStateBadge from "../components/dashboard/LifeStateBadge";

export default function Dashboard() {
  const { user } = useAuth();
  const [assessment, setAssessment] = useState(null);
  const [derivedProfile, setDerivedProfile] = useState(null);
  const [accounts, setAccounts] = useState({});
  const [loans, setLoans] = useState({});

  useEffect(() => {
    if (!user) return;

    const initializeUser = async () => {
      const accountsRef = collection(db, "users", user.uid, "accounts");
      const accountsSnapshot = await getDocs(accountsRef);

      if (accountsSnapshot.empty) {
        await seedBankData(user);
      }

      await runEvaluation();
    };

    const runEvaluation = async () => {
      const accountsSnapshot = await getDocs(
        collection(db, "users", user.uid, "accounts")
      );

      const accountsData = {};
      accountsSnapshot.forEach((doc) => {
        accountsData[doc.id] = doc.data();
      });

      const loansSnapshot = await getDocs(
        collection(db, "users", user.uid, "loans")
      );

      const loansData = {};
      loansSnapshot.forEach((doc) => {
        loansData[doc.id] = doc.data();
      });

      const transactionsSnapshot = await getDocs(
        collection(db, "users", user.uid, "transactions")
      );

      const transactions = transactionsSnapshot.docs.map((doc) =>
        doc.data()
      );

      const profile = deriveFinancialProfile({
        accounts: accountsData,
        transactions,
        loans: loansData,
        risk_profile: "moderate"
      });

      setDerivedProfile(profile);

      const result = await evaluateProfile({
        user_id: user.uid,
        ...profile
      });

      await setDoc(
        doc(db, "users", user.uid),
        { last_assessment: result },
        { merge: true }
      );

      await addDoc(
        collection(db, "users", user.uid, "assessment_history"),
        {
          ...result,
          createdAt: new Date()
        }
      );

      setAssessment(result);
      setAccounts(accountsData);
      setLoans(loansData);
    };

    initializeUser();
  }, [user]);

  if (!assessment || !derivedProfile) {
    return (
      <Layout>
        <div className="py-10 text-center text-gray-500">
          Analyzing your financial data...
        </div>
      </Layout>
    );
  }

  const insights = generateInsights(assessment, derivedProfile);
  const monthlySurplus =
  derivedProfile.monthly_income -
  derivedProfile.essential_expenses -
  derivedProfile.non_essential_expenses -
  derivedProfile.current_emi;
  const formatMonthYear = (monthOffset) => {
  const today = new Date();
  const targetDate = new Date(
    today.getFullYear(),
    today.getMonth() + monthOffset,
    1
  );

  return targetDate.toLocaleString("en-US", {
    month: "short",
    year: "numeric"
  });
};


  return (
  <Layout>
    <div className="max-w-6xl mx-auto space-y-8">

      {/* ========= METRICS RIBBON ========= */}
      <div className="bg-white rounded-2xl shadow-sm px-6 py-5 flex items-center justify-between">

        <div className="flex items-center gap-10">

          <div>
            <p className="text-xs text-gray-500">Stability</p>
            <p className="text-xl font-semibold">
              {(assessment.survivability_index * 100).toFixed(0)}%
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Credit Index</p>
            <p className="text-xl font-semibold">
              {assessment.credit_index}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Stress Risk</p>
            <p className="text-xl font-semibold">
              {(assessment.stress_probability * 100).toFixed(1)}%
            </p>
          </div>

        </div>

        <LifeStateBadge state={assessment.life_state} />

      </div>
      <div className="bg-white p-5 rounded-2xl shadow mb-8 flex justify-between items-center">
  <div>
  <p className="text-gray-500 text-sm">12-Month Outlook</p>

  <p className="text-xl font-semibold mt-1">
    {assessment.expected_stress_month
      ? `Risk in ${formatMonthYear(assessment.expected_stress_month)}`
      : "Low Risk Projection"}
  </p>
</div>

  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
    assessment.stress_probability > 0.5
      ? "bg-red-100 text-red-600"
      : "bg-green-100 text-green-600"
  }`}>
    {assessment.stress_probability > 0.5 ? "Elevated Risk" : "Stable Outlook"}
  </div>
</div>


      {/* ========= FINANCIAL OVERVIEW ========= */}
      <div className="grid grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <AccountSummary
            accounts={accounts}
            derivedProfile={derivedProfile}
          />
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <LoanBreakdown loans={loans} assessment={assessment} derivedProfile={derivedProfile}/>
        </div>

      </div>

      {/* ========= ANALYTICS ========= */}
      <div className="bg-white p-5 rounded-2xl shadow mb-6 flex justify-between items-center">
  <div>
    <p className="text-gray-500 text-sm">Monthly Surplus</p>
    <p className={`text-2xl font-bold mt-1 ${monthlySurplus >= 0 ? "text-green-600" : "text-red-600"}`}>
      ₹ {monthlySurplus.toLocaleString()}
    </p>
  </div>

  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
    monthlySurplus >= 0
      ? "bg-green-100 text-green-600"
      : "bg-red-100 text-red-600"
  }`}>
    {monthlySurplus >= 0 ? "Healthy Cashflow" : "Deficit Risk"}
  </div>
</div>

      <div className="grid grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <CashflowBarChart
            income={derivedProfile.monthly_income}
            essential={derivedProfile.essential_expenses}
            nonEssential={derivedProfile.non_essential_expenses}
            emi={derivedProfile.current_emi}
          />
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <ExpenseDonut
            essential={derivedProfile.essential_expenses}
            nonEssential={derivedProfile.non_essential_expenses}
          />
        </div>

      </div>

      {/* ========= INTELLIGENCE ========= */}
      
      <div className="grid grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
    assessment.investment_status === "Active"
      ? "bg-green-100 text-green-600"
      : "bg-yellow-100 text-yellow-600"
  }`}>
    {assessment.investment_status}
  </span>
          <AllocationChart allocation={assessment.investment_suggestion} />
        </div>
        

        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-sm font-semibold mb-4">
            Financial Intelligence
          </h3>

          <div className="space-y-3">
            {insights.map((insight, index) => (
              <InsightCard key={index} insight={insight} />
            ))}
          </div>

        </div>

      </div>

    </div>
  </Layout>
);
}
