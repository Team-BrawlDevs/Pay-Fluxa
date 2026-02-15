import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* ===== LEFT BRAND PANEL ===== */}
      <div className="hidden md:flex w-1/2 bg-primary text-white flex-col justify-center px-16">
        <h1 className="text-4xl font-bold leading-tight">
          Build Financial Stability.
          <br />
          <span className="opacity-80">
            Start with Clarity.
          </span>
        </h1>

        <p className="mt-6 text-white/80 max-w-md">
          PayFluxa forecasts your financial health,
          evaluates loan pressure, and helps you
          take proactive decisions before risk escalates.
        </p>
      </div>

      {/* ===== RIGHT FORM PANEL ===== */}
      <div className="flex flex-1 items-center justify-center bg-gray-50 px-6">
        <form
          onSubmit={handleSignup}
          className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-2">
            Create Account
          </h2>

          <p className="text-gray-500 mb-6 text-sm">
            Start your financial stability assessment
          </p>

          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="text-sm text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="text-sm text-gray-600">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Create Account
          </button>

          {/* ===== LOGIN LINK ===== */}
          <p className="text-sm text-gray-500 mt-6 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-medium hover:underline"
            >
              Login
            </Link>
          </p>

        </form>
      </div>

    </div>
  );
}
