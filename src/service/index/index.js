/**
 * 接口
 */
// 获取站内信消息列表
const stationMessage = {
    url: '/personal/getStationMessage',
    method: 'get'
};
//2.1.	商票查询
/**
    承兑人名称	acceptorName	VARCHAR2
    票面金额	amount	Double
    到期日期	dueDate	VARCHAR2
    年利率	yeaeRate	Double
    每十万扣款	expcLntrt	Double
    主键标识	billId	Integer

    code		0：成功 1：失败
    total		总数：默认返回最新的7条
    rows		数据集合
 */
const businessList = {
    url: '/index/bill/business',
    method: 'get'
};
// 2.2.	银票查询
const bankList = {
    url: '/index/bill/bank',
    method: 'get'
};
/**
 * 2.3.	公司动态
文章名称	artcTtl	VARCHAR2
文章简介	artcBrf	VARCHAR2
创建时间	createTime	VARCHAR2
主键id	artcId	Integer
 */
const companyList = {
    url: '/index/news/company',
    method: 'get'
};
// 2.4.	行业新闻
const industryList = {
    url: '/index/news/industry',
    method: 'get'
};
// 交易大厅
const trsBillInfList = {
    url: '/index/bill',
    method: 'get'
};
// // 详情
// const detail = ({ orderId }) => {
//     return {
//         url: `/shop/order/detail/${orderId}`,
//         method: 'get'
//     };
// };

const addOrder = {
    url: '/order/add',
    method: 'post'
};

// 首页实时数据
const indexData = {
    url: '/realData/data',
    method: 'get'
};
// 银行快贴
const stackList = {
    url: '/stacklist',
    method: 'get'
};
// // 轮播图
// const viewpagerList = {
//     url: '/viewpager',
//     method: 'get'
// };
// // 首页合作伙伴--- 废弃
// const partnerList = {
//     url: '/partner',
//     method: 'get'
// };
// 商票市场行情查询(首页实时利率涨幅)
const marketList = {
    url: '/index/marketList',
    method: 'get'
};
// 最近成交
const latelyDealList = {
    url: '/index/latelyDeal',
    method: 'get'
};

// 轮播图/合作伙伴
const scList = {
    url: '/index/scList',
    method: 'get'
};
// 票据详情
const trsBillInfo = {
    url: '/index/getTrsBillInf',
    method: 'get'
};
// 加盟
const partadd = {
    url: '/partadd',
    method: 'post'
};
// 询企业是否审批
const balance = {
    url: '/balance/balance',
    method: 'get'
};

// 询企业是否审批
const content = {
    url: '/index/news/content',
    method: 'get'
};
// 查询企业信息
const shopEntp = {
    url: '/entp',
    method: 'get'
};

// 承兑人类型
const acceptorTypeList = {
    url: '/trsBillInf/getAcceptorType',
    method: 'get'
};

// 获取调整天数
const adjustmentDays = {
    url: '/index/getAdjustmentDays',
    method: 'get'
};

//修改密码
const isHoliday = {
    url: '/index/isHoliday',
    method: 'get'
};
// 买家竞价
const biddingCount = {
    url: '/bidding/count',
    method: 'post'
};

export default {
    businessList,
    bankList,
    companyList,
    industryList,
    trsBillInfList,
    addOrder,
    indexData,
    stackList,
    marketList,
    latelyDealList,
    scList,
    trsBillInfo,
    partadd,
    balance,
    content,
    shopEntp,
    acceptorTypeList,
    adjustmentDays,
    isHoliday,
    biddingCount,
    stationMessage
};
