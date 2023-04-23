# Buffer
1. Buffer 类的实例类似于整数数组，但 Buffer 的大小是固定的、且在 V8 堆外分配物理内存。 Buffer 的大小在被创建时确定，且无法调整。
2. Buffer 类在 Node.js 中是一个全局变量，因此无需使用 require('buffer').Buffer。

# from()
- Buffer.from(array) 返回一个新建的包含所提供的字节数组的副本的 Buffer
- Buffer.from(buffer) 返回一个新建的包含所提供的 Buffer 的内容的副本的 Buffer。
# Buffer.alloc(size[, fill[, encoding]]) 
- 返回一个指定大小的被填满的 Buffer 实例。 这个方法会明显地比 Buffer.allocUnsafe(size) 慢，但可确保新创建的 Buffer 实例绝不会包含旧的和潜在的敏感数据。