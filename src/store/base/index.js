/**
 * 根据service 创建store 注：store如果没有逻辑可以用
 * 
 * 目前创建 state，actions，mutations 部分
 */
import service from '@/service/service';
import { firstUpperCase } from '@/util/string.js';

/**
 * 根据service 创建store
 * @param {*} serviceUnit 
 */
export function createStore(serviceUnit, fn = () => {}) {
    const store = {
        state: {},
        actions: {},
        mutations: {}
    };
    for (const key in serviceUnit) {
        // 参数
        const request = serviceUnit[key];
        let serviceItem = {};
        if (typeof request === 'function') {
            serviceItem = request({});
        } else {
            serviceItem = request;
        }
        const upperKey = firstUpperCase(key);
        const mutationsKey = `set${upperKey}_mutations`;
        const actionsKey = serviceItem.method + upperKey;

        // （state，mutations）get定义，post不定义
        if (serviceItem.method === 'get') {
            // state
            store.state[key] = { obj: '' };
            if (key.indexOf('List') > -1) {
                store.state[key] = [];
            } else {
                store.state[key] = { obj: {} };
            }
            // mutations
            store.mutations[mutationsKey] = (state, data) => {
                // console.log('data', key, data);
                state[key] = data;
            };
        }

        // actions instanceof
        store.actions[actionsKey] = ({ commit }, params) => {
            const option = { data: params };
            if (typeof request === 'function') {
                Object.assign(option, request(params));
            } else {
                Object.assign(option, request);
            }
            return service(option).then(result => {
                if (serviceItem.method === 'get') {
                    commit(mutationsKey, result || {});
                    // 判断是否回调方法
                    fn && fn(result, commit);
                    return result || {};
                }
                return result;
            });
        };
    }
    return store;
}
