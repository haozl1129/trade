<template>
    <div class="order-main">
        <h3>我的订单</h3>
        <div class="allorderbox">
            <div class="buyorder clear">
                <ul>
                    <!-- <li>全部</li> -->
                    <li :class="{'select': tabKey === 'buy'}" @click="onTabBuySell('buy')">买入订单</li>
                    <li :class="{'select': tabKey === 'sell'}" @click="onTabBuySell('sell')">卖出订单</li>
                </ul>
            </div>
            <div class="buyorder clear">
                <ul>
                    <li :class="{'select': !state}" @click="onOrderState(null)">全部</li>
                    <!-- <el-badge :value="12" class="item" v-for="(value, key, index) in nullList">
                        {{item.key}}>
                        <li :class="{'select': state === item.key}" :key="item.key" @click="onOrderState(item.key)" v-for="item in orderStateList">
                            {{item.value}}
                            <span class="null"></span>
                        </li>
                    </el-badge> -->
                    <el-badge class="item" v-for="item in orderStateList" :key="item.key" :value="item.badge" :hidden="item.badge === 0">
                        <!-- {{item.key}}> -->
                        <li :class="{'select': state === item.key}" @click="onOrderState(item.key)">
                            {{item.value}}
                            <span class="null"></span>
                        </li>
                    </el-badge>

                </ul>
            </div>
        </div>
        <div class="ordertable">
            <div :key="item.orderId" class="myorderbox" v-for="item in getDataList">
                <div class="ordertitle">
                    <div class="lefttitle">{{item.acceptorName}}{{item.billAmount}}</div>
                    <div class="rightdate">{{item.createTime}} 发布</div>
                </div>
                <div class="orderinforbox">
                    <div class="leftinfor">
                        <div class="ordernumberbox">
                            <span class="ordernum">
                                订单编号：
                                <i @click="onOpenAction(item)">{{item.orderNo}}</i>
                            </span>
                            <span class="orderdate">{{item.updateTime}}</span>
                            <a :href="item.contractUrl" @click="openContract(item)" class="contractbtn" target="_blank">查看合同</a>
                            <span @click="onOpenShangqiao(item.orderNo)" class="contractbtn sellerbtn">联系客服</span>
                        </div>
                        <div class="orderdetailbox">
                            <div class="detailbox">
                                <div class="detailname">票据号码</div>
                                <div class="detailnum hide1">{{item.billNo}}</div>
                            </div>
                            <div class="orderline"></div>
                            <div class="detailbox">
                                <div class="detailname">票面金额（万）</div>
                                <div class="detailnum">{{item.billAmount}}</div>
                            </div>
                            <div class="orderline"></div>
                            <div class="detailbox">
                                <div class="detailname">成交价格</div>
                                <div class="detailnum">{{item.totalAmt}}</div>
                            </div>
                            <div class="orderline"></div>
                            <div class="detailbox">
                                <div class="detailname">{{tabKey === 'buy' ? '卖方' :'买方'}}</div>
                                <div class="detailnum hide2">{{tabKey === 'buy' ? item.sellerEntpName : item.buyerEntpName || '-'}}</div>
                            </div>
                            <div class="orderline"></div>
                            <div class="detailbox">
                                <div class="detailname">订单状态</div>
                                <div class="detailnum orderstatewidth">{{item.orderState | getState(item.cancelSign, item.overTimeSign)}}</div>
                            </div>
                            <div class="orderline"></div>
                            <div class="detailbox">
                                <div class="detailname">申诉处理结果</div>
                                <div class="detailnum">暂无</div>
                            </div>
                            <div class="orderline"></div>
                            <div class="detailbox">
                                <div class="detailname">倒计时</div>
                                <div class="detailnum" v-if="!(item.orderState == 5 || item.orderState == 6)">
                                    <orderCountdown :expiratTime="item.expiratTime" @onRefresh="onRefresh"></orderCountdown>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="rightbtnbox">
                        <template v-if="item.overTimeSign != 0">
                            <div @click="onCancel(item.orderId, item.orderState)" class="cancelbtn" size="mini" type="primary" v-if="(item.orderState != 6 && item.orderState != 5) & (item.cancelSign == 5 || !item.cancelSign)">取消订单</div>
                            <div @click="onCancelConfirm(item.orderId)" class="cancelbtn" size="mini" type="primary" v-if="tabKey === 'buy' && item.orderState != 6 && item.cancelSign == 2">确认取消</div>
                            <div @click="onCancelConfirm(item.orderId)" class="cancelbtn" size="mini" type="primary" v-if="tabKey === 'sell' && item.orderState != 6 && item.cancelSign == 1">确认取消</div>
                            <div @click="onConfirm(item.orderId)" class="cancelbtn buyersbtn" size="mini" type="primary" v-if="(tabKey === 'sell' && item.orderState == 1 ) && (item.cancelSign == 5 || !item.cancelSign)">卖方确认</div>
                            <div @click="onPayment(item.orderId)" class="cancelbtn buyersbtn" size="mini" type="primary" v-if="(tabKey === 'buy' && item.orderState == 2) && (item.cancelSign == '5' || !item.cancelSign)">买方付款</div>
                            <div @click="onRecite(item.orderId)" class="cancelbtn buyersbtn" size="mini" type="primary" v-if="tabKey === 'sell' && item.orderState == 3 && (item.cancelSign == '5' || !item.cancelSign) ">卖方背书</div>

                            <div @click="onSign(item.orderId)" class="cancelbtn buyersbtn" size="mini" type="primary" v-if="(tabKey === 'buy' && item.orderState == 4) && (item.cancelSign == 5 || !item.cancelSign)">买方签收</div>
                            <div @click="onPublish(item.orderId)" class="cancelbtn buyersbtn" size="mini" type="primary" v-if="(tabKey === 'buy' && item.orderState == 5)">发布</div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <div class="page-box">
            <el-pagination :current-page="pageDate.currentPage" :page-size="pageDate.pageSize" :page-sizes="pageDate.pageSizes" :total="pageDate.pageTotal" @current-change="handleCurrentChange" @size-change="handleSizeChange" layout="total, prev, pager, next, jumper"></el-pagination>
        </div>

        <el-dialog :visible="detailDialog" @close="onClose" @open="onOpen" append-to-body title="订单详情">
            <detail :orderId="orderId"></detail>
        </el-dialog>

        <el-dialog :visible.sync="openUrlDialog" title="提示" width="30%">
            <el-input class placeholder ref="openurl" size="small" v-model="openUrl">
                <el-button @click="onCopy" slot="append">复制</el-button>
            </el-input>
            <span class="dialog-footer" slot="footer">
                <el-button @click="openUrlDialog = false" size="small" type="primary">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import detail from './detail.vue';
import commonMixin from '@/mixin/search.js';
import orderCountdown from '@/components/home/order-countdown';

const mixin = {
    computed: {
        ...mapState({
            buyerList: 'buyerList',
            sellerList: 'sellerList',
            BuyerCount: 'BuyerCount',
            SellerCount: 'SellerCount'
        })
    },
    methods: {
        ...mapMutations({}),
        ...mapActions({
            getBuyerList: 'getBuyerList',
            getSellerList: 'getSellerList',
            postConfirm: 'postConfirm',
            postPayment: 'postPayment',
            postRecite: 'postRecite',
            postSign: 'postSign',
            postCancel: 'postCancel',
            postCancelConfirm: 'postCancelConfirm',
            getPdf: 'getPdf',
            getBuyerCount: 'getBuyerCount',
            getSellerCount: 'getSellerCount'
        })
    }
};

const orderState = [
    { key: 1, value: '待确认', state: 0, badge: 0 },
    { key: 2, value: '待付款', state: 0, badge: 0 },
    { key: 3, value: '待背书', state: 0, badge: 0 },
    { key: 4, value: '待签收', state: 0, badge: 0 },
    { key: 5, value: '交易成功', state: 0, badge: 0 },
    { key: 6, value: '交易取消', state: 0, badge: 0 },
    { key: 7, value: '取消中', state: 0, badge: 0 }
];
const tempSearch = {
    orderState: null
};
export default {
    mixins: [mixin, commonMixin(tempSearch)],
    data() {
        return {
            orderStateList: orderState,
            state: null,
            tabKey: 'buy', // buy:买家 sell ： 卖家
            detailDialog: false,
            orderId: -1,
            openUrlDialog: false,
            openUrl: '',
            nullList: {}
        };
    },
    mounted() {
        this.tabKey = this.$route.query.orderState || 'buy';
        this.init();
    },
    methods: {
        init() {
            this.onSearch();
        },
        privateRequest(params) {
            if (this.tabKey === 'buy') {
                this.getBuyerList(params);
                this.getBuyerCount().then(res => {
                    if (res.code === 0) {
                        // const nullList = res.obj;
                        this.setBadge(res.obj);
                    }
                });
            } else {
                this.getSellerList(params);
                this.getSellerCount().then(res => {
                    if (res.code === 0) {
                        // const nullList = res.obj;
                        this.setBadge(res.obj);
                    }
                });
            }
        },
        // 消息数量赋值
        setBadge(obj) {
            for (const item of this.orderStateList) {
                if (item.key === 1) {
                    item.badge = obj.confirm;
                } else if (item.key === 6) {
                    item.badge = obj.cancel;
                } else if (item.key === 5) {
                    item.badge = obj.pay;
                } else if (item.key === 3) {
                    item.badge = obj.recite;
                } else if (item.key === 4) {
                    item.badge = obj.sign;
                }
            }
        },
        onOrderState(state) {
            this.state = state;
            this.searchForm.orderState = state;
            this.onSearchForm();
            // if (this.tabKey === 'buy') {
            //     this.getBuyerList({ orderState: state });
            // } else {
            //     this.getSellerList({ orderState: state });
            // }
        },
        onTabBuySell(val) {
            this.tabKey = val;
            this.onSearchForm();
            // if (val === 'buy') {
            //     this.getBuyerList({ orderState: this.state });
            // } else {
            //     this.getSellerList({ orderState: this.state });
            // }
        },
        onClose() {
            this.detailDialog = false;
        },
        onOpen(val) {
            console.log(val);
        },
        onOpenAction(val) {
            console.log('onOpenAction', val);
            this.orderId = val.orderId;
            this.detailDialog = true;
        },
        onConfirm(orderId) {
            this.postConfirm({ orderId: orderId }).then(res => {
                if (res.code === 0) {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    });
                    this.onHoldSearch();
                }
            });
        },
        onPayment(orderId) {
            this.postPayment({ orderId: orderId }).then(res => {
                if (res.code === 0) {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    });
                    this.openUrl = res.obj;
                    if (!!window.ActiveXObject || 'ActiveXObject' in window) {
                        window.open(this.openUrl);
                    } else {
                        this.openUrlDialog = true;
                    }
                    this.onHoldSearch();
                }
            });
        },
        onRecite(orderId) {
            this.postRecite({ orderId: orderId }).then(res => {
                if (res.code === 0) {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    });
                    this.onHoldSearch();
                }
            });
        },
        onSign(orderId) {
            this.postSign({ orderId: orderId }).then(res => {
                if (res.code === 0) {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    });
                    this.onHoldSearch();
                }
            });
        },
        // 发布
        onPublish(orderId) {
            this.$router.push({
                path: '/release',
                query: { orderId }
            });
        },
        onCancel(orderId, orderState) {
            if (orderState == 3) {
                this.$confirm('订单已付款，取消订单需要后台审核, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.postCancel({ orderId: orderId }).then(res => {
                        if (res.code === 0) {
                            this.$message({
                                message: res.msg,
                                type: 'success'
                            });
                            this.onHoldSearch();
                        }
                    });
                });
            } else {
                this.postCancel({ orderId: orderId }).then(res => {
                    if (res.code === 0) {
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        });
                        this.onHoldSearch();
                    }
                });
            }
        },
        // 复制
        onCopy() {
            this.$refs.openurl.select();
            if (document.execCommand('copy')) {
                document.execCommand('copy');
                this.$message({
                    showClose: true,
                    type: 'success',
                    message: '复制成功'
                });
            }
        },
        // 取消确认
        onCancelConfirm(orderId) {
            this.postCancelConfirm({ orderId: orderId }).then(res => {
                if (res.code === 0) {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    });
                    this.onHoldSearch();
                }
            });
        },
        onOpenShangqiao(orderNo) {
            document.getElementById('nb_invite_ok').click();
            document.getElementById(
                'nb-nodeboard-set-content-js'
            ).value = orderNo;
        },
        onRefresh() {
            this.onHoldSearch();
        },
        // 打开合同
        openContract(param) {
            this.getPdf({ orderID: param.orderId }).then(res => {
                if (res.code === 0) {
                    window.open(res.pdfPath);
                }
            });
        }
    },
    computed: {
        //  返回列表
        getDataList() {
            let list = [];
            if (this.tabKey === 'buy') {
                list = this.buyerList.rows;
            } else {
                list = this.sellerList.rows;
            }
            return list;
        }
    },
    components: {
        detail: detail,
        orderCountdown: orderCountdown
    },
    filters: {
        getState(val, cancelSign, overTimeSign) {
            if (overTimeSign === 0) {
                return '订单超时';
            }
            if (val == 5) {
                return '交易成功';
            }

            if (cancelSign != 5 && cancelSign && val != 6) {
                return '取消中';
            }

            val = parseInt(val || 0);
            if (val === 1) {
                return '待确认';
            } else if (val === 2) {
                return '待付款';
            } else if (val === 3) {
                return '待背书';
            } else if (val === 4) {
                return '待签收';
            } else if (val === 5) {
                return '交易成功';
            } else if (val === 6) {
                return '交易取消';
            }
            return val;
        }
    }
};
</script>
<style lang="less">
@import '../../assets/css/mixin.less';
.order-main {
    background: #fff;
    //padding: 0 30px;
    height: 100%;

    .allorderbox {
        padding-left: 20px;
        margin-top: 16px;
    }
    .buyorder ul li {
        cursor: pointer;
        float: left;
        font-size: 14px;
        width: 85px;
        height: 30px;
        background: #e5e5e5;
        text-align: center;
        line-height: 30px;
        color: #888888;
        margin-left: 10px;
        margin-bottom: 9px;
        &.select {
            background: #479ceb;
            color: #fff;
        }
    }

    .ordertable {
        width: 928px;
        margin: 0 auto;
        margin-top: 27px;

        .myorderbox {
            width: 888px;
            height: 140px;
            border: 1px solid #f2f3f5;
            background: #fff;
            margin: 0 auto;
            margin-top: 10px;
        }
        .ordertitle {
            height: 34px;
            background: #f2f3f5;
            display: flex;
            justify-content: space-between;
        }
        .lefttitle {
            font-size: 14px;
            color: #222222;
            line-height: 34px;
            padding-left: 17px;
        }
        .rightdate {
            font-size: 14px;
            color: #666666;
            line-height: 34px;
            padding-right: 14px;
        }
        .orderinforbox {
            display: flex;
            justify-content: space-between;
            padding-left: 18px;
            padding-top: 13px;
        }
        .ordernumberbox {
            margin-bottom: 10px;
        }
        .ordernum {
            font-size: 12px;
            color: #888888;
            display: inline-block;
        }
        .ordernum i {
            font-style: normal;
            font-size: 14px;
            color: #479ceb;
            cursor: pointer;
        }
        .orderdate {
            display: inline-block;
            font-size: 14px;
            color: #888888;
            margin-left: 35px;
            margin-right: 16px;
        }
        .contractbtn {
            display: inline-block;
            padding: 0px 10px;
            background: #e7f4fe;
            border: 1px solid #479ceb;
            text-align: center;
            line-height: 20px;
            font-size: 12px;
            color: #479ceb;
            position: relative;
            top: -2px;
            cursor: pointer;
        }
        .sellerbtn {
            padding-left: 23px;
            background: url(../../assets/images/home/icon71.png) 5px center
                no-repeat #e7f4fe;
        }
        .orderdetailbox {
            display: flex;
            flex-direction: row;
        }
        .hide1 {
            width: 52px;
            overflow: hidden;
            white-space: nowrap; /*规定文本不进行换行*/
            text-overflow: ellipsis;
        }
        .hide2 {
            width: 90px;
            overflow: hidden;
            white-space: nowrap; /*规定文本不进行换行*/
            text-overflow: ellipsis;
        }
        // .orderstatewidth{
        // width:80px;
        // overflow: hidden;
        // white-space: nowrap;	/*规定文本不进行换行*/
        // text-overflow: ellipsis;
        // }
        .detailname {
            font-size: 12px;
            color: #888888;
            text-align: center;
        }
        .detailnum {
            font-size: 12px;
            color: #222222;
            margin-top: 9px;
            text-align: center;
        }
        .orderline {
            width: 1px;
            height: 33px;
            background: #f2f3f5;
            margin: 17px 18px 0px 18px;
        }
        .cancelbtn {
            width: 82px;
            height: 27px;
            background: #e3e3e4;
            text-align: center;
            line-height: 27px;
            font-size: 14px;
            color: #666666;
            border-radius: 30px;
            margin-bottom: 8px;
            cursor: pointer;
        }
        .buyersbtn {
            background: #fe8617;
            color: #fff;
            cursor: pointer;
        }
        .rightbtnbox {
            padding-right: 22px;
        }
    }

    .bluecolor {
        color: #479ceb;
    }
    .failurecolor {
        color: #ff0000;
    }
    // .ordertable table tr:nth-child(odd) {
    //     background: #f2f2f2;
    // }
    .page-box {
        margin-top: 30px;
        text-align: center;
    }
}
</style>
