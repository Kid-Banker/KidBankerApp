import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
} from "recharts";

export default function TransactionsHistory({ data = [], loading }) {
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl border border-gray-100">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-36 mb-6"></div>
          <div className="h-64 bg-gray-50 rounded w-full flex items-end justify-around px-4 pb-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="flex gap-1 items-end">
                <div className="w-5 bg-gray-200 rounded-t" style={{ height: `${50 + Math.random() * 40}%` }}></div>
                <div className="w-5 bg-gray-200 rounded-t" style={{ height: `${20 + Math.random() * 30}%` }}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Format data chart dari API
  const chartData = Array.isArray(data)
    ? data.map((item) => ({
        name: item.day || "-",
        income: item.income || 0,
        expense: item.expense || 0,
      }))
    : [];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100">
      <p className="text-sm font-semibold text-gray-800 mb-6">Transactions History</p>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} stroke="#f5f5f5" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12, fontWeight: 500 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 11 }} />
            <Bar dataKey="income" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={18} />
            <Bar dataKey="expense" fill="#a3e635" radius={[4, 4, 0, 0]} barSize={18} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
