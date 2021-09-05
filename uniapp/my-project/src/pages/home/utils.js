// 验证是否为空
export const checkEmpty = (Str) => {
    if (Str) {
        return true;
    } else {
        return false
    }
}
// 手机号验证
export const checkPhone = (numStr) => {
    if (numStr) {
        let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        return myreg.test(numStr);
    } else {
        return false
    }
}
// 姓名验证
export const checkName = (name) => {
    if (name) {
        let reg = /^[a-zA-Z\u4E00-\u9FA5\uF900-\uFA2D\u00B7\u2022\u0095\u0387]+$/;
        let strRe = /[\u4E00-\u9FA5]/g;
        let str = name.match(strRe);
        let strlength;
        if (str == null) {
            strlength = name.length;
        } else {
            strlength = name.length + str.length * 2; // 汉字按三个字节
        }
        if (strlength <= 3 || strlength > 48) {
            return false;
        }
        if (!name.match(reg)) {
            return false;
        }
        else {
            let headExp = /^[\u00B7\u2022\u0095\u0387]+/;
            let tailExp = /[\u00B7\u2022\u0095\u0387]+$/;
            let zhExp = /[\u4E00-\u9FA5\uF900-\uFA2D]+[\s]+/;
            let zhcharExp = /[\u4E00-\u9FA5\uF900-\uFA2D]+[u00B7\u2022\u0095\u0387]?[a-zA-Z]+/;
            let charzhExp = /[a-zA-Z]+[u00B7\u2022\u0095\u0387]?[\u4E00-\u9FA5\uF900-\uFA2D]+/;
            if (headExp.test(name)) {
                return false;
            }
            if (tailExp.test(name)) {
                return false;
            }
            if (zhExp.test(name)) {
                return false;
            }
            if (zhcharExp.test(name)) {
                return false;
            }
            if (charzhExp.test(name)) {
                return false;
            }
            return true;
        }
    } else {
        return false;
    }
}
//格式化当前时间
Object.defineProperty(Date.prototype, 'Format', {
    enumerable: false,
    value: function (fmt) {
      var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S+": this.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) {
          var str = RegExp.$1, len = str.length;
          fmt = fmt.replace(str, (len === 1 ? o[k] : (new Array(len).fill('0').join('') + o[k]).substr(("" + o[k]).length)));
        }
      return fmt;
    }
  });

  export const stringExistFromArray= ((str,arr,callback)=>{
    arr.forEach(item => {
      if (String.prototype.indexOf.call(item,str) !== -1) {
        //把在数组中查找到的项传回去
        callback(item)
      }
    })
  })


export  function filter(value) {
    let inputContent = value;
    const blacklist = ['感谢', '拜访', '中秋', '国庆', '元旦', '春节', '接待', '探望','过节']
    for (let i = 0; i < blacklist.length; i++) {
      if (inputContent.indexOf(blacklist[i]) !== -1) { 
        uni.showToast({
          title: "敏感词已删除，请重新输入其他内容",
          icon: "none",
        });
      }
      // 创建一个正则表达式
      var r = new RegExp(blacklist[i], "ig");
      inputContent = inputContent.replace(r, "*");
    }
    // 显示的内容--showInput
    return inputContent
  }