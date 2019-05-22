<template>
    <div class="association-box">
        <h3>账户关联</h3>
        <div class="form-info">
            <div class="form-item">
                <div class="item-name">企业名称</div>
                <div class="item-input">
                    <el-input class="" size="small" placeholder="请输入企业名称" v-model="tempPersonalBase.entpNm" :disabled="true">
                    </el-input>
                </div>
            </div>
            <div class="form-item" v-if="!isJump">
                <div class="item-name">开户行行号</div>
                <div class="item-input">
                    <el-input class="" size="small" placeholder="开户行行号" v-model="account.obj.bankCode" :disabled="true">
                    </el-input>
                </div>
            </div>
            <div class="form-item" v-if="!isJump">
                <div class="item-name">开户行名称</div>
                <div class="item-input">
                    <el-input class="" size="small" placeholder="开户行名称" v-model="account.bankName" :disabled="true">
                    </el-input>
                </div>
            </div>
            <div class="form-item" v-if="!isJump">
                <div class="item-name item-align">银行账户</div>
                <div class="item-input">
                    <el-input class="" size="small" placeholder="银行账户" v-model="account.bankAccount" :disabled="true">
                    </el-input>
                </div>
            </div>

            <div class="form-item form-but" v-if="isJump">
                <div class="but-sub" @click="onSubmit">去绑定账户</div>
            </div>
        </div>

    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
const mixin = {
    computed: {
        ...mapState({
            account: 'account',
            personalBase: 'personalBase',
            shopEntp: 'shopEntp'
        })
    },
    methods: {
        ...mapMutations({}),
        ...mapActions({
            getAccount: 'getAccount',
            postSaveAccount: 'postSaveAccount'
        })
    }
};
export default {
    mixins: [mixin],
    data() {
        return {};
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.getAccount();
            // .then(res => {
            //     // console.log('acccount', this.account);
            //     // if (res.code === 0 && res.obj) {
            //     //     this.form.bankAccount = res.obj.bankAccount;
            //     //     this.form.bankCode = res.obj.bankCode;
            //     //     this.form.bankName = res.obj.bankName;
            //     // }
            // });
        },
        onSubmit() {
            this.postSaveAccount().then(res => {
                window.top.location.href = res.obj;
            });
        }
    },
    computed: {
        isJump() {
            // console.log('personalBase', this.personalBase);
            if (this.account && this.account.obj) {
                return false;
            } else {
                return true;
            }
        },
        tempPersonalBase() {
            if (
                this.shopEntp.obj &&
                this.shopEntp.obj.bizEntpInfo &&
                this.shopEntp.obj.bizEntpInfo.entpNm
            ) {
                return { entpNm: this.shopEntp.obj.bizEntpInfo.entpNm };
            } else {
                return {};
            }

            console.log('this.shopEntp', this.shopEntp);
            // if (this.personalBase.obj) {
            //     const data = { ...this.personalBase.obj };
            //     if (this.account && this.account.obj) {
            //         data.entpNm = this.account.obj.entpNm;
            //     }
            //     return data;
            // } else {
            //     return {};
            // }
        }
    },
    components: {}
};
</script>
<style lang="less">
@import '../../assets/css/mixin.less';

.association-box {
    //padding: 0 30px;

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
