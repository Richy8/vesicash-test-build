const transactionsRoutes = [
  {
    path: "/transactions",
    component: () =>
      import(/* webpackChunkName: "base-layout" */ "@/layouts/layout-base"),

    children: [
      {
        path: "",
        name: "TransactionsPage",
        component: () =>
          import(
            /* webpackChunkName: "transactions-module" */ "@/modules/transactions/pages/transactions"
          ),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
];

export default transactionsRoutes;
