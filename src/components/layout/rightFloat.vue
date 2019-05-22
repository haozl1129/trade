<template>
    <div class="flot-box">
        <div class="flot-item itme-weixin">
            关注微信
        </div>
        <div class="flot-item item-h">
            <img src="../../assets/images/float/fx@2x.png" alt="分享">
        </div>
        <div class="flot-item item-h" @click="onOpenCalculator">
            <img src="../../assets/images/float/compute2x.png" alt="利率计算">
        </div>
        <div class="shangqiao flot-item item-h" rel="nofollow" @click="onOpenShangqiao">
            <img src="../../assets/images/float/customer2x.png" alt="客户中心">
        </div>
        <div class="flot-item item-bg_i" @click="onTop">
            <img src="../../assets/images/float/top2x.png" alt="返回顶部">
        </div>
        <el-dialog class="calculator-dialog" title="报价计算器" :visible="detailDialog" @close="onClose" append-to-body>
            <calculator></calculator>
        </el-dialog>
    </div>
</template>
<script>
import calculator from '@/components/layout/calculator';
export default {
    data() {
        return {
            detailDialog: false
        };
    },
    mounted() {
        // console.log(config);
    },
    methods: {
        onTop() {
            const scrollToptimer = setInterval(() => {
                let top =
                    document.documentElement.scrollTop +
                    document.body.scrollTop;
                const speed = top / 4;
                top -= speed;
                document.documentElement.scrollTop = document.body.scrollTop = top;
                if (top == 0) {
                    clearInterval(scrollToptimer);
                }
            }, 30);
        },
        onOpenCalculator() {
            this.detailDialog = true;
        },
        onClose() {
            this.detailDialog = false;
        },
        onOpenShangqiao() {
            document.getElementById('nb_invite_ok').click();
        }
    },
    components: {
        calculator: calculator
    }
};
</script>

<style lang="less">
@import '../../assets/css/mixin.less';
.flot-box {
    width: 50px;
    display: inline-block;
    position: fixed;
    bottom: 100px;
    right: 15px;
    font-size: 14px;
    .flot-item {
        // .flexbox(column);
        .center(column);
        margin-top: 15px;
        cursor: pointer;
        background-color: #e1e4e9;
        padding: 8px;
        width: 45px;
        &.itme-weixin {
            width: 45px;
            height: 45px;
            background-color: #fe8617;
            color: #fff;
            box-shadow: 0px 0px 5px 1px #fe8617d1;
        }
        &.item-bg_i {
            background-color: inherit;
        }
        img {
            margin-bottom: 2px;
        }
        &.item-h {
            &:hover {
                background-color: #fe8617;
                color: #fff;
                box-shadow: 0px 0px 5px 1px #fe8617d1;
            }
        }
    }
}
.calculator-dialog {
    .el-dialog {
        width: 60%;
    }
    .el-dialog__header {
        background: #479ceb;
        padding: 15px 20px;
        .el-dialog__title {
            font-size: 16px;
            color: #fff;
        }
        .el-dialog__close {
            color: #fff;
        }
    }
}
</style>


