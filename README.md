# automate-scripts 自动化脚本

## 介绍

此仓库编写一些自动化脚本，用于简化操作，解决重复性的工作，如app（B站、京东等）的签到任务，视频网站最新讯息的推送等等。脚本仅限个人学习使用，如滥用后果由使用者自行承担。

## 目前支持的功能

### 哔哩哔哩

- 一键完成日常任务，包括登录，签到，分享，可获得20经验
- 点赞关注的up主最新视频：支持参数配置是否开启此功能
- 投币关注的up主最新视频：支持参数配置是否开启此功能，以及一天最多的投币数量
- 数据汇总：汇总今日经验值等数据

### 京东

- 京东商城的京豆签到

### 快猫视频

- 获取最新视频信息，支持VIP及付费内容

### 通知

目前进实现企业微信的通知渠道，本人最常用且仅使用此通知渠道，后续考虑添加更多渠道

#### 企业微信

- 任务完成后，整理任务的明细及异常信息推送至企业微信，此功能支持参数配置开关

## 使用方式

### 安装node环境

node的安装过程不展开，自行寻找教程，推荐node版本为14以上（因本人开发环境为14）

### 克隆仓库

```shell
git clone https://github.com/huanglusong/automate-scripts.git
```

### 安装依赖

进入仓库相应的目录，执行 `npm i`，如出现无法下载依赖的问题，可考虑配置npm的国内镜像环境

### 开始使用

#### 配置文件

在项目根路径复制`config-sample.js`文件并重命名为`config.js`文件，此文件为配置文件，格式如下：

```javascript
export default {
    "jd": {
        "cookie": "pt_pin=xxxxxx;pt_key=xxxxxxx;"
    },
    "bilibili": {
        "cookie": "SESSDATA=xxxxxxx;DedeUserID=xxxxxxx;",
        "likeUpVideo": true,
        "custCoin": true,
        "maxCustCoinNum": 2
    },
    "fastcat": {
        "token": "xxxxxxx"
    },
    "notify": {
        "qywx": {
            "open": true,
            "token": {
                "corpid": "xxxxxxx",
                "corpsecret": "xxxxxxx",
                "touser": "xxxxxx",
                "agentid": "xxxxxxx",
                "mediaId": "xxxxxxx",
                "sage": "0"
            },

        }
    }
}
```

- 京东cookie信息获取方式参考：[获取京东Cookie教程](https://github.com/huanglusong/automate-scripts/blob/main/wiki/getJdCookie.md)
- bilibili cookie信息获取方式参考：[获取b站Cookie教程](https://github.com/huanglusong/automate-scripts/blob/main/wiki/getBilibiliCookie.md)
- 快猫视频 token信息获取方式：自行摸索，懂得都懂
- 通知配置参考：[企业微信应用](https://note.youdao.com/ynoteshare/index.html?id=351e08a72378206f9dd64d2281e9b83b&type=note&_time=1656741876655)

#### 快速体验

使用node命令执行对应脚本即可

#### 定时任务启动

定时任务的一个小细节是：`PATH`环境变量默认只加载`/usr/bin`目录，这意味着`node`命令可能找不到，所以如果`node`未安装至`/usr/bin`目录下，需在执行定时任务时激活。

定时任务配置示例：

`crontab -e`

```shell
0 9 * * * export PATH=$PATH:node安装目录/bin; cd automate-scripts安装目录; node tasks/xxxxTask.js
```

