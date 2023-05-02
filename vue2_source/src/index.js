import { initMixin } from "./init";
import { initLifycycle } from "./lifecycle";
import { nextTick } from "./observe/watcher";

// 不使用类是因为不如函数方便添加功能
function Vue(options) {
    this._init(options);
}
initMixin(Vue); // 扩展init方法
initLifycycle(Vue);
Vue.prototype.$nextTick = nextTick;

export default Vue;