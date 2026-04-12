import { useEffect, useState } from "react";
import { UserRound } from "lucide-react";
import kidService from "../../services/kidService";
import SavingCard from "../../components/SavingCard";
import WeeklyReportCard from "../../components/WeeklyReportCard";
import QuickActionCard from "../../components/QuickActionCard";
import TransactionsHistory from "../../components/TransactionsHistory";
import MonthlyOverview from "../../components/MonthlyOverview";
import RequestPaylater from "../../components/RequestPaylater";
import LastTransactions from "../../components/LastTransactions";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [savings, setSavings] = useState(null);
  const [weeklyReport, setWeeklyReport] = useState(null);
  const [weeklyChart, setWeeklyChart] = useState([]);
  const [monthlyOverview, setMonthlyOverview] = useState(null);
  const [paylaterOverview, setPaylaterOverview] = useState([]);
  const [lastTransactions, setLastTransactions] = useState([]);
  const [profile, setProfile] = useState({});

  // Ambil semua data dashboard secara paralel
  const fetchAll = async () => {
    const results = await Promise.allSettled([
      kidService.getMySavings(),
      kidService.getWeeklyReport(),
      kidService.getWeeklyTransactions(),
      kidService.getMonthlyOverview(),
      kidService.getPaylaterOverview(),
      kidService.getLastTransactions(),
      kidService.getProfile({ skipGlobalErrorHandler: true }),
    ]);

    if (results[0].status === "fulfilled") setSavings(results[0].value);
    if (results[1].status === "fulfilled") setWeeklyReport(results[1].value);
    if (results[2].status === "fulfilled") setWeeklyChart(results[2].value);
    if (results[3].status === "fulfilled") setMonthlyOverview(results[3].value);
    if (results[4].status === "fulfilled")
      setPaylaterOverview(
        Array.isArray(results[4].value) ? results[4].value : [],
      );
    if (results[5].status === "fulfilled")
      setLastTransactions(
        Array.isArray(results[5].value) ? results[5].value : [],
      );
    if (results[6]?.status === "fulfilled") setProfile(results[6].value);

    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // Refresh data setelah aksi quick action
  const refreshData = async () => {
    const results = await Promise.allSettled([
      kidService.getMySavings(),
      kidService.getWeeklyReport(),
      kidService.getWeeklyTransactions(),
      kidService.getMonthlyOverview(),
      kidService.getLastTransactions(),
    ]);
    if (results[0].status === "fulfilled") setSavings(results[0].value);
    if (results[1].status === "fulfilled") setWeeklyReport(results[1].value);
    if (results[2].status === "fulfilled") setWeeklyChart(results[2].value);
    if (results[3].status === "fulfilled") setMonthlyOverview(results[3].value);
    if (results[4].status === "fulfilled")
      setLastTransactions(
        Array.isArray(results[4].value) ? results[4].value : [],
      );
  };

  // Data pie chart bulanan
  const dataPie = [
    { name: "Income", value: monthlyOverview?.income_count || 0 },
    { name: "Expense", value: monthlyOverview?.expense_count || 0 },
  ];

  return (
    <div className="min-h-screen">
      {/* Mobile Profile Header */}
      <div className="dash:hidden mb-6 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shrink-0">
            {profile.photo ? (
              <img
                src={profile.photo}
                relative="true"
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <UserRound className="w-8 h-8 text-gray-500" />
            )}
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold text-gray-800 text-[18px] leading-tight">
              {profile.name || "Kid Name"}
            </h2>
          </div>
        </div>

        <div className="mt-2 text-sm text-gray-500">
          <p>Parent Name : {profile.parent_name || "-"}</p>
          <p>
            Parent Code :{" "}
            {profile.parent_code && profile.parent_code !== "-"
              ? profile.parent_code
              : "-"}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-1">
          Traces of your saving adventure today
        </p>
      </div>

      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 dash:col-span-4">
          <SavingCard
            title="My Savings"
            total_balance={savings?.total_balance}
            last_income={savings?.last_income}
            last_expense={savings?.last_expense}
            loading={loading}
          />
        </div>
        <div className="col-span-12 dash:col-span-4">
          <WeeklyReportCard
            thisWeek={weeklyReport?.this_week}
            incomeCount={weeklyReport?.income_count}
            difference={weeklyReport?.difference}
            status={weeklyReport?.status}
            loading={loading}
          />
        </div>
        <div className="col-span-12 dash:col-span-4">
          <QuickActionCard onSuccess={refreshData} />
        </div>

        <div className="col-span-12 dash:col-span-8 overflow-hidden">
          <TransactionsHistory data={weeklyChart} loading={loading} />
        </div>
        <div className="col-span-12 dash:col-span-4">
          <MonthlyOverview
            dataPie={dataPie}
            monthLabel={monthlyOverview?.month || "-"}
            loading={loading}
          />
        </div>

        <div className="col-span-12 dash:col-span-8 overflow-hidden">
          <RequestPaylater data={paylaterOverview} loading={loading} />
        </div>
        <div className="col-span-12 dash:col-span-4 overflow-hidden">
          <LastTransactions data={lastTransactions} loading={loading} />
        </div>
      </div>
    </div>
  );
}
