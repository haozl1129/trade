<template>
    <div class="bank-main">
        <div class="bankbanner">
            <div class="banksticktitle">&nbsp;</div>
            <!-- <div class="banksearch">输入授信承兑行／财务公司／商票承兑人</div> -->
            <div class="banksearch">
                <el-input class="trading_search" size="small" placeholder="输入授信承兑行／财务公司／商票承兑人" v-model="searchForm.bankName">
                    <el-button slot="append" icon="el-icon-search" @click="onSearchForm"></el-button>
                </el-input>
            </div>
            <!-- <div class="calculator"><img src="../../assets/images/index/icon53.png">贴息计算器</div> -->

            <div class="stepsbox">
                <div class="stepmiddle">
                    <div class="stepstitle">直贴流程</div>
                    <div class="rightsteps">
                        <div class="onesteps"><span class="sptepsicon"><img src="../../assets/images/index/icon56.png"></span>匹配直贴行</div>
                        <div class="stepsarrow"><img src="../../assets/images/index/icon58.png"></div>
                        <div class="onesteps"><span class="sptepsicon"><img src="../../assets/images/index/icon55.png"></span>联系客服</div>
                        <div class="stepsarrow"><img src="../../assets/images/index/icon58.png"></div>
                        <div class="onesteps"><span class="sptepsicon"><img src="../../assets/images/index/icon57.png"></span>网银背书</div>
                        <div class="stepsarrow"><img src="../../assets/images/index/icon58.png"></div>
                        <div class="onesteps"><span class="sptepsicon"><img src="../../assets/images/index/icon54.png"></span>银行付款</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="table-box">
            <el-table header-align="center" :data="stackList.rows" border style="width: 100%" @sort-change="onSortChange" :default-sort="{prop: 'date', order: 'descending'}">
                <el-table-column align="center" sortable prop="bankName" label="直贴行">
                </el-table-column>
                <el-table-column align="center" sortable prop="stateRate" label="国股">
                </el-table-column>
                <el-table-column align="center" sortable prop="cityRate" label="城商">
                </el-table-column>
                <el-table-column align="center" sortable prop="ruralRate" label="三农">
                </el-table-column>
                <el-table-column align="center" sortable prop="financeRate" label="财司">
                </el-table-column>
                <el-table-column align="center" sortable prop="agriRate" label="村镇">
                </el-table-column>
                <!-- <el-table-column align="center" sortable prop="yeaeRate" label="利率">
                    <template slot-scope="scope">{{ ((scope.row.yeaeRate || 0) * 100).toFixed(2) }} %</template>
                </el-table-column> -->
                <el-table-column align="center" sortable prop="updateTime" label="日期">
                    <template slot-scope="scope">{{scope.row.updateTime | formatTime('yyyy-MM-dd')}}</template>
                </el-table-column>
            </el-table>
        </div>
        <div class="page-box">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageDate.currentPage" :page-sizes="pageDate.pageSizes" :page-size="pageDate.pageSize" :total="pageDate.pageTotal" layout="total, prev, pager, next, jumper">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import commonMixin from '@/mixin/search.js';
import { mapState, mapMutations, mapActions } from 'vuex';
const mixin = {
    computed: {
        ...mapState({
            stackList: 'stackList'
        })
    },
    methods: {
        ...mapMutations({}),
        ...mapActions({
            getStackList: 'getStackList'
        })
    }
};
export default {
    // store: store.default,
    mixins: [mixin, commonMixin({ bankName: '' })],
    data() {
        return {};
    },
    mounted() {
        this.onSearch();
    },
    methods: {
        privateRequest(params) {
            return this.getStackList(params);
        }
    },
    computed: {},
    components: {}
};
</script>
<style lang="less">
.bank-main {
    .bankbanner {
        width: 1160px;
        height: 299px;
        margin: 0 auto;
        margin-top: 10px;
        background: url(../../assets/images/index/banner3.png) no-repeat;
    }
    .banksticktitle {
        font-size: 18px;
        color: #222222;
        padding-left: 29px;
        padding-top: 30px;
    }
    .banksearch {
        width: 470px;
        height: 50px;
        // background: url(../../assets/images/index/icon52.png) right 21px center
        //     no-repeat #479ceb;
        border-radius: 30px;
        margin: 0 auto;
        margin-top: 45px;
        font-size: 16px;
        color: #fff;
        line-height: 50px;

        input::-webkit-input-placeholder {
            /* placeholder颜色  */
            color: #fff;
            /* placeholder字体大小  */
            font-size: 16px;
        }
        .trading_search {
            width: 470px;
            height: 50px;
            line-height: 30px;
            font-size: 14px;
            color: #c1c1c1;
            margin-right: 19px;
            .el-input__inner {
                width: 455px;
                height: 50px;
                border: 1px solid #e5e5e5;
                border-right: 0px;
                border-radius: 35px 0 0 35px;
                background-color: #479ceb;
                color: #fff;
            }
            .el-input-group__append {
                background-color: #479ceb;
                border-radius: 0 35px 35px 0;
                padding: 0 16px;
                color: #fff;
                font-size: 23px;
            }
        }
    }
    .calculator img {
        position: relative;
        top: 3px;
        right: 6px;
    }
    .calculator {
        text-align: right;
        margin-top: 80px;
        margin-right: 19px;
        color: #fe8617;
        font-size: 14px;
    }
    .stepsbox {
        height: 70px;
        background: #fff;
        margin-top: 63px;
    }
    .stepmiddle {
        width: 1160px;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
    }
    .stepstitle {
        font-size: 22px;
        color: #222222;
        padding-left: 45px;
        line-height: 70px;
    }
    .rightsteps {
        margin-left: 83px;
        display: flex;
        flex-direction: row;
    }
    .onesteps {
        font-size: 18px;
        color: #666666;
        line-height: 70px;
    }
    .sptepsicon {
        display: inline-block;
        margin-right: 15px;
        position: relative;
        top: 14px;
    }
    .stepsarrow {
        width: 26px;
        height: 17px;
        margin: 27px 45px;
    }
    .table-box {
        width: 1160px;
        margin: 0 auto;
        .el-table .cell {
            line-height: 60px;
        }
    }
    .page-box {
        width: 1160px;
        margin: 0 auto;
        background-color: #fff;
        margin-top: 0px;
        padding: 37px 0;
    }
}
</style>
