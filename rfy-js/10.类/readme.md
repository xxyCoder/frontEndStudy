# 类是什么
- 可以看作是构造函数的另一种写法，使用typeof表示仍然是一个函数
# 类中方法定义在何处？
- 方法定义在类的prototype身上，且不可枚举
- getter和setter定义在Descriptor对象身上
- 静态方法定义在类身上
# 类的注意点
- 默认开启严格模式，不存在变量提示