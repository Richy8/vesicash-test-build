const dashboardRoutes = [
  {
    path: "/dashboard",
    component: () =>
      import(/* webpackChunkName: "base-layout" */ "@/layouts/layout-base"),

    children: [
      {
        path: "",
        name: "DashboardPage",
        component: () =>
          import(
            /* webpackChunkName: "dashboard-module" */ "@/modules/dashboard/pages/dashboard"
          ),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
];

export default dashboardRoutes;
