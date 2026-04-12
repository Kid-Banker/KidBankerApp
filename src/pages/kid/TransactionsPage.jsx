import { useEffect, useState } from "react";
import { Wallet, ChevronRight } from "lucide-react";
import kidService from "../../services/kidService";

function formatRupiah(num) {
  if (typeof num !== "number") return "-";
  return "Rp " + num.toLocaleString("id-ID") + ",00";
}

function formatDate(dateStr) {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [pagination, setPagination] = useState({
    total: 0, per_page: 10, current_page: 1,
    last_page: 1, has_next_page: false, has_prev_page: false,
  });
  const [loading, setLoading] = useState(true);

  // Ambil data transaksi dengan pagination
  const fetchTransactions = async (page = 1) => {
    setLoading(true);
    try {
      const data = await kidService.getTransactions(page, 10);
      setTransactions(data.data || []);
      setPagination(data.pagination || {});
    } catch {
      setTransactions([]);
    }
    setLoading(false);
  };

  useEffect(() => { fetchTransactions(1); }, []);

  const handlePageChange = (page) => {
    if (page < 1 || page > pagination.last_page) return;
    fetchTransactions(page);
  };

  // Buat nomor halaman dengan ellipsis
  const getPageNumbers = () => {
    const pages = [];
    const total = pagination.last_page;
    const current = pagination.current_page;

    if (total <= 5) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);
      if (current > 3) pages.push("...");
      for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
      if (current < total - 2) pages.push("...");
      pages.push(total);
    }
    return pages;
  };

  return (
    <div className="min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
        <p className="text-sm text-gray-400 mt-1">Traces of your saving adventure today</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-4 px-6 text-xs font-semibold text-gray-500">Description</th>
              <th className="py-4 px-6 text-xs font-semibold text-gray-500 text-center">Type</th>
              <th className="py-4 px-6 text-xs font-semibold text-gray-500 text-center">Amount</th>
              <th className="py-4 px-6 text-xs font-semibold text-gray-500 text-right">Transaction Date</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="py-4 px-6"><div className="flex items-center gap-3 animate-pulse"><div className="w-8 h-8 bg-gray-100 rounded-lg"></div><div className="h-3.5 bg-gray-200 rounded w-36"></div></div></td>
                    <td className="py-4 px-6 text-center"><div className="h-5 bg-gray-200 rounded w-16 mx-auto animate-pulse"></div></td>
                    <td className="py-4 px-6 text-center"><div className="h-3.5 bg-gray-200 rounded w-20 mx-auto animate-pulse"></div></td>
                    <td className="py-4 px-6 text-right"><div className="h-3.5 bg-gray-200 rounded w-20 ml-auto animate-pulse"></div></td>
                  </tr>
                ))
              : transactions.length === 0
                ? (
                  <tr><td colSpan={4} className="text-center py-12 text-gray-400 text-sm">No transactions found</td></tr>
                )
                : transactions.map((item, idx) => (
                    <tr key={item.id || idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center">
                            <Wallet size={14} className="text-gray-400" />
                          </div>
                          <span className="text-xs text-gray-700 font-medium">{item.description}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`px-4 py-1 rounded text-[10px] font-bold tracking-wide border ${item.type === "INCOME" ? "bg-green-50 text-green-600 border-green-100" : "bg-red-50 text-red-600 border-red-100"}`}>
                          {item.type}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center text-xs text-gray-700 font-medium">{formatRupiah(item.amount)}</td>
                      <td className="py-4 px-6 text-right text-xs text-gray-500">{formatDate(item.created_at)}</td>
                    </tr>
                  ))}
          </tbody>
        </table>

        {!loading && (
          <div className="flex justify-between items-center px-6 py-4 border-t border-gray-100">
            <span className="text-xs text-blue-500">
              Showing {transactions.length > 0 ? (pagination.current_page - 1) * pagination.per_page + 1 : 0} to {Math.min(pagination.current_page * pagination.per_page, pagination.total)} of {pagination.total} transactions
            </span>
            <div className="flex items-center gap-1">
              {getPageNumbers().map((p, i) =>
                p === "..." ? (
                  <span key={`e-${i}`} className="w-8 h-8 flex items-center justify-center text-xs text-gray-400">...</span>
                ) : (
                  <button key={p} onClick={() => handlePageChange(p)} className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-colors ${p === pagination.current_page ? "bg-blue-500 text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}>
                    {p}
                  </button>
                ),
              )}
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 text-gray-400 hover:bg-gray-100 disabled:opacity-40" onClick={() => handlePageChange(pagination.current_page + 1)} disabled={!pagination.has_next_page}>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
