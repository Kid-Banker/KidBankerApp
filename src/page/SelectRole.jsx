import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import SelectKid from "../assets/Select-Kid-Role.png";
import SelectParentImg from "../assets/Select-Parent-Role.png";

function SelectRole() {
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    // Jika tidak ada state dari login, redirect ke login
    if (!state || !state.googleUser) {
      navigate("/login", { replace: true });
    }
  }, [state, navigate]);

  if (!state || !state.googleUser) return null;

  const handleSelect = (role) => {
    if (role === "PARENT") {
      navigate("/select-parent", {
        state: {
          ...state,
          role: "PARENT",
        },
      });
    } else {
      navigate("/select-kids", {
        state: {
          ...state,
          role: "KID",
        },
      });
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-[#F9F9FA]">
      <h1 className="text-4xl font-bold">Select Your Role</h1>
      <p className="w-md text-center mt-5">
        Begin your financial management journey. Select your role to log in to
        the Kid Banker dashboard
      </p>
      <div className="flex flex-row gap-8 mt-15">
        <button
          onClick={() => handleSelect("KID")}
          className="flex flex-col items-center justify-center gap-y-2 px-4 py-2"
        >
          <img
            className="w-30 hover:border-3 hover:border-blue-500 rounded-full"
            src={SelectKid}
            alt="Kid Role"
          />
          <h1 className="text-black">Kid</h1>
        </button>
        <button
          onClick={() => handleSelect("PARENT")}
          className="flex flex-col items-center justify-center gap-y-2 px-4 py-2"
        >
          <img
            className="w-30 hover:border-3 hover:border-blue-500 rounded-full"
            src={SelectParentImg}
            alt="Parent Role"
          />
          <h1 className="text-black">Parent</h1>
        </button>
      </div>
    </section>
  );
}

export default SelectRole;