import {SEPARATOR_LINE} from "./../constants.js";
import {notifyAll} from "./../notifyUtils.js";
import {now} from "./../common.js";

export default class BaseEnv {
    constructor(name) {
        this.name = name;
        this.cookie = '';
        this.detailMsg = [];
        this.errMsg = [];
    }


    addDetailMsg(msg) {
        this.detailMsg.push(msg);
    }

    addErrMsg(msg) {
        this.errMsg.push(msg);
    }


    async init() {
        console.log('需子类重写');
    }

    getUserInfo() {
        return '需子类重写\n';
    }

    async send() {
        let content = `【当前时间】：${now()}\n`;
        content += this.getUserInfo();
        content += `【明细】：\n`;
        if (this.detailMsg.length > 0) {
            content += `${this.detailMsg.join('\n')} \n`
        } else {
            content += `无明细内容\n`;
        }
        content += `${SEPARATOR_LINE}【异常】:\n`;
        if ((this.errMsg.length > 0)) {
            content += `${this.errMsg.join('\n')}`;
        } else {
            content += `无异常\n`;
        }
        await notifyAll(this.name, content);
    }
}