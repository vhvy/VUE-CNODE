import http from "@/utils/http";

export function getPostDetails(id, auth = false) {
    return http.get("/topic/" + id, null, {
        auth
    });
}

export function toggleReplyLike(id) {
    return http.post("/reply/" + id + "/ups", null, {
        auth: true
    });
}

export function sendReply(id, data) {
    return http.post("/topic/" + id + "/replies", data, {
        auth: true
    });
}

export function collectPost(topic_id) {
    return http.post("/topic_collect/collect", {
        topic_id
    }, {
        auth: true
    });
}

export function deCollectPost(topic_id) {
    return http.post("/topic_collect/de_collect", {
        topic_id
    }, {
        auth: true
    });
}

export function getUserCollect(loginname) {
    return http.get("/topic_collect/" + loginname);
}

/**
 * 
 * @param {object} data 发表新文章
 */
export function createNewPost(data) {
    return http.post("/topics", data, {
        auth: true
    });
}