import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import MobileNavbar from "./MobileNavbar";

function DashboardLayout() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Cek autentikasi user dari localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
      return;
    }
    setUser(storedUser);
  }, [navigate]);

  // Hapus data & arahkan ke login
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex flex-col dash:flex-row h-screen overflow-hidden">
      <MobileNavbar user={user} onLogout={handleLogout} />
      <div className="hidden dash:flex w-2/12 shrink-0">
        <Sidebar user={user} onLogout={handleLogout} />
      </div>
      <main className="flex-1 overflow-y-auto overflow-x-hidden bg-[#F9F9FA] p-4 dash:p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;