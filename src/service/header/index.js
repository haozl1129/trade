/**
 * 接口
 */

// 等 出 /cnpyr-shop
const logout = {
    url: '/logout',
    method: 'get'
};

// 获取站内信消息列表
const stationMessage = {
    url: '/personal/getStationMessage',
    method: 'get'
};

export default {
    logout,
    stationMessage
};
