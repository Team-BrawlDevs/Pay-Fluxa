// src/pages/Consent.jsx

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { initializeUserWithConsent } from "../services/personaService";
import { injectPersona } from "../services/personaInjector";
import { useState } from "react";

export default function Consent() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleConsent = async () => {
    if (!user) return;

    setLoading(true);

    // 1️⃣ Store consent + default persona
    await initializeUserWithConsent(user.uid);

    // 2️⃣ Inject stable persona transactions
    await injectPersona(user.uid, "stable");

    setLoading(false);

    // 3️⃣ Go to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-xl w-full">
        <h2 className="text-2xl font-semibold mb-6">
          Connect Your Bank Account
        </h2>

        <p className="text-gray-600 mb-6 leading-relaxed">
          By connecting your bank account, PayFLuxa will securely access your
          transaction history to analyze your financial stability, optimize EMI
          structure, and recommend surplus-backed investment strategies.
        </p>

        <ul className="text-sm text-gray-500 mb-8 space-y-2">
          <li>• Read-only transaction access</li>
          <li>• No fund movement permission</li>
          <li>• Secure encrypted storage</li>
          <li>• You can disconnect anytime</li>
        </ul>

        <button
          onClick={handleConsent}
          disabled={loading}
          className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
        >
          {loading ? "Connecting..." : "Agree & Connect"}
        </button>
      </div>
    </div>
  );
}