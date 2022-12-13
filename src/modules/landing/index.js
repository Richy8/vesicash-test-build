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

      // =======================================
      // VESICASH TERMS AND CONDITION ROUTE
      // =======================================
      {
        path: "/terms",
        name: "VesicashTerms",
        component: () =>
          import(
            /* webpackChunkName: "landing-module" */ "@/modules/landing/pages/terms"
          ),
      },

      // =======================================
      // VESICASH PRIVACY POLICY ROUTE
      // =======================================
      {
        path: "/privacy-policy",
        name: "VesicashPrivacy",
        component: () =>
          import(
            /* webpackChunkName: "landing-module" */ "@/modules/landing/pages/privacy"
          ),
      },
    ],
  },
];

export default landingRoutes;
