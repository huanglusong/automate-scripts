// 快猫视频api

import service from "../utils/httpclient/fastcatHttpClient.js";
import config from '../config.js'

/**
 * 登录
 *
 * @returns {AxiosPromise}
 */
export function loginAPI(userName, password) {
    const options = {
        url: "https://kmqsaq.com/user/login",
        method: 'post',
        headers: {
            Accept: "*/*",
            Connection: "keep-alive",
            "Accept-Language": "zh-cn",
            "content-type": "application/json; charset=utf-8",
        },
        data: {
            clientType: 1,
            userName,
            password
        }
    };
    return service(options);
}


/**
 * 用户信息
 * @returns {AxiosPromise}
 */
export function queryUserDetail(token) {
    const options = {
        url: "https://kmqsaq.com/user/getDetail",
        method: 'post',
        headers: {
            Accept: "*/*",
            Connection: "keep-alive",
            "Accept-Language": "zh-cn",
            "content-type": "application/json; charset=utf-8",
            "token": token
        },
        data: {
            clientType: 1,
        }
    };
    return service(options);
}

/**
 * 最新视频列表
 * @returns {AxiosPromise}
 */
export function queryLatestVideoList() {
    const options = {
        url: "https://kmqsaq.com/video/getList",
        method: 'post',
        headers: {
            Accept: "*/*",
            Connection: "keep-alive",
            "Accept-Language": "zh-cn",
            "content-type": "application/json; charset=utf-8",
        },
        data: {
            clientType: 1,
            length: 16,
            page: 1,
        }
    };
    return service(options);
}


/**
 * 视频列表 国产分类
 * @param cookie
 * @returns {AxiosPromise}
 */
export function queryDomesticVideoList() {
    const options = {
        url: "https://kmqsaq.com/video/getList",
        method: 'post',
        headers: {
            Accept: "*/*",
            Connection: "keep-alive",
            "Accept-Language": "zh-cn",
            "content-type": "application/json; charset=utf-8",
        },
        data: {
            clientType: 1,
            length: 16,
            page: 1,
            type: 1,
            typeId: 2
        }
    };
    return service(options);
}

/**
 * 视频url
 * @param cookie
 * @returns {AxiosPromise}
 */
export function getVideoUrl(videoId,token) {
    const options = {
        url: "https://kmqsaq.com/video/getUrl",
        method: 'post',
        headers: {
            Accept: "*/*",
            Connection: "keep-alive",
            "Accept-Language": "zh-cn",
            "content-type": "application/json; charset=utf-8",
            "token": token
        },
        data: {
            clientType: 1,
            videoId
        }
    };
    return service(options);
}

