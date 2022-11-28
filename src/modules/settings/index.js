const settingsRoutes = [
  {
    path: "/settings",
    component: () =>
      import(/* webpackChunkName: "base-layout" */ "@/layouts/layout-base"),

    children: [
      {
        path: "/settings/profile",
        component: () =>
          import(
            /* webpackChunkName: "settings-module" */ "@/modules/settings/pages/settings"
          ),

        children: [
          {
            path: "",
            name: "ProfileSettings",
            component: () =>
              import(
                /* webpackChunkName: "settings-module" */ "@/modules/settings/pages/profile-settings"
              ),
            meta: {
              requiresAuth: true,
            },
          },

          {
            path: "/settings/password",
            name: "PasswordSettings",
            component: () =>
              import(
                /* webpackChunkName: "settings-module" */ "@/modules/settings/pages/password-settings"
              ),
            meta: {
              requiresAuth: true,
            },
          },

          {
            path: "/settings/verification",
            name: "VerificationSettings",
            component: () =>
              import(
                /* webpackChunkName: "settings-module" */ "@/modules/settings/pages/verification-settings"
              ),
            meta: {
              requiresAuth: true,
            },
          },

          {
            path: "/settings/account",
            name: "AccountSettings",
            component: () =>
              import(
                /* webpackChunkName: "settings-module" */ "@/modules/settings/pages/account-settings"
              ),
            meta: {
              requiresAuth: true,
            },
          },

          {
            path: "/settings/users",
            name: "UsersSettings",
            component: () =>
              import(
                /* webpackChunkName: "settings-module" */ "@/modules/settings/pages/users-settings"
              ),
            meta: {
              requiresAuth: true,
            },
          },

          {
            path: "/settings/api",
            name: "APISettings",
            component: () =>
              import(
                /* webpackChunkName: "settings-module" */ "@/modules/settings/pages/api-settings"
              ),
            meta: {
              requiresAuth: true,
            },
          },
        ],
      },
    ],
  },
];

export default settingsRoutes;
