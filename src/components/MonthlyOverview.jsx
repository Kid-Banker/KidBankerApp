import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#3b82f6", "#a3e635"];

export default function MonthlyOverview({ dataPie = [], monthLabel = "-", loading }) {
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl border border-gray-100 h-full">
        <div className="animate-pulse">
          <div className="flex justify-between mb-4">
            <div className="h-4 bg-gray-200 rounded w-32"></div>
            <div className="h-4 bg-gray-200 rounded w-10"></div>
          </div>
          <div className="flex justify-center my-6">
            <div className="w-44 h-44 bg-gray-100 rounded-full"></div>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="h-3 bg-gray-200 rounded w-16"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 h-full flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <p className="text-sm font-semibold text-gray-800">Monthly Overview</p>
        <span className="text-xs text-gray-400 font-medium">{monthLabel}</span>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full h-52">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={dataPie} innerRadius={0} outerRadius={85} paddingAngle={0} dataKey="value">
                {dataPie.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="flex justify-center gap-6 mt-2">
        <div className="flex items-center gap-1.5 text-xs text-gray-600">
          <div className="w-2 h-2 rounded-full bg-blue-500" />
          Income
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-600">
          <div className="w-2 h-2 rounded-full bg-lime-400" />
          Expense
        </div>
      </div>
    </div>
  );
}
