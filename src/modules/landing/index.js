// ================================
// VESICASH LANDING PAGE ROUTES
// ================================
const landingRoutes = [
  {
    path: "/",
    alias: "/home",
    component: () =>
      import(
        /* webpackChunkName: "landing-layout" */ "@/modules/landing/layouts/layout-landing"
      ),

    children: [
      // ===============================
      // VESICASH HOME ROUTE
      // ===============================
      {
        path: "",
        name: "VesicashHome",
        component: () =>
          import(
            /* webpackChunkName: "landing-module" */ "@/modules/landing/pages/home"
          ),
        // meta: {
        //   guest: true,
        // },
      },
    ],
  },
];

export default landingRoutes;
