import { Observer } from "./Observer";

// 获取Observer
export function observe(value, asRootData) {
    if (!isObject(value)) {
        return;
    }
    let ob;
    // 存在则不需要创建，避免重复监测
    if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
        ob = value.__ob__;
    } else {
        ob = new Observer(value);
    }
    return ob;
}