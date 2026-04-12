import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

function Navbar({ variant = "full" }) {
  return (
    <>
      <div className="fixed  w-screen flex flex-row items-center py-1 px-30 justify-between bg-[#F9F9FA]">
        <div className="flex flex-row gap-x-30 items-center">
          <Link to="/" className="ml-8 text-md font-bold text-gray-700 hidden md:flex">
            <img className="w-20" src={Logo} alt="" />
          </Link>

          {variant === "full" && (
            <div className="flex gap-4">
              <Link
                to="/"
                className="ml-8 text-md text-gray-700 hidden md:flex"
              >
                About
              </Link>
              <Link
                to="/"
                className="ml-8 text-md text-gray-700 hidden md:flex"
              >
                Feature
              </Link>
              <Link
                to="/"
                className="ml-8 text-md text-gray-700 hidden md:flex"
              >
                Contact
              </Link>
            </div>
          )}
        </div>

        {variant === "full" && (
          <div className="flex flex-row items-center gap-10 md:flex">
            <Link to="/login" className="text-center text-md">
              Login
            </Link>
            <Link to="/login" className="text-white text-md text-center bg-[#2785FF] rounded-sm px-4 py-2 m-2">
              Get Started
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
