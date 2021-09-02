// 思想：遍历递归传入的obj，定义每个属性的拦截
const originalProto = Array.prototype;
const arrayProto  = Object.create(originalProto);
['push', 'pop', 'shift', 'unshift', 'splice', 'reverse', 'sort'].forEach(method=>{
    arrayProto[method] = function(){
        // 做之前的事情
        originalProto[method].apply(this,arguments)
        // 通知更新视图
        notifyUpdate();
    }
})








const originalProto = Array.prototype;
const arrayProto = Object.create(originalProto)
['push', 'pop', 'shift', 'unshift', 'splice', 'reverse', 'sort'].forEach(method=>{
    arrayProto[method] = function(){
        originalProto[method].apply(this,arguments);
    }
})






function observe(obj){
    if(typeof obj !== "object" || obj == null){
        return obj;
    }
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        // 对obj，每个key执行拦截
        defineReactive(obj,key,obj[key])
        
    }
}  

// 具体定义指定的key拦截器
function defineReactive(obj,key,val){
    // 递归遍历
    observe(val);
    // val实际上是一个闭包
    Object.defineProperty(obj,key,{
        get(){
            return val;
        },
        set(newVal){
            if(newVal !== val){
                observe(newVal)
                notifyUpdate()
                val = newVal;   
            }
        },
    })

}


function notifyUpdate() {
    console.log('页面更新！')
}
const data = {foo:"foo",bar:{a:1}}
observe(data);
// data.foo = 'fooooo'
data.bar = { a : 10 }
data.bar.a = 100

