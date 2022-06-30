import Conf from "conf";
import path from 'path';

const __dirname = path.resolve();
// console.log('当前的路径是啥？？？？',__dirname)
let conf = new Conf({
    cwd: `${__dirname}/../..`,
    configName: 'config',
    fileExtension: 'json',
});
export default conf;
