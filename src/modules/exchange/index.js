const exchangeRoutes = [
  {
    // ====================================
    // EXCHANGE ROUTES
    // ====================================
    path: "/exchange",
    component: () =>
      import(/* webpackChunkName: "base-layout" */ "@/layouts/layout-base"),

    children: [
      {
        path: "",
        name: "VesicashEchange",
        component: () =>
          import(
            /* webpackChunkName: "exchange-module" */
            "@/modules/exchange/pages/exchange-dashboard"
          ),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
];

export default exchangeRoutes;
