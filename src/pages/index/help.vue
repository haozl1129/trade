<template>
    <div class="white_W1200 news-main">
        <div class="left_aboutbox">
            <div class="abouttitle">帮助中心</div>
            <div class="aboutlist">
                <ul>
                    <li :class="{'blueintro': treePath === 'one'}" @click="onTree('one')"><img src="../../assets/images/index/news/icon43.png">新手指引</li>
                    <li :class="{'blueintro': treePath === 'two'}" @click="onTree('two')"><img src="../../assets/images/index/news/icon46.png">协议下载</li>
                    <li :class="{'blueintro': treePath === 'three'}" @click="onTree('three')"><img src="../../assets/images/index/news/icon51.png">操作手册</li>
                </ul>
            </div>
        </div>
        <div class="right_mainbox">
            <div class="mainbox-xs" v-show="treePath === 'one'">
                <video src=""></video>1
            </div>
            <div class="newslist" v-show="treePath === 'two'">
                <ul>
                    <li @click="onPath('1')"><span class="listdisc"></span>4月“金”喜不断，买卖票、银行直贴返百万现金，利润赚翻天！<span class="listtime">2019-04-12</span></li>
                    <li class="blueli"><span class="listdisc bluedisc"></span>4月“金”喜不断，买卖票、银行直贴返百万现金，利润赚翻天！<span class="listtime blueli">2019-04-12</span></li>
                    <li><span class="listdisc"></span>4月“金”喜不断，买卖票、银行直贴返百万现金，利润赚翻天！<span class="listtime">2019-04-12</span></li>
                    <li><span class="listdisc"></span>4月“金”喜不断，买卖票、银行直贴返百万现金，利润赚翻天！<span class="listtime">2019-04-12</span></li>
                    <li><span class="listdisc"></span>4月“金”喜不断，买卖票、银行直贴返百万现金，利润赚翻天！<span class="listtime">2019-04-12</span></li>
                    <li><span class="listdisc"></span>4月“金”喜不断，买卖票、银行直贴返百万现金，利润赚翻天！<span class="listtime">2019-04-12</span></li>
                    <li><span class="listdisc"></span>4月“金”喜不断，买卖票、银行直贴返百万现金，利润赚翻天！<span class="listtime">2019-04-12</span></li>
                    <li><span class="listdisc"></span>4月“金”喜不断，买卖票、银行直贴返百万现金，利润赚翻天！<span class="listtime">2019-04-12</span></li>
                </ul>
            </div>
            <div class="cz" v-show="treePath === 'three'">3</div>
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
    // store: store.default,
    mixins: [mixin],
    data() {
        return {
            treePath: 'two'
        };
    },
    mounted() {
        this.treePath = this.$route.name;
    },
    methods: {
        onTree(path) {
            this.treePath = path;
        }
    },
    computed: {},
    components: {}
};
</script>
<style lang="less">
@import '../../assets/css/mixin.less';
.news-main {
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
}
</style>
