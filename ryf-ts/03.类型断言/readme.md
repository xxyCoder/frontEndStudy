# 类型断言是什么？
- 手动指定一个值的类型，但是不能随意指定
- 可以将联合类型断言为其中一个
- 将父类断言为更加具体的子类
- 将任何一个类型断言为any
- 将any断言为一个具体的类型
# 双重断言
- 一个类型可以断言成any，any可以断言成任何类型，故可以将任何类型断言成其他类型，中间需要any
# 类型断言 VS 类型转换
- 类型断言只会影响TS编译时的类型，不会影响到变量类型