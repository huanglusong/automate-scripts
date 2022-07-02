// jd相关的api写在此文件下
import service from "../utils/httpclient/request.js";

import USER_AGENT from '../utils/USER_AGENTS.js'

/**
 * 用于检测cookie是否过期
 * 京豆数量
 */
export function totalBean(cookie) {
    const options = {
        url: "https://me-api.jd.com/user_new/info/GetJDUserInfoUnion",
        headers: {
            Host: "me-api.jd.com",
            Accept: "*/*",
            Connection: "keep-alive",
            Cookie: cookie,
            "User-Agent": USER_AGENT,
            "Accept-Language": "zh-cn",
            "Referer": "https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&",
            "Accept-Encoding": "gzip, deflate, br"
        }
    }
    return service(options);
}

/**
 * 京东商城-京豆签到
 * @param cookie
 * @returns {AxiosPromise}
 */
export function jdSignBeanApi(cookie) {
    const options = {
        url: 'https://api.m.jd.com/client.action',
        method: 'post',
        headers: {
            Accept: "*/*",
            Connection: "keep-alive",
            "User-Agent": USER_AGENT,
            Cookie: cookie,
            "Content-Type": 'application/x-www-form-urlencoded'
        },
        data: 'functionId=signBeanIndex&appid=ld'
    };

    return service(options);
}
