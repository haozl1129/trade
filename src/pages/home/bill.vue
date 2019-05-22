<template>
    <div class="bill-main">
        <!-- <h3>我的票据
            <div class="bill-but" @click="onGoPath">
                <i class="el-icon-upload"></i>
                <span>票据上传</span>
            </div>
        </h3>
         -->
        <div class="titlebox">
            <div class="maintitle">我的票据</div>
            <div class="uploadbtn" @click="onGoPath">票据上传</div>
        </div>
        <div class="option-box">
            <div>
                <span class="tiem-name">时间</span>
                <el-date-picker class="eltime" v-model="searchForm.createTimeStart" type="date" placeholder="开始" size="mini" value-format="yyyy-MM-dd">
                </el-date-picker>
                <span> - </span>
                <el-date-picker class="eltime" v-model="searchForm.createTimeEnd" type="date" placeholder="结束" size="mini" value-format="yyyy-MM-dd">
                </el-date-picker>
            </div>
            <div style="line-height: 28px;">
                <el-radio size="mini" v-model="searchForm.billState" label="0">未上架</el-radio>
                <el-radio size="mini" v-model="searchForm.billState" label="1">已上架</el-radio>
            </div>
            <div>
                <el-input size="mini" placeholder="请输入承兑人全称/票面金额/票据编号" v-model="searchForm.searchNm" class="input-with-select">
                    <el-button slot="append" @click="onSearchForm">搜索</el-button>
                </el-input>
            </div>
        </div>
        <el-table class="home-talbe" style="width: 100%" stripe :data="billList.rows" :default-sort="{prop: 'date', order: 'descending'}" size="small">
            <el-table-column align="center" prop="acceptorName" label="承兑人" sortable width="100" show-overflow-tooltip hover tooltip>
            </el-table-column>
            <el-table-column align="center" prop="billNo" label="票据编号" sortable show-overflow-tooltip>
            </el-table-column>
            <el-table-column align="center" prop="amount" label="票面金额(万)">
            </el-table-column>
            <el-table-column align="center" prop="yearInter,expcLntrt" label="年化利率%/每十万贴息(元)" width="130px">
                <template slot-scope="scope">{{scope.row.yearInter}}/{{scope.row.expcLntrt}}</template>
            </el-table-column>
            <el-table-column align="center" prop="dueDate" label="到期日期" width="130">
            </el-table-column>
            <el-table-column align="center" prop="discountAmount" label="贴现金额(元)">
            </el-table-column>
            <el-table-column align="center" prop="billState" label="状态" sortable>
                <template slot-scope="scope">{{ scope.row.billState | getStateName}}</template>
            </el-table-column>
            <el-table-column align="center" prop="billId" label="操作" width="150" fixed="right">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" content="竞价列表" placement="top-start">
                        <el-button v-if="scope.row.billState == 1 && scope.row.transType == '2'" @click="onOpenList(scope.row.billId)" class="but-sj" size="mini" icon="el-icon-search" circle></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
                        <el-button size="mini" v-if="scope.row.billState != 2 && scope.row.billState != 3" @click="onTtrsBillInfRemove(scope.row.billId)" type="danger" icon="el-icon-delete" circle></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="上架" placement="top-start">
                        <el-button v-if="scope.row.billState == 0" @click="onTrsBillInfUp(scope.row.billId)" class="but-sj" size="mini" type="warning" icon="el-icon-upload2" circle></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="下架" placement="top-start">
                        <el-button v-if="scope.row.billState == 1" @click="onTrsBillInfDown(scope.row.billId)" class="but-sj" size="mini" icon="el-icon-download" type="warning" circle></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
                        <el-button v-if="scope.row.billState == 0" @click="onEdit(scope.row.billId)" class="but-sj" size="mini" type="primary" icon="el-icon-edit" circle></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <div class="page-box">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageDate.currentPage" :page-sizes="pageDate.pageSizes" :page-size="pageDate.pageSize" :total="pageDate.pageTotal" layout="total, prev, pager, next, jumper">
            </el-pagination>
        </div>
        <el-dialog title="竞价列表" :visible="detailDialog" @close="onClose" append-to-body>
            <biddingList :billId="billId" @close="onClose"></biddingList>
        </el-dialog>
    </div>
</template>
<script>
import commonMixin from '@/mixin/search.js';
import { mapState, mapMutations, mapActions } from 'vuex';
import biddingList from '@/components/home/biddingList';

const mixin = {
    computed: {
        ...mapState({
            billList: 'billList'
        })
    },
    methods: {
        ...mapMutations({}),
        ...mapActions({
            getBillList: 'getBillList',
            postTrsBillInfDown: 'postTrsBillInfDown',
            postTrsBillInfUp: 'postTrsBillInfUp',
            postTrsBillInfRemove: 'postTrsBillInfRemove'
        })
    }
};
const tempSearch = {
    searchNm: '',
    billState: '',
    createTimeStart: '',
    createTimeEnd: ''
};
export default {
    mixins: [mixin, commonMixin(tempSearch)],
    data() {
        return {
            billId: 0,
            detailDialog: false
        };
    },
    mounted() {
        this.onSearch();
    },
    methods: {
        privateRequest(params) {
            params.createTimeStart = params.createTimeStart;
            params.createTimeEnd = params.createTimeEnd;
            return this.getBillList(params);
        },
        onGoPath() {
            this.$router.push({
                path: '/release'
            });
        },
        onTrsBillInfDown(billId) {
            this.postTrsBillInfDown({ billId: billId }).then(res => {
                if (res.code === 0)
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                this.onHoldSearch();
            });
        },
        onTrsBillInfUp(billId) {
            this.postTrsBillInfUp({ billId: billId }).then(res => {
                if (res.code === 0)
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                this.onHoldSearch();
            });
        },
        onTtrsBillInfRemove(billId) {
            this.$confirm('确认是否删除票据?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.postTrsBillInfRemove({ ids: billId }).then(res => {
                    if (res.code === 0) {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.onHoldSearch();
                    }
                });
            });
        },
        onEdit(billId) {
            this.$router.push({
                path: '/release',
                query: { billId: billId }
            });
        },
        onClose() {
            this.detailDialog = false;
            this.onHoldSearch();
        },
        onOpenList(billId) {
            this.billId = billId;
            this.detailDialog = true;
        }
    },
    computed: {},
    components: {
        biddingList: biddingList
    },
    filters: {
        getStateName(val) {
            if (val == 0) {
                return '下架';
            } else if (val == 1) {
                return '上架';
            } else if (val == 2) {
                return '交易中';
            } else if (val == 3) {
                return '交易完成';
            }
        }
    }
};
</script>
<style lang="less">
@import '../../assets/css/mixin.less';
.bill-main {
    background: #fff;
    // padding: 0 30px;
    height: 100%;
    .titlebox {
        display: flex;
        justify-content: space-between;
    }
    .smallfont {
        font-size: 12px;
    }
    .uploadbtn {
        width: 105px;
        height: 30px;
        background: url(../../assets/images/home/icon15.png) 13px center
            no-repeat #fff;
        border: 1px solid #bbbbbb;
        border-radius: 30px;
        margin-top: 19px;
        font-size: 14px;
        color: #222222;
        text-align: center;
        line-height: 30px;
        margin-right: 20px;
        padding-left: 26px;
    }
    .bill-but {
        float: right;
        color: #0073ff;
        font-size: 14px;
        background: rgba(246, 250, 255, 1);
        border: 1px solid rgba(153, 153, 153, 1);
        height: 36px;
        width: 113px;
        line-height: 36px;
        text-align: center;
        margin-top: 20px;
        cursor: pointer;
    }
    .option-box {
        .flexbox();
        .flexjustify(space-between);
        padding: 20px 24px 10px;
        .tiem-name {
            margin-right: 10px;
        }
        .eltime {
            width: 135px;
        }
    }
    .el-table {
        text-align: center;
    }
    .jia-type {
        margin-top: 20px;
        a {
            font-size: 14px;
            margin-right: 62px;
            &.selected {
                color: #0073ff;
            }
        }
    }
    .bank-box {
        .center();
        .flexjustify(space-between);
        margin-top: 10px;
        padding: 0 17px 0 53px;
        height: 100px;
        text-align: center;
        border: 1px solid rgba(202, 202, 202, 1);
        position: relative;
        .bank-col {
            font-size: 14px;
            &.col-checkbox {
                position: absolute;
                left: 20px;
            }
            .col-r-1 {
                color: #333333;
                margin-bottom: 18px;
            }
            .col-r-2 {
                color: #999999;
            }
            .col-r-a-1 {
                margin-bottom: 15px;
                color: #0073ff;
            }
            .col-r-a-2 {
                color: #333333;
            }
            .but-sj {
                width: 96px;
            }
        }
    }
    .page-box {
        margin-top: 30px;
    }
}
</style>
