<template>
  <div class="share-main">
    <h3>我要分享</h3>
    <div class="sharebox">
      <div class="shareadress clear">
        <span class="share_ad">
          <el-input class placeholder ref="openurl" size="small" v-model="openUrl">
            <el-button @click="onCopy" slot="append">复制</el-button>
          </el-input>
        </span>
      </div>
      <div class="shareinfor">
        <div class="shareicon">
          <img src="../../assets/images/home/icon23.png">
        </div>
        <div class="shareicon">
          <img src="../../assets/images/home/icon21.png">
        </div>
        <div class="shareicon">
          <img src="../../assets/images/home/icon22.png">
        </div>
        <div class="shareicon">
          <a href="https://www.toutiao.com/c/user/4366907239839515/#mid=1633770178670606">
            <img src="../../assets/images/home/icon24.png">
          </a>
        </div>
        <div class="shareicon">
          <a href="https://weibo.com/p/1006067142351787/home?from=page_100606&mod=TAB#place">
            <img src="../../assets/images/home/icon25.png">
          </a>
        </div>
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
        ...mapActions({})
    }
};

export default {
    mixins: [mixin],
    data() {
        return {
            openUrl: location.origin
        };
    },
    mounted() {},
    methods: {
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
    computed: {},
    components: {},
    filters: {}
};
</script>
<style lang="less">
@import '../../assets/css/mixin.less';
.share-main {
    .sharebox {
        width: 350px;
        margin: 0 auto;
        margin-top: 103px;
    }
    .shareadress {
        width: 350px;
        height: 30px;
        // background: #fff;
        // border: 1px solid #e5e5e5;
    }
    .share_ad {
        font-size: 13px;
        color: #222222;
        line-height: 30px;
        padding-left: 10px;
    }
    .copybtn {
        width: 54px;
        height: 30px;
        background: #f8f8f8;
        text-align: center;
        line-height: 30px;
        font-size: 14px;
        color: #222222;
        display: inline-block;
        float: right;
        cursor: pointer;
    }
    .shareinfor {
        width: 350px;
        margin: 0 auto;
        margin-top: 33px;
        display: flex;
        flex-direction: row;
        margin-left: 19px;
    }
    .shareicon {
        width: 47px;
        height: 47px;
        margin-right: 20px;
    }
}
</style>
