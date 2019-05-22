<template>
  <div class="header w1200">
    <div class="header-top clear">
      <div class="white_W1200">
        <div class="top-tel">
          <span>交易时间:</span>
          <span>工作日 9:00-17:00</span>
        </div>
        <div class="top-userinfo" v-if="!isLogin">
          <span @click="onGoAfter('login')" class="login-item login-color">登陆</span>
          <span>|</span>
          <span @click="onGoAfter('register')" class="login-item">注册</span>
          <span>|</span>
          <span @click="onGoAfter('register')" class="login-item">新手指南</span>
        </div>
        <div class="top-userinfo" v-else>
          <span @click="onGoAfter('home')" class="login-item">
            {{userName}}
            <img src="../../assets/images/header/user2x.png">
          </span>
          <span>|</span>
          <span @click="onLogout" class="login-item">
            退出
            <img src="../../assets/images/header/out2x.png">
          </span>
        </div>
      </div>
    </div>

    <div class="headbox white_W1200 clear">
      <div class="logo">
        <img :src="logoPath" @click="onGoBefore('index')">
      </div>
      <div class="nav">
        <ul>
          <li>
            <a
              :class="{'blueintro': tab === 'index'}"
              @click="onGoBefore('index')"
              class="head-li-a"
            >首页</a>
          </li>

          <li>
            <a
              :class="{'blueintro': tab === 'hall'}"
              @click="onGoBefore('hall')"
              class="head-li-a"
            >交易大厅</a>
          </li>
          <li>
            <a
              :class="{'blueintro': tab === 'bank'}"
              @click="onGoBefore('bank')"
              class="head-li-a"
            >银行快贴</a>
          </li>
          <li>
            <a
              :class="{'blueintro': tab === 'news'}"
              @click="onGoBefore('news')"
              class="head-li-a"
            >新闻动态</a>
            <!-- <div class="numselbox">
                            <ul>
                                /hyxw 
                                <li><a @click="onGoBefore('news')">行业新闻</a></li>
                                <li><a @click="onGoBefore('news', true)">集团新闻</a></li>
                                <li><a @click="onGoBefore('news', true)">平台公告</a></li>
                            </ul>
            </div>-->
          </li>
          <li>
            <a
              :class="{'blueintro': tab === 'help'}"
              @click="onGoBefore('help')"
              class="head-li-a"
            >帮助中心</a>
            <div class="numselbox">
              <ul>
                <li>
                  <a @click="onGoBefore('help')">新手指引</a>
                </li>
                <li>
                  <a @click="onGoBefore('help')">相关下载</a>
                </li>
                <li>
                  <a @click="onGoBefore('help')">操作手册</a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a
              :class="{'blueintro': tab === 'join'}"
              @click="onGoBefore('join')"
              class="head-li-a"
            >集团产品合作</a>
          </li>
          <li>
            <a :class="{'blueintro': tab === 'vip'}" @click="onGoVip('vip')" class="head-li-a">
              <img class="vip-ico" src="../../assets/images/index_new/vip@2x.png">
              会员通道
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
// import config from '@/config/index';
// eslint-disable-next-line no-unused-vars
import { mapState, mapMutations, mapActions } from 'vuex';
import urls from '@/config/url_enum.js';
import cookie from '@/util/cookie.js';
import config from '@/config/index.js';
import store from '@/store/base/header';

const mixin = {
    methods: {
        ...mapMutations({}),
        ...mapActions({
            getLogout: 'getLogout',
            getStationMessage: 'getStationMessage'
        })
    }
};
const logo = require('@/assets/images/logo.png');
// eslint-disable-next-line no-unused-vars
const logo_w = require('@/assets/images/index_new/logo@2x.png');

export default {
    store: store,
    mixins: [mixin],
    props: {
        theme: {
            type: String,
            default: ''
        },
        pageNmae: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            isLogin: false,
            userName: '',
            tab: 'index'
        };
    },
    mounted() {
        this.userName = cookie.getCookie(config.userInfo) || '';
        const token = cookie.getCookie(config.tokenKey);
        if (token) {
            this.isLogin = true;
            setInterval(() => {
                this.getStationMessage().then(res => {
                    if (res.code === 0) {
                        this.$notify({
                            title: res.obj.sndTm,
                            message: res.obj.msgCntnt,
                            duration: 0
                        });
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                });
            }, 30000);
        } else {
            this.isLogin = false;
        }
    },
    methods: {
        onLogout() {
            this.getLogout().then(res => {
                console.log(res);
                this.goHref('index');
            });
            cookie.setCookie(config.userInfo, '');
            cookie.setCookie(config.tokenKey, '');
        },
        onGetStationMessage() {},
        // eslint-disable-next-line no-unused-vars
        onGoBefore(item, isChildren) {
            this.tab = item;
            console.log('onGoBefore', item);
            // console.log(this.$refs.userinfo);
            // this.$refs.userinfo.style.color = 'red';
            if (this.pageNmae === 'index') {
                this.goPath(item);
            } else {
                this.goHref(item);
                // if (isChildren) {
                //     this.goHref(item, isChildren);
                // } else {
                //     this.goHref(item);
                // }
            }
        },
        onGoVip() {
            const token = cookie.getCookie(config.tokenKey);
            this.tab = 'vip';
            if (token) {
                location.href = location.origin + '/' + urls.vip;
            } else {
                location.href = location.origin + '/' + urls.login;
            }
        },
        onGoAfter(item) {
            if (this.pageNmae === 'home') {
                this.goPath(item);
            } else {
                this.goHref(item);
            }
        },
        goPath(path) {
            this.$router.push({
                path: path
            });
        },
        // eslint-disable-next-line no-unused-vars
        goHref(key, isChildren) {
            window.top.location.href = location.origin + '/' + urls[key];
        }
    },
    computed: {
        logoPath() {
            return logo;
            // if (this.theme === 'white') {
            //     return logo;
            // } else {
            //     return logo_w;
            // }
        }
    }
};
</script>

<style lang="less">
@import '../../assets/css/mixin.less';
.header {
    background-color: #fff;
    width: 100%;
    position: relative;
    z-index: 20;
    color: #333;
    .blueintro {
        color: #479ceb;
    }
    .header-top {
        background-color: #f2f3f5;
        height: 35px;
        line-height: 35px;
        font-size: 12px;
        .white_W1200 > div {
            display: inline-block;
        }
        .top-tel {
            float: left;
        }
        .top-userinfo {
            float: right;
            color: #333333;
            span {
                margin: 0 5px;
            }
            .login-item {
                cursor: pointer;
                width: 40px;
                text-align: center;
                img {
                    height: 10px;
                    margin-left: 5px;
                }
                &:hover {
                    color: #0096ff;
                }
                &.login-color {
                    color: #fe8617;
                }
            }
        }
    }
    .headbox {
        height: 75px;
        margin: 0 auto;
        & > div {
            display: inline-block;
        }
        .logo {
            float: left;
            width: 279px;
            // margin-top: 12px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .nav {
            float: left;
            & > ul {
                & > li {
                    float: left;
                    line-height: 75px;
                    text-align: center;
                    position: relative;
                    font-size: 15px;
                    color: #676767;
                    margin-left: 60px;
                    .head-li-a {
                        display: block;
                    }
                    .head-li-a:hover {
                        color: #479ceb;
                    }
                    .vip-ico {
                        // width: 23px;
                        height: 15px;
                    }
                }
                // li:hover .numselbox {
                //     display: block;
                // }
            }
        }
        .numselbox {
            width: 102px;
            // height: 93px;
            background: #327ecd; //rgba(0, 0, 0, 0.12);
            box-shadow: 0px 2px 5px 0px rgba(255, 255, 255, 0.12);
            float: right;
            position: absolute;
            top: 75px;
            left: -8px;
            display: none;
            z-index: 2;
            color: #fff;
            ul li {
                text-align: left;
                font-size: 12px;
                height: 27px;
                line-height: 27px;
                text-align: center;
                img {
                    width: 11px;
                    height: 11px;
                    margin: 0 10px -1px -10px;
                }
            }
            ul li a {
            }
            ul li:hover {
                background: #95bbe3;
            }
        }
    }
}
</style>



