/**
 * 接口
 */
// 订单列表（买家）
const buyerList = ({ orderState }) => {
    return {
        url: `/order/list/buyer/${orderState}`,
        method: 'get'
    };
};

// 订单列表（卖家）
const sellerList = ({ orderState }) => {
    return {
        url: `/order/list/seller/${orderState}`,
        method: 'get'
    };
};

// 订单详情 /order/detail/{orderId}
const orderDetail = ({ orderId }) => {
    return {
        url: `/order/detail/${orderId}`,
        method: 'get'
    };
};

// 我的票据
const billList = {
    url: '/trsBillInf/list',
    method: 'get'
};
// 上传票据
const billAdd = {
    url: '/trsBillInf/add',
    method: 'post'
};

// 票据上传页面之前查询违约金比例
const billPre = {
    url: '/trsBillInf/pre',
    method: 'get'
};
//根据订单ID查询票据信息
const trsBillInfByOrderId = {
    url: '/trsBillInf/getTrsBillInfByOrderId',
    method: 'get'
};
// 企业信息
const shopAdd = {
    url: '/entp/add',
    method: 'post'
};

// 查询企业信息
const shopEntp = {
    url: '/entp',
    method: 'get'
};

// 企业名称信息等基础信息
const personalBase = {
    url: '/personal/base',
    method: 'get'
};

// 获取绑定结算账户
const account = {
    url: '/entp/account',
    method: 'get'
};
// 绑定结算账户
const saveAccount = {
    url: '/bizBankAccount/save',
    method: 'post'
};
// 注册托管账户
const trusteeship = {
    url: '/entp/trusteeship',
    method: 'post'
};

// 企业账户
const binding = {
    url: '/entp/binding',
    method: 'post'
};
//解绑企业账户
const unBinding = {
    url: '/entp/unbinding',
    method: 'get'
};

// 查询企业是否审批
const isAprv = {
    url: '/entp/isAprv',
    method: 'get'
};

// 询企业是否审批
const balance = {
    url: '/balance/balance',
    method: 'get'
};
// 询企业是否审批
const personalOrder = {
    url: '/personal/order',
    method: 'get'
};
// 修改密码
const personalPassword = {
    url: '/personal/password',
    method: 'post'
};
// 消息中心接口
const inMailList = {
    url: '/personal/getMessage',
    method: 'get'
};

// 卖方确认
const confirm = {
    url: '/order/confirm',
    method: 'post'
};
// 买方付款
const payment = {
    url: '/order/payment',
    method: 'post'
};
// 卖方背书
const recite = {
    url: '/order/recite',
    method: 'post'
};
// 买方签收
const sign = {
    url: '/order/sign',
    method: 'post'
};

// 充值
const recharge = {
    url: '/balance/recharge',
    method: 'get'
};
// 提现
const withdrawal = {
    url: '/balance/withdrawal',
    method: 'get'
};
// 提现
const payList = {
    url: '/balance/paylist',
    method: 'get'
};

// 买方签收
const trsBillInfDown = {
    url: '/trsBillInf/down',
    method: 'post'
};
// 买方签收
const trsBillInfUp = {
    url: '/trsBillInf/up',
    method: 'post'
};
// 删除票据
const trsBillInfRemove = {
    url: '/trsBillInf/remove',
    method: 'post'
};
// 取消订单
const cancel = {
    url: '/order/cancel',
    method: 'post'
};
// 结算账户信息
const bingAccount = {
    url: '/balance/bingAccount',
    method: 'get'
};

// 获取调整天数
const adjustmentDays = {
    url: '/index/getAdjustmentDays',
    method: 'get'
};
// 取消订单
const mobile = {
    url: '/personal/mobile',
    method: 'post'
};
// 短信
const sendMessage = {
    url: '/sendMessage2',
    method: 'post'
};

// 修改用户信息
const edit = {
    url: '/personal/edit',
    method: 'post'
};
// 用户信息
const message = {
    url: '/personal/message',
    method: 'get'
};

// 修改用户信息
const cancelConfirm = {
    url: '/order/cancel/confirm',
    method: 'post'
};
// 票据详情
const trsBillInfo = {
    url: '/index/getTrsBillInf',
    method: 'get'
};
//修改密码
const changeTradePswd = {
    url: '/balance/changeTradePswd',
    method: 'get'
};
//获取pdf订单
const pdf = {
    url: '/pdf',
    method: 'get'
};
// 卖家出售
const notarize = {
    url: '/bidding/notarize',
    method: 'post'
};
// biddingList
const biddingList = {
    url: '/bidding/getBillInfo',
    method: 'get'
};

//获取服务费信息
const serviceFee = {
    url: '/order/service/fee',
    method: 'get'
};
//获取站内信
const stationMessage = {
    url: '/personal/getStationMessage',
    method: 'get'
};
//我的订单各分类的数量
const sellerCount = {
    url: '/order/list/seller/count/null',
    method: 'get'
};
const buyerCount = {
    url: '/order/list/buyer/count/null',
    method: 'get'
};
export default {
    buyerList,
    sellerList,
    billList,
    billAdd,
    billPre,
    orderDetail,
    shopAdd,
    shopEntp,
    personalBase,
    account,
    saveAccount,
    trusteeship,
    binding,
    unBinding,
    isAprv,
    balance,
    personalOrder,
    personalPassword,
    inMailList,
    confirm,
    payment,
    recite,
    sign,
    recharge,
    withdrawal,
    payList,
    trsBillInfDown,
    trsBillInfUp,
    trsBillInfRemove,
    cancel,
    bingAccount,
    adjustmentDays,
    mobile,
    sendMessage,
    edit,
    message,
    cancelConfirm,
    trsBillInfo,
    changeTradePswd,
    pdf,
    notarize,
    biddingList,
    serviceFee,
    trsBillInfByOrderId,
    stationMessage,
    sellerCount,
    buyerCount
};
