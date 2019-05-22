import Vue from 'vue';
import Vuex from 'vuex';
import reqLogin from '@/service/home';
import { createStore } from '../base/index';
Vue.use(Vuex);

// 回调统一判断登陆
const callback = (result, commit) => {
    if (result && result.code === 3) {
        console.log('stsore login');
        commit('setIsLogin', false);
    }
};
const { state, actions, mutations } = createStore(reqLogin, callback);
const modules = {};
const getters = {
    isLogin: state => state.isLogin
};

Object.assign(state, {
    isLogin: false,
    userStat: 0 // 用户状态 0正常，1:未绑定企业
});
Object.assign(mutations, {
    setIsLogin(state, data) {
        console.log(state, data);
        state.isLogin = data;
    },
    setUserStat(state, data) {
        console.log(state, data);
        state.userStat = data;
    }
});

Object.assign(actions, {});
const store = new Vuex.Store({
    strict: true,
    actions,
    getters,
    state,
    mutations,
    modules
});

export default store;
