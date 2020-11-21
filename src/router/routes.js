const routes = [
    {
        path: "/",
        component: () => import("../layouts/DashboardLayout.vue"),
        children: [{ path: "", component: () => import("../pages/Dashboard.vue") }]
    },
    {
        path: "/menu2",
        component: () => import("../layouts/DashboardLayout.vue"),
        children: [{ path: "", component: () => import("../pages/Test.vue") }]
    },
    {
        path: "/menu3",
        component: () => import("../layouts/DashboardLayout.vue"),
        children: [{ path: "", component: () => import("../pages/Test.vue") }]
    },

];

export default routes;