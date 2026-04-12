import { useState } from "react";
import { EyeOff, Eye, Wallet } from "lucide-react";

export default function WeeklyReportCard({
  thisWeek = 0,
  incomeCount = 0,
  difference = 0,
  status = "SAME",
  loading,
}) {
  const [showIncome, setShowIncome] = useState(true);

  const formatRupiah = (num) => `Rp ${num.toLocaleString("id-ID")},00`;

  const statusColor =
    status === "UP" ? "text-green-500"
    : status === "DOWN" ? "text-red-500"
    : "text-gray-400";

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-6 h-52 w-full">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-28 mb-8"></div>
          <div className="h-3 bg-gray-200 rounded w-20 mb-2"></div>
          <div className="h-7 bg-gray-200 rounded w-48 mb-6"></div>
          <div className="space-y-2">
            <div className="h-5 bg-gray-100 rounded w-44"></div>
            <div className="h-5 bg-gray-100 rounded w-52"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 h-52 w-full flex flex-col justify-between">
      <p className="text-sm font-semibold text-gray-800">Weekly Report</p>

      <div>
        <p className="text-xs text-gray-400 mb-1">Total Income</p>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold text-gray-900 tracking-tight">
            {showIncome ? formatRupiah(thisWeek) : "Rp ••••••••"}
          </span>
          <button
            onClick={() => setShowIncome(!showIncome)}
            className="text-gray-400 hover:text-gray-600"
          >
            {showIncome ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-1.5 w-fit text-xs">
            <Wallet size={12} className="text-gray-500" />
            <span className="text-green-500 font-medium">+{incomeCount} Income</span>
            <span className="text-gray-500">Transactions</span>
          </div>
          <div className="bg-gray-50 rounded-lg px-3 py-1.5 w-fit text-xs">
            <span className="text-gray-500">
              {status === "UP" ? "Higher" : status === "DOWN" ? "Lower" : "Same as"}{" "}
              than last week by{" "}
              <span className={statusColor + " font-medium"}>
                {showIncome
                  ? `${difference >= 0 ? "+" : "-"} ${formatRupiah(Math.abs(difference))}`
                  : "Rp •••••"}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
