import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SelectKids() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const googleUser =
    state?.googleUser ||
    JSON.parse(localStorage.getItem("googleUser") || "null");

  const [registered, setRegistered] = useState(false);
  const [registerToken, setRegisterToken] = useState("");
  const [codeInput, setCodeInput] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(true);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);
  const hasRegistered = useRef(false);

  useEffect(() => {
    if (!googleUser) {
      navigate("/login", { replace: true });
      return;
    }

    // Cegah double-call dari React StrictMode
    if (hasRegistered.current) return;
    hasRegistered.current = true;

    // Register KID otomatis saat halaman dibuka
    const registerKid = async () => {
      try {
        const body = {
          name: googleUser.name,
          email: googleUser.email,
          google_id:
            googleUser.google_id ||
            googleUser.sub ||
            googleUser.id ||
            googleUser.googleId ||
            "",
          role: "KID",
          google_refresh_token: googleUser.google_refresh_token || "",
        };

        console.log("[SelectKids] Registering KID with body:", body);

        const registerRes = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/register`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        );

        let registerData;
        try {
          registerData = await registerRes.json();
        } catch (e) {
          const text = await registerRes.text();
          console.error("[SelectKids] Register KID response not JSON:", text);
          setError("Server returned unexpected response");
          setRegisterLoading(false);
          return;
        }

        console.log("[SelectKids] Register KID response:", registerData);

        if (!registerRes.ok) {
          setError(
            registerData.error ||
              registerData.message ||
              "Register failed. Please try again."
          );
          setRegisterLoading(false);
          return;
        }

        if (!registerData.token || !registerData.user) {
          setError("Unexpected response from server");
          setRegisterLoading(false);
          return;
        }

        // Simpan token sementara untuk dipakai saat link-parent
        setRegisterToken(registerData.token);
        localStorage.setItem("token", registerData.token);
        localStorage.setItem("user", JSON.stringify(registerData.user));
        setRegistered(true);
      } catch (err) {
        console.error("[SelectKids] Register KID error:", err);
        setError("Something went wrong. Please try again.");
      } finally {
        setRegisterLoading(false);
      }
    };

    registerKid();
  }, []);

  const handleChange = (value, index) => {
    const newCode = [...codeInput];
    newCode[index] = value.slice(-1).toUpperCase();
    setCodeInput(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !codeInput[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const parentCode = codeInput.join("");

    if (parentCode.length < 6) {
      setError("Please enter the complete code first");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = registerToken || localStorage.getItem("token");

      console.log("[SelectKids] Linking parent with code:", parentCode);

      const linkRes = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/link-parent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ parent_code: parentCode }),
        }
      );

      let linkData;
      try {
        linkData = await linkRes.json();
      } catch (e) {
        const text = await linkRes.text();
        console.error("[SelectKids] Link parent response not JSON:", text);
        setError("Server returned unexpected response");
        setLoading(false);
        return;
      }

      console.log("[SelectKids] Link parent response:", linkData);

      if (!linkRes.ok) {
        setError(
          linkData.message || linkData.error || "Invalid parent code"
        );
        setLoading(false);
        return;
      }

      // Update profile kid setelah berhasil link
      try {
        const profileRes = await fetch(
          `${import.meta.env.VITE_API_URL}/api/kid/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (profileRes.ok) {
          const profileData = await profileRes.json();
          const prevUser = JSON.parse(localStorage.getItem("user") || "{}");
          localStorage.setItem(
            "user",
            JSON.stringify({ ...prevUser, ...profileData })
          );
        }
      } catch (e) {
        console.error("[SelectKids] Failed to fetch updated kid profile:", e);
      }

      navigate("/kid");
    } catch (err) {
      console.error("[SelectKids] Submit failed:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!googleUser) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F9F9FA] p-4 font-sans">
      <div className="max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Verify Your Parent Code
        </h1>

        <p className="text-gray-500 mb-10 leading-relaxed">
          Enter the unique code provided by your parent to <br />
          activate this kid profile
        </p>

        {registerLoading ? (
          <p className="text-gray-400 text-sm mb-10">
            Setting up your account...
          </p>
        ) : !registered ? (
          // Register gagal — tampilkan error + tombol back
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
          // Register berhasil — tampilkan input kode parent
          <>
            <div className="flex gap-2 sm:gap-4 justify-center mb-4">
              {codeInput.map((char, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={char}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-16 sm:w-16 sm:h-20 text-2xl font-semibold text-center bg-white border-2 border-transparent rounded-xl shadow-sm focus:border-blue-500 focus:outline-none transition-all uppercase"
                />
              ))}
            </div>

            {error && (
              <p className="text-red-500 text-sm mb-4">{error}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-3 bg-[#2785FF] hover:bg-blue-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? "Loading..." : "Continue"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default SelectKids;
