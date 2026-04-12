import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

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
    <div className="flex h-screen overflow-hidden">
      <Sidebar user={user} onLogout={handleLogout} />
      <main className="flex-1 overflow-y-auto bg-[#F9F9FA] p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;