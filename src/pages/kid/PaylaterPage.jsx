import { useEffect, useState } from "react";
import { EyeOff, Eye, CalendarDays, Wallet, ChevronRight, UserRound } from "lucide-react";
import kidService from "../../services/kidService";

function formatRupiah(num) {
  if (typeof num !== "number") return "-";
  return "Rp " + num.toLocaleString("id-ID") + ",00";
}

function formatDate(dateStr) {
  if (!dateStr || dateStr === "-") return "-";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function PaylaterPage() {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({ approved: 0, pending: 0, rejected: 0 });
  const [reminder, setReminder] = useState(null);
  const [paylaters, setPaylaters] = useState([]);
  const [showAmount, setShowAmount] = useState(true);
  const [pagination, setPagination] = useState({
    total: 0, per_page: 10, current_page: 1,
    last_page: 1, has_next_page: false, has_prev_page: false,
  });

  // Form state
  const [amount, setAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [desc, setDesc] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [profile, setProfile] = useState({});

  // Ambil data paylater secara paralel
  const fetchAll = async () => {
    const results = await Promise.allSettled([
      kidService.getPaylaterStatus(),
      kidService.getPaylaterReminder(),
      kidService.getPaylaterOverview(),
      kidService.getProfile({ skipGlobalErrorHandler: true }),
    ]);

    if (results[0].status === "fulfilled") {
      const d = results[0].value;
      setStatus({ approved: d.approved_count || 0, pending: d.pending_count || 0, rejected: d.rejected_count || 0 });
    }
    if (results[1].status === "fulfilled") setReminder(results[1].value);
    if (results[2].status === "fulfilled") {
      const val = results[2].value;
      if (val?.data) {
        setPaylaters(Array.isArray(val.data) ? val.data : []);
        if (val.pagination) setPagination(val.pagination);
      } else {
        setPaylaters(Array.isArray(val) ? val : []);
      }
    }
    if (results[3]?.status === "fulfilled") setProfile(results[3].value);

    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  // Kirim request paylater baru
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");
    if (!amount || !deadline || !desc) {
      setFormError("All fields are required");
      return;
    }
    setFormLoading(true);
    try {
      await kidService.requestPaylater({ name: desc, description: desc, amount: Number(amount), deadline });
      setFormSuccess("Paylater request successful!");
      setAmount(""); setDeadline(""); setDesc("");
      setLoading(true);
      fetchAll();
    } catch (err) {
      setFormError(err.response?.data?.message || "Failed to request paylater");
    }
    setFormLoading(false);
  };

  // Buat nomor halaman dengan ellipsis
  const getPageNumbers = () => {
    const pages = [];
    const total = pagination.last_page;
    const current = pagination.current_page;
    if (total <= 5) { for (let i = 1; i <= total; i++) pages.push(i); }
    else {
      pages.push(1);
      if (current > 3) pages.push("...");
      for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
      if (current < total - 2) pages.push("...");
      pages.push(total);
    }
    return pages;
  };

  const handlePageChange = (page) => { if (page < 1 || page > pagination.last_page) return; };

  return (
    <div className="min-h-screen">
      {/* Mobile Profile Header */}
      <div className="dash:hidden mb-6 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shrink-0">
            {profile.photo ? (
              <img src={profile.photo} relative="true" alt="profile" className="w-full h-full object-cover" />
            ) : (
              <UserRound className="w-8 h-8 text-gray-500" />
            )}
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold text-gray-800 text-[18px] leading-tight">{profile.name || "Kid Name"}</h2>
          </div>
        </div>
        
        <div className="mt-2 text-sm text-gray-500">
           <p>Parent Name : {profile.parent_name || "-"}</p>
           <p>Parent Code : {profile.parent_code && profile.parent_code !== "-" ? profile.parent_code : "-"}</p>
        </div>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Pay Later</h1>
        <p className="text-sm text-gray-400 mt-1">Traces of your saving adventure today</p>
      </div>

      <div className="grid grid-cols-12 gap-5 mb-5">
        {/* Kartu status paylater */}
        <div className="col-span-12 dash:col-span-4 bg-white rounded-2xl border border-gray-100 p-6 h-52 flex flex-col justify-between">
          {loading ? (
            <div className="animate-pulse"><div className="h-4 bg-gray-200 rounded w-28 mb-8"></div><div className="h-3 bg-gray-200 rounded w-24 mb-2"></div><div className="h-8 bg-gray-200 rounded w-10 mb-6"></div><div className="space-y-2"><div className="h-5 bg-gray-200 rounded w-32"></div><div className="h-5 bg-gray-200 rounded w-32"></div></div></div>
          ) : (
            <>
              <p className="text-sm font-semibold text-gray-800">Paylater Status</p>
              <div>
                <p className="text-xs text-gray-400 mb-1">Approved Paylater</p>
                <p className="text-4xl font-bold text-gray-900 mb-4">{status.approved}</p>
                <div className="flex flex-col gap-1.5">
                  <span className="bg-gray-50 text-xs px-3 py-1.5 rounded-lg w-fit"><span className="text-green-500 font-medium">{status.pending}</span> <span className="text-gray-500">pending paylaters</span></span>
                  <span className="bg-gray-50 text-xs px-3 py-1.5 rounded-lg w-fit"><span className="text-red-500 font-medium">{status.rejected}</span> <span className="text-gray-500">rejected paylaters</span></span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Kartu reminder paylater */}
        <div className="col-span-12 dash:col-span-4 bg-white rounded-2xl border border-gray-100 p-6 h-52 flex flex-col justify-between">
          {loading ? (
            <div className="animate-pulse"><div className="h-4 bg-gray-200 rounded w-32 mb-8"></div><div className="h-3 bg-gray-200 rounded w-20 mb-2"></div><div className="h-7 bg-gray-200 rounded w-44 mb-6"></div><div className="space-y-2"><div className="h-5 bg-gray-200 rounded w-36"></div><div className="h-5 bg-gray-200 rounded w-40"></div></div></div>
          ) : (
            <>
              <p className="text-sm font-semibold text-gray-800">Paylater Reminder</p>
              <div>
                <p className="text-xs text-gray-400 mb-1">Total Income</p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-gray-900 tracking-tight">{showAmount ? formatRupiah(reminder?.amount ?? 0) : "Rp ••••••••"}</span>
                  <button onClick={() => setShowAmount((v) => !v)} className="text-gray-400 hover:text-gray-600">{showAmount ? <EyeOff size={16} /> : <Eye size={16} />}</button>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-1.5 w-fit text-xs text-gray-600"><CalendarDays size={12} /><span>Due on {formatDate(reminder?.deadline)}</span></div>
                  <span className="bg-gray-50 text-xs px-3 py-1.5 rounded-lg w-fit"><span className="text-red-500 font-medium">{reminder?.total_upcoming ?? 0}</span> <span className="text-gray-500">paylater scheduled next</span></span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Form request paylater */}
        <div className="col-span-12 dash:col-span-4 bg-white rounded-2xl border border-gray-100 p-6 h-52 flex flex-col">
          <p className="text-sm font-semibold text-gray-800 mb-3">Quick Action</p>
          <form onSubmit={handleSubmit} className="flex flex-col flex-1 justify-between">
            <div>
              <div className="flex gap-2 mb-2">
                <div className="flex items-center bg-[#F3F3F3] rounded-lg overflow-hidden flex-1">
                  <div className="bg-[#E4E4E4] px-3 py-2 text-xs text-gray-600 font-medium border-r border-gray-200">Rp</div>
                  <input type="number" className="w-full px-2.5 py-2 text-xs font-medium rounded-r-lg outline-none bg-transparent text-gray-700 placeholder-gray-400" placeholder="15000" value={amount} onChange={(e) => setAmount(e.target.value)} min={1} disabled={formLoading} required />
                </div>
                <div className="flex items-center bg-[#F3F3F3] rounded-lg overflow-hidden">
                  <div className="bg-[#E4E4E4] px-2.5 py-2 text-gray-600 border-r border-gray-200"><CalendarDays size={14} /></div>
                  <input type="date" className="px-2 py-2 text-xs bg-transparent outline-none text-gray-700" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
                </div>
              </div>
              <textarea className="w-full px-3 py-2 text-xs bg-[#F3F3F3] rounded-lg outline-none text-gray-700 placeholder-gray-400 resize-none h-12" placeholder="Description..." value={desc} onChange={(e) => setDesc(e.target.value)} disabled={formLoading} required />
            </div>
            {formError && <div className="text-red-500 text-[10px] mb-1">{formError}</div>}
            {formSuccess && <div className="text-green-500 text-[10px] mb-1">{formSuccess}</div>}
            <button type="submit" className="w-full bg-[#2563EB] hover:bg-blue-700 text-white py-2.5 rounded-xl text-xs font-semibold transition-colors" disabled={formLoading}>
              {formLoading ? "Requesting..." : "+ Request Paylater"}
            </button>
          </form>
        </div>
      </div>

      {/* Tabel daftar paylater */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-4 px-6 text-xs font-semibold text-gray-500">Description</th>
              <th className="py-4 px-6 text-xs font-semibold text-gray-500 text-center">Status</th>
              <th className="py-4 px-6 text-xs font-semibold text-gray-500 text-center">Amount</th>
              <th className="py-4 px-6 text-xs font-semibold text-gray-500 text-right">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="py-4 px-6"><div className="flex items-center gap-3 animate-pulse"><div className="w-8 h-8 bg-gray-100 rounded-lg"></div><div className="h-3.5 bg-gray-200 rounded w-36"></div></div></td>
                  <td className="py-4 px-6 text-center"><div className="h-5 bg-gray-200 rounded w-16 mx-auto animate-pulse"></div></td>
                  <td className="py-4 px-6 text-center"><div className="h-3.5 bg-gray-200 rounded w-20 mx-auto animate-pulse"></div></td>
                  <td className="py-4 px-6 text-right"><div className="h-3.5 bg-gray-200 rounded w-20 ml-auto animate-pulse"></div></td>
                </tr>
              ))
            ) : paylaters.length === 0 ? (
              <tr><td colSpan={4} className="text-center py-12 text-gray-400 text-sm">No paylater found</td></tr>
            ) : (
              paylaters.map((item, idx) => (
                <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center"><Wallet size={14} className="text-gray-400" /></div>
                      <span className="text-xs text-gray-700 font-medium">{item.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className={`px-4 py-1 rounded text-[10px] font-bold tracking-wide border ${item.status === "APPROVED" ? "bg-green-50 text-green-600 border-green-100" : item.status === "PENDING" ? "bg-amber-50 text-amber-600 border-amber-100" : "bg-red-50 text-red-600 border-red-100"}`}>{item.status}</span>
                  </td>
                  <td className="py-4 px-6 text-center text-xs text-gray-700 font-medium">{formatRupiah(item.amount)}</td>
                  <td className="py-4 px-6 text-right text-xs text-gray-500">{formatDate(item.deadline)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>

        {!loading && pagination.last_page > 1 && (
          <div className="flex justify-between items-center px-6 py-4 border-t border-gray-100">
            <span className="text-xs text-blue-500">Showing {paylaters.length > 0 ? (pagination.current_page - 1) * pagination.per_page + 1 : 0} to {Math.min(pagination.current_page * pagination.per_page, pagination.total)} of {pagination.total} transactions</span>
            <div className="flex items-center gap-1">
              {getPageNumbers().map((p, i) => p === "..." ? (<span key={`e-${i}`} className="w-8 h-8 flex items-center justify-center text-xs text-gray-400">...</span>) : (<button key={p} onClick={() => handlePageChange(p)} className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-colors ${p === pagination.current_page ? "bg-blue-500 text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}>{p}</button>))}
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 text-gray-400 hover:bg-gray-100 disabled:opacity-40" onClick={() => handlePageChange(pagination.current_page + 1)} disabled={!pagination.has_next_page}><ChevronRight size={14} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
