import $ from 'jquery';

//自定义验证
form.verify({
  nickname: function (value, item) { //value：表单的值、item：表单的DOM对象
    if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) return '用户名不能有特殊字符';
    if (/(^\_)|(\__)|(\_+$)/.test(value)) return '用户名首尾不能出现下划线\'_\'';
    if (/^\d+\d+\d$/.test(value)) return '用户名不能全为数字';
  }
  ,isnan: function (value, item) {
    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if(value!=''&&!regPos.test(value)&&!regNeg.test(value)){
      return '请填写数字'
    }
  }
  ,lng: [/^(\d+°\d+'\d+[.]?\d+")|(\d+°\d+′\d+[.]?\d+″)$/,'请正确填写经纬度，使用 xx°xx\'xx.xx" 格式']
  ,regcode: [/^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/, '请输入正确的统一社会信用码']
  ,regcode2: [/^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$|^$/, '请输入正确的统一社会信用码']
  ,telephone: [/(^(\d{3,4}-|\d{3,4})?\d{7,8})$|(^1\d{10}$)/, '电话号码格式不正确']
  ,double: [/^[-\+]?[1-9]+[0-9]*\.?[0-9]*$|^[-\+]?0\.[0-9]+$|^0?$/, '请填写数字']
  ,decimal: [/^[\-|\+]{0,1}[1-9]?[0-9]+\.?[0-9]{0,6}$/, '数字格式不正确']
  ,password: [/^[\S]{6,16}$/,'密码必须6到16位，且不能出现空格']
  ,searchname: [/[\u4e00-\u9fa5]{1,4}/, '姓名格式不正确']
  ,unsignedInt: [/^[1-9]+[0-9]*$|^0?$/, '请填写非负整数']
  ,username: [/[\u4e00-\u9fa5]{2,4}/, '姓名格式不正确']
  ,int: [/^[-\+]?[1-9]+[0-9]*$|^0?$/, '请填写整数']
  ,choose:function (value,item) {
    if(item.tagName == 'SELECT'){
      return /[\S]+/.test(value) ? null : '未选择任何选项';
    }
    return $(item).closest('.layui-form').find('[name="'+ item.name +'"]:checked').length ? null : '未选择任何选项';
  }
  ,identity: [/(^\d{15}$)|(^\d{17}(x|X|\d)$)/, '请输入正确的身份证号']
  //允许为空
  ,posLat: [/^[-\+]?(180|([0-9]|[1-9][0-9]|1[0-7][0-9])(\.[0-9]+)?)$|^$/, '经度填写不正确！范围为-180~180']
  ,posLng: [/^[-\+]?(90|([0-9]|[1-8][0-9](\.[0-9]+)?))$|^$/, '纬度填写不正确！范围为-90~90']
  ,telephone2: [/(^(\d{3,4}-|\d{3,4})?\d{7,8})$|(^1\d{10}$)|^$/, '电话号码格式不正确']
  ,decimal2: [/^[\-|\+]{0,1}[1-9]?[0-9]+\.?[0-9]{0,6}$|^$/, '数字格式不正确']
  ,identity2: [/(^\d{15}$)|(^\d{17}(x|X|\d)$)|^$/, '请输入正确的身份证号']
});

//缩小table数据行--修改源数据
Object.defineProperty(Array.prototype,'removeRowN',{
  enumerable:false,
  value:function (name,value) {
    var that=this;
    if( $.type(value) == 'string')  value=value.split(',');
    if( $.type(value) == 'number' ) value=[].concat(value);
    var result = that.filter(function (value1) {
      var flag = true;
      value.forEach(function (value2) {
        if(value1[name] == value2){
          flag = false;
        }
      });
      return flag;
    });
    that.splice(0);
    that.push.apply(that,result);
    return that;
  }
});

// 增加Array分组方法， 按某属性进行分组，保留哪些列。 [{name: '王宇', lng: 121.5333, }]
Object.defineProperty(Array.prototype, 'group', {
  enumerable: false,
  value: function (name, cols){
    var arr = this, res = {}, resarr = [];
    if(cols && typeof(cols) === 'string') cols = cols.split(',');
    arr.forEach(function (item, idx, ar){
      var n = item[name];
      var resn = res[n];
      if(!resn) resn = res[n] = [];
      resn.push(cols?JSON.parse(JSON.stringify(item,cols)):item);
    })
    for(key in res){
      resarr.push(res[key]);
    }
    return resarr;
  }
});

// 增加Array 行转列 方法。 按什么进行分组，
Object.defineProperty(Array.prototype, 'rowToCol', {
  enumerable: false,
  value: function (gpCols, convCol, valCol, countField) {
    var arr = this;
    var obj = {}, resarr = [];

    // 遍历数组
    arr.forEach(function (item, index, arr) {
      var tmprow = {};

      // 利用对象的 key 唯一性，分组建立
      var k = gpCols.reduce(function (r, it, i, arr) {
        tmprow[it] = item[it];
        return r + item[it] + '-';
      }, '');

      // 无属性，则建立，有属性则使用。
      if (!obj[k]) {
        obj[k] = tmprow;
      } else {
        tmprow = obj[k];
      }
      var calCount = function (col, val, cntFld){
        cntFld = cntFld || countField;
        var sum, name;
        if(!cntFld) return;

        if (typeof cntFld === 'string'){
          name = cntFld;
        }
        else if(Object.prototype.toString.call(cntFld) === '[object Array]'){
          cntFld.forEach(function (it, idx){
            calCount(col, val, it);
          });
        }else {
          name = cntFld.name;
          if(cntFld.fields.indexOf(col) == -1)
            return;
        }
        if(!name) return;
        sum = tmprow[name];

        tmprow[name] = (sum ? sum : 0) + val;
      }
      // 进行转换
      if (typeof convCol === 'object' && typeof convCol.fn === 'function') {

        // 如果转换列设置了 name 和 列属性命名函数
        if(Object.prototype.toString.call(valCol) === '[object Array]'){

          // 需要转多个列时
          valCol.forEach(function (col, idx, arr){
            var newname = convCol.fn(item[convCol.name], item, col);

            // 没获取到列名时，这不对列赋值
            if(newname){
              tmprow[newname] = item[col];

              // 要求计算小计
              calCount(col, item[col]);
            }
          });
        }else{
          tmprow[convCol.fn(item[convCol.name], item)] = item[valCol];

          // 要求计算小计
          calCount(valCol, item[valCol]);
        }
      } else if (typeof convCol === 'object' && convCol.map) {

        // 获取转换后的属性名， 如果转换列设置了 name 和 列头对应关系map: [{bf: ['列1', '列11'], af: 'col1'}, {bf: ['列2', '列12'], af: 'col2'}]
        var map = convCol.map, len = convCol.map.length, colname = convCol.name, afcolname;
        for (var j = 0; j < len; j++) {
          if (map[j].bf.indexOf(item[colname]) != -1) {
            afcolname = map[j].af;
            break;
          }
        }

        //
        tmprow[afcolname] = item[valCol];

        // 要求计算小计
        calCount(valCol, item[valCol]);
      } else {

        // 其他情况，直接用 转换的值作为转换后的 属性名
        tmprow[item[co]] = item[valCol];

        // 要求计算小计
        calCount(valCol, item[valCol]);
      }
    });

    // 转换成最后结果数组
    for (var k in obj) {
      resarr.push(obj[k]);
    }
    return resarr;
  }
});

//左补位 total为补齐位数，pad为补位字符
Object.defineProperty(Number.prototype, 'padLeft', {
  enumerable: false,
  value: function (total, pad) {
    return (Array(total).join(pad || 0) + this).slice(-total);
  }
});

//左补位 total为补齐位数，pad为补位字符
Object.defineProperty(String.prototype, 'padLeft', {
  enumerable: false,
  value: function (total, pad) {
    return (Array(total).join(pad || 0) + this).slice(-total);
  }
});

//剔除所有不可见字符
Object.defineProperty(String.prototype, 'trimAll', {
  enumerable: false,
  value: function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  }
});

//替换源数据内容--修改源数据
Object.defineProperty(Object.prototype, 'replaceWith', {
  enumerable:false,
  value:function () {
    var that = this;
    if($.isArray(that)){
      Array.prototype.splice.call(that,0,that.length);
      $.extend.apply($,[true,that].concat(Array.prototype.slice.call(arguments,0)));
    }else{
      for(var key in that){
        delete that[key];
      }
      $.extend.apply($,[true,that].concat(Array.prototype.slice.call(arguments,0)));
    }
  }
});

//缩小table数据列
Object.defineProperty(Object.prototype, 'shrinkTableCol', {
  enumerable:false,
  value:function (name,alias) {
    var tableset = this;
    alias = alias || name;
    if($.type(name) == 'string') name = name.split(',');
    if($.type(alias) == 'string') alias = alias.split(',');
    var shrinkTable=[];
    for(var i=0;i<tableset.length;i++){
      var rowData={};
      for(var j=0;j<name.length;j++){
        if(alias[j])
          rowData[alias[j]]=tableset[i][name[j]];
        else
          rowData[name[j]]=tableset[i][name[j]];
      }
      shrinkTable.push(rowData);
    }
    return shrinkTable;
  }
});

//缩小table数据行--不修改源数据
Object.defineProperty(Object.prototype, 'reduceTableRowN', {
  enumerable:false,
  value:function (name,value) {
    var result = [];
    var that=this;
    if( $.type(value) == 'string')  value=value.split(',');
    if( $.type(value) == 'number' ) value=[].concat(value);
    for (var data in that) {
      for(var index in value){
        if(value[index] != that[data][name]) {
          result.push($.extend(true, {}, that[data]));
        }
      }
      // if( value.indexOf(that[data][name]) != -1){
      //     result.push($.extend(true, {}, that[data]));
      // }
    }
    return result;
  }
});

//缩小table数据行--修改源数据
Object.defineProperty(Object.prototype, 'removeTableRowN', {
  enumerable:false,
  value:function (name,value) {
    var result = [];
    var that=this;
    if( $.type(value) == 'string')  value=value.split(',');
    if( $.type(value) == 'number' ) value=[].concat(value);
    for (var data in that) {
      for(var index in value){
        if(value[index] != that[data][name]) {
          result.push($.extend(true, {}, that[data]));
        }
      }
      // if( value.indexOf(that[data][name]) != -1){
      //     result.push($.extend(true, {}, that[data]));
      // }
    }
    Array.prototype.splice.call(that,0,that.length);
    for (var index in result){
      that.push(result[index]);
    }
    //that.concat(result);
    return result;
  }
});

//获取table复行
Object.defineProperty(Object.prototype, 'getTableRowN', {
  enumerable:false,
  value:function (name, value) {
    var result = [];
    var that=this;
    if( $.type(value) == 'string')  value=value.split(',');
    if( $.type(value) == 'number' ) value=[].concat(value);
    for (var data in that) {
      for(var index in value){
        if(value[index]==that[data][name])
        {
          result.push($.extend(true, {}, that[data]));
        }
      }
      // if( value.indexOf(that[data][name]) != -1){
      //     result.push($.extend(true, {}, that[data]));
      // }
    }
    return result;
  }
});

//获取table复列
Object.defineProperty(Object.prototype, 'getTableColN', {
  enumerable:false,
  value:function (name) {
    var that=this;
    var result = {};
    if( $.type(name) == 'string')  name=name.split(',');
    layui.each(name,function (index,value) {
      result[value] = that.getTableCol(value);
    });
    return result;
  }
});

//获取table单行
Object.defineProperty(Object.prototype, 'getTableRow', {
  enumerable:false,
  value:function (name, value) {
    var that=this;
    for (var data in that) {
      if(that[data][name] == value){
        return $.extend(true, {}, that[data]);
      }
    }
    return null;
  }
});

//获取table列
Object.defineProperty(Object.prototype, 'getTableCol', {
  enumerable:false,
  value:function (name) {
    var that=this;
    var result = [];
    layui.each(that,function (index, data) {
      result.push(data[name]);
    });
    return result;
  }
});

//遍历元素
Object.defineProperty(Object.prototype, 'hbEach', {
  enumerable:false,
  value:function (cb,thisArg) {
    var that= this;
    for(var key in that){
      cb.call(thisArg || that, that[key],key,that);
    }
  }
});

Object.defineProperty(Object.prototype, 'grab', {
  enumerable:false,
  value:function (key) {
    var that = this;
    return getValue(that,key);
  }
});

// //对象复制
// Object.defineProperty(Object.prototype, 'clone', {
//   enumerable: false,
//   value: function () {
//     var i = 1,
//       target = arguments[0] || {},
//       deep = false,
//       length = arguments.length,
//       name, options, src, copy,
//       copyIsArray, clone;

//     // 如果第一个参数的数据类型是Boolean类型
//     // target往后取第二个参数
//     if (typeof target === 'boolean') {
//       deep = target;
//       // 使用||运算符，排除隐式强制类型转换为false的数据类型
//       // 如'', 0, undefined, null, false等
//       // 如果target为以上的值，则设置target = {}
//       target = arguments[1] || {};
//       i++;
//     }

//     // 如果target不是一个对象或数组或函数
//     if (typeof target !== 'object' && !(typeof target === 'function')) {
//       target = {};
//     }

//     // 如果arguments.length === 1 或
//     // typeof arguments[0] === 'boolean',
//     // 且存在arguments[1]，则直接返回target对象
//     if (i === length) {
//       return target;
//     }

//     // 循环每个源对象
//     for (i = 0; i < length; i++) {
//       // 如果传入的源对象是null或undefined
//       // 则循环下一个源对象
//       if (typeof (options = arguments[i]) != null) {
//         // 遍历所有[[emuerable]] === true的源对象
//         // 包括Object, Array, String
//         // 如果遇到源对象的数据类型为Boolean, Number
//         // for in循环会被跳过，不执行for in循环
//         for (name in options) {
//           // src用于判断target对象是否存在name属性
//           src = target[name];
//           // copy用于复制
//           copy = options[name];
//           // 判断copy是否是数组
//           copyIsArray = Array.isArray(copy);
//           if (deep && copy && (typeof copy === 'object' || copyIsArray)) {
//             if (copyIsArray) {
//               copyIsArray = false;
//               // 如果目标对象存在name属性且是一个数组
//               // 则使用目标对象的name属性，否则重新创建一个数组，用于复制
//               clone = src && Array.isArray(src) ? src : [];
//             } else {
//               // 如果目标对象存在name属性且是一个对象
//               // 则使用目标对象的name属性，否则重新创建一个对象，用于复制
//               clone = src && typeof src === 'object' ? src : {};
//             }
//             // 深复制，所以递归调用copyObject函数
//             // 返回值为target对象，即clone对象
//             // copy是一个源对象
//             target[name] = copyObject(deep, clone, copy);
//           } else if (copy !== undefined){
//             // 浅复制，直接复制到target对象上
//             target[name] = copy;
//           }
//         }
//       }
//     }
//     // 返回目标对象
//     return target;
//   }
// });

//转换table为数组
Object.defineProperty(Object.prototype,'tableToArray',{
  enumerable:false,
  value:function (name) {
    var that=this;
    if( $.type(name) == 'string')  name = name.split(',');
    var result = [];
    for(var data in that){
      var item=[];
      name.forEach(function (value) {
        item.push(that[data][value]);
      });
      result.push(item);
    }
    return result;
  }
});

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

function getValue(obj,key) {
  var keys = key.split('.');
  if(typeof obj[keys[0]] == 'undefined'){
    return undefined;
  }
  if(obj[keys[0]] == null){
    return keys.length > 1 ? undefined : null;
  }
  if(keys.length==1){
    return obj[keys[0]];
  }else{
    return getValue(obj[keys[0]],keys.slice(1).join('.'));
  }
};

var cache = {};

var utils = {
  //刷新项目管理菜单
  loadMenu: function (menu) {
    if ($('#layui-side-scroll').length) {
      return view('layui-side-scroll').render('menu');
    }
    else if ($('ul[nav-id]').length) {
      return view($('[nav-id=' + menu + ']')).render(menu);
    }
  },
  //拓展组件方法
  addMethod: function (target, scope, cb) {
    var cb2;
    target['addMethod'] = function (name,func,useScope) {
      if(typeof name === 'function'){
        var obj = name(scope);
        Object.keys(obj).forEach(function (key) {
          var method = obj[key];
          if(typeof method === 'function') {
            target[key] = method;
          }
          if(cb) cb(key,target[key]);
          if(cb2) cb2(key,target[key]);
        });
      }else{
        var method = useScope ? func.call(target,scope) : func;
        if(typeof method === 'function') {
          target[name] = method;
        }
        if(cb) cb(name,target[name]);
        if(cb2) cb2(name,target[name]);
      }

      return this;
    };
    target['addMethod'].called = function (cb) {
      cb2 = cb;
      return this;
    }
  },
  //重载回调
  callbacks: function (name, flags) {
    return cache[name] = cache[name] || $.Callbacks(flags);
  },
  //双系统切换，设置导航栏选中
  activeNav: function (url) {
    var sideDOM = '.layui-layout-admin>.layui-side>.layui-side-scroll';
    // var headerDOM = '.layui-layout-admin>.layui-header';
    if (!url) {
      url = location.hash;
    }
    if (url) {
      $(sideDOM + '>.layui-nav .layui-nav-item .layui-nav-child dd.layui-this').removeClass('layui-this');
      $(sideDOM + '>.layui-nav .layui-nav-item.layui-this').removeClass('layui-this');
      var $a = $(sideDOM + '>div>.layui-nav a[lay-href="' + url + '"]');
      if ($a.length > 0) {
        // var isMini = $('.layui-layout-admin').hasClass('admin-nav-mini');
        if ($(sideDOM + '>.layui-nav').attr('lay-shrink') === 'all') {  // 手风琴效果
          var $pChilds = $a.parent('dd').parents('.layui-nav-child');
          // if (isMini) {
          //   $(sideDOM + '>.layui-nav .layui-nav-itemed>.layui-nav-child').not($pChilds).css('display', 'none');
          // } else {
          //   $(sideDOM + '>.layui-nav .layui-nav-itemed>.layui-nav-child').not($pChilds).slideUp('fast');
          // }
          $(sideDOM + '>.layui-nav .layui-nav-itemed').not($pChilds.parent()).removeClass('layui-nav-itemed');
        }
        $a.parent().addClass('layui-this');  // 选中当前
        var $asParents = $a.parent('dd').parents('.layui-nav-child').parent();
        // if (isMini) {
        //   $asParents.not('.layui-nav-itemed').children('.layui-nav-child').css('display', 'block');
        // } else {
        //   $asParents.not('.layui-nav-itemed').children('.layui-nav-child').slideDown('fast', function () {
        //     // 菜单超出屏幕自动滚动
        //     var topBeyond = $a.offset().top + $a.outerHeight() + 30 - admin.getPageHeight();
        //     var topDisparity = 50 + 65 - $a.offset().top;
        //     if (topBeyond > 0) {
        //       $(sideDOM).animate({'scrollTop': $(sideDOM).scrollTop() + topBeyond}, 100);
        //     } else if (topDisparity > 0) {
        //       $(sideDOM).animate({'scrollTop': $(sideDOM).scrollTop() - topDisparity}, 100);
        //     }
        //   });
        // }
        $asParents.addClass('layui-nav-itemed');  // 展开所有父级
        // // 适配多系统模式
        // $('ul[lay-filter="layadmin-system-side-menu"]').addClass('layui-hide');
        // var $aUl = $a.parents('.layui-nav');
        // $aUl.removeClass('layui-hide');
        // // $(headerDOM + '>.layui-nav>.layui-nav-item').removeClass('layui-this');
        // // $(headerDOM + '>.layui-nav>.layui-nav-item>a[nav-bind="' + $aUl.attr('nav-id') + '"]').parent().addClass('layui-this');
        // $(headerDOM + ' li > div[nav-area]').addClass('layui-hide');
        // $(headerDOM + ' li > div[nav-area=' + $aUl.attr('nav-id') + ']').removeClass('layui-hide');
        // $(headerDOM + ' select[name=system]').val($aUl.attr('nav-id'));
        // form.render('select', 'LAY_app_form');
      }
    } else {
      console.warn('active url is null');
    }
  },
  // layui数据表格填充数据合计行
  fillTotalRow: function (laytable){
    var row = laytable.totalRow,
      tr = laytable.elem.next().find('.layui-table-total tr');

    // 显示合计文本
    tr.find('td[data-field="' + (laytable.totalRowTextField || 'no') + '"] div').html(laytable.totalRowText || '合计');

    // 根据合计行数据填充
    for(var k in laytable.totalRow){
      tr.find('td[data-field="' + k + '"] div').html(row[k]);
    }
  },
  cache: cache
};


export default utils;
