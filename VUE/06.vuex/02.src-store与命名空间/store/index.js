// 该文件创建vuex核心中的store
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
import countOptions from './countOptions';
import personOptions from './personOptions';

export default new Vuex.Store({
    modules: {
        countOptions,
        personOptions
    }
});