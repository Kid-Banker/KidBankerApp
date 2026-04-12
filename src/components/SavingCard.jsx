import { useState } from "react";
import { EyeOff, Eye, Wallet } from "lucide-react";

export default function SavingCard({
  title = "My Savings",
  total_balance,
  last_income,
  last_expense,
  loading,
}) {
  const [isVisible, setIsVisible] = useState(true);

  const formatRupiah = (num) => {
    if (typeof num !== "number") return "Rp 0,00";
    return "Rp " + num.toLocaleString("id-ID") + ",00";
  };

  // Tampilkan skeleton saat loading
  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-6 h-52 w-full">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-24 mb-8"></div>
          <div className="h-3 bg-gray-200 rounded w-20 mb-2"></div>
          <div className="h-7 bg-gray-200 rounded w-48 mb-6"></div>
          <div className="space-y-2">
            <div className="h-5 bg-gray-100 rounded w-44"></div>
            <div className="h-5 bg-gray-100 rounded w-44"></div>
          </div>
        </div>
      </div>
    );
  }

  const balance =
    typeof total_balance === "number" ? formatRupiah(total_balance) : "Rp 0,00";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 h-52 w-full flex flex-col justify-between">
      <p className="text-sm font-semibold text-gray-800">{title}</p>

      <div>
        <p className="text-xs text-gray-400 mb-1">Total Balance</p>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold text-gray-900 tracking-tight">
            {isVisible ? balance : "Rp ••••••••"}
          </span>
          <button
            onClick={() => setIsVisible(!isVisible)}
            className="text-gray-400 hover:text-gray-600"
          >
            {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-1.5 w-fit text-xs">
            <Wallet size={12} className="text-gray-500" />
            <span className="text-gray-500">Last earned</span>
            <span className="text-green-500 font-medium">
              + {formatRupiah(last_income)}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-1.5 w-fit text-xs">
            <Wallet size={12} className="text-gray-500" />
            <span className="text-gray-500">Last spent</span>
            <span className="text-red-500 font-medium">
              - {formatRupiah(last_expense)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
