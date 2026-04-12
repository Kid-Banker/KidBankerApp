import api from "../lib/axios";

// Kumpulan endpoint API untuk role PARENT
const parentService = {
  getProfile: (config = {}) =>
    api.get("/api/parent/profile", config).then((res) => res.data),

  getKidSavings: () =>
    api.get("/api/parent/kid-savings").then((res) => res.data),

  getWeeklyReport: () =>
    api.get("/api/parent/weekly-report").then((res) => res.data),

  getMonthlyReport: () =>
    api.get("/api/parent/monthly-report").then((res) => res.data),

  getWeeklyTransactions: () =>
    api.get("/api/parent/weekly-transactions").then((res) => res.data),

  getMonthlyOverview: () =>
    api.get("/api/parent/monthly-overview").then((res) => res.data),

  getLastTransactions: () =>
    api.get("/api/parent/last-transactions").then((res) => res.data),

  getTransactions: (page = 1, limit = 10) =>
    api
      .get("/api/parent/transactions", { params: { page, limit } })
      .then((res) => res.data),

  getPaylaterOverview: () =>
    api.get("/api/parent/paylater-overview").then((res) => res.data),

  getPaylaterPending: () =>
    api.get("/api/parent/paylater-pending").then((res) => res.data),

  getPaylaterReminder: () =>
    api.get("/api/parent/paylater-reminder").then((res) => res.data),

  getPaylaterStatus: () =>
    api.get("/api/parent/paylater-status").then((res) => res.data),

  approvePaylater: (id) =>
    api.patch(`/api/paylater/approve/${id}`).then((res) => res.data),

  rejectPaylater: (id) =>
    api.patch(`/api/paylater/reject/${id}`).then((res) => res.data),
};

export default parentService;
