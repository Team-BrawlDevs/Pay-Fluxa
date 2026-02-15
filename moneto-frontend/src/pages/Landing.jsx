import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* ===== NAVBAR ===== */}
      <div className="flex justify-between items-center px-10 py-6 bg-white shadow-sm">
        <h1 className="text-xl font-bold text-primary">
          PayFluxa
        </h1>

        <div className="space-x-4">
          <Link
            to="/login"
            className="text-gray-600 hover:text-primary font-medium"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="bg-primary text-white px-5 py-2 rounded-lg font-medium hover:opacity-90"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* ===== HERO SECTION ===== */}
      <div className="max-w-6xl mx-auto px-10 py-24 text-center">

        <h2 className="text-5xl font-bold text-gray-900 leading-tight">
          Predict Your Financial Stability
          <br />
          <span className="text-primary">
            Before It Becomes a Problem
          </span>
        </h2>

        <p className="text-gray-600 mt-6 text-lg max-w-2xl mx-auto">
          PayFluxa analyzes your cash flow, loan burden, and savings buffer
          to forecast your financial health over the next 12 months.
          No spreadsheets. No guesswork. Just clarity.
        </p>

        <div className="mt-10 space-x-4">
          <Link
            to="/signup"
            className="bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90"
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="border border-gray-300 px-8 py-3 rounded-xl font-semibold text-gray-700 hover:bg-gray-100"
          >
            Login
          </Link>
        </div>
      </div>

      {/* ===== HOW IT WORKS ===== */}
      <div className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-10">

          <h3 className="text-3xl font-bold text-center mb-16">
            How PayFluxa Works
          </h3>

          <div className="grid grid-cols-3 gap-12 text-center">

            <div>
              <div className="text-primary text-4xl font-bold mb-4">
                01
              </div>
              <h4 className="font-semibold text-lg mb-2">
                Financial Snapshot
              </h4>
              <p className="text-gray-600">
                We evaluate income, expenses, and loans to understand
                your current financial position.
              </p>
            </div>

            <div>
              <div className="text-primary text-4xl font-bold mb-4">
                02
              </div>
              <h4 className="font-semibold text-lg mb-2">
                Risk Simulation
              </h4>
              <p className="text-gray-600">
                PayFluxa projects your stability across 12 months
                to detect potential stress points early.
              </p>
            </div>

            <div>
              <div className="text-primary text-4xl font-bold mb-4">
                03
              </div>
              <h4 className="font-semibold text-lg mb-2">
                Actionable Insights
              </h4>
              <p className="text-gray-600">
                Get smart EMI adjustments and investment
                recommendations aligned to your risk profile.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* ===== FEATURES ===== */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-10">

          <h3 className="text-3xl font-bold text-center mb-16">
            Built for Financial Confidence
          </h3>

          <div className="grid grid-cols-2 gap-12">

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h4 className="font-semibold text-lg mb-3">
                Adaptive EMI Protection
              </h4>
              <p className="text-gray-600">
                Reduce stress risk with flexible repayment
                planning during unstable periods.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h4 className="font-semibold text-lg mb-3">
                Alternative Credit Intelligence
              </h4>
              <p className="text-gray-600">
                A forward-looking credit index built
                on real financial behavior.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h4 className="font-semibold text-lg mb-3">
                Investment Readiness
              </h4>
              <p className="text-gray-600">
                Allocate funds safely based on
                your survivability margin.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h4 className="font-semibold text-lg mb-3">
                Real-Time Risk Alerts
              </h4>
              <p className="text-gray-600">
                Know when stress probability increases
                and act before it escalates.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* ===== FINAL CTA ===== */}
      <div className="bg-primary text-white py-20 text-center">
        <h3 className="text-3xl font-bold mb-6">
          Take Control of Your Financial Future
        </h3>

        <Link
          to="/signup"
          className="bg-white text-primary px-10 py-4 rounded-xl font-semibold hover:opacity-90"
        >
          Start Your Assessment
        </Link>
      </div>

    </div>
  );
}
