import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Menu, X, LayoutDashboard, Wallet, Receipt, LogOut } from "lucide-react";

const MobileNavbar = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const location = useLocation();
  const navigate = useNavigate();

  const isParent = user?.role === "PARENT";
  const baseUrl = isParent ? "/parent" : "/kid";

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("paylater")) setActiveTab("paylater");
    else if (path.includes("savings") || path.includes("transactions")) setActiveTab("finance");
    else setActiveTab("dashboard");
  }, [location.pathname]);

  const goToDashboard = () => {
    setIsOpen(false);
    navigate(baseUrl);
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: baseUrl, action: goToDashboard },
    { id: "finance", label: "Finance", icon: Wallet, path: `${baseUrl}/savings` },
    { id: "paylater", label: "Pay Later", icon: Receipt, path: `${baseUrl}/paylater` },
  ];

  return (
    <div className="dash:hidden relative z-50">
      <div className="flex items-center justify-between bg-white px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-gray-800 leading-tight">Kid Banker</h1>
            <p className="text-[10px] text-gray-400 font-medium tracking-wide">Smart Financial Habits</p>
          </div>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 p-1">
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-16 right-4 w-56 bg-white border border-gray-100 rounded-xl shadow-lg p-2 flex flex-col gap-1">
          {navItems.map((item) => (
            item.action ? (
              <button
                key={item.id}
                onClick={item.action}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm w-full transition-colors ${
                  activeTab === item.id ? "text-gray-800 font-bold bg-gray-50" : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ) : (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                  activeTab === item.id ? "text-gray-800 font-bold bg-gray-50" : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            )
          ))}
          <div className="h-px bg-gray-100 my-1"></div>
          <button
            onClick={() => {
              setIsOpen(false);
              if (onLogout) onLogout();
            }}
            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-500 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default MobileNavbar;
