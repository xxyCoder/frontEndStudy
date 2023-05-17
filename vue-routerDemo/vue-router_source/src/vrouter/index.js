
class VueRouter {
    constructor(options) {
        let routes = options.routes;
    }
}
VueRouter.install = function (Vue) {
    Vue.mixin({
        beforeCreate() {
            if (this.$options.router) {
                this._rootRouter = this;
                this._router = this.$options.router;
            } else {
                this._router = this.$parent && this.$parent._rootRouter;
            }
        }
    });
    Object.defineProperty(Vue.prtotype, '$router', {
        get() {
            return this._rootRouter && this._rootRouter._router;
        }
    });
    Vue.component('router-link', {
        render() {
            return <a>{this.$slots.default}</a>
        }
    })
    Vue.component('router-view', {
        render() {
            return <div></div>
        }
    })
}

// 需要new使用
export default VueRouter;