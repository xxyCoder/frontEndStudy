# 什么是svg
- 可缩放矢量图 Scalable Vector Graphics
- 本质是文本文件，且无论放大多少倍都不会失真
- 使用类似HTML标签绘制出的图片
# 图形绘制
- 矩形绘制
    1. <rect/>
    2. width 定义宽 height 定义高 fill 定义矩形的填充颜色 stroke-width 定义了矩形的边框宽度 stroke 定义矩形边框颜色
    3. stroke-opacity 边框透明度 fill-opacity 填充内部不透明度 opacity 整个元素不透明度
    4. rx ry 定义x y轴半径长度
- 绘制圆形
    1. <circle/>
    2. cx cy 分别定义圆形中的x y 坐标 默认为0 
    3. r 表示半径
- 绘制椭圆
    1. <ellipse/>
    2. cx cy 定义椭圆中心的x y 坐标
    3. rx ry 分别定义椭圆的水平和垂直半径
# 线条绘制
- 绘制线条
    1. <line/>
    2. x1 y1 x2 y2 分别是起点和终点位置
- 绘制多边形    
    1. <polygon/>
    2. points 至少三对坐标，每一对坐标用空格隔开，坐标x y使用逗号隔开
- 绘制多线条
    1. <polyline/>
    2. points 定义绘制直线需要的点 至少两个
    3. fill="none" 不然变成polygon效果
# 绘制文本
- 文本绘制
    1. <text>文本内容</text>
    2. x y 定义位置
    3. font-size 定义字体大小 
    4. text-anchor: start以文本左端对齐 middle以文本中间对齐 end以文本末端对齐
    5. transform= "rotate(deg,cx,cy)" 旋转角度 旋转中心的位置
    6. 可以包含多个tspan子元素
# 绘制路径
- 路径绘制
    1. <path/>
    2. d="" 绘制
        M (MoveTo) 
        L (LineTo) 绘制执行
        大写表示绝对定位，表示相对屏幕，小写表示相对定位，相对上一次点的位置
        q 绘制贝塞尔二次曲线 后面根控制点坐标 终点