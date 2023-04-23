const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
myEmitter.on('event',() => {
    console.log('触发一个事件');
});
myEmitter.emit('event');

// 开启异步
myEmitter.on('event2',(a,b) => {
    setImmediate(() => {
        console.log('这个是异步发送');
        console.log(this,a,b);
    });   
});
myEmitter.emit('event2',1,2);

// 传递参数
myEmitter.on('event1',function(a,b) {
    console.log(this,a,b);
});
myEmitter.emit('event1',1,2);

let m = 0;
myEmitter.once('event3', () => {
  console.log(++m);
});
myEmitter.emit('event3');
// 打印: 1
myEmitter.emit('event3');
// 忽略

// 错误事件
myEmitter.on('error', (err) => {
    console.error('有错误');
  });
myEmitter.emit('error',new Error('wrong'));

// 多个事件
const callback = () => {
    console.log('触发两个事件');
}
myEmitter.on('event',callback);
myEmitter.emit('event');

// 移除
myEmitter.removeListener('event',callback);
myEmitter.emit('event');