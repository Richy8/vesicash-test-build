const settingsRoutes = [
  {
    path: "/settings",
    component: () =>
      import(/* webpackChunkName: "base-layout" */ "@/layouts/layout-base"),

    children: [
      {
        path: "",
        name: "SettingsPage",
        component: () =>
          import(
            /* webpackChunkName: "settings-module" */ "@/modules/settings/pages/settings"
          ),
        meta: {
          guest: true,
        },
      },
    ],
  },
];

export default settingsRoutes;
