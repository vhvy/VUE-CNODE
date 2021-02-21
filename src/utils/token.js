import config from "@/config";

const { GLOBAL_TOKEN_KEY } = config;

class Token {
    static getToken() {
        return localStorage.getItem(GLOBAL_TOKEN_KEY);
    }

    static setToken(v) {
        localStorage.setItem(GLOBAL_TOKEN_KEY, v);
    }

    static cleanToken() {
        localStorage.removeItem(GLOBAL_TOKEN_KEY);
        return null;
    }
}

export default Token;