<template>
    <div class="serious-box">
        <h3>企业认证 失效</h3>
        <div class="form-info">

            <div class="form-item">
                <div class="item-name">营业执照类型</div>
                <div class="item-input item-conter">
                    <el-radio v-model="radio" label="1">多证合一</el-radio>
                    <el-radio v-model="radio" label="2">普通营业执照</el-radio>
                </div>
            </div>
            <div class="form-item">
                <div class="item-update">
                    <el-upload class="upload-demo" drag :action="uploadUrl" multiple>
                        <div class="upd-box">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text"><em>营业执照正本</em></div>
                        </div>
                    </el-upload>
                    <el-upload class="upload-demo" drag :action="uploadUrl" multiple>
                        <div class="upd-box">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text"><em>法人身份证正面</em></div>
                        </div>
                    </el-upload>
                    <el-upload class="upload-demo" drag :action="uploadUrl" multiple>
                        <div class="upd-box">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text"><em>法人身份证反面</em></div>
                        </div>
                    </el-upload>
                </div>
            </div>
            <div class="form-item">
                <div class="item-name">公司名称</div>
                <div class="item-input">
                    <el-input class="" size="small" placeholder="请输入公司名称" suffix-icon="money-unit" v-model="inpu">
                    </el-input>
                </div>
            </div>
            <div class="form-item">
                <div class="item-name">统一社会信用代码</div>
                <div class="item-input">
                    <el-input class="" size="small" placeholder="请输入统一社会信用代码" suffix-icon="money-unit" v-model="inpu">
                    </el-input>
                </div>
            </div>
            <div class="form-item">
                <div class="item-name">公司地址</div>
                <div class="item-input">
                    <el-input class="" size="small" placeholder="请输入公司地址" suffix-icon="money-unit" v-model="inpu">
                    </el-input>
                </div>
            </div>
            <div class="form-item">
                <div class="item-name">法定代表人姓名</div>
                <div class="item-input">
                    <el-input class="" size="small" placeholder="请输入法定代表人姓名" suffix-icon="money-unit" v-model="inpu">
                    </el-input>
                </div>
            </div>
            <div class="form-item">
                <div class="item-name">法定代表人身份证号</div>
                <div class="item-input">
                    <el-input class="" size="small" placeholder="请输入法定代表人身份证号" suffix-icon="money-unit" v-model="inpu">
                    </el-input>
                </div>
            </div>

            <div class="form-item form-but">
                <div class="but-sub">点击保存</div>
            </div>
        </div>
        <h3>授权人信息</h3>
        <div class="form-info">
            <div class="form-item">
                <a>填写经办人信息</a>
            </div>
            <div class="form-item">
                <div class="item-name">姓名</div>
                <div class="item-input">
                    <el-input class="" size="small" placeholder="请输入姓名" suffix-icon="money-unit" v-model="inpu">
                    </el-input>
                </div>
            </div>
            <div class="form-item">
                <div class="item-name">身份证号</div>
                <div class="item-input">
                    <el-input class="" size="small" placeholder="请输入身份证号" suffix-icon="day-unit" v-model="inpu">
                    </el-input>
                </div>
            </div>
            <div class="form-item">
                <div class="item-name">手机号</div>
                <div class="item-input">
                    <el-input class="" size="small" placeholder="请输入手机号" suffix-icon="bai-unit" v-model="inpu">
                    </el-input>
                </div>
            </div>
            <div class="form-item">
                <div class="item-name">电子邮箱</div>
                <div class="item-input">
                    <el-input class="" size="small" placeholder="请输入电子邮箱" suffix-icon="yuan-unit" v-model="inpu">
                    </el-input>
                </div>
            </div>
            <div class="form-item">
                <div class="item-name"></div>
                <div class="item-input">
                    <el-checkbox-group v-model="checkList">
                        <el-checkbox label="a">同意<a>《企业授权书》</a></el-checkbox>
                        <el-checkbox label="b">同意<a>《单位授权书》</a></el-checkbox>
                    </el-checkbox-group>
                </div>
            </div>

            <div class="form-item form-but">
                <div class="but-sub">点击保存</div>
            </div>

        </div>

        <h3>关联对公账户</h3>
        <div class="form-info">
            <div class="form-item">
                <a>若您的业务类型包含买票,必须关联【兴业银行】账户</a>
            </div>
            <div class="form-item">
                <div class="item-name">行号/银行名称</div>
                <div class="item-input">
                    <el-input class="" size="small" placeholder="请输入对公银行账户的行号或者银行名称关键查询" suffix-icon="bai-unit" v-model="inpu">
                    </el-input>
                </div>
            </div>
            <div class="form-item">
                <div class="item-name">银行账号</div>
                <div class="item-input">
                    <el-input class="" size="small" placeholder="请输入银行账号" suffix-icon="bai-unit" v-model="inpu">
                    </el-input>
                </div>
            </div>
            <div class="form-item form-but">
                <div class="but-sub">点击保存</div>
            </div>
        </div>

    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import config from '@/config/index.js';
const mixin = {
    computed: {
        ...mapState({})
    },
    methods: {
        ...mapMutations({}),
        ...mapActions({})
    }
};
const uploadUrl = config.serverHost + '/upload/add';
export default {
    mixins: [mixin],
    data() {
        return {
            uploadUrl: uploadUrl,
            input4: '',
            inpu: '',
            radio: '',
            value1: '',
            input5: '',
            checkList: []
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {}
    },
    computed: {
        getOptions() {}
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
.serious-box {
    //padding: 0 30px;
    a {
        font-size: 14px;
        color: #0073ff;
    }
    .form-info {
        .flexbox(column);
        &.top-line {
            border-top: 1px solid #e3e3e3;
            padding-top: 50px;
        }
        .form-item {
            .flexbox();
            margin-bottom: 25px;
            .item-name {
                .flex-display();
                .center();
                .flexjustify(flex-end);
                width: 187px;
                color: #666666;
                font-size: 14px;
            }
            .item-input {
                margin-left: 20px;
                width: 451px;
                &.item-much {
                    .flexbox();
                    .flexjustify(space-between);
                }
                &.item-conter {
                    .center();
                }
                .input-rate {
                    width: 153px;
                }
                .symbol {
                    font-size: 18px;
                }
            }
            .item-update {
                .flexbox();
                .flexjustify(space-around);
                width: 100%;
                .upload-demo {
                    .upd-box {
                        // .center(column);
                        // width: 100%;
                        // height: 100%;
                        .el-icon-upload {
                            margin: 10px 0 0;
                            // line-height: 0;
                            font-size: 25px;
                            color: #0073ff;
                        }
                    }
                    .el-upload-dragger {
                        width: 148px;
                        height: 103px;
                    }
                }
            }
            &.form-but {
                .center();
                font-size: 16px;

                .but-sub {
                    .center();
                    width: 192px;
                    height: 40px;
                    background-color: #0895f8;
                    border-radius: 5px;
                    margin-right: 94px;
                    color: #fff;
                    &:hover {
                        background-color: #0073ff;
                    }
                }
            }
        }
    }
}
</style>
