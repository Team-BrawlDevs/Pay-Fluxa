import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full min-h-screen">
        <Navbar />
        <div className="flex-1 bg-gray-50 p-6 overflow-y-auto"><div className="p-8">{children}</div></div>
        
      </div>
    </div>
  );
}
