<template>
    <div class="login-main w1200">
        <div class="login-box">
            <div class="logintitle">
                <span class="til-left">登陆</span>
                <span class="til-right">还不是票易融会员? <a @click="onGoPath"> 快速注册</a></span>
            </div>
            <div class="logininforbox">
                <div class="loginuserbox">
                    <span class="Usertext">
                        <input v-model="form.username" v-on:keyup.enter="onSubmit" name="" type="text" class="Userinput" placeholder="请输入手机号或用户名">
                    </span>
                </div>
                <div class="loginuserbox">
                    <span class="Usertext pasd">
                        <input v-model="form.password" v-on:keyup.enter="onSubmit" name="" type="password" class="Userinput hpwd" placeholder="请输入密码">
                    </span>
                </div>
                <div class="loginuserbox m-top">
                    <span class="Usertext yzm">
                        <input v-model="form.validateCode" v-on:keyup.enter="onSubmit" name="" type="text" class="Userinput User_yzinput">
                        <img :src="imgUrl" @click="onAfreshImg" />
                    </span>
                </div>
                <div class="Loginbtn" @click="onSubmit">立即登录</div>
                <div class="forgetpassword" @click="onPath">忘记密码？</div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import urls from '@/config/url_enum.js';
import config from '@/config/index.js';
import cookie from '@/util/cookie.js';
const mixin = {
    computed: {
        ...mapState({
            shopEntp: 'shopEntp'
        })
    },
    methods: {
        ...mapMutations({}),
        ...mapActions({
            postLogin: 'postLogin',
            getCaptchaImage: 'getCaptchaImage',
            getShopEntp: 'getShopEntp'
        })
    }
};

const codeUrl = config.serverHost + '/captcha/captchaImage?type=math';
// 'http://47.104.211.149/cnpyr-shop/shop/captcha/captchaImage?type=math';
export default {
    mixins: [mixin],
    data() {
        return {
            imgUrl: codeUrl,
            form: {
                username: '', // '18888889999',
                password: '', //'123456',
                validateCode: '',
                rememberMe: 0
            }
        };
    },
    mounted() {
        const token = cookie.getCookie(config.tokenKey);
        console.log(token);
        // const userInfo = cookie.getCookie(config.userInfo);
        // if (userInfo) {
        //     document.location.href = '/';
        // }
    },
    methods: {
        onAlert() {},
        onSubmit() {
            let msg = '';
            if (!this.form.username) {
                msg = '请填写用户名称';
            } else if (!this.form.password) {
                msg = '请填写密码';
            }
            if (msg) {
                this.$message({
                    showClose: true,
                    message: msg,
                    type: 'error'
                });
                return false;
            }
            this.postLogin({ ...this.form }).then(res => {
                if (res.code === 0) {
                    cookie.setCookie(config.tokenKey, res.msg);
                    cookie.setCookie(config.userInfo, this.form.username);
                    this.getShopEntp().then(res => {
                        if (
                            res.obj &&
                            res.obj.bizEntpInfo &&
                            res.obj.bizEntpInfo.entpNm
                        ) {
                            cookie.setCookie(
                                config.userInfo,
                                res.obj.bizEntpInfo.entpNm
                            );
                        }
                    });
                    setTimeout(() => {
                        location.href = location.origin + '/' + urls.home;
                    }, 500);
                } else {
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'error'
                    });
                    this.onAfreshImg();
                }
            });
        },
        onGoPath() {
            location.href = location.origin + '/' + urls.register;
            // this.$router.push({
            //     path: '/registered'
            // });
        },
        onPath() {
            console.log('onPath /retrieve');
            this.$router.push({
                path: '/retrieve'
            });
        },
        onCaptchaImage() {
            this.getCaptchaImage({
                type: 'math'
            });
        },
        onAfreshImg() {
            this.imgUrl = codeUrl + '&a=' + Math.random();
        }
    },
    filter: {},
    computed: {},
    components: {}
};
</script>
<style lang="less">
@import '../../assets/css/index.less';
.login-main {
    height: 518px;
    background: url(../../assets/images/login/bg.png) no-repeat center bottom;
    background-size: 100% 100%;
    position: relative;
    .login-box {
        width: 396px;
        height: 350px;
        background: #fff;
        border-radius: 6px;
        position: absolute;
        top: 71px;
        right: 150px;
        padding: 33px 29px 24px 32px;
        .logintitle {
            border-top-left-radius: 6px;
            border-top-right-radius: 6px;
            color: #666;
            text-align: justify;
            text-align-last: justify;
            .til-left {
                display: inline-block;
                font-size: 24px;
            }
            .til-right {
                display: inline-block;
                font-size: 14px;
                a {
                    color: #479ceb;
                }
            }
        }
        .logininforbox {
            margin-top: 17px;
        }
        .Usertext {
            width: 100%;
            display: inline-block;
            font-size: 16px;
            background: url(../../assets/images/login/login1.png) 16px 11px
                no-repeat;
            &.pasd {
                background: url(../../assets/images/login/login2.png) 16px 11px
                    no-repeat;
            }
            &.yzm {
                background: url(../../assets/images/login/login3.png) 16px 11px
                    no-repeat;
                img {
                    margin-left: 15px;
                    height: 40px;
                    width: 118px;
                    display: inline-block;
                    vertical-align: bottom;
                }
            }
            .Userinput {
                padding-left: 51px;
                width: 100%;
                height: 40px;
                border: 1px solid #dddddd;
                border-radius: 2px;
                color: #303d50;
                &.User_yzinput {
                    width: 195px;
                }
            }
        }
        .loginuserbox {
            margin-top: 13px;
            &.m-top {
                margin-top: 9px;
            }
        }
        .eyeicon {
            display: inline-block;
            width: 15px;
            height: 17px;
            position: relative;
            right: 24px;
        }
        .forgetpassword {
            font-size: 14px;
            color: #484e5d;
            text-align: left;
            margin-top: 12px;
            cursor: pointer;
        }
        .Loginbtn {
            height: 46px;
            background: #479ceb;
            border-radius: 4px;
            text-align: center;
            line-height: 46px;
            font-size: 16px;
            color: #fff;
            margin-top: 21px;
            cursor: pointer;
            &:hover {
                background: #25b6ff;
            }
        }
        .Zcbtn {
            color: #00e7ff;
            background: #073062;
            margin-left: 47px;
        }
    }
}
</style>