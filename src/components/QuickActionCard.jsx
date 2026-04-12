import { useState } from "react";
import { ChevronDown } from "lucide-react";
import api from "../lib/axios";

export default function QuickActionCard({ onSuccess }) {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("INCOME");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Kirim transaksi baru ke API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("Amount must be a number > 0");
      return;
    }
    if (!description.trim()) {
      setError("Description cannot be empty");
      return;
    }

    setLoading(true);
    try {
      await api.post("/api/finance/transactions", {
        type,
        amount: Number(amount),
        description,
      });
      setSuccess("Transaction added successfully!");
      setAmount("");
      setDescription("");
      if (onSuccess) onSuccess();
    } catch (e) {
      setError(e.response?.data?.message || "Failed to connect to the server");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 h-52 w-full flex flex-col">
      <p className="text-sm font-semibold text-gray-800 mb-3">Quick Action</p>
      <form onSubmit={handleSubmit} className="flex flex-col flex-1 justify-between">
        <div>
          <div className="flex gap-2 mb-2">
            <div className="flex items-center bg-[#F3F3F3] rounded-lg overflow-hidden flex-1">
              <div className="bg-[#E4E4E4] px-3 py-2 text-xs text-gray-600 font-medium border-r border-gray-200">
                Rp
              </div>
              <input
                type="number"
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="15000"
                className="w-full px-2.5 py-2 text-xs font-medium rounded-r-lg outline-none bg-transparent text-gray-700 placeholder-gray-400"
              />
            </div>
            <div className="relative">
              <select
                className="appearance-none bg-[#F3F3F3] text-xs font-medium text-gray-700 px-3 py-2 pr-7 rounded-lg outline-none cursor-pointer"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="INCOME">INCOME</option>
                <option value="EXPENSE">EXPENSE</option>
              </select>
              <ChevronDown
                size={12}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
              />
            </div>
          </div>
          <textarea
            placeholder="Description..."
            className="w-full px-3 py-2 text-xs bg-[#F3F3F3] rounded-lg outline-none text-gray-700 placeholder-gray-400 resize-none h-12"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {error && <div className="text-red-500 text-[10px] mb-1">{error}</div>}
        {success && <div className="text-green-600 text-[10px] mb-1">{success}</div>}
        <button
          type="submit"
          className="w-full bg-[#2563EB] hover:bg-blue-700 text-white py-2.5 rounded-xl text-xs font-semibold transition-colors"
          disabled={loading}
        >
          {loading ? "Processing..." : "+ Add Savings"}
        </button>
      </form>
    </div>
  );
}
