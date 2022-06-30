# automate-scripts
编写用于自动化操作的脚本，如各种app的签到等

## 目前支持的功能
- bilibili日常任务：自动完成每日任务，给关注的up点赞和投币
- 京东签到

## 使用方式
### 创建config.json文件
config.json文件格式：
`{
"jd": {
"cookie": "pt_pin=xxx;pt_key=xxxxxxxx;"
},
"bilibili": {
"cookie": "SESSDATA=xxxx;DedeUserID=xxx;bili_jct=xxxxx;",
"likeUpVideo": true,
"custCoin": true,
"maxCustCoinNum": 2
},
"notify": {
"qywx": {
"corpid": "xxxx",
"corpsecret": "xxxx",
"touser": "@all",
"agentid": "1000002",
"mediaId": "xxxxx",
"sage": "0"
}
}
}`
