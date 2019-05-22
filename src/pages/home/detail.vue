<template>
  <div class="detail-box">
    <h4>电子票据交易订单</h4>
    <div class="order-tle">
      <div class="tle-item">
        <span>订单号码：</span>
        <span>{{trsOrderInf.orderNo}}</span>
        <span>订单日期：</span>
        <span>{{trsOrderInf.createTime}}</span>
      </div>
      <div class="tle-item">
        <span>订单状态：</span>
        <span>{{trsOrderInf.orderState | getOrderState}}</span>
      </div>
    </div>

    <table class="order-table">
      <tr>
        <td class="table-th" colspan="4">背书账户</td>
      </tr>
      <tr>
        <td class="td-name td-name-first">账户名</td>
        <td>{{trsOrderInf.buyerEntpName}}</td>
        <td class="td-name td-name-first">账号</td>
        <td>{{bizBankAccount.bankAccount}}</td>
      </tr>
      <tr>
        <td class="td-name">开户行</td>
        <td>{{bizBankAccount.bankName}}</td>
        <td class="td-name">开户行行号</td>
        <td>{{bizBankAccount.bankCode}}</td>
      </tr>
    </table>
    <table class="order-table">
      <tr>
        <td class="table-th" colspan="6">电子银票承兑汇票</td>
      </tr>
      <tr>
        <td class="td-name td-name-first" colspan="2">票据号码</td>
        <td>{{trsBillInf.billNo}}</td>
        <td class="td-name td-name-first" colspan="2">票据状态</td>
        <td>{{trsBillInf.billState | getStateName}}</td>
      </tr>
      <tr>
        <td class="td-name" colspan="2">出票日期</td>
        <td>{{trsBillInf.issueDate}}</td>
        <td class="td-name" colspan="2">到期日期</td>
        <td>{{trsBillInf.dueDate}}</td>
      </tr>
      <!-- <tr>
                <td rowspan="3" class="rowspan-3">出票人</td>
                <td>全称</td>
                <td>-</td>
                <td rowspan="3" class="rowspan-3">收票人</td>
                <td>全称</td>
                <td>-</td>
            </tr>
            <tr>
                <td class="td-name">出票日期</td>
                <td>-</td>
                <td class="td-name">到期日期</td>
                <td>-</td>
            </tr>
            <tr>
                <td class="td-name">账号</td>
                <td>-</td>
                <td class="td-name">账号</td>
                <td>-</td>
            </tr>
            <tr>
                <td colspan="2" class="td-name">开户银行</td>
                <td>-</td>
                <td colspan="2" class="td-name">开户银行</td>
                <td>-</td>
      </tr>-->
      <tr>
        <td class="td-name" colspan="2">票据金额(万)</td>
        <td>{{trsBillInf.amount}}</td>
        <td colspan="3">-</td>
      </tr>
      <tr>
        <td class="rowspan-3 td-name" rowspan="2">承兑人</td>
        <td class="td-name">全称</td>
        <td>{{trsBillInf.acceptorName}}</td>
        <td class="td-name" colspan="2">开户行名称</td>
        <td>-</td>
      </tr>
      <tr>
        <td class="td-name">账号</td>
        <td>-</td>
        <td class="td-name" colspan="2">开户行行号</td>
        <td>-</td>
      </tr>
      <tr>
        <td class="td-name" colspan="2" rowspan="2">承兑信息</td>
        <td>-</td>
        <td class="td-name" colspan="2">交易合同号</td>
        <td>{{trsOrderInf.orderNo}}</td>
      </tr>
      <tr>
        <td>-</td>
        <td class="td-name" colspan="2">备注(背书次数)</td>
        <td>{{trsBillInf.latestEndorserCount}}</td>
      </tr>
    </table>
    <table class="order-table">
      <tr>
        <td class="table-th" colspan="4">订单信息</td>
      </tr>
      <tr>
        <td class="td-name td-name-first">票据号码</td>
        <td>{{trsOrderInf.billNo}}</td>
        <td class="td-name td-name-first">-</td>
        <td>-</td>
      </tr>
      <tr>
        <td class="td-name">卖方</td>
        <td>{{trsOrderInf.sellerEntpName}}</td>
        <td class="td-name">买方</td>
        <td>{{trsOrderInf.buyerEntpName}}</td>
      </tr>
      <tr>
        <td class="td-name">附言</td>
        <td colspan="3">-</td>
      </tr>
    </table>
    <table class="order-table">
      <tr>
        <td class="table-th" colspan="6">价格信息</td>
      </tr>
      <tr>
        <td class="td-name td-name-first-2">利率 / 每十万贴息</td>
        <td>{{trsBillInf.yearInter}}% / ￥{{trsBillInf.expcLntrt ? trsBillInf.expcLntrt.toFixed(2) : 0.00}}</td>
        <td class="td-name td-name-first-2">贴息(元)</td>
        <td>￥{{trsBillInf.discountInter}}</td>
        <td class="td-name td-name-first-2">票面金额(万)</td>
        <td>￥{{trsBillInf.amount}}</td>
      </tr>
      <tr>
        <td class="td-name">贴息金额(元)</td>
        <td>￥{{trsBillInf.discountAmount}}</td>
        <td class="td-name">交易佣金(元)</td>
        <td>{{trsOrderInf.realPayAmt-trsOrderInf.totalAmt}}</td>
        <td class="td-name">违约金比例</td>
        <td>0.005%</td>
      </tr>
    </table>
    <table class="order-table">
      <tr>
        <td class="table-th" colspan="4">操作记录</td>
      </tr>
      <tr>
        <td class="td-name td-name-first" colspan="2">操作时间</td>
        <td colspan="2">操作内容</td>
      </tr>
      <tr :key="index " class="td-name" v-for="(item,index) in trsOrderFlows">
        <td colspan="2">{{item.createTime}}</td>
        <td colspan="2">{{item.operType | getOrderState}}</td>
      </tr>
    </table>
    <div class="bill-img">
      <img :src="trsBillInf.BILL_IMAGE_1 || trsBillInf.billImage1" alt>
      <img :src="trsBillInf.BILL_IMAGE_2 || trsBillInf.billImage2" alt>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
const mixin = {
    computed: {
        ...mapState({
            orderDetail: 'orderDetail'
        })
    },
    methods: {
        ...mapMutations({}),
        ...mapActions({
            getOrderDetail: 'getOrderDetail'
        })
    }
};
export default {
    mixins: [mixin],
    props: {
        orderId: {
            type: Number,
            default: ''
        }
    },
    data() {
        return {
            inpu: ''
        };
    },
    watch: {
        orderId(to, from) {
            console.log('orderId', to, from);
            this.getOrderDetail({
                orderId: to
            });
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            console.log('orderId: ', this.orderId);
            this.getOrderDetail({
                orderId: this.orderId
            });
        }
    },
    computed: {
        trsBillInf() {
            console.log('this.orderDetail', this.orderDetail.trsOrderFlows);
            if (this.orderDetail.obj && this.orderDetail.obj.trsBillInf) {
                return this.orderDetail.obj.trsBillInf;
            } else {
                return {};
            }
        },
        trsOrderInf() {
            if (this.orderDetail.obj && this.orderDetail.obj.trsOrderInf) {
                return this.orderDetail.obj.trsOrderInf;
            } else {
                return {};
            }
        },
        trsOrderFlows() {
            if (this.orderDetail.obj && this.orderDetail.obj.trsOrderFlows) {
                return this.orderDetail.obj.trsOrderFlows;
            } else {
                return {};
            }
        },
        bizBankAccount() {
            console.log('this.orderDetail', this.orderDetail.trsOrderFlows);
            if (this.orderDetail.obj && this.orderDetail.obj.bizBankAccount) {
                return this.orderDetail.obj.bizBankAccount;
            } else {
                return {};
            }
        }
    },
    filters: {
        getStateName(val) {
            if (val == 0) {
                return '下架';
            } else if (val == 1) {
                return '上架';
            } else if (val == 2) {
                return '交易中';
            } else if (val == 3) {
                return '交易完成';
            }
        },
        getOrderState(val) {
            if (val == 0) {
                return '作废';
            } else if (val == 1) {
                return '摘票';
            } else if (val == 2) {
                return '卖方确认';
            } else if (val == 3) {
                return '支付';
            } else if (val == 4) {
                return '背书';
            } else if (val == 5) {
                return '签收';
            } else if (val == 6) {
                return '交易完成';
            } else if (val == 7) {
                return '卖方确认取消支付';
            }
        }
    },
    components: {}
};
</script>
<style lang="less">
@import '../../assets/css/mixin.less';
.detail-box {
    color: #333333;
    h4 {
        font-size: 16px;
        text-align: center;
        margin-bottom: 30px;
    }
    .order-tle {
    }
    .order-table {
        border-collapse: collapse;
        text-align: center;
        font-size: 12px;
        width: 100%;
        min-width: 630px;
        margin-top: 20px;
        tr {
            td {
                border: 1px solid #999;
                padding: 8px 0;
            }
        }
        .td-name-first {
            width: 100px;
        }
        .td-name-first-2 {
            width: 100px;
        }
        .table-th {
            background-color: #f4f9ff;
        }
        .rowspan-3 {
            width: 1em;
            padding: 0 8px;
        }
    }
    .bill-img {
        text-align: center;
        margin-top: 20px;
        img {
            display: inline-block;
            width: 280px;
            height: 280px;
            background-color: #999;
        }
    }
}
</style>
