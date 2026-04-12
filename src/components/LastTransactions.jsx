function getTypeColor(type) {
  if (type === "INCOME") return "bg-gray-100 text-gray-700 border-gray-200";
  if (type === "EXPENSE") return "bg-red-50 text-red-600 border-red-100";
  return "bg-gray-100 text-gray-600 border-gray-200";
}

export default function LastTransactions({ data = [], loading }) {
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl border border-gray-100 h-full">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-32 mb-6"></div>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex justify-between items-center bg-gray-50 rounded-lg p-3">
                <div className="h-3 bg-gray-200 rounded w-28"></div>
                <div className="h-5 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 h-full">
      <p className="text-sm font-semibold text-gray-800 mb-4">Last Transactions</p>
      <div className="space-y-2.5 overflow-y-auto max-h-60 pr-1">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((tx, i) => (
            <div key={i} className="flex justify-between items-center bg-gray-50 rounded-lg px-4 py-2.5">
              <span className="text-xs text-gray-600 truncate mr-3 max-w-[140px]">
                {tx.description}
              </span>
              <span className={`text-[10px] font-bold px-3 py-1 rounded border shrink-0 ${getTypeColor(tx.type)}`}>
                {tx.type}
              </span>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 py-6 text-xs">No transactions</div>
        )}
      </div>
    </div>
  );
}
