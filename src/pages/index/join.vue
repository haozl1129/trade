<template>
    <div class="join-main">
        <!--右点-->
        <div class="circle">
            <ul>
                <li></li>
                <li></li>
                <li class="bigcircle"></li>
            </ul>
        </div>
        <div class="groupbg">
            <div class="grouttitle"><img src="../../assets/images/index_new/img5.png"></div>
            <div class="groupservice">
                <dl>
                    <dt><img src="../../assets/images/index_new/icon65.png"></dt>
                    <dd class="service_tit">票据信息服务</dd>
                    <dd>撮合交易</dd>
                    <dd>直贴</dd>
                    <dd>承销</dd>
                </dl>
                <dl>
                    <dt><img src="../../assets/images/index_new/icon70.png"></dt>
                    <dd class="service_tit">票据池</dd>
                    <dd>银票代持</dd>
                    <dd>商票代持</dd>
                    <dd>财司票代持</dd>
                </dl>
                <dl>
                    <dt><img src="../../assets/images/index_new/icon61.png"></dt>
                    <dd class="service_tit">保理服务</dd>
                    <dd>ABS保理</dd>
                    <dd>金融保理</dd>
                    <dd>商务保理</dd>
                </dl>
                <dl>
                    <dt><img src="../../assets/images/index_new/icon63.png"></dt>
                    <dd class="service_tit">基金</dd>
                    <dd>股权投资基金</dd>
                    <dd>定向增发基金</dd>
                    <dd>专项投资基金</dd>
                    <dd>政府引导基金</dd>
                    <dd>并购基金</dd>
                    <dd>股票理财型基金</dd>
                </dl>
                <dl>
                    <dt><img src="../../assets/images/index_new/icon62.png"></dt>
                    <dd class="service_tit">企业服务</dd>
                    <dd>财务顾问</dd>
                    <dd>上市辅导</dd>
                    <dd>市值管理</dd>
                    <dd>海内外并购</dd>
                </dl>
                <dl>
                    <dt><img src="../../assets/images/index_new/icon64.png"></dt>
                    <dd class="service_tit">信息化服务</dd>
                    <dd>信息化咨询</dd>
                    <dd>ERP/MES/WMS</dd>
                    <dd>BARCODE</dd>
                    <dd>APP</dd>
                    <dd>个性化定制</dd>
                </dl>
            </div>
        </div>
        <div class="secondbluebg">
            <div class="groupname">合作模式</div>
            <div class="groupname mode">Cooperation mode</div>
            <div class="groupname institutions">愿与各界机构、团体与企业携手并进,共创共赢。</div>
            <div class="modebox">
                <dl>
                    <dt><img src="../../assets/images/index_new/icon69.png"></dt>
                    <dd>战略合作</dd>
                </dl>
                <dl>
                    <dt><img src="../../assets/images/index_new/icon66.png"></dt>
                    <dd>代理合作</dd>
                </dl>
                <dl>
                    <dt><img src="../../assets/images/index_new/icon68.png"></dt>
                    <dd>区域加盟</dd>
                </dl>
                <dl>
                    <dt><img src="../../assets/images/index_new/icon67.png"></dt>
                    <dd>媒体合作</dd>
                </dl>
            </div>
        </div>
        <div class="applicationbg">
            <div class="applicationtitle">合作申请</div>
            <div class="english_title">Cooperative application</div>
            <div class="main_application">
                <div class="mustsel">＊为必填</div>
                <div class="appli_box">
                    <div class="application">
                        <div class="companyname">单位名称</div>
                        <div class="appli_input">
                            <input type="text" v-model="formData.cpyName" />
                        </div>
                        <div class="star">＊</div>
                    </div>
                    <div class="application">
                        <div class="companyname">单位详细地址</div>
                        <div class="appli_input">
                            <input type="text" v-model="formData.realAddress" />
                        </div>
                        <div class="star">＊</div>
                    </div>
                </div>
                <div class="appli_box">
                    <div class="application">
                        <div class="companyname">联系人姓名</div>
                        <div class="appli_input">
                            <input type="text" v-model="formData.name" />
                        </div>
                        <div class="star">＊</div>
                    </div>
                    <div class="application">
                        <div class="companyname">联系电话</div>
                        <div class="appli_input">
                            <input type="text" v-model="formData.phone" />
                        </div>
                        <div class="star">＊</div>
                    </div>
                </div>
                <div class="appli_box">
                    <div class="application">
                        <div class="companyname">办公电话</div>
                        <div class="appli_input">
                            <input type="text" v-model="formData.cpyPhone" />
                        </div>
                    </div>
                    <div class="application">
                        <div class="companyname">电子邮箱</div>
                        <div class="appli_input">
                            <input type="text" v-model="formData.email" />
                        </div>
                        <div class="star" style="visibility:hidden;">＊</div>
                    </div>
                </div>
                <div class="qwbtn">
                    <div class="qw_title">选择期望合作方式</div>
                    <div class="appli_btn" :class="{'blue_applibtn': formData.cooWay === 0}" @click="onCooWay(0)">战略合作</div>
                    <div class="appli_btn" :class="{'blue_applibtn': formData.cooWay === 1}" @click="onCooWay(1)">代理合作</div>
                    <div class="appli_btn" :class="{'blue_applibtn': formData.cooWay === 2}" @click="onCooWay(2)">区域加盟</div>
                    <div class="appli_btn" :class="{'blue_applibtn': formData.cooWay === 3}" @click="onCooWay(3)">媒体合作</div>
                </div>
                <div class="submitbtn" @click="onSubmit">提交</div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
const mixin = {
    computed: {
        ...mapState({})
    },
    methods: {
        ...mapMutations({}),
        ...mapActions({
            postPartadd: 'postPartadd'
        })
    }
};
// cpyName：单位名称
// realAddress：单位详细地址
// name：联系人姓名
// phone：联系电话
// cpyPhone：办公电话
// email：电子邮箱
// cooWay：合作方式 0：战略合作 1：代理合作 2：区域加盟 3：媒体合作
const tempData = {
    cpyName: '',
    realAddress: '',
    name: '',
    phone: '',
    cpyPhone: '',
    email: '',
    cooWay: 0
};
export default {
    mixins: [mixin],
    data() {
        return {
            formData: {
                ...tempData
            }
        };
    },
    mounted() {},
    methods: {
        onSubmit() {
            let msg = '';
            if (!this.formData.cpyName) {
                msg = '请输入单位名称';
            } else if (!this.formData.realAddress) {
                msg = '请输入单位详细地址';
            } else if (!this.formData.name) {
                msg = '请输入联系人姓名';
            } else if (!this.formData.phone) {
                msg = '请输入联系电话';
            }
            if (msg) {
                this.$message({
                    showClose: true,
                    message: msg,
                    type: 'error'
                });
                return false;
            }
            this.postPartadd(this.formData).then(res => {
                if (res.code === 0) {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    });
                    this.formData = { ...tempData };
                }
            });
        },
        onCooWay(param) {
            this.formData.cooWay = param;
        }
    },
    computed: {},
    components: {}
};
</script>
<style lang="less">
@import '../../assets/css/mixin.less';
.join-main {
    background: #fff;
    .groupbg {
        width: 100%;
        height: 600px;
        background: url(../../assets/images/index_new/img6.jpg) no-repeat;
        background-size: auto 100%;
        background-position: center;
    }
    .grouttitle {
        width: 435px;
        height: 112px;
        margin: 0 auto;
        padding-top: 58px;
    }
    .groupservice {
        margin-top: 90px;
        .center();
        .flexalign(flex-start);
    }
    .groupservice dl {
        width: 123px;
        float: left;
        margin-right: 60px;
    }
    .groupservice dl:nth-last-child(1) {
        margin-right: 0px;
    }
    .groupservice dl dt {
        width: 123px;
        height: 138px;
        margin: 0 auto;
    }
    .groupservice dl dd {
        text-align: center;
        font-size: 14px;
        color: #393939;
        line-height: 24px;
    }
    .groupservice dl .service_tit {
        font-size: 18px;
        color: #000000;
        margin: 21px 0px;
    }
    .secondbluebg {
        width: 100%;
        height: 537px;
        background: #479ceb;
        position: relative;
        top: -21px;
        padding-top: 63px;
    }
    .groupname {
        text-align: center;
        color: #fff;
        font-size: 30px;
    }
    .mode {
        font-size: 16px;
        margin-top: 18px;
    }
    .institutions {
        font-size: 14px;
        color: #fff;
        margin-top: 18px;
    }
    .modebox {
        .center();
    }
    .modebox dl {
        width: 233px;
        height: 216px;
        border-radius: 6px;
        background: rgba(255, 255, 255, 0.9);
        margin-top: 105px;
        // float: left;
        margin-right: 48px;
        display: inline-block;
    }
    .modebox dl:nth-last-child(1) {
        margin-right: 0px;
    }
    .modebox dl dt {
        width: 93px;
        height: 68px;
        margin: 0 auto;
        margin-top: 48px;
    }
    .modebox dl dd {
        font-size: 24px;
        color: #666666;
        margin-top: 29px;
        text-align: center;
    }
    .applicationbg {
        height: 614px;
        background: #fff;
    }
    .applicationtitle {
        text-align: center;
        font-size: 30px;
        color: #222222;
        margin-top: 24px;
    }
    .english_title {
        font-size: 16px;
        color: #222222;
        text-align: center;
        margin-top: 10px;
        opacity: 0.5;
    }
    .main_application {
        width: 80%;
        margin: 0 auto;
    }
    .mustsel {
        font-size: 14px;
        color: #ff0000;
        text-align: right;
        padding-right: 34px;
    }
    .appli_box {
        display: flex;
        justify-content: space-between;
        height: 40px;
        margin-top: 31px;
    }
    .companyname {
        width: 96px;
        display: inline-block;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        color: #888888;
        margin-right: 12px;
    }
    .appli_input {
        width: 376px;
        height: 38px;
        border: 1px solid #c7c7c7;
        display: inline-block;
        input {
            width: 100%;
            height: 100%;
            padding: 0 10px;
        }
    }
    .star {
        font-size: 16px;
        color: #ff0000;
        display: inline-block;
        line-height: 40px;
        margin-left: 6px;
    }
    .application {
        display: flex;
        flex-direction: row;
    }
    .application:nth-child(odd) {
        margin-left: 0px;
    }
    .qwbtn {
        display: flex;
        flex-direction: row;
    }
    .qw_title {
        font-size: 16px;
        color: #888888;
        margin-top: 27px;
    }
    .appli_btn {
        font-size: 16px;
        color: #666666;
        height: 30px;
        line-height: 29px;
        border: 1px solid #c7c7c7;
        border-radius: 20px;
        text-align: center;
        margin-left: 26px;
        padding: 0px 15px;
        margin-top: 23px;
        cursor: pointer;
    }
    .blue_applibtn {
        background: #479ceb;
        color: #fff;
        border: 0px;
    }
    .submitbtn {
        width: 163px;
        height: 52px;
        background: #fe8617;
        text-align: center;
        line-height: 52px;
        font-size: 18px;
        color: #fff;
        margin: 0 auto;
        border-radius: 30px;
        margin-top: 58px;
        cursor: pointer;
        &:hover {
            border: 1px solid #fe8617;
            background: #fff;
            color: #fe8617;
        }
    }
    .circle {
        position: absolute;
        right: 30px;
        top: 50%;
        text-align: center;
    }
    .circle ul li {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #cccccc;
        margin: 10px auto;
    }
    .circle .bigcircle {
        width: 10px;
        height: 10px;
        border: 1px solid #fe8617;
        background: #fff;
    }
}
</style>
