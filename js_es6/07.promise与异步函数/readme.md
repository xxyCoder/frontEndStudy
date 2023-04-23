# promise
- es6新增引用类型，通过new实例化，需要传入执行器函数作为参数
- 处理程序 resolve reject finally都是异步执行
    对于异步执行顺序按书写顺序
## 状态
- pending 待定
- fulfilled 解决
- rejected  失败
- 无论解决还是失败，都会拿到一个值
- 状态是私有的，且从pending改变之后不可逆也不可变
## 静态方法
- Promise.resolve
    实例化一个解决promise
    解决值是传入给该方法的第一个参数
    如果传入的值是promise 该方法相当于空包装
- Promise.reject
    实例化一个拒绝promise并抛出一个异步错误
    异步错误 try catch是捕获不到的，异步错误是通过浏览器异步消息队列处理
    该异步错误不会影响程序执行同步指令
    拒绝值是传入给该方法的第一个参数
    如果传入的值是promise 不会和resolve一样空包装
- Promise.all
    创建一组promise会在全部解决之后再解决
    如果至少有一个reject，那么all的结果是第一个reject，且拒绝值与其一致
    否则是所有resolve的值组成的数组 按迭代器顺序组成
- Promise.race
    竞争，对第一个处理好的将其包裹

## then
- 异步结构中任何对象都有一个then方法
- 接收两个参数，onResolve处理程序和onReject处理程序
- 参数是可选的，如果不想传入用null占位 但必须是函数，其他值则忽略
- resolve函数的返回值如果没给 则使用Promise.resolve包装undefined
    如果给了则用Promise.resolve包装
    如果没有处理函数，则上一个处理程序的返回值原样往后传
- reject同理 也是使用Promise.resolve包装
## finally
- 状态无关的即不知道状态，用于添加冗余代码
- 表现为父promise的传递
## promise连锁
- 每一个promise都是图中一个点，下一个点必须等待前面的点完成后才能执行

# 异步函数
- async 用于声明异步函数 但整体仍然是同步求值的
- 异步函数有其返回值（如果没有则为undefined），将其用Promise.resolve() 包装
- throw 可以被捕获 但是 Promise.reject 不能被捕获
- 异步函数的特质不会扩展到嵌套函数
- await
    遇到该关键字的时候，记录在哪里暂停执行，等到右边值可以使用,JS会向消息队列推送一个任务，这个任务会恢复异步函数的执行