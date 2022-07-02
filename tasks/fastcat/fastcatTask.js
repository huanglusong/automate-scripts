// 快猫视频任务
// 获取最新的影片信息并推送通知

import FastcatEnv from "../../utils/env/FastcatEnv.js";
import {getVideoUrl, queryLatestVideoList} from "../../api/fastcat.js";
import {sleep} from "../../utils/common.js";

let $ = new FastcatEnv('快猫视频任务');

(async () => {
    await before();
    await execute();
    await after();
})().catch(reason => {
    $.addErrMsg(reason.stack);
    $.send();
});

async function before() {
    await $.init();
}

async function execute() {
    let data = await queryLatestVideoList();
    console.log('execute', data)
    let videoList = data.data.list;
    if (videoList.length === 0) {
        throw new Error('视频列表为空！');
    }
    $.addDetailMsg(`最新视频【${videoList.length}】条`)
    for (let video of videoList) {
        let videoDetail = await getVideoUrl(video.id);
        let url = videoDetail.data.url;
        $.addDetailMsg(`【视频标题】:${video.name}`);
        $.addDetailMsg(`【视频URL】:\n${url}`);
        await sleep(100);
    }
}

async function after() {
    await $.send();
}
