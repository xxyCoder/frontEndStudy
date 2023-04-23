import { ref,inject } from 'vue';
import RouterLink from './RouterLink.vue';
import RouterView from './RouterView.vue';

const ROUTER_KEY = '__router__';

function createWebHashHistory() {
    function bindEvents(fn) {
        // 当哈希值改变的时候会触发 hashchange事件
        window.addEventListener('hashchange',fn);
    };
    return {
        bindEvents,
        // 以防哈希值后面没有东西，即只有#
        url: window.location.hash.slice(1) || '/'
    };
}

class Router {
    constructor(options) {
        this.history = options.history;
        this.routes = options.routes;
        // 响应式绑定地址，随着地址发送变化
        this.current = ref(this.history.url);
        this.history.bindEvents(() => {
            // 拿到 #/xxx 除去# 的值，即/xxx
            this.current.value = window.location.hash.slice(1);
        });
    }

    install(app) {
        app.provide(ROUTER_KEY,this);
        // 全局注册组件
        app.component('router-link',RouterLink);
        app.component('router-view',RouterView);
    }
}

function createRouter(options) {
    return new Router(options);
}

function useRouter() {
    return inject(ROUTER_KEY);
}

export { createRouter,createWebHashHistory,useRouter }