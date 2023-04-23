// 求和相关
const countOptions = {
    namespaced:true,
    actions: {
        add(context, value) {
            context.commit('ADD', value);
        },
        sub(context, value) {
            context.commit('SUB', value);
        }
    },
    mutations: {
        ADD(state, value) {
            state.sum += value;
        },
        SUB(state, value) {
            state.sum -= value;
        }
    },
    state: {
        sum: 0,
        school: 'sgg',
        subject: '前端'
    },
    getters: {
        bigSum(state) {
            return state.sum * 10
        }
    }
}
export default countOptions;