<template>
    <div class="list-box">
        <el-table class="home-talbe" style="width: 100%" stripe :data="biddingList.rows" :default-sort="{prop: 'date', order: 'descending'}">
            <el-table-column align="center" prop="acceptorName" label="承兑人" sortable>
            </el-table-column>
            <el-table-column align="center" prop="billNo" label="票据编号" sortable>
            </el-table-column>
            <el-table-column align="center" prop="amount" label="票面金额（万元）">
            </el-table-column>
            <el-table-column align="center" prop="yearInter" label="年化利率">
            </el-table-column>
            <el-table-column align="center" prop="expcLntrt" label="每十万贴息（元）">
            </el-table-column>
            <el-table-column align="center" prop="discountAmount" label="贴现金额（元）">
            </el-table-column>
            <el-table-column align="center" prop="bidId" label="操作">
                <template slot-scope="scope">
                    <el-button @click="onNotarize(scope.row.bidId)" size="mini">售卖</el-button>
                </template>
            </el-table-column>
        </el-table>
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
            biddingList: 'biddingList'
        })
    },
    methods: {
        ...mapMutations({}),
        ...mapActions({
            getBiddingList: 'getBiddingList',
            postNotarize: 'postNotarize'
        })
    }
};
export default {
    mixins: [mixin, commonMixin()],
    props: {
        billId: {
            type: Number,
            default: ''
        }
    },
    data() {
        return {};
    },
    watch: {
        billId(to, from) {
            console.log('billId', to, from);
            this.getBiddingList({
                billId: to
            });
        }
    },
    mounted() {
        this.getBiddingList({
            billId: this.billId
        });
    },
    methods: {
        privateRequest(params) {
            return this.getBiddingList(params);
        },
        // 卖家出售
        onNotarize(billID) {
            this.postNotarize({ bidId: billID }).then(res => {
                if (res.code === 0) {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    });
                    this.$emit('close');
                }
            });
        }
    },
    computed: {},
    filters: {},
    components: {}
};
</script>
<style lang="less">

</style>
