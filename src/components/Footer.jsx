import React from "react";
import { Link } from "react-router-dom";
import LogoWhite from "../assets/logo_white.png";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="">
        <div className="max-w-7xl mx-auto px-6 pt-4 pb-2 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-row items-center justify-between w-full md:w-auto">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center">
                <img src={LogoWhite} alt="Kid Banker Logo" className="w-full h-full object-contain" />
              </div>
            </div>

            {/* Go To Top for Mobile */}
            <button
              onClick={scrollToTop}
              className="md:hidden flex items-center gap-2 text-sm font-medium text-neutral-300 hover:text-white transition-colors duration-200 group"
            >
              <span>Go to Top</span>
              <div className="w-8 h-8 rounded-full border border-neutral-600 flex items-center justify-center group-hover:border-white group-hover:bg-white group-hover:text-neutral-900 transition-all duration-200">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </div>
            </button>
          </div>

          <nav className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-8 w-full md:w-auto">
            <Link to="/" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors duration-200">
              About
            </Link>
            <Link to="/privacy-policy" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors duration-200">
              Privacy & Policy
            </Link>
            <Link to="/terms-of-service" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors duration-200">
              Terms of Service
            </Link>
            <Link to="/login" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors duration-200">
              Login
            </Link>
          </nav>

          {/* Go To Top for Desktop */}
          <button
            onClick={scrollToTop}
            className="hidden md:flex items-center gap-2 text-sm font-medium text-neutral-300 hover:text-white transition-colors duration-200 group"
          >
            <span>Go to Top</span>
            <div className="w-8 h-8 rounded-full border border-neutral-600 flex items-center justify-center group-hover:border-white group-hover:bg-white group-hover:text-neutral-900 transition-all duration-200">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </div>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="bg-neutral-800/50 rounded-2xl px-4 md:px-6 py-6 md:py-5 flex flex-col items-center justify-center gap-8 md:gap-6 mt-4">
          <div className="flex flex-col md:flex-row items-center w-full md:w-auto gap-4 md:gap-6">
            <Link to="/developers"
              className="flex justify-center items-center gap-3 px-4 py-3 md:py-2.5 rounded-lg border border-neutral-700 hover:border-neutral-500 hover:bg-neutral-800 transition-all w-full md:w-auto duration-200 group"
            >
              <svg className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-sm text-neutral-300 group-hover:text-white transition-colors truncate max-w-[200px] sm:max-w-none">
                CC26-PS007@student.devacademy.id
              </span>
            </Link>

            <div className="flex justify-center items-center gap-3 px-4 py-3 md:py-2.5 rounded-lg border border-neutral-700 w-full md:w-auto">
              <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm text-neutral-300">
                Bogor, West Java, Indonesia
              </span>
            </div>
          </div>

          <p className="text-sm text-neutral-400 text-center">
            © 2026 Kid Banker. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
