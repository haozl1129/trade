<template>
    <div class="message-main">
        <h3>消息中心</h3>
        <div class="table-box">
            <el-table :data="inMailList.rows" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}" size="small">
                <el-table-column prop="msgCntnt" label="内容">
                </el-table-column>
                <el-table-column prop="sndTm" label="交易时间" sortable width="180">
                </el-table-column>
            </el-table>
        </div>
        <!-- <div class="list-box">
            <div class="list-item" v-for="item in inMailList.rows">
                <div class="item-r-1">
                    <span>交易成功</span>
                    <span>{{item.createTime}}</span>
                </div>
                <div class="item-r-2">
                    {{item.msgTpCd}}
                </div>
            </div>
        </div> -->
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
            inMailList: 'inMailList'
        })
    },
    methods: {
        ...mapMutations({}),
        ...mapActions({
            getInMailList: 'getInMailList'
        })
    }
};
export default {
    mixins: [mixin, commonMixin()],
    data() {
        return {};
    },
    mounted() {
        this.onSearch();
    },
    methods: {
        privateRequest(params) {
            return this.getInMailList(params);
        }
    },
    computed: {},
    components: {}
};
</script>
<style lang="less">
@import '../../assets/css/mixin.less';
.message-main {
    background-color: #fff;
    height: 100%;
    font-size: 14px;
    color: #666;
    // padding: 0 45px;
    .list-box {
        margin-top: 26px;

        .list-item {
            margin: 0 15px;
            padding: 10px 20px;
            border: 1px solid rgba(202, 202, 202, 1);
            border-bottom: 0;
            &:last-child {
                border-bottom: 1px solid rgba(202, 202, 202, 1);
            }
            .item-r-1 {
                .flexbox();
                .flexjustify(space-between);
                margin-bottom: 15px;
            }
        }
    }
    .page-box {
        margin-top: 30px;
    }
}
</style>
