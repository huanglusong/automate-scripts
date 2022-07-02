# 如何获取bilibili的cookie信息

本教程介绍获取web端b站用户cookie信息的方法

## 登录b站web端并进入个人中心

### 进入开发者模式

- 可通过f12或`ctril + shift + i`
- 点击应用

- 点击左侧的Cookie
- 点击xxxx.bilibili.com项
- 从右侧筛出需要的cookie键值对并填入config.js文件中，这里需要`SESSDATA,bili_jct,DedeUserID`

![](https://huanghedidi-img-repository.oss-cn-shenzhen.aliyuncs.com/20220702140120.png)