/**
 * 接口
 */

// 短信
const sendMessage = {
    url: '/sendMessage',
    method: 'post'
};
// 注册
const regist = {
    url: '/register',
    method: 'post'
};
// 等处
const logout = {
    url: '/logout',
    method: 'get'
};

export default {
    sendMessage,
    regist,
    logout
};
