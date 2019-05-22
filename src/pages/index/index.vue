<template>
  <div class="main-box clear">
    <div class="banner">
      <el-carousel :interval="5000" arrow="always" height="550">
        <el-carousel-item :key="item.scId" height="550" v-for="item in viewpagerList">
          <img
            :alt="item.scOtherUrl"
            :src="item.scUrl"
            @click="onHref(item.scOtherUrl)"
            class="banner-img"
          >
        </el-carousel-item>
      </el-carousel>
      <div class="bannerdatabox">
        <div class="data-date">
          {{titleData.newDate}}
          <i>{{businessDate ? '开市中' : '已经闭市'}}</i>
        </div>
        <div class="day_data">今日实时数据</div>
        <div class="trade_data">
          <span>累计交易</span>
          <i>{{tempIndexData.allData}}</i>万
        </div>
        <div class="trade_data">
          <span>今日交易</span>
          <i>{{tempIndexData.dayTotal}}</i>万
        </div>
        <div class="trade_data">
          <span>成交量</span>
          <i>{{tempIndexData.dayVolume}}</i>笔
        </div>
      </div>
    </div>
    <div class="markettip">
      <div class="white_W1200">
        <span class="deepcolor">最近成交</span>
        <span class="markettip-item">
          <!-- ref="itemBox" -->
          <span
            class="move"
            v-for="item in latelyDealList.rows"
          >{{item.acceptorName}}{{item.billAmount}}万</span>
        </span>
        <!-- <span class="fan-page">
                    <a @click="onLatelyDeal('left')">&lt;</a>
                    <a @click="onLatelyDeal('right')">&gt;</a>
        </span>-->
      </div>
    </div>
    <div class="novicebluebg">
      <div class="novicebluebg-box white_W1200">
        <div class="nov-item">
          <div class="item-img">
            <img alt src="../../assets/images/index_new/novice1@2x.png">
          </div>
          <div class="item-font">
            <div class="item-font-b">多</div>
            <div class="item-font-s">融资产品多</div>
            <div class="item-font-s">合作方式多</div>
            <div class="item-font-s">票据资源多</div>
          </div>
        </div>
        <div class="nov-item">
          <div class="item-img">
            <img alt src="../../assets/images/index_new/novice2@2x.png">
          </div>
          <div class="item-font">
            <div class="item-font-b">快</div>
            <div class="item-font-s">交易快</div>
            <div class="item-font-s">服务快</div>
            <div class="item-font-s">到账快</div>
          </div>
        </div>
        <div class="nov-item">
          <div class="item-img">
            <img alt src="../../assets/images/index_new/novice3@2x.png">
          </div>
          <div class="item-font">
            <div class="item-font-b">好</div>
            <div class="item-font-s">产品质量好</div>
            <div class="item-font-s">交易收益好</div>
            <div class="item-font-s">信用保障好</div>
          </div>
        </div>
        <div class="nov-item">
          <div class="item-img">
            <img alt src="../../assets/images/index_new/novice4@2x.png">
          </div>
          <div class="item-font">
            <div class="item-font-b">省</div>
            <div class="item-font-s">交易费率低</div>
            <div class="item-font-s">提现0手续费</div>
            <div class="item-font-s">无中间商赚差价</div>
          </div>
        </div>
        <div class="nov-item">
          <div class="item-img">
            <img alt src="../../assets/images/index_new/novice5@2x.png">
          </div>
          <div class="item-font">
            <div class="item-font-b">安</div>
            <div class="item-font-s">银行监管，资金安全</div>
            <div class="item-font-s">专业认证，数据安全</div>
            <div class="item-font-s">多重加密，信息安全</div>
          </div>
        </div>
      </div>
    </div>
    <div class="bluebg index-box white_W1200">
      <div class="box-title">交易信息</div>
      <div class="whitebg-th">
        <span :class="{'selected': businessType}" @click="onBusiness" class="span-l">银行承兑</span>
        <span
          :class="{'selected': !businessType}"
          @click="onBusiness"
          class="span-l"
          style="margin-left:28px;"
        >商业承兑</span>
        <span @click="onPath('hall', true)" class="span-r">
          <img src="../../assets/images/index_new/select@2x.png"> 票据筛选
        </span>
        <span @click="onPath('release', false)" class="span-r">
          <img src="../../assets/images/index_new/fb@2x.png"> 发布票据
        </span>
      </div>
      <div class="whitebg-th-bottom"></div>
      <div class="whitebg">
        <table cellpadding="0" cellspacing="0" class="tablelist">
          <tr>
            <td class="title_td">承兑人</td>
            <td class="title_td">票面金额</td>
            <td class="title_td">到期日期</td>
            <td class="title_td">年化率(约)</td>
            <td class="title_td">每十万贴息</td>
            <td class="title_td">剩余天数</td>
            <td class="title_td">交易平均背书时长</td>
            <td class="title_td">操作</td>
          </tr>
          <tr :key="item.billId" class="info-tr" v-for="item in newBusinessList">
            <td class="infor_td ellipsis_6">
              <el-tooltip :content="item.acceptorName" effect="light" placement="top">
                <span>{{ item.acceptorName | formatSubStr(6) }}</span>
              </el-tooltip>
            </td>
            <td class="infor_td">{{ item.amount }}万</td>
            <td class="infor_td">{{ item.dueDate }}</td>
            <td class="infor_td">{{ item.yearInter }}%</td>
            <td class="infor_td">{{ (item.expcLntrt || 0).toFixed(2) }}元</td>
            <td class="infor_td">{{ item.remainDays || 0 }}天</td>
            <td class="infor_td">{{ item.averageTime || 0 }}</td>
            <td class="infor_td">
              <div @click="onDelist(item)" class="infor_td_btn">我要摘票</div>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="steps">
      <div class="steps-ctx white_W1200">
        <div class="steps-tle">交易流程</div>
        <dl>
          <dt>
            <img src="../../assets/images/index_new/steps1@2x.png">
          </dt>
          <dd>卖方发布数据</dd>
        </dl>
        <div class="ctx-left">&gt;</div>
        <dl>
          <dt>
            <img src="../../assets/images/index_new/steps2@2x.png">
          </dt>
          <dd>买方摘票</dd>
        </dl>
        <div class="ctx-left">&gt;</div>
        <dl>
          <dt>
            <img src="../../assets/images/index_new/steps3@2x.png">
          </dt>
          <dd>卖方确认交易</dd>
        </dl>
        <div class="ctx-left">&gt;</div>
        <dl>
          <dt>
            <img src="../../assets/images/index_new/steps4@2x.png">
          </dt>
          <dd>买方付款</dd>
        </dl>
        <div class="ctx-left">&gt;</div>
        <dl>
          <dt>
            <img src="../../assets/images/index_new/steps5@2x.png">
          </dt>
          <dd>卖方背书</dd>
        </dl>
        <div class="ctx-left">&gt;</div>
        <dl>
          <dt>
            <img src="../../assets/images/index_new/steps6@2x.png">
          </dt>
          <dd>买方签收</dd>
        </dl>
        <div class="ctx-left">&gt;</div>
        <dl>
          <dt>
            <img src="../../assets/images/index_new/steps7@2x.png">
          </dt>
          <dd>卖方到账</dd>
        </dl>
      </div>
    </div>

    <div class="marketbox index-box white_W1200">
      <div class="box-title">市场行情</div>
      <div class="Leftimgbox">
        <div class="marketimg">
          <div class="charts-draw" ref="chart"></div>
        </div>
      </div>
      <div class="Rightinforbox">
        <div class="rinfo-til">
          <span class="tile-span-l">商票市场行情</span>
          <span
            class="tile-span-r"
          >{{getNewTime.date}} {{getNewTime.tiem | formatTime('yyyy-MM-dd')}}</span>
        </div>
        <div class="rinfo-item">
          <div class="item-tr">
            <div class="grain1">承兑人</div>
            <div class="grain2">期限</div>
            <div class="grain3">利率</div>
          </div>
          <div class="rinfo-td-box">
            <div class="item-td" v-for="item in marketList.rows">
              <div class="grain1">{{item.acceptor}}</div>
              <div class="grain2">{{item.marketDate}}</div>
              <div class="grain3">{{item.ecdsRate}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="clear"></div>
    </div>

    <div class="news index-box white_W1200">
      <div class="box-title">行业新闻</div>
      <div class="news-box">
        <img :src="newTopNneData.topData.artcTtlPic || imgurl">
        <div @click="onPathNew(newTopNneData.topData.artcId)" class="index-news-main">
          <h1>{{newTopNneData.topData.artcTtl}}</h1>
          <span>{{(newTopNneData.topData.artcCntnt && newTopNneData.topData.artcCntnt.length > 280) ? newTopNneData.topData.artcCntnt.substr(0,280) + '...' : ''}}</span>
        </div>
        <div class="news-list">
          <ul>
            <li :key="item.artcId" v-for="item in newTopNneData.listData">
              <span @click="onPathNew(item.artcId)" class="newtle">{{item.artcTtl}}</span>
              <span class="li-time">{{item.updateTime | formatTime('yyyy-MM-dd')}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="partner index-box white_W1200">
      <div class="box-title">合作伙伴</div>
      <div class="partner-box">
        <div class="partner-item move">
          <img
            :key="item.scId"
            :src="item.scUrl"
            @click="onHref(item.scOtherUrl)"
            v-for="item in partnerList"
          >

          <!-- <img src="../../assets/images/index_new/test-1.png"> -->
        </div>
        <!-- <el-carousel  type="card" height="80px" autoplay=false>
                    <el-carousel-item v-for="item in partnerList" :key="item.scId" class="partner-item">
                        <img :src="item.scUrl" @click="onHref(item.scOtherUrl)" alt="">

                    </el-carousel-item>
        </el-carousel>-->
      </div>
    </div>
    <div class="supervision index-box white_W1200">
      <div class="box-title">监管单位</div>
      <div class="supervision-box">
        <img src="../../assets/images/index_new/supervision.png">
      </div>
    </div>
  </div>
</template>
<script>
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/line');
require('echarts/lib/component/legendScroll');
require('echarts/lib/component/toolbox');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
import { mapState, mapMutations, mapActions } from 'vuex';
import utilDate from '@/util/date';
import urls from '@/config/url_enum.js';

const mixin = {
    computed: {
        ...mapState({
            businessList: 'businessList',
            bankList: 'bankList',
            companyList: 'companyList',
            industryList: 'industryList',
            indexData: 'indexData',
            stackList: 'stackList',
            marketList: 'marketList',
            latelyDealList: 'latelyDealList',
            isLogin: 'isLogin'
        })
    },
    methods: {
        ...mapMutations({}),
        ...mapActions({
            getBusinessList: 'getBusinessList',
            getBankList: 'getBankList',
            getCompanyList: 'getCompanyList',
            getIndustryList: 'getIndustryList',
            getIndexData: 'getIndexData',
            getStackList: 'getStackList',
            getMarketList: 'getMarketList',
            getLatelyDealList: 'getLatelyDealList',
            getScList: 'getScList'
        })
    }
};
const imgurl = require('../../assets/images/index_new/news.png');
export default {
    mixins: [mixin],
    data() {
        return {
            path: 'hall',
            titleData: {
                newDate: '',
                content: ''
            },
            // 交易类型
            businessType: true,
            optionData: {},
            // 合作伙伴
            partnerList: [],
            // 轮播图
            viewpagerList: [],
            // 滚动位置
            latelyIndex: 0,
            imgurl: imgurl
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.getBankList();
            this.getCompanyList();
            this.getIndustryList();
            this.getIndexData();
            this.realData();
            this.getStackList().then(res => {
                this.bindOptions(res);
            });
            this.getMarketList();
            this.apiBusiness();
            this.getLatelyDealList().then(() => {
                // this.boxAuto();
            });
            this.getScList({ scType: 0 }).then(res => {
                if (res.code === 0) {
                    this.viewpagerList = res.rows;
                }
            });
            this.getScList({ scType: 1 }).then(res => {
                if (res.code === 0) {
                    this.partnerList = res.rows;
                }
            });
            const tempDate = utilDate.getYMDW(new Date());
            this.titleData.newDate =
                tempDate.year + '年' + tempDate.month + '月' + tempDate.day + '日';
            // console.log(this.newDate);
        },
        onDelist(val) {
            if (!this.isLogin) {
                window.top.location.href =
                    location.origin + '/' + urls['login'];
                return;
            }
            this.$router.push({
                path: '/delist',
                query: { ...val }
            });
        },
        // 实时数据
        realData() {
            setInterval(() => {
                this.getIndexData();
                this.apiBusiness();
            }, 30000);
        },
        //
        onBusiness() {
            this.businessType = !this.businessType;
            this.apiBusiness();
        },
        bindOptions() {
            const legendList = ['国股', '城商', '三农', '村镇', '财司'];
            const seriesList = [];
            const xAxisList = [];
            legendList.forEach(res => {
                seriesList.push({
                    name: res,
                    type: 'line',
                    // stack: '总量',
                    data: []
                });
            });
            // stackList.rows
            for (const iterator of this.stackList.rows || []) {
                xAxisList.push((iterator.updateTime || '').substr(0, 10));
                seriesList[0].data.push(this.getNumber(iterator.stateRate));
                seriesList[1].data.push(this.getNumber(iterator.cityRate));
                seriesList[2].data.push(this.getNumber(iterator.ruralRate));
                seriesList[3].data.push(this.getNumber(iterator.agriRate));
                seriesList[4].data.push(this.getNumber(iterator.financeRate));
            }
            const option = {
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: legendList
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: xAxisList
                },
                yAxis: {
                    type: 'value'
                },
                series: seriesList
            };
            // console.log('option', option);
            const myChart = echarts.init(this.$refs.chart);
            myChart.setOption(option);
            // return option;
        },
        getNumber(val) {
            const num = ((val || 0) * 100).toFixed(2);
            const numStr = num.toString();
            return numStr;
        },
        apiBusiness() {
            const params = {
                billType: this.businessType ? 0 : 1,
                pageSize: 7,
                pageNum: 1
            };
            this.getBusinessList(params);
        },
        onPath(path, isBefore) {
            if (isBefore) {
                this.$router.push({
                    path: '/' + path
                });
            } else {
                if (!this.isLogin) {
                    window.top.location.href =
                        location.origin + '/' + urls['login'];
                    return;
                }
                // console.log(location.origin + '/' + urls[path]);
                window.top.location.href = location.origin + '/' + urls[path];
            }
        },
        // 站外跳转
        onHref(url) {
            url && window.open(url);
        },
        onLatelyDeal(type) {
            if (type === 'left') {
                this.latelyIndex--;
            } else {
                this.latelyIndex++;
            }
        },
        // 最近成交
        // boxAuto() {
        //     // return false; // this.$refs.itemBox // .scrollLeft=200 // offsetLeft
        //     this.latelyIndex = 0;
        //     const spanChildre = this.$refs.itemBox.children;
        //     setInterval(() => {
        //         this.latelyIndex++;
        //         const lw = spanChildre[this.latelyIndex].offsetLeft;
        //         // this.$refs.itemBox.scrollLeft = lw;
        //         this.boxAutoPosition(this.$refs.itemBox, lw);
        //         if (this.latelyIndex === spanChildre.length - 1) {
        //             this.latelyIndex = -1;
        //         }
        //     }, 3000);
        // },
        // 滑动效果
        boxAutoPosition(refBox, toLw) {
            const num = 4;
            let newLw = 0;
            const scrollToptimer = setInterval(() => {
                const speed = toLw / num;
                newLw += speed;
                if (newLw - toLw > 20 || !refBox) {
                    clearInterval(scrollToptimer);
                } else {
                    refBox.scrollLeft = newLw;
                }
            }, 30);
        },
        // 跳转新闻详情
        onPathNew(param) {
            this.$router.push({
                path: '/news',
                query: { artcId: param }
            });
        }
    },
    computed: {
        // 实时数据
        tempIndexData() {
            const data = {
                dayVolume: 0,
                dayTotal: 0,
                allData: 0,
                yearVolume: 0,
                yearTotal: 0
            };
            if (
                this.indexData.rows &&
                this.indexData.rows.length > 0 &&
                this.indexData.rows[0]
            ) {
                data.dayVolume = this.indexData.rows[0].dayVolume;
                data.dayTotal = this.indexData.rows[0].dayTotal;
                data.allData = this.indexData.rows[0].allData;
                data.yearVolume = this.indexData.rows[0].yearVolume;
                data.yearTotal = this.indexData.rows[0].yearTotal;
            }
            return data;
        },
        newBusinessList() {
            if (this.businessList.rows && this.businessList.rows.length > 0) {
                return this.businessList.rows.slice(0, 7);
            } else {
                return [];
            }
        },
        // 营业时间
        businessDate() {
            return utilDate.timeRange('8:30', '17:30');
        },
        // 行业新闻
        newTopNneData() {
            let topData = {};
            let listData = [];
            if (
                this.industryList &&
                this.industryList.rows &&
                this.industryList.rows.length > 0
            ) {
                topData = { ...this.industryList.rows[0] };
                topData.artcCntnt = topData.artcCntnt
                    ? topData.artcCntnt.replace(/<[^>]+>/g, '')
                    : '';
                console.log('this.industryList', this.industryList);
                listData = this.industryList.rows.slice(1, 7);
            }
            return { topData, listData };
        },
        getNewTime() {
            const tempDate = utilDate.getYMDW(new Date());
            return {
                date: tempDate.year + '/' + tempDate.month + '/' + tempDate.day,
                tiem:
                    tempDate.hours +
                    ':' +
                    tempDate.hours +
                    ':' +
                    tempDate.seconds
            };
        }
    },
    components: {},
    filters: {
        lastDays(val) {
            return val;
        }
    }
};
</script>
<style lang="less">
@import '../../assets/css/variable.less';
@import '../../assets/css/mixin.less';
.hoverImg () {
    transition: all 0.2s;
    -webkit-transition: all 0.2s; /* Safari */
    &:hover {
        transform: scale(1.3);
        -ms-transform: scale(1.3); /* IE 9 */
        -moz-transform: scale(1.3); /* Firefox */
        -webkit-transform: scale(1.3); /* Safari 和 Chrome */
        -o-transform: scale(1.3);
    }
}

@keyframes move {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-650px);
    }
}

.move {
    animation: move 10s infinite;
    -webkit-animation: move 10s infinite linear;
}
.main-box {
    background-color: #f2f3f5;
    .banner {
        position: relative;
        .banner-img {
            width: 100%;
            height: 550px;
        }
        .el-carousel__container {
            height: 550px;
        }
        .bannerdatabox {
            position: absolute;
            top: 75px;
            right: 90px;
            z-index: 10;
            width: 318px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 10px;
            padding: 26px;
            .data-date {
                font-size: 14px;
                color: #222222;
            }
            .data-date i {
                color: #479ceb;
                font-style: normal;
            }
            .day_data {
                font-size: 22px;
                color: #222222;
                margin-top: 22px;
            }
            .trade_data {
                font-size: 14px;
                color: #555555;
                margin-top: 18px;
            }
            .trade_data span {
                display: inline-block;
                width: 78px;
            }
            .trade_data i {
                font-size: 36px;
                color: #fe8617;
                font-style: normal;
                margin-right: 10px;
            }
        }
    }
    .box-title {
        color: #222222;
        font-size: 24px;
        font-weight: 400;
        padding: 29px 0;
    }
    .index-box {
        padding: 0 26px 0 29px;
        background: #fff;
    }
    .markettip {
        height: 54px;
        line-height: 54px;
        background: #fff;
        border: 1px solid #e8f4ff;
        font-size: 14px;
        overflow: hidden;
        span {
            display: inline-block;
            color: #888888;
            vertical-align: top;
        }
        .markettip-item {
            width: 1060px;
            height: 80px;
            white-space: nowrap;
            overflow-x: auto;
            position: relative;
            span {
                margin-right: 45px;
                color: #fe8617;
            }
            span:last-child {
                margin-right: 0;
            }
        }
        .deepcolor {
            color: #666666;
            margin-right: 18px;
        }
        .fan-page {
            margin-left: 18px;
        }
    }
    .novicebluebg {
        height: 150px;
        background: #fff;
        .novicebluebg-box {
            .flexbox();
            .flexjustify(space-between);
            .nov-item {
                & > div {
                    display: inline-block;
                }
                .item-img {
                    position: relative;
                    height: 63px;
                    margin-top: 39px;
                    .hoverImg();
                }
                .item-font {
                    margin-top: 34px;
                    margin-left: 30px;
                    vertical-align: top;
                    .item-font-b {
                        font-size: 18px;
                        color: #222222;
                        margin-bottom: 10px;
                    }
                    .item-font-s {
                        font-size: 12px;
                        color: #828282;
                    }
                }
            }
        }
    }
    .bluebg {
        margin-top: 16px;
        position: relative;
        font-size: 16px;
        background: #fff;
        .whitebg-th {
            height: 39px;
            line-height: 39px;
            .span-l {
                margin-left: 5px;
                float: left;
                width: 100px;
                text-align: center;
                color: #888888;
                cursor: pointer;
                &.selected {
                    color: #479ceb;
                    border: 1px solid #afafaf;
                    border-bottom: 1px solid #fff;
                }
            }
            .span-r {
                background: rgba(255, 255, 255, 1);
                border: 1px solid rgba(187, 187, 187, 1);
                line-height: 29px;
                height: 30px;
                border-radius: 15px;
                margin-right: 23px;
                float: right;
                text-align: center;
                padding: 0 13px;
                color: #222222;
                cursor: pointer;
                img {
                    height: 14px;
                }
            }
        }
        .whitebg-th-bottom {
            margin-top: 1px;
            border-top: 1px solid #afafaf;
        }
        .whitebg {
            // border: 1px solid rgba(223, 223, 223, 1);
            .tablelist {
                width: 100%;
                margin: 0 auto;
                .title_td {
                    font-size: 14px;
                    color: #999999;
                    text-align: center;
                    padding-top: 25px;
                    padding-bottom: 25px;
                }
                .info-tr {
                    &:hover {
                        background-color: #f2f3f5;
                        .infor_td {
                            color: #222;
                        }
                    }
                    .infor_td {
                        font-size: 15px;
                        color: #888;
                        text-align: center;
                        height: 48px;
                        line-height: 48px;
                    }
                }
                .infor_td_btn {
                    width: 96px;
                    height: 28px;
                    line-height: 27px;
                    font-size: 14px;
                    border-radius: 15px;
                    background-color: #fff;
                    border: 1px solid #fe8617;
                    color: #fe8617;
                    text-align: center;
                    margin: 0 auto;
                    cursor: pointer;
                    &:hover {
                        color: #fff;
                        background-color: #fe8617;
                    }
                }
                .infor_difbtn {
                    background: #ebebeb;
                    color: #333333;
                }
                .infor_difbgbtn {
                    background: #0063dc;
                }
            }
        }
    }
    .steps {
        height: 150px;
        background-color: #479ceb;
        .center();
        color: #fff;
        .steps-ctx {
            .flexbox();
            .flexjustify(space-between);
            padding: 0 94px 0 25px;
            .steps-tle {
                font-size: 22px;
                padding-top: 12px;
            }
            dl {
                dt {
                    text-align: center;
                    img {
                        height: 45px;
                        .hoverImg();
                    }
                }
                dd {
                    margin-top: 22px;
                }
            }
            .ctx-left {
                .center();
                padding-bottom: 36px;
                color: #1c68af;
            }
        }
    }

    .news {
        margin-top: 10px;
        padding-bottom: 30px;
        .news-box {
            .flexbox();
            .flexjustify(space-between);
            color: #222;
            img {
                width: 332px;
                height: 235px;
            }
            .index-news-main {
                border-right: 1px solid #e6e6e6;
                width: 345px;
                padding: 13px 0;
                padding-right: 48px;
                cursor: pointer;
                h1 {
                    margin-bottom: 34px;
                    font-size: 18px;
                }
                span {
                    color: #888888;
                }
            }
            .news-list {
                width: 377px;
                font-size: 14px;
                .newtle {
                    display: inline-block;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    width: 18em;
                    vertical-align: middle;
                }
                li {
                    list-style: disc;
                    margin-bottom: 34px;
                    cursor: pointer;
                    &:last-child {
                        margin-bottom: 0px;
                        color: #222222;
                    }
                    .li-time {
                        float: right;
                        color: #a1a1a1;
                    }
                }
            }
        }
    }
    .partner {
        margin-top: 10px;
        .partner-box {
            padding-bottom: 30px;
            position: relative;
            overflow: hidden;

            // .partner-left {
            //     line-height: 60px;
            //     position: absolute;
            //     top: 0;
            //     left: 0;
            // }
            // .partner-right {
            //     line-height: 60px;
            //     position: absolute;
            //     top: 0;
            //     right: 0;

            .partner-item {
                padding: 0 20px;
                display: inline-block;
                width: 1060px;
                height: 70px;
                white-space: nowrap;
                img {
                    width: 250px;
                    border: 1px solid #ddd;
                    margin: 0 15px;
                }
            }
        }
    }
    .supervision {
        margin-top: 10px;
        .supervision-box {
            text-align: center;
            padding-bottom: 50px;
            img {
                height: 45px;
            }
        }
    }

    .BannerNav {
        height: 94px;
        background: #000720;
        ul {
            width: 1200px;
            margin: 0 auto;
        }
        ul li {
            margin-right: 100px;
            float: left;
            &.mg-right20 {
                margin-right: 20px;
                margin-left: 187px;
            }
            &.mg-right54 {
                margin-right: 54px;
            }
        }
        .navtitle {
            font-size: 16px;
            color: #fff;
            text-align: center;
            margin-top: 14px;
            &.first {
                color: #28dfc3;
                line-height: 94px;
            }
            img {
                margin-top: -8px;
                width: 60px;
                height: 60px;
            }
        }
        .titlenum {
            font-size: 38px;
            color: #ff8a00;
            font-weight: bold;
            text-align: center;
            &.first {
                color: #fff;
                font-size: 16px;
            }
        }
    }
    .Inforbox {
        width: 1200px;
        margin: 0 auto;
        margin-top: 69px;
        .Trabox {
            width: 248px;
            text-align: center;
            float: left;
            .trading {
                width: 43px;
                margin: 0 auto;
            }
            .Infortitle {
                font-size: 32px;
                color: #333333;
            }
        }
        .Inforline {
            width: 476px;
            height: 1px;
            overflow: hidden;
            background: #000000;
            float: left;
            margin-top: 68px;
        }
    }
    .marketbox {
        width: 1200px;
        margin: 0 auto;
        background-color: #fff;
        padding: 0 20px 0 39px;
        .Leftimgbox {
            width: 764px;
            height: 417px;
            float: left;
            .marketimg {
                width: 784px;
                height: 365px;
                .charts-draw {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .Rightinforbox {
            width: 330px;
            height: 364px;
            font-size: 14px;
            float: right;
            box-shadow: 0px 0px 2px 1px #ccc;
            padding: 27px 15px 14px;
            .rinfo-til {
                width: 100%;
                .tile-span-l {
                    font-size: 18px;
                    color: #222222;
                }
                .tile-span-r {
                    font-size: 14px;
                    float: right;
                    color: #888;
                }
            }
            .rinfo-item {
                margin-top: 14px;
                .rinfo-td-box {
                    overflow: auto;
                    height: 250px;
                }
                .grain1 {
                    width: 50%;
                }
                .grain2 {
                    width: 23%;
                }
                .grain3 {
                    width: 23%;
                }

                .item-tr {
                    padding: 0 9px;
                    color: #479ceb;
                    font-size: 14px;
                    margin-bottom: 10px;
                    & > div {
                        display: inline-block;
                    }
                }
                .item-td {
                    padding: 0 9px;
                    font-size: 12px;
                    height: 40px;
                    line-height: 40px;
                    & > div {
                        display: inline-block;
                    }
                    &:nth-child(even) {
                        background-color: #f2f3f5;
                    }
                }
            }
        }
    }

    .newsbox {
        width: 398px;
        margin-top: 71px;
        float: left;
        .newstitle {
            width: 353px;
            font-size: 18px;
            color: #333333;
            font-weight: bold;
            line-height: 26px;
        }
        .newstime {
            font-size: 14px;
            color: #666666;
            margin-top: 10px;
            font-weight: bold;
        }
        .news {
            width: 353px;
            font-size: 14px;
            color: #888888;
            margin-top: 35px;
            line-height: 24px;
        }
        .newsimg {
            width: 395px;
            height: 238px;
            margin-top: 57px;
        }
    }
    .partner {
        span {
            display: inline-block;
            // margin-right: 155px;
        }
        .norightmargin {
            margin-right: 0px;
        }
    }
}
</style>
