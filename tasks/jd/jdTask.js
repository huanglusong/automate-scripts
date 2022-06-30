import {jdSignBeanApi} from "../../api/jd.js";
import JDEnv from '../../utils/env/JDEnv.js'


let $ = new JDEnv('京东日常任务');


(async () => {
    await before();
    await execute();
    await after();
})().catch(reason => {
    $.addErrMsg(reason.stack);
    $.send();
});

/**
 * 京豆签到
 * @param cookie
 * @returns {Promise<void>}
 */
async function jdBeanSign(cookie) {
    let resp = await jdSignBeanApi(cookie);
    let data = resp.data;
    let dataStr = JSON.stringify(data);
    if (resp.data.code === 3) {
        throw new Error('任务失败, 原因: Cookie失效‼️')
    } else if (dataStr.match(/拼图/)) {
        throw new Error('京东商城-京豆: 失败, 需要拼图验证 ⚠️');
    } else if (dataStr.match(/\"status\":\"?1\"?/)) {
        try {
            $.addDetailMsg(`京东商城-京豆: 成功, 明细: ${data.data.dailyAward.beanAward.beanCount}京豆 🐶`);
        } catch (e) {
            $.addDetailMsg(`京东商城-京豆: 成功, 明细: 无京豆 🐶`);
        }
    } else {
        if (dataStr.match(/(已签到|新人签到)/)) {
            $.addDetailMsg('京东商城-京豆: 失败, 原因: 已签过 ⚠️');
        } else if (dataStr.match(/人数较多|S101/)) {
            $.addDetailMsg('京东商城-京豆: 失败, 签到人数较多 ⚠️');
        } else {
            $.addDetailMsg('京东商城-京豆: 失败, 原因: 未知 ⚠️');
        }
    }
}

async function before() {
    await $.init();
}

async function execute() {
    await jdBeanSign($.cookie);
}

async function after() {
    await $.send();
}
