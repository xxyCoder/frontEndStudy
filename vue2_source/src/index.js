import { initMixin } from "./init";
import { initLifycycle } from "./lifecycle";
import { initStateMixin } from "./state";

// 不使用类是因为不如函数方便添加功能
function Vue(options) {
    this._init(options);
}
initMixin(Vue); // 扩展init方法
initLifycycle(Vue); // vm_update vm_render
initStateMixin(Vue);    // 实现了nextTick $watch

export default Vue;