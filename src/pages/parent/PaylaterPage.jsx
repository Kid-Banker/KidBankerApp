import { useEffect, useState } from "react";
import { EyeOff, Eye, CalendarDays, Wallet, Check, X, ChevronRight, AlertCircle, CheckCircle2, UserRound } from "lucide-react";
import parentService from "../../services/parentService";

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

  // State modal konfirmasi approve/reject
  const [modal, setModal] = useState({
    open: false,
    type: "", // "approve" | "reject"
    item: null,
    loading: false,
    success: "",
    error: "",
  });

  const [profile, setProfile] = useState({});

  // Ambil data paylater secara paralel
  const fetchAll = async () => {
    const results = await Promise.allSettled([
      parentService.getPaylaterStatus(),
      parentService.getPaylaterReminder(),
      parentService.getPaylaterOverview(),
      parentService.getProfile({ skipGlobalErrorHandler: true }),
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

  // Buka modal konfirmasi
  const openModal = (type, item) => {
    setModal({ open: true, type, item, loading: false, success: "", error: "" });
  };

  // Tutup modal dan reset state
  const closeModal = () => {
    setModal({ open: false, type: "", item: null, loading: false, success: "", error: "" });
  };

  // Eksekusi aksi approve/reject dari modal
  const handleConfirm = async () => {
    const { type, item } = modal;
    if (!item) return;

    setModal((prev) => ({ ...prev, loading: true, error: "" }));

    try {
      if (type === "approve") {
        await parentService.approvePaylater(item.id);
        setModal((prev) => ({
          ...prev,
          loading: false,
          success: "Paylater has been approved successfully and a reminder has been added to Google Calendar.",
        }));
      } else {
        await parentService.rejectPaylater(item.id);
        setModal((prev) => ({
          ...prev,
          loading: false,
          success: "Paylater has been rejected successfully.",
        }));
      }
      // Refresh data di background
      setLoading(true);
      fetchAll();

      // Tutup modal otomatis setelah 2.5 detik
      setTimeout(() => { closeModal(); }, 2500);
    } catch (err) {
      setModal((prev) => ({
        ...prev,
        loading: false,
        error: err.response?.data?.message || `Failed to ${type} paylater. Please try again.`,
      }));
    }
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > pagination.last_page) return;
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
            <h2 className="font-bold text-gray-800 text-[18px] leading-tight">{profile.name || "Parent Name"}</h2>
          </div>
        </div>
        
        <div className="mt-2 text-sm text-gray-500">
           <p>Kid Name : {profile.kid_name || "-"}</p>
           <p>Parent Code : {profile.parent_code && profile.parent_code !== "-" ? profile.parent_code : "-"}</p>
        </div>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Pay Later</h1>
        <p className="text-sm text-gray-400 mt-1">Traces of your kid saving adventure today</p>
      </div>

      <div className="grid grid-cols-12 gap-5 mb-5">
        {/* Kartu status paylater */}
        <div className="col-span-12 dash:col-span-6 bg-white rounded-2xl border border-gray-100 p-6 h-52 flex flex-col justify-between">
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
        <div className="col-span-12 dash:col-span-6 bg-white rounded-2xl border border-gray-100 p-6 h-52 flex flex-col justify-between">
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
      </div>

      {/* Tabel daftar paylater dengan aksi approve/reject */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-4 px-6 text-xs font-semibold text-gray-500">Description</th>
              <th className="py-4 px-6 text-xs font-semibold text-gray-500 text-center">Status</th>
              <th className="py-4 px-6 text-xs font-semibold text-gray-500 text-center">Amount</th>
              <th className="py-4 px-6 text-xs font-semibold text-gray-500 text-center">Due Date</th>
              <th className="py-4 px-6 text-xs font-semibold text-gray-500 text-center">Approved At</th>
              <th className="py-4 px-6 text-xs font-semibold text-gray-500 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="py-4 px-6"><div className="flex items-center gap-3 animate-pulse"><div className="w-8 h-8 bg-gray-100 rounded-lg"></div><div className="h-3.5 bg-gray-200 rounded w-36"></div></div></td>
                  <td className="py-4 px-6 text-center"><div className="h-5 bg-gray-200 rounded w-16 mx-auto animate-pulse"></div></td>
                  <td className="py-4 px-6 text-center"><div className="h-3.5 bg-gray-200 rounded w-20 mx-auto animate-pulse"></div></td>
                  <td className="py-4 px-6 text-center"><div className="h-3.5 bg-gray-200 rounded w-20 mx-auto animate-pulse"></div></td>
                  <td className="py-4 px-6 text-center"><div className="h-3.5 bg-gray-200 rounded w-20 mx-auto animate-pulse"></div></td>
                  <td className="py-4 px-6 text-center"><div className="h-3.5 bg-gray-200 rounded w-14 mx-auto animate-pulse"></div></td>
                </tr>
              ))
            ) : paylaters.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-12 text-gray-400 text-sm">No paylater found</td></tr>
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
                  <td className="py-4 px-6 text-center text-xs text-gray-500">{formatDate(item.deadline)}</td>
                  <td className="py-4 px-6 text-center text-xs text-gray-500">{item.approved_at ? formatDate(item.approved_at) : "-"}</td>
                  <td className="py-4 px-6 text-center">
                    {item.status === "PENDING" ? (
                      <div className="flex gap-2 justify-center">
                        <button className="w-7 h-7 bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg flex items-center justify-center text-green-600 transition-colors" onClick={() => openModal("approve", item)} title="Approve"><Check size={14} /></button>
                        <button className="w-7 h-7 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg flex items-center justify-center text-red-500 transition-colors" onClick={() => openModal("reject", item)} title="Reject"><X size={14} /></button>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400">-</span>
                    )}
                  </td>
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

      {/* Modal konfirmasi approve/reject */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => { if (!modal.loading) closeModal(); }} />

          {/* Konten modal */}
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6 animate-[fadeIn_0.2s_ease-out]">
            {/* Tampilan sukses */}
            {modal.success ? (
              <div className="flex flex-col items-center text-center py-4">
                <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-7 h-7 text-green-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Success</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{modal.success}</p>
              </div>
            ) : (
              <>
                {/* Header modal */}
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-bold text-gray-900">
                    {modal.type === "approve" ? "Approve Paylater" : "Reject Paylater"}
                  </h3>
                  <button
                    onClick={closeModal}
                    disabled={modal.loading}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 transition-colors disabled:opacity-50"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Detail paylater */}
                <div className="bg-gray-50 rounded-xl p-4 mb-5 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-400">Description</span>
                    <span className="text-xs font-semibold text-gray-700">{modal.item?.name || "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-400">Amount</span>
                    <span className="text-xs font-semibold text-gray-700">{formatRupiah(modal.item?.amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-400">Due Date</span>
                    <span className="text-xs font-semibold text-gray-700">{formatDate(modal.item?.deadline)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-gray-400">Current Status</span>
                    <span className="px-3 py-0.5 rounded text-[10px] font-bold tracking-wide bg-amber-50 text-amber-600 border border-amber-100">PENDING</span>
                  </div>
                </div>

                {/* Pesan konfirmasi */}
                <p className="text-sm text-gray-500 mb-5">
                  {modal.type === "approve"
                    ? "Are you sure you want to approve this paylater request? A reminder will be added to Google Calendar."
                    : "Are you sure you want to reject this paylater request? This action cannot be undone."}
                </p>

                {/* Pesan error */}
                {modal.error && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-lg px-4 py-3 mb-5">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                    <p className="text-xs text-red-600">{modal.error}</p>
                  </div>
                )}

                {/* Tombol aksi */}
                <div className="flex gap-3">
                  <button
                    onClick={closeModal}
                    disabled={modal.loading}
                    className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirm}
                    disabled={modal.loading}
                    className={`flex-1 px-4 py-2.5 text-sm font-medium text-white rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2 ${
                      modal.type === "approve"
                        ? "bg-blue-500 hover:bg-blue-600"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    {modal.loading ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Processing...
                      </>
                    ) : modal.type === "approve" ? (
                      "Approve"
                    ) : (
                      "Reject"
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

