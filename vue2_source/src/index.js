import { initMixin } from "./init";

// 不使用类是因为不如函数方便添加功能
function Vue(options) {
    this._init(options);
}
initMixin(Vue); // 扩展init方法

export default Vue;