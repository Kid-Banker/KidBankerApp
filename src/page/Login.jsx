import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";
import FinanceHero from "../components/section/FinanceHero";
import api from "../lib/axios";

/**
 * Exchange Google authorization code to tokens via Google Token Endpoint.
 * Returns { id_token, refresh_token, access_token } or throws on error.
 */
async function exchangeCodeForTokens(code) {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_GOOGLE_CLIENT_SECRET;

  const params = new URLSearchParams({
    code,
    client_id: clientId,
    client_secret: clientSecret,
    // 'postmessage' adalah nilai khusus Google untuk popup flow
    // (tidak ada redirect URL fisik karena menggunakan popup)
    redirect_uri: "postmessage",
    grant_type: "authorization_code",
  });

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("[exchangeCodeForTokens] Error:", data);
    throw new Error(
      data.error_description || data.error || "Token exchange failed",
    );
  }

  return {
    id_token: data.id_token,
    refresh_token: data.refresh_token,
    access_token: data.access_token,
  };
}

/**
 * Decode JWT payload (id_token) without verification — for reading user info.
 */
function decodeJwtPayload(token) {
  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  } catch {
    return {};
  }
}

function Login() {
  const navigate = useNavigate();
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const login = useGoogleLogin({
    flow: "auth-code",
    access_type: "offline",
    prompt: "consent",

    scope: [
      "openid",
      "email",
      "profile",
      "https://www.googleapis.com/auth/calendar",
    ].join(" "),
    
    onSuccess: async (codeResponse) => {
      setLoginLoading(true);
      setLoginError("");
      try {
        console.log("[Login] Google auth-code response:", codeResponse);

        // Step 1: Exchange code → id_token + refresh_token
        const { id_token, refresh_token } = await exchangeCodeForTokens(
          codeResponse.code,
        );

        if (!id_token) {
          console.error("[Login] No id_token received from token exchange");
          return;
        }

        console.log(
          "[Login] Token exchange success, refresh_token:",
          !!refresh_token,
        );

        // Step 2: Kirim id_token + google_refresh_token ke BE
        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_token,
            google_refresh_token: refresh_token || "",
          }),
        });

        const data = await res.json();
        console.log("[Login] BE /auth/google response:", data);

        // Step 3: Decode user info dari id_token (untuk register jika diperlukan)
        const payload = decodeJwtPayload(id_token);
        const googleUserFromToken = {
          name: payload.name || "",
          email: payload.email || "",
          google_id: payload.sub || "",
          sub: payload.sub || "",
          google_refresh_token: refresh_token || "",
        };

        // Step 4: Cek apakah user belum terdaftar
        // BE mengembalikan berbagai response untuk user yang belum terdaftar
        const msgLower = (data.message || data.error || "")
          .toString()
          .toLowerCase();
        const needsRegister =
          data.register_required === true ||
          data.need_register === true ||
          data.need_google_token === true ||
          msgLower.includes("register") ||
          msgLower.includes("not found") ||
          msgLower.includes("not registered") ||
          msgLower.includes("belum") ||
          msgLower.includes("tidak ditemukan") ||
          res.status === 404 ||
          (res.status === 200 && data.user && !data.token);

        if (needsRegister) {
          console.log("[Login] User not registered → select-role");
          navigate("/select-role", {
            state: {
              googleUser: {
                ...(data.user || {}),
                ...googleUserFromToken,
              },
            },
          });
          return;
        }

        if (!res.ok) {
          console.error("[Login] BE error:", data);
          return;
        }

        if (!data.token || !data.user) {
          console.error("[Login] Unexpected BE response:", data);
          return;
        }

        // Step 5: Simpan token & user
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        console.log("[Login] Login success:", data.user);

        // Step 6: Redirect berdasarkan role
        if (data.user.role === "KID") {
          try {
            const profileRes = await api.get("/api/kid/profile", { skipGlobalErrorHandler: true });
            if (profileRes.data?.parent_name) {
              navigate("/kid");
              return;
            }
          } catch (e) {
            console.error("[Login] Failed to fetch kid profile:", e);
          }
          navigate("/select-kids", {
            state: {
              googleUser: {
                ...data.user,
                google_refresh_token: refresh_token || "",
              },
            },
          });
        } else {
          navigate("/parent");
        }
      } catch (err) {
        console.error("[Login] Error:", err.message || err);
        setLoginError(err.message || "Login failed. Please try again.");
      } finally {
        setLoginLoading(false);
      }
    },
    onError: (error) => {
      console.error("[Login] Google OAuth error:", error);
      setLoginLoading(false);
      setLoginError(
        "Google sign-in was cancelled or failed. Please try again.",
      );
    },
  });

  return (
    <>
      <section className="min-h-screen flex flex-col items-center justify-center mb-20 bg-[#F9F9FA]">
        <div className="flex flex-col items-center justify-center gap-y-4">
          <img className="w-50" src={logo} alt="logo" />
          <h1 className="text-3xl font-bold">Start Your Saving Adventure!</h1>
          <p className="max-w-75 text-center">
            Learning to save, supported by parents. A smarter way to handle
            pocket money.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-y-5 mt-20">
          <button
            onClick={() => {
              setLoginError("");
              login();
            }}
            disabled={loginLoading}
            className="flex items-center gap-3 bg-white border border-gray-300 text-gray-700 font-medium px-6 py-3 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-50 transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loginLoading ? (
              <>
                <svg
                  className="animate-spin w-5 h-5 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Signing in...
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  className="w-5 h-5"
                >
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.5 0 6.6 1.3 9 3.4l6.7-6.7C35.8 2.5 30.2 0 24 0 14.8 0 6.9 5.4 3 13.3l7.8 6C12.8 13.1 17.9 9.5 24 9.5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8C43.8 37.3 46.5 31.4 46.5 24.5z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.8 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7L2.5 13.3A23.9 23.9 0 0 0 0 24c0 3.8.9 7.4 2.5 10.7l8.3-6z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.5-5.8c-2.1 1.4-4.7 2.3-7.7 2.3-6 0-11.2-4-13-9.5l-8 6.2C6.7 42.6 14.8 48 24 48z"
                  />
                </svg>
                Sign in with Google
              </>
            )}
          </button>

          {loginError && (
            <p className="text-red-500 text-sm text-center max-w-xs">
              ⚠️ {loginError}
            </p>
          )}
        </div>
      </section>

      <FinanceHero />
    </>
  );
}

export default Login;
