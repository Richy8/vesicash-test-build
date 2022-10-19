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

      // ================================
      // VESICASH FORGET PASSWORD ROUTE
      // ================================
      {
        path: "/forgot-password",
        name: "VesicashForgotPassword",
        component: () =>
          import(
            /* webpackChunkName: "auth-module" */ "@/modules/auth/pages/forgot-password"
          ),
        meta: {
          guest: true,
        },
      },

      // ================================
      // VESICASH RESET PASSWORD ROUTE
      // ================================
      {
        path: "/reset-password/:account_id",
        name: "VesicashResetPassword",
        component: () =>
          import(
            /* webpackChunkName: "auth-module" */ "@/modules/auth/pages/reset-password"
          ),
        meta: {
          guest: true,
        },
      },

      // ==========================================
      // VESICASH SUCCESSFUL PASSWORD RESET ROUTE
      // ==========================================
      {
        path: "/successful-password-reset",
        name: "VesicashSuccessfulPasswordReset",
        component: () =>
          import(
            /* webpackChunkName: "auth-module" */ "@/modules/auth/pages/reset-successful"
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
          guest: true,
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
          guest: true,
        },
      },

      // ==================================
      // VESICASH VERIFY OTP ROUTE
      // ==================================
      {
        path: "/verify-otp/:account_id",
        name: "VesicashVerifyOTP",
        component: () =>
          import(
            /* webpackChunkName: "auth-module" */ "@/modules/auth/pages/verify-otp"
          ),
        meta: {
          guest: true,
        },
      },
    ],
  },
];

export default authRoutes;
