const routes = [
    {
        // 用户详情页
        path: "/userinfo/:loginname",
        name: "UserInfo",
        component: () => import("@/views/user/UserInfo.vue"),
        meta: {
            auth: true,
            footer: false,
            title: "用户详情"
        }
    }
];

export default routes;