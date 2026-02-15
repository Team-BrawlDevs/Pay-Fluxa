import { db } from "../lib/firebase";
import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import simulationProfile from "../data/simulationProfile.json";

export async function seedBankData(user) {
  const profile = simulationProfile;

  // 1️⃣ Accounts (derived from buffer_savings)
  await setDoc(doc(db, "users", user.uid, "accounts", "checking"), {
    balance: profile.monthly_income,
    type: "checking"
  });

  await setDoc(doc(db, "users", user.uid, "accounts", "savings"), {
    balance: profile.buffer_savings,
    type: "savings"
  });

  // 2️⃣ Loan
  await setDoc(doc(db, "users", user.uid, "loans", "home_loan"), {
    emi: profile.current_emi,
    interest_rate: profile.interest_rate,
    remaining_tenure_months: profile.remaining_tenure_months
  });

  // 3️⃣ Transactions simulation (derived from profile)

  const transactions = [
    {
      amount: profile.monthly_income,
      type: "credit",
      category: "salary"
    },
    {
      amount: profile.essential_expenses,
      type: "debit",
      category: "essential"
    },
    {
      amount: profile.non_essential_expenses,
      type: "debit",
      category: "non_essential"
    },
    {
      amount: profile.current_emi,
      type: "debit",
      category: "emi"
    }
  ];

  for (let txn of transactions) {
    await addDoc(
      collection(db, "users", user.uid, "transactions"),
      {
        ...txn,
        createdAt: new Date()
      }
    );
  }

  // 4️⃣ Store risk profile
  await setDoc(
    doc(db, "users", user.uid),
    { risk_profile: profile.risk_profile },
    { merge: true }
  );

  console.log("Bank data seeded from simulationProfile.json");
}
