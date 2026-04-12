import { useEffect, useState } from "react";
import parentService from "../../services/parentService";
import SavingCard from "../../components/SavingCard";
import WeeklyReportCard from "../../components/WeeklyReportCard";
import MonthlyReportCard from "../../components/MonthlyReportCard";
import TransactionsHistory from "../../components/TransactionsHistory";
import MonthlyOverview from "../../components/MonthlyOverview";
import RequestPaylater from "../../components/RequestPaylater";
import LastTransactions from "../../components/LastTransactions";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [savings, setSavings] = useState(null);
  const [weeklyReport, setWeeklyReport] = useState(null);
  const [monthlyReport, setMonthlyReport] = useState(null);
  const [weeklyChart, setWeeklyChart] = useState([]);
  const [monthlyOverview, setMonthlyOverview] = useState(null);
  const [paylaterOverview, setPaylaterOverview] = useState([]);
  const [lastTransactions, setLastTransactions] = useState([]);

  // Ambil semua data dashboard parent secara paralel
  useEffect(() => {
    async function fetchAll() {
      const results = await Promise.allSettled([
        parentService.getKidSavings(),
        parentService.getWeeklyReport(),
        parentService.getMonthlyReport(),
        parentService.getWeeklyTransactions(),
        parentService.getMonthlyOverview(),
        parentService.getPaylaterOverview(),
        parentService.getLastTransactions(),
      ]);

      if (results[0].status === "fulfilled") setSavings(results[0].value);
      if (results[1].status === "fulfilled") setWeeklyReport(results[1].value);
      if (results[2].status === "fulfilled") setMonthlyReport(results[2].value);
      if (results[3].status === "fulfilled") setWeeklyChart(results[3].value);
      if (results[4].status === "fulfilled") setMonthlyOverview(results[4].value);
      if (results[5].status === "fulfilled") setPaylaterOverview(Array.isArray(results[5].value) ? results[5].value : []);
      if (results[6].status === "fulfilled") setLastTransactions(Array.isArray(results[6].value) ? results[6].value : []);

      setLoading(false);
    }
    fetchAll();
  }, []);

  // Data untuk pie chart bulanan
  const dataPie = [
    { name: "Income", value: monthlyOverview?.income_count || 0 },
    { name: "Expense", value: monthlyOverview?.expense_count || 0 },
  ];

  return (
    <div className="min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-1">Traces of your kid saving adventure today</p>
      </div>

      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-4">
          <SavingCard title="Your Kid Savings" total_balance={savings?.total_balance} last_income={savings?.last_earned} last_expense={savings?.last_spent} loading={loading} />
        </div>
        <div className="col-span-4">
          <WeeklyReportCard thisWeek={weeklyReport?.this_week} incomeCount={weeklyReport?.income_count} difference={weeklyReport?.difference} status={weeklyReport?.status} loading={loading} />
        </div>
        <div className="col-span-4">
          <MonthlyReportCard thisMonth={monthlyReport?.this_month} incomeCount={monthlyReport?.income_count} difference={monthlyReport?.difference} status={monthlyReport?.status} loading={loading} />
        </div>

        <div className="col-span-8">
          <TransactionsHistory data={weeklyChart} loading={loading} />
        </div>
        <div className="col-span-4">
          <MonthlyOverview dataPie={dataPie} monthLabel={monthlyOverview?.month || "-"} loading={loading} />
        </div>

        <div className="col-span-8">
          <RequestPaylater data={paylaterOverview} loading={loading} />
        </div>
        <div className="col-span-4">
          <LastTransactions data={lastTransactions} loading={loading} />
        </div>
      </div>
    </div>
  );
}
