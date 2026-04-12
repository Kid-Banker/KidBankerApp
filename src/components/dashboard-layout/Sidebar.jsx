import logo from "../../assets/logo.png";
import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  Receipt,
  LogOut,
  Users,
  ScanLine,
  UserRound,
} from "lucide-react";

import kidService from "../../services/kidService";
import parentService from "../../services/parentService";

const Sidebar = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMainTab, setActiveMainTab] = useState("dashboard");
  const [activeSubTab, setActiveSubTab] = useState("savings");
  const [profile, setProfile] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const isParent = user?.role === "PARENT";

  // Sinkronisasi tab aktif berdasarkan URL
  useEffect(() => {
    const path = location.pathname;

    if (path.startsWith("/parent")) {
      if (path.includes("paylater")) setActiveMainTab("paylater");
      else if (path.includes("savings")) setActiveMainTab("savings");
      else setActiveMainTab("dashboard");
    } else if (path.startsWith("/kid")) {
      if (path.includes("paylater")) setActiveMainTab("paylater");
      else if (path.includes("savings") || path.includes("transactions"))
        setActiveMainTab("finance");
      else setActiveMainTab("dashboard");

      if (path.includes("savings")) setActiveSubTab("savings");
      else if (path.includes("transactions")) setActiveSubTab("transactions");
    }
  }, [location.pathname]);

  // Ambil data profil berdasarkan role
  useEffect(() => {
    async function fetchProfile() {
      if (!user?.role) return;
      try {
        const service = isParent ? parentService : kidService;
        const data = await service.getProfile({ skipGlobalErrorHandler: true });
        setProfile(data);
      } catch {
        setProfile({});
      }
    }
    fetchProfile();
  }, [user]);

  // Navigasi ke dashboard sesuai role
  const goToDashboard = () => {
    navigate(isParent ? "/parent" : "/kid");
  };

  return (
    <div className="w-full h-screen bg-white border-r-2 border-gray-100 flex flex-col font-sans select-none overflow-y-auto">
      <div className="px-4 py-4 flex items-center gap-2">
        <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
        <div>
          <h1 className="text-lg font-bold text-gray-800 leading-tight">
            Kid Banker
          </h1>
          <p className="text-[10px] text-gray-400 font-medium tracking-wide">
            Smart Financial Habits
          </p>
        </div>
      </div>

      <div className="h-px bg-gray-100 mx-4" />

      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              <UserRound className="w-7 h-7 text-gray-500" />
            </div>
          </div>
          <p className="text-sm font-bold text-gray-800 leading-snug">
            {profile.name || user?.name || (isParent ? "Parent Name" : "Kid Name")}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-gray-800 mt-1" />
            <div>
              <p className="text-[12px] text-gray-400 font-medium">
                {isParent ? "Kid Name" : "Parent Name"}
              </p>
              <p className="text-sm font-semibold text-gray-700">
                {isParent ? profile.kid_name || "-" : profile.parent_name || "-"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ScanLine className="w-5 h-5 text-gray-600 mt-0.5" />
            <div>
              <p className="text-[12px] text-gray-400 font-medium">
                Parent Code
              </p>
              <p className="text-sm font-semibold text-gray-700">
                {profile.parent_code && profile.parent_code !== "-"
                  ? profile.parent_code
                  : "-"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-px bg-gray-100 mx-4" />

      <nav className="flex-1 px-4 py-6 space-y-2">
        <button
          onClick={goToDashboard}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
            activeMainTab === "dashboard"
              ? "bg-blue-100 text-blue-600 shadow-sm"
              : "text-gray-400 hover:bg-gray-50"
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-sm font-semibold">Dashboard</span>
        </button>

        {isParent ? (
          <Link to="/parent/savings">
            <button
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeMainTab === "savings"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-400 hover:bg-gray-50"
              }`}
            >
              <Wallet className="w-5 h-5" />
              <span className="text-sm font-semibold">Finance</span>
            </button>
          </Link>
        ) : (
          <>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                activeMainTab === "finance"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-400 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <Wallet className="w-5 h-5" />
                <span className="text-sm font-semibold">Finance</span>
              </div>
              <span className="text-[10px]">{isOpen ? "▲" : "▼"}</span>
            </button>
            {isOpen && (
              <div className="ml-10 space-y-1">
                <Link to="/kid/savings">
                  <button
                    className={`block w-full text-left px-4 py-2 text-sm rounded-lg ${
                      activeSubTab === "savings"
                        ? "text-blue-600 font-bold"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    Savings
                  </button>
                </Link>
                <Link to="/kid/transactions">
                  <button
                    className={`block w-full text-left px-4 py-2 text-sm rounded-lg ${
                      activeSubTab === "transactions"
                        ? "text-blue-600 font-bold"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    Transactions
                  </button>
                </Link>
              </div>
            )}
          </>
        )}

        {isParent ? (
          <Link to="/parent/paylater">
            <button
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeMainTab === "paylater"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-400 hover:bg-gray-50"
              }`}
            >
              <Receipt className="w-5 h-5" />
              <span className="text-sm font-semibold">Pay Later</span>
            </button>
          </Link>
        ) : (
          <Link to="/kid/paylater">
            <button
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeMainTab === "paylater"
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-400 hover:bg-gray-50"
              }`}
            >
              <Receipt className="w-5 h-5" />
              <span className="text-sm font-semibold">Pay Later</span>
            </button>
          </Link>
        )}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
        >
          <LogOut className="w-6 h-6" />
          <span className="text-sm font-bold">Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
