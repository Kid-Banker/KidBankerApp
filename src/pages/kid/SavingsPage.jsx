import { useEffect, useState } from "react";
import { UserRound } from "lucide-react";
import kidService from "../../services/kidService";
import SavingCard from "../../components/SavingCard";
import MyIncome from "../../components/MyIncome";
import Expense from "../../components/Expense";
import TransactionsHistory from "../../components/TransactionsHistory";
import PaylaterReminder from "../../components/PaylaterReminder";
import QuickActionCard from "../../components/QuickActionCard";

export default function SavingsPage() {
  const [loading, setLoading] = useState(true);
  const [savings, setSavings] = useState(null);
  const [weeklyIncome, setWeeklyIncome] = useState(null);
  const [weeklyExpense, setWeeklyExpense] = useState(null);
  const [weeklyChart, setWeeklyChart] = useState([]);
  const [paylaterReminder, setPaylaterReminder] = useState(null);
  const [profile, setProfile] = useState({});

  // Ambil semua data savings secara paralel
  const fetchAll = async () => {
    const results = await Promise.allSettled([
      kidService.getMySavings(),
      kidService.getWeeklyIncome(),
      kidService.getWeeklyExpense(),
      kidService.getWeeklyTransactions(),
      kidService.getPaylaterReminder(),
      kidService.getProfile({ skipGlobalErrorHandler: true }),
    ]);

    if (results[0].status === "fulfilled") setSavings(results[0].value);
    if (results[1].status === "fulfilled") setWeeklyIncome(results[1].value);
    if (results[2].status === "fulfilled") setWeeklyExpense(results[2].value);
    if (results[3].status === "fulfilled") setWeeklyChart(results[3].value);
    if (results[4].status === "fulfilled") setPaylaterReminder(results[4].value);
    if (results[5]?.status === "fulfilled") setProfile(results[5].value);

    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  // Refresh setelah aksi quick action
  const refreshData = async () => {
    const results = await Promise.allSettled([
      kidService.getMySavings(),
      kidService.getWeeklyIncome(),
      kidService.getWeeklyExpense(),
      kidService.getWeeklyTransactions(),
    ]);
    if (results[0].status === "fulfilled") setSavings(results[0].value);
    if (results[1].status === "fulfilled") setWeeklyIncome(results[1].value);
    if (results[2].status === "fulfilled") setWeeklyExpense(results[2].value);
    if (results[3].status === "fulfilled") setWeeklyChart(results[3].value);
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
            <h2 className="font-bold text-gray-800 text-[18px] leading-tight">{profile.name || "Kid Name"}</h2>
          </div>
        </div>
        
        <div className="mt-2 text-sm text-gray-500">
           <p>Parent Name : {profile.parent_name || "-"}</p>
           <p>Parent Code : {profile.parent_code && profile.parent_code !== "-" ? profile.parent_code : "-"}</p>
        </div>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Savings</h1>
        <p className="text-sm text-gray-400 mt-1">Traces of your saving adventure today</p>
      </div>

      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 dash:col-span-4">
          <SavingCard title="My Savings" total_balance={savings?.total_balance} last_income={savings?.last_income} last_expense={savings?.last_expense} loading={loading} />
        </div>
        <div className="col-span-12 dash:col-span-4">
          <MyIncome title="My Income" amount={weeklyIncome?.this_week} difference={weeklyIncome?.difference} status={weeklyIncome?.status} loading={loading} />
        </div>
        <div className="col-span-12 dash:col-span-4">
          <Expense title="My Expense" amount={weeklyExpense?.this_week} difference={weeklyExpense?.difference} status={weeklyExpense?.status} loading={loading} />
        </div>

        <div className="col-span-12 dash:col-span-8 overflow-hidden">
          <TransactionsHistory data={weeklyChart} loading={loading} />
        </div>
        <div className="col-span-12 dash:col-span-4 flex flex-col gap-5 overflow-hidden">
          <PaylaterReminder amount={paylaterReminder?.amount ?? 0} dueDate={paylaterReminder?.deadline ?? "-"} loading={loading} />
          <QuickActionCard onSuccess={refreshData} />
        </div>
      </div>
    </div>
  );
}
