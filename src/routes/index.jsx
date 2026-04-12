import ConnectionRequired from "../page/ConnectionRequired.jsx";
import KidDashboardGuard from "../components/KidDashboardGuard.jsx";
import ParentDashboardGuard from "../components/ParentDashboardGuard.jsx";
import { createBrowserRouter } from "react-router-dom";
import Landing from "../page/Landing";
import Template from "../Template.jsx";
import Login from "../page/Login.jsx";
import SelectRole from "../page/SelectRole.jsx";
import SelectKids from "../page/SelectKids.jsx";
import SelectParent from "../page/SelectParent.jsx";
import DashboardLayout from "../components/dashboard-layout/DashboardLayout.jsx";
import Error404 from "../error/Error404.jsx";
import Error403 from "../error/Error403.jsx";
import Error401 from "../error/Error401.jsx";
import Error500 from "../error/Error500.jsx";
import PrivacyPolicy from "../page/PrivacyPolicy.jsx";
import TermsOfService from "../page/TermsOfService.jsx";
import Developer from "../page/Developer.jsx";

import KidDashboardPage from "../pages/kid/DashboardPage.jsx";
import KidSavingsPage from "../pages/kid/SavingsPage.jsx";
import KidTransactionsPage from "../pages/kid/TransactionsPage.jsx";
import KidPaylaterPage from "../pages/kid/PaylaterPage.jsx";

import ParentDashboardPage from "../pages/parent/DashboardPage.jsx";
import ParentSavingsPage from "../pages/parent/SavingsPage.jsx";
import ParentPaylaterPage from "../pages/parent/PaylaterPage.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Template />,
    children: [
      { path: "/", element: <Landing /> },
      { path: "/login", element: <Login /> },
      { path: "/select-role", element: <SelectRole /> },
      { path: "/select-kids", element: <SelectKids /> },
      { path: "/select-parent", element: <SelectParent /> },
      { path: "/404", element: <Error404 /> },
      { path: "/403", element: <Error403 /> },
      { path: "/401", element: <Error401 /> },
      { path: "/500", element: <Error500 /> },
      { path: "/privacy-policy", element: <PrivacyPolicy /> },
      { path: "/terms-of-service", element: <TermsOfService /> },
      { path: "/developers", element: <Developer /> },
    ],
  },
  {
    element: <DashboardLayout />,
    children: [
      // Route halaman Kid
      {
        path: "kid",
        element: <KidDashboardGuard><KidDashboardPage /></KidDashboardGuard>,
      },
      {
        path: "kid/savings",
        element: <KidDashboardGuard><KidSavingsPage /></KidDashboardGuard>,
      },
      {
        path: "kid/transactions",
        element: <KidDashboardGuard><KidTransactionsPage /></KidDashboardGuard>,
      },
      {
        path: "kid/paylater",
        element: <KidDashboardGuard><KidPaylaterPage /></KidDashboardGuard>,
      },

      // Route halaman Parent
      {
        path: "parent",
        element: <ParentDashboardGuard><ParentDashboardPage /></ParentDashboardGuard>,
      },
      {
        path: "parent/savings",
        element: <ParentDashboardGuard><ParentSavingsPage /></ParentDashboardGuard>,
      },
      {
        path: "parent/paylater",
        element: <ParentDashboardGuard><ParentPaylaterPage /></ParentDashboardGuard>,
      },
    ],
  },
  {
    path: "/connection-required",
    element: <ConnectionRequired />,
  },
]);