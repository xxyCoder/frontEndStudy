export function initGlobalAPI(Vue) {
    // 静态方法
    Vue.options = {};
    Vue.mixin = function(mixin) {
        
    }
    Vue.extend = function(options) {
        function Sub(options = {}) {
            this._init(options);   // 就是默认对子类进行初始化
        }
        Sub.prototype = Object.create(Vue.prototype);
        Sub.options = options;  // 保存用户传递的选项
        Sub.prototype.constructor = Sub;
        return Sub;
    }
    Vue.options.components = {}; // 全局指令
    Vue.component = function(id,definition) {
        // 如果已经是函数，说明用户自己调用了Vue.extend
        definition = typeof definition === 'function' ? definition : Vue.extend(definition);
        Vue.options.components[id] = definition;
        
    }
}