<template>
  <div class="association-box">
    <div class="bankbox">
      <div class="banknumberbox">
        <div class="bankname">昵称</div>
        <div class="bankmoney">
          <div class="banknum">
            <el-input class placeholder="请输入昵称" size="small" v-model="formData.userName"></el-input>
          </div>
        </div>
      </div>
      <div class="banknumberbox">
        <div class="bankname">头像</div>
        <div class="bankmoney">
          <el-upload
            :action="uploadUrl"
            :data="updData"
            :on-success="uploadAvatar"
            :show-file-list="false"
            class="upload-demo"
            drag
            multiple
            name="file"
          >
            <img :src="this.formData.avatar" v-if="this.formData.avatar">
            <div class="upd-box" v-else>
              <i class="el-icon-upload"></i>
            </div>
          </el-upload>
        </div>
      </div>
      <div class="banknumberbox">
        <div class="bankname">邮箱</div>
        <div class="bankmoney">
          <div class="banknum">
            <el-input class placeholder="请输入邮箱" size="small" v-model="formData.email"></el-input>
          </div>
        </div>
      </div>
      <div class="banknumberbox">
        <div class="bankname">地址</div>
        <div class="bankmoney">
          <div class="banknum">
            <el-input class placeholder="请输入地址" size="small" v-model="formData.address"></el-input>
          </div>
        </div>
      </div>
      <div @click="onSubmit" class="withdrawalbtn">提交</div>
    </div>
  </div>
</template>
<script>
import validator from '@/util/validator.js';
import config from '@/config/index.js';
import { mapState, mapMutations, mapActions } from 'vuex';
const mixin = {
    computed: {
        ...mapState({
            message: 'message'
        })
    },
    methods: {
        ...mapMutations({}),
        ...mapActions({
            postEdit: 'postEdit'
        })
    }
};
const codeUrl = config.serverHost + '/captcha/captchaImage?type=math';
// (config.serverHost ? '/trade' : '') +
const uploadUrl = '/common/upload';
export default {
    mixins: [mixin],
    data() {
        return {
            uploadUrl: uploadUrl,
            updData: {
                action: 'uploadimage'
            },
            formData: {
                email: '',
                avatar: '',
                address: '',
                userName: ''
            }
        };
    },
    watch: {
        message(to, from) {
            if (to.rows) {
                const userInfo = to.rows[0].user;
                this.formData.email = userInfo.email;
                this.formData.avatar = userInfo.avatar;
                this.formData.address = userInfo.address;
                this.formData.userName = userInfo.userName;
            }
        }
    },
    mounted() {
        if (this.message && this.message.rows) {
            const userInfo = this.message.rows[0].user;
            this.formData.email = userInfo.email;
            this.formData.avatar = userInfo.avatar;
            this.formData.address = userInfo.address;
            this.formData.userName = userInfo.userName;
        }
    },
    methods: {
        onSubmit() {
            const params = { ...this.formData };
            let msg = '';
            if (!params.email) {
                msg = '请输入email';
            } else if (!params.avatar) {
                msg = '请输入头像';
            }
            if (msg) {
                this.$message({
                    showClose: true,
                    message: msg,
                    type: 'error'
                });
                return false;
            }
            this.postEdit(params).then(res => {
                if (res.code === 0) {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    });
                }
            });
        },
        // url
        // eslint-disable-next-line no-unused-vars
        uploadAvatar(file, fileList) {
            if (file.code === 0) {
                this.formData.avatar = file.url;
                // .replace('8888', '8080');
            }
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

.association-box {
    /*=====================账户提现========================*/
    .tips {
        width: 874px;
        height: 41px;
        background: #f2f3f5;
        padding-left: 16px;
        line-height: 41px;
        font-size: 14px;
        color: #fe8617;
        margin: 0 auto;
        margin-top: 30px;
    }
    .bankbox {
        width: 60%;
        margin: 0 auto;
    }
    .banknumberbox {
        display: flex;
        flex-direction: row;
        margin-top: 40px;
    }
    .bankname {
        font-size: 16px;
        color: #888888;
        width: 90px;
        height: 40px;
        line-height: 40px;
        text-align: right;
    }
    .bankmoney {
        margin-left: 23px;
        .upload-demo {
            .el-upload-dragger {
                width: 120px;
                height: 120px;
                border-radius: 50%;
                .el-icon-upload {
                    font-size: 54px;
                    margin: 30px 0 0;
                    line-height: 50px;
                }
                img {
                    width: 100%;
                }
            }
        }
    }
    .banknum {
        width: 300px;
        height: 40px;
        line-height: 40px;
        border-radius: 30px;
        font-size: 14px;
        color: #222222;
        border: 1px solid #c7c7c7;
        padding-left: 23px;
        .el-input__inner {
            border: 0px;
            padding-left: 0;
            background-color: rgba(255, 255, 255, 0);
        }
        &.banknum_w {
            width: 180px;
        }
    }
    .paymoney {
        font-size: 14px;
        color: #888888;
        margin-top: 15px;
        margin-left: 15px;
    }
    .paymoney i {
        font-style: normal;
        color: #222222;
        font-weight: 600;
    }
    .lastnumber {
        font-size: 14px;
        color: #fe8617;
        margin-left: 19px;
        width: 100px;
        height: 40px;
        line-height: 40px;
        cursor: pointer;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .income {
        margin-top: 6px;
    }
    .income i {
        color: #479ceb;
    }
    .bluewithdrawal {
        color: #479ceb;
    }
    .smallmargin {
        margin-top: 35px;
    }
    .withdrawalbtn {
        width: 300px;
        background: #fe8617;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #fff;
        border-radius: 30px;
        margin-top: 70px;
        margin-left: 115px;
        font-size: 14px;
        cursor: pointer;
    }
}
</style>
