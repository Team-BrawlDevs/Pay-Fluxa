import { db } from "../lib/firebase";
import { collection, doc, setDoc, addDoc } from "firebase/firestore";

export async function seedBankData(user) {
  // Accounts
  await setDoc(doc(db, "users", user.uid, "accounts", "checking"), {
    balance: 82000,
    type: "checking"
  });

  await setDoc(doc(db, "users", user.uid, "accounts", "savings"), {
    balance: 45000,
    type: "savings"
  });

  // Loan
  await setDoc(doc(db, "users", user.uid, "loans", "home_loan"), {
    emi: 50000,
    interest_rate: 0.12,
    remaining_tenure_months: 24
  });

  // Transactions (last 3 months simulation)
  const txns = [
    { amount: 60000, type: "credit", category: "salary" },
    { amount: 15000, type: "debit", category: "rent" },
    { amount: 8000, type: "debit", category: "groceries" },
    { amount: 5000, type: "debit", category: "utilities" },
    { amount: 4000, type: "debit", category: "entertainment" }
  ];

  for (let txn of txns) {
    await addDoc(
      collection(db, "users", user.uid, "transactions"),
      {
        ...txn,
        createdAt: new Date()
      }
    );
  }
}
