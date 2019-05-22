<template>
  <div class="white_W1200 about-main">
    <div class="left_aboutbox">
      <div class="abouttitle">关于我们</div>
      <div class="aboutlist">
        <ul>
          <li :class="{'blueintro': treePath === 'one'}" @click="onTree('one')">
            <img src="../../assets/images/index/news/icon43.png">平台介绍
          </li>
          <li :class="{'blueintro': treePath === 'two'}" @click="onTree('two')">
            <img src="../../assets/images/index/news/icon46.png">公司介绍
          </li>
          <li :class="{'blueintro': treePath === 'three'}" @click="onTree('three')">
            <img src="../../assets/images/index/news/icon51.png">联系我们
          </li>
        </ul>
      </div>
    </div>
    <div class="right_mainbox">
      <div class="mainbox-xs" v-show="treePath === 'one'">平台介绍</div>
      <div class="newslist" v-show="treePath === 'two'">公司介绍</div>
      <div class="cz" v-show="treePath === 'three'">
        <h2>联系我们</h2>
        <div class="callus">
          <!-- <div class="ouraddress"> -->
          <mymap></mymap>
          <!-- <img alt src="../../assets/images/map.png"> -->
          <!-- </div> -->
          <div class="ourinformation">
            <div class="name">山东鑫禾金融保理有限公司</div>
            <div class="call">
              <span class="el-icon-service"></span>
              <span>服务热线</span>
              <span>400-0531-587</span>
            </div>
            <div class="time">工作时间：工作日08：30-18：00</div>
            <div class="emaill">客服Email：kefu@cnpyr.com</div>
            <div class="address">办公地址：山东省济南市高新区汉峪金谷</div>
            <div class="post">邮编：250000</div>
          </div>
        </div>
        <div class="erweima">
          <img alt src="../../assets/images/we.png">
          <span>扫一扫获取更多金融服务</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import mymap from '../../components/index/mymap';
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
    // store: store.default,
    mixins: [mixin],
    data() {
        return {
            treePath: 'one'
        };
    },
    watch: {
        $route() {
            this.treePath = this.$route.query.treePath;
        }
    },
    mounted() {
        console.log(this.$route.query.treePath);
        this.treePath = this.$route.query.treePath || 'one';
    },
    methods: {
        onTree(path) {
            this.treePath = path;
        }
    },
    computed: {},
    components: {
        mymap
    }
};
</script>
<style lang="less">
@import '../../assets/css/mixin.less';
.about-main {
    .flexbox();
    /*======================新闻动态左侧===============================*/
    .left_aboutbox {
        width: 220px;
        height: 678px;
        background: #fff;
    }
    .abouttitle {
        width: 100%;
        height: 50px;
        background: #479ceb;
        text-align: center;
        line-height: 50px;
        font-size: 16px;
        color: #fff;
    }
    .aboutlist ul li {
        font-size: 16px;
        color: #666666;
        text-align: center;
        margin-top: 42px;
        cursor: pointer;
    }
    .aboutlist ul li img {
        position: relative;
        top: 3px;
        left: -9px;
    }
    .aboutlist .blueintro {
        color: #479ceb;
    }

    /*==========新闻右侧公共部分================*/
    .right_mainbox {
        width: 930px;
        margin-left: 10px;
        background: #fff;
    }
    //联系我们
    .cz {
        h2 {
            line-height: 50px;
            font-size: 20px;
            margin-left: 15px;
        }
        .callus {
            height: 320px;
            width: 700px;
            margin-left: 40px;
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            .name {
                font-size: 25px;
                font-weight: 900;
                line-height: 50px;
            }
            .call {
                height: 60px;
                i {
                    font-size: 50px;
                    line-height: 60px;
                }
                span {
                    font-size: 20px;
                    color: #479ceb;
                    line-height: 60px;
                }
            }
            div {
                font-size: 14px;
                line-height: 35px;
            }
        }
        .ouraddress {
            width: 320px;
            height: 280px;
            mymap {
                width: 100%;
                height: 100%;
            }
        }
        .erweima {
            width: 800px;
            height: 150px;
            // text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            img {
                width: 100px;
                height: 100px;
            }
            span {
                line-height: 30px;
            }
        }
    }
}
</style>
