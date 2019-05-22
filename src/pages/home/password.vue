<template>
    <div class="password-main">
        <div class="personbigbox">
            <div class="banknumberbox">
                <div class="bankname">原密码</div>
                <div class="bankmoney">
                    <div class="banknum">
                        <el-input type="password" class="" size="small" placeholder="请输入原密码" v-model="form.password">
                        </el-input>
                    </div>
                </div>
                <div class="lastnumber">*</div>
            </div>
            <div class="banknumberbox">
                <div class="bankname">新密码</div>
                <div class="bankmoney">
                    <div class="banknum">
                        <el-input type="password" class="" size="small" placeholder="请输入新密码" v-model="form.password1">
                        </el-input>
                    </div>
                </div>
                <div class="lastnumber">*</div>
            </div>
            <div class="banknumberbox">
                <div class="bankname">确认密码</div>
                <div class="bankmoney">
                    <div class="banknum">
                        <el-input type="password" class="" size="small" placeholder="请输入确认密码" v-model="form.password2">
                        </el-input>
                    </div>
                </div>
                <div class="lastnumber">*</div>
            </div>

            <!-- <div class="Personinforbox">
                <div class="pername">输入账号密码：</div>
                <div class="pertext">
                    <el-input type="password" class="" size="small" placeholder="请输入账号密码" v-model="form.password">
                    </el-input>
                </div>
                <div class="mandatory">* 必填</div>
                <div class="clear"></div>
            </div>
            <div class="Personinforbox">
                <div class="pername">输入修改密码：</div>
                <div class="pertext">
                    <el-input type="password" class="" size="small" placeholder="请输入修改密码" v-model="form.password1">
                    </el-input>
                </div>
                <div class="mandatory">* 必填</div>
                <div class="clear"></div>
            </div>
            <div class="Personinforbox">
                <div class="pername">确认密码：</div>
                <div class="pertext">
                    <el-input type="password" class="" size="small" placeholder="请输入确认密码" v-model="form.password2">
                    </el-input>
                </div>
                <div class="mandatory">* 必填</div>
                <div class="clear"></div>
            </div> -->
        </div>
        <div class="withdrawalbtn" @click="onSubmit">提交</div>
        <!-- <div class="zc_loginbtn" @click="onSubmit">提交</div> -->
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import urls from '@/config/url_enum.js';
import config from '@/config/index.js';
import cookie from '@/util/cookie.js';
import validator from '@/util/validator.js';
const mixin = {
    computed: {
        ...mapState({})
    },
    methods: {
        ...mapMutations({}),
        ...mapActions({
            postPersonalPassword: 'postPersonalPassword'
        })
    }
};
export default {
    mixins: [mixin],
    data() {
        return {
            form: {
                password: '',
                password1: '',
                password2: ''
            }
        };
    },
    mounted() {},
    methods: {
        // 提交
        onSubmit() {
            let msg = '';
            if (this.form.password1 !== this.form.password2) {
                msg = '两次密码不同';
            }
            if (msg) {
                this.$message({
                    showClose: true,
                    message: msg,
                    type: 'error'
                });
                return false;
            }
            this.postPersonalPassword({ ...this.form }).then(res => {
                console.log(res);
                if (res.code === 0) {
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'success'
                    });
                } else {
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'error'
                    });
                }
            });
        }
    },
    filter: {},
    computed: {},
    components: {}
};
</script>
<style lang="less">
@import '../../assets/css/index.less';
.aa:after {
    content: ' bbb ';
}
.password-main {
    margin-top: 60px;
    padding-left: 46px;
    padding-top: 40px;
    // box-shadow: 8px 8px 20px #e0dfdf;
    // box-shadow: 0 0 20px rgba(50, 50, 50, 0.2);
    padding-bottom: 10px;

    .personbigbox {
        width: 548px;
        margin: 0 auto;
    }

    // ------------ new -------------
    .banknumberbox {
        display: flex;
        flex-direction: row;
        margin-top: 40px;
    }
    .bankname {
        font-size: 16px;
        color: #888888;
        width: 100px;
        height: 40px;
        line-height: 40px;
        text-align: right;
    }
    .bankmoney {
        margin-left: 23px;
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
    .lastnumber {
        color: red;
        margin-left: 19px;
        width: 100px;
        height: 40px;
        line-height: 41px;
    }
    .withdrawalbtn {
        width: 235px;
        margin: 0 auto;
        background: #fe8617;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #fff;
        border-radius: 30px;
        margin-top: 70px;
        font-size: 14px;
        cursor: pointer;
    }
}
</style>