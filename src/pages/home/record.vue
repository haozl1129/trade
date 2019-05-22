<template>
    <div class="record-main">
        <h3>交易记录</h3>
        <div class="record-option">
            <div class="option-item">
                <span class="item-name">时间</span>
                <el-date-picker class="eltime" v-model="searchForm.startDate" type="date" placeholder="开始" size="mini" value-format="yyyyMMdd">
                </el-date-picker>
                <span> - </span>
                <el-date-picker class="eltime" v-model="searchForm.endDate" type="date" placeholder="结束" size="mini" value-format="yyyyMMdd">
                </el-date-picker>
            </div>
            <div class="option-item">
                <span class="item-name">类别</span>
                <el-select v-model="searchForm.transType" placeholder="请选择" size="mini">
                    <el-option label="收费" value="02">
                    </el-option>
                    <el-option label="结息" value="03">
                    </el-option>
                    <el-option label="充值入金" value="12">
                    </el-option>
                    <el-option label="提现出金" value="13">
                    </el-option>
                    <el-option label="交易" value="14">
                    </el-option>
                    <el-option label="退款" value="15">
                    </el-option>
                    <el-option label="其他" value="99">
                    </el-option>
                </el-select>
            </div>

            <div class="option-item">
                <el-button size="mini" @click="onSearchForm">查询</el-button>
            </div>
        </div>
        <div class="table-box">
            <el-table size="small"  :data="(payList.obj && payList.obj.dataTable) ? payList.obj.dataTable.rows : []" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
                <el-table-column align="center" prop="transType" label="交易类型" sortable>
                    <template slot-scope="scope">{{ scope.row.transType | getTransTypeName}}</template>
                </el-table-column>
                <el-table-column align="center" prop="transDate" label="交易时间" sortable>
                    <template slot-scope="scope">{{ scope.row.transDate }}</template>
                </el-table-column>
                <el-table-column align="center" prop="orderNo" label="订单编号" sortable show-overflow-tooltip>
                </el-table-column>
                <el-table-column align="center" prop="amount" label="交易金额">
                </el-table-column>
                <el-table-column align="center" prop="rcvAmt" label="收入金额">
                </el-table-column>
                <el-table-column align="center" prop="payAmt" label="支出金额">
                </el-table-column>
                <!-- <el-table-column align="center" prop="billId" label="操作">
                    <template slot-scope="scope">
                        <el-button size="small" @click="onDelisting(scope.row)" type="primary">详情</el-button>
                    </template>
                </el-table-column> -->
            </el-table>
        </div>
        <div class="page-box">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageDate.currentPage" :page-sizes="pageDate.pageSizes" :page-size="pageDate.pageSize" :total="pageDate.pageTotal" layout="total, prev, pager, next, jumper">
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
            payList: 'payList'
        })
    },
    methods: {
        ...mapMutations({}),
        ...mapActions({
            getPayList: 'getPayList'
        })
    }
};
const tempSearch = {
    startDate: '',
    endDate: '',
    transType: null
};
export default {
    mixins: [mixin, commonMixin(tempSearch)],
    data() {
        return {};
    },
    mounted() {
        this.onSearch();
    },
    methods: {
        privateRequest(params) {
            params.PageId = params.pageNum;
            params.PageSize = params.pageSize;
            delete params.pageNum;
            delete params.pageSize;
            return this.getPayList(params);
        }
    },
    filters: {
        getTransTypeName(val) {
            if (val === '02') {
                return '收费';
            } else if (val === '03') {
                return '结息';
            } else if (val === '12') {
                return '充值入金';
            } else if (val === '13') {
                return '提现出金';
            } else if (val === '14') {
                return '交易';
            } else if (val === '15') {
                return '退款';
            } else if (val === '99') {
                return '其他';
            }
        }
    },
    computed: {},
    components: {}
};
</script>
<style lang="less">
@import '../../assets/css/mixin.less';
@import '../../assets/css/element-rewrite.less';
.record-main {
    background-color: #fff;
    height: 100%;
    // padding: 0 30px;
    .el-table thead th {
        font-size: 14px;
        padding: 0;
        text-align: center;
    }
    .record-option {
        .flexbox();
        .flexjustify(space-between);
        // border-bottom: 1px solid rgba(202, 202, 202, 1);
        // padding-bottom: 10px;
        margin-top: 16px;
        padding: 0 24px;
        .item-name {
            margin-right: 10px;
        }
        .eltime {
            width: 150px;
        }
        .el-input {
            width: 150px;
        }
    }
}
</style>
