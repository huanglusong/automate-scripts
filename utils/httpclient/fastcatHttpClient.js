// 快猫视频封装httpClient
import axios from "axios";
import CryptoJS from "crypto-js";

function aesDecrypt(data, aesKey = '46cc793c53dc451b') { //解密
    if (data.length < 1) {
        return '';
    }
    let key = CryptoJS.enc.Utf8.parse(aesKey);
    let decrypt = CryptoJS.AES.decrypt(data, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr;
}


axios.defaults.headers["Content-Type"] = 'application/json;charset=utf-8'
const service = axios.create({
    baseURL: '',
    timeout: 30000
})

service.interceptors.request.use(config => {
    // 如果是get请求将config的params域拼接至url中
    if (config.method === 'get') {
        let url = config.url + '?';
        if (config.params && typeof config.params !== "undefined") {
            for (let key of Object.keys(config.params)) {
                let part = encodeURIComponent(key) + '=';
                if (config.params[key]) {
                    part += encodeURIComponent(config.params[key]) + '&';
                    url += part;
                }
            }
        }
        config.url = url.slice(0, -1);
        config.params = {};
    }
    return config;
}, error => {
    console.log(error)
    Promise.reject(error)
})


service.interceptors.response.use(resp => {
    if (resp.data.code === 1) {
        var serializer_data = aesDecrypt(resp.data.data);
        resp.data.data = JSON.parse(serializer_data);
    }
    return resp.data;
}, error => {
    console.log(error)
    Promise.reject(error)
})

export default service
