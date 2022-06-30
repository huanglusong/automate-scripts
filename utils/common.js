import chalk from "chalk";
import moment from 'moment'

export function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    })
}

export function now(fmt = 'YYYY-MM-DD HH:mm:ss') {
    return moment().format(fmt);
}

export const logger = {
    "debug": message => console.log(`${chalk.bgCyan('DEBUG')} ${message}`),
    info: message => console.log(`${chalk.bgCyan('INFO')} ${message}`),
    notice: message => console.log(`${chalk.bgGreen('NOTICE')} ${message}`),
    warning: message => console.log(`${chalk.bgYellow('WARNING')} ${message}`),
    error: message => console.log(`${chalk.bgRed('ERROR')} ${message}`),
};


