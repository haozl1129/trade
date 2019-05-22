<template>
  <div class="servicefee">
    <el-table :data="serviceFee.rows" size='small' border>
      <el-table-column prop="orderNo" label="订单号" ></el-table-column>
      <el-table-column prop="createTime" label="时间" width="200"></el-table-column>
      <el-table-column prop="fee" label="金额" width="150"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
const mixin = {
    computed: {
        ...mapState({
            serviceFee: 'serviceFee'
        })
    },
    methods: {
        ...mapMutations({}),
        ...mapActions({
            getServiceFee: 'getServiceFee'
        })
    }
};

export default {
    mixins:[mixin],

    data(){
        return {

        }
    },
    mounted(){
        this.init()
    },
    methods:{
        init(){
            this.getServiceFee()
        }
    }

};
</script>

<style lang="less" scoped>

</style>
