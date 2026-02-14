import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkStyle =
    "block px-4 py-2 rounded-xl hover:bg-primary/10 transition";

  return (
    <div className="w-64 h-screen bg-darkbg text-white fixed p-6">
      <h1 className="text-2xl font-bold mb-10 text-primary">Moneto</h1>

      <nav className="space-y-4">
        <NavLink to="/dashboard" className={linkStyle}>
          Dashboard
        </NavLink>
        <NavLink to="/assessment" className={linkStyle}>
          Assessment
        </NavLink>
        <NavLink to="/history" className={linkStyle}>
          History
        </NavLink>
        <NavLink to="/risk-lab" className={linkStyle}>
          Risk Lab
        </NavLink>
        <NavLink to="/profile" className={linkStyle}>
          Profile
        </NavLink>
      </nav>
    </div>
  );
}
