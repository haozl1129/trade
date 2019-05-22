<template>
  <div class="order-countdown">{{eTime}}</div>
</template>
<script>
export default {
    props: {
        expiratTime: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            eTime: '',
            intervalTime: ''
        };
    },
    watch: {
        // eslint-disable-next-line no-unused-vars
        expiratTime(to, from) {
            if (to.expiratTime) {
                clearInterval(this.intervalTime);
                this.init();
            }
        }
    },
    mounted() {
        console.log(this.expiratTime);
        this.init();
    },
    methods: {
        init() {
            const endtime =
                new Date(this.expiratTime).getTime() - new Date().getTime();
            if (endtime > 0) {
                this.intervalTime = setInterval(() => {
                    const t =
                        new Date(this.expiratTime).getTime() -
                        new Date().getTime();
                    if (t > 0) {
                        this.eTime = this.MillisecondToDate(t);
                    } else {
                        this.eTime = '';
                        clearInterval(this.intervalTime);
                        this.$emit('onRefresh');
                    }
                }, 1000);
            }
        },
        MillisecondToDate(msd) {
            var time = parseFloat(msd) / 1000;
            if (null != time && '' != time) {
                if (time > 60 && time < 60 * 60) {
                    time =
                        parseInt(time / 60.0) +
                        '分' +
                        parseInt(
                            (parseFloat(time / 60.0) - parseInt(time / 60.0)) *
                                60
                        ) +
                        '秒';
                } else if (time <= 60) {
                    time = parseInt(time) + '秒';
                } else {
                    time =
                        // parseInt(time / 3600.0) +
                        // '时' +
                        parseInt(
                            (parseFloat(time / 3600.0) -
                                parseInt(time / 3600.0)) *
                                60
                        ) +
                        '分' +
                        parseInt(
                            (parseFloat(
                                (parseFloat(time / 3600.0) -
                                    parseInt(time / 3600.0)) *
                                    60
                            ) -
                                parseInt(
                                    (parseFloat(time / 3600.0) -
                                        parseInt(time / 3600.0)) *
                                        60
                                )) *
                                60
                        ) +
                        '秒';
                }
            }
            return time;
        }
    },
    computed: {}
};
</script>

<style lang="less">
@import '../../assets/css/mixin.less';
.order-countdown {
}
</style>


