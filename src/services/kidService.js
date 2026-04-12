import api from "../lib/axios";

// Kumpulan endpoint API untuk role KID
const kidService = {
  getProfile: (config = {}) =>
    api.get("/api/kid/profile", config).then((res) => res.data),

  getMySavings: () =>
    api.get("/api/kid/my-savings").then((res) => res.data),

  getWeeklyIncome: () =>
    api.get("/api/kid/weekly-income").then((res) => res.data),

  getWeeklyExpense: () =>
    api.get("/api/kid/weekly-expense").then((res) => res.data),

  getWeeklyReport: () =>
    api.get("/api/kid/weekly-report").then((res) => res.data),

  getWeeklyTransactions: () =>
    api.get("/api/kid/weekly-transactions").then((res) => res.data),

  getMonthlyOverview: () =>
    api.get("/api/kid/monthly-overview").then((res) => res.data),

  getPaylaterOverview: () =>
    api.get("/api/kid/paylater-overview").then((res) => res.data),

  getPaylaterReminder: () =>
    api.get("/api/kid/paylater-reminder").then((res) => res.data),

  getPaylaterStatus: () =>
    api.get("/api/kid/paylater-status").then((res) => res.data),

  getLastTransactions: () =>
    api.get("/api/kid/last-transactions").then((res) => res.data),

  getTransactions: (page = 1, limit = 10) =>
    api
      .get("/api/kid/transactions", { params: { page, limit } })
      .then((res) => res.data),

  addTransaction: (data) =>
    api.post("/api/finance/transactions", data).then((res) => res.data),

  requestPaylater: (data) =>
    api.post("/api/paylater/request", data).then((res) => res.data),
};

export default kidService;
