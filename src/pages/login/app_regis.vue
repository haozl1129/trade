<!--
@file: 主APP引入文件
-->
<template>
    <div id="app" class="login-app">
        <Header class="login-header"></Header>
        <Register class="regis-component"></Register>
        <Footer class=""></Footer>
    </div>
</template>

<style lang="less">
.login-app {
    height: 100%;
    width: 100%;
    .regis-component {
        margin-bottom: 40px;
    }
    .login-footer {
        width: 100%;
        bottom: 0;
        position: absolute;
    }
}
</style>

<script>
import { AppMain, Footer, Header } from '@/components/layout/index';
import Register from './register';
const mixin = {};

export default {
    components: {
        AppMain,
        Footer,
        Header,
        Register
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
