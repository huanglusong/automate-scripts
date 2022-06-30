// 封装axios
import axios from "axios";

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

export default service
