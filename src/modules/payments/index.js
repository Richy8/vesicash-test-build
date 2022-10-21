const paymentsRoutes = [{
    path: "/payments",
    component: () =>
        import ( /* webpackChunkName: "base-layout" */ "@/layouts/layout-base"),

    children: [{
        path: "",
        name: "PaymentsPage",
        component: () =>
            import (
                /* webpackChunkName: "transactions-module" */
                "@/modules/payments/pages/payments"
            ),
        meta: {
            requiresAuth: true,
        },
    }, ],
}, ];

export default paymentsRoutes;