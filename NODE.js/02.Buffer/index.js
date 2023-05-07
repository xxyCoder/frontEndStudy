// 1. alloc使用
// 创建一个长度为10，且用0填充
const buf1 = Buffer.alloc(10);
// 创建一个长度为10,用0x1填充
const buf2 = Buffer.alloc(10,1);

// 2. allocUnsafe使用
// 创建一个长度为10,没有初始化.可能包含旧数据,需要fill或write覆盖,比alloc快
const buf3 = Buffer.allocUnsafe(10)

// 3. from使用
// 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。
const buf4 = Buffer.from([1,2,3]);
// 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
const buf5 = Buffer.from('tést');
// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
const buf6 = Buffer.from('tést', 'latin1');

// 4. buffer与字符串的转换
console.log(buf6.toString());

// 5. buffer修改 []
buf1[8] = 8;
console.log(buf1);

// 6. 溢出，只能存储0~254
buf1[8] = 360;
console.log(buf1[8]);

// 7. 中文
let buf7 = Buffer.from("你好");
console.log(buf7);