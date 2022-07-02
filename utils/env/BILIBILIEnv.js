import config from "../../config.js";
import {getAccountInfo} from "../../api/bilibili.js";
import BaseEnv from "./BaseEnv.js";

export default class BILIBILIEnv extends BaseEnv {
    constructor(name) {
        super(name);
        this.name = name;
        this.mid = '';
        // 我的昵称
        this.uname = '';
        // 我的会员等级
        this.rank = '';
        this.likeUpVideo = false;
        this.custCoin = false;
        this.maxCustCoinNum = 0;
    }


    async init() {
        this.cookie = config.bilibili.cookie;
        this.likeUpVideo = config.bilibili.likeUpVideo;
        this.custCoin = config.bilibili.custCoin;
        this.maxCustCoinNum = config.bilibili.maxCustCoinNum;
        let {data} = await getAccountInfo(this.cookie);
        console.log('获取到的数据是：', data);
        if (data.data && data.data.uname) {
            this.uname = data.data.uname;
            this.mid = data.data.mid;
            this.rank = data.data.rank;
        } else {
            throw new Error('cookie已过期！！');
        }

    }

    getUserInfo() {
        return `【当前用户】：${this.uname}\n【当前等级】：${this.rank}\n`;
    }

}
