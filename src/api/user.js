import http from "@/utils/http";

export function getUserDetails(username) {
    return http.get("/user/" + username);
}

export function validToken() {
    return http.post("/accesstoken", null, {
        auth: true
    });
}