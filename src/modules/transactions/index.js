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
          guest: true,
        },
      },
    ],
  },
];

export default transactionsRoutes;
