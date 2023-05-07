(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
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
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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

  // 对模板进行编译处理
  // 标签名 a-aaa
  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*";
  // 命名空间标签 aa:aa-xxx
  var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")");
  // 开始标签-捕获标签名
  var startTagOpen = new RegExp("^<".concat(qnameCapture));
  // 结束标签-匹配标签结尾的 </div>
  var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>"));
  // 匹配属性
  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
  // 匹配标签结束的 >
  var startTagClose = /^\s*(\/?)>/;
  function parseHTML(html) {
    // 对于vue2来说，一开始一定是<

    var ELEMENT_TYPE = 1;
    var TEXT_TYPE = 3;
    var stack = [];
    var top, root;
    function createASTElement(tag, attrs) {
      return {
        tag: tag,
        type: ELEMENT_TYPE,
        children: [],
        attrs: attrs,
        parent: null
      };
    }

    // 最终需要转换成一颗抽象语法树
    function start(tag, attrs) {
      var node = createASTElement(tag, attrs);
      if (!root) {
        // 如果是空树，那么将当前节点当作根节点
        root = node;
      }
      if (top) {
        // 父子节点双向记住
        node.parent = top;
        top.children.push(node);
      }
      stack.push(node);
      top = node;
    }
    function chars(text) {
      text = text.replace(/\s/g, '');
      text && top.children.push({
        // 文本直接放到当前节点中
        type: TEXT_TYPE,
        text: text,
        parent: top
      });
    }
    function end(tag) {
      stack.pop();
      top = stack[stack.length - 1];
    }
    function advance(n) {
      html = html.substring(n);
    }
    function parseStartTag() {
      var start = html.match(startTagOpen);
      if (start) {
        var match = {
          tagName: start[1],
          attrs: []
        };
        advance(start[0].length); // 截取，才好继续匹配后面的内容\
        // 如果不是结束标签就一直匹配
        var attr, _end;
        while (!(_end = html.match(startTagClose)) && (attr = html.match(attribute))) {
          advance(attr[0].length);
          match.attrs.push({
            name: attr[1],
            value: attr[3] || attr[4] || attr[5]
          });
        }
        if (_end) {
          advance(_end[0].length);
        }
        return match;
      }
      return false; // 不是开始标签
    }

    while (html) {
      // textEnd = 0,说明是一个开始标签或结束标签 <div>   ></div>
      // textEnd > 0,说明是文本的结束位置 xxxx</div>
      var textEnd = html.indexOf('<');
      if (textEnd == 0) {
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          start(startTagMatch.tagName, startTagMatch.attrs);
          continue;
        }
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          advance(endTagMatch[0].length);
          end(endTagMatch[1]);
          continue;
        }
      } else if (textEnd > 0) {
        var text = html.substring(0, textEnd); // 文本内容
        if (text) {
          chars(text);
          advance(text.length);
        }
      }
    }
    return root;
  }

  function genProps(attrs) {
    // 属性是一个数组
    var str = '';
    var _loop = function _loop() {
      var attr = attrs[i]; // {name,value};
      if (attr.name === 'style') {
        // 对于style属性需要在外面加一个大括号  style: {color: 'red'};
        var obj = {};
        attr.value.split(';').forEach(function (item) {
          var _item$split = item.split(':'),
            _item$split2 = _slicedToArray(_item$split, 2),
            key = _item$split2[0],
            val = _item$split2[1];
          obj[key] = val;
        });
        attr.value = obj;
      }
      str += "".concat(attr.name, ":").concat(JSON.stringify(attr.value), ",");
    };
    for (var i = 0; i < attrs.length; ++i) {
      _loop();
    }
    // 去掉多余逗号
    return "{".concat(str.slice(0, -1), "}");
  }
  function genChildren(children) {
    if (children) {
      return children.map(function (child) {
        return gen(child);
      }).join(',');
    }
  }
  function gen(node) {
    if (node.type === 1) {
      return codegen(node);
    } else if (node.type === 3) {
      // 对于文本属性，需要判断是否带有变量，没有带变量直接返回
      var text = node.text;
      var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
      if (!defaultTagRE.test(text)) {
        // 不带变量文本 
        return "_v(".concat(JSON.stringify(text), ")");
      } else {
        defaultTagRE.lastIndex = 0; // 去掉全局匹配，避免exec无法继续匹配
        var tokens = [],
          match,
          lastIndex = 0;
        while (match = defaultTagRE.exec(text)) {
          var index = match.index; // 匹配的位置
          if (index > lastIndex) {
            tokens.push(JSON.stringify(text.slice(lastIndex, index)));
          }
          tokens.push("_s(".concat(match[1].trim(), ")"));
          lastIndex = index + match[0].length;
        }
        if (lastIndex < text.length) {
          // 拿到剩余不带变量的字符
          tokens.push(JSON.stringify(text.slice(lastIndex)));
        }
        return "_v(".concat(tokens.join('+'), ")");
      }
    }
  }
  function codegen(ast) {
    var children = genChildren(ast.children);
    // 生成对应标签
    var code = "_c('".concat(ast.tag, "',").concat(ast.attrs.length > 0 ? genProps(ast.attrs) : 'null').concat(ast.children.length ? ",".concat(children) : '', ")");
    return code;
  }
  function compileToFunction(template) {
    // 将template 转换成ast语法树
    var ast = parseHTML(template);
    // 生成render函数 （执行后获得虚拟DOM）
    var code = codegen(ast);
    code = "with(this) {return ".concat(code, "}"); // 为了取变量的值，将作用域改变
    var render = new Function(code);
    return render;
  }

  var id$1 = 0;
  var Dep = /*#__PURE__*/function () {
    function Dep() {
      _classCallCheck(this, Dep);
      this.id = id$1++;
      this.subs = []; // 存放当前属性对应的watcher有那些
    }
    _createClass(Dep, [{
      key: "depend",
      value: function depend() {
        // this.subs.push(Dep.target);
        Dep.target.addDep(this); // 让watcher记住dep
      }
    }, {
      key: "addSub",
      value: function addSub(watcher) {
        this.subs.push(watcher);
      }
    }, {
      key: "notify",
      value: function notify() {
        this.subs.forEach(function (watcher) {
          return watcher.update();
        });
      }
    }]);
    return Dep;
  }();
  Dep.target = null; // 如何将watcher和dep关联？暴露一个全局属性

  var stack = [];
  function pushTarget(watcher) {
    stack.push(watcher);
    Dep.target = watcher;
  }
  function popTarget() {
    stack.pop();
    Dep.target = stack[stack.length - 1];
  }

  var id = 0;
  var Watcher = /*#__PURE__*/function () {
    function Watcher(vm, expOrFn, options, cb) {
      _classCallCheck(this, Watcher);
      this.id = id++; // 不同组件有不同watcher，故使用id标识
      this.renderWatcher = options; // 是一个渲染watcher
      if (typeof expOrFn === 'string') {
        this.getter = function () {
          return vm[expOrFn];
        };
      } else {
        this.getter = expOrFn; // 调用该函数可以发送取值
      }

      this.deps = []; // 实现计算属性和清理工作
      this.depsId = new Set(); // 去重，避免重复放置dep
      this.lazy = options.lazy;
      this.cb = cb;
      this.dirty = this.lazy;
      this.vm = vm;
      this.user = options.user; // 标识是否是用户自己的watcher
      this.value = this.lazy ? undefined : this.get();
    }
    _createClass(Watcher, [{
      key: "addDep",
      value: function addDep(dep) {
        var id = dep.id;
        if (!this.depsId.has(id)) {
          this.deps.push(dep);
          this.depsId.add(id);
          dep.addSub(this);
        }
      }
    }, {
      key: "evaluate",
      value: function evaluate() {
        this.value = this.get(); // 获取计算属性getter返回值
        this.dirty = false;
      }
    }, {
      key: "get",
      value: function get() {
        pushTarget(this);
        var res = this.getter.call(this.vm);
        popTarget();
        return res;
      }
    }, {
      key: "update",
      value: function update() {
        // 异步更新
        if (this.lazy) {
          this.dirty = true; // 依赖值发送变化，就标记变为脏值，但是没有重新渲染，故需要一个渲染watcher
        } else {
          queueWatcher(this); // 把当前watcher暂存
        }
      }
    }, {
      key: "run",
      value: function run() {
        var oldValue = this.value;
        var newValue = this.get();
        if (this.user) {
          console.log(newValue, oldValue, 'watcher');
          this.cb.call(this.vm, newValue, oldValue);
        }
      }
    }, {
      key: "depend",
      value: function depend() {
        var i = this.deps.length;
        while (i--) {
          this.deps[i].depend();
        }
      }
    }]);
    return Watcher;
  }();
  var queue = [];
  var hasW = new Set();
  var pending = false; // 防抖

  function flushSchedulerQueue() {
    var flushQueue = queue.slice(0);
    pending = false;
    queue = [];
    hasW.clear();
    flushQueue.forEach(function (q) {
      return q.run();
    });
  }
  function queueWatcher(watcher) {
    var id = watcher.id;
    if (!hasW.has(id)) {
      queue.push(watcher);
      hasW.add(id);
      if (!pending) {
        nextTick(flushSchedulerQueue);
        pending = true;
      }
    }
  }
  var callbacks = []; // 维护nextTick的回调方法，避免多个nextTick要开启多个定时器
  var waiting = false;
  function flushCallback() {
    var cbs = callbacks.slice(0);
    waiting = false;
    callbacks = [];
    cbs.forEach(function (cb) {
      return cb();
    });
  }
  var timerFn;
  if (Promise) {
    timerFn = function timerFn() {
      Promise.resolve().then(flushCallback);
    };
  } else if (MutationObserver) {
    var observer = MutationObserver(flushCallback);
    var textNode = document.createTextNode(1);
    observer.observer(textNode, {
      characterData: true
    });
    timerFn = function timerFn() {
      textNode.textContent = 2;
    };
  } else if (setImmediate) {
    timerFn = function timerFn() {
      setImmediate(flushCallback);
    };
  } else {
    timerFn = function timerFn() {
      setTimeout(flushCallback);
    };
  }
  function nextTick(cb) {
    callbacks.push(cb);
    if (!waiting) {
      timerFn();
      // Promise.resolve().then(flushCallback);
      waiting = true;
    }
  }

  // h()
  function createElementVNode(vm, tag, data) {
    var _data;
    (_data = data) !== null && _data !== void 0 ? _data : data = {};
    var key = data.key;
    if (key) {
      delete data.key;
    }
    for (var _len = arguments.length, children = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      children[_key - 3] = arguments[_key];
    }
    return VNode(vm, tag, key, data, children);
  }
  // _v()
  function createTextVNode(vm, text) {
    return VNode(vm, undefined, undefined, undefined, undefined, text);
  }
  function VNode(vm, tag, key, data, children, text) {
    return {
      vm: vm,
      tag: tag,
      key: key,
      data: data,
      children: children,
      text: text
    };
  }

  function createElm(vnode) {
    var tag = vnode.tag,
      data = vnode.data,
      children = vnode.children,
      text = vnode.text;
    if (typeof tag === 'string') {
      // 标签
      vnode.el = document.createElement(tag); // 将真实节点和虚拟节点对应
      patchProps(vnode.el, {}, data);
      children.forEach(function (child) {
        vnode.el.appendChild(createElm(child));
      });
    } else {
      vnode.el = document.createTextNode(text);
    }
    return vnode.el;
  }
  function patchProps(el) {
    var oldProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    // 旧节点有样式，新节点没有，则删除
    var oldStyle = oldProps.style || {};
    var newStyle = props.style || {};
    for (var key in oldStyle) {
      if (!newStyle[key]) {
        el.style[key] = '';
      }
    }
    // 对比新旧属性
    for (var _key in oldProps) {
      if (!props[_key]) {
        el.removeAttribute(_key);
      }
    }
    for (var _key2 in props) {
      // 使用新的覆盖旧的
      if (_key2 === 'style') {
        for (var styleName in props[_key2]) {
          el.style[styleName] = props.style[styleName];
        }
      } else {
        el.setAttribute(_key2, props[_key2]);
      }
    }
  }
  function patch(oldVNode, VNode) {
    var isRealElement = oldVNode.nodeType;
    if (isRealElement) {
      var elm = oldVNode; // 获取真实元素
      var parentElm = elm.parentNode; // 拿到父元素
      var newElm = createElm(VNode);
      parentElm.insertBefore(newElm, elm.nextSibling);
      parentElm.removeChild(elm); // 删除老节点
      return newElm;
    } else {
      return patchVNode(oldVNode, VNode);
    }
  }
  function isSameVnode(vnode1, vnode2) {
    return vnode1.tag === vnode2.tag && vnode1.key === vnode2.key;
  }
  function patchVNode(oldVNode, VNode) {
    // 1. 两个节点不同标签，直接删除旧节点，换新节点
    // 2. 是相同节点 （判断节点tag和key）继续比较属性是否有差异（复用老节点，更新差异）
    // 3. 继续比较子节点
    if (!isSameVnode(oldVNode, VNode)) {
      // 用父亲节点来操作子节点
      var newNode = createElm(VNode);
      oldVNode.el.parentNode.replaceChild(newNode, oldVNode);
      return newNode;
    }
    var el = oldVNode.el; // 复用老节点元素
    if (!oldVNode.tag) {
      // 是文本
      if (oldVNode.text !== VNode.text) {
        el.textContent = VNode.text; // 更新文本内容
      }
    }
    // 是标签
    patchProps(el, oldVNode.data, VNode.data);
    // 比较儿子节点
    // 1. 一方有子节点，一方没有
    // 2. 两方都有子节点
    var oldChildren = oldVNode.children || [];
    var newChildren = VNode.children || [];
    if (oldChildren.length > 0 && newChildren.length > 0) {
      updateChildren(el, oldChildren, newChildren);
    } else if (newChildren.length > 0) {
      mountChildren(el, newChildren);
    } else if (oldChildren.length > 0) {
      el.innerHTML = ''; // 可以循环删除
    }

    return el;
  }
  function mountChildren(el, newChildren) {
    for (var i = 0; i < newChildren.length; ++i) {
      var child = newChildren[i];
      el.appendChild(child);
    }
  }
  function updateChildren(el, oldChildren, newChildren) {
    // vue2采用双指针比较
    var oldStartIndex = 0;
    var newStartIndex = 0;
    var oldEndIndex = oldChildren.length - 1;
    var newEndIndex = newChildren.length - 1;

    // 前前 前后 后前 后后比较
    var oldStartVNode = oldChildren[0];
    var newStartVNode = newChildren[0];
    var oldEndVNode = oldChildren[oldEndIndex];
    var newEndVNode = newChildren[newEndIndex];
    while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
      // 前前比较
      if (isSameVnode(oldStartVNode, newStartVNode)) {
        patchVNode(oldStartVNode, newStartVNode);
        oldStartVNode = oldChildren[++oldStartIndex];
        newStartVNode = newChildren[++newStartIndex];
      }
      // 后后比较
      else if (isSameVnode(oldEndVNode, newEndVNode)) {
        patchVNode(oldEndVNode, newEndVNode);
        oldEndVNode = oldChildren[--oldEndIndex];
        newEndVNode = newChildren[--newEndIndex];
      }
      // 交叉对比
      else if (isSameVnode(oldEndVNode, newStartVNode)) {
        patchVNode(oldEndVNode, newStartVNode);
        oldEndVNode = oldChildren[--oldEndIndex];
        newStartVNode = newChildren[newStartIndex++];
        el.insertBefore(oldEndVNode.el, oldStartVNode.el); // 将尾旧节点移到头旧节点前
      } else if (isSameVnode(oldStartVNode, newEndVNode)) {
        patchVNode(oldStartVNode, newEndVNode);
        el.insertBefore(oldStartVNode.el, oldEndIndex.el.nextSibling);
        oldStartVNode = oldChildren[++oldStartIndex];
        newEndVNode = newChildren[--newEndIndex];
      }
    }
    if (newStartIndex <= newEndIndex) {
      // 有新节点，插入
      for (var i = newStartIndex; i <= newEndIndex; ++i) {
        var childEl = createElm(newChildren[i]); // 将虚拟节点转换为真实节点并插入
        var anchor = newChildren[newStartIndex + 1] ? newChildren[newStartIndex + 1].el : null;
        el.insertBefore(childEl, anchor);
      }
    }
    while (oldStartIndex <= oldEndIndex) {
      // 多余旧节点，删除
      el.removeChild(oldChildren[oldStartIndex++].el);
    }
  }

  function initLifycycle(Vue) {
    Vue.prototype._update = function (vnode) {
      var vm = this,
        el = vm.$el;
      vm.$el = patch(el, vnode); // 既有初始化的功能，又有更新的功能
    };
    // _c(tag,{},child)
    Vue.prototype._c = function () {
      return createElementVNode.apply(void 0, [this].concat(Array.prototype.slice.call(arguments)));
    };
    // _v(text)
    Vue.prototype._v = function () {
      return createTextVNode.apply(void 0, [this].concat(Array.prototype.slice.call(arguments)));
    };
    Vue.prototype._s = function (value) {
      return JSON.stringify(value);
    };
    Vue.prototype._render = function () {
      // 让with中的this指向实例
      return this.$options.render.call(this); // 通过ast语法转义后生成的render方法
    };
  }

  function mountComponent(vm, el) {
    vm.$el = el;
    // 1. 调用render方法产生虚拟DOM
    var updateComponent = function updateComponent() {
      vm._update(vm._render());
    };
    new Watcher(vm, updateComponent, true); // true标识渲染过程
    // 2. 根据虚拟DOM产生真实DOM
    // 3. 插入到el元素中
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
      ob.dep.notify(); // 通知更新
      return res;
    };
  });

  // 对于数组来说，不推荐使用索引当作key来劫持，存在a[10000] = 1这种写法，那么劫持非常耗费性能
  var Observe = /*#__PURE__*/function () {
    function Observe(data) {
      _classCallCheck(this, Observe);
      this.dep = new Dep(); // 给所有对象都新增dep

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
  function dependArray(value) {
    for (var i = 0; i < value.length; ++i) {
      value[i].__ob__ && value[i].__ob__.dep.depend();
      if (Array.isArray(value[i])) {
        dependArray(value[i]);
      }
    }
  }
  function defineReactive(target, key, value) {
    var childOb = observe(value); // 对所有对象的属性进行劫持 使用递归
    var dep = new Dep();
    Object.defineProperty(target, key, {
      get: function get() {
        if (Dep.target) {
          dep.depend(); // 让这个属性收集器记住当前的watcher
          if (childOb) {
            // 让数组和对象本身也进行依赖收集
            childOb.dep.depend();
            if (Array.isArray(value)) {
              console.log(value);
              dependArray(value);
            }
          }
        }
        return value;
      },
      set: function set(newValue) {
        if (newValue === value) {
          // 闭包，可以拿到value
          return;
        }
        value = newValue;
        dep.notify(); // 更新后通知，重新渲染
      }
    });
  }

  function observe(data) {
    if (_typeof(data) !== 'object' || data == null) {
      // typeof null = object 历史遗留问题
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
      // 如果给了数据
      initData(vm);
    }
    if (ops.computed) {
      // 如果有计算属性
      initComputed(vm);
    }
    if (ops.watch) {
      initWatch(vm);
    }
  }
  function initWatch(vm) {
    var watch = vm.$options.watch;
    for (var key in watch) {
      var handler = watch[key]; // 可以是字符串 数组 函数 
      if (Array.isArray(handler)) {
        for (var i = 0; i < handler.length; ++i) {
          createWatcher(vm, key, handler[i]);
        }
      } else {
        createWatcher(vm, key, handler);
      }
    }
  }
  function createWatcher(vm, key, handler) {
    if (typeof handler === 'string') {
      handler = vm[handler];
    }
    return vm.$watch(key, handler);
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
    vm._data = data; // 跟踪data，因为data被单独拿出来了，data被监听或是其他的vm不知道
    // 数据劫持，vue2使用了defineProperty
    observe(data); // 此处修改data在Vue上体现不出，需要定义_data = data
    // 将vm._data 使用vm代理，因为用户访问数据使用vm._data较为麻烦
    for (var key in data) {
      proxy(vm, '_data', key);
    }
  }
  function initComputed(vm) {
    var watchers = vm._computedWatchers = {}; // 即计算属性watcher保存在vm上
    var computed = vm.$options.computed;
    for (var key in computed) {
      var userDef = computed[key];
      var getter = typeof userDef === 'function' ? userDef : userDef.get;
      watchers[key] = new Watcher(vm, getter, {
        lazy: true
      }); // 将属性和watcher对应
      defineComputed(vm, key, userDef);
    }
  }
  function defineComputed(target, key, userDef) {
    var setter = userDef.set || function () {};
    Object.defineProperty(target, key, {
      get: createComputedGetter(key),
      set: setter
    });
  }
  function createComputedGetter(key) {
    // 检测是否执行，即缓存结果
    return function () {
      // this是target 即vm
      var watcher = this._computedWatchers[key];
      if (watcher.dirty) {
        // 如果是脏的 调用用户getter
        watcher.evaluate();
      }
      if (Dep.target) {
        // 计算属性出栈后还要渲染watcher 要让计算属性收集上一层watcher
        watcher.depend();
      }
      return watcher.value;
    };
  }
  function initStateMixin(Vue) {
    Vue.prototype.$nextTick = nextTick;
    Vue.prototype.$watch = function (expOrFn, cb) {
      new Watcher(this, expOrFn, {
        user: true
      }, cb); // this是vm,因为是vm调用
    };
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
          var render = compileToFunction(template);
          ops.render = render;
        }
      }
      mountComponent(vm, el); // 挂载实例
    };
  }

  // 不使用类是因为不如函数方便添加功能
  function Vue(options) {
    this._init(options);
  }
  initMixin(Vue); // 扩展init方法
  initLifycycle(Vue); // vm_update vm_render
  initStateMixin(Vue); // 实现了nextTick $watch

  return Vue;

}));
//# sourceMappingURL=vue.js.map
