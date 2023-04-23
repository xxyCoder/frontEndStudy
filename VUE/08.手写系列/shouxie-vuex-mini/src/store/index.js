import { createStore } from "./mini-vuex";

const store = createStore({
    state() {
        return {
            count: 1
        };
    },
    mutations: {
        add(state) {
            state.count ++;
        }
    }
});

export default store;