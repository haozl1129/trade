/* eslint-disable no-unused-vars */
<template>
  <div class="company-box">
    <h3>企业信息</h3>
    <div class="companybox">
      <div class="companytitle">企业名称</div>
      <div class="companyinput">
        <el-input :disabled="isDisabled" class placeholder size="small" v-model="formData.entpNm"></el-input>
      </div>
    </div>
    <div class="companybox">
      <div class="companytitle">社会信用证代码</div>
      <div class="companyinput">
        <el-input :disabled="isDisabled" class placeholder size="small" v-model="formData.crdtNo"></el-input>
      </div>
    </div>
    <div class="companybox">
      <div class="companytitle">企业邮箱</div>
      <div class="companyinput">
        <el-input :disabled="isDisabled" class placeholder size="small" v-model="formData.eMAIL"></el-input>
      </div>
    </div>
    <div class="companybox">
      <div class="companytitle">企业地址</div>
      <div class="companyinput">
        <el-input :disabled="isDisabled" class placeholder size="small" v-model="formData.aDR"></el-input>
      </div>
    </div>
    <div class="companybox">
      <div class="companytitle">法定代表人</div>
      <div class="companyinput">
        <el-input :disabled="isDisabled" class placeholder size="small" v-model="formData.expdId3"></el-input>
      </div>
    </div>
    <div class="companybox">
      <div class="companytitle">法定代表人身份证号</div>
      <div class="companyinput">
        <el-input :disabled="isDisabled" class placeholder size="small" v-model="formData.frCrdtNo"></el-input>
      </div>
    </div>
    <div class="companybox">
      <div class="companytitle idcard">身份证正面</div>
      <div class="idimg">
        <el-upload
          :action="uploadUrl"
          :disabled="isDisabled"
          :on-error="onError"
          :on-success="onSuccessCardFace"
          :show-file-list="false"
          class="upload-demo"
          drag
          multiple
          name="file"
        >
          <img :src="this.formData.idCardFace" v-if="this.formData.idCardFace">
          <div v-else>
            <div class="cameraicon">
              <img src="../../assets/images/home/icon18.png">
            </div>
            <div class="idfont">点击上传身份证正面</div>
          </div>
        </el-upload>
      </div>
      <div class="idcardtip">支持jpg、jpeg、png、bmp格式的图片，图片大小不能超过2M</div>
    </div>
    <div class="companybox">
      <div class="companytitle idcard">身份证反面</div>
      <div class="idimg">
        <el-upload
          :action="uploadUrl"
          :on-error="onError"
          :on-success="onSuccessCardBack"
          :show-file-list="false"
          class="upload-demo"
          drag
          multiple
          name="file"
        >
          <img :src="this.formData.idCardBack" v-if="this.formData.idCardBack">
          <div v-else>
            <div class="cameraicon">
              <img src="../../assets/images/home/icon18.png">
            </div>
            <div class="idfont">点击上传身份证正面</div>
          </div>
        </el-upload>
      </div>
      <div class="idcardtip">支持jpg、jpeg、png、bmp格式的图片，图片大小不能超过2M</div>
    </div>
    <div class="companybox">
      <div class="companytitle idcard">营业执照上传</div>
      <div class="idimg">
        <el-upload
          :action="uploadUrl"
          :on-error="onError"
          :on-success="onSuccessBsnLcnsPic"
          :show-file-list="false"
          class="upload-demo"
          drag
          multiple
          name="file"
        >
          <img :src="this.formData.bsnLcnsPic" v-if="this.formData.bsnLcnsPic">
          <div v-else>
            <div class="cameraicon">
              <img src="../../assets/images/home/icon18.png">
            </div>
            <div class="idfont">点击营业执照上传</div>
          </div>
        </el-upload>
      </div>
      <div class="idcardtip">支持jpg、jpeg、png、bmp格式的图片，图片大小不能超过2M</div>
    </div>
    <div class="companybox">
      <div class="companytitle">经办人名称</div>
      <div class="companyinput">
        <el-input
          :disabled="isDisabled"
          class
          placeholder
          size="small"
          v-model="formData.operatorName"
        ></el-input>
      </div>
    </div>
    <div class="companybox">
      <div class="companytitle">经办人证件号</div>
      <div class="companyinput">
        <el-input
          :disabled="isDisabled"
          class
          placeholder
          size="small"
          v-model="formData.operatorCrdtNo"
        ></el-input>
      </div>
    </div>
    <div class="companybox">
      <div class="companytitle">经办人手机号</div>
      <div class="companyinput">
        <el-input
          :disabled="isDisabled"
          class
          placeholder
          size="small"
          v-model="formData.operatorPhone"
        ></el-input>
      </div>
    </div>
    <div class="companybox">
      <span class="companylast" v-if="aprvStCd == 2">审批中</span>
      <span class="companylast" v-if="aprvStCd == 3">审批不通过: {{aprvOpn}}</span>
      <span class="companylast" v-if="aprvStCd == 1">审批通过</span>
      <div class="companylast" v-if="aprvStCd == 4">已注册</div>
      <div class="removebind" v-if="aprvStCd == 5">
        <span class="companylast">已绑定</span>
        <button @click="unBinding()" class="remove">解除绑定对公账号</button>
      </div>
    </div>
    <div class="prompt">温馨提示：开通账户资金后，绑定的对公结算账户将作为票据背书的结算账户。</div>
    <div class="companybox" v-if="openUrl">
      <div class="companytitle">非IE浏览器复制</div>
      <div class="companyinput">
        <el-input class placeholder ref="openurl" size="small" v-model="openUrl"></el-input>
        <el-button @click="onCopy" size="small">复制</el-button>
      </div>
    </div>
    <div class="tj_btnbox">
      <a @click="onSubmit()" class="submitbtn" v-if="!isDisabled">提交</a>
      <a @click="onTrusteeship" class="paynumberbtn" v-if="aprvStCd == 1">开通资金账号</a>
      <a @click="onBinding" class="paynumberbtn settlementbtn" v-if="aprvStCd == 4">绑定结算账户</a>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import config from '@/config/index.js';
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
            postShopAdd: 'postShopAdd',
            getShopEntp: 'getShopEntp',
            postTrusteeship: 'postTrusteeship',
            postBinding: 'postBinding',
            getIsAprv: 'getIsAprv',
            getUnBinding: 'getUnBinding'
        })
    }
};
// 上传接口 (config.serverHost ? 'trade' : '') +
const uploadUrl = '/common/upload';
export default {
    mixins: [mixin],
    data() {
        return {
            uploadUrl: uploadUrl,
            updateData: {
                action: 'uploadimage'
            },
            openUrl: '', // 返回跳转ie地址
            formData: {
                // mobile: '', // mobile
                eMAIL: '', // 企业邮箱
                entpNm: '', // 企业名称
                aDR: '', // 地址
                expdId3: '', // 法人姓名
                expdId4: '', // 法人证件号码
                idCardFace: '', // 身份证正面
                idCardBack: '', // 身份证反面
                crdtNo: '', // 证件号码-营业执照号/社会统一信用代码
                bsnLcnsPic: '', // 营业执照附件
                operatorName: '', // 经办人
                operatorCrdtNo: '', // 经办人证件号
                operatorPhone: '' // 经办人手机号
            },
            aprvStCd: 10,
            aprvOpn: '' // 审批意见
        };
    },
    mounted() {
        // this.getIsAprv();
        this.init();
    },
    methods: {
        init() {
            this.getShopEntp().then(res => {
                console.log('res', res);
                //  企业信息
                const bizEntpInfo = res.obj.bizEntpInfo;
                // const bizEntpAprvInf = res.obj.bizEntpAprvInf;
                if (bizEntpInfo) {
                    this.formData = { ...bizEntpInfo };
                    // this.formData.eMAIL = bizEntpInfo.eMAIL;
                    // this.formData.entpNm = bizEntpInfo.entpNm;
                    // this.formData.aDR = bizEntpInfo.aDR;
                    // this.formData.expdId3 = bizEntpInfo.expdId3;
                    // this.formData.expdId4 = bizEntpInfo.expdId4;
                    // this.formData.idCardFace = bizEntpInfo.idCardFace;
                    // this.formData.idCardBack = bizEntpInfo.idCardBack;
                    // this.formData.crdtNo = bizEntpInfo.crdtNo;
                    // this.formData.bsnLcnsPic = bizEntpInfo.bsnLcnsPic;
                    // this.formData.operatorName = bizEntpInfo.operatorName;
                    // this.formData.operatorCrdtNo = bizEntpInfo.operatorCrdtNo;
                    // this.formData.operatorPhone = bizEntpInfo.operatorPhone;
                    this.aprvStCd = bizEntpInfo.aprvStCd;
                    this.aprvOpn = bizEntpInfo.aprvOpn;
                }
            });
        },
        onSubmit(val) {
            console.log(val);
            let msg = '';
            if (!this.formData.entpNm) {
                msg = '请输入企业名称';
            } else if (!this.formData.expdId3) {
                msg = '请输入法人姓名';
            } else if (!this.formData.frCrdtNo) {
                msg = '请输入法人证件号码';
            } else if (!this.formData.crdtNo) {
                msg = '请输入社会信用证代码';
            }
            if (msg) {
                this.$message({
                    showClose: true,
                    message: msg,
                    type: 'error'
                });
                return false;
            }
            this.postShopAdd({ ...this.formData }).then(res => {
                if (res.code === 0) {
                    this.$message({
                        message: '提交成功',
                        type: 'success'
                    });
                    this.init();
                }
            });
        },
        onTrusteeship() {
            this.postTrusteeship().then(res => {
                if (res.code === 0) {
                    if (this.isIE) {
                        window.open(res.obj);
                    } else {
                        this.openUrl = res.obj;
                    }
                } else {
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'error'
                    });
                }
            });
        },
        onBinding() {
            this.postBinding().then(res => {
                if (res.code === 0) {
                    if (this.isIE) {
                        window.open(res.obj);
                    } else {
                        this.openUrl = res.obj || res.msg;
                    }
                } else {
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'error'
                    });
                }
            });
        },
        unBinding() {
            this.getUnBinding().then(res => {
                if (res.code === 0) {
                    if (this.isIE) {
                        window.open(res.obj);
                    } else {
                        this.openUrl = res.obj || res.msg;
                    }
                } else {
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'error'
                    });
                }
            });
        },
        // eslint-disable-next-line no-unused-vars
        onSuccessCardFace(file, fileList) {
            if (file.code === 0) {
                this.formData.idCardFace = file.url;
                // .replace('8888', '8080');
            }
        },
        // eslint-disable-next-line no-unused-vars
        onSuccessCardBack(file, fileList) {
            if (file.code === 0) {
                this.formData.idCardBack = file.url;
                // .replace('8888', '8080');
            }
        },
        // 成功
        // eslint-disable-next-line no-unused-vars
        onSuccessBsnLcnsPic(file, fileList) {
            if (file.code === 0) {
                this.formData.bsnLcnsPic = file.url;
                // .replace('8888', '8080');
            }
        },
        onError(err) {
            console.log(err);
            console.log(JSON.stringify(err));
        },
        onGoPath() {
            this.$router.push({
                path: '/association'
            });
        },
        onCopy() {
            this.$refs.openurl.select();
            if (document.execCommand('copy')) {
                document.execCommand('copy');
                this.$message({
                    showClose: true,
                    message: '复制成功'
                });
            }
        }
    },
    computed: {
        isDisabled() {
            if (
                this.aprvStCd == 1 ||
                this.aprvStCd == 2 ||
                this.aprvStCd == 4 ||
                this.aprvStCd == 5
            ) {
                return true;
            } else {
                return false;
            }
        },
        //ie?
        isIE() {
            if (!!window.ActiveXObject || 'ActiveXObject' in window) {
                return true;
            } else {
                return false;
            }
        }
    },
    components: {}
};
</script>
<style lang="less">
@import '../../assets/css/mixin.less';
.after-unit() {
    line-height: 28px;
    width: 28px;
    color: #666666;
}
.company-box {
    //padding: 0 30px;
    /*==============企业信息===============*/
    .companybox {
        padding-left: 150px;
        display: flex;
        flex-direction: row;
        margin-top: 21px;
    }
    .companylast {
        width: 280px;
        line-height: 40px;
        margin-left: 160px;
        text-align: center;
        background: #eee;
        color: #ccc;
        font-size: 14px;
        border-radius: 10px;
    }
    .removebind {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: 120px;
        .remove {
            width: 280px;
            line-height: 40px;
            margin-left: 160px;
            text-align: center;
            background: #fe8617;
            color: #fff;
            font-size: 14px;
            border-radius: 10px;
        }
    }
    .companytitle {
        font-size: 14px;
        color: #888888;
        width: 130px;
        height: 30px;
        line-height: 30px;
    }
    .companyinput {
        width: 290px;
        height: 30px;
        margin-left: 24px;
        font-size: 13px;
        color: #222222;
        // padding-left: 10px;
    }
    .idimg {
        width: 159px;
        height: 78px;
        border-radius: 3px;
        margin-left: 24px;
        .el-upload-dragger {
            border: 1px solid #479ceb;
            width: 159px;
            height: 78px;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
    .cameraicon {
        width: 36px;
        height: 26px;
        margin: 0 auto;
        margin-top: 14px;
    }
    .idfont {
        font-size: 14px;
        color: #666666;
        text-align: center;
        margin-top: 12px;
    }
    .idcard {
        height: 78px;
        line-height: 78px;
    }
    .idcardtip {
        font-size: 12px;
        color: #888888;
        line-height: 78px;
        margin-left: 18px;
    }
    .tj_btnbox {
        text-align: center;
        display: flex;
        flex-direction: row;
        // margin-left: 217px;
        margin-top: 44px;
        .center();
    }
    .submitbtn {
        width: 98px;
        height: 40px;
        border-radius: 40px;
        background: #fe8617;
        line-height: 40px;
        color: #fff;
        margin-right: 35px;
        font-size: 16px;
    }
    .paynumberbtn {
        width: 165px;
        height: 40px;
        background: url(../../assets/images/home/icon19.png) 19px 11px no-repeat
            #fff;
        border: 1px solid #fe8617;
        border-radius: 40px;
        margin-right: 35px;
        font-size: 16px;
        color: #fe8617;
        line-height: 40px;
        padding-left: 40px;
    }
    .settlementbtn {
        background: url(../../assets/images/home/icon20.png) 19px 11px no-repeat
            #fff;
    }
    .prompt {
        // background: #eee;
        color: #fe8617;
        width: 500px;
        margin: 20px auto;
        text-align: center;
        line-height: 35px;
        font-size: 14px;
        font-weight: 900;
    }
}
</style>
