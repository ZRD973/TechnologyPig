class Vue{
    constructor(options){
        // 1、保存数据
        this.$options = options
        this.$el= options.el
        this.$data= options.data
        // 2、将data添加到响应式系统中
        new Observer(this.$data)
        // 3、代理this.$data的数据
        Object.keys(this.$data).forEach(key=>{
            this._proxy(key)
        })
        // 4、处理el，编译模板
        new Compiler(this.$el,this)

    }
    _proxy(key){
        Object.defineProperty(this,key,{
            configurable:true,
            enumerable:true,
            get(){
                return this.$data[key]
            },
            set(newValue){
                this.$data[key] = newValue
            }
        })
    }
}
class Observer{
    constructor(data){
        this.data = data

        Object.keys(data).forEach(key=>{
            this.defineReacive(this.data,key,data[key])
        })
    }

    defineReacive(data,key,val){
        const dep = new Dep() //一个属性key => Dep对象
        Object.defineProperty(data,key,{
            enumerable:true,
            configurable:true,
            get(){
                if(Dep.target){
                    dep.addSub(Dep.target)
                }
                console.log("get",val);
                return val
            },
            set(newVal){
                console.log("set",newVal);
                if(newVal === val){
                    return
                }
                val = newVal
                dep.notify()
            }
        })
    }
}

class Dep{
    constructor(){
        this.subs = []
    }
    addSub(sub){
        this.subs.push(sub)
    }
    notify(){
        this.subs.forEach(sub=>{
            sub.update()
        })
    }
}

class Watcher{
    constructor(node,name,vm){
        this.node = node;
        this.name = name;
        this.vm = vm;
        Dep.target = this;
        this.update();
        Dep.target = null;
    }
    update(){
        this.node.nodeValue = this.vm[this.name] //get
    }
}

const reg = /\{\{(.+)\}\}/
// . 匹配任何内容（除了特殊符号）
// * 0个或者多个
// + 1个或者多个
class Compiler{
    constructor(el,vm){
        this.el = document.querySelector(el)
        this.vm = vm
        this.fragment = this.createFragment()
        this.el.appendChild(this.fragment)
    }
    createFragment(){
        const fragment = document.createDocumentFragment()
        let child
        while (child = this.el.firstChild) {
            this.compile(child)
            fragment.appendChild(child)
        }
        return fragment
    }
    compile(node){
        if(node.nodeType === 1){  //标签节点
            const attrs = node.attributes
            if(attrs.hasOwnProperty('v-model')){
                const name = attrs['v-model'].nodeValue
                node.addEventListener('input', e=>{
                    this.vm[name] = e.target.value
                })
            }
        }
        if(node.nodeType === 3){  //文本节点
            console.log(reg.test(node.nodeValue));
            if(reg.test(node.nodeValue)){
                const name = RegExp.$1.trim()
                debugger
                new Watcher(node,name,this.vm)
            }
        }
    }
}