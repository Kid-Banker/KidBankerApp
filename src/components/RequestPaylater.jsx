import { Wallet } from "lucide-react";

function getStatusColor(status) {
  if (status === "PENDING") return "bg-amber-50 text-amber-600 border-amber-100";
  if (status === "APPROVED") return "bg-green-50 text-green-600 border-green-100";
  if (status === "REJECTED") return "bg-red-50 text-red-600 border-red-100";
  return "bg-gray-100 text-gray-500 border-gray-200";
}

function formatDate(dateStr) {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function RequestPaylater({ data = [], loading }) {
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl border border-gray-100">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-36 mb-6"></div>
          <div className="space-y-1">
            <div className="flex py-3 border-b border-gray-50">
              <div className="h-3 bg-gray-200 rounded w-24 flex-1"></div>
              <div className="h-3 bg-gray-200 rounded w-16 mx-auto"></div>
              <div className="h-3 bg-gray-200 rounded w-20 ml-auto"></div>
            </div>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center py-4">
                <div className="h-4 bg-gray-200 rounded w-40 flex-1"></div>
                <div className="h-5 bg-gray-200 rounded w-18 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded w-20 ml-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100">
      <p className="text-sm font-semibold text-gray-800 mb-4">Request Paylater</p>
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left min-w-[400px]">
          <thead>
            <tr className="text-xs text-gray-400 border-b border-gray-100">
              <th className="pb-3 font-medium">Description</th>
              <th className="pb-3 font-medium text-center">Status</th>
              <th className="pb-3 font-medium text-right">Requested At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {Array.isArray(data) && data.length > 0 ? (
              data.map((item, i) => (
                <tr key={i}>
                  <td className="py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 bg-gray-50 rounded-lg shrink-0">
                        <Wallet size={14} className="text-gray-400" />
                      </div>
                      <span className="text-xs text-gray-700 font-medium whitespace-nowrap">{item.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 text-center px-4">
                    <span className={`px-3 py-1 rounded text-[10px] font-bold tracking-wide border whitespace-nowrap ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right text-xs text-gray-500 whitespace-nowrap">
                    {formatDate(item.created_at || item.deadline)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center text-gray-400 py-6 text-xs">
                  No paylater requests
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
