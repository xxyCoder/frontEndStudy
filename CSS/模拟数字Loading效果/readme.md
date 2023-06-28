- @property规则用于自定义属性，也成为CSS变量
```css
@property --<property-name> {
    syntax: <value-type>;
    initial-value: <initial-value>;
    inherits: <true-or-false>
}
```
  - --<property-name>是变量名
  - syntax指定类型属性
  - initial-value指定初始值
  - inherits指定是否继承父元素的值