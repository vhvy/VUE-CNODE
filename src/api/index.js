import http from "@/utils/http";

export function getIndexPost({
    tab = "all", page = 1, limit = 20
}) {
    return http.get("/topics", {
        tab,
        page,
        limit
    })
}