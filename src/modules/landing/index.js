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
      },

      // ===============================
      // VESICASH SOLUTIONS ROUTE
      // ===============================
      {
        path: "/solutions",
        name: "VesicashSolutions",
        component: () =>
          import(
            /* webpackChunkName: "landing-module" */ "@/modules/landing/pages/solutions"
          ),
      },

      // ===============================
      // VESICASH ABOUT US ROUTE
      // ===============================
      {
        path: "/about",
        name: "VesicashAbout",
        component: () =>
          import(
            /* webpackChunkName: "landing-module" */ "@/modules/landing/pages/about"
          ),
      },
    ],
  },
];

export default landingRoutes;
