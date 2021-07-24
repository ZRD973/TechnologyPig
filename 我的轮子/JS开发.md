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



