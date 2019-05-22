/**
 * 接口
 */

// 登陆 /cnpyr-shop
const login = {
    url: '/login',
    method: 'post'
};
// 验证码 /cnpyr-shop
const captchaImage = {
    url: '/captcha/captchaImage',
    method: 'get'
};
// 找回密码
const password = {
    url: '/password',
    method: 'post'
};
// 短信
const sendMessage = {
    url: '/sendMessage1',
    method: 'post'
};
// 查询企业信息
const shopEntp = {
    url: '/entp',
    method: 'get'
};

export default {
    login,
    captchaImage,
    password,
    sendMessage,
    shopEntp
};
