// 该文件创建vuex核心中的store
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

// 准备actions，用于响应组件中的动作
const actions = {
    add(context,value) {
        // console.log(context,value);
        context.commit('ADD',value);
    },
    sub(context,value) {
        context.commit('SUB',value);
    }
};
// 准备mutations，用于操作数据
const mutations = {
    ADD(state,value) {
        state.sum += value;
    },
    SUB(state,value) {
        state.sum -= value;
    },
    ADD_PERSON(state,value) {
        state.personList.unshift(value);
    }
};
// 准备state。用于存储数据
const state = {
    sum: 0,
    school: 'sgg',
    subject: '前端',
    personList: [
        {id:'001',name:'张三'}
    ]
};

// 用于将state中的数据进行加工
const getters = {
    bigSum(state) {
        return state.sum * 10
    }
}

// 创建store
const store = new Vuex.Store({
    actions,
    mutations,
    state,
    getters
});

export default store;