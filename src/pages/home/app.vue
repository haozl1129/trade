<!--
@file: 主APP引入文件
-->
<template>
    <div id="app" class="home-main">
        <Header class="home-header" pageNmae="home"></Header>
        <!-- content-box -->
        <div class="white_W1200">
            <!-- <div class="breadcrumbsbox">
                <div class="breadcumbs">首页>用户中心><a href="#">会员中心</a></div>
                <div class="tiem-box">{{new Date()}}</div>
            </div> -->
            <div class="main-account">
                <Left v-show="isLeft"></Left>
                <AppMain class="main-box"></AppMain>
            </div>
        </div>
        <Footer pageNmae="home"></Footer>
        <RightFloat></RightFloat>
    </div>
</template>



<script>
import Left from '@/components/home/left';
import { AppMain, Footer, Header, RightFloat } from '@/components/layout/index';
import cookie from '@/util/cookie.js';
import config from '@/config/index.js';
import urls from '@/config/url_enum.js';
import { mapState, mapMutations, mapActions } from 'vuex';
const mixin = {
    computed: {
        ...mapState({})
    },
    methods: {
        ...mapMutations({ setUserStat: 'setUserStat' }),
        ...mapActions({
            getPersonalBase: 'getPersonalBase',
            getShopEntp: 'getShopEntp',
            getMessage: 'getMessage'
        })
    }
};

export default {
    components: {
        AppMain,
        Footer,
        Left,
        Header,
        RightFloat
    },
    props: {
        projectName: {
            type: String,
            default: ''
        }
    },
    mixins: [mixin],
    data() {
        return {
            userName: '',
            pathObj: {
                key: '',
                value: ''
            },
            isLeft: true
        };
    },
    watch: {
        $route(to, from) {
            if (from && from.name === 'login') {
                this.userName = cookie.getCookie('username');
            }
            // if (to.name === 'password') {
            //     this.isLeft = false;
            // } else {
            //     this.isLeft = true;
            // }
            document.documentElement.scrollTop = document.body.scrollTop = 0;
        }
    },
    computed: {},
    created() {
        // console.log('home page');
        const token = cookie.getCookie(config.tokenKey);
        if (!token) {
            window.top.location.href = location.origin + '/' + urls.login;
        } else {
            this.getShopEntp().then(res => {
                console.log('getShopEntp', res);
                if (res.code === 3) {
                    cookie.setCookie(config.userInfo, '');
                    cookie.setCookie(config.tokenKey, '');
                    setTimeout(() => {
                        location.reload();
                    }, 1000);
                    return;
                }
                if (res.obj) {
                    if (!res.obj.bizEntpInfo) {
                        this.$message({
                            message: '请先创建企业信息',
                            type: 'warning'
                        });
                        this.setUserStat(0);
                        this.$router.push({
                            path: '/company'
                        });
                    } else {
                        this.setUserStat(res.obj.bizEntpInfo.aprvStCd);
                    }
                }
            });
            // this.getPersonalBase();
            this.getMessage();
        }
    },
    methods: {}
};
</script>
<style lang="less">
@import '../../assets/css/index.less';
html {
    background-color: #f2f3f5;
}
h3 {
    // line-height: 77px;
    // font-weight: 400;
    // // border-bottom: 1px solid #e3e3e3;
    // margin-bottom: 30px;

    font-size: 16px;
    color: #222222;
    padding-left: 21px;
    padding-top: 24px;
}

.maintitle {
    font-size: 16px;
    color: #222222;
    padding-left: 21px;
    padding-top: 24px;
}
.home-main {
    height: 100%;
    background-color: #f2f3f5;
    .home-header {
        position: inherit;
    }
    .white_W1200 {
        background: none;
    }
    .breadcrumbsbox {
        margin-bottom: 5px;
    }
    .main-account {
        margin-top: 10px;
        .center();
        .flexalign(stretch);
        width: 100%;
        position: relative;
        .main-box {
            margin-left: 10px;
            flex-grow: 1;
            border-left: 0;
            background-color: #fff;
        }
    }
}
</style>