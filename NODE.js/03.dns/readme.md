# DNS
- 模块包含两类函数
    1. 第一类函数，使用底层操作系统工具进行域名解析，且无需进行网络通信。 这类函数只有一个 dns.lookup()
        dns.lookup(hostname[, options], callback)
            - callback
                - err
                - address
                - family => 4 or 6, denoting the family of address.
    2. 第二类函数，连接到一个真实的 DNS 服务器进行域名解析，且始终使用网络进行 DNS 查询
        这类函数适合于那些不想使用底层操作系统工具进行域名解析、而是想使用网络进行 DNS 查询的开发者。
# 内部函数
1. dns.resolve(hostname[, rrtype], callback)
    - 使用DNS协议来解析一个主机名
2. dns.resolve4(hostname[, options], callback)
    - 使用DNS协议解析IPv4地址主机名(A记录)
3. dns.resolve6(hostname[, options], callback)
    - 使用DNS协议解析IPv6地址主机名(AAAA记录)
4. dns.reverse(ip, callback)
    - 执行一个反向DNS查询返回IPv4或IPv6地址的主机名的数组

# 错误码
- 每个DNS查询可以返回一个错误代码