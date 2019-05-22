import Vuex from 'vuex';
import reqRegister from '@/service/register';
import { createStore } from '../base/index';
import Vue from 'vue';
Vue.use(Vuex);

const { state, actions, mutations } = createStore(reqRegister);
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
