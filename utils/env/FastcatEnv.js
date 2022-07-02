import BaseEnv from "./BaseEnv.js";
import {queryUserDetail} from "../../api/fastcat.js";

export default class BILIBILIEnv extends BaseEnv {
    constructor(name) {
        super(name);
        this.account = '';
        // 钻石数量
        this.diamondNUm = 0;
        // vip剩余天数
        this.vipRemainDays = 0;
    }


    async init() {
        let data = await queryUserDetail();
        console.log('获取到的数据是：', data);
        this.vipRemainDays = data.data.vipMinutes;
        this.diamondNUm = data.data.point;
        this.account = data.data.userName;
    }

    getUserInfo() {
        return `【当前用户】：${this.account}\n【钻石数量】：${this.diamondNUm}\n【VIP剩余天数】：${this.vipRemainDays}\n`;
    }

}
