import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SelectParent() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [parentCode, setParentCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const hasRegistered = useRef(false);

  useEffect(() => {
    // Guard: jika tidak ada state yang valid, redirect ke login
    if (!state || !state.googleUser) {
      navigate("/login", { replace: true });
      return;
    }

    // Cegah double-call dari React StrictMode
    if (hasRegistered.current) return;
    hasRegistered.current = true;

    const register = async () => {
      try {
        const { googleUser, id_token } = state;

        // Bangun body register PARENT
        const body = {
          name: googleUser.name,
          email: googleUser.email,
          // Coba semua kemungkinan field untuk google_id
          google_id:
            googleUser.google_id ||
            googleUser.sub ||
            googleUser.id ||
            googleUser.googleId ||
            "",
          role: "PARENT",
          // google_refresh_token: string kosong jika tidak tersedia
          // BE akan menggunakannya saat available
          google_refresh_token: googleUser.google_refresh_token || "",
        };

        console.log("[SelectParent] Registering PARENT with body:", body);

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/register`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        );

        const data = await res.json();
        console.log("[SelectParent] Register PARENT response:", data);

        if (!res.ok) {
          setError(data.error || data.message || "Register failed. Please try again.");
          return;
        }

        if (!data.token || !data.user) {
          setError("Unexpected response from server");
          return;
        }

        setParentCode(data.user.parent_code || "");
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
      } catch (err) {
        console.error("[SelectParent] Register error:", err);
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    register();
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(parentCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8faff] p-6 text-center font-sans">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Connect to Your Kid
        </h1>
        <p className="text-gray-500 text-sm sm:text-base mb-10 px-4 leading-relaxed">
          Share this unique code to verify your kid profile and{" "}
          <br className="hidden sm:block" />
          start tracking their financial journey together
        </p>

        {loading ? (
          <p className="text-gray-400 text-sm mb-10">Generating your code...</p>
        ) : error ? (
          <div className="mb-10">
            <p className="text-red-500 text-sm mb-4">{error}</p>
            <button
              onClick={() => navigate("/login")}
              className="text-blue-500 text-sm underline"
            >
              Back to Login
            </button>
          </div>
        ) : (
          <>
            <div className="relative inline-block mb-4">
              <button
                onClick={handleCopy}
                className="bg-white px-10 py-5 rounded-lg shadow-sm border border-gray-100 flex items-center justify-center transition-all active:scale-95 hover:shadow-md"
                title="Click to copy"
              >
                <span className="text-xl font-bold tracking-[0.75em] text-gray-800 mr-[-0.75em]">
                  {parentCode.split("").join(" ")}
                </span>
              </button>
              {copied && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-3 rounded-md animate-bounce">
                  Copied!
                </div>
              )}
            </div>
            <p className="text-gray-400 text-xs sm:text-sm mb-12">
              This code will also be displayed on your dashboard
            </p>
          </>
        )}

        <button
          onClick={() => navigate("/parent")}
          disabled={loading || !!error}
          className="bg-[#2785FF] hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-sm font-medium transition-colors shadow-sm disabled:opacity-50"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}

export default SelectParent;