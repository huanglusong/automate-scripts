import BaseEnv from "./BaseEnv.js";
import {loginAPI, queryUserDetail} from "../../api/fastcat.js";
import config from "../../config.js";
import persistConf from "../persistConf.js";

// token数据从可持久化的配置中取，取不到或过期需执行登录操作，将新token重新放入可持久化配置中
export default class FastcatEnv extends BaseEnv {
    constructor(name) {
        super(name);
        this.account = '';
        this.userName = '';
        this.password = '';
        this.token = '';
        // 钻石数量
        this.diamondNUm = 0;
        // vip剩余天数
        this.vipRemainDays = 0;
    }


    async init() {
        this.userName = config.fastcat.userName;
        this.password = config.fastcat.password;
        if (!persistConf.get('fastcat.token') || !(await this.checkToken(persistConf.get('fastcat.token')))) {
            // 需要重新登录获取新token
            await this.login();
        }
        let data = await queryUserDetail(persistConf.get('fastcat.token'));
        console.log('获取到的数据是：', data);
        this.token = persistConf.get('fastcat.token');
        this.vipRemainDays = data.data.vipMinutes;
        this.diamondNUm = data.data.point;
        this.account = data.data.userName;
    }

    getUserInfo() {
        return `【当前用户】：${this.account}\n【钻石数量】：${this.diamondNUm}\n【VIP剩余天数】：${this.vipRemainDays}\n`;
    }

    async checkToken(token) {
        let data = await queryUserDetail(token);
        if (data.code === 4) {
            console.log('token已过期');
            return false;
        }
        return true;
    }

    async login() {
        let data = await loginAPI(this.userName, this.password);
        if (data.code !== 1) {
            throw new Error('登录出错！！！');
        }
        persistConf.set('fastcat.token', data.data.token);
    }

}
