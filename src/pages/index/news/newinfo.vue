<template>
    <div>
        <div class="newspagebox">
            <span class="propage"><i>
                    </i> 上一篇</span> <span class="nextpage">下一篇 ></span>
        </div>
        <div style="clear:both"></div>
        <div class="newsbox">
            <div class="newstitle">对内练兵通过业务知识考试提升员工素质</div>
            <div class="newstime">2019-04-12</div>
            <div class="mainbody maindetail">
                <p>　　为提高业务能力，促进业务人员专项技能知识学习的目标，3月28日，早票网举办业务知识考核活动。工作人员在做好本职工作的前提下，通过认真学习、精心备答，积极参与，展示出了良好的精神风貌、业务知识和综合能力。</p>

                <p>　　本次知识考核以企业文化，票据基础知识，公司规章制度，业务沟通技巧等几个方面为主，全方位考核了工作人员的综合素质，巩固了业务知识，增加了大家的学习兴趣，为进一步强化业务水平奠定了良好基础。同时这次对内练兵，有效提升了早票网业务团队为用户服务的能力，实现了内强素质，外树形象的目标，振奋了队伍精神、鼓舞了工作斗志，增强了集体凝聚力。</p>

                <p>　　参加考试的员工纷纷表示：考试的内容与工作紧密结合，为自己再实际工作中规范工作起到很好的作用。通过此次考试，不少员工对业务有了更深层次的想法，也认识到业务学习的重要性。激发起员工学习的热情，培养了严谨的工作作风，营造出“比、学、赶、帮、超”的浓厚氛围，并为推动今后业务考核机制的常态化、制度
                    化起到了积极的作用。</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    mounted() {},
    methods: {},
    computed: {},
    components: {}
};
</script>
<style lang="less">
/*==============行业新闻详情====================*/
.newspagebox {
    /*	display:flex;
	flex-direction:row;
*/
    float: right;
    margin-right: 25px;
    padding-top: 19px;
    font-size: 12px;
}
.propage {
    color: #393939;
    margin-right: 26px;
    display: inline-block;
}
.propage i {
    font-style: normal;
    color: #c9c9c9;
}
.nextpage {
    color: #479ceb;
    display: inline-block;
}
.newsbox {
    width: 870px;
    margin: 0 auto;
}
.newstitle {
    font-size: 24px;
    color: #222222;
    text-align: center;
    margin-top: 21px;
}
.newstime {
    font-size: 16px;
    color: #888888;
    text-align: center;
    margin-top: 22px;
}
.newsimg {
    margin-top: 42px;
}
.maindetail {
    width: 100%;
    padding-left: 0;
}
.maindetail p {
    margin-top: 25px;
}
</style>
