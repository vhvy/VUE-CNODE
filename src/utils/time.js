export function getPastTime(timestr) {
    const time = new Date(timestr);

    const sec = Math.floor((Date.now() - time.getTime()) / 1000);
    // 总秒数

    const hoursSec = 60 * 60;
    // 一小时的秒数

    const daySec = 24 * hoursSec;
    // 一天的秒数

    const yearSec = 365 * daySec;
    // 一年的秒数

    if (sec < 10) {
        return "几秒前";
    }
    if (sec < 60) {
        return sec + "秒前";
    }
    if (sec < hoursSec) {
        return Math.floor(sec / 60) + "分钟前";
    }
    if (sec < daySec) {
        const hour = Math.floor(sec / hoursSec);
        const minute = Math.floor(sec % hoursSec / 60);
        return hour + "小时" + minute + "分钟前";
    }
    if (sec < yearSec) {
        return Math.floor(sec / daySec) + "天前";
    }

    return formatTime(time, "-");
}

export function formatTime(time, split = "/") {
    const year = time.getFullYear();
    const now_month = time.getMonth() + 1;
    const month = now_month < 10 ? "0" + now_month : now_month;
    const now_date = time.getDate();
    const date = now_date < 10 ? "0" + now_date : now_date;
    const now_hours = time.getHours();
    const hours = now_hours < 10 ? "0" + now_hours : now_hours;
    const now_minute = time.getMinutes();
    const minute = now_minute < 10 ? "0" + now_minute : now_minute;
    const now_sec = time.getSeconds();
    const sec = now_sec < 10 ? "0" + now_sec : now_sec;

    return `${year}${split}${month}${split}${date} ${hours}:${minute}:${sec}`;
}