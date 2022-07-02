// 发送通知相关的api写在此文件下
import service from "../utils/httpclient/request.js";


// ------------企业微信通知-------------
export function getQYWXAccessToken(qywxamToken) {
    let optionAccessToken = {
        url: `https://qyapi.weixin.qq.com/cgi-bin/gettoken`,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
            corpid: qywxamToken.corpid,
            corpsecret: qywxamToken.corpsecret
        },
    };
    return service(optionAccessToken);
}

export function sendByQYWXAM(accessToken, qywxamToken, head, content) {
    let option = {
        url: `https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=${accessToken}`,
        method: 'post',
        data: {
            touser: qywxamToken.touser,
            agentid: qywxamToken.agentid,
            safe: '0',
        },
        headers: {
            'Content-Type': 'application/json',
        }
    }
    // 如果存在mediaId则发送图文信息，否则发送纯文本信息
    if (qywxamToken.mediaId) {
        // 将内容转义成html格式的内容
        let html = content.replace(/\n/g, '<br/>');
        option.data = Object.assign(option.data, {
            msgtype: 'mpnews',
            mpnews: {
                articles: [
                    {
                        title: `${head}`,
                        thumb_media_id: `${qywxamToken.mediaId}`,
                        author: `黄河滴滴`,
                        content_source_url: ``,
                        content: html,
                        digest: `${content}`
                    }
                ]
            }
        })
    } else {
        option.data = Object.assign(option.data, {
            msgtype: 'text',
            text: {
                content: `${head}\n\n${content}`
            }
        })
    }
    return service(option);
}
