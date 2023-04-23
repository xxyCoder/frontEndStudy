import { observe } from "./observe/index.js";

export function initState(vm) {
    // 将数据拿出来，进行数据劫持
    const ops = vm.$options;
    if(ops.data) {
        initData(vm);
    }

}
function proxy(vm,target,key) {
    Object.defineProperty(vm,key,{
        get() {
            return vm[target][key]; // vm._data.xxx
        },
        set(newValue) {
            if(vm[target][key] === newValue) {
                return ;
            }
            vm[target][key] = newValue;
        }
    })
}
function initData(vm) {
    let data = vm.$options.data;    // 在vue2中，可能是函数也可能是对象
    data = typeof data === 'function' ? data.call(vm) : data; // 是函数就执行，不是则直接赋值
    vm._data = data;    // 跟踪data
    // 数据劫持，vue2使用了defineProperty
    observe(data);  // 此处修改data在Vue上体现不出，需要定义_data = data
    // 将vm._data 使用vm代理，因为用户访问数据使用vm._data较为麻烦
    for(let key in data) {
        proxy(vm,'_data',key);
    }
}