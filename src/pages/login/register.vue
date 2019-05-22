<template>
    <div class="registered-main white_W1200">
        <template v-if="!isSucceed">
            <div class="personbigbox-right">
                <div class="per-tile">已有账号，立即 

                    <a class="login-item login-color" @click="onGoLogin()">登陆</a>
                </div>
                <img src="../../assets/images/login/zc.png">
            </div>
            <div class="personbigbox">
                <!-- <div class="Personinforbox">
                    <div class="pername">企业名称：</div>
                    <div class="pertext">
                        <el-input class="" placeholder="请输入企业名称" v-model="form.mobile">
                        </el-input>
                    </div>
                    <div class="clear"></div>
                </div> -->
                <div class="Personinforbox">
                    <div class="pername">手机号：</div>
                    <div class="pertext">
                        <el-input class="" placeholder="请输入手机号" v-model="form.mobile">
                        </el-input>
                    </div>
                    <div class="mandatory">* </div>
                    <div class="clear"></div>
                </div>
                <div class="Personinforbox">
                    <div class="pername">验证码：</div>
                    <div class="pertext smallinput">
                        <el-input class="" placeholder="请输入验证码" v-model="validateCode">
                        </el-input>
                    </div>
                    <div class="yzm-box">
                        <img :src="imgUrl" @click="onAfreshImg" />
                    </div>
                    <div class="mandatory">* </div>
                    <div class="clear"></div>
                </div>
                <div class="Personinforbox">
                    <div class="pername">短信验证码：</div>
                    <div class="pertext smallinput">
                        <el-input class="" placeholder="请输入短信验证码" v-model="form.msgCode">
                        </el-input>
                    </div>
                    <el-button class="per_second" :disabled="verifyCode.disable" plain @click="onSend">{{verifyCode.text}}</el-button>
                    <div class="mandatory">* </div>
                    <div class="clear"></div>
                </div>
                <div class="Personinforbox">
                    <div class="pername">登录密码：</div>
                    <div class="pertext">
                        <el-input type="password" class="" placeholder="请输入登录密码" v-model="form.password">
                        </el-input>
                    </div>
                    <div class="mandatory">* </div>
                    <div class="clear"></div>
                </div>
                <div class="Personinforbox">
                    <div class="pername">确认密码：</div>
                    <div class="pertext">
                        <el-input type="password" class="" placeholder="请输入确认密码" v-model="form.password1">
                        </el-input>
                    </div>
                    <div class="mandatory">* </div>
                    <div class="clear"></div>
                </div>
                <div class="Personinforbox">
                    <div class="pername">推荐人：</div>
                    <div class="pertext">
                        <el-input class="" placeholder="请输入推荐人" v-model="inpu">
                        </el-input>
                    </div>
                    <div class="clear"></div>
                </div>
                <div class="zc_loginbtn" @click="onSubmit">提交</div>
                <div class="agreentip">
                    <el-checkbox v-model="checked"></el-checkbox>我已阅读并同意
                    <a @click="goCon()">《注册服务协议》</a> 
                    <a @click="goRull()">《交易规则须知》</a>
                </div>
          
            </div>
        </template>
        <template v-else>
            <div class="succeed-ok">
                <img src="../../assets/images/login/ok.png">
            </div>
            <div class="succeed-ctx">恭喜您，注册成为票易融会员！</div>
            <div class="succeed-info"><a @click="onGoHome">如需交易请至企业信息界面绑定企业资料</a></div>
        </template>
        <el-dialog :visible="rullDialog" @close="onClose" append-to-body width="50%">
            <rull></rull>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" @click="onClose">同 意</el-button>
            </span>
        </el-dialog>  
        <el-dialog :visible="detailDialog" @close="onClose" append-to-body width="50%">
            <notice></notice>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" size="small" @click="onClose">同 意</el-button>
            </span>
        </el-dialog>          

    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import urls from '@/config/url_enum.js';
import config from '@/config/index.js';
import cookie from '@/util/cookie.js';
import validator from '@/util/validator.js';
import notice from './notice.vue';
import rull from './rull.vue';


const mixin = {
    computed: {
        ...mapState({})
    },
    methods: {
        ...mapMutations({}),
        ...mapActions({
            postSendMessage: 'postSendMessage',
            postRegist: 'postRegist'
        })
    }
};
const codeUrl = config.serverHost + '/captcha/captchaImage?type=math';
export default {
    mixins: [mixin],
    data() {
        return {
            inpu: '',
            imgUrl: codeUrl,
            validateCode: '',
            form: {
                mobile: '',
                password: '',
                password1: '',
                msgCode: ''
            },
            verifyCode: {
                text: '获取验证码',
                disable: false,
                seconds: 10
            },
            checked: true,
            isSucceed: false,
            detailDialog: false,
            rullDialog:false,

        };
    },
    mounted() {
        const token = cookie.getCookie(config.tokenKey);
        if (token) {
            document.location.href = location.origin + '/' + urls.index;
        }
    },
    methods: {
        onAlert() {},
        // 提交
        onSubmit() {
            let msg = '';
            if (this.form.password !== this.form.password1) {
                msg = '两次密码不同';
            } else if (!this.form.mobile) {
                msg = '请输入有效手机号';
            } else if (!this.checked) {
                msg = '请先同意协议';
            }
            if (msg) {
                this.$message({
                    showClose: true,
                    message: msg,
                    type: 'error'
                });
                return false;
            }
            this.postRegist({ ...this.form }).then(res => {
                if (res.code === 0) {
                    console.log(res.msg);
                    cookie.setCookie(config.tokenKey, res.obj);
                    cookie.setCookie(config.userInfo, this.form.mobile);
                    this.isSucceed = true;
                    // setTimeout(() => {
                    //     location.href = location.origin + '/' + urls.home;
                    // }, 500);
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
        onGoHome() {
            location.href = location.origin + '/' + urls.home;
        },
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
                    this.verifyCode.text = '获取验证码';
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
        onGoLogin() {
            location.href = location.origin + '/' + urls.login;

        },
        goCon(){
            this.detailDialog = true;
            
             
        },
        goRull(){
             this.rullDialog= true;
        },
        onClose(){
            this.detailDialog = false;
             this.rullDialog= false;

        }
 
    },   
    filter: {},
    computed: {},
    components: {
        notice: notice,
        rull:rull
    }
};
</script>
<style lang="less">
@import '../../assets/css/index.less';
.aa:after {
    content: ' bbb ';
}
.registered-main {
    margin-top: 10px;
    padding: 62px 42px 53px 57px;
    background: #fff;
    & > div {
        display: inline-block;
    }
    .personbigbox {
        margin-left: 135px;
        .Personinforbox {
            margin-top: 27px;
            .yzm-box {
                margin-left: 35px;
                height: 40px;
                width: 134px;
                float: left;
                img {
                    height: 100%;
                    width: 100%;
                }
            }
        }
        .stepsLine {
            width: 550px;
            height: 4px;
            background: #0072ff;
            margin-top: 15px;
        }
        .stepstitle {
            width: 550px;
            font-size: 14px;
            color: #0072ff;
            text-align: center;
        }
        .stepsone {
            width: 18px;
            height: 18px;
            background: #0072ff;
            border-radius: 50%;
            text-align: center;
            line-height: 18px;
            font-size: 14px;
            color: #fff;
            margin: 0 auto;
            position: relative;
            top: -8px;
        }
        .pername {
            width: 98px;
            text-align: left;
            font-size: 14px;
            color: #666666;
            float: left;
            line-height: 40px;
        }
        .pertext {
            width: 330px;
            height: 40px;
            float: left;
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
            margin-left: 35px;
            cursor: pointer;
            &.disable {
                background-color: #ccc;
            }
        }
        .pertext .passwordicon {
            background: url(../../assets/images/eyes.png) right 10px center
                no-repeat;
        }
        .agreentip {
            font-size: 14px;
            color: #999999;
            margin-top: 10px;
            margin-left: 100px;
            a {
                color: #428aff;
            }
        }
        .agreentip > span {
            display: inline-block;
            margin-right: 8px;
            position: relative;
            top: 2px;
        }
        .zc_loginbtn {
            width: 334px;
            height: 46px;
            background: #5abbff;
            text-align: center;
            line-height: 46px;
            margin-top: 11px;
            margin-left: 98px;
            font-size: 18px;
            color: #fff;
            border-radius: 8px;
        }
    }
    .personbigbox-right {
        height: 100%;
        float: left;
        margin-top: 85px;
        .per-tile {
            font-size: 14px;
            color: #484e5d;
            margin-bottom: 18px;
            text-align: right;
            a {
                color: #fe8617;
            }
        }
    }
    .succeed-ok {
        height: 96px;
        display: block;
        text-align: center;
    }
    .succeed-ctx {
        font-size: 20px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(34, 34, 34, 1);
        line-height: 71px;
        display: block;
        text-align: center;
    }
    .succeed-info {
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 71px;
        display: block;
        text-align: center;
        text-decoration: underline;
    }
}
</style>