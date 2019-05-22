<template>
    <div class="association-box">

        <div class="usertabbox">
            <div class="offline" :class="{'topline': isOffline}">线下充值</div>
            <!-- <div class="offline" :class="{'topline': !isOffline}" @click="onTabTpye">快捷充值</div> -->
        </div>
        <div v-show="isOffline">
            <div class="tips offlinetip">使用已签约的同名对公账户于线下网银至虚拟账户（齐商银行）后完成充值！</div>
            <div class="bankbox">
                <div class="banknumberbox">
                    <div class="bankname accout_width">账户名</div>
                    <div class="banknum bank_tit">{{shopEntp.obj && shopEntp.obj.bizEntpInfo && shopEntp.obj.bizEntpInfo.entpNm}}</div>
                </div>
            </div>
            <div class="bankbox">
                <div class="banknumberbox accout_margin">
                    <div class="bankname accout_width">帐号</div>
                    <div class="banknum bank_tit">{{recharge.obj.subAcctNo}}</div>
                </div>
            </div>
            <div class="bankbox">
                <div class="banknumberbox accout_margin">
                    <div class="bankname accout_width">开户行</div>
                    <div class="banknum bank_tit">{{recharge.obj.bankName}}</div>
                </div>
            </div>
            <div class="bankbox">
                <div class="banknumberbox accout_margin">
                    <div class="bankname accout_width">开户行行号</div>
                    <div class="banknum bank_tit">{{recharge.obj.bankNo}}</div>
                </div>
            </div>
        </div>
        <div v-show="!isOffline">
            <div class="form-info">
                <div class="form-item">
                    <div class="item-name item-align">银行账户</div>
                    <div class="item-input">
                        <el-input class="" size="small" placeholder="请输入银行账户" v-model="entpNm" :disabled="true">
                        </el-input>
                    </div>
                </div>
                <div v-show="rechargeData !== ''">
                    <div>充值信息: </div>
                    <div style="width: 600px;word-break: break-all;">
                        {{rechargeData}}
                    </div>
                </div>
                <div class="form-item form-but">
                    <div class="but-sub" @click="onSubmit">跳转网银</div>
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
            shopEntp: 'shopEntp',
            recharge: 'recharge'
        })
    },
    methods: {
        ...mapMutations({}),
        ...mapActions({
            getRecharge: 'getRecharge'
        })
    }
};
export default {
    mixins: [mixin],
    data() {
        return {
            isOffline: true,
            rechargeData: ''
        };
    },
    mounted() {
        this.getRecharge();
    },
    methods: {
        onSubmit() {
            this.getRecharge().then(res => {
                console.log(res);
                if (res.code === 0) {
                    this.rechargeData = JSON.stringify(res.obj);
                }
            });
        },
        onTabTpye() {
            this.isOffline = !this.isOffline;
        }
    },
    computed: {
        entpNm() {
            if (
                this.shopEntp.obj.bizEntpInfo &&
                this.shopEntp.obj.bizEntpInfo.entpNm
            ) {
                return this.shopEntp.obj.bizEntpInfo.entpNm;
            }
            return '';
        }
    },
    components: {}
};
</script>
<style lang="less">
@import '../../assets/css/mixin.less';

.association-box {
    /*=====================账户充值=======================*/
    .usertabbox {
        display: flex;
        flex-direction: row;
    }
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
    .bank_tit {
        margin-left: 27px;
    }
    .smallwidth {
        width: 59%;
    }
    .accout_width {
        width: 28%;
        text-align: right;
    }
    .accout_margin {
        margin-top: 40px;
    }
    .banknum {
        width: 230px;
    }
    .form-info {
        margin-top: 40px;
        .flexbox(column);
        &.top-line {
            border-top: 1px solid #e3e3e3;
            padding-top: 50px;
        }
        .form-item {
            .flexbox();
            margin-bottom: 25px;
            line-height: 32px;
            .item-name {
                .flex-display();
                .center();
                .flexjustify(flex-end);
                width: 238px;
                color: #666666;
                font-size: 14px;
                &.item-align {
                    .flexalign(flex-start);
                }
            }
            .item-input {
                margin-left: 20px;
                width: 300px;
                .upload-demo {
                    .upd-box {
                        .center();
                        width: 100%;
                        height: 100%;
                    }
                    .el-upload-dragger {
                        width: 300px;
                        height: 155px;
                    }
                }
            }
            &.form-but {
                .center();
                font-size: 16px;
                .but-sub {
                    .center();
                    cursor: pointer;
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
            }
        }
    }
}
</style>
