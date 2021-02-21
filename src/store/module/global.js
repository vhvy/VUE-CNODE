const global = {
    namespaced: true,
    state: () => ({
        footerShow: false
    }),
    mutations: {
        SHOWFOOTER(s) {
            s.footerShow = true;
        },
        HIDEFOOTER(s) {
            s.footerShow = false;
        }
    }
};


export default global;