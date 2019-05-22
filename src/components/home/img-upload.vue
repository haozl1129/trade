<template>
    <el-upload name="file" :show-file-list="false" :data="updData" class="upload-demo" drag :action="actionUrl" :on-success="onSuccess" multiple>
        <template v-if="imgUrl">
            <img :src="imgUrl">
            <i @click.stop="onOpen" class="file-icon el-icon-zoom-in"></i>
            <i @click.stop="onDel" class="file-icon el-icon-delete-solid"></i>
        </template>
        <div v-else class="upd-box">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
                <em>
                    <slot></slot>
                </em>
            </div>
        </div>
    </el-upload>
</template>
<script>
export default {
    props: {
        actionUrl: {
            type: String,
            default: ''
        },
        imgUrl: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            updData: {
                action: 'uploadimage'
            }
        };
    },
    mounted() {},
    methods: {
        onSuccess(file, fileList) {
            // let fileUrl = '';
            // if (file.code === 0) {
            //     fileUrl = file.url.replace('8888', '8080');
            // }
            this.$emit('onSuccess', file, fileList);
        },
        onOpen() {
            // console.log('open');
            this.$alert(
                '<strong><img src="' + this.imgUrl + '" /></strong>',
                '',
                {
                    dangerouslyUseHTMLString: true,
                    customClass: 'alert-box'
                }
            );
        },
        onDel() {
            // console.log('del');
            this.$emit('onDelete');
        }
    },
    computed: {}
};
</script>

<style lang="less">
@import '../../assets/css/mixin.less';
.upload-demo {
    display: inline-block;
    margin-right: 22px;
    margin-bottom: 15px;
    position: relative;
    .upd-box {
        .center(column);
        width: 100%;
        height: 100%;
        .el-icon-upload {
            margin: 0;
            line-height: 25px;
            font-size: 25px;
            color: #0073ff;
            margin-right: 6px;
        }
    }
    .el-upload-dragger {
        width: 163px;
        height: 78px;
    }
    img {
        width: 100%;
        height: 100%;
    }
    .file-icon {
        position: absolute;
        top: 2px;
        font-size: 16px;
        color: #4f4f4f;
        &:hover {
            color: #5cb6ff;
        }
        &.el-icon-zoom-in {
            right: 20px;
        }
        &.el-icon-delete-solid {
            right: 2px;
        }
    }
}
.alert-box {
    width: 60%;
    img {
        width: 100%;
    }
}
</style>


