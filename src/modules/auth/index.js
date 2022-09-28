// ================================
// VESICASH AUTHENTICATED ROUTES
// ================================
const authRoutes = [
  {
    path: "/login",
    alias: "/",
    component: () =>
      import(/* webpackChunkName: "auth-layout" */ "@/layouts/layout-auth"),

    children: [
      // ================================
      // VESICASH LOGIN ROUTE
      // ===============================
      {
        path: "",
        name: "VesicashLogin",
        component: () =>
          import(
            /* webpackChunkName: "auth-module" */ "@/modules/auth/pages/login"
          ),
        meta: {
          guest: true,
        },
      },

      // ==================================
      // VESICASH REGISTER LANDER ROUTE
      // ==================================
      {
        path: "/register-lander",
        name: "VesicashRegisterLander",
        component: () =>
          import(
            /* webpackChunkName: "auth-module" */ "@/modules/auth/pages/register-lander"
          ),
        meta: {
          requiresAuth: true,
        },
      },

      // ==================================
      // VESICASH REGISTER ROUTE
      // ==================================
      {
        path: "/register/:account",
        name: "VesicashRegister",
        component: () =>
          import(
            /* webpackChunkName: "auth-module" */ "@/modules/auth/pages/register"
          ),
        meta: {
          requiresAuth: true,
        },
      },

      // ==================================
      // VESICASH VERIFY OTP ROUTE
      // ==================================
      {
        path: "/verify-otp",
        name: "VesicashVerifyOTP",
        component: () =>
          import(
            /* webpackChunkName: "auth-module" */ "@/modules/auth/pages/verify-otp"
          ),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
];

export default authRoutes;
