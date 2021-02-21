import dev from "@/config/dev";
import prod from "@/config/prod";

const common = {
    baseUrl: "https://cnodejs.org/api/v1",
    GLOBAL_TOKEN_KEY: "CNODE_GLOBAL_TOKEN_KEY",
    baseTitle: "CNODE"
};

const mergeConfig = process.env.NODE_ENV === "production" ? prod : dev;

export default {
    ...common,
    ...mergeConfig
}