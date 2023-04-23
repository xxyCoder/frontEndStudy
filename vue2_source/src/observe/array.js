// 重写部分方法
let oldArrayProto = Array.prototype;

export let newArrayProto = Object.create(oldArrayProto);   // 复制一份
// 需要重写的方法
let methods = [
    'push',
    'pop',
    'shift',
    'unshift',
    'reverse',
    'sort',
    'splice'
];  // 其他方法如concat不会改变原数组，不需要重写

methods.forEach(method => {
    newArrayProto[method] = function(...args) {
        // 默认需要调用原方法
        const res = oldArrayProto[method].call(this,...args);   // 需要改变this执行，谁执行的绑定为谁
        // 数据劫持
        let inserted;
        // 调用方法的是data上的数据
        switch(method) {    // 获取新增的值
            case 'push': 
            case 'unshift': 
                    inserted = args;
                    break;  
            case 'splice':  // arr.splice(开始位置，删除个数，新增数量...)
                    inserted = args.splice(2);  // 获取新增数量，即剪切掉开始位置和删除个数
            default:
                    break;
        }
        let ob = this.__ob__;
        if(inserted) {
            // 对新增的内容进行监测,但是拿不到Observe的observeArray
            // 将observeArray从类中分离不可行，不符合要求
            // 调用方法的this是Observe 中传入的data，故可以在data上将Observe实例挂载上去
            ob.observeArray(inserted);
        }
        return res;
    }
})