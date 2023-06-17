# 清除画布
- clear(mask)
  - COLOR_BUFFER_BIT: 表示清除颜色缓冲区
  - DEPTH_BUFFER_BIT: 表示清除深度缓冲区
  - STENCIL_BUFFER_BIT: 表示清除模板缓冲区
# 设置颜色
- clearColor(red,green,bule,alpha)  用于设置清除颜色缓冲区时使用的颜色值
# 绘制一个点
1. 创建顶点着色器
2. 创建片元着色器
3. 关联着色器和着色器源码
4. 编译着色器
5. 创建program
6. 关联着色器和program
7. 使用program