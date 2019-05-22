/**
 * 跳转url
 */
import config from './index';
let path = '';
let proPath = '';
let register = '';
let login = '';
let index = '';
let home = '';
if (config.env === 'dev') {
    path = '_trade';
    register = `register${path}.html`;
    login = `login${path}.html`;
    index = `index${path}.html`;
    home = `home${path}.html`;
} else {
    proPath = config.serverHost + '/';
    register = `${proPath}register`;
    login = `${proPath}login`;
    index = `${proPath}index`;
    home = `${proPath}home`;
}

export default {
    register: register,
    login: login,
    home: home,
    index: index,
    hall: `${index}#/hall`,
    news: `${index}#/news`,
    bank: `${index}#/bank`,
    join: `${index}#/join`,
    vip: `${index}#/vip`,
    release: `${home}#/release`,
    password: `${home}#/password`,
    order: `${home}#/order`,
    bill: `${home}#/bill`,
    recharge: `${home}#/recharge`,
    cash: `${home}#/cash`,
    help: `${index}#/help`,
    about: `${index}#/about`,
    contract:`${index}#/contract`
};
