import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="flex">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN AREA */}
      <div className="ml-64 flex flex-col min-h-screen w-full bg-gray-50">

        {/* NAVBAR (sticky) */}
        <div className="sticky top-0 z-40">
          <Navbar />
        </div>

        {/* PAGE CONTENT */}
        <div className="flex-1 p-8 overflow-y-auto">
          {children}
        </div>

      </div>
    </div>
  );
}
