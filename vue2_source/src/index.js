import { initMixin } from "./init";
import { initLifycycle } from "./lifecycle";
import Watcher, { nextTick } from "./observe/watcher";

// 不使用类是因为不如函数方便添加功能
function Vue(options) {
    this._init(options);
}
initMixin(Vue); // 扩展init方法
initLifycycle(Vue);
Vue.prototype.$nextTick = nextTick;
Vue.prototype.$watch = function(expOrFn,cb) {
    new Watcher(this,expOrFn,{user:true},cb);  // this是vm,因为是vm调用
}

export default Vue;