
## 目标
- 掌握es6 class类
- 掌握开发中单例模式的思想
- 能够运用单例模式实战


## class类
- 是什么
es6提供的一种新的生成实例对象的方法class可以看作只是一个语法糖
es5 构造函数的另外一种写法
- 作用
更接近传统语言的写法新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法

- es5以前生成对象
```js
function Person(name, sex) {
    this.name = name;
    this.sex = sex
}
Person.prototype.say = function () {
  console.log('学前端很幸福')
};
let person1 = new Person('张三','男')
console.log(person1.name);
person1.say()
```

- es6实现
```js
class Person {
    constructor(name,sex){
        this.name = name
        this.sex = sex
    }
    say(){
        console.log('学前端很幸福');
    }
}
let person1 = new Person('张三','男')

console.log(person1.name); // 张三
person1.say() // 我会说话

```
- constructor 方法 
constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。

- 静态属性
静态属性指的是 Class 本身的属性，即Class.propName，而不是定义在实例对象（this）上的属性。

```js
class Person {
    static age = 18
    name = '张三'
}
let person = new Person();
console.log(person.age); // undefined

```
- 静态方法
类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上static关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”。
```js
class Foo {
  static classMethod() {
    return 'hello';
  }}

Foo.classMethod() // 'hello'
foo.classMethod()

```

3. ES6中的单例模式
- ES6创建对象
ES6中创建对象时引入了class和constructor用来创建对象。下面我们来使用ES6的语法实例化苹果公司
```js
class LingYuan {
  constructor(name, creator, products) {
    this.name = name;
    this.creator = creator;
    this.products = products;
  }
}

let lyCompany = new LingYuan('零远教育', '裴广斌', ['es6', 'vue', 'react', 'node']);
let lyCopyCompany = new LingYuan('苹果公司', 'walker', ['es7', 'vue', 'react', 'node']);
```
- ES6中创建单例模式
零远公司明显有且只有一个, 就是裴老师创建的那个, 哪能容别人进行复制？所以LingYuan应该是一个单例, 现在我们使用ES6的语法将constructor改写为单例模式的构造器。

- ES6的静态方法优化代码

ES6中提供了为class提供了static关键字定义静态方法， 我们可以将constructor中判断是否实例化的逻辑放入一个静态方法getInstance中，调用该静态方法获取实例， constructor中只包需含实例化所需的代码，这样能增强代码的可读性、结构更加优化。
```js
    class SingletonLy {
      constructor(name, creator, products) {
        this.name = name;
        this.creator = creator;
        this.products = products;
      }
      //静态方法
      static getInstance(name, creator, products) {
        if (!this.instance) {
          this.instance = new SingletonLy(name, creator, products);
        }
        return this.instance;
      }
    }
    let lyCompany = SingletonLy.getInstance('零远思维', '裴广斌', ['vue', 'react', 'node', 'js']);
    let lyCopyCompany = SingletonLy.getInstance('零远copy', 'walker', ['vue', 'react', 'node', 'js'])
    console.log(lyCompany === lyCopyCompany);
```