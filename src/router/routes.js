const routes = [
  {
    path: "/",
    component: () => import("../layouts/DashboardLayout.vue"),
    children: [{ path: "", component: () => import("../pages/Dashboard.vue") }],
  },
  {
    path: "/major-check",
    component: () => import("../layouts/DashboardLayout.vue"),
    children: [
      { path: "", component: () => import("../pages/MajorCheck.vue") },
    ],
  },
  {
    path: "/register-test",
    component: () => import("../layouts/DashboardLayout.vue"),
    children: [
      { path: "", component: () => import("../pages/RegisterTest.vue") },
    ],
  },
];

export default routes;
