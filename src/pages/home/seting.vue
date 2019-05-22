<template>
    <div class="seting-main">
        <div class="usernamebox">{{shopEntp.obj && shopEntp.obj.bizEntpInfo && shopEntp.obj.bizEntpInfo.entpNm}}<span class="usertips">建议您启动全部安全设置，以保障账户安全</span></div>
        <div class="personalbox">
            <div class="userinfor">
                <div class="usericon"><img src="../../assets/images/home/icon28.png"></div>
                <div class="username">用户信息</div>
                <div class="name">{{shopEntp.obj && shopEntp.obj.bizEntpInfo && shopEntp.obj.bizEntpInfo.entpNm}}</div>
            </div>
            <div class="amend" @click="onPath('/upduser')">修改　></div>
        </div>
        <div class="personalbox">
            <div class="userinfor">
                <div class="usericon"><img src="../../assets/images/home/icon29.png"></div>
                <div class="username">登录密码</div>
                <div class="name blueset">已设置</div>
            </div>
            <div class="amend" @click="onPath('/password')">修改　></div>
        </div>
        <div class="personalbox">
            <div class="userinfor">
                <div class="usericon"><img src="../../assets/images/home/icon29.png"></div>
                <div class="username">交易密码</div>
                <div class="name blueset">已设置</div>
                <span class="explain-ctx">点击修改按钮跳转到齐商银行系统进行修改</span>
            </div>
            <div class="amend" @click="onHref">修改　></div>
        </div>
        <!-- <div class="personalbox">
            <div class="userinfor">
                <div class="usericon"><img src="../../assets/images/home/icon30.png"></div>
                <div class="username">签约认证</div>
                <div class="name gray_approve">未认证</div>
            </div>
            <div class="amend orange_approve">认证　></div>
        </div> -->
        <div class="personalbox">
            <div class="userinfor">
                <div class="usericon"><img src="../../assets/images/home/icon31.png"></div>
                <div class="username">手机认证</div>
                <div class="name">已认证</div>
            </div>
            <div class="amend" @click="onPath('/mobile')">修改　></div>
        </div>
        <!-- <div class="accountsafebox">账户安全设置</div>
        <div class="accountbox">
            <ul>
                <li>
                    <div class="account_username">
                        <span class="accountnametitle">用户名：</span>
                        <span class="accountnametitle account_name">dlgjdfigjdl</span>
                    </div>
                    <div class="amendbtn">修改</div>
                </li>
                <li>
                    <div class="account_username">
                        <span class="accountnametitle">登录密码：</span>
                        <span class="accountnametitle account_name namebluecolor">已设置</span>
                    </div>
                    <div class="amendbtn amendbluebg" @click="onPath">修改</div>
                </li>
                <li>
                    <div class="account_username">
                        <span class="accountnametitle">交易密码：</span>
                        <span class="accountnametitle account_name graycolor">已设置</span>
                    </div>
                    <div class="amendbtn amendbluebg">修改</div>
                </li>
                <li>
                    <div class="account_username">
                        <span class="accountnametitle">签约认证：</span>
                        <span class="accountnametitle account_name graycolor">未认证</span>
                    </div>
                    <div class="amendbtn amendbluebg">修改</div>
                </li>
                <li>
                    <div class="account_username">
                        <span class="accountnametitle">手机认证：</span>
                        <span class="accountnametitle account_name graycolor">已认证</span>
                    </div>
                    <div class="amendbtn amendbluebg">修改</div>
                </li>
            </ul>
        </div> -->
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
const mixin = {
    computed: {
        ...mapState({
            shopEntp: 'shopEntp'
        })
    },
    methods: {
        ...mapMutations({}),
        ...mapActions({
           // getWithdrawal: 'getWithdrawal',
            getChangeTradePswd:'getChangeTradePswd'
        })
    }
};
export default {
    mixins: [mixin],
    data() {
        return {
            input4: '',
            inpu: '',
            radio: '',
            value1: '',
            input5: '',
            checkList: []
        };
    },
    mounted() {},
    methods: {
        onPath(path) {
            this.$router.push({
                path: path
            });
        },
        onHref() {
            this.getChangeTradePswd().then(res => {
                window.open(res.msg);
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
.seting-main {
    .usernamebox {
        height: 78px;
        background: #f8f8f8;
        font-size: 20px;
        color: #484e5d;
        padding-left: 32px;
        line-height: 78px;
        border-bottom: 1px solid #e6e6e6;
    }
    .usertips {
        display: inline-block;
        font-size: 14px;
        color: #828282;
        margin-left: 22px;
    }
    .personalbox {
        width: 100%;
        height: 69px;
        border-bottom: 1px solid #e6e6e6;
        line-height: 69px;
        display: flex;
        justify-content: space-between;
    }
    .userinfor {
        padding-left: 31px;
        display: flex;
        flex-direction: row;
    }
    .usericon {
        margin-top: 3px;
    }
    .username {
        font-size: 14px;
        color: #666666;
        margin-left: 19px;
    }
    .explain-ctx {
        color: #666666;
        padding-left: 20px;
        font-size: 12px;
    }
    .name {
        font-size: 14px;
        color: #222222;
        margin-left: 83px;
    }
    .amend {
        font-size: 14px;
        color: #222222;
        margin-right: 24px;
        cursor: pointer;
    }
    .blueset {
        color: #479ceb;
    }
    .gray_approve {
        color: #888888;
    }
    .orange_approve {
        color: #fe8617;
    }
}
</style>
