// bilibili相关的api写在此文件下
import service from "../utils/request.js";
import USER_AGENT from '../utils/USER_AGENTS.js'
import qs from 'querystring';

/**
 * bilibili个人用户信息
 */
export function getAccountInfo(cookie) {
    const options = {
        url: "http://api.bilibili.com/x/member/web/account",
        headers: {
            Accept: "*/*",
            Connection: "keep-alive",
            Cookie: cookie,
            "User-Agent": USER_AGENT,
            "Accept-Language": "zh-cn",
        }
    };
    return service(options);
}

/**
 * 查询每日奖励信息
 * @param cookie
 * @returns {AxiosPromise}
 */
export function getDailyRewardInfo(cookie) {
    const options = {
        url: "http://api.bilibili.com/x/member/web/exp/reward",
        headers: {
            Accept: "*/*",
            Connection: "keep-alive",
            Cookie: cookie,
            "User-Agent": USER_AGENT,
            "Accept-Language": "zh-cn",
        }
    };
    return service(options);
}

/**
 * 查询硬币变化情况
 * @param cookie
 * @returns {AxiosPromise}
 */
export function queryCoinLog(cookie) {
    const options = {
        url: "http://api.bilibili.com/x/member/web/coin/log",
        headers: {
            Accept: "*/*",
            Connection: "keep-alive",
            Cookie: cookie,
            "User-Agent": USER_AGENT,
            "Accept-Language": "zh-cn",
        }
    };
    return service(options);
}

/**
 * 查询每日投币获得经验数
 * @param cookie
 * @returns {AxiosPromise}
 */
export function queryDailyExpByCoin(cookie) {
    const options = {
        url: "http://www.bilibili.com/plus/account/exp.php",
        headers: {
            Accept: "*/*",
            Connection: "keep-alive",
            Cookie: cookie,
            "User-Agent": USER_AGENT,
            "Accept-Language": "zh-cn",
        }
    };
    return service(options);
}

/**
 * 导航栏用户信息
 * 可用于用户登录 待验证
 * @param cookie
 * @returns {AxiosPromise}
 */
export function queryNavUserInfo(cookie) {
    const options = {
        url: "http://api.bilibili.com/nav",
        headers: {
            Accept: "*/*",
            Connection: "keep-alive",
            Cookie: cookie,
            "User-Agent": USER_AGENT,
            "Accept-Language": "zh-cn",
        }
    };
    return service(options);
}

/**
 * 查询经验值的变动记录
 * @param cookie
 * @returns {AxiosPromise}
 */
export function queryExpLog(cookie) {
    const options = {
        url: " https://api.bilibili.com/x/member/web/exp/log?jsonp=jsonp",
        headers: {
            Accept: "*/*",
            Connection: "keep-alive",
            Cookie: cookie,
            "User-Agent": USER_AGENT,
            "Accept-Language": "zh-cn",
        }
    };
    return service(options);
}

/**
 * 获取动态列表
 * @param cookie
 * @returns {AxiosPromise}
 */
export function queryDynamicListAPI(cookie, page = 1) {
    const options = {
        url: `https://api.bilibili.com/x/polymer/web-dynamic/v1/feed/all?timezone_offset=-480&type=all&page=${page}`,
        headers: {
            Accept: "*/*",
            Connection: "keep-alive",
            Cookie: cookie,
            "User-Agent": USER_AGENT,
            "Accept-Language": "zh-cn",
        }
    };
    return service(options);
}

/**
 * 获取视频详细信息
 * @param cookie
 * @returns {AxiosPromise}
 */
export function getVideoDetail(cookie, bvid) {
    const options = {
        url: `http://api.bilibili.com/x/web-interface/view?bvid=${bvid}`,
        headers: {
            Accept: "*/*",
            Connection: "keep-alive",
            Cookie: cookie,
            "User-Agent": USER_AGENT,
            "Accept-Language": "zh-cn",
        }
    };
    return service(options);
}

/**
 * 点赞视频
 * @param cookie
 * @returns {AxiosPromise}
 */
export function likeVideo(cookie, bvid) {
    let {bili_jct} = qs.parse(cookie, ';');
    const options = {
        url: `http://api.bilibili.com/x/web-interface/archive/like`,
        method: 'post',
        headers: {
            Accept: "*/*",
            Connection: "keep-alive",
            Cookie: cookie,
            "User-Agent": USER_AGENT,
            "Accept-Language": "zh-cn",
            "Content-Type": 'application/x-www-form-urlencoded'
        },
        data: `bvid=${bvid}&like=1&csrf=${bili_jct}`
    };
    return service(options);
}

/**
 * 投币视频，默认投币1枚
 * @param cookie
 * @returns {AxiosPromise}
 */
export function custCoinVideoAPI(cookie, bvid, num = 1) {
    let {bili_jct} = qs.parse(cookie, ';');
    const options = {
        url: `http://api.bilibili.com/x/web-interface/coin/add`,
        method: 'post',
        headers: {
            Accept: "*/*",
            Connection: "keep-alive",
            Cookie: cookie,
            "User-Agent": USER_AGENT,
            "Accept-Language": "zh-cn",
            "Content-Type": 'application/x-www-form-urlencoded'
        },
        data: `bvid=${bvid}&multiply=${num}&csrf=${bili_jct}`
    };
    return service(options);
}

/**
 * 分享视频
 * @param cookie
 * @returns {AxiosPromise}
 */
export function shareVideoAPI(cookie, bvid) {
    let {bili_jct} = qs.parse(cookie, ';');
    const options = {
        url: `http://api.bilibili.com/x/web-interface/share/add`,
        method: 'post',
        headers: {
            Accept: "*/*",
            Connection: "keep-alive",
            Cookie: cookie,
            "User-Agent": USER_AGENT,
            "Accept-Language": "zh-cn",
            "Content-Type": 'application/x-www-form-urlencoded'
        },
        data: `bvid=${bvid}&csrf=${bili_jct}`
    };
    return service(options);
}