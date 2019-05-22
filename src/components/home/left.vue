<template>
    <div class="left-box">
        <div class="personalinfor">
            <div class="levelbox">
                <div class="personlevel">普通会员</div>
                <!-- || userImg -->
                <div class="personimg"><img :src=" getUser.avatar"></div>
            </div>
            <div class="membername">您好，<i>{{getUser.userName || getUser.phonenumber || (shopEntp.obj && shopEntp.obj.bizEntpInfo && shopEntp.obj.bizEntpInfo.entpNm)}}</i> ！</div>
            <div class="membericonbox">
                <div class="membericon" @click="onPath('/mobile')"><img src="../../assets/images/home/icon1.png"></div>
                <div class="membericon" @click="onPath('/upduser')"><img src="../../assets/images/home/icon2.png"></div>
                <div class="membericon" @click="onPath('/seting')"><img src="../../assets/images/home/icon3.png"></div>
                <div class="membericon" @click="onPath('/upduser')"><img src="../../assets/images/home/icon4.png"></div>
            </div>
            <div class="integralbox">我的积分 <i>0</i><span class="serviceinfor" @click="onOpenServiceFee()">服务费信息</span></div>
            <el-dialog title="服务费信息" :visible="feeDialog" @close="onClose" @open="onOpen" append-to-body>
                <servicefee></servicefee>
            </el-dialog>
        </div>
        <div class="sidebarmenubox">
            <div class="menulevelbox">
                <div class="menubox" @click="onUpDown('home')">
                    <div class="menunav"><img src="../../assets/images/home/icon5.png" class="navimg">账户管理</div>
                    <div class="menuarrow"><img :src="backs.home ? imgDottom : imgRight"></div>
                </div>
                <div class="secondmenu" v-show="backs.home">
                    <ul>
                        <li :class="{'fontblue': $route.name==='home'}" @click="goPath('/home')"><span class="disc"></span>账户总览</li>
                        <li :class="{'fontblue': $route.name==='company'}" @click="goPath('/company')"><span class="disc"></span>企业信息</li>
                        <!-- <li :class="{'fontblue': $route.name==='association'}" @click="goPath('/association')"><span class="disc"></span>账户关联</li> -->
                        <li :class="{'fontblue': $route.name==='seting'}" @click="goPath('/seting')"><span class="disc"></span>账户设置</li>
                        <li :class="{'fontblue': $route.name==='message'}" @click="goPath('/message')"><span class="disc"></span>消息中心</li>
                        <li :class="{'fontblue': $route.name==='share'}" @click="goPath('/share')"><span class="disc"></span>我要分享</li>
                    </ul>
                </div>
            </div>
            <div class="menulevelbox">
                <div class="menubox secondnavbox" @click="onUpDown('bill')">
                    <div class="menunav"><img src="../../assets/images/home/icon6.png" class="navimg">票据管理</div>
                    <div class="menuarrow"><img :src="backs.bill ? imgDottom : imgRight"></div>
                </div>
                <div class="secondmenu" v-show="backs.bill">
                    <ul>
                        <li :class="{'fontblue': $route.name==='release'}" @click="goPath('/release')"><span class="disc"></span>发布票据</li>
                        <li :class="{'fontblue': $route.name==='bill'}" @click="goPath('/bill')"><span class="disc"></span>我的票据</li>
                        <li :class="{'fontblue': $route.name==='order'}" @click="goPath('/order')"><span class="disc"></span>我的订单</li>
                    </ul>
                </div>
            </div>
            <div class="menulevelbox">
                <div class="menubox" @click="onUpDown('cash')">
                    <div class="menunav"><img src="../../assets/images/home/icon7.png" class="navimg">资金管理</div>
                    <div class="menuarrow"><img :src="backs.cash ? imgDottom : imgRight"></div>
                </div>
                <div class="secondmenu" v-show="backs.cash">
                    <ul>
                        <li :class="{'fontblue': $route.name==='cash'}" @click="goPath('/cash')"><span class="disc"></span>账户提现</li>
                        <li :class="{'fontblue': $route.name==='recharge'}" @click="goPath('/recharge')"><span class="disc"></span>账户充值</li>
                        <li :class="{'fontblue': $route.name==='record'}" @click="goPath('/record')"><span class="disc"></span>交易记录</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import config from '@/config/index';
import urls from '@/config/url_enum.js';
import servicefee from '../../pages/home/serviceFee.vue'
import { mapState } from 'vuex';
const mixin = {
    computed: {
        ...mapState({
            message: 'message',
            personalBase: 'personalBase',
            userStat: 'userStat',
            shopEntp: 'shopEntp'
        })
    },
    methods: {}
};

const imgDottom = require('../../assets/images/home/icon8.jpg');
const imgRight = require('../../assets/images/home/icon9.jpg');
const userImg = require('../../assets/images/home/personimg.png');

export default {
    mixins: [mixin],
    data() {
        return {
            userImg: userImg,
            currentPath: 'home',
            imgDottom: imgDottom,
            imgRight: imgRight,
            backs: {
                home: true,
                bill: true,
                cash: true
            },
            feeDialog:false
        };
    },
    mounted() {
        // console.log(config);
    },
    methods: {
        goPath(path) {
            console.log(this.userStat);
            if (this.userStat === 0 && path !== '/company') {
                this.$message({
                    message: '请先创建企业信息',
                    type: 'warning'
                });
                this.$router.push({
                    path: '/company'
                });
            } else if (this.userStat !== '5' && path === '/record') {
                this.$message({
                    message: '请先注册资金账号',
                    type: 'warning'
                });
            } else {
                this.$router.push({
                    path: path
                });
            }
        },
        goHref(key) {
            window.top.location.href = location.origin + '/' + urls[key];
        },
        onUpDown(path) {
            this.backs[path] = !this.backs[path];
        },
        onPath(path) {
            this.$router.push({
                path: path
            });
        },
        onOpenServiceFee(){

            // this.orderId = val.orderId;
            this.feeDialog = true;            
        },
        onClose() {
            this.feeDialog = false;
        },        
        onOpen() {
            this.feeDialog = true;
        },
    },
    computed: {
        getUser() {
            if (this.message && this.message.rows) {
                const userInfo = this.message.rows[0].user;
                return userInfo;
            }
            return {};
        }
    },
    components: {
        servicefee: servicefee,

    },
};
</script>

<style lang="less">
@import '../../assets/css/mixin.less';
.left-box {
    font-size: 0;
    min-height: 1113px;
    .personalinfor {
        width: 220px;
        // height: 231px;
        background: #fff;
        padding-bottom: 10px;
    }
    .levelbox {
        padding-top: 20px;
        display: flex;
        flex-direction: row;
    }
    .personlevel {
        width: 66px;
        height: 28px;
        background: #479ceb;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        font-size: 12px;
        color: #fff;
        text-align: center;
        line-height: 28px;
    }
    .personimg {
        width: 69px;
        height: 69px;
        border-radius: 50%;
        margin-left: 9px;
    }
    .personimg img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
    }
    .membername {
        font-size: 14px;
        color: #484e5d;
        text-align: center;
        margin-top: 12px;
    }
    .membername i {
        font-style: normal;
        color: #479ceb;
    }
    .membericonbox {
        margin-left: 32px;
        margin-top: 20px;
        display: flex;
        flex-direction: row;
    }
    .membericon {
        width: 34px;
        height: 33px;
        margin-right: 6px;
        float: left;
    }
    .integralbox {
        margin-left: 33px;
        margin-top: 21px;
        font-size: 12px;
        color: #666666;
    }
    .integralbox i {
        font-style: normal;
        color: #fa7906;
    }
    .serviceinfor {
        display: inline-block;
        color: #2196f3;
        margin-left: 36px;
        text-decoration: underline;
        cursor:hand;
        cursor: pointer;
    }
    .sidebarmenubox {
        width: 220px;
        // height: 437px;
        background: #fff;
        margin-top: 10px;
        padding-top: 20px;
        padding-bottom: 30px;
    }
    .menubox {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        padding-left: 28px;
        cursor: pointer;
    }
    .menunav {
        font-size: 14px;
        color: #888888;
    }
    .navimg {
        position: relative;
        top: 2px;
        margin-right: 10px;
    }
    .menuarrow {
        margin-right: 26px;
        .center();
    }
    .secondmenu {
        margin-bottom: 30px;
        ul {
            li {
                font-size: 14px;
                color: #222222;
                height: 32px;
                line-height: 32px;
                text-align: center;
                &.fontblue {
                    color: #479ceb;
                    background: #e7f4fe;
                    .disc {
                        background: #2196f3;
                    }
                }
                &:hover {
                    cursor: pointer;
                    color: #479ceb;
                    background: #e7f4fe;
                    .disc {
                        background: #2196f3;
                    }
                }
                .disc {
                    width: 4px;
                    height: 4px;
                    border-radius: 50%;
                    background: #ccc;
                    display: inline-block;
                    position: relative;
                    right: 10px;
                    top: -3px;
                }
            }
        }
    }
    .secondnavbox {
        margin-bottom: 20px;
    }
    .secondmenu {
    }
}
</style>


