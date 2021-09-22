class MyVue {
    constructor(options) {
        var self = this;
        this.data = options.data;
        this.methods = options.methods;

        Object.keys(this.data).forEach(function (key) {
            self.proxyKeys(key);
        });

        observe(this.data);
        new Compile(options.el, this);
        options.mounted.call(this); // 所有事情处理好后执行mounted函数
    }
    proxyKeys(key) {
        // 将this.data属性代理到this上
        var self = this;
        Object.defineProperty(this, key, {
            enumerable: false,
            configurable: true,
            get: function getter() {
                console.log("get",self.data[key]);
                return self.data[key];
            },
            set: function setter(newVal) {
                console.log("set",self.data[key]);
                self.data[key] = newVal;
            }
        });
    }
}

// Compile
class Compile {
    constructor(el, vm) {
        this.vm = vm;
        this.el = document.querySelector(el); // 获取DOM
        this.fragment = null;
        this.init();
    }
    init() {
        if (this.el) {
            // 将DOM转为fragment
            this.fragment = this.nodeToFragment(this.el);
            // 解析DOM中的指令
            this.compileElement(this.fragment);
            // 将解析完之后的DOM在重新渲染在真实DOM中
            this.el.appendChild(this.fragment);
        } else {
            console.error('Dom元素不存在');
        }
    }
    // 将真实DOM复制到fragment中，便于js操作
    nodeToFragment(el) {
        var fragment = document.createDocumentFragment();
        var child = el.firstChild;
        while (child) {
            // 将Dom下子元素依次移入fragment中
            fragment.appendChild(child);
            child = el.firstChild
        }
        return fragment;
    }
    // 解析DOM中的模板、指令等
    compileElement(el) {
        var childNodes = el.childNodes;
        var self = this;
        [].slice.call(childNodes).forEach(function (node) {
            var reg = /\{\{(.*)\}\}/; // 匹配 {{变量}}
            var text = node.textContent;
            if (self.isElementNode(node)) {
                // 元素节点，解析该元素
                self.compile(node);
            } else if (self.isTextNode(node) && reg.test(text)) {
                // 是文本节点，并且匹配上了{{}}
                self.compileText(node, reg.exec(text)[1]);
            }
            if (node.childNodes && node.childNodes.length) {
                // 当前DOM有子节点，继续回调解析
                self.compileElement(node);
            }
        });
    }
    // 解析元素节点的属性如v-、on:等
    compile(node) {
        var nodeAttrs = node.attributes;
        var self = this;
        Array.prototype.forEach.call(nodeAttrs, function (attr) {
            var attrName = attr.name;
            if (self.isDirective(attrName)) { // 属性中包括 'v-'
                var exp = attr.value;
                var dir = attrName.substring(2);
                if (self.isEventDirective(dir)) { // 事件指令 v-on:xxx
                    self.compileEvent(node, self.vm, exp, dir);
                } else { // v-model 指令 (我们这写了两个v-指令，非v-on就是v-model了)
                    self.compileModel(node, self.vm, exp, dir);
                }
                //需要解析更多指令，继续编写判断即可...
                node.removeAttribute(attrName); // v-xx指定，使用完就没用了，直接移除即可。
            }
        });
    }
    // {{xx}}
    compileText(node, exp) {
        var self = this;
        var initText = this.vm[exp];
        this.updateText(node, initText);
        new Watcher(this.vm, exp, function (value) {
            self.updateText(node, value);
        });
    }
    // v-on:xx
    compileEvent(node, vm, exp, dir) {
        var eventType = dir.split(':')[1];
        var cb = vm.methods && vm.methods[exp];

        if (eventType && cb) {
            node.addEventListener(eventType, cb.bind(vm), false);
        }
    }
    // v-model
    compileModel(node, vm, exp, dir) {
        var self = this;
        var val = this.vm[exp];
        this.modelUpdater(node, val);
        new Watcher(this.vm, exp, function (value) {
            self.modelUpdater(node, value);
        });
        node.addEventListener('input', function (e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }
            self.vm[exp] = newValue;
            val = newValue;
        });
    }
    // 更新模板{{}}
    updateText(node, value) {
        node.textContent = typeof value == 'undefined' ? '' : value;
    }
    // 更新v-model
    modelUpdater(node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
    // 以下是判断指令
    isDirective(attr) {
        return attr.indexOf('v-') == 0;
    }
    isEventDirective(dir) {
        return dir.indexOf('on:') === 0;
    }
    // 以下是判断节点类型
    isElementNode(node) {
        return node.nodeType == 1;
    }
    isTextNode(node) {
        return node.nodeType == 3;
    }
    //【参考】 MDN-节点类型常量：https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType
}

// Observer
class Observer {
    constructor(data) {
        this.data = data;
        // 给当前属性设置setter/getter
        this.walk(data);
    }
    walk(data) {
        var self = this;
        Object.keys(data).forEach(function (key) {
            self.defineReactive(data, key, data[key]);
        });
    }
    defineReactive(data, key, val) {
        var dep = new Dep();
        var childObj = observe(val);
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get: function getter() {
                if (Dep.target) {
                    dep.addSub(Dep.target);
                }
                return val;
            },
            set: function setter(newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;
                dep.notify();
            }
        });
    }
}

// Dep
class Dep {
    constructor() {
        this.subs = [];
    }
    addSub(sub) {
        this.subs.push(sub);
    }
    notify() {
        this.subs.forEach(function (sub) {
            sub.update();
        });
    }
}

function observe(value, vm) {
    if (!value || typeof value !== 'object') {
        return;
    }
    return new Observer(value);
};

// Watcher
class Watcher {
    constructor(vm, exp, cb) {
        this.cb = cb; // 更新函数
        this.vm = vm;
        this.exp = exp;
        this.value = this.get(); // 将自己添加到订阅器的操作
    }
    update() {
        this.run();
    }
    run() {
        var value = this.vm.data[this.exp];
        var oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            this.cb.call(this.vm, value, oldVal);
        }
    }
    get() {
        Dep.target = this; // 缓存自己
        var value = this.vm.data[this.exp] // 强制执行监听器里的get函数
        Dep.target = null; // 释放自己
        return value;
    }
}

