const https = require('https');
const http = require('http');

// 核心代码定义
function Axios() {
    // 定义拦截器
    this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
    };
}

Axios.prototype.request = function (config) {
    let promise = Promise.resolve(config);

    // 请求拦截器处理
    this.interceptors.request.forEach(function (interceptor) {
        // 依次使用每个拦截器
        promise = promise.then(interceptor.fulfilled, interceptor.rejected);
    });

    // 发送请求并处理响应
    promise = promise.then(function (config) {
        // 需要判断一下是浏览器还是nodejs
        if (typeof window !== 'undefined') {
            return dispatchRequest(config);
        } else {
            return httpsAdapter(config);
        }
    }).then(function (response) {
        // 响应拦截器处理
        this.interceptors.response.forEach(function (interceptor) {
            response = interceptor.fulfilled(response);
        });
        return response;
    }.bind(this));

    return promise;
};

['get', 'post', 'put', 'delete'].forEach(function (method) {
    Axios.prototype[method] = function (url, config) {
        config = config || {};
        config.method = method;
        config.url = url;
        return this.request(config);
    };
});

function createInstance() {
    var context = new Axios();
    var instance = Axios.prototype.request.bind(context);

    // 拷贝原型上的属性和方法
    Object.assign(instance, Axios.prototype, context);

    return instance;
}

let axios = createInstance();

// 请求派发函数，也包含了拦截器处理逻辑
function dispatchRequest(config) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(config.method || 'get', config.url, true);
        xhr.timeout = config.timeout || 0;

        // 设置请求头
        if (config.headers) {
            Object.keys(config.headers).forEach(function (key) {
                xhr.setRequestHeader(key, config.headers[key]);
            });
        }

        // 处理响应结果
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                let responseHeaders = xhr.getAllResponseHeaders();
                let responseData = xhr.responseText;
                let responseType = config.responseType || 'text';

                switch (responseType) {
                    case 'json':
                        try {
                            responseData = JSON.parse(responseData);
                        } catch (e) { }
                        break;
                    case 'xml':
                        responseData = xhr.responseXML;
                        break;
                }

                let response = {
                    data: responseData,
                    status: xhr.status,
                    statusText: xhr.statusText,
                    headers: responseHeaders,
                    config: config,
                    request: xhr
                };
                resolve(response);
            }
        };

        // 处理请求超时和异常情况
        xhr.onerror = function () {
            reject(new Error('Network Error'));
        };
        xhr.ontimeout = function () {
            reject(new Error('Request Timeout'));
        };

        xhr.send(config.data);
    });
}

// HTTPS 请求适配器
function httpsAdapter(config) {
    return new Promise((resolve, reject) => {
        const req = https.request(config.url, config, (res) => {
            res.setEncoding('utf8');
            let body = '';
            res.on('data', (chunk) => {
                body += chunk;
            });
            res.on('end', () => {
                resolve({
                    data: JSON.parse(body),
                    status: res.statusCode,
                    statusText: res.statusMessage,
                    headers: res.headers,
                    config,
                });
            });
        });
        req.on('error', (err) => {
            reject(err);
        });
        if (config.data) {
            req.write(JSON.stringify(config.data));
        }
        req.end();
    });
}

// 拦截器管理器
function InterceptorManager() {
    // 收集request和response拦截器的函数的参数
    this.handlers = [];
}

// 将要使用的拦截器的两个参数收集起来
InterceptorManager.prototype.use = function (fulfilled, rejected) {
    this.handlers.push({
        fulfilled: fulfilled,
        rejected: rejected
    });
    return this.handlers.length - 1;
};

InterceptorManager.prototype.forEach = function (fn) {
    this.handlers.forEach(function (handler) {
        if (handler !== null) {
            fn(handler);
        }
    });
};
