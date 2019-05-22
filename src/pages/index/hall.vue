<template>
  <div class="hall-main white_W1200">
    <div class="whitebg">
      <div class="tradingtabbox">
        <div class="lefttab">
          <ul>
            <li :class="{'bluebg': this.searchForm.billType === 0}" @click="onBillType">银票</li>
            <li :class="{'bluebg': this.searchForm.billType === 1}" @click="onBillType">商票</li>
          </ul>
        </div>
        <div class="tradingsearchbox">
          <el-input
            class="trading_search"
            placeholder="请输入需要搜索的关键字"
            size="small"
            v-model="searchForm.search"
          >
            <el-button @click="onSearchForm" icon="el-icon-search" slot="append"></el-button>
          </el-input>
          <div @click="onPath('release', false)" class="release">发布票据</div>
        </div>
      </div>
      <div class="labelbox">
        <ul>
          <li>
            <span class="labeltitle">订单状态</span>
            <search-box :searchList="statList" @onSelected="onSelectedState" ref="searcha"></search-box>
          </li>
          <li v-if="this.searchForm.billType === 0">
            <span class="labeltitle">承兑人</span>
            <search-box
              :searchList="acceptorNameList"
              @onSelected="onSelectedAcceptor"
              ref="searchb"
            ></search-box>
          </li>
          <li>
            <span class="labeltitle">票面金额</span>
            <search-box
              :isRadio="true"
              :searchList="amountList"
              @onSelected="onSelectedAmount"
              ref="searchc"
            ></search-box>
            <el-input
              @change="onChangeSearch"
              class="labeltext"
              placeholder="最小金额"
              size="small"
              v-model="searchForm.accountMin"
            ></el-input>
            <span class="daybox">
              <span class="day">万</span>
              <span class="dayarrow">
                <img src="../../assets/images/index/icon33.png">
              </span>
            </span>
            <el-input
              @change="onChangeSearch"
              class="labeltext"
              placeholder="最大金额"
              size="small"
              v-model="searchForm.accountMax"
            ></el-input>
          </li>
          <li>
            <span class="labeltitle">天数</span>
            <search-box
              :isRadio="true"
              :searchList="dayList"
              @onSelected="onSelectedDay"
              ref="searchd"
            ></search-box>
            <el-input
              @change="onChangeSearch"
              class="labeltext"
              placeholder="最小天数"
              size="small"
              v-model="searchForm.dayCountMin"
            ></el-input>
            <span class="daybox">
              <span class="day">天</span>
              <span class="dayarrow">
                <img src="../../assets/images/index/icon33.png">
              </span>
            </span>
            <el-input
              @change="onChangeSearch"
              class="labeltext"
              placeholder="最大天数"
              size="small"
              v-model="searchForm.dayCountMax"
            ></el-input>
          </li>
          <li>
            <span class="labeltitle">瑕疵</span>
            <search-box
              :isRadio="true"
              :searchList="defectList"
              @onSelected="onSelectedDefect"
              ref="searche"
            ></search-box>
          </li>
        </ul>
      </div>
      <div class="pricebox">
        <ul>
          <li>
            <span class="ticketprice">收票价格</span>
            <span>年化利率</span>
            <el-input
              @change="onSearchForm"
              class="yearbox"
              size="mini"
              v-model="searchForm.yearInter"
            ></el-input>
            <span class="poundage">% / 每十万贴息</span>
            <el-input
              @change="onSearchForm"
              class="yearbox"
              size="mini"
              v-model="searchForm.expcLntrt"
            ></el-input>
            <span class="poundage">元</span>
            <span class="poundage poundage_eg">如：输入3.6/300，检索出可买的票源</span>
            <el-button @click="onSearchClear()" icon="el-icon-delete" size="mini" type="primary"></el-button>
            <el-button @click="onSearchForm" icon="el-icon-search" size="mini" type="primary">搜索</el-button>
          </li>
        </ul>
      </div>
      <!-- <div class="selectbox ">
                <div class="seltitle">筛选条件</div>
                <div class="condition">50-100万<span>×</span></div>
                <div class="condition">90-160天<span>×</span></div>
            <div class="clear_condition"><img src="../../assets/images/index/icon17.png">清空条件</div>
      </div>-->
    </div>
    <div class="table-box">
      <el-table
        :data="trsBillInfList.rows"
        :default-sort="{prop: 'date', order: 'descending'}"
        @sort-change="onSortChange"
        border
        header-align="center"
        size="medium"
        style="width: 100%"
      >
        <el-table-column align="center" label="发布时间" prop="createTime" sortable width="180"></el-table-column>
        <!-- 承兑人 -->
        <el-table-column
          align="center"
          class="fontwieght"
          label="承兑人"
          prop="acceptorName"
          sortable
          width="180"
        >
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.acceptorName" effect="light" placement="top">
              <span>{{ scope.row.acceptorName | formatSubStr(6) }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column align="center" label="金额(万)" prop="amount" sortable width="100"></el-table-column>
        <el-table-column align="center" label="到期日" prop="dueDate" sortable></el-table-column>
        <el-table-column align="center" label="每十万贴息（元）" prop="expcLntrt" sortable width="180">
          <template slot-scope="scope">{{ (scope.row.expcLntrt || 0).toFixed(2) }}</template>
        </el-table-column>
        <el-table-column align="center" label="剩余天数" prop="remainDays" sortable></el-table-column>
        <el-table-column align="center" label="利率" prop="yearInter" sortable>
          <template slot-scope="scope">{{ scope.row.yearInter }} %</template>
        </el-table-column>
        <el-table-column align="center" label="交易平均背书时长" prop="averageTime" width="90"></el-table-column>
        <el-table-column align="center" label="操作" prop="billId">
          <template slot-scope="scope">
            <el-button
              :disabled="true"
              class="but-disabled"
              size="small"
              v-if="isHoliday.code === 500"
            >非交易</el-button>
            <el-button
              @click="onBidding(scope.row)"
              class="but-pick"
              size="small"
              type="primary"
              v-if="isHoliday.code !== 500 && scope.row.billState == '1' && scope.row.transType == '2'"
            >我要竞价</el-button>
            <el-button
              @click="onDelisting(scope.row)"
              class="but-pick"
              size="small"
              type="primary"
              v-if="isHoliday.code !== 500 && scope.row.billState == '1' && scope.row.transType == '1'"
            >我要摘票</el-button>
            <el-button
              :disabled="true"
              class="but-disabled"
              size="small"
              v-if="isHoliday.code !== 500 && scope.row.billState != '1'"
            >{{scope.row.billState | getStateName}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-box">
      <el-pagination
        :current-page="pageDate.currentPage"
        :page-size="pageDate.pageSize"
        :page-sizes="pageDate.pageSizes"
        :total="pageDate.pageTotal"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        layout="total, prev, pager, next, jumper"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import commonMixin from '@/mixin/search.js';
import searchBox from '@/components/index/search';
import urls from '@/config/url_enum.js';
const tempSearch = {
    billType: 0, // 1：银票、0：商票
    acceptorType: '', // 承兑人类型
    accountType: '', // 票面金额类型
    accountMin: '', // 票面金额最小
    accountMax: '', // 票面金额最大
    dayCountType: '', // 剩余天数
    dayCountMin: '', // 剩余x天数
    dayCountMax: '', // 剩余m天数
    search: '', // 搜索关键字
    yearInter: '',
    expcLntrt: '',
    billInfo: '' // 瑕疵
};
const mixin = {
    computed: {
        ...mapState({
            trsBillInfList: 'trsBillInfList',
            isLogin: 'isLogin',
            acceptorTypeList: 'acceptorTypeList',
            isHoliday: 'isHoliday'
        })
    },
    methods: {
        ...mapMutations({}),
        ...mapActions({
            getTrsBillInfList: 'getTrsBillInfList',
            getAcceptorTypeList: 'getAcceptorTypeList',
            getIsHoliday: 'getIsHoliday'
        })
    }
};

const statList = [
    {
        key: -1,
        value: '全部'
    },
    // {
    //     key: 0,
    //     value: '下架'
    // },
    {
        key: 1,
        value: '待交易'
    },
    {
        key: 2,
        value: '交易中'
    },
    {
        key: 3,
        value: '交易完成'
    }
];
const acceptorNameList = [
    {
        key: -1,
        value: '全部'
    },
    {
        key: 1,
        value: '国股'
    },
    {
        key: 2,
        value: '城商'
    },
    {
        key: 3,
        value: '三农'
    },
    {
        key: 4,
        value: '村镇'
    },
    {
        key: 5,
        value: '外资'
    },
    {
        key: 6,
        value: '财务公司'
    },
    {
        key: 7,
        value: '商票'
    }
];
const amountList = [
    {
        key: -1,
        value: '全部'
    },
    {
        key: 'Below10',
        value: '10万以下'
    },
    {
        key: 'Between10To50',
        value: '10万-50万'
    },
    {
        key: 'Between5To100',
        value: '50万-100万'
    },
    {
        key: 'Between100To500',
        value: '100万-500万'
    },
    {
        key: 'MoreThan500',
        value: '500万以上'
    }
];
const dayList = [
    {
        key: -1,
        value: '全部'
    },
    {
        key: 'LessThan90',
        value: '90天以内'
    },
    {
        key: 'Between90To160',
        value: '90-160天'
    },
    {
        key: 'Between160To185',
        value: '161-185天'
    },
    {
        key: 'Between185To330',
        value: '186-330天'
    },
    {
        key: 'MoreThan331',
        value: '330天以上'
    }
];
const defectList = [
    {
        key: 0,
        value: '有瑕疵'
    },
    {
        key: 1,
        value: '无瑕疵'
    }
];
export default {
    // store: store.default,
    mixins: [mixin, commonMixin(tempSearch)],
    data() {
        return {
            statList: statList,
            acceptorNameList: acceptorNameList,
            amountList: amountList,
            dayList: dayList,
            defectList: defectList,
            inpu: '',
            tags: [{ name: '交易完成' }, { name: '交易完成2' }],
            currentPage4: 4
        };
    },
    mounted() {
        this.getAcceptorTypeList().then(res => {
            const acceptortypeList = [
                {
                    key: -1,
                    value: '全部'
                }
            ];
            if (res.code === 0) {
                const tlist = res.rows.map(item => {
                    return {
                        key: item.dictValue,
                        value: item.dictLabel
                    };
                });
                this.acceptorNameList = acceptortypeList.concat(tlist);
            }
        });
        this.getIsHoliday();
        this.onSearch();
    },
    methods: {
        privateRequest(params) {
            return this.getTrsBillInfList(params);
        },
        handleClose(tag) {
            this.tags.splice(this.tags.indexOf(tag), 1);
        },
        onDelisting(row) {
            if (!this.isLogin) {
                window.top.location.href =
                    location.origin + '/' + urls['login'];
                return;
            }
            this.$router.push({
                path: '/delist',
                query: { billId: row.billId, transType: row.transType }
            });
        },
        // 竞价
        onBidding(row) {
            if (!this.isLogin) {
                window.top.location.href =
                    location.origin + '/' + urls['login'];
                return;
            }
            this.$router.push({
                path: '/delist',
                query: { billId: row.billId, transType: row.transType }
            });
        },
        onPath(path, isBefore) {
            if (!this.isLogin) {
                window.top.location.href =
                    location.origin + '/' + urls['login'];
                return;
            }
            if (isBefore) {
                this.$router.push({
                    path: '/' + path
                });
            } else {
                // console.log(location.origin + '/' + urls[path]);
                window.top.location.href = location.origin + '/' + urls[path];
            }
        },
        onChangeSearch() {
            this.onSearchForm();
        },
        // 票据类型选择
        onBillType() {
            this.searchForm.billType = this.searchForm.billType === 0 ? 1 : 0;
            this.onSearchForm();
        },
        onSelectedState(params) {
            console.log(params);
            this.searchForm.billState = params;
            this.onSearchForm();
        },
        onSelectedAcceptor(params) {
            console.log(params);
            this.searchForm.acceptorType = params;
            this.onSearchForm();
        },
        onSelectedAmount(params) {
            console.log(params);
            this.searchForm.accountType = params;
            this.onSearchForm();
        },
        onSelectedDay(params) {
            console.log(params);
            this.searchForm.dayCountType = params;
            this.onSearchForm();
        },
        onSelectedDefect(params) {
            console.log(params);
            this.searchForm.billInfo = params;
            this.onSearchForm();
        },
        onSearchClear() {
            this.$refs['searcha'].onClear();
            this.$refs['searchb'].onClear();
            this.$refs['searchc'].onClear();
            this.$refs['searchd'].onClear();
            this.$refs['searche'].onClear();
            this.onReset();
        }
    },
    computed: {
        getOptions() {}
    },
    filters: {
        getStateName(val) {
            if (val == 0) {
                return '下架';
            } else if (val == 1) {
                return '待交易';
            } else if (val == 2) {
                return '交易中';
            } else if (val == 3) {
                return '交易完成';
            }
        }
    },
    components: {
        'search-box': searchBox
    }
};
</script>
<style lang="less">
@import '../../assets/css/element-rewrite.less';
.hall-main {
    &.white_W1200 {
        margin-top: 10px;
    }
    background: none;
    .whitebg {
        background: #fff;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .fontwieght {
        font-weight: 900;
    }
    .tradingtabbox {
        //display: flex;
        //justify-content: space-between;
        line-height: 40px;
        height: 40px;
    }

    .lefttab ul li {
        float: left;
        width: 120px;
        height: 40px;
        text-align: center;
        font-size: 16px;
        color: #222222;
        line-height: 40px;
        cursor: pointer;
    }
    .lefttab .bluebg {
        background: #479ceb;
        color: #fff;
    }
    .tradingsearchbox {
        display: flex;
        flex-direction: row;
        margin-top: 13px;
        float: right;
    }
    .trading_search {
        width: 253px;
        height: 30px;
        padding-left: 20px;
        line-height: 30px;
        font-size: 14px;
        color: #c1c1c1;
        margin-right: 19px;
        .el-input__inner {
            border: 1px solid #e5e5e5;
            border-right: 0px;
            border-radius: 35px 0 0 35px;
            // background: url(../../assets/images/index/icon16.png) 205px center
            //     no-repeat;
        }
        .el-input-group__append {
            background-color: #fff;
            border-radius: 0 35px 35px 0;
            padding: 0 10px;
        }
    }
    .release {
        width: 105px;
        height: 30px;
        border: 1px solid #e5e5e5;
        border-radius: 35px;
        font-size: 14px;
        color: #222222;
        text-align: center;
        line-height: 30px;
        background: url(../../assets/images/index/icon32.png) 10px center
            no-repeat;
        padding-left: 20px;
        margin-right: 17px;
        cursor: pointer;
    }
    .labelbox {
        width: 1120px;
        margin: 0 auto;
        border-bottom: 1px solid #e3e3e3;
    }

    .labelbox ul li {
        margin-top: 23px;
    }
    .labelbox ul li > span {
        background: #f1f1f1;
        padding: 4px 13px;
        border-radius: 19px;
        text-align: center;
        font-size: 14px;
        color: #888888;
        display: inline-block;
        margin-right: 20px;
        cursor: pointer;
    }
    .labelbox ul li:nth-last-child(1) {
        margin-bottom: 18px;
    }
    .labelbox ul li .labeltitle {
        width: 77px;
        display: inline-block;
        font-size: 14px;
        color: #666666;
        margin-right: 0px;
        background: none;
        padding: 0;
        text-align: left;
        margin-left: 12px;
    }
    .labelbox ul li .daybox {
        position: relative;
        background: none;
        padding: 0;
        margin-right: 0;
    }
    .labelbox ul li .labeltext {
        width: 96px;
        height: 28px;
        text-align: center;
        background: #fff;
        // border: 1px solid #e3e3e3;
        display: inline-block;
        position: relative;
        top: -1px;
        font-size: 14px;
        line-height: 28px;
        margin-right: 0px;
        border-radius: 0;
        padding: 0;
    }
    .labelbox ul li .day {
        display: inline-block;
        font-size: 13px;
        color: #479ceb;
        position: absolute;
        top: -13px;
        left: 15px;
    }
    .dayarrow {
        display: inline-block;
        width: 51px;
        position: relative;
        background: none;
    }
    .labelbox ul li .label_all {
        background: #479ceb;
        border: 1px solid #479ceb;
        color: #fff;
    }
    .pricebox {
        width: 1120px;
        height: 54px;
        margin: 0 auto;
        border-bottom: 1px solid #e3e3e3;
        ul li {
            .el-button {
                span {
                    line-height: 0;
                    color: #fff;
                    font-size: 12px;
                }
            }
            span {
                font-size: 14px;
                color: #666666;
                line-height: 54px;
            }
        }
    }
    .ticketprice {
        margin-left: 12px;
        margin-right: 31px;
    }
    .yearbox {
        width: 96px;
        height: 28px;
        // border: 1px solid #e3e3e3;
        display: inline-block;
        position: relative;
        // top: 9px;
    }
    .pricebox ul li .poundage {
        margin-left: 5px;
    }
    .pricebox ul li .poundage_eg {
        font-size: 12px;
        color: #888888;
        margin-left: 27px;
        margin-right: 20px;
    }
    .selectbox {
        width: 1120px;
        margin: 0 auto;
        height: 59px;
        display: flex;
        flex-direction: row;
    }
    .seltitle {
        font-size: 14px;
        color: #666666;
        line-height: 59px;
        margin-right: 33px;
        margin-left: 12px;
    }
    .condition {
        font-size: 14px;
        color: #479ceb;
        width: 99px;
        height: 26px;
        border: 1px solid #e3e3e3;
        line-height: 26px;
        margin-top: 16px;
        text-align: center;
        margin-right: 10px;
    }
    .condition span {
        display: inline-block;
        font-size: 16px;
        color: #666666;
        float: right;
        margin-right: 5px;
    }
    .clear_condition {
        font-size: 14px;
        color: #888888;
        line-height: 59px;
        margin-left: 10px;
    }
    .clear_condition img {
        position: relative;
        top: 2px;
        right: 3px;
    }
    // --------------------- 以上新查询 --------------------
    .table-box {
        margin-top: 30px;
        .el-table {
            tr {
                height: 60px;
            }
            tr.hover-row {
                box-shadow: 0 0 20px rgba(50, 50, 50, 0.2);
            }
            tr.hover-row > td {
                // background-color: red;
            }
        }
        .but-pick {
            border: 1px solid #fe8617;
            color: #fe8617;
            background-color: #fff;
            border-radius: 32px;
            &:hover {
                background: #fe8617;
                color: #fff;
            }
        }
        .but-disabled {
            border-radius: 32px;
            // background-color: #888888;
        }
    }
    .page-box {
        margin-top: 30px;
        background-color: #fff;
        text-align: center;
        padding: 10px 0;
    }
}
</style>
