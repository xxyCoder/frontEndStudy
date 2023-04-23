import Dep from "./Dep";
import { observe } from "./observe";

export default function defineReactive(data,key,val) {
    let childOb = observe(val);
    // 存储收集的依赖
    let dep = new Dep();
    Object.defineProperty(data,key,{
        enumerable: true,
        configurable: true,
        get: function() {
            // 收集array依赖
            dep.depend();
            if(childOb) {
                childOb.dep.depend();   // 手动收集依赖
            }
            return val;
        },
        set: function(newValue) {
            if(val === newValue) {
                return ;
            }
            dep.notify();
            val = newValue;
        }
    })
}