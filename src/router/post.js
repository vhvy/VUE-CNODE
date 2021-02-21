const routes = [

    {
        path: "/post/new",
        name: "NewPost",
        component: () => import("@/views/post/NewPost.vue"),
        meta: {
            auth: true,
            testAuth: true,
            footer: false,
            title: "发表新帖"
        }
    },
    {
        // 帖子详情页
        path: "/post/:id",
        name: "PostInfo",
        component: () => import("@/views/post/PostInfo.vue"),
        meta: {
            auth: false,
            testAuth: true,
            footer: false,
            setTitle: false
        },
        props: true
    },
    {
        path: "/collect",
        name: "MyCollect",
        component: () => import("@/views/post/CollectPost.vue"),
        meta: {
            auth: true,
            testAuth: true,
            footer: false,
            title: "我的收藏"
        }
    },
];

export default routes;