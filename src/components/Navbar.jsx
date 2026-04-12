import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { Menu, X, Info, Layers, Send, LogIn, Rocket } from "lucide-react";

function Navbar({ variant = "full" }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed top-0 z-50 w-screen flex flex-row items-center py-3 px-6 md:py-1 md:px-30 justify-between bg-white md:bg-[#F9F9FA] shadow-sm md:shadow-none">
        <div className="flex flex-row md:gap-x-30 items-center justify-between w-full md:w-auto">
          <Link to="/" className="flex items-center gap-3 md:ml-8">
            <img className="w-16 md:w-20" src={Logo} alt="" />
            <div className="flex flex-col md:hidden">
              <h1 className="text-lg font-bold text-gray-800 leading-tight">Kid Banker</h1>
              <p className="text-[10px] text-gray-400 font-medium tracking-wide">Smart Financial Habits</p>
            </div>
          </Link>

          {variant === "full" && (
            <>
              {/* Mobile Menu Button */}
              <button 
                className="md:hidden text-gray-800 p-1" 
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
              </button>

              {/* Desktop Links */}
              <div className="hidden md:flex gap-4">
                <Link to="/" className="md:ml-8 text-md text-gray-700">About</Link>
                <Link to="/" className="md:ml-8 text-md text-gray-700">Feature</Link>
                <Link to="/" className="md:ml-8 text-md text-gray-700">Contact</Link>
              </div>
            </>
          )}
        </div>

        {/* Desktop Buttons */}
        {variant === "full" && (
          <div className="hidden md:flex flex-row items-center gap-10">
            <Link to="/login" className="text-center text-md text-gray-700">
              Login
            </Link>
            <Link to="/login" className="text-white text-md text-center bg-[#2785FF] rounded-md px-5 py-2 hover:bg-blue-600 transition-colors">
              Get Started
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && variant === "full" && (
        <div className="md:hidden fixed top-[80px] right-4 bg-white shadow-xl border border-gray-100 rounded-xl p-3 z-40 w-56 flex flex-col gap-1 dropdown-menu">
          <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-4 text-gray-500 py-3 px-4 hover:bg-gray-50 rounded-lg text-sm transition-colors">
            <Info className="w-5 h-5" /> About
          </Link>
          <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-4 text-gray-500 py-3 px-4 hover:bg-gray-50 rounded-lg text-sm transition-colors">
            <Layers className="w-5 h-5" /> Feature
          </Link>
          <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-4 text-gray-500 py-3 px-4 hover:bg-gray-50 rounded-lg text-sm transition-colors">
            <Send className="w-5 h-5" /> Contact
          </Link>
          <div className="h-px bg-gray-100 my-1 w-full" />
          <Link to="/login" onClick={() => setIsOpen(false)} className="flex items-center gap-4 text-gray-500 py-3 px-4 hover:bg-gray-50 rounded-lg text-sm transition-colors">
            <LogIn className="w-5 h-5" /> Login
          </Link>
          <Link to="/login" onClick={() => setIsOpen(false)} className="flex items-center gap-4 text-gray-500 py-3 px-4 hover:bg-gray-50 rounded-lg text-sm transition-colors">
            <Rocket className="w-5 h-5" /> Get Started
          </Link>
        </div>
      )}
    </>
  );
}

export default Navbar;
