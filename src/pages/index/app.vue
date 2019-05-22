<template>
  <div class="wx-urm" id="app">
    <Header :theme="theme" pageNmae="index"></Header>
    <AppMain></AppMain>
    <!-- copyright -->
    <Footer class="copyright" pageNmae="index"></Footer>
    <RightFloat></RightFloat>
  </div>
</template>

<style lang="less">
@import '../../assets/css/index.less';
.wx-urm {
    height: 100%;
}
</style>

<script>
import { AppMain, Footer, Header, RightFloat } from '@/components/layout/index';
import cookie from '@/util/cookie.js';
import config from '@/config/index.js';
import { mapState, mapMutations, mapActions } from 'vuex';
const mixin = {
    computed: {
        ...mapState({})
    },
    methods: {
        ...mapMutations({ setIsLogin: 'setIsLogin' }),
        ...mapActions({})
    }
};

export default {
    components: {
        AppMain,
        Header,
        Footer,
        RightFloat
    },
    mixins: [mixin],
    data() {
        return {
            theme: ''
        };
    },
    watch: {
        // eslint-disable-next-line no-unused-vars
        $route(to, from) {
            if (to.name === 'index' || to.path === '/') {
                this.theme = '';
            } else {
                this.theme = 'white';
            }
        }
    },
    computed: {},
    mounted() {
        // isLogin: 'isLogin' state中判断登陆
        const token = cookie.getCookie(config.tokenKey);
        console.log('app login');
        if (token) {
            this.setIsLogin(true);
        } else {
            this.setIsLogin(false);
        }
    },
    methods: {}
};
</script>
