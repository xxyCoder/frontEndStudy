(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

    // 对模板进行编译处理
    function compileToFunction(template) {
      // 将template 转换成ast语法树
      // 生成render函数 （执行后获得虚拟DOM）
    }

    function _typeof(obj) {
      "@babel/helpers - typeof";

      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      }, _typeof(obj);
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", {
        writable: false
      });
      return Constructor;
    }
    function _toPrimitive(input, hint) {
      if (typeof input !== "object" || input === null) return input;
      var prim = input[Symbol.toPrimitive];
      if (prim !== undefined) {
        var res = prim.call(input, hint || "default");
        if (typeof res !== "object") return res;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return (hint === "string" ? String : Number)(input);
    }
    function _toPropertyKey(arg) {
      var key = _toPrimitive(arg, "string");
      return typeof key === "symbol" ? key : String(key);
    }

    // 重写部分方法
    var oldArrayProto = Array.prototype;
    var newArrayProto = Object.create(oldArrayProto); // 复制一份
    // 需要重写的方法
    var methods = ['push', 'pop', 'shift', 'unshift', 'reverse', 'sort', 'splice']; // 其他方法如concat不会改变原数组，不需要重写

    methods.forEach(function (method) {
      newArrayProto[method] = function () {
        var _oldArrayProto$method;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        // 默认需要调用原方法
        var res = (_oldArrayProto$method = oldArrayProto[method]).call.apply(_oldArrayProto$method, [this].concat(args)); // 需要改变this执行，谁执行的绑定为谁
        // 数据劫持
        var inserted;
        // 调用方法的是data上的数据
        switch (method) {
          // 获取新增的值
          case 'push':
          case 'unshift':
            inserted = args;
            break;
          case 'splice':
            // arr.splice(开始位置，删除个数，新增数量...)
            inserted = args.splice(2);
        }
        var ob = this.__ob__;
        if (inserted) {
          // 对新增的内容进行监测,但是拿不到Observe的observeArray
          // 将observeArray从类中分离不可行，不符合要求
          // 调用方法的this是Observe 中传入的data，故可以在data上将Observe实例挂载上去
          ob.observeArray(inserted);
        }
        return res;
      };
    });

    // 对于数组来说，不推荐使用索引当作key来劫持，存在a[10000] = 1这种写法，那么劫持非常耗费性能
    var Observe = /*#__PURE__*/function () {
      function Observe(data) {
        _classCallCheck(this, Observe);
        if (Array.isArray(data)) {
          // this是Observe的实例,同时给数据加标识，如果有属性表示该数据被监测过
          // data.__ob__ = this;
          // 但是要变成不可枚举的，不然在observe死循环
          Object.defineProperty(data, '__ob__', {
            value: this,
            enumerable: false
          });
          // 用户一般使用数组方法修改数组，那么重写这些方法去监控
          // data.__proto__ = {} 不推荐 直接重写，那么数组其他方法也没了
          data.__proto__ = newArrayProto;
          // 对数组中每一个值也要检测，万一是对象
          this.observeArray(data);
        } else {
          // Object.defineProperty 只能劫持存在的属性
          this.walk(data);
        }
      }
      _createClass(Observe, [{
        key: "walk",
        value: function walk(data) {
          // 循环对象，对属性依次劫持
          // 重新定义属性，对性能有影响
          Object.keys(data).forEach(function (key) {
            return defineReactive(data, key, data[key]);
          });
        }
      }, {
        key: "observeArray",
        value: function observeArray(data) {
          data.forEach(function (item) {
            return observe(item);
          });
        }
      }]);
      return Observe;
    }();
    function defineReactive(target, key, value) {
      observe(value); // 对所有对象的属性进行劫持 使用递归
      Object.defineProperty(target, key, {
        get: function get() {
          return value;
        },
        set: function set(newValue) {
          if (newValue === value) {
            // 闭包，可以拿到value
            return;
          }
          value = newValue;
        }
      });
    }
    function observe(data) {
      if (_typeof(data) !== 'object' || data == null) {
        return; // 只对对象进行劫持
      }
      // 还需要判断一个对象是否被劫持过，劫持过就不需要重复劫持了，故需要添加一个实例来判断
      if (data.__ob__ instanceof Observe) {
        return data.__ob__;
      }
      return new Observe(data);
    }

    function initState(vm) {
      // 将数据拿出来，进行数据劫持
      var ops = vm.$options;
      if (ops.data) {
        initData(vm);
      }
    }
    function proxy(vm, target, key) {
      Object.defineProperty(vm, key, {
        get: function get() {
          return vm[target][key]; // vm._data.xxx
        },
        set: function set(newValue) {
          if (vm[target][key] === newValue) {
            return;
          }
          vm[target][key] = newValue;
        }
      });
    }
    function initData(vm) {
      var data = vm.$options.data; // 在vue2中，可能是函数也可能是对象
      data = typeof data === 'function' ? data.call(vm) : data; // 是函数就执行，不是则直接赋值
      vm._data = data; // 跟踪data
      // 数据劫持，vue2使用了defineProperty
      observe(data); // 此处修改data在Vue上体现不出，需要定义_data = data
      // 将vm._data 使用vm代理，因为用户访问数据使用vm._data较为麻烦
      for (var key in data) {
        proxy(vm, '_data', key);
      }
    }

    function initMixin(Vue) {
      // 给Vue增加init方法
      Vue.prototype._init = function (options) {
        // 用于初始化
        var vm = this;
        // 如果扩展了其他方法，也需要拿到options的话，就考虑将options放在实例上
        vm.$options = options;
        // 初始化状态
        initState(vm);
        if (options.el) {
          // 说明用户传递了el
          vm.$mount(options.el); // 实习数据挂载
        }
      };

      Vue.prototype.$mount = function (el) {
        var vm = this;
        el = document.querySelector(el);
        var ops = vm.$options;
        if (!ops.render) {
          // 没有渲染函数
          var template;
          if (!ops.template && el) {
            // 也没有模板，但是有el,说明用户在body区域写了HTML标签
            template = el.outerHTML;
          } else {
            if (el) {
              // 说明用户在template处写了HTML标签
              template = ops.template;
            }
          }
          if (template) {
            var render = compileToFunction();
            ops.render = render;
          }
        }
        ops.render;
      };
    }

    // 不使用类是因为不如函数方便添加功能
    function Vue(options) {
      this._init(options);
    }
    initMixin(Vue); // 扩展init方法

    return Vue;

}));
//# sourceMappingURL=vue.js.map
