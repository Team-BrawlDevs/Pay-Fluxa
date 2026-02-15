import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";

export default function Navbar() {
  const location = useLocation();
  const { user } = useAuth();

  const getTitle = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/history":
        return "History & Trends";
      case "/risk-lab":
        return "Risk Lab Simulation";
      case "/profile":
        return "Profile Settings";
      default:
        return "Moneto";
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">

      {/* PAGE TITLE */}
      <h2 className="text-lg font-semibold text-gray-800">
        {getTitle()}
      </h2>

      {/* USER SECTION */}
      <div className="flex items-center space-x-6">

        <div className="text-sm text-gray-600">
          {user?.email}
        </div>

        <button
          onClick={handleLogout}
          className="text-sm px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
        >
          Logout
        </button>

      </div>

    </div>
  );
}
