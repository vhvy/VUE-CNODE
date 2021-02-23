import VueRouter from "vue-router";
import Vue from "vue";
import Index from "@/views/Index";
import Msg from "@/views/Msg";
import Login from "@/views/Login";
import My from "@/views/user/Index";
import store from "@/store";
import userRoutes from "@/router/user";
import postRoutes from "@/router/post";
import config from "@/config";

const { baseTitle } = config;

Vue.use(VueRouter);

const routes = [
    {
        // 首页
        path: "/",
        name: "Index",
        component: Index,
        meta: {
            auth: false,
            footer: true,
            title: "首页"
        }
    },
    {
        // 消息列表
        path: "/msg",
        name: "Msg",
        component: Msg,
        meta: {
            auth: true,
            footer: true,
            title: "消息列表"
        }
    },
    {
        // 个人中心
        path: "/my",
        name: "My",
        component: My,
        meta: {
            auth: true,
            footer: true,
            title: "个人中心"
        }
    },
    {
        // 登录页面
        path: "/login",
        name: "Login",
        component: Login,
        meta: {
            auth: false,
            footer: false,
            title: "登录"
        }
    },
    ...userRoutes,
    ...postRoutes
];

const router = new VueRouter({
    mode: "history",
    routes
});

async function valid(next, redirect, test = false) {
    const { status } = await store.dispatch("user/login")
    if (status || test) {
        // 如果登录成功或者为尝试登录
        next();
    } else {

        const route = {
            name: "Login"
        };

        redirect && (route.query = {
            redirect
        });

        next(route);
    }
}

router.beforeResolve((to, from, next) => {

    const { title, setTitle = true } = to.meta || {};

    if (setTitle) {
        document.title = title ? `${title} - ${baseTitle}` : baseTitle;
    }
    
    next();
});

router.beforeEach((to, from, next) => {

    const isLogin = store.state.user.isLogin;
    // 获取登录状态

    const footerStatus = store.state.global.footerShow;
    // 获取底部导航栏状态

    const hasToken = !!store.state.user.token;
    // 当前是否拥有token

    const { auth = true, footer = true, testAuth = false } = to.meta || {};
    // 获取待进入路由信息

    if (footer && !footerStatus) {
        // 如果需要展示底部导航栏且当前底部导航栏处于隐藏状态
        // 显示导航栏
        store.commit('global/SHOWFOOTER');
    } else if (!footer && footerStatus) {
        // 如果需要隐藏底部导航栏且当前底部导航栏处于显示状态
        // 隐藏导航栏
        store.commit('global/HIDEFOOTER');
    }

    if (auth || testAuth) {
        // 如果待进入路由需要登录

        if (isLogin) {
            // 如果已登录直接进入路由
            next();
        } else {
            // 没有登录时再进行其他检查
            if (hasToken) {
                // 已经设置了token
                valid(next, to.fullPath, testAuth)
            } else {
                // 没有设置token

                if (testAuth) {
                    // 如果是需要尝试登录
                    return next();
                }


                // 跳转到登录页面
                return next({
                    name: "Login",
                    query: {
                        redirect: to.fullPath
                    }
                });
            }
        }

    } else if (to.name === "Login") {
        // 如果要进入登录页面，检查登录状态

        if (isLogin) {
            // 已经处于登录状态，跳到首页
            next({
                name: "Index",
                replace: true
            });
        } else {
            // 尚未登录

            if (hasToken) {
                // 设置了token,直接尝试登录
                valid(next);
            } else {
                // 没有token，进入路由
                next();
            }

        }

    } else {
        // 不需要登录，直接进入路由
        next();
    }
});

export default router;