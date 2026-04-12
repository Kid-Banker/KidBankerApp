import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/axios";

const ParentDashboardGuard = ({ children }) => {
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    // Verifikasi profil parent & koneksi ke kid
    api
      .get("/api/parent/profile", { skipGlobalErrorHandler: true })
      .then((res) => {
        if (!isMounted) return;
        if (!res.data.name || res.data.kid_name === undefined) {
          navigate("/401", { replace: true });
        } else {
          setChecking(false);
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        const status = err.response?.status;
        // Redirect sesuai status error
        if (status === 401) navigate("/401", { replace: true });
        else if (status === 403) navigate("/403", { replace: true });
        else navigate("/500", { replace: true });
      });

    return () => { isMounted = false; };
  }, [navigate]);

  if (checking) return null;
  return children;
};

export default ParentDashboardGuard;
