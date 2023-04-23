// 创建一个长度为10，且用0填充
const buf1 = Buffer.alloc(10);
// 创建一个长度为10,用0x1填充
const buf2 = Buffer.alloc(10,1);

// 创建一个长度为10,没有初始化.可能包含旧数据,需要fill或write覆盖,比alloc快
const buf3 = Buffer.allocUnsafe(10)

// 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。
const buf4 = Buffer.from([1,2,3]);
// 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
const buf5 = Buffer.from('tést');
// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
const buf6 = Buffer.from('tést', 'latin1');