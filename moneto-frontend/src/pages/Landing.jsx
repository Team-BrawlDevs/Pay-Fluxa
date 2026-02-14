import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-primary to-secondary text-white">
      <h1 className="text-5xl font-bold mb-6">
        Know Your 12-Month Financial Stability
      </h1>

      <Link
        to="/signup"
        className="bg-white text-primary px-8 py-3 rounded-2xl font-semibold"
      >
        Start Assessment
      </Link>
    </div>
  );
}
