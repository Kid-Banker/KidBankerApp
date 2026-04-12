import { useState } from "react";
import { EyeOff, Eye, CalendarDays } from "lucide-react";

export default function PaylaterReminder({ amount, dueDate, loading }) {
  const [isVisible, setIsVisible] = useState(true);

  const formatRupiah = (num) => {
    if (typeof num !== "number") return "-";
    return "Rp " + num.toLocaleString("id-ID") + ",00";
  };

  const formatDate = (dateStr) => {
    if (!dateStr || dateStr === "-") return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl border border-gray-100 w-full">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-32 mb-6"></div>
          <div className="h-3 bg-gray-200 rounded w-16 mb-2"></div>
          <div className="h-7 bg-gray-200 rounded w-44 mb-4"></div>
          <div className="h-5 bg-gray-100 rounded w-36"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 w-full flex flex-col justify-between">
      <p className="text-sm font-semibold text-gray-800 mb-4">Pay Later Reminder</p>
      <div>
        <p className="text-xs text-gray-400 mb-1">Amount</p>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold text-gray-900 tracking-tight">
            {isVisible ? formatRupiah(amount) : "Rp ••••••••"}
          </span>
          <button
            onClick={() => setIsVisible((v) => !v)}
            className="text-gray-400 hover:text-gray-600"
          >
            {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-1.5 w-fit text-xs text-gray-600">
          <CalendarDays size={12} />
          <span>Due on {formatDate(dueDate)}</span>
        </div>
      </div>
    </div>
  );
}
