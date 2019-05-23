<template>
    <div class="white_W1200 news-main">
        <div class="left_aboutbox">
            <div class="abouttitle">新闻动态</div>
            <div class="aboutlist">
                <ul>
                    <li :class="{'blueintro': treePath === 'hyxw'}" @click="onTree('hyxw')"><i class="el-icon-s-ticket">&nbsp</i>行业新闻</li>
                    <li :class="{'blueintro': treePath === 'jtxw'}" @click="onTree('jtxw')"><i class="el-icon-s-order">&nbsp</i>集团新闻</li>
                    <li :class="{'blueintro': treePath === 'ptgg'}" @click="onTree('ptgg')"><i class="el-icon-message-solid">&nbsp</i>平台公告</li>
                    <!--  <img src="../../assets/images/index/news/icon42.png">-->
                </ul>
            </div>
        </div>
        <div class="right_mainbox">
            <div class="newslist" v-show="!isDetail">
                <ul>
                    <li v-for="item in industryList.rows" @click="onPath(item.artcId)"><span class="listdisc"></span> <span class="artcTtl">{{item.artcTtl}}</span><span class="listtime">{{item.updateTime | formatTime('yyyy-MM-dd')}}</span></li>
                </ul>
            </div>
            <div v-show="isDetail">
                <div class="newspagebox">
                    <!--<span class="propage"> <i> <</i> 上一篇</span> <span class="nextpage">下一篇 ></span> -->
                </div>
                <div style="clear:both"></div>
                <div class="newsbox">
                    <div class="newstitle">{{content.obj.artcTtl}}</div>
                    <div class="newstime">{{content.obj.createTime | formatTime('yyyy-MM-dd')}}</div>
                    <div class="mainbody maindetail" v-html="content.obj.artcCntnt"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
const mixin = {
    computed: {
        ...mapState({
            industryList: 'industryList',
            content: 'content'
        })
    },
    methods: {
        ...mapMutations({}),
        ...mapActions({
            getIndustryList: 'getIndustryList',
            getContent: 'getContent'
        })
    }
};
/**
 * hyxw 行业新闻
 * jtxw 集团新闻
 * ptgg 平台公告
 */
export default {
    // store: store.default,
    mixins: [mixin],
    data() {
        return {
            treePath: '',
            isDetail: false
        };
    },
    mounted() {
        const artcId = this.$route.query.artcId;
        const treepath = this.$route.query.treePath;

        if (artcId) {
            this.isDetail = true;
            this.getContent({ artcId: artcId });
        } else {
            this.treePath = treepath;
            this.isDetail = false;
            this.getIndustryList();
        }
        document.documentElement.scrollTop = document.body.scrollTop = 0;
    },
    methods: {
        onTree(path = 'ptgg') {
            this.treePath = path;
            // this.getIndustryList();
            this.$router.push({
                path: '/news'
            });
        },
        onPath(param) {
            // this.isDetail = true;
            this.$router.push({
                path: '/news',
                query: { artcId: param }
            });
            // this.getContent();
        }
    },

    watch: {
        $route(to) {
            if (to.query.artcId) {
                this.isDetail = true;
                this.getContent({ artcId: to.query.artcId });
            } else {
                this.isDetail = false;
            }
            // if (to.name === 'index' || to.path === '/') {
            //     this.theme = '';
            // } else {
            //     this.theme = 'white';
            // }
        }
    },

    computed: {},
    components: {}
};
</script>
<style lang="less">
@import '../../assets/css/mixin.less';

.news-main {
    &.white_W1200 {
        margin-top: 10px;
    }
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
        i {
            font-size: 18px;
        }
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
    /*==================行业新闻=======================*/
    .newslist {
        width: 870px;
        margin: 0 auto;
    }
    .newslist ul li {
        font-size: 16px;
        color: #666666;
        height: 70px;
        line-height: 70px;
        border-bottom: 1px solid #f1f1f1;
        padding-left: 15px;

        &:hover {
            color: #479ceb;
            .listdisc {
                background: #479ceb;
            }
        }
        .artcTtl {
            display: inline-block;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            width: 35em;
            vertical-align: middle;
        }
    }
    .listdisc {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: #e5e5e5;
        display: inline-block;
        position: relative;
        right: 10px;
    }
    .listtime {
        float: right;
        color: #bebebe;
        margin-right: 5px;
    }
    // .newslist .blueli {
    //     color: #479ceb;
    // }
    // .bluedisc {
    //     background: #479ceb;
    // }
}
</style>
