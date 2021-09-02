### JS比较日期

```js
function compareDate(dateTime1，dateTime2){
    let formatDate1 = Date.parse(dateTime1)
    let formatDate2 = Date.parse(dateTime2)
    //var formatDate1 = new Date(dateTime1)；
    //var formatDate2 = new Date(dateTime2)；
    	//formatDate1.getTime()
     	//formatDate2.getTime()
    if（formatDate1 > formatDate2）{
        return formatDate1;
    }else{
        return formatDate2;
    }
}
//测试代码：
var date = compareDate（“2019-05-01”，“2019-05-05”）；//须将日期转换成“YYYY-MM-DD”格式

//时间戳比较
startTime=Date.parse(starttime);
endTime=Date.parse(endTime);
startTime>endTime
```

### **判断是否为整数类型**

```js
方式一、使用取余运算符判断
//任何整数都会被1整除，即余数是0。利用这个规则来判断是否是整数。
num % 1 === 0   //对于字符串和某些特殊值显得力不从心
typeof num ==='number' && num % 1 === 0
方式二、使用Math.round、Math.ceil、Math.floor判断
//整数取整后还是等于自己。利用这个特性来判断是否是整数
Math.floor(num) === num
方式三、通过parseInt判断——//超过32位不行
parseInt(num) === num
方式四、位运算—//—超过32位不行
(num | 0)
方式五、ES6提供了Number.isInteger
Number.isInteger(num)
```

### **Vue组件在同一个地方使用可能造成数据相互影响**

```
引入组件时可以引入两次，命名不同。
或者传递不同的参数，
再不然查百度。
```

### Vue页面刷新三种方式

```js
一、location.reload();
二、this.$router.go(0);
三、空白页面supplierAllBack.vue
	点击确定的时候先跳转到这个空白页，然后再立马跳转回来,地址栏有个快速的切换的过程，可采用
四、provide / inject 组合   isRouterAlive //true or false 来控制
// 用vue-router重新路由到当前页面，页面是不进行刷新的
```

### vue快速清空表单的方法

```js
在需要重置表单时，在created沟子中，深拷贝一份表单里面的字段（copyFrom）。在重置的方法中令data中的from等于拷贝过后的copyFrom就OK了( this.from = copyFrom )，这样可以避免暴力清空可能带来的一些错误（ this.from={} ）
```



### 小程序uniapp 踩坑合集

```js
1、uniapp开发，使用uniapp扩展组件在编译成h5端后，组件消失，使用不了。
2、小程序的组件有些没有自动销毁（一个弹窗组件，点击里面的列表，打开弹窗内容，点击关闭以后，调用弹窗close方法，没有销毁组件，需要手动销毁。）
3、小程序在转换字符串变成数字时，无法正确转换，switch,条件如果传的是字符串，无法匹配case的数字
	switch ("0") { case 0:  break; case 1:  break; }
4、小程序 v-for循环，key如果传的不正确，循环中的点击事件无法传递参数，传index就可以。
5、数字字符串，直接在值前面直接写个+号，就可以直接转换成数字。
```

npm install rimraf -g
rimraf node_modules
