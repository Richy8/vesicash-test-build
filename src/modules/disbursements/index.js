const disbursementsRoutes = [
  {
    path: "/disbursements",
    component: () =>
      import(/* webpackChunkName: "base-layout" */ "@/layouts/layout-base"),

    children: [
      {
        path: "",
        name: "DisbursementsPage",
        component: () =>
          import(
            /* webpackChunkName: "disbursements-module" */ "@/modules/disbursements/pages/disbursements"
          ),
        meta: {
          guest: true,
        },
      },
    ],
  },
];

export default disbursementsRoutes;
