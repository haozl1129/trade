/* eslint-disable no-unused-vars */
<template>
  <div class="delist-main">
    <div class="white_W1200 whitebg">
      <div class="companytitle">
        {{trsBillInfo.obj && trsBillInfo.obj.acceptorName}}
        <span
          v-show="acceptorType"
        >{{acceptorType}}</span>
      </div>
      <div class="companyallbox">
        <div class="leftnumberbox">
          <div class="upnumber">
            <div class="ticketmoney">
              <div class="ticket_num">{{trsBillInfo.obj && trsBillInfo.obj.amount | filterFixed}}</div>
              <div class="ticket_unit">票面金额(万)</div>
            </div>
            <div class="vertical_line"></div>
            <div class="ticketmoney">
              <div class="ticket_num blackcolor" v-if="transType == '1'">
                {{trsBillInfo.obj && trsBillInfo.obj.yearInter | filterRate(2)}}
                <i>%</i>
              </div>
              <div class="ticket_num blackcolor" v-else>
                <input
                  @change="onChangeRate('rate')"
                  class="yearInter"
                  v-model="formData.yearInter"
                >
                <span class="orangefont">请输入</span>
              </div>
              <div class="ticket_unit">利率(%)</div>
            </div>
            <div class="vertical_line"></div>
            <div class="ticketmoney">
              <div
                class="ticket_num blackcolor"
                v-if="transType == '1'"
              >{{trsBillInfo.obj && trsBillInfo.obj.expcLntrt | filterFixed}}</div>
              <div class="ticket_num blackcolor" v-else>
                <input
                  @change="onChangeRate('tenthousand')"
                  class="expcLntrt"
                  v-model="formData.expcLntrt"
                >
                <span class="orangefont">请输入</span>
              </div>
              <div class="ticket_unit">每十万贴息(元)</div>
            </div>
          </div>
          <div class="downdatebox">
            <div class="lefttime">
              <div class="releade_date">
                发布日期
                <span>{{trsBillInfo.obj && trsBillInfo.obj.issueDate}}</span>
              </div>
              <div class="releade_date date_day">
                贴现天数
                <span>{{trsBillInfo.obj && trsBillInfo.obj.interestDays}}天</span>
              </div>
            </div>
            <div class="right_dateclosed">
              <div class="releade_date">
                到期日
                <span>{{trsBillInfo.obj && trsBillInfo.obj.dueDate}}</span>
              </div>
              <div class="releade_date situation">
                瑕疵情况
                <span>{{trsBillInfo.obj && trsBillInfo.obj.billInfo | filterBillInfo}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="right_allpricebox">
          <!-- <div class="sale_price">卖方报价</div>
                    <div v-if="transType == '1'" class="price_num">{{trsBillInfo.obj && trsBillInfo.obj.discountAmount| filterFixed}}</div>
          <div v-else class="price_num">{{discountAmount}}</div>-->
          <template v-if="transType == 1">
            <div class="sale_price">卖方报价</div>
            <div
              class="price_num"
            >{{trsBillInfo.obj && trsBillInfo.obj.discountAmount| filterFixed}}</div>
            <div
              @click="onAddOrder"
              class="ticketbtn"
              v-if="trsBillInfo.obj.billState == 1 && isBill"
            >我要摘票</div>
            <div class="ticketbtn dis" v-else>我要摘票</div>
          </template>
          <template v-else>
            <div class="sale_price">贴现金额(元)</div>
            <div class="price_num">{{discountAmount}}</div>
            <div
              @click="onBidding"
              class="ticketbtn"
              v-if="trsBillInfo.obj.billState == 1 && isBill"
            >我要竞价</div>
            <div class="ticketbtn dis" v-else>我要竞价</div>
          </template>
          <div class="agreen_tip">
            <el-checkbox v-model="checked"></el-checkbox>我已阅读并同意
            <a @click="goCon()">《票易融合同范本》</a>
          </div>
        </div>
      </div>
    </div>
    <div class="white_W1200 whitebg">
      <div class="img_title">票据图片</div>
      <div class="ticketimg">
        <img
          :src="trsBillInfo.obj && trsBillInfo.obj.billImage1"
          @click="onOpenImg(trsBillInfo.obj && trsBillInfo.obj.billImage1)"
        >
      </div>
      <div class="ticketimg">
        <img
          :src="trsBillInfo.obj && trsBillInfo.obj.billImage2"
          @click="onOpenImg(trsBillInfo.obj && trsBillInfo.obj.billImage2)"
        >
      </div>
    </div>

    <el-dialog :visible="detailDialog" @close="onClose" append-to-body width="50%">
      <contract></contract>
      <span class="dialog-footer" slot="footer">
        <el-button @click="onClose" size="small" type="primary">同 意</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import config from '@/config/index.js';
import cookie from '@/util/cookie.js';
import urls from '@/config/url_enum.js';
import rate from '@/util/rate.js';
import { mapState, mapMutations, mapActions } from 'vuex';
import contract from './contract.vue';

const mixin = {
    computed: {
        ...mapState({
            trsBillInfo: 'trsBillInfo',
            acceptorTypeList: 'acceptorTypeList'
        })
    },
    methods: {
        ...mapMutations({}),
        ...mapActions({
            getTrsBillInfo: 'getTrsBillInfo',
            postAddOrder: 'postAddOrder',
            getAcceptorTypeList: 'getAcceptorTypeList',
            postBiddingCount: 'postBiddingCount'
        })
    }
};
// eslint-disable-next-line no-unused-vars
const acceptorNameList = [
    {
        key: 1,
        value: '国股'
    },
    {
        key: 2,
        value: '城商'
    },
    {
        key: 3,
        value: '三农'
    },
    {
        key: 4,
        value: '城镇'
    },
    {
        key: 5,
        value: '外资'
    },
    {
        key: 6,
        value: '财务公司'
    },
    {
        key: 7,
        value: '商票'
    }
];
export default {
    // store: store.default,
    mixins: [mixin],

    data() {
        return {
            formData: {
                yearInter: 0,
                expcLntrt: 0
            },
            currentPage4: 4,
            billId: '',
            checked: true,
            // 是否可以摘票
            isBill: true,
            transType: '1',
            discountAmount: 0,
            // 弹框
            detailDialog: false
        };
    },
    mounted() {
        this.transType = this.$route.query.transType;
        // eslint-disable-next-line no-unused-vars
        this.getAcceptorTypeList().then(res => {
            this.init(this.$route.query.billId);
        });
    },
    methods: {
        init(billId) {
            this.billId = billId;
            this.getTrsBillInfo({ trsBillInfId: billId }).then(res => {
                this.formData.yearInter = res.obj.yearInter;
                this.formData.expcLntrt = res.obj.expcLntrt;
                this.discountAmount = res.obj.discountAmount;
            });
        },
        goCon() {
            this.detailDialog = true;
            // location.href = location.origin + '/' + urls.contract;
        },
        // 我要摘票
        onAddOrder() {
            if (!this.checked) {
                this.$message({
                    message: '请先同意合同范本！',
                    type: 'warning'
                });
                return false;
            }
            const token = cookie.getCookie(config.tokenKey);
            if (token) {
                this.$confirm('确认摘票吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.isBill = false;
                    // api
                    this.postAddOrder({ billId: this.billId }).then(res => {
                        if (res.code === 0) {
                            this.$message({
                                message: res.msg,
                                type: 'success'
                            });
                            setTimeout(() => {
                                this.onPath('order');
                            }, 1500);
                        } else {
                            this.isBill = true;
                        }
                    });
                });
            } else {
                this.$message({
                    message: '请先登陆账户',
                    type: 'warning'
                });
            }
        },
        // eslint-disable-next-line no-unused-vars
        onPath(path = 'release', isBefore) {
            window.top.location.href = location.origin + '/' + urls[path];
        },
        onOpenImg(url) {
            // this.$alert('<strong><img :src="' + url + '" /></strong>', null, {
            //     dangerouslyUseHTMLString: true
            // });
            this.$alert('<strong><img src="' + url + '" /></strong>', '', {
                dangerouslyUseHTMLString: true,
                customClass: 'alert-box'
            });
        },
        // 算利率
        onChangeRate(param) {
            let rateOrLntrt = 'rate';
            if (param === 'tenthousand') {
                rateOrLntrt = 'tenthousand';
            }
            const rateParam = {
                issueDate: this.trsBillInfo.obj.issueDate,
                dueDate: this.trsBillInfo.obj.dueDate,
                amount: this.trsBillInfo.obj.amount,
                adjustDays: this.trsBillInfo.obj.adjustDays,
                yearInter: this.formData.yearInter,
                expcLntrt: this.formData.expcLntrt
            };
            const startDate = new Date(rateParam.issueDate).getTime();
            const endDate = new Date(rateParam.dueDate).getTime();
            const rateDate = rate.rate(
                rateParam.amount,
                startDate,
                endDate,
                rateParam.yearInter / 100,
                rateParam.expcLntrt,
                rateParam.adjustDays,
                rateOrLntrt === 'rate'
            );
            if (rateOrLntrt === 'rate') {
                this.formData.expcLntrt = rateDate.expcLntrt;
            } else {
                this.formData.yearInter = rateDate.yRate || '';
            }
            this.discountAmount = rateDate.discountAmount;
        },
        // 竞价
        onBidding() {
            const param = {
                rate: this.formData.yearInter,
                billSum: this.formData.expcLntrt,
                billID: this.billId
            };
            this.postBiddingCount(param).then(res => {
                if (res.code === 0) {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    });
                    setTimeout(() => {
                        this.onPath('order');
                    }, 1500);
                } else {
                    this.isBill = true;
                }
            });
        },
        onClose() {
            this.detailDialog = false;
        }
    },
    filters: {
        filterBillInfo(val) {
            if (val == 1) {
                return '无';
            } else if (val === 2) {
                return '回头';
            } else if (val === 3) {
                return '重复';
            } else if (val === 4) {
                return '质押';
            } else if (val === 5) {
                return '上下不一致';
            } else if (val === 7) {
                return '保证';
            } else if (val === 6) {
                return '其他';
            }
        },
        filterFixed(val, num = 2) {
            if (!isNaN(val)) {
                return val.toFixed(num);
            }
            return 0;
        },
        filterRate(val, num = 2) {
            if (!isNaN(val)) {
                return val.toFixed(num);
            }
            return 0;
        }
    },
    computed: {
        acceptorType() {
            let name = '';
            if (this.trsBillInfo.obj && this.trsBillInfo.obj.acceptorType) {
                for (const iterator of this.acceptorTypeList.rows) {
                    if (
                        iterator.dictValue * 1 ===
                        this.trsBillInfo.obj.acceptorType * 1
                    ) {
                        name = iterator.dictLabel;
                    }
                }
            }
            return name;
        }
    },
    components: {
        contract: contract
    }
};
</script>
<style lang="less">
.delist-main {
    margin: 10px 0;
    .whitebg {
        background: #fff;
    }
    .orangefont {
        // display: block;
        font-size: 12px;
        color: #fe8617;
        line-height: 18px;
    }
    /*======================我要摘牌=========================*/
    .companytitle {
        font-size: 20px;
        margin-left: 43px;
        padding-top: 35px;
        color: #222222;
    }
    .companytitle span {
        display: inline-block;
        width: 63px;
        height: 18px;
        border: 1px solid #479ceb;
        border-radius: 2px;
        font-size: 12px;
        color: #479ceb;
        text-align: center;
        line-height: 18px;
        margin-left: 15px;
    }
    .companyallbox {
        display: flex;
        flex-direction: row;
        height: 244px;
    }
    .leftnumberbox {
        padding-left: 43px;
        padding-top: 53px;
    }
    .upnumber {
        display: flex;
        flex-direction: row;
    }
    .ticket_unit {
        font-size: 14px;
        color: #888888;
        margin-top: 16px;
    }
    .vertical_line {
        width: 1px;
        height: 50px;
        background: #e3e3e3;
        margin-left: 71px;
        margin-top: 10px;
        margin-right: 71px;
    }
    .ticket_num {
        font-size: 30px;
        color: #479ceb;
        input {
            font-size: 30px;
            width: 100%;
        }
    }
    .blackcolor {
        color: #222222;
        text-align: right;
        .yearInter {
            width: 100px;
            border: 1.5px solid #eee;
            border-radius: 5px;
            text-align: right;
        }
        .expcLntrt {
            width: 150px;
            border: 1.5px solid #eee;
            border-radius: 5px;
            text-align: right;
        }
    }
    .ticket_num i {
        font-style: normal;
        font-size: 18px;
        color: #222222;
    }
    .downdatebox {
        margin-top: 32px;
        display: flex;
        flex-direction: row;
    }
    .releade_date {
        font-size: 14px;
        color: #888888;
        background: url(../../assets/images/index/icon34.png) 0px center
            no-repeat;
        padding-left: 25px;
        margin-top: 8px;
    }
    .releade_date span {
        font-size: 15px;
        color: #222222;
        margin-left: 14px;
    }
    .date_day {
        background: url(../../assets/images/index/icon35.png) 0px center
            no-repeat;
    }
    .right_dateclosed {
        margin-left: 78px;
    }
    .situation {
        background: url(../../assets/images/index/icon36.png) 0px center
            no-repeat;
    }
    .right_allpricebox {
        border-left: 1px solid #e3e3e3;
        height: 200px;
        margin-left: 110px;
        padding-left: 54px;
    }
    .sale_price {
        font-size: 14px;
        color: #888888;
    }
    .price_num {
        font-size: 30px;
        color: #fe8617;
        margin-top: 13px;
    }
    .ticketbtn {
        width: 151px;
        height: 45px;
        background: #fe8617;
        text-align: center;
        line-height: 45px;
        font-size: 16px;
        color: #fff;
        margin-top: 31px;
        border-radius: 30px;
        cursor: pointer;
        &:hover {
            background-color: #fff;
            border: 1px solid #fe8617;
            color: #fe8617;
        }
        &.dis {
            background: #ddd;
        }
    }
    .agreen_tip {
        font-size: 14px;
        color: #888888;
        margin-top: 21px;
    }
    .agreen_tip a {
        color: #479ceb;
    }
    .img_title {
        font-size: 18px;
        color: #222222;
        margin-left: 30px;
        padding-top: 29px;
    }
    .ticketimg {
        width: 900px;
        margin: 0 auto;
        margin-top: 44px;
        img {
            width: 100%;
        }
    }
}
.alert-box {
    width: 60%;
    img {
        width: 100%;
    }
}
</style>
