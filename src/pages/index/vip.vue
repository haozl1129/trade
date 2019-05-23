<template>
    <div class="vip-main">
        <div class="membersbanner">
            <div class="vip"><img src="../../assets/images/index_new/icon59.png"></div>
            <div class="vipbox">
                <div class="personvipbox">
                    <div class="leftperson">
                        <div class="vipimg"><img src="../../assets/images/index_new/personimg.png"></div>
                        <div class="vipnamebox">
                            <div class="vipinfor">
                                <span class="vipname">您好，<i> {{shopEntp.obj && shopEntp.obj.bizEntpInfo && shopEntp.obj.bizEntpInfo.entpNm}}！</i></span>
                                <span class="viplevel">尊贵会员</span>
                                <span class="viptel"><img src="../../assets/images/index_new/icon60.png">{{mobile}}</span>
                            </div>
                            <div class="inforbox">
                                <span class="mineinfor bluepassword" @click="onPath('password', false)">密码修改</span>
                                <span class="mineinfor" @click="onPath('order', false)">我的订单</span>
                                <span class="mineinfor" @click="onPath('bill', false)">我的票据</span>
                            </div>
                        </div>
                    </div>
                    <div class="vipbtnbox">
                        <span class="widthdrawalbtn topupbtn" @click="onPath('recharge', false)">充值</span>
                        <span class="widthdrawalbtn" @click="onPath('cash', false)">提现</span>
                    </div>
                </div>
                <div class="vipinforbox">
                    <div class="tradingmoney">
                        <div class="vipmoney">{{balance.obj.freezeBalance || 0}}</div>
                        <div class="viptrading">交易中金额</div>
                    </div>
                    <div class="vipline"></div>
                    <div class="tradingmoney">
                        <div class="vipmoney">2</div>
                        <div class="viptrading">交易中订单</div>
                    </div>
                    <div class="vipline"></div>
                    <div class="tradingmoney">
                        <div class="vipmoney">{{balance.obj.falsify || 0}}</div>
                        <div class="viptrading">交易违约金</div>
                    </div>
                    <div class="vipline"></div>
                    <div class="tradingmoney">
                        <div class="vipmoney orangermoney">{{balance.obj.useBalance || 0}}</div>
                        <div class="viptrading">可用余额</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="servicelist clear">
            <div class="servicebox">
                <div class="serviceimg"><img src="../../assets/images/index_new/img4.jpg"></div>
                <div class="servicetitle">票据信息服务</div>
                <div class="telbox">
                    <ul>
                        <li><span class="wechat">微信</span>Cindy</li>
                        <li><span class="wechat">手机号</span>15839208900</li>
                        <li><span class="wechat">QQ</span>37222889</li>
                    </ul>
                </div>
                <div class="customerbtn">联系客服</div>
            </div>
            <div class="servicebox">
                <div class="serviceimg"><img src="../../assets/images/index_new/img4.jpg"></div>
                <div class="servicetitle">票据信息服务</div>
                <div class="telbox">
                    <ul>
                        <li><span class="wechat">微信</span>Cindy</li>
                        <li><span class="wechat">手机号</span>15839208900</li>
                        <li><span class="wechat">QQ</span>37222889</li>
                    </ul>
                </div>
                <div class="customerbtn">联系客服</div>
            </div>
            <div class="servicebox">
                <div class="serviceimg"><img src="../../assets/images/index_new/img4.jpg"></div>
                <div class="servicetitle">票据信息服务</div>
                <div class="telbox">
                    <ul>
                        <li><span class="wechat">微信</span>Cindy</li>
                        <li><span class="wechat">手机号</span>15839208900</li>
                        <li><span class="wechat">QQ</span>37222889</li>
                    </ul>
                </div>
                <div class="customerbtn">联系客服</div>
            </div>
            <div class="servicebox">
                <div class="serviceimg"><img src="../../assets/images/index_new/img4.jpg"></div>
                <div class="servicetitle">票据信息服务</div>
                <div class="telbox">
                    <ul>
                        <li><span class="wechat">微信</span>Cindy</li>
                        <li><span class="wechat">手机号</span>15839208900</li>
                        <li><span class="wechat">QQ</span>37222889</li>
                    </ul>
                </div>
                <div class="customerbtn">联系客服</div>
            </div>
            <div class="servicebox">
                <div class="serviceimg"><img src="../../assets/images/index_new/img4.jpg"></div>
                <div class="servicetitle">票据信息服务</div>
                <div class="telbox">
                    <ul>
                        <li><span class="wechat">微信</span>Cindy</li>
                        <li><span class="wechat">手机号</span>15839208900</li>
                        <li><span class="wechat">QQ</span>37222889</li>
                    </ul>
                </div>
                <div class="customerbtn">联系客服</div>
            </div>
            <div class="servicebox">
                <div class="serviceimg"><img src="../../assets/images/index_new/img4.jpg"></div>
                <div class="servicetitle">票据信息服务</div>
                <div class="telbox">
                    <ul>
                        <li><span class="wechat">微信</span>Cindy</li>
                        <li><span class="wechat">手机号</span>15839208900</li>
                        <li><span class="wechat">QQ</span>37222889</li>
                    </ul>
                </div>
                <div class="customerbtn">联系客服</div>
            </div>
        </div>
        <div class="v-modal-cxt" v-if="!isLogin">请先登录</div>
        <div class="v-modal" tabindex="0" style="z-index: 2001;" v-if="!isLogin"></div>
    </div>
</template>
<script>
import cookie from '@/util/cookie.js';
import config from '@/config/index.js';
import baseMixin from '@/mixin/base.js';
import { mapState, mapMutations, mapActions } from 'vuex';
const mixin = {
    computed: {
        ...mapState({
            isLogin: 'isLogin',
            balance: 'balance',
            shopEntp: 'shopEntp'
        })
    },
    methods: {
        ...mapMutations({}),
        ...mapActions({
            getShopEntp: 'getShopEntp',
            getBalance: 'getBalance'
        })
    }
};
export default {
    mixins: [mixin, baseMixin],
    data() {
        return {
            mobile: ''
        };
    },
    mounted() {
        console.log('this.isLogin', this.isLogin);
        if (this.isLogin) {
            this.getBalance();
            this.getShopEntp();
            this.mobile = cookie.getCookie(config.userInfo);
        }
    },
    methods: {},
    watch: {
        // isLogin(to, from) {
        //         if(to) {
        //         location.href = location.origin + '/' + urls.login
        //         }
        // }
    },
    computed: {},
    components: {}
};
</script>
<style lang="less">
@import '../../assets/css/mixin.less';
.vip-main {
    position: relative;
    .membersbanner {
        width: 100%;
        height: 496px;
        background: url(../../assets/images/index_new/banner2.png) no-repeat;
        background-size: auto 100%;
        background-position: center;
    }
    .vip {
        width: 565px;
        margin: 0 auto;
        padding-top: 85px;
    }
    .vipbox {
        width: 828px;
        height: 184px;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 150px;
        margin: 0 auto;
        margin-top: 21px;
    }
    .personvipbox {
        display: flex;
        justify-content: space-between;
        position: relative;
    }
    .vipimg {
        width: 69px;
        height: 69px;
        border-radius: 50%;
        margin-top: 10px;
    }
    .leftperson {
        display: flex;
        flex-direction: row;
        margin-left: 117px;
    }
    .vipnamebox {
        margin-left: 16px;
    }
    .vipname {
        font-size: 14px;
        color: #484e5d;
        display: inline-block;
        margin-right: 18px;
    }
    .vipinfor {
        padding-top: 16px;
        white-space: nowrap;
    }
    .vipname i {
        color: #479ceb;
        font-style: normal;
    }
    .viplevel {
        font-size: 14px;
        color: #ff7c00;
        margin-right: 18px;
        display: inline-block;
        font-weight: bold;
    }
    .viptel {
        display: inline-block;
        font-size: 15px;
        color: #666666;
    }
    .mineinfor {
        display: inline-block;
        font-size: 12px;
        color: #666666;
        padding: 3px 12px;
        margin-right: 10px;
        margin-top: 9px;
        border: 1px solid #858585;
        border-radius: 30px;
        cursor: pointer;
    }
    .bluepassword {
        color: #479ceb;
        border: 1px solid #479ceb;
    }
    .vipbtnbox {
        right: 86px;
        top: 45px;
        position: absolute;
    }
    .widthdrawalbtn {
        width: 68px;
        height: 31px;
        border: 1px solid #fe8617;
        border-radius: 4px;
        text-align: center;
        line-height: 31px;
        font-size: 14px;
        color: #fe8617;
        display: inline-block;
        cursor: pointer;
    }
    .topupbtn {
        background: #fe8617;
        color: #fff;
        margin-right: 16px;
    }
    .vipinforbox {
        display: flex;
        flex-direction: row;
        margin-left: 69px;
        margin-top: 20px;
    }
    .tradingmoney {
        width: 169px;
    }
    .vipmoney {
        font-size: 24px;
        color: #222222;
        text-align: center;
    }
    .viptrading {
        font-size: 14px;
        color: #666666;
        text-align: center;
        margin-top: 6px;
    }
    .vipline {
        width: 1px;
        height: 50px;
        background: #b4b4b4;
        margin-top: 3px;
    }
    .orangermoney {
        color: #fe8617;
        font-weight: 400;
    }
    .servicelist {
        width: 1160px;
        margin: 0 auto;
        margin-top: 10px;
        background: #fff;
        padding-top: 60px;
        padding-left: 79px;
    }
    .servicebox {
        width: 300px;
        height: 381px;
        background: #479ceb;
        border-radius: 6px;
        margin-top: 52px;
        position: relative;
        float: left;
        margin-right: 53px;
        margin-bottom: 55px;
    }
    .serviceimg {
        width: 112px;
        height: 112px;
        border-radius: 50%;
        margin: 0 auto;
        border: 7px solid #fff;
        position: absolute;
        top: -61px;
        left: 27%;
    }
    .serviceimg img {
        border-radius: 50%;
    }
    .servicetitle {
        font-size: 22px;
        color: #fff;
        text-align: center;
        padding-top: 86px;
    }
    .telbox {
        width: 260px;
        height: 156px;
        background: rgba(255, 255, 255, 0.9);
        margin: 0 auto;
        margin-top: 17px;
        border-radius: 6px;
        padding-top: 12px;
    }
    .telbox ul li {
        padding-left: 51px;
        font-size: 16px;
        color: #0a3d6d;
        line-height: 48px;
    }
    .telbox ul li .wechat {
        font-size: 14px;
        color: #053c6e;
        width: 45px;
        margin-right: 25px;
        display: inline-block;
        opacity: 0.7;
        font-weight: 400;
    }
    .customerbtn {
        width: 260px;
        height: 42px;
        background: #fff;
        color: #0a3d6d;
        font-size: 18px;
        text-align: center;
        line-height: 42px;
        border-radius: 30px;
        margin: 0 auto;
        margin-top: 20px;
    }
    .v-modal-cxt {
        z-index: 2004;
        color: #fff;
        position: absolute;
        left: 0;
        top: 200px;
        right: 0;
        bottom: 0;
        padding: 0;
        text-align: center;
        font-size: 26px;
    }
    .v-modal {
        position: absolute;
    }
}
</style>
