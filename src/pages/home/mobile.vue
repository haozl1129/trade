<template>
    <div class="association-box">
        <div class="bankbox">
            <div class="banknumberbox">
                <div class="bankname">新手机号</div>
                <div class="bankmoney">
                    <div class="banknum">
                        <el-input class="" size="small" placeholder="请输入新手机号" v-model="formData.mobile">
                        </el-input>
                    </div>
                </div>
            </div>
            <div class="banknumberbox">
                <div class="bankname">登陆密码</div>
                <div class="bankmoney">
                    <div class="banknum">
                        <el-input type="password" class="" size="small" placeholder="请输入登陆密码" v-model="formData.oldPas">
                        </el-input>
                    </div>
                </div>
            </div>
            <div class="banknumberbox">
                <div class="bankname">验证码</div>
                <div class="bankmoney">
                    <div class="banknum banknum_w">
                        <el-input class="" size="small" placeholder="请输入验证码" v-model="formData.code">
                        </el-input>
                    </div>
                </div>
                <div class="lastnumber"><img :src="imgUrl" @click="onAfreshImg" /></div>
            </div>
            <div class="banknumberbox">
                <div class="bankname">短信验证码</div>
                <div class="bankmoney">
                    <div class="banknum banknum_w">
                        <el-input class="" size="small" placeholder="请输入短信验证码" v-model="formData.msgCode">
                        </el-input>
                    </div>
                </div>
                <div class="lastnumber" :class="{'disable': verifyCode.disable}" @click="onSend">获取短信验证码</div>
            </div>
            <div class="withdrawalbtn" @click="onSubmit">提交</div>
        </div>
    </div>
</template>
<script>
import validator from '@/util/validator.js';
import config from '@/config/index.js';
import { mapState, mapMutations, mapActions } from 'vuex';
const mixin = {
    computed: {
        ...mapState({})
    },
    methods: {
        ...mapMutations({}),
        ...mapActions({
            postSendMessage: 'postSendMessage',
            postMobile: 'postMobile'
        })
    }
};
const codeUrl = config.serverHost + '/captcha/captchaImage?type=math';
export default {
    mixins: [mixin],
    data() {
        return {
            imgUrl: codeUrl,
            formData: {
                mobile: '',
                msgCode: '',
                code: '',
                oldPas: ''
            },
            verifyCode: {
                text: '获取短信验证码',
                disable: false,
                seconds: 60
            }
        };
    },
    mounted() {},
    methods: {
        onSubmit() {
            const params = { ...this.formData };
            let msg = '';
            if (!params.oldPas) {
                msg = '请输入原手机号';
            } else if (!params.mobile) {
                msg = '请输入新手机号';
            } else if (!params.code) {
                msg = '请输入验证码';
            } else if (!params.msgCode) {
                msg = '请输入短信验证码';
            }
            if (msg) {
                this.$message({
                    showClose: true,
                    message: msg,
                    type: 'error'
                });
                return false;
            }
            this.postMobile(params);
        },
        onAfreshImg() {
            this.imgUrl = codeUrl + '&a=' + Math.random();
        },
        // 短信啊
        onSend() {
            if (this.verifyCode.disable) {
                return false;
            }
            console.log(this.formData.mobile);
            let msg = '';
            if (!this.formData.code) {
                msg = '请填写验证码';
            } else if (!validator.validateMobile(this.formData.mobile)) {
                msg = '请填写正确的手机号';
            }
            if (msg) {
                this.$message({
                    showClose: true,
                    message: msg,
                    type: 'error'
                });
                return false;
            }
            this.verifyCode.disable = true;
            this.verifyCode.seconds = 60;
            this.verifyCode.seconds--;
            this.verifyCode.text = `${this.verifyCode.seconds}s`;
            const timeout = setInterval(() => {
                if (this.verifyCode.seconds !== 0) {
                    this.verifyCode.seconds--;
                    this.verifyCode.text = `${this.verifyCode.seconds}s`;
                } else {
                    this.verifyCode.disable = false;
                    this.verifyCode.text = '获取短信验证码';
                    clearInterval(timeout);
                }
            }, 1000);

            this.postSendMessage({
                mobile: this.formData.mobile,
                validateCode: this.formData.code
            }).then(res => {
                if (res.code === 0) {
                    this.$message({
                        message: '发送成功',
                        type: 'success'
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
        width: 60%;
        margin: 0 auto;
    }
    .banknumberbox {
        display: flex;
        flex-direction: row;
        margin-top: 40px;
    }
    .bankname {
        font-size: 16px;
        color: #888888;
        width: 90px;
        height: 40px;
        line-height: 40px;
        text-align: right;
    }
    .bankmoney {
        margin-left: 23px;
    }
    .banknum {
        width: 300px;
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
        &.banknum_w {
            width: 180px;
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
        color: #fe8617;
        margin-left: 19px;
        width: 100px;
        height: 40px;
        line-height: 40px;
        cursor: pointer;
        img {
            width: 100%;
            height: 100%;
        }
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
