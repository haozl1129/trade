<template>
    <div class="association-box">
        <h3>提现</h3>
        <div class="tips">温馨提示：5W以内没有时间限制，5W以上为工作日的8：00-17：00。</div>
        <div class="bankbox">
            <div class="banknumberbox">
                <div class="bankname">绑定银行</div>
                <div class="bankmoney">
                    <div class="banknum">{{bingAccount.obj && bingAccount.obj.bankAccount}}</div>
                    <div class="paymoney">可用余额<i> {{balance.obj.useBalance}} </i>元</div>
                </div>
                <div class="lastnumber"></div>
            </div>
            <!-- <div class="banknumberbox smallmargin">
                <div class="bankname">提现金额</div>
                <div class="bankmoney">
                    <el-input class="banknum light_gray" placeholder="请输入提现金额" v-model="inpu">
                    </el-input>
                    <div class="paymoney">需扣除手续费<i> 0.00 </i>元</div>
                    <div class="paymoney income">实际到账<i> {{inpu}}元 </i>元</div>
                </div>
                <div class="lastnumber bluewithdrawal">全部提现</div>
            </div> -->
            <div class="withdrawalbtn" @click="onSubmit">提现</div>
            <div class="companybox" v-if="openUrl">
                <div class="companytitle">非IE浏览器复制</div>
                <div class="companyinput">
                    <el-input ref="openurl" class="" size="small" placeholder="" v-model="openUrl">
                    </el-input>
                    <el-button size="small" @click="onCopy">复制</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
const mixin = {
    computed: {
        ...mapState({
            balance: 'balance',
            bingAccount: 'bingAccount'
        })
    },
    methods: {
        ...mapMutations({}),
        ...mapActions({
            getBalance: 'getBalance',
            getBingAccount: 'getBingAccount',
            getWithdrawal: 'getWithdrawal'
        })
    }
};
export default {
    mixins: [mixin],
    data() {
        return {
            inpu: '',
            openUrl: '', // 返回跳转ie地址
            
        };
    },
    mounted() {
        this.getBalance();
        this.getBingAccount();
    },
    methods: {
        onCopy() {
            this.$refs.openurl.select();
            if (document.execCommand('copy')) {
                document.execCommand('copy');
                this.$message({
                    showClose: true,
                    message: '复制成功'
                });
            }
        },
        onSubmit() {
            this.getWithdrawal().then(res => {
                console.log(res.msg);
                if (res.code === 0) {
                    if (this.isIE) {
                        window.open(res.obj);
                    } else {
                        this.openUrl = res.obj || res.msg;
                    }
                } else {
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'error'
                    });
                }   
            });
        }
    },
    computed: {
        getOptions() {}
    },
    components: {}
};
</script>
<style lang="less">
@import '../../assets/css/mixin.less';

.association-box {
    /*=====================账户提现========================*/
    .tips {
        width: 874px;
        height: 41px;
        background: #f2f3f5;
        padding-left: 16px;
        line-height: 41px;
        font-size: 14px;
        color: #fe8617;
        margin: 0 auto;
        margin-top: 30px;
    }
    .bankbox {
        width: 46%;
        margin: 0 auto;
    }
    .banknumberbox {
        display: flex;
        flex-direction: row;
        margin-top: 59px;
    }
    .bankname {
        font-size: 16px;
        color: #888888;
        height: 40px;
        line-height: 40px;
    }
    .bankmoney {
        margin-left: 23px;
    }
    .banknum {
        width: 212px;
        height: 40px;
        line-height: 40px;
        border-radius: 30px;
        font-size: 14px;
        color: #222222;
        border: 1px solid #c7c7c7;
        padding-left: 23px;
        .el-input__inner {
            border: 0px;
            padding-left: 0;
            background-color: rgba(255, 255, 255, 0);
        }
    }
    .paymoney {
        font-size: 14px;
        color: #888888;
        margin-top: 15px;
        margin-left: 15px;
    }
    .paymoney i {
        font-style: normal;
        color: #222222;
        font-weight: 600;
    }
    .lastnumber {
        font-size: 14px;
        color: #888888;
        margin-left: 19px;
        line-height: 40px;
    }
    .income {
        margin-top: 6px;
    }
    .income i {
        color: #479ceb;
    }
    .bluewithdrawal {
        color: #479ceb;
    }
    .smallmargin {
        margin-top: 35px;
    }
    .withdrawalbtn {
        width: 60%;
        margin: 0 auto;
        background: #fe8617;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #fff;
        border-radius: 30px;
        margin-top: 70px;
        font-size: 14px;
        cursor: pointer;
    }
}
</style>
