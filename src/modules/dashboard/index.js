const dashboardRoutes = [
  {
    // ====================================
    // DASHBOARD ROUTES
    // ====================================
    path: "/dashboard",
    component: () =>
      import(/* webpackChunkName: "base-layout" */ "@/layouts/layout-base"),

    children: [
      {
        path: "",
        name: "VesicashDashboard",
        component: () =>
          import(
            /* webpackChunkName: "dashboard-module" */
            "@/modules/dashboard/pages/dashboard"
          ),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },

  // ====================================
  // PLAIN AUTH BG LAYOUT ROUTES
  // ====================================
  {
    path: "/withdrawal-successful",
    component: () =>
      import(/* webpackChunkName: "auth-layout" */ "@/layouts/layout-auth"),

    children: [
      {
        path: "",
        name: "SuccessfulWithdrawal",
        component: () =>
          import(
            /* webpackChunkName: "dashboard-module" */
            "@/modules/dashboard/pages/withdraw-success"
          ),
        meta: {
          requiresAuth: true,
        },
      },

      {
        path: "/fund-wallet-success",
        name: "SuccessfulWalletFund",
        component: () =>
          import(
            /* webpackChunkName: "dashboard-module" */
            "@/modules/dashboard/pages/fund-wallet-success"
          ),
        meta: {
          requiresAuth: true,
        },
      },

      {
        path: "/fund-wallet-error",
        name: "FailedWalletFund",
        component: () =>
          import(
            /* webpackChunkName: "dashboard-module" */
            "@/modules/dashboard/pages/fund-wallet-error"
          ),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
];

export default dashboardRoutes;
