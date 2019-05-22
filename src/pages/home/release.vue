<template>
  <div class="index-box">
    <div class="usertabbox">
      <div :class="{'topline': formData.billType == 0}" @click="onBillType(0)" class="offline">银票</div>
      <div :class="{'topline': formData.billType == 1}" @click="onBillType(1)" class="offline">商票</div>
    </div>
    <div class="form-box">
      <!-- <div class="bill-type">
                <el-button :class="{'t-selece': formData.billType === 0}" size="small" @click="onBillType(1)">银票</el-button>
                <el-button :class="{'t-selece': formData.billType === 1}" size="small" @click="onBillType(0)">商票</el-button>
      </div>-->
      <el-form
        :model="formData"
        :rules="rules"
        class="release-form"
        label-width="140px"
        ref="batchForm"
      >
        <el-row>
          <el-col :span="4">
            <span class="form-name">上传票面</span>
          </el-col>
          <el-col :span="20">
            <imgUpload
              :actionUrl="uploadUrl1"
              :imgUrl="this.formData.billImage1"
              @onDelete="onDelImage('billImage1')"
              @onSuccess="uploadbillImage1"
            >上传票正面截图</imgUpload>
            <imgUpload
              :actionUrl="uploadUrl"
              :imgUrl="this.formData.billImage2"
              @onDelete="onDelImage('billImage2')"
              @onSuccess="uploadbillImage2"
            >上传票反面截图</imgUpload>

            <!-- <el-upload name="file" :show-file-list="false" :data="updData" class="upload-demo" drag :action="uploadUrl" :on-success="uploadbillImage2" multiple>
                            <img v-if="this.formData.billImage2" :src="this.formData.billImage2">
                            <div v-else class="upd-box">
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text"><em>上传票反面截图</em></div>
                            </div>
            </el-upload>-->
            <div class="upload-ctx">支持jpg、jpeg、png、bmp格式的图片，图片大小不能超过2M</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <span class="form-name">承兑人</span>
          </el-col>
          <el-col :span="8" class="form-required">
            <el-form-item label-width="0" prop="acceptorName">
              <el-input class placeholder="请输入承兑人" size="small" v-model="formData.acceptorName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <span class="form-name">票据编号</span>
          </el-col>
          <el-col :span="8" class="form-required">
            <el-form-item label-width="0" prop="billNo">
              <el-input class placeholder="请输入票据编号" size="small" v-model="formData.billNo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <span class="form-name">票面金额</span>
          </el-col>
          <el-col :span="8" class="form-required">
            <el-form-item label-width="0">
              <el-input
                @change="onChangeRate"
                class
                placeholder="小数点后保留6位"
                size="small"
                suffix-icon="money-unit"
                v-model="formData.amount"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <span class="form-name">报价模式</span>
          </el-col>
          <el-col :span="8" class="lin40">
            <el-radio label="1" v-model="formData.transType">一口价</el-radio>
            <el-radio label="2" v-model="formData.transType">竞价</el-radio>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <span class="form-name">年利率/每十万贴息</span>
          </el-col>
          <el-col :span="8" class="row-ipt">
            <el-input
              @change="onChangeRate"
              placeholder="小数点后保留4位"
              size="small"
              suffix-icon="bai-unit"
              v-model="formData.yearInter"
            ></el-input>
            <!-- <el-button size="small" @click="onRateOrLntrt">切换{{ rateOrLntrt === 'rate' ? '年利率' : '每十万贴息' }}</el-button> -->
            <el-input
              @change="onChangeRate('tenthousand')"
              placeholder="小数点后保留2位"
              size="small"
              suffix-icon="yuan-unit"
              v-model="formData.expcLntrt"
            ></el-input>
          </el-col>
          <el-col :span="4">
            <span class="form-name">票据日期</span>
          </el-col>
          <el-col :span="8" class="form-required">
            <!-- <el-date-picker class="form-date-picker" size="small" v-model="billDate" @change="onChangeDate" value-format="timestamp" type="daterange" range-separator="至" start-placeholder="贴现日" end-placeholder="到期日">
            </el-date-picker>-->
            <el-date-picker
              :clearable="false"
              @change="onChangeDate"
              class="form-required-time"
              disabled
              placeholder="贴现日"
              size="small"
              type="date"
              v-model="formData.issueDate"
              value-format="yyyy-MM-dd"
            ></el-date-picker>-
            <el-date-picker
              :clearable="false"
              @change="onChangeDate"
              class="form-required-time"
              placeholder="到期日"
              size="small"
              type="date"
              v-model="formData.dueDate"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <span class="form-name">调整天数</span>
          </el-col>
          <el-col :span="8" class="form-required">
            <el-form-item label-width="0">
              <el-input
                @change="onChangeRate"
                class
                placeholder="请输入数字"
                size="small"
                suffix-icon="day-unit"
                v-model="formData.adjustDays"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <span class="form-name">剩余天数</span>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="0" prop>
              <el-input
                :disabled="true"
                class
                placeholder
                size="small"
                suffix-icon="day-unit"
                v-model="formData.remainDays"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <span class="form-name">贴现利息</span>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="0">
              <el-input
                :disabled="true"
                class
                placeholder
                size="small"
                suffix-icon="yuan-unit"
                v-model="formData.discountInter"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <span class="form-name">贴现金额</span>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="0" prop>
              <el-input
                :disabled="true"
                class
                placeholder
                size="small"
                suffix-icon="yuan-unit"
                v-model="formData.discountAmount"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <span class="form-name">背书次数</span>
          </el-col>
          <el-col :span="8" class="form-required">
            <el-form-item label-width="0">
              <el-input
                class
                placeholder="请输入次数"
                size="small"
                v-model="formData.latestEndorserCount"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <span class="form-name">违约金比例</span>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="0" prop>
              <!-- formData.expcLntrt -->
              <el-input
                :disabled="true"
                class
                placeholder="小数点后保留6位"
                size="small"
                suffix-icon="bai-unit"
                v-model="preData"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <span class="form-name">备注</span>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="0">
              <el-input class placeholder="背书说明" size="small" v-model="formData.remark"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <span class="form-name">指定买方</span>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="0" prop>
              <el-input class placeholder="买方公司全称" size="small" v-model="formData.drawerName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="4">
            <span class="form-name">瑕疵说明</span>
          </el-col>
          <el-col :span="20">
            <el-radio-group size="small" v-model="formData.billInfo">
              <el-radio border label="1">无</el-radio>
              <el-radio border label="2">回头</el-radio>
              <el-radio border label="3">重复</el-radio>
              <el-radio border label="4">质押</el-radio>
              <el-radio border label="7">保证</el-radio>
              <el-radio border label="5">上下不一致</el-radio>
              <el-radio border label="6">其他</el-radio>
              <!-- <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
                            </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">其他瑕疵说明</el-button>-->
            </el-radio-group>
          </el-col>
        </el-row>
      </el-form>
      <div class="foot-box">
        <el-button @click="onSubmit(0)" class="foot-box-sub" size="medium" type="primary">保存票据</el-button>
        <el-button @click="onSubmit(1)" class="foot-box-up" size="medium">上架票据</el-button>
      </div>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import validator from '@/util/validator.js';
import { mapState, mapMutations, mapActions } from 'vuex';
// eslint-disable-next-line no-unused-vars
import config from '@/config/index.js';
import rate from '@/util/rate.js';
import utilDate from '@/util/date.js';
import imgUpload from '@/components/home/img-upload.vue';

const mixin = {
    computed: {
        ...mapState({})
    },
    methods: {
        ...mapMutations({}),
        ...mapActions({
            getTrsBillInfo: 'getTrsBillInfo',
            postBillAdd: 'postBillAdd',
            getBillPre: 'getBillPre',
            getPre: 'getPre',
            getAdjustmentDays: 'getAdjustmentDays',
            getTrsBillInfByOrderId: 'getTrsBillInfByOrderId'
        })
    }
};
// (config.serverHost ? '/trade' : '') +
const uploadUrl = '/common/upload';
const uploadUrl1 = '/common/upload1';
//(config.serverHost ? '/trade' : '')
// issueDate 开票日期;
// dueDate  到期日期;
// billState 票据状态 1:正常 2:已摘票 3：交易完成;
// publishState 发布状态 1:上架 0:下架;
// billNo  票据编号;
// amount 票据金额;
// drawerName 出票人名称;
// drawerAccount 出票人账户;
// drawerBankName 出票人银行名称;
// takerName 收票人名称;
// takerAccount 收票人帐号;
// takerBankName 收票人银行名称;
// acceptorName 承兑人名称;
// acceptorAccount 承兑人账户;
// acceptorBankCode 承兑人银行行号;
// acceptorBankName 承兑人银行名称;
// returnEndorsement  是否回头票 0：否 1：是;
// latestEndorser 最后背书人;
// latestEndorsementDate  最后背书日期;
// billInfo 瑕疵情况： 1：无瑕疵:2：回头:3重复 4质押保证 5上下不一致 6其他;
// transType  交易类型 1：一口价 2：竞价 默认：1;
// expcLntrt 每十万扣款金额;
// discountAmount 贴现金额;discountFee 手续费;
// remark 备注;
// billImage1 票据图片1正面;
// billImage2 票据图片2 反面;
// yearInter 年化利率;
export default {
    mixins: [mixin],
    // props: {
    //     orderId: {
    //         type: Number,
    //         default: ''
    //     }
    // },
    data() {
        return {
            orderId: '',
            uploadUrl: uploadUrl,
            uploadUrl1: uploadUrl1,
            updData: {
                action: 'uploadimage'
            },
            inputVisible: false,
            inputValue: '',
            formData: {
                billId: null,
                remainDays: '',
                adjustDays: 0, // 调整天数
                billImage1: '',
                billImage2: '',
                amount: '',
                billType: 0,
                acceptorName: '',
                acceptorAccount: '', // 承兑人账户;
                acceptorBankCode: '', //  承兑人银行行号;
                acceptorBankName: '', // 承兑人银行名称;
                billNo: '',
                transType: '1',
                yearInter: '',
                monthInter: 0,
                issueDate: utilDate.toFormat(new Date(), 'yyyy-MM-dd'), // 开票日期;
                dueDate: '', // 到期日期;
                discountAmount: '', // 贴现金额
                latestEndorserCount: 0, // 背书次数
                expcLntrt: '', // 违约金钱 每十万扣款金额;
                remark: '', // 备注
                drawerName: '', // 买方公司全称
                billInfo: '1',
                ExpcCharge: 0, //每十万手续费
                DiscountDate: '2019-03-15', // 贴现日期
                discountInter: 0.0 // 贴现利息
            },
            rules: {},
            rateOrLntrt: 'rate', // 利息算法（rate），还是十万贴息算（tenthousand）
            preData: '0.005'
        };
    },
    mounted() {
        if (this.$route.query.billId) {
            this.getTrsBillInfo({
                trsBillInfId: this.$route.query.billId
            }).then(res => {
                if (res.code === 0) {
                    console.log(res.obj);
                    Object.keys(this.formData).forEach(item => {
                        this.formData[item] = res.obj[item];
                    });
                } else {
                    this.$message({
                        message: res.msg,
                        type: 'error'
                    });
                }
            });
        }
        this.getBillPre().then(res => {
            this.preData = res.obj;
        });
    },
    created() {
        this.getTime();
        if (this.$route.query.orderId) {
            const params = { orderId: this.$route.query.orderId };
            this.getTrsBillInfByOrderId(params).then(res => {
                this.formData = res.obj;
            });
        }
    },
    methods: {
        onSubmit(publishState) {
            let msg = '';
            if (!this.formData.acceptorName) {
                msg = '请输入承兑人';
            } else if (!this.formData.billNo) {
                msg = '请输入票据编号';
            } else if (isNaN(this.formData.amount)) {
                msg = '票面金额填写正确';
            } else if (isNaN(this.formData.yearInter)) {
                msg = '请输入正确年利率';
            } else if (!this.formData.issueDate || !this.formData.dueDate) {
                msg = '请输入票据日期';
            } else if (
                !this.formData.latestEndorserCount &&
                this.formData.latestEndorserCount !== 0
            ) {
                msg = '请输入背书次数';
            } else if (
                !this.formData.adjustDays &&
                this.formData.adjustDays !== 0
            ) {
                msg = '请输入调整天数';
            } else if (!this.formData.billImage1) {
                msg = '上传票正面截图';
            }

            if (msg) {
                this.$message({
                    showClose: true,
                    message: msg,
                    type: 'error'
                });
                return false;
            }

            if (
                this.formData.billType === 0 &&
                (this.formData.yearInter > 7 || this.formData.yearInter < 2.5)
            ) {
                msg = '请确认利率，是否继续?';
            }
            if (
                this.formData.billType === 1 &&
                (this.formData.yearInter > 15 || this.formData.yearInter < 2.5)
            ) {
                msg = '请确认利率，是否继续?';
            }
            // 确认框
            if (msg) {
                this.$confirm(msg, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.submitForm(publishState);
                });
            } else {
                this.submitForm(publishState);
            }
        },
        submitForm(publishState) {
            const params = { ...this.formData };
            params.billState = publishState;
            params.params = '';
            this.postBillAdd(params).then(res => {
                if (res.code === 0) {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    });
                    // eslint-disable-next-line no-unused-vars
                    const loading = this.$loading({
                        lock: true,
                        text: '审核中',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                        location.reload();
                    }, 1000);
                    this.$router.push({
                        path: '/' + 'bill'
                    });
                } else {
                    this.$message({
                        message: res.msg,
                        type: 'error'
                    });
                }
            });
        },
        onShelf() {},
        onGoHome() {
            // eslint-disable-next-line no-undef
            location.href = location.origin + '/' + urls.home;
        },
        showInput() {
            this.inputVisible = true;
            this.$nextTick(() => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        handleInputConfirm() {
            // const inputValue = this.inputValue;
            this.inputVisible = false;
            this.inputValue = '';
        },
        // 切换票型
        onBillType(param) {
            this.formData.billType = param;
        },
        // 时间修改
        onChangeDate() {
            if (this.formData.issueDate && this.formData.dueDate) {
                const dateDiff =
                    new Date(this.formData.dueDate).getTime() -
                    new Date().getTime();
                const dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));
                this.formData.remainDays = dayDiff;

                if (
                    this.formData.adjustDays &&
                    isNaN(this.formData.adjustDays)
                ) {
                    this.formData.remainDays =
                        dayDiff + this.formData.adjustDays;
                }
                // 获取天数
                this.getAdjustmentDays({
                    date: this.formData.dueDate
                }).then(res => {
                    this.formData.adjustDays = res.msg * 1;
                    this.onChangeRate();
                });
            }
        },
        // 算利率
        onChangeRate(param) {
            if (param === 'tenthousand') {
                this.rateOrLntrt = 'tenthousand';
            } else {
                this.rateOrLntrt = 'rate';
            }

            let startDate = 0;
            let endDate = 0;
            if (this.formData.issueDate && this.formData.dueDate) {
                startDate = new Date(this.formData.issueDate).getTime();
                endDate = new Date(this.formData.dueDate).getTime();
            }
            const rateDate = rate.rate(
                this.formData.amount,
                startDate,
                endDate,
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
            this.formData.remainDays = rateDate.cdays;
            this.formData.discountInter = rateDate.cashInterest;
            this.formData.monthInter = rateDate.mRate;
            this.formData.discountAmount = rateDate.discountAmount;
        },
        // 切换算法
        onRateOrLntrt() {
            if (this.rateOrLntrt === 'rate') {
                this.rateOrLntrt = 'tenthousand';
            } else {
                this.rateOrLntrt = 'rate';
            }
            this.onChangeRate();
        },
        // 上传成功
        uploadbillImage1(file, fileList) {
            console.log(file, fileList);
            if (file.code === 0) {
                this.formData.billImage1 = file.url;
                // .replace('8888', '8080');
                for (const item of file.rets || []) {
                    if (item.word_name === 'amount') {
                        this.formData.amount =
                            item.word.replace(',', '').replace('￥', '') *
                            1 /
                            10000;
                    }
                    if (item.word_name === 'acceptorName') {
                        this.formData.acceptorName = item.word;
                    }
                    if (item.word_name === 'billNo') {
                        this.formData.billNo = item.word;
                    }
                    if (item.word_name === 'endDate') {
                        this.formData.dueDate = item.word;
                    }
                    // if (item.word_name === 'start') {
                    //     const numCN = [
                    //         '零',
                    //         '壹',
                    //         '贰',
                    //         '叁',
                    //         '肆',
                    //         '伍',
                    //         '陆',
                    //         '柒',
                    //         '捌',
                    //         '玖'
                    //     ];
                    //     let bildata2 = '';
                    //     Object.values(item.word).forEach(res => {
                    //         if (numCN.indexOf(res) !== -1) {
                    //             bildata2 += numCN.indexOf(res);
                    //         } else {
                    //             bildata2 +=
                    //                 res === '年' || res === '月' ? '-' : '';
                    //         }
                    //     });
                    //     this.formData.issueDate = bildata2;
                    // }
                }
            }
        },
        // eslint-disable-next-line no-unused-vars
        uploadbillImage2(file, fileList) {
            if (file.code === 0) {
                this.formData.billImage2 = file.url;
                // .replace('8888', '8080');
            }
        },
        // 删除图片
        onDelImage(param) {
            this.formData[param] = '';
        },
        getTime() {
            const date = new Date();
            const y = date.getFullYear();
            const m = date.getMonth() + 1;
            const d = date.getDate();
            console.log(d);
            const time = y + '-' + m + '-' + d;
            this.formData.start_time = time;
        }
    },
    computed: {
        getOptions() {}
    },
    components: {
        imgUpload: imgUpload
    }
};
</script>
<style lang="less">
@import '../../assets/css/mixin.less';
.after-unit() {
    line-height: 36px;
    width: 28px;
    color: #666666;
    font-style: normal;
}
.index-box {
    .usertabbox {
        display: flex;
        flex-direction: row;
        .offline {
            font-size: 16px;
            color: #222222;
            width: 119px;
            text-align: center;
            height: 50px;
            line-height: 50px;
            cursor: pointer;
        }
        .topline {
            border-top: 3px solid #479ceb;
            color: #479ceb;
        }
    }

    .form-box {
        margin-top: 47px;
        .bill-type {
            padding-left: 57px;
            margin-bottom: 30px;
            .el-button {
                width: 100px;
                margin-right: 23px;
            }
            .t-selece {
                background-color: #ff8a00;
                color: #fff;
            }
        }
        .release-form {
            padding-right: 50px;
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
            .form-name {
                line-height: 40px;
                font-size: 14px;
                width: 100%;
                display: inline-block;
                text-align: right;
                padding-right: 20px;
            }
            .lin40 {
                line-height: 40px;
            }
            .row-cxt {
                line-height: 40px;
            }
            .row-ipt {
                .el-input {
                    width: 150px;
                    display: inline-block;
                }
            }
            .row-item {
                margin-bottom: 22px;
            }
            .button-new-tag {
                width: 104px;
                margin-left: 10px;
            }

            // .upload-demo {
            //     display: inline-block;
            //     margin-right: 22px;
            //     margin-bottom: 15px;
            //     .upd-box {
            //         .center(column);
            //         width: 100%;
            //         height: 100%;
            //         .el-icon-upload {
            //             margin: 0;
            //             line-height: 25px;
            //             font-size: 25px;
            //             color: #0073ff;
            //             margin-right: 6px;
            //         }
            //     }
            //     .el-upload-dragger {
            //         width: 163px;
            //         height: 78px;
            //     }
            //     img {
            //         width: 100%;
            //         height: 100%;
            //     }
            // }
            .upload-ctx {
                display: inline-block;
                vertical-align: top;
                padding-top: 32px;
                font-size: 12px;
                color: #888888;
            }
            .el-radio {
                margin-right: 5px;
                margin-top: 5px;
            }
            .form-required {
                position: relative;
                &:after {
                    content: ' * ';
                    color: red;
                    position: absolute;
                    right: -12px;
                    line-height: 45px;
                    top: 0;
                }
                .form-required-time {
                    width: 145px;
                }
            }
            .form-date-picker {
                width: 100%;
                margin-bottom: 22px;
            }
        }
        .foot-box {
            text-align: center;
            margin-top: 66px;
            .foot-box-sub {
                background: rgba(254, 134, 23, 1);
                color: #fff;
                border-color: #fe8617;
                border-radius: 20px;
            }
            .foot-box-up {
                background: rgba(255, 255, 255, 1);
                border: 1px solid rgba(254, 134, 23, 1);
                color: #fe8617;
                border-radius: 20px;
            }
        }
    }
    .form-info {
        .flexbox(column);
        &.top-line {
            border-top: 1px solid #e3e3e3;
            padding-top: 50px;
        }
        .form-item {
            .flexbox();
            margin-bottom: 25px;
            .item-name {
                .flex-display();
                .center();
                .flexjustify(flex-end);
                width: 238px;
                color: #666666;
                font-size: 14px;
            }
            .item-input {
                margin-left: 20px;
                width: 345px;
                &.item-much {
                    .flexbox();
                    .flexjustify(space-between);
                }

                .input-rate {
                    width: 153px;
                }
                .symbol {
                    font-size: 18px;
                }
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
            &.form-but {
                .center();
                font-size: 16px;
                .but-js {
                    .center();
                    width: 96px;
                    height: 36px;
                    background-color: #c3d1e3;
                    border-radius: 5px;
                    margin-right: 16px;
                }
                .but-cz {
                    .center();
                    width: 96px;
                    height: 36px;
                    background-color: #006eff;
                    color: #fff;
                    border-radius: 5px;
                }
                .but-sub {
                    .center();
                    width: 192px;
                    height: 40px;
                    background-color: #0895f8;
                    border-radius: 5px;
                    margin-right: 94px;
                    color: #fff;
                    &:hover {
                        background-color: #0073ff;
                    }
                }
                .but-save {
                    .center();
                    width: 192px;
                    height: 40px;
                    background-color: #006eff;
                    border-radius: 5px;
                    color: #fff;
                }
            }
        }
    }
}
</style>
