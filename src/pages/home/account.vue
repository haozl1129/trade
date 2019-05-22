<template>
  <div class="manage-main">
    <div class="titlebox">
      <div class="maintitle">账户总览</div>
      <div class="voucherbtnbox">
        <span @click="onGopath('/recharge')" class="top-up">充值</span>
        <span @click="onGopath('/cash')" class="top-up withdrawal">提现</span>
      </div>
    </div>
    <div class="statistical">
      <div class="stat_dataimg">
        <div class="chart-box" ref="chart"></div>
        <div class="stat_dataimg_zx">
          <div class="balance">账户余额(元)</div>
          <div class="balance money">{{balance.obj.balance || 0}}</div>
        </div>
      </div>
      <div class="moneyinfor">
        <div class="blueinfor">
          <span class="bluebg"></span>
          <span class="account">账户余额(元)</span>
          <span class="accountnum bluefont">{{balance.obj.balance || 0}}</span>
        </div>
        <div class="blueinfor">
          <span class="bluebg greenbg"></span>
          <span class="account">可用余额(元)</span>
          <span class="accountnum greenfont">{{balance.obj.cashBalance || 0}}</span>
        </div>
        <div class="blueinfor">
          <span class="bluebg redbg"></span>
          <span class="account">冻结余额(元)</span>
          <span class="accountnum redfont">{{balance.obj.freezeBalance || 0}}</span>
          <span class="moneyarrow"></span>
        </div>
        <div class="blueinfor">
          <span class="bluebg greenbg orangebg"></span>
          <span class="account">违约金(元)</span>
          <span class="accountnum orangefont">{{balance.obj.falsify || 0}}</span>
          <span class="moneyarrow"></span>
        </div>
      </div>
    </div>
    <div class="maintitle orderdeal">订单处理</div>
    <div class="tradingbox clear">
      <div class="buytrading">
        <div class="buyicon">
          <img src="../../assets/images/home/icon26.png">
        </div>
        <div class="buyinfor">
          <div class="buy_trad">买方交易</div>
          <div class="infor_deal clear">
            有
            <i>{{personalOrder.obj.buyerCount || '0'}}</i>条待办订单处理
            <span @click="onGopath('/order?orderState=buy')" class="dealbtn">处理</span>
          </div>
        </div>
      </div>
      <div class="buytrading saletrading">
        <div class="buyicon">
          <img src="../../assets/images/home/icon27.png">
        </div>
        <div class="buyinfor">
          <div class="buy_trad">卖方交易</div>
          <div class="infor_deal clear">
            有
            <i>{{personalOrder.obj.sellerCount || '0'}}</i>条待办订单处理
            <span @click="onGopath('/order?orderState=sell')" class="dealbtn">处理</span>
          </div>
        </div>
      </div>
    </div>
    <div class="accounttradbox">
      <div class="accounttitle">
        <div :class="{'tabbg': isAccountTab}" @click="onAccountTab" class="accounttab">交易账户信息</div>
        <div :class="{'tabbg': !isAccountTab}" @click="onAccountTab" class="accounttab">结算账户信息</div>
      </div>
      <div class="accountinfor" v-show="isAccountTab">
        <div class="banktitlebox">
          <span class="banktitle">账户名</span>
          <span
            class="bankcompany"
          >{{shopEntp.obj && shopEntp.obj.bizEntpInfo && shopEntp.obj.bizEntpInfo.entpNm}}</span>
        </div>
        <div class="banktitlebox">
          <span class="banktitle">资金账户</span>
          <span class="bankcompany">{{recharge.obj && recharge.obj.subAcctNo || '暂无'}}</span>
        </div>
        <div class="banktitlebox">
          <span class="banktitle">开户行名称</span>
          <span class="bankcompany">{{recharge.obj && recharge.obj.bankName || '暂无'}}</span>
        </div>
        <div class="banktitlebox">
          <span class="banktitle">开户行号</span>
          <span class="bankcompany">{{recharge.obj && recharge.obj.bankNo || '暂无'}}</span>
        </div>
      </div>
      <div class="accountinfor" v-show="!isAccountTab">
        <div class="banktitlebox">
          <span class="banktitle">账户名</span>
          <span
            class="bankcompany"
          >{{shopEntp.obj && shopEntp.obj.bizEntpInfo && shopEntp.obj.bizEntpInfo.entpNm}}</span>
        </div>
        <div class="banktitlebox">
          <span class="banktitle">账户</span>
          <span class="bankcompany">{{bingAccount.obj && bingAccount.obj.bankAccount || '暂无'}}</span>
        </div>
        <div class="banktitlebox">
          <span class="banktitle">开户行名称</span>
          <span class="bankcompany">{{bingAccount.obj && bingAccount.obj.bankName || '暂无'}}</span>
        </div>
        <div class="banktitlebox">
          <span class="banktitle">开户行号</span>
          <span class="bankcompany">{{bingAccount.obj && bingAccount.obj.bankCode || '暂无'}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/pie');
require('echarts/lib/component/tooltip');
import { mapState, mapMutations, mapActions } from 'vuex';
const mixin = {
    computed: {
        ...mapState({
            balance: 'balance',
            shopEntp: 'shopEntp',
            personalOrder: 'personalOrder',
            bingAccount: 'bingAccount',
            recharge: 'recharge'
        })
    },
    methods: {
        ...mapMutations({}),
        ...mapActions({
            getBalance: 'getBalance',
            getPersonalOrder: 'getPersonalOrder',
            getBingAccount: 'getBingAccount',
            getRecharge: 'getRecharge'
        })
    }
};
export default {
    mixins: [mixin],
    data() {
        return {
            isAccountTab: true
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.getBalance().then(() => {
                this.bindOptions();
            });
            // eslint-disable-next-line no-unused-vars
            this.getPersonalOrder().then(res => {});
            this.getBingAccount();
            this.getRecharge();
        },
        onGopath(path) {
            this.$router.push({
                path: path
            });
        },
        bindOptions() {
            const option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                color: ['#62e581', '#e93030', '#fe8617'],
                series: [
                    {
                        name: '账户',
                        type: 'pie',
                        center: ['50%', '50%'],
                        // radius: ['50%', '80%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '16',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: [
                            {
                                value: this.balance.obj.cashBalance || 0,
                                name: '可用余额'
                            },
                            {
                                value: this.balance.obj.freezeBalance || 0,
                                name: '冻结余额'
                            }
                        ]
                    }
                ]
            };
            const myChart = echarts.init(this.$refs.chart);
            myChart.setOption(option);
        },
        // 切换tab
        onAccountTab() {
            this.isAccountTab = !this.isAccountTab;
        }
    },
    computed: {},
    components: {}
};
</script>
<style lang="less">
@import '../../assets/css/mixin.less';
.manage-main {
    /*=================账户总览=========================*/
    .maintitle {
        display: inline-block;
    }
    .voucherbtnbox {
        margin-top: 17px;
        float: right;
    }
    .top-up {
        width: 68px;
        height: 31px;
        background: #fe8617;
        text-align: center;
        line-height: 31px;
        font-size: 14px;
        color: #fff;
        border-radius: 3px;
        display: inline-block;
        cursor: pointer;
    }
    .withdrawal {
        background: #fff;
        border: 1px solid #fe8617;
        color: #fe8617;
        margin: 0px 21px 0px 21px;
    }
    .statistical {
        margin-left: 151px;
        margin-top: 35px;
        display: flex;
        flex-direction: row;
    }
    .stat_dataimg {
        width: 325px;
        height: 325px;
        position: relative;
        // background: url(../../assets/images/home/img1.jpg) no-repeat;
        // padding-top: 91px;
        .chart-box {
            width: 100%;
            height: 100%;
        }
        .stat_dataimg_zx {
            position: absolute;
            top: 88px;
            left: 88px;
            width: 150px;
            height: 150px;
            background-color: #fff;
            border-radius: 50%;
            .center(column);
        }
    }
    .balance {
        width: 129px;
        margin: 0 auto;
        font-size: 12px;
        color: #828282;
        text-align: center;
    }
    .money {
        font-size: 24px;
        color: #479ceb;
    }
    .moneyinfor {
        margin-left: 116px;
        margin-top: 75px;
    }
    .bluebg {
        width: 18px;
        height: 12px;
        background: #479ceb;
        border-radius: 2px;
        display: inline-block;
    }
    .account {
        font-size: 12px;
        color: #888888;
        margin-left: 9px;
        display: inline-block;
        width: 69px;
    }
    .accountnum {
        font-size: 24px;
        color: #222222;
        text-align: right;
        width: 140px;
        margin-top: 10px;
        display: inline-block;
        position: relative;
        top: 4px;
    }
    .greenbg {
        background: #62e581;
    }
    .greenfont {
        color: #62e581;
    }
    .bluefont {
        color: #479ceb;
    }
    .orangefont {
        color: #fa7906;
    }
    .redbg {
        background: #e93030;
    }
    .redfont {
        color: #e93030;
    }
    .moneyarrow {
        font-size: 14px;
        color: #959595;
        margin-left: 6px;
        display: inline-block;
        position: relative;
        top: 3px;
    }
    .orangebg {
        background: #fe8617;
    }
    .orderdeal {
        margin-top: 49px;
    }
    .tradingbox {
        margin-top: 24px;
        display: flex;
        flex-direction: row;
    }
    .buytrading {
        width: 415px;
        // height: 114px;
        background: #f2f3f5;
        margin-left: 20px;
        padding-top: 26px;
        padding-bottom: 26px;
        display: flex;
        flex-direction: row;
    }
    .buyicon {
        width: 88px;
        height: 88px;
        margin-left: 37px;
    }
    .buyinfor {
        margin-left: 29px;
        margin-top: 20px;
        width: 246px;
    }
    .buy_trad {
        font-size: 16px;
        color: #222222;
    }
    .infor_deal {
        font-size: 14px;
        color: #888888;
        margin-top: 10px;
    }
    .infor_deal i {
        color: #fa7906;
        font-style: normal;
    }
    .dealbtn {
        width: 56px;
        height: 23px;
        background: #479ceb;
        border-radius: 2px;
        display: block;
        float: right;
        display: inline-block;
        text-align: center;
        line-height: 23px;
        color: #fff;
        cursor: pointer;
    }
    .saletrading {
        margin-left: 60px;
    }
    .accounttradbox {
        width: 890px;
        margin: 0 auto;
        margin-top: 32px;
        margin-left: 20px;
    }
    .accounttitle {
        width: 100%;
        height: 40px;
        background: #f2f3f5;
        display: flex;
        flex-direction: row;
    }
    .accounttab {
        font-size: 14px;
        color: #222222;
        line-height: 40px;
        padding: 0px 15px;
        margin-right: 17px;
    }
    .tabbg {
        background: #479ceb;
        color: #fff;
    }
    .accountinfor {
        cursor: pointer;
        margin-left: 120px;
    }
    .banktitle {
        font-size: 14px;
        color: #888888;
        text-align: right;
        width: 30%;
        display: inline-block;
    }
    .bankcompany {
        font-size: 14px;
        color: #222222;
        margin-left: 32px;
    }
    .banktitlebox {
        margin-top: 40px;
    }
    // -------------------------新--------------------------------
}
</style>
