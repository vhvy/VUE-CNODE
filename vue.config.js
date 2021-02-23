module.exports = {
    chainWebpack: config => {
        config
            .plugin("define")
            .tap(args => {
                Object.assign(args[0]['process.env'], {
                    CNODE_KEY: JSON.stringify(process.env.CNODE_KEY)
                });
                return args;
            });
        config
            .plugin("html")
            .tap(args => {
                args[0]['title'] = "CNODE";
                return args;
            });
    },
    devServer: {
        https: true
    }
}