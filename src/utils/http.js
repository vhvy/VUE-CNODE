import config from "@/config";
import { createQueryStr } from "@/utils/query";
import store from "@/store";

const { baseUrl } = config;

const get = (path, query, config) => {

    let url = baseUrl + path;
    if (!!query || config?.auth) {


        let q = query ? { ...query } : {};
        if (config?.auth) {
            q['accesstoken'] = store.state.user.token;
        }
        url += createQueryStr(q);
    }

    return fetch(url).then(res => res.json().then(body => ({
        body,
        status: res.status
    })));
}

const post = (path, body, config) => {
    const data = body ? { ...body } : {};

    if (config?.auth) {
        data['accesstoken'] = store.state.user.token;
    }

    return fetch(baseUrl + path, {
        method: "post",
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => res.json().then(body => ({
        body,
        status: res.status
    })));
}

export default {
    get,
    post
}