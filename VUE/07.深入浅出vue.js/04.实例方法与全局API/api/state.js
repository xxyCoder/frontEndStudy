import {
    set,
    del
} from '../observer/index'

export function stateMixin(Vue) {
    Vue.prototype.$set = set;
    Vue.prototype.$del = del;
    Vue.prototype.$watch = function(expOrFn,cb,options) {
        // 
    }
}