export function createQueryStr(query) {
    const str = Object.keys(query).map(k => k + `=${query[k]}`).join("&");
    return "?" + encodeURI(str);
}

