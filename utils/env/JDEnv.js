import config from '../../config.js'
import {totalBean} from "../../api/jd.js";
import BaseEnv from "./BaseEnv.js";

export default class JDEnv extends BaseEnv {
    constructor(name) {
        super(name);
        this.nickName = '';
        this.levelName = '';
        this.isPlusVip = '';
    }


    async init() {
        this.cookie = config.jd.cookie;
        await totalBean(this.cookie).then(resp => {
            let data = resp.data;
            if (data['retcode'] === "1001") {
                throw new Error('jd的cookie已过期！');
            } else if (data['retcode'] === "0" && data.data && data.data.hasOwnProperty("userInfo")) {
                this.nickName = data.data.userInfo.baseInfo.nickname;
                this.levelName = data.data.userInfo.baseInfo.levelName;
                this.isPlusVip = data.data.userInfo.isPlusVip;
            }
        })
    }

    getUserInfo() {
        return `【当前用户】：${this.nickName}\n【当前等级】：${this.levelName}\n【PLUS会员】:${this.isPlusVip ? '是' : '否'}\n`;
    }

}
