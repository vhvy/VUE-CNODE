import http from "@/utils/http";

export function getMsgCount() {
    // 获取未读消息计数的接口

    return http.get("/message/count", null, {
        auth: true
    })
}

export function getMsg() {
    // 获取所有消息

    return http.get("/messages", null, {
        auth: true
    });
}

export function setMsgAllRead() {
    // 将所有消息设置为已读

    return http.post("/message/mark_all", null, {
        auth: true
    });
}