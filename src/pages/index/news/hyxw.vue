<template>
    <div class="newslist">
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
</template>
<script>
export default {
    data() {
        return {};
    },
    mounted() {},
    methods: {
        onPath(path) {
            this.$router.push({
                path: '/news/newinfo'
            });
        }
    },
    computed: {},
    components: {}
};
</script>
<style lang="less">
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
.newslist .blueli {
    color: #479ceb;
}
.bluedisc {
    background: #479ceb;
}
</style>
