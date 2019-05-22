<!--
@file: 主APP引入文件
-->
<template>
    <div id="app" class="login-app">
        <Header></Header>
        <AppMain></AppMain>
        <Footer></Footer>
    </div>
</template>

<style lang="less">
.login-app {
    // height: 100%;
    // .login-header {
    //     width: 100%;
    //     position: absolute;
    //     top: 0;
    //     background-color: rgba(9, 45, 127, 0.6);
    //     color: #fff;
    //     .header .headbox .nav > ul > li {
    //         color: #fff;
    //     }
    // }
    // .login-appmain {
    //     height: 100%;
    // }
}
</style>

<script>
import { AppMain, Footer, Header } from '@/components/layout/index';
const mixin = {};

export default {
    components: {
        AppMain,
        Footer,
        Header
    },
    props: {
        projectName: {
            type: String,
            default: ''
        }
    },
    mixins: [mixin],
    data() {
        return {
            userName: ''
        };
    },
    computed: {},
    mounted() {},
    methods: {}
};
</script>
