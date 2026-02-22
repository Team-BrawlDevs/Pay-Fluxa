import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { injectPersona } from "../services/personaInjector";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import Layout from "../components/layout/Layout";
export default function Simulation() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [customAmount, setCustomAmount] = useState("");

  if (!user) return null;

  // 🔵 Persona Switch
  const switchPersona = async (type) => {
    setLoading(true);
    await injectPersona(user.uid, type);
    setLoading(false);
    window.location.reload(); // simple recompute trigger
  };

  // 🔵 Add Transaction
  const addTransaction = async (amount, type) => {
    await addDoc(collection(db, "users", user.uid, "transactions"), {
      amount,
      type,
      category: type === "credit" ? "salary" : "simulated-expense",
      createdAt: new Date()
    });

    window.location.reload(); // trigger recompute
  };

  return (
     <Layout>
    <div className="p-8">

      <h2 className="text-2xl font-semibold mb-8">
        Simulation & Persona Control
      </h2>

      {/* Persona Switch */}
      <div className="bg-white rounded-2xl shadow p-6 mb-8">
        <h3 className="font-semibold mb-4">Switch Financial Persona</h3>

        <div className="flex gap-4">
          <button
            onClick={() => switchPersona("stable")}
            className="px-6 py-2 bg-green-500 text-white rounded-xl"
          >
            Stable
          </button>

          <button
            onClick={() => switchPersona("unstable")}
            className="px-6 py-2 bg-red-500 text-white rounded-xl"
          >
            Unstable
          </button>

          <button
            onClick={() => switchPersona("recovery")}
            className="px-6 py-2 bg-yellow-500 text-white rounded-xl"
          >
            Recovery
          </button>
        </div>
      </div>

      {/* Transaction Simulation */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="font-semibold mb-4">Simulate Transactions</h3>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => addTransaction(50000, "debit")}
            className="px-6 py-2 bg-gray-800 text-white rounded-xl"
          >
            Simulate ₹50,000 Expense
          </button>

          <button
            onClick={() => addTransaction(80000, "credit")}
            className="px-6 py-2 bg-blue-600 text-white rounded-xl"
          >
            Simulate ₹80,000 Income
          </button>
        </div>

        {/* Custom */}
        <div className="flex gap-4">
          <input
            type="number"
            placeholder="Enter custom amount"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            className="border rounded-xl px-4 py-2"
          />

          <button
            onClick={() =>
              addTransaction(Number(customAmount), "debit")
            }
            className="px-6 py-2 bg-black text-white rounded-xl"
          >
            Add Expense
          </button>

          <button
            onClick={() =>
              addTransaction(Number(customAmount), "credit")
            }
            className="px-6 py-2 bg-primary text-white rounded-xl"
          >
            Add Income
          </button>
        </div>

      </div>

    </div>
    </Layout>
  );
}