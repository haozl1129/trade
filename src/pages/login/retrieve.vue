<template>
    <div class="retrieve-main white_W1200">
        <div class="stepsbigbox">
            <div class="stepstitle"></div>
            <div class="stepsLine"></div>
            <div class="stepsone">1
                <div class="stepsone-tle">找回密码</div>
            </div>
        </div>
        <div class="stepsbigbox">
            <div class="stepstitle huiColor"></div>
            <div class="stepsLine hui_BgColor" :class="{'succeed-lien': isSucceed}"></div>
            <div class="stepsone hui_BgColor line" :class="{'succeed-lien': isSucceed}">2
                <div class="stepsone-tle">完成</div>
            </div>
        </div>
        <div class="clear"></div>
        <div class="personbigbox" v-if="!isSucceed">
            <div class="Personinforbox">
                <div class="pername">手机号</div>
                <div class="pertext">
                    <el-input class="" placeholder="请输入手机号" v-model="form.mobile">
                    </el-input>
                </div>
                <div class="clear"></div>
            </div>
            <div class="Personinforbox">
                <div class="pername">验证码</div>
                <div class="pertext smallinput">
                    <el-input class="" placeholder="请输入验证码" v-model="validateCode">
                    </el-input>
                </div>
                <div class="yzm-box">
                    <img :src="imgUrl" @click="onAfreshImg" />
                </div>
                <div class="clear"></div>
            </div>
            <div class="Personinforbox">
                <div class="pername">短信验证码</div>
                <div class="pertext smallinput">
                    <el-input class="" placeholder="请输入短信验证码" v-model="form.msgCode">
                    </el-input>
                </div>
                <el-button class="per_second" :disabled="verifyCode.disable" plain @click="onSend">{{verifyCode.text}}</el-button>
                <div class="clear"></div>
            </div>
            <div class="Personinforbox">
                <div class="pername">登录密码</div>
                <div class="pertext">
                    <el-input type="password" class="" placeholder="请输入登录密码" v-model="form.password">
                    </el-input>
                </div>
                <div class="clear"></div>
            </div>
            <div class="Personinforbox">
                <div class="pername">确认密码</div>
                <div class="pertext">
                    <el-input type="password" class="" placeholder="请输入确认密码" v-model="form.password1">
                    </el-input>
                </div>
                <div class="clear"></div>
            </div>
            <div class="Personinforbox">
                <div class="pername">&nbsp;</div>
                <div class="pertext">
                    <div class="zc_loginbtn" @click="onSubmit">提交</div>
                </div>
                <div class="clear"></div>
            </div>
        </div>
        <div class="personbigbox" :class="{'personbigbox-succeed': isSucceed}" v-if="isSucceed">
            <div class="succeed-1">恭喜您，密码设置成功!</div>
            <div class="succeed-2">请妥善保存您的密码</div>
            <div class="succeed-3" @click="onPath">立即登录</div>
        </div>

    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import config from '@/config/index.js';
import validator from '@/util/validator.js';
const mixin = {
    computed: {
        ...mapState({})
    },
    methods: {
        ...mapMutations({}),
        ...mapActions({
            postPassword: 'postPassword',
            postSendMessage: 'postSendMessage'
        })
    }
};
const codeUrl = config.serverHost + '/captcha/captchaImage?type=math';
export default {
    mixins: [mixin],
    data() {
        return {
            imgUrl: codeUrl,
            validateCode: '',
            form: {
                mobile: '',
                password: '',
                password1: '',
                msgCode: ''
            },
            verifyCode: {
                text: '发送',
                disable: false,
                seconds: 10
            },
            checked: true,
            isSucceed: false
        };
    },
    mounted() {},
    methods: {
        onAlert() {},
        // 提交
        onSubmit() {
            let msg = '';
            if (this.form.password !== this.form.password1) {
                msg = '两次密码不同';
            } else if (!this.form.mobile) {
                msg = '请输入有效手机号';
            }
            if (msg) {
                this.$message({
                    showClose: true,
                    message: msg,
                    type: 'error'
                });
                return false;
            }
            this.postPassword({ ...this.form }).then(res => {
                if (res.code === 0) {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    });
                    this.isSucceed = true;
                } else {
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'error'
                    });
                    console.log(res.msg);
                }
            });
        },
        onGoPath() {},
        // 短信啊
        onSend() {
            if (this.verifyCode.disable) {
                return false;
            }
            console.log(this.form.mobile);
            let msg = '';
            if (!this.validateCode) {
                msg = '请填写验证码';
            } else if (!validator.validateMobile(this.form.mobile)) {
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
                    this.verifyCode.text = '发送';
                    clearInterval(timeout);
                }
            }, 1000);

            this.postSendMessage({
                mobile: this.form.mobile,
                validateCode: this.validateCode
            }).then(res => {
                if (res.code === 0) {
                    this.$message({
                        message: '发送成功',
                        type: 'success'
                    });
                }
            });
        },
        onAfreshImg() {
            this.imgUrl = codeUrl + '&a=' + Math.random();
        },
        onPath() {
            this.$router.push({
                path: '/'
            });
        }
    },
    filter: {},
    computed: {},
    components: {}
};
</script>
<style lang="less">
@import '../../assets/css/index.less';
.aa:after {
    content: ' bbb ';
}
.retrieve-main {
    margin-top: 10px;
    margin-bottom: 10px;
    padding-left: 46px;
    padding-top: 40px;
    //box-shadow: 8px 8px 20px #e0dfdf;
    box-shadow: 0 0 20px rgba(50, 50, 50, 0.2);
    padding-bottom: 56px;
    background: #fff;
    .stepsLine {
        width: 170px;
        height: 4px;
        background: #fd8e33;
        margin-top: 8px;
        float: right;
    }
    .stepstitle {
        width: 550px;
        font-size: 14px;
        color: #0072ff;
        text-align: center;
    }
    .stepsone {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 5px solid #fd8e33;
        text-align: center;
        line-height: 27px;
        font-size: 16px;
        color: #657381;
        margin: 0 auto;
        position: relative;
        top: -8px;
        display: inline-block;
        float: right;
        .stepsone-tle {
            font-size: 14px;
            position: absolute;
            width: 4em;
            text-align: center;
            left: -1em;
            top: 45px;
        }
    }
    .stepsbigbox {
        float: left;
    }
    .huiColor {
        color: #e4e4e4;
    }
    .hui_BgColor {
        float: left;
        background: #e4e4e4;
        &.succeed-lien {
            background: #fd8e33;
        }
        &.line {
            background: #fff;
            border: 5px solid #e4e4e4;
            &.succeed-lien {
                border-color: #fd8e33;
            }
        }
    }
    .personbigbox {
        width: 548px;
        margin: 0 auto;
        padding-top: 67px;
        padding-left: 22px;
        font-weight: 400;
        color: #222222;
        text-align: center;
        &.personbigbox-succeed {
            padding-left: 0px;
            padding-right: 55px;
        }
        .succeed-1 {
            font-size: 20px;
            line-height: 71px;
        }
        .succeed-2 {
            font-size: 14px;
            line-height: 71px;
        }
        .succeed-3 {
            font-size: 16px;
            width: 334px;
            height: 46px;
            line-height: 46px;
            background-color: #479ceb;
            color: #fff;
            display: inline-block;
            border-radius: 4px 4px 4px 4px;
        }
    }
    .pername {
        width: 88px;
        text-align: left;
        font-size: 14px;
        color: #666666;
        float: left;
        line-height: 40px;
    }
    .pertext {
        width: 330px;
        height: 31px;
        float: left;
        .el-input__inner {
            border-radius: 2px;
        }
    }
    .petinput {
        width: 330px;
        height: 31px;
        border: 1px solid #999999;
        border-radius: 4px;
        padding-left: 20px;
    }
    .mandatory {
        font-size: 16px;
        color: #ff0000;
        margin-left: 20px;
        line-height: 31px;
        float: left;
    }
    .Personinforbox {
        margin-top: 27px;
        .yzm-box {
            margin-left: 36px;
            height: 39px;
            width: 134px;
            float: left;
            img {
                height: 100%;
                width: 100%;
            }
        }
    }
    .smallinput {
        width: 160px;
    }
    .per_second {
        width: 134px;
        border: 1px solid #479ceb;
        border-radius: 4px;
        text-align: center;
        color: #479ceb;
        float: left;
        margin-left: 36px;
        cursor: pointer;
        &.disable {
            background-color: #ccc;
        }
    }
    .pertext .passwordicon {
        background: url(../../assets/images/eyes.png) right 10px center
            no-repeat;
    }
    .zc_loginbtn {
        width: 334px;
        height: 46px;
        border-radius: 4px 4px 4px 4px;
        border: 1px solid #479ceb;
        background: #479ceb;
        margin: 0 auto;
        text-align: center;
        line-height: 44px;
        font-size: 16px;
        color: #fff;
    }
}
</style>