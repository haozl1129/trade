import Vue from 'vue';
import Vuex from 'vuex';
import reqLogin from '@/service/login';
import { createStore } from '../base/index';
Vue.use(Vuex);

const { state, actions, mutations } = createStore(reqLogin);
const modules = {};
const getters = {};

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
