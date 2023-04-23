import { nextTick } from '../util/index'
export function renderMixin(Vue) {
    Vue.prototype.$nextTick = function(fn) {
        return nextTick(fn,this);
    }
}