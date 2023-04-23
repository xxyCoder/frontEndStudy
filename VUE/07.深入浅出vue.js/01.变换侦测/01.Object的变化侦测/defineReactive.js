import Dep from "./Dep";
import Observer from "./Observer";

export default function defineReactive(data,key,val) {
    // 递归子属性，将data中所有属性都转换成getter/setter的形式来侦测变化
    if(typeof val === 'object') {
        new Observer(val);
    }
    // 存储收集的依赖
    let dep = new Dep();
    // 设计响应式
    Object.defineProperty(data,key,{
        enumerable: true,
        configurable: true,
        get: function() {
            // 收集依赖
            dep.depend();
            return val;
        },
        set: function(newValue) {
            // 浅对比，数据没发送改变即不重新渲染，节约时间
            if(val === newValue) {
                return ;
            }
            val = newValue;
            dep.notify();
        }
    })
}