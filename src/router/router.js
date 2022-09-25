import {createRouter, createWebHashHistory} from "vue-router";

const routes = [
    {path: "/", redirect: "/index/dashBoard"},
    {path: "/login", name: "login", component: () => import("../pages/Login.vue")},
    {
        path: "/index", name: "index", component: () => import("../pages/index/Index.vue"), redirect: "/index/dashBoard",
        children: [
            {path: "/index/dashBoard", name: "dashBoard", component: () => import("../pages/index/DashBoard.vue")},
            {
                path: "/index/articleAdm",
                name: "articleAdm",
                component: () => import("../pages/index/articleAdm/Index.vue"),
                redirect: "/index/articleAdm/List",
                children: [
                    {path: "/index/articleAdm/List", name: "articleAdmList", component: () => import("../pages/index/articleAdm/List.vue")},
                    {path: "/index/articleAdm/Add", name: "articleAdmAdd", component: () => import("../pages/index/articleAdm/Add.vue")}
                ]
            },
            {
                path: '/index/scAdm',
                component: () => import('../pages/index/scAdm/Index.vue'),
                name: 'scAdm',
                redirect: '/index/scAdm/List',
                children: [
                    {
                        path: "/index/scAdm/List",
                        name: "scAdmList",
                        component: () => import("../pages/index/scAdm/List.vue")
                    }
                ]
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;