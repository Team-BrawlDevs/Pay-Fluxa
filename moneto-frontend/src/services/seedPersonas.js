import { db } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export async function seedPersonas() {
  const personas = {
    stable: {
      accounts: {
        checking: { balance: 80000, type: "checking" },
        savings: { balance: 100000, type: "savings" }
      },
      loan: {
        emi: 15000,
        interest_rate: 0.12,
        remaining_tenure_months: 24
      },
      transactions: [
        { amount: 80000, type: "credit", category: "salary" },
        { amount: 30000, type: "debit", category: "rent" },
        { amount: 10000, type: "debit", category: "groceries" }
      ]
    },

    unstable: {
      accounts: {
        checking: { balance: 15000, type: "checking" },
        savings: { balance: 20000, type: "savings" }
      },
      loan: {
        emi: 50000,
        interest_rate: 0.16,
        remaining_tenure_months: 36
      },
      transactions: [
        { amount: 60000, type: "credit", category: "salary" },
        { amount: 45000, type: "debit", category: "rent" },
        { amount: 15000, type: "debit", category: "utilities" }
      ]
    },

    recovery: {
      accounts: {
        checking: { balance: 40000, type: "checking" },
        savings: { balance: 60000, type: "savings" }
      },
      loan: {
        emi: 25000,
        interest_rate: 0.12,
        remaining_tenure_months: 18
      },
      transactions: [
        { amount: 70000, type: "credit", category: "salary" },
        { amount: 30000, type: "debit", category: "rent" }
      ]
    }
  };

  for (const key in personas) {
    await setDoc(doc(db, "personas", key), personas[key]);
  }

  console.log("Personas seeded successfully.");
}