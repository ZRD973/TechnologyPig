# Vue

**组件传递参数**

```js
一、父组件向子组件传值：props / $emit()
1、父组件绑定数据，子组件通过props接受数据；
2、子组件通过this.$emit 自定义事件，父子件再去绑定函数
总结：父组件通过props向下传递数据给子组件。注：组件中的数据共有三种形式：data、props、computed，
子组件通过$emit给父组件发送消息，实际上就是子组件把自己的数据发送到父组件。


二、兄弟组件通信:  eventBus 
	var eventBus=new Vue();
    eventBus.$emit(事件名,数据);
    eventBus.$on(事件名,data => {});
A：eventBus.$emit('addEvent' , data )
B: 在mounted中  eventBus.$on('addEvent' , handelFun )
需要在beforeDestroy(){ eventBus.$off('addEvent' , handelFun )}

三、localStorage 和 sessionStorage 存值到本地

四、vuex 
this.$store.commit('event')
this.$store.state

五、父组件调用子组件：ref
<h1>父组件</h1>
<button @click="showChild">按钮</button>
<Child ref="Child"></Child>
 methods: {
        showChild(){
           const child =  this.$refs.Child; //获得子组件实例
            //可以嵌套使用
            this.$children[]  //父组件调用子组件,是数组，所以可以给子组件取名字，用ref
            this.$parent  //子组件调用父组件
            this.$root //调用根组件
        }
    }
在element ui 的dialog中，ref要在dialog的open回调事件中才能执行。
Dialog 的内容是懒渲染的，即在第一次被打开之前，传入的默认 slot 不会被渲染到 DOM 上。因此，如果需要执行 DOM 操作，或通过 ref 获取相应组件，请在 open 事件回调中进行。

六、provide/inject
// A.vue
export default {
  provide: {
    name: '浪里行舟'
  }
}
// B.vue
export default {
  inject: ['name'],
  mounted () {
    console.log(this.name);  // 浪里行舟
  }
}
```

**Vue.js的双向数据绑定原理是什么？**

```js
Vue. js采用ES5提供的属性特性功能，结合发布者-订阅者模式，通过 Object.defineProperty()为各个属性定义get、set特性方法，在数据发生改变时给订阅者发布消息，触发相应的监听回调。
具体步骤如下。
（1）对需要观察的数据对象进行递归遍历，包括子属性对象的属性，设置set和get特性方法。当给这个对象的某个值赋值时，会触发绑定的set特性方法，于是就能监听到数据变化。
（2）用 compile解析模板指令，将模板中的变量替换成数据。然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者。一旦数据有变动，就会收到通知，并更新视图
（3） Watcher订阅者是 Observer和 Compile之间通信的桥梁，主要功能如下。
    在自身实例化时向属性订阅器（dep）里面添加自己。
    自身必须有一个 update( )方法。
    在 dep.notice()发布通知时，能调用自身的 update()方法，并触发 Compile中绑定的回调函数。
（4）MVVM是数据绑定的入口，整合了 Observer、 Compile和 Watcher三者，通过Observer来监听自己的 model数据变化，通过 Compile来解析编译模板指令，最终利用Watcher搭起 Observer和 Compile之间的通信桥梁，达到数据变化通知视图更新的效果。利用视图交互，变化更新数据 model变更的双向绑定效果。
```

vue**实现请求转发**

```js
在vue.config.js中配置
devServer：{
	proxy:{
        '/api':{
            target:'http://localhost:3000'
        }
    }
}
//不会造成跨域 
```

![](E:\Web\我的轮子\image\vue生命周期.webp)