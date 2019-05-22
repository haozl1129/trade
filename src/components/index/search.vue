<template>
  <div class="search-box">
    <span
      :class="{'label_all': selected.indexOf(item.key) !== -1}"
      :key="item.key"
      @click="onSelected(item)"
      v-for="item in searchList"
    >{{item.value}}</span>
  </div>
</template>
<script>
/**
 * 交易大厅 选择条件
 * 组件事件 onSelected
 * searchList: []
 * item:  {
 * key
 * value: 
 * selected
 * }
 */
export default {
    props: {
        searchList: {
            type: Array,
            default: () => []
        },
        isRadio: {
            type: Boolean,
            default: () => false
        }
    },
    data() {
        return {
            // 选中 key 值
            selected: []
        };
    },
    mounted() {},
    methods: {
        onSelected(item) {
            const allKey = -1; // 全部
            if (item.key === allKey) {
                this.selected = [];
                this.selected.push(item.key);
            } else {
                // 多选
                const selectIndex = this.selected.indexOf(item.key);
                if (selectIndex !== -1) {
                    this.selected.splice(selectIndex, 1);
                } else {
                    if (this.selected.indexOf(allKey) !== -1) {
                        this.selected.splice(this.selected.indexOf(allKey), 1);
                    }
                    if (this.isRadio) {
                        this.selected = [item.key];
                    } else {
                        this.selected.push(item.key);
                    }
                }

                // // 单选
                // if (this.isRadio) {
                //     if (this.selected === item.key) {
                //         this.selected = [];
                //     } else {
                //         this.selected = [item.key];
                //     }
                // }
            }
            if (this.selected.length > 0 && this.selected.indexOf(-1) !== -1) {
                this.$emit('onSelected', null);
            } else {
                this.$emit(
                    'onSelected',
                    Array.isArray(this.selected)
                        ? this.selected.join(',')
                        : this.selected
                );
            }
        },
        onClear() {
            this.selected = [];
        }
    },
    computed: {}
};
</script>

<style lang="less">
.search-box {
    display: inline-block;
    span {
        background: #f1f1f1;
        padding: 4px 13px;
        border-radius: 19px;
        text-align: center;
        font-size: 14px;
        color: #888888;
        display: inline-block;
        margin-right: 20px;
        cursor: pointer;
        &.label_all {
            padding: 3px 12px;
            background: #479ceb;
            border: 1px solid #479ceb;
            color: #fff;
        }
    }
}
</style>


