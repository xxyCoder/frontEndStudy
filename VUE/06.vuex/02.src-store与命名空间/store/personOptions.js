// 人员相关
const personOptions = {
    namespaced:true,
    actions: {},
    mutations: {
        ADD_PERSON(state, value) {
            state.personList.unshift(value);
        }
    },
    state: {
        personList: [
            { id: '001', name: '张三' }
        ]
    },
    getters: {}
}
export default personOptions;