# **JavaScript**

### **1、js的基本类型有哪些？引用类型有哪些？null和undefined的区别**

```
js的基本数据类型：Undefined  Null  Boolean  Number  String Symbol
引用类型：function object array 
null表示"没有对象"，即该处不应该有值；是一个空对象引用。
undefined表示"缺少值"，就是此处应该有一个值，但是还没有定义。
```



### **2、事件冒泡和事件捕获以及事件委托**

```
1、事件冒泡
可以形象地比喻为把一颗石头投入水中，泡泡会一直从水底冒出水面。也就是说，事件会从最内层的元素开始发生，一直向上传播，直到document对像
2、事件捕获
与事件冒泡相反，事件会从最外层开始发生，直到最具体的元素。
3、事件委托（代理）
可以大量节省内存占用，减少事件注册，比如在ul上代理所有li的click事件就非常棒。
事件是绑定在父层的，和目标元素的增减是没有关系的，执行到目标元素是在真正响应执行事件函数的过程中去匹配的
```



### **3、如何理解闭包？谈谈闭包的优缺点。**

当一个函数的返回值是另外一个函数，而返回的那个函数如果调用了其父函数内部的其它变量，如果返回的这个函数在外部被执行，就产生了闭包。

使用闭包的注意点
1）滥用闭包，会造成内存泄漏：由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露。解决方法是，在退出函数之前，将不使用的局部变量全部删除。

2）会改变父函数内部变量的值。所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值。

```javascript
function add() {
    var counter = 0;
    return counter += 1;
}
add();
add();
add();
// 本意是想输出 3, 但事与愿违，输出的都是 1 !
//闭包
function add(){
  var counter = 0;
  return function(){
  	return counter+=1;
}
var Fanjf = add();
console.log(Fanjf());//1
console.log(Fanjf());//2
console.log(Fanjf());//3
}
```



### **4、js判断类型**

```
1、typeof检测不出null 和 数组，结果都为object，所以typeof常用于检测基本类型
2、instanceof不能检测出number、boolean、string、undefined、null、symbol类型，所以instancof常用于检测复杂类型以及级成关系
3、constructor
null、undefined没有construstor方法，因此constructor不能判断undefined和null。但是contructor的指向是可以被改变，所以不安全
4、Object.prototype.toString.call全类型都可以判断
```



### **5、原型链 与 作用域链**

```text
1）原型链
当访问一个对象的某个属性时，会先在这个对象本身的属性上找，如果没有找到，会去这个属性的__proto__属性上找，等于这个构造函数的prototype，如果还没找到，就会继续在__proto__上查找，直到最顶层，找不到即为undefined。这样一层一层往上找，彷佛是一条链子串起来，所以叫做原型链。
（2）作用域链
变量取值会到创建这个变量的函数的作用域中取值，如果找不到，就会向上级作用域去查，直到查到全局作用域，这么一个查找过程形成的链条就叫做作用域链。
（3）区别
作用域是对变量而言，原型链是对于对象的属性而言
作用域链的顶层是window，原型链的顶层是Object
```

### **6、防抖节流**

**防抖函数**

```javascript
// 任务频繁触发的情况下，只有任务触发的间隔超过指定间隔的时候，任务才会执行。
// 指定时间内多次触发某个操作,按最后一次来
// 触发事件、setTimeout、clearTimeout
// 改变页面大小的统计
// 滚动页面位置的统计
// 点击地图指定区域,两秒后,上方弹出对应信息弹框; 频繁改变窗口大小resize; 搜索框keyup、keydown等触发后台请求;
// 输入框连续输入的请求次数的控制
const button = document.getElementById('button');  // 1、获取这个按钮，并绑定事件
function payMoney() {    // 3、需要进行防抖的事件处理
   console.log("已点击");  // ... 有些需要防抖的工作，在这里执行
}
function debounce(func, timeout) {   // 2、防抖功能函数，接受传参
    let timer;  // 4、创建一个标记用来存放定时器的返回值
    return function () {
        let context = this;
        let args = arguments;
        clearTimeout(timer);   // 5、每次当用户点击/输入的时候，把前一个定时器清除
        timer = setTimeout(() => {  // 6、然后创建一个新的 setTimeout，这样就能保证点击按钮后的 interval 间隔内
                func.apply(context,args);  //如果用户还点击了的话，就不会执行 func 函数
            }, timeout);
        }
}
button.addEventListener('click', debounce(payMoney, 1000));
```

**节流函数**

为什么需要节流：(因为有些事情会造成浏览器的 **回流**，而 **回流** 会使浏览器开销增大，所以我们通过 **节流** 来防止这种增大浏览器开销的事情。)

```javascript
		// 指定时间间隔内只会执行一次任务
		// 指定时间内多次触发某个操作,按第一次来; 例: 滚动加载; 
	    // 滚动屏幕：统计用户滚动屏幕的行为来做出相应的网页反应；
        // 用户如果不断的进行滚动，会不断产生请求，响应也会不断增加，容易导致网络阻塞
        // 流程：触发事件、执行任务、设置事件间隔

        // 第一种实现方法
        function coloring() {    // 1、需要节流的事件
            let r = Math.floor(Math.random() * 255);
            let g = Math.floor(Math.random() * 255);
            let b = Math.floor(Math.random() * 255);
            document.body.style.background = `rgb(${r},${g},${b})`;
        }
        function throttle(func, timeout) {   // 2、节流函数体
            let timer;  // 3、创建一个标记用来存放定时器的返回值
            return function () {
                let context = this;
                let args = arguments;
                if(timer){  //判断定时器在执行完了没有
                    return;
                }
                timer = setTimeout(() => {
                    func.apply(context,args);
                    timer = null;
                }, timeout);
            }
        }
        window.addEventListener('resize', throttle(coloring, 2000));

	    // 第二种实现方法
        function throttle(func, timeout) {
            let pre = 0;   //创建一个表示之前的时间点
            return function () {
                let now = new Date();   //现在执行函数的时间点
                let content = this;
                let args = arguments;
                if( now - pre > timeout){   //判断间隔时间是否超过 指定时间
                    func.apply(content,args);
                    pre = now;
                }
            }
        }
```

### **7、重绘与回流**   

 https://segmentfault.com/a/1190000017329980  （详细）

- **重点**：**回流必定会触发重绘，重绘不一定会触发回流。重绘的开销较小，回流的代价较高。**

**重绘(repaint)**：当元素样式的改变不影响布局时，浏览器将使用重绘对元素进行更新，此时由于只需要 UI 层面的重新像素绘制，因此**损耗较少**。

常见的重绘操作有：1、改变元素颜色；2、改变元素背景色

**回流(reflow)**：又叫重排（layout）。当元素的尺寸、结构或者触发某些属性时，浏览器会重新渲染页面，称为回流。此时，浏览器需要重新经过计算，计算后还需要重新页面布局，因此是较重的操作。

常见的回流操作有：

1. 页面初次渲染
2. 浏览器窗口大小改变
3. 元素尺寸/位置/内容发生改变
4. 元素字体大小变化
5. 添加或者删除可见的 DOM 元素
6. 激活 CSS 伪类（:hover……）

如何避免大量使用重绘与回流呢？

1. 避免频繁操作样式，可汇总后统一一次修改
2. 尽量使用 class 进行样式修改，而不是直接操作样式
3. 减少 DOM 的操作，可使用字符串一次性插入

**浏览器解析 URL**

**从浏览器输入 URL 到渲染成功的过程中，究竟发生了什么？**

**浏览器渲染过程中，发生了什么，是不是也有重绘与回流？**

用户输入 URL，到浏览器呈现给用户页面，经历了以下过程：

1. 用户输入 URL 地址。
2. 对 URL 地址进行 DNS 域名解析。
3. 建立 TCP 连接（三次握手）。
4. 浏览器发起 HTTP 请求报文。
5. 服务器返回 HTTP 响应报文。
6. 关闭 TCP 连接（四次挥手）。  
7. 浏览器解析文档资源并渲染页面。



### **8、数组去重**

[12种方法]: https://segmentfault.com/a/1190000016418021?utm_source=tag-newest

```js

let arr = [0, 0, 0, 0, 1, 2, 3, 4, 4, 5, 2, 3, 3, 3, 9, 8, 9];
//数组去重法1   es6
console.log(Array.from(new Set(arr)));
//数组去重法2
console.log(...new Set(arr));

//数组去重法3
let newarr = [];
for (var i = 0; i < arr.length; i++) {
    if (newarr.indexOf(arr[i]) == -1) {
        newarr.push(arr[i]);
    };
};
console.log(newarr);

// 遍历移除法
var arr = [1, 1, 2, 2, 3, 5, 5];
for (let i = 0; i < arr.length; i++) {
    if (arr[i] === arr[i + 1]) {
        arr.splice(i, 1);
        i--;
    }
}
console.log(arr);

// 双指针法
var arr2 = [1, 1, 4, 4, 5, 6, 6];
for (var child = 0, father = 0; father < arr2.length; father++) {
    if (arr2[child] !== arr2[father]) {
        child++;
        arr2[child] = arr2[father];
    }
}
console.log(child + 1);
```

### **9、深拷贝和浅拷贝**

```js
浅拷贝：
// for in 方法
// 前两个都拿不到原对象的方法
（1）function simpleCopy(obj1) {
       var obj2 = Array.isArray(obj1) ? [] : {};  //判断obj1是对象或者数组，初始化obj2
       for (let i in obj1) {
       obj2[i] = obj1[i];
      }
       return obj2;
    }
（2）function extend(to, from) {   //不需要判断，提前定义了类型
    	for (var property in from) {
          	console.log(property);
            to[property] = from[property];
         }
         return to;
      }
（3）var extend = function (to, from) {
        for (var property in from) {
            if (!from.hasOwnProperty(property)) continue;
            Object.defineProperty(
                to,
                property,
                Object.getOwnPropertyDescriptor(from, property)
            );
        }
        return to;
    }
extend({}, { get a(){ return 1 } })   // { get a(){ return 1 } })

//Object.assign方法
var obj = {
    a: 1,
    b: 2
}
var obj1 = Object.assign(obj);
obj1.a = 3;
console.log(obj.a) // 3


// lodash库
const newObj = _.clone(oldObj);

```

```jsx
深拷贝：

function deepClone(obj){
    let objClone = Array.isArray(obj)?[]:{};
    if(obj && typeof obj==="object"){
        for(key in obj){
            if(obj.hasOwnProperty(key)){
                //判断ojb子元素是否为对象，如果是，递归复制
                if(obj[key]&&typeof obj[key] ==="object"){
                    objClone[key] = deepClone(obj[key]);
                }else{
                    //如果不是，简单复制
                    objClone[key] = obj[key];
                }
            }
        }
    }
    return objClone;
}    
let a=[1,2,3,4],
    b=deepClone(a);
a[0]=2;
console.log(a,b);

使用JSON这个方法有无法实现的地方
- 1.他无法实现对**函数** 、**RegExp**等特殊对象的克隆;
- 2.会抛弃对象的constructor,所有的**构造函数**会指向Object;
- 3.对象有**循环引用**,会报错;
function deepClone2(obj) {
  var _obj = JSON.stringify(obj),
    objClone = JSON.parse(_obj); 
  return objClone;
}

// lodash库
const newObj = _.cloneDeep(oldObj);

使用扩展运算符实现深拷贝
// 当value是基本数据类型，比如String，Number，Boolean时，是可以使用拓展运算符进行深拷贝的
// 当value是引用类型的值，比如Object，Array，引用类型进行深拷贝也只是拷贝了引用地址，所以属于浅拷贝
var car = {brand: "BMW", price: "380000", length: "5米"}
var car1 = { ...car, price: "500000" }
console.log(car1); // { brand: "BMW", price: "500000", length: "5米" }
console.log(car); // { brand: "BMW", price: "380000", length: "5米" }
```

### **10、判断对象是否有环**

可以用深度克隆的方法，先用 JSON.stringify方法将JS对象序列化成JSON字符串，在用 JSON.parse方法将JSON字符串反序列化成JS对象，这样可以进行深度克隆，但是对象有循环引用,会报错;一旦报错，我们就可以知道有环存在了。

```javascript
//个人觉得
const newObj = JSON.parse(JSON.stringify(obj));
// TypeError: Converting circular structure to JSON  将循环结构转换为JSON
```

```javascript
<script>
  //形成环
    const obj = {
        foo: {
            name: 'foo',
            bar: {
                name: 'bar',
                baz: {
                    name: 'baz',
                    aChild: null //待会让它指向obj.foo
                }
            }
        }
    }
    obj.foo.bar.baz.aChild = obj.foo // foo->bar->baz->aChild->foo 形成环
//不形成环
    // var obj = {
    //     foo: {
    //         name: 'foo',
    //         bar: {
    //             name: 'bar',
    //             baz: {
    //                 name: 'baz',
    //                 aChild: null
    //             }
    //         }
    //     },
    //     aaa: {
    //         name: "test",
    //         bbb: null
    //     }
    // }
    // obj.aaa.bbb = obj.foo; //  aaa->bbb->bar->baz->aChild->null 不形成环
//方法
    function cycleDetector(obj) {
        var hasCircle = false, //  定义一个变量，标志是否有环
            cache = []; //  定义一个数组，来保存对象类型的属性值
        	// cache = [foo,bar,baz,aChild];
        
        (function(obj) {
            var keys = Object.keys(obj); //获取当前对象的属性数组
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var value = obj[key];
                if (typeof value == 'object' && value !== null) {
                    var index = cache.indexOf(value)
                    if (index !== -1) {
                        hasCircle = true
                            // console.log(hasCircle);
                        break
                    } else {
                        cache.push(value)
                        arguments.callee(value)
                        cache.pop() //  注意：这里要推出数据，因为递归返回，后面遍历的属性不是这个数据的子属性
                    }
                }
            }
        })(obj)
        console.log(hasCircle);
        return hasCircle
    }
    cycleDetector(obj)
</script>
```







### **11、宏任务和微任务**

```
javascript是单线程 ，通过eventLoop（事件循环） 执行顺序  同步任务——> 微任务——> 宏任务
宏任务：{
    1.新程序或子程序被直接执行   <script>标签
    2.事件的回调函数
    3.setTimeout()和setlnterval()
}
微任务：{
	1.Promise.then() .catch() .finally()
	2.MutationObserver
	3.Object.observe
	4.Node.js里面的process.nextTick()
}

```

### 12、数组的用法

```js
对象，遍历，数组：https://zh.javascript.info/array-methods
splice：拼接，删除元素
slice：切片，创建副本 
split：劈开，切分字符串  split('以什么来切')

[总结](https://zh.javascript.info/array-methods#zong-jie)

数组方法备忘单：
- 添加/删除元素：
  - push(...items) —— 向尾端添加元素，
  - pop() —— 从尾端提取一个元素，
  - shift() —— 从首端提取一个元素，
  - unshift(...items) —— 向首端添加元素，
  - splice(pos, deleteCount, ...items) —— 从 pos 开始删除 deleteCount 个元素，并插入 items。
  - slice(start, end) —— 创建一个新数组，将从索引 start 到索引 end（但不包括 end）的元素复制进去。
  - concat(...items) —— 返回一个新数组：复制当前数组的所有元素，并向其中添加 items。如果 items 中的任意一项是一个数组，那么就取其元素。
- 搜索元素：
  - indexOf/lastIndexOf(item, pos) —— 从索引 pos 开始搜索 item，搜索到则返回该项的索引，否则返回 -1。
  - includes(value) —— 如果数组有 value，则返回 true，否则返回 false。
  - find/filter(func) —— 通过 func 过滤元素，返回使 func 返回 true 的第一个值/所有值。
  - findIndex 和 find 类似，但返回索引而不是值。
- 遍历元素：
  - forEach(func) —— 对每个元素都调用 func，不返回任何内容。
- 转换数组：
  - map(func) —— 根据对每个元素调用 func 的结果创建一个新数组。
  - sort(func) —— 对数组进行原位（in-place）排序，然后返回它。
  - reverse() —— 原位（in-place）反转数组，然后返回它。
  - split/join —— 将字符串转换为数组并返回。
  - reduce/reduceRight(func, initial) —— 通过对每个元素调用 func 计算数组上的单个值，并在调用之间传递中间结果。
- 其他：
  - Array.isArray(arr) 检查 arr 是否是一个数组。
请注意，sort，reverse 和 splice 方法修改的是数组本身。

// 从对象里取出 key—value
{ "key" : "value" }
for (var key in req.body) {
        console.log(JSON.parse(key));
        const { name, age, sex } = JSON.parse(key)
        User.create({
            name: name,
            sex: sex,
            age: age
        })
    }
```



# ES6

(有兼容性问题，IE7-IE11 基本不支持 ES6)

(可以使用一些工具进行降级处理，例如：**babel**)

### 1 、 let 和const

**暂时性死区**

let -- 用于声明变量

- let 定义变量，变量不可以再次定义，但可以改变其值
- 具有块级作用域
- 没有变量提升，必须先定义再使用
- let声明的变量不会压到window对象中，是独立的

const -- 用于声明常量（值不能改变）

- 使用const关键字定义常量
- 常量是不可变的，一旦定义，则不能修改其值
- 初始化常量时，必须给初始值
- 具有块级作用域
- 没有变量提升，必须先定义再使用
- 常量也是独立的，定义后不会压入到window对象中

### 2、解构赋值

 数组的解构 ——方便获取数组中的某些项

```javascript
// 情况1，变量和值一一对应
let arr = [5, 9, 10];
let [a, b, c] = arr;
console.log(a, b, c); // 输出 5 9 10
// 情况2，变量多，值少
let arr = [5, 9, 10];
let [a, b, c, d] = arr;
console.log(a, b, c, d); // 输出 5 9 10 undefined
// 情况3，变量少，值多
let arr = [5, 9, 10, 8, 3, 2];
let [a, b] = arr;
console.log(a, b); // 5, 9
// 情况4，按需取值
let arr = [5, 9, 10, 8, 3, 2];
let [, , a, , b] = arr; // 不需要用变量接收的值，用空位占位
console.log(a, b); // 10, 3 
// 情况5，剩余值
let arr = [5, 9, 10, 8, 3, 2];
let [a, b, ...c] = arr; // ...c 接收剩余的其他值，得到的c是一个数组
console.log(a, b, c); 
// 结果：
// a = 5, 
// b = 9, 
// c = [10, 8, 3, 2]
// 情况6，复杂的情况，只要符合模式，即可解构
let arr = ['zhangsan', 18, ['175cm', '65kg']];
let [, , [a, b]] = arr;
console.log(a, b); // 175cm 65kg
```

对象的解构—— 方便获取对象中的某些属性

```javascript
// 情况1，默认要求变量名和属性名一样
let { foo, bar } = {foo: 'aaa', bar: 'bbb'};
console.log(foo, bar); // aaa, bbb
let {a, c} = {a: 'hello', b: 'world'};
console.log(a, c); // hello, undefined
// 情况2，可以通过:为变量改名
let {a, b:c} = {a: 'hello', b: 'world'};
console.log(a, c); // hello, world
// 情况3，变量名和属性名一致即可获取到值，不一定要一一对应
let {b} = {a: 'hello', b: 'world'};
console.log(b); // world   此时，没有定义变量a，所以使用a会报错
// 情况4，剩余值
let obj = {name:'zs', age:20, gender:'男'};
let {name, ...a} = obj;
console.log(name, a);
// 结果：
// name = zs
// a = {age: 20, gender: "男"};

// 情况5，复杂的情况，只要符合模式，即可解构
```

### 3、函数

箭头函数与function 的区别：

```
1.箭头函数与function定义函数的写法不同
2.this的指向：使用function定义的函数，this的指向随着调用环境的变化而变化的，箭头函数没有自己的 this（它会从自己的作用域链的上一层继承this）（普通函数可以通过bind、call、apply改变this指向，可以使用new）
3.构造函数：function是可以定义构造函数的，而箭头函数是不行的。（箭头函数没有construcctor）
4.变量提升：由于js的内存机制，function的级别最高，而用箭头函数定义函数的时候，需要var(let const定义的时候更不必说)关键词，而var所定义的变量不能得到变量提升，故箭头函数一定要定义于调用之前！
```

**箭头函数** ——目的是**简化函数的定义**并且里面的this也比较特殊

```javascript
- 箭头函数内部没有 arguments
let fn = () => {
   	console.log(arguments); // 报错，arguments is not defined
};
fn(1, 2);

- 箭头函数内部的 this 指向外部作用域中的 this ，或者可以认为箭头函数没有自己的 this（箭头函数不会创建自己的this,它只会从自己的作用域链的上一层继承this）
var name = 'lisi'; // 测试时，这里必须用var，因为用let声明的变量不能使用window调用
let obj = {
    name: 'zhangsan',
    fn : () => {
        console.log(this); // window对象
        console.log(this.name); // lisi
  }
};
obj.fn();

- 箭头函数不能作为构造函数
let Person = () => {};
let obj = new Person(); // 报错，Person is not a constructor
// 换个角度理解，箭头函数中都没有自己的this，怎么处理成员，所以不能当构造函数

//this的情况：
1、以函数的形式调用时，this永远都是Window
2、以方法的形式调用时，this是调用方法的对象
3、以构造函数的形式调用时，this是新创建的那个对象
4、使用call和apply调用时，this是指定的那个对象

```

**参数的默认值** ——ES6 之前函数不能设置参数的默认值

```javascript
// ES5 中给参数设置默认值的变通做法
function fn(x, y) {
    y = y || 'world';
    console.log(x, y);
}
fn(1)  // 1,'world'
// ES6 中给函数设置默认值
function fn(x, y = 'world') {
    console.log(x, y);
}
fn(2)  // 2,'world'
fn(2,3)  //2,3
```

**rest 参数**：剩余参数，以 … 修饰最后一个参数，把多余的参数都放到一个**数组**中。可以替代 arguments 的使用

```javascript
// 参数很多，不确定多少个，可以使用剩余参数
function fn(...values) {
    console.log(values); // [6, 1, 100, 9, 10]
}
// 调用
fn(6, 1, 100, 9, 10);
```

### 4. 内置对象的扩展

**扩展运算符**

- 可以在函数调用/数组构造时, 将数组表达式或者string在语法层面展开；
- 还可以在构造字面量对象时, 将对象表达式按key-value的方式展开

```javascript
// 合并两个数组
let arr1 = [1, 2];
let arr2 = [3, 4];
let arr3 = [...arr1, ...arr2];
console.log(arr3); // [1, 2, 3, 4]
// 把数组展开作为参数，可以替代 apply
// 求数组的最大值
let arr = [6, 99, 10, 1];
let max = Math.max(...arr); // 等同于 Math.max(6, 99, 10, 1);
```

**Array.from()**

- 把伪数组转换成数组
- 伪数组必须有length属性，没有length将得到一个空数组
- 转换后的数组长度，是根据伪数组的length决定的

```javascript
let fakeArr = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3
};
let arr = Array.from(fakeArr);
console.log(arr); // ['a', 'b', 'c']
// 转数组的对象必须有length值，因为得到的数组的成员个数是length指定的个数
// 上例中，如果length为2，则得到的数组为 ['a', 'b']
```

forEach遍历数组

- 要为forEach传递一个函数进来

- 为forEach传递的函数有三个形参，分别表示数组的值、下标、当前的数组

  ```javascript
  // [xxx,xxx].forEach(function (value, index, arr) {
      // value 表示数组的值
      // index 表示数组的下标、索引
      // arr 表示当前的数组
  // });
  [3, 8, 4, 9].forEach(function (v, i, a) {
      console.log(v); // 表示数组的值 ，输出的结果是 3,8,4,9
      // console.log(i); // 表示数组的下标
      // console.log(a); // 表示数组
  });
  // 如果不需要下标和当前的数组，只使用value即可
  // 函数可以使用箭头函数
  [3, 8, 4, 9].forEach((item) => {console.log(item);});
  // 下面的意思是循环，在循环数组的时候，输出数组的每个值
  [3, 8, 4, 9].forEach(item => console.log(item));
  ```

**数组实例的 find() 和 findIndex() 类似语法的方法还有**：forEach 、some、every、filter、map、reduce

- find和findIndex方法，会遍历传递进来的数组

- 回调函数有三个参数，分别表示数组的值、索引及整个数组

- 回调函数中return的是一个条件，find和findIndex方法的返回值就是满足这个条件的第一个元素或索引

- find 找到数组中第一个满足条件的成员并返回该成员，如果找不到返回undefined。

- findIndex 找到数组中第一个满足条件的成员并返回该成员的索引，如果找不到返回 -1。

```javascript
// 语法结构
let arr = [1, 2, 4, 0, -4, 3, -2, 9];
arr.find(function (item, index, self) {
    console.log(item); // 数组中的每个值
    console.log(index); // 数组中的每个索引/下标
    console.log(self); // 当前的数组
});

// 用法：找数组中第一个小于0的数字
let arr = [1, 2, 4, 0, -4, 3, -2, 9];
let result = arr.find(function (item) {
    return item < 0; //遍历过程中，根据这个条件去查找
});
console.log(result); // -4
```

### 5、String的扩展

**模板字符串**

- 模板字符串解决了字符串拼接不便的问题
- 模板字符串使用反引号 **`** 括起来内容
- 模板字符串中的内容可以换行
- 变量在模板字符串中使用 `${name}` 来表示，不用加 + 符号

```javascript
// 内容过多可以直接换行
let obj = {name: 'zhangsan', age: 20};
let arr = ['175cm', '60kg'];
let html = `
    <div>
        <ul>
            <li>${obj.name}</li>
            <li>${obj.age + 2}</li>
            <li>${arr[0]}</li>
            <li>${arr[1]}</li>
        </ul>
    </div>
`;
```

### **6、什么是promise**

```
promise是为解决异步处理回调金字塔问题而产生的,有 3 种状态：pending、resolve 、 rejected。它可以获取异步操作的消息。Promise 的状态具有不受外界影响和不可逆两个特点。promise 
```

**传统的回调式异步操作有什么缺点？（Promise是如何解决异步操作）**
传统的回调有五大信任问题：
1）调用回调过早
2）调用回调过晚（或没有被调用）
3）调用回调次数过少或过多
4）未能传递所需的环境和参数
5）吞掉可能出现的错误和异常

**Promise 的解决办法：**

```
1） 调用回调过早
对于Promise 来说，即使是立即完成的 Promise 也无法被同步观察到，也就是说一个Promise调用 then() 的时候，即使这个 Promise 已经决议了，提供给 then的回调也总会被异步调用。

2）调用回调过晚（或没有被调用）
对于一个 Promise 对象注册每一个观察回调都是相对独立、互不干预的。而 Promise 对象调用 resolve() 和 reject() 时，每个注册的观察回调也都会被自动调用。所以这些观察回调的任意一个都无法影响或延误对其他回调的调用。
此外，关于回调未调用，正常情况下，没有任何东西可以阻止 Promise 向你通知它的决议，即使你的 js代码报错了，一定会通过异常回调来获取到。如果Promise 永远不被决议的话， Promise 本身已提供了竞态的抽象机制来作为解决方案

3）调用回调次数过少或过多
promise 的定义方式使得它只能被决议一次。即使代码中出现多次决议，这个 Promise 也会接受第一次决议，并会忽略掉其他任何后续调用。所以任何通过 then() 注册的回调只会被调用一次

4）未能传递所需的环境和参数
凡是被决议的值，都会被传递到观察回调中，如果没有显示的决议也会传递一个 undefined 给观察回调。需要主要的是，Promise 只允许传一个决意值，其他值会被默默忽略掉

5）吞掉可能出现的错误和异常
如果在创建 Promise 时，存在 JS 代码错误，会直接导致该 Promise 的拒绝决议，那么你可以通过 reject() 来获取异常，代码中的任何异常都不会吞掉。
```



**Promise 中的异步模式有哪些？有什么区别？**
**Promise.all( ) 和 Promise.race( ) 的区别。**因为 ES6中的 Promise中只有这两个模式 all 和 race，其他的如 first、any、last等都是其他 Promise库提供的。

Promise.all( ) 和 Promise.race( ) 的区别
all会将传入的数组中的所有 Promise 全部决议以后，将决议值以数组的形式传入到观察回调中，任何一个 Promise决议为拒绝，那么就会调用拒绝回调，

race会将传入的数组中的所有 promise 中第一个决议的决议值传递给观察回调，即使决议结果是拒绝的。

**Promise是如何捕获异常的？与传统的 try / catch 相比有什么优势？**

```javascript
// 传统的 try / catch 捕获异常方式是无法捕获异步的异常的，代码如下
try{
    setTimeout(function(){
        undefined();   // undefined 不是一个方法，会抛出异常
    }，500)
} catch(err){
    console.log(err)
}
// 对于Promise对象来说，构造Promise实例时的代码如果出错，则会被认为是一个拒绝的决议，并会向观察回调中传递异常信息。所以即使是一个异步的请求，Promise也是可以捕获异常的，此外，Promise还可以通过 catch回调来捕获回调中的异常。
```

**es6的继承和es5的继承有什么区别**

**ES5：**Javascript利用原型链的特性来实现继承，通过将子类构造函数的原型作为父类构造函数的实例（sub.prototype=new super）。

var Person = function(){};
var p = new Person();

new（实例化）的过程拆分成以下三步：
  (1) var p={}; 也就是说，初始化一个对象p
  (2) p.__proto__ = Person.prototype;  //空对象的__proto__指向构造函数的原型对象
  (3) Person.call(p); 也就是说构造p，也可以称之为初始化p

**ES6：**ES6封装了class，extends关键字来实现继承（跟Java的语法比较像），内部的实现原理其实依然是基于上面所讲的原型链，不过进过一层封装后，Javascript的继承得以更加简洁优雅地实现。