import Token from "@/utils/token";
import { validToken } from "@/api/user";
import Loading from 'muse-ui-loading';
import router from "@/router";

const user = {
    namespaced: true,
    state: () => ({
        userInfo: {},
        isLogin: false,
        token: Token.getToken()
    }),
    mutations: {
        LOGIN(s, payload) {
            s.isLogin = true;
            s.userInfo = payload.info;
        },
        LOGOUT(s, payload = {
            pathName: "Index",
        }) {
            s.token = null;
            s.token = Token.cleanToken();
            s.isLogin = false;

            router.replace({
                name: payload.pathName
            }).then(() => {
                s.userInfo = {};
            });

        },
        SETTOKEN(s, payload) {
            Token.setToken(payload.token);
            s.token = payload.token;
        },
        CLEANTOKEN(s) {
            Token.cleanToken();
            s.token = null;
        }
    },
    actions: {
        async login(context, payload) {
            if (payload?.token) {
                // 如果传入了Token就更新token
                context.commit("SETTOKEN", {
                    token: payload.token
                });
            }
            const loading = Loading();
            // 全局loading

            const result = await validToken();
            // 验证token

            loading.close();
            // 关闭loading

            if (result.body.success) {
                const { avatar_url, id, loginname } = result.body;
                context.commit("LOGIN", {
                    info: {
                        avatar_url, id, loginname
                    }
                });

                return {
                    status: true
                };
            } else {

                context.commit("CLEANTOKEN");

                return {
                    status: false,
                    msg: result.body.error_msg
                };
            }
        }
    }
}

export default user;