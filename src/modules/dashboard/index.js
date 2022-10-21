const dashboardRoutes = [{
        // ====================================
        // DASHBOARD ROUTES
        // ====================================
        path: "/dashboard",
        component: () =>
            import ( /* webpackChunkName: "base-layout" */ "@/layouts/layout-base"),

        children: [{
                path: "",
                name: "VesicashDashboard",
                component: () =>
                    import (
                        /* webpackChunkName: "dashboard-module" */
                        "@/modules/dashboard/pages/dashboard"
                    ),
                meta: {
                    requiresAuth: true,
                },
            },

            // =====================================
            // DISBURSEMENT DETAILS ROUTE
            // =====================================
            {
                path: "/dashboard/payment-details",
                name: "VesicashDisbursementDetails",
                component: () =>
                    import (
                        /* webpackChunkName: "dashboard-module" */
                        "@/modules/dashboard/pages/disbursement-details"
                    ),
                meta: {
                    requiresAuth: true,
                },
            },

            // =====================================
            // FUND DISBURSEMENT SETUP ROUTES
            // =====================================
            {
                path: "/dashboard/new-payment/details",
                component: () =>
                    import (
                        /* webpackChunkName: "dashboard-layout-disbursement" */
                        "@/modules/dashboard/layouts/layout-disbursement"
                    ),

                children: [{
                        path: "",
                        name: "VesicashFundDetails",
                        component: () =>
                            import (
                                /* webpackChunkName: "dashboard-layout-disbursement" */
                                "@/modules/dashboard/pages/fund-disbursement/fund-details"
                            ),
                        meta: {
                            requiresAuth: true,
                        },
                    },

                    {
                        path: "/dashboard/new-payment/parties",
                        name: "VesicashBeneficiaries",
                        component: () =>
                            import (
                                /* webpackChunkName: "dashboard-layout-disbursement" */
                                "@/modules/dashboard/pages/fund-disbursement/fund-beneficiaries"
                            ),
                        meta: {
                            requiresAuth: true,
                        },
                    },

                    {
                        path: "/dashboard/new-payment/payout",
                        name: "VesicashPayoutRules",
                        component: () =>
                            import (
                                /* webpackChunkName: "dashboard-layout-disbursement" */
                                "@/modules/dashboard/pages/fund-disbursement/fund-payout-rules"
                            ),
                        meta: {
                            requiresAuth: true,
                        },
                    },

                    {
                        path: "/dashboard/new-payment/confirm-payout",
                        name: "VesicashConfirmPayoutRules",
                        component: () =>
                            import (
                                /* webpackChunkName: "dashboard-layout-disbursement" */
                                "@/modules/dashboard/pages/fund-disbursement/confirm-fund-payout-rules"
                            ),
                        meta: {
                            requiresAuth: true,
                        },
                    },

                    {
                        path: "/dashboard/new-payment/payment",
                        name: "VesicashPayment",
                        component: () =>
                            import (
                                /* webpackChunkName: "dashboard-layout-disbursement" */
                                "@/modules/dashboard/pages/fund-disbursement/fund-payment"
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
        path: "/withdrawal-successful",
        component: () =>
            import ( /* webpackChunkName: "auth-layout" */ "@/layouts/layout-auth"),

        children: [{
                path: "",
                name: "SuccessfulWithdrawal",
                component: () =>
                    import (
                        /* webpackChunkName: "dashboard-module" */
                        "@/modules/dashboard/pages/withdraw-success"
                    ),
                meta: {
                    requiresAuth: true,
                },
            },

            {
                path: "/payment-successful",
                name: "SuccessfulPayment",
                component: () =>
                    import (
                        /* webpackChunkName: "dashboard-module" */
                        "@/modules/dashboard/pages/fund-disbursement/fund-payment-success"
                    ),
                meta: {
                    requiresAuth: true,
                },
            },

            {
                path: "/fund-wallet-success",
                name: "SuccessfulWalletFund",
                component: () =>
                    import (
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
                    import (
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