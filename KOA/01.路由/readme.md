# router
- all方法
    对于一条路由，请求在其他方法和all方法上命中，只有其他方法执行了next才会触发all
- 路由前缀
    固定字符串 不能添加动态参数 即不能使用模板字符串
- 参数
    通过context.params获得，是一个对象
# querystring
- 返回字符串 去掉了?号部分保留余下
# koa-bodyparser
- 用于解析请求的body，支持JSON等类型