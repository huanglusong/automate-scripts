// cron 0 9 * * * bilibiliTask.js
// new Env('bilibili日常任务');
import {
    custCoinVideoAPI,
    getDailyRewardInfo,
    getVideoDetail,
    likeVideo,
    queryDailyExpByCoin,
    queryDynamicListAPI,
    queryExpLog,
    queryNavUserInfo,
    shareVideoAPI,
} from "../../api/bilibili.js";
import BILIBILIEnv from "../../utils/env/BILIBILIEnv.js";
import {now, sleep} from "../../utils/common.js";

let $ = new BILIBILIEnv('bilibili日常任务');

(async () => {
    await before();
    await execute();
    await after();
})().catch(reason => {
    $.addErrMsg(reason.stack);
    $.send();
});


async function before() {
    await $.init();
    if ($.likeUpVideo || $.custCoin) {
        let dynamicList = await queryDynamicList();
        $.dynamicList = dynamicList;
    }
}

async function execute() {
    let resp = await getDailyRewardInfo($.cookie);
    if (resp.data.code) {
        throw new Error('cookie已失效！');
    }
    let data = resp.data.data;
    $.addDetailMsg('【每日登录任务】：')
    if (data.login) {
        $.addDetailMsg('每日登录任务已完成！');
    } else {
        // todo 暂时不知道使用什么api可以登录
    }
    $.addDetailMsg('【每日观看任务】：');
    if (data.watch) {
        $.addDetailMsg('每日观看任务已完成！');
    } else {
        $.addDetailMsg('正在进行每日观看任务');
        await watch();
        $.addDetailMsg('每日观看任务完成，获得5经验');
    }
    $.addDetailMsg('【每日分享任务：】');
    if (data.share) {
        $.addDetailMsg('每日分享任务已完成！');
    } else {
        $.addDetailMsg('正在进行每日分享任务');
        await share();
        $.addDetailMsg('每日分享任务完成，获得5经验');
    }
    // 点赞视频
    await likeUpVideo();
    // 投币视频
    await castCoinVideo();
    // 数据统计
    await summary();
}

async function login() {
    let resp = await queryNavUserInfo($.cookie);
    if (resp.data.code) {
        throw new Error('cookie有问题！');
    }
    return true;
}

async function queryDynamicList() {
    let resp = await queryDynamicListAPI($.cookie)
    if (resp.data.code) {
        $.addErrMsg(`返回的数据是：${JSON.stringify(resp.data)}`);
        throw new Error('请求有问题！');
    }
    return resp.data.data.items;
}

async function watch() {
    let dynamicList = $.dynamicList;
    for (let item of dynamicList) {
        let videoInfo = item.modules.module_dynamic.major;
        if (videoInfo.type !== 'MAJOR_TYPE_ARCHIVE') {
            continue;
        }
        let title = videoInfo.archive.title;
        let bvid = videoInfo.archive.bvid;
        $.addDetailMsg(`开始观看视频：【${title}】`);
        let resp = await getVideoDetail($.cookie, bvid);
        if (resp.data.code) {
            $.addErrMsg(`返回的数据是：${JSON.stringify(resp.data)}`);
            throw new Error('请求有问题！');
        }
        break;
    }
}

async function share() {
    let dynamicList = $.dynamicList;
    for (let item of dynamicList) {
        let videoInfo = item.modules.module_dynamic.major;
        if (!videoInfo || videoInfo.type !== 'MAJOR_TYPE_ARCHIVE') {
            continue;
        }
        let title = videoInfo.archive.title;
        let bvid = videoInfo.archive.bvid;
        $.addDetailMsg(`开始分享视频：【${title}】`);
        let resp = await shareVideoAPI($.cookie, bvid);
        if (resp.data.code) {
            $.addErrMsg(`返回的数据是：${JSON.stringify(resp.data)}`);
            throw new Error('请求有问题！');
        }
        break;
    }
}

/**
 * 统计
 * @returns {Promise<void>}
 */
async function summary() {
    $.addDetailMsg('【数据统计】：')
    await summaryExp();
    await summaryUserInfo();
}

/**
 * 统计今日获得的经验
 * @returns {Promise<void>}
 */
async function summaryExp() {
    // 查询经验日志
    let resp = await queryExpLog($.cookie);
    if (resp.data.code) {
        $.addErrMsg(`返回的数据是：${JSON.stringify(resp.data)}`);
        throw new Error('请求有问题！');
    }
    let logList = resp.data.data.list;
    let nowStr = now('YYYY-MM-DD');
    let exp = 0;
    for (let log of logList) {
        if (log.time >= nowStr) {
            exp += log.delta;
        }
    }
    $.addDetailMsg(`今天获得的经验为【${exp}】`);
}

/**
 * 统计用户信息 如硬币，等级情况
 * @returns {Promise<void>}
 */
async function summaryUserInfo() {
    let resp = await queryNavUserInfo($.cookie);
    if (resp.data.code) {
        throw new Error('cookie有问题！');
    }
    let data = resp.data.data;
    // 硬币数
    let money = data.money;
    let levelInfo = data.level_info;
    $.addDetailMsg(`硬币余额：【${money}】`);
    $.addDetailMsg(`当前等级：【level${levelInfo['current_level']}】`);
    $.addDetailMsg(`当前经验：【${levelInfo['current_level']}】`);
    $.addDetailMsg(`升级到下一级还需经验：【${levelInfo['next_exp']}】`);
}

async function likeUpVideo() {
    if ($.likeUpVideo) {
        $.addDetailMsg('【点赞UP视频】：');
        let dynamicList = $.dynamicList;
        for (let item of dynamicList) {
            let videoInfo = item.modules.module_dynamic.major;
            if (!videoInfo || videoInfo.type !== 'MAJOR_TYPE_ARCHIVE') {
                continue;
            }
            let title = videoInfo.archive.title;
            let bvid = videoInfo.archive.bvid;
            $.addDetailMsg(`开始点赞视频：【${title}】`);
            let resp = await likeVideo($.cookie, bvid);
            if (resp.data.code === -111) {
                $.addErrMsg(`返回的数据是：${JSON.stringify(resp.data)}`);
                throw new Error('csrf校验失败！');
            } else if (resp.data.code === 65006) {
                $.addDetailMsg(`该视频已点赞！`);
            } else if (resp.data.code) {
                $.addErrMsg(`返回的数据是：${JSON.stringify(resp.data)}`);
                throw new Error('请求有问题！');
            } else {
                $.addDetailMsg(`点赞视频：成功！！`);
            }
            await sleep(1000);
        }
    }
}

/**
 * 给视频投币
 * @returns {Promise<void>}
 */
async function castCoinVideo() {
    if (!$.custCoin) {
        return;
    }
    $.addDetailMsg('【投币UP视频】：')
    // 查询已经投币数
    let resp = await queryDailyExpByCoin($.cookie);
    if (resp.data.code) {
        $.addErrMsg(`返回的数据是：${JSON.stringify(resp.data)}`);
        throw new Error('请求有问题！');
    }
    let num = (resp.data.number) / 10;
    if (num >= $.maxCustCoinNum) {
        $.addDetailMsg(`今日至少投币${num}枚，已达到上限【${$.maxCustCoinNum}】枚！`);
        return;
    }
    let dynamicList = $.dynamicList;
    for (let item of dynamicList) {
        let videoInfo = item.modules.module_dynamic.major;
        if (!videoInfo || videoInfo.type !== 'MAJOR_TYPE_ARCHIVE') {
            continue;
        }
        let title = videoInfo.archive.title;
        let bvid = videoInfo.archive.bvid;
        $.addDetailMsg(`开始投币视频：【${title}】`);
        let resp = await custCoinVideoAPI($.cookie, bvid);
        if (resp.data.code === -111) {
            $.addErrMsg(`返回的数据是：${JSON.stringify(resp.data)}`);
            throw new Error('csrf校验失败！');
        } else if (resp.data.code === 34004) {
            $.addErrMsg(`返回的数据是：${JSON.stringify(resp.data)}`);
            throw new Error('投币间隔太短！');
        } else if (resp.data.code === 34005) {
            $.addErrMsg(`返回的数据是：${JSON.stringify(resp.data)}`);
            throw new Error('投币间隔太短！');
        } else if (resp.data.code === -104) {
            $.addErrMsg(`返回的数据是：${JSON.stringify(resp.data)}`);
            throw new Error('硬币不足！');
        } else if (resp.data.code) {
            $.addErrMsg(`返回的数据是：${JSON.stringify(resp.data)}`);
            throw new Error('超过投币上限！');
        } else {
            $.addDetailMsg(`投币视频：成功！！`);
        }
        if (++num >= $.maxCustCoinNum) {
            break;
        }
        await sleep(3000);
    }

}

async function after() {
    await $.send();
}

async function test() {
    let {data} = await getVideoDetail($.cookie, 'BV14G411x7Vw');
    console.log('返回的列表数据：', JSON.stringify(data));
}
