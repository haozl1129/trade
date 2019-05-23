<template>
    <div class="calculator-box">
        <div class="calculatormainbx">
            <div class="mainbox">
                <div class="lefttitle">票面金额</div>
                <div class="rightinput">
                    <el-input @change="onChangeRate" class="" size="mini" placeholder="小数点后保留6位" suffix-icon="money-unit" v-model="formData.amount">
                    </el-input>
                </div>
            </div>
            <div class="mainbox">
                <div class="lefttitle">贴现日期</div>
                <div class="rightinput inputdate">
                    <el-date-picker @change="onChangeDate('issueDate')" v-model="formData.issueDate" size="mini" value-format="timestamp" type="date" placeholder="选择日期">
                    </el-date-picker>
                </div>
            </div>
            <div class="mainbox">
                <div class="lefttitle">到期日期</div>
                <div class="rightinput inputdate">
                    <el-date-picker @change="onChangeDate('dueDate')" v-model="formData.dueDate" size="mini" value-format="timestamp" type="date" placeholder="选择日期">
                    </el-date-picker>
                </div>
                <div class="yearbtn" :class="{'halfyear': halfyear === 6}" @click="onUpDueDate(6)">半年</div>
                <div class="yearbtn" :class="{'halfyear': halfyear === 12}" @click="onUpDueDate(12)">一年</div>
            </div>
            <div class="mainbox">
                <div class="lefttitle">月利率</div>
                <div class="rightinput">
                    <el-input @change="onMonthInter" class="" size="mini" placeholder="" suffix-icon="bai-unit" v-model="formData.monthInter">
                    </el-input>
                </div>
                <div class="yuan_money">记息剩天数：<i>{{days || 0}}</i>天</div>
            </div>
            <div class="mainbox">
                <div class="lefttitle">年利率/每十万贴息</div>
                <div class="rightinput smallinput">
                    <el-input @change="onChangeRate" class="" size="mini" placeholder="" suffix-icon="bai-unit" v-model="formData.yearInter">
                    </el-input>
                </div>
                <div class="rightinput smallinput">
                    <el-input @change="onChangeRate('tenthousand')" class="" size="mini" placeholder="" suffix-icon="yuan-unit" v-model="formData.expcLntrt">
                    </el-input>
                </div>
                <div class="yuan_money">每十万扣款：<i>{{formData.expcLntrt || 0}}</i>元</div>
            </div>
            <div class="mainbox">
                <div class="lefttitle">调整天数</div>
                <div class="rightinput">
                    <el-input @change="onChangeRate" class="" size="mini" placeholder="" suffix-icon="day-unit" v-model="formData.adjustDays">
                    </el-input>
                </div>
                <div class="yuan_money">贴现利息：<i>{{formData.DiscountInter || 0}}</i>元</div>
            </div>
            <div class="mainbox">
                <div class="lefttitle">每十万手续费</div>
                <div class="rightinput">
                    <el-input class="" size="mini" placeholder="" suffix-icon="yuan-unit" v-model="val" :disabled="true">
                    </el-input>
                </div>
                <div class="yuan_money">贴现金额：<i>{{formData.discountAmount || 0}}</i>元</div>
            </div>
        </div>
        <div class="calculatorbtn">
            <span class="calculate orangerbtn">计算</span>
            <span class="calculate" @click="onReset">重新计算</span>
        </div>
    </div>
</template>
<script>
import rate from '@/util/rate.js';
import utilDate from '@/util/date.js';

import { mapActions } from 'vuex';
const mixin = {
    methods: {
        ...mapActions({
            getAdjustmentDays: 'getAdjustmentDays'
        })
    }
};
const tempForm = {
    adjustDays: 0, // 调整天数
    amount: '',
    yearInter: '',
    monthInter: 0,
    issueDate: new Date().getTime(), // 开票日期;
    dueDate: '', // 到期日期;
    discountAmount: '', // 贴现金额
    expcLntrt: '', // 违约金钱 每十万扣款金额;
    ExpcCharge: 0, //每十万手续费
    // DiscountDate: '2019-03-15', // 贴现日期
    DiscountInter: 0.0 // 贴现利息
};
export default {
    mixins: [mixin],
    data() {
        return {
            val: '0',
            days: '',
            defineDueDate: 0,
            halfyear: 0,
            formData: {
                ...tempForm
            }
        };
    },
    mounted() {},
    methods: {
        onReset() {
            Object.keys(tempForm).forEach(key => {
                this.formData[key] = tempForm[key];
            });
            this.onChangeRate();
        },
        // 算利率
        onChangeRate(param) {
            if (param === 'tenthousand') {
                this.rateOrLntrt = 'tenthousand';
            } else {
                this.rateOrLntrt = 'rate';
            }
            const rateDate = rate.rate(
                this.formData.amount,
                this.formData.issueDate,
                this.formData.dueDate,
                this.formData.yearInter / 100,
                this.formData.expcLntrt,
                this.formData.adjustDays,
                this.rateOrLntrt === 'rate'
            );
            if (this.rateOrLntrt === 'rate') {
                this.formData.expcLntrt = rateDate.expcLntrt;
            } else {
                this.formData.yearInter = rateDate.yRate || '';
            }
            this.days = rateDate.cdays;
            this.formData.monthInter = rateDate.mRate.toFixed(2);
            this.formData.discountAmount = rateDate.discountAmount;
            this.formData.DiscountInter = rateDate.cashInterest;
        },
        // 时间修改
        onChangeDate(type) {
            if (type === 'dueDate') {
                this.defineDueDate = this.formData.dueDate;
                this.halfyear = 0;
            }
            if (this.formData.issueDate && this.formData.dueDate) {
                const dateDiff = this.formData.dueDate - new Date().getTime();
                const dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));
                this.days = dayDiff;
                if (
                    this.formData.adjustDays &&
                    isNaN(this.formData.adjustDays)
                ) {
                    this.days = dayDiff + this.formData.adjustDays;
                }
                // const sDate = utilDate.getYMDW(
                //     new Date(this.formData.issueDate)
                // );
                const eDate = utilDate.getYMDW(new Date(this.formData.dueDate));
                // const issueDate =
                //     sDate.year + '-' + sDate.month + '-' + sDate.day;
                const dueDate =
                    eDate.year + '-' + eDate.month + '-' + eDate.day;
                // 获取天数
                this.getAdjustmentDays({
                    date: dueDate
                }).then(res => {
                    if (!isNaN(res.msg)) {
                        this.formData.adjustDays = res.msg * 1;
                    } else {
                        this.formData.adjustDays = 0;
                    }
                    this.onChangeRate();
                });
            }
        },
        onMonthInter() {
            this.formData.yearInter = (this.formData.monthInter * 12).toFixed(
                2
            );
            this.onChangeRate();
        },
        onUpDueDate(month = 6) {
            this.halfyear = month;
            const duedate =
                this.defineDueDate === 0
                    ? new Date()
                    : new Date(this.defineDueDate);
            this.formData.dueDate = new Date(
                duedate.setMonth(duedate.getMonth() + month)
            ).getTime();
            this.onChangeDate();
        }
    },
    components: {}
};
</script>

<style lang="less">
@import '../../assets/css/mixin.less';
.after-unit() {
    line-height: 28px;
    width: 28px;
    color: #666666;
}
.calculator-box {
    .calculatorbox {
        width: 707px;
        height: 526px;
        background: #fff;
        margin: 0 auto;
    }

    .calculatormainbx {
        padding-left: 32px;
    }
    .mainbox {
        display: flex;
        flex-direction: row;
        margin-top: 20px;
    }
    .lefttitle {
        width: 122px;
        font-size: 14px;
        color: #888888;
        line-height: 30px;
    }
    .rightinput {
        width: 298px;
        margin-left: 18px;
        .money-unit:after {
            content: '万';
            .after-unit();
        }
        .bai-unit:after {
            content: '%';
            .after-unit();
        }
        .yuan-unit:after {
            content: '元';
            .after-unit();
        }
        .day-unit:after {
            content: '天';
            .after-unit();
        }
    }
    .inputdate {
        width: 159px;
        .el-input {
            width: 100%;
        }
    }
    .yearbtn {
        width: 60px;
        height: 30px;
        text-align: center;
        font-size: 14px;
        color: #888888;
        background: #f2f3f5;
        border-radius: 2px;
        line-height: 30px;
        margin-left: 10px;
        cursor: pointer;
    }
    .halfyear {
        background: #479ceb;
        color: #fff;
    }
    .yuan_money {
        font-size: 16px;
        color: #888888;
        margin-left: 37px;
    }
    .yuan_money i {
        color: #fe8617;
        font-style: normal;
        font-size: 18px;
        margin-right: 8px;
        font-weight: bold;
    }
    .smallinput {
        width: 138px;
    }
    .calculatorbtn {
        text-align: center;
        margin-top: 41px;
    }
    .calculate {
        width: 135px;
        height: 40px;
        background: #fff;
        border: 1px solid #fe8617;
        text-align: center;
        line-height: 40px;
        font-size: 16px;
        color: #fe8617;
        display: inline-block;
        border-radius: 30px;
        cursor: pointer;
    }
    .orangerbtn {
        background: #fe8617;
        color: #fff;
        margin-right: 18px;
    }
}
</style>


