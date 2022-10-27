const transactionRoutes = [
  {
    path: "/transactions",
    component: () =>
      import(/* webpackChunkName: "base-layout" */ "@/layouts/layout-base"),

    children: [
      {
        path: "",
        name: "AllTransactions",
        component: () =>
          import(
            /* webpackChunkName: "transactions-module" */
            "@/modules/transactions/pages/transactions"
          ),
        meta: {
          requiresAuth: true,
        },
      },

      // =====================================
      // TRANSACTION DETAILS ROUTE
      // =====================================
      {
        path: "/transactions/payment-details",
        name: "TransactionDetails",
        component: () =>
          import(
            /* webpackChunkName: "transaction-module" */
            "@/modules/transactions/pages/transaction-details"
          ),
        meta: {
          requiresAuth: true,
        },
      },

      // =====================================
      // TRANSACTION CREATION FLOW
      // =====================================
      {
        path: "/transactions/setup",
        component: () =>
          import(
            /* webpackChunkName: "transaction-layout" */
            "@/modules/transactions/layouts/layout-transactions"
          ),

        children: [
          {
            path: "",
            name: "TransactionSetup",
            component: () =>
              import(
                /* webpackChunkName: "transaction-layout" */
                "@/modules/transactions/pages/create-transactions/transaction-setup"
              ),
            meta: {
              requiresAuth: true,
            },
          },

          {
            path: "/transactions/parties",
            name: "TransactionParties",
            component: () =>
              import(
                /* webpackChunkName: "transaction-layout" */
                "@/modules/transactions/pages/create-transactions/transaction-parties"
              ),
            meta: {
              requiresAuth: true,
            },
          },

          {
            path: "/transactions/payout-rules",
            name: "TransactionPayoutRules",
            component: () =>
              import(
                /* webpackChunkName: "transaction-layout" */
                "@/modules/transactions/pages/create-transactions/transaction-payout-rules"
              ),
            meta: {
              requiresAuth: true,
            },
          },

          {
            path: "/transactions/confirm-transaction",
            name: "TransactionConfirmPayout",
            component: () =>
              import(
                /* webpackChunkName: "transaction-layout" */
                "@/modules/transactions/pages/create-transactions/transaction-confirmation"
              ),
            meta: {
              requiresAuth: true,
            },
          },

          {
            path: "/transactions/payment",
            name: "TransactionPayment",
            component: () =>
              import(
                /* webpackChunkName: "transaction-layout" */
                "@/modules/transactions/pages/create-transactions/transaction-payment"
              ),
            meta: {
              requiresAuth: true,
            },
          },
        ],
      },
    ],
  },

  // ====================================
  // PLAIN AUTH BG LAYOUT ROUTES
  // ====================================
  {
    path: "/transaction/payment-successful",
    component: () =>
      import(/* webpackChunkName: "auth-layout" */ "@/layouts/layout-auth"),

    children: [
      {
        path: "",
        name: "SuccessfulPayment",
        component: () =>
          import(
            /* webpackChunkName: "transaction-module" */
            "@/modules/transactions/pages/create-transactions/transaction-payment-success"
          ),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
];

export default transactionRoutes;
