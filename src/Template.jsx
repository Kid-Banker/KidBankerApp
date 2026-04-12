import { Outlet, useLocation, ScrollRestoration } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

export default function Template() {
  const location = useLocation();

  const navbarConfig = {
    "/": "full",
    "/login": "full",
    "/select-role": "logo",
  };

  const config = navbarConfig[location.pathname] || { variant: "full" };

  return (
    <>
      <ScrollRestoration />
      <section className="overflow-x-hidden w-full bg-[#F9F9FA]">
        <Navbar variant={config} />
        <Outlet />
        <div className="bg-[#F9F9FA]">{config === "full" && <Footer />}</div>
      </section>
    </>
  );
}
