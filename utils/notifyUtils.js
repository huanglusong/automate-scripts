// 通知工具类 支持通过企业微信机器人发送通知
import {getQYWXAccessToken, sendByQYWXAM} from "../api/notify.js";
import config from "../config.js";

export async function notifyByQYWXAM(head, content) {
    if (!config.notify.qywx.open) {
        return;
    }
    let qywxToken = config.notify.qywx.token;
    if (!qywxToken) {
        console.log('未配置企业微信token信息！')
        throw new Error('未配置企业微信token信息');
    }
    let resp = await getQYWXAccessToken(qywxToken)
    if (resp.data["access_token"]) {
        resp = await sendByQYWXAM(resp.data["access_token"], qywxToken, head, content);
        console.log('发送微信通知完成，返回的数据是：', resp.data);
    } else {
        console.log('获取accessToken信息出错！');
    }
}

export async function notifyAll(head, content) {
    await notifyByQYWXAM(head, content);
}
