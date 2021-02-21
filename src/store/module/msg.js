import { getMsgCount } from "@/api/msg";

const msg = {
    namespaced: true,
    state: () => ({
        count: -1
    }),
    mutations: {
        SETCOUNT(s, payload) {
            s.count = payload.count;
        }
    },
    actions: {
        async getCount(context) {
            const result = await getMsgCount();
            if (result?.body?.success) {
                context.commit("SETCOUNT", {
                    count: 3
                });
            }
        }
    }
}

export default msg;