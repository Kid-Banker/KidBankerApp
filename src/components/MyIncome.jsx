import { useState } from "react";
import { EyeOff, Eye } from "lucide-react";

export default function MyIncome({
  title = "My Income",
  amount = 0,
  difference = 0,
  status = "SAME",
  loading,
}) {
  const [isVisible, setIsVisible] = useState(true);

  const formatRupiah = (num) => {
    if (typeof num !== "number") return "Rp 0,00";
    return "Rp " + num.toLocaleString("id-ID") + ",00";
  };

  const statusColor =
    status === "UP" ? "text-green-500"
    : status === "DOWN" ? "text-red-500"
    : "text-gray-400";

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-6 h-52 w-full">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-24 mb-8"></div>
          <div className="h-3 bg-gray-200 rounded w-20 mb-2"></div>
          <div className="h-7 bg-gray-200 rounded w-48 mb-6"></div>
          <div className="h-5 bg-gray-100 rounded w-52"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 h-52 w-full flex flex-col justify-between">
      <p className="text-sm font-semibold text-gray-800">{title}</p>

      <div>
        <p className="text-xs text-gray-400 mb-1">Total Income</p>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold text-gray-900 tracking-tight">
            {isVisible ? formatRupiah(amount) : "Rp ••••••••"}
          </span>
          <button
            onClick={() => setIsVisible(!isVisible)}
            className="text-gray-400 hover:text-gray-600"
          >
            {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        <div className="bg-gray-50 rounded-lg px-3 py-1.5 w-fit text-xs">
          <span className="text-gray-500">
            {status === "UP" ? "Higher" : status === "DOWN" ? "Lower" : "Same as"}{" "}
            than last week by{" "}
            <span className={statusColor + " font-medium"}>
              {isVisible
                ? `${status === "UP" ? "+" : "-"} ${formatRupiah(Math.abs(difference))}`
                : "Rp •••••"}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
