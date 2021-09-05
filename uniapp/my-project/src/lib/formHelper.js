class FormHelper {
  constructor(){
    this.verifys = {
      required: [/[\S]+/,'必填项不能为空'],
      notZero:[/[1-9]?|\d{2,}/,'不能为0'],
      notEmptyAndZero:value=>{
        if(value===''||+value===0){
          return '不能为0或空字符串'
        }
      },
      phone: [/^1\d{10}$/,'请输入正确的手机号'],
      email: [/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,'邮箱格式不正确'],
      url: [/(^#)|(^http(s*):\/\/[^\s]+\.[^\s]+)/,'链接格式不正确'],
      number: function(value){
        if(!value || isNaN(value)) return '只能填写数字'
      },
      height:[ /^(0{1}|[1-9]\d{0,3}|.{0})$/,'请输入正确身高'],
      weight:[  /^(0(\.\d{1}){0,1}|[1-8]\d{1,3}(\.\d{1}){0,1}|9\d{1,2}(\.\d{1}){0,1}|999(\.0){0,1}|.{0})$/,'请输入正确体重'],
      date: [/^(\d{4})[-\/](\d{1}|0\d{1}|1[0-2])([-\/](\d{1}|0\d{1}|[1-2][0-9]|3[0-1]))*$/,'日期格式不正确'],
      identity: [/^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,'请输入正确的身份证号'],
      nickname(value) { //value：表单的值、item：表单的DOM对象
        if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) return '用户名不能有特殊字符';
        if (/(^\_)|(\__)|(\_+$)/.test(value)) return '用户名首尾不能出现下划线\'_\'';
        if (/^\d+\d+\d$/.test(value)) return '用户名不能全为数字';
      }
      ,isnan(value) {
        const regPos = /^\d+(\.\d+)?$/; //非负浮点数
        const regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
        if(value!=''&&!regPos.test(value)&&!regNeg.test(value)){
          return '请填写数字'
        }
      }
      ,lng: [/^(\d+°\d+'\d+[.]?\d+")|(\d+°\d+′\d+[.]?\d+″)$/,'请正确填写经纬度，使用 xx°xx\'xx.xx" 格式']
      ,regcode: [/^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/, '请输入正确的统一社会信用码']
      ,telephone: [/(^(\d{3,4}-|\d{3,4})?\d{7,8})$|(^1\d{10}$)/, '电话号码格式不正确']
      ,double: [/^[-\+]?[1-9]+[0-9]*\.?[0-9]*$|^[-\+]?0\.[0-9]+$|^0?$/, '请填写数字']
      ,decimal: [/^[\-|\+]{0,1}[1-9]?[0-9]+\.?[0-9]{0,6}$/, '数字格式不正确']
      ,password: [/^[\S]{6,16}$/,'密码必须6到16位，且不能出现空格']
      ,searchname: [/[\u4e00-\u9fa5]{1,4}/, '姓名格式不正确']
      ,unsignedInt: [/^[1-9]+[0-9]*$|^0?$/, '请填写非负整数']
      ,username: [/[\u4e00-\u9fa5]{2,4}/, '姓名格式不正确']
      ,int: [/^[-\+]?[1-9]+[0-9]*$|^0?$/, '请填写整数']
      // ,choose:function (value,item) {
      //   if(item.tagName == 'SELECT'){
      //     return /[\S]+/.test(value) ? null : '未选择任何选项';
      //   }
      //   return $(item).closest('.layui-form').find('[name="'+ item.name +'"]:checked').length ? null : '未选择任何选项';
      // }

      //允许为空
      ,posLat: [/^[-\+]?(180|([0-9]|[1-9][0-9]|1[0-7][0-9])(\.[0-9]+)?)$|^$/, '经度填写不正确！范围为-180~180']
      ,posLng: [/^[-\+]?(90|([0-9]|[1-8][0-9](\.[0-9]+)?))$|^$/, '纬度填写不正确！范围为-90~90']
      ,telephone2: [/(^(\d{3,4}-|\d{3,4})?\d{7,8})$|(^1\d{10}$)|^$/, '电话号码格式不正确']
      ,decimal2: [/^[\-|\+]{0,1}[1-9]?[0-9]+\.?[0-9]{0,6}$|^$/, '数字格式不正确']
      ,identity2: [/(^\d{15}$)|(^\d{17}(x|X|\d)$)|^$/, '请输入正确的身份证号']
    };
  }

  async check(verifys,formData,key = verifys){
    const that = this;
    if(typeof verifys === 'string'){
      const verify = that.verifys[verifys];
      if(Array.isArray(verify)){
        if(verify[0].test(formData)){
          return [null];
        }else{
          return new Promise(resolve => {
            uni.showModal({
              title:'错误提示',
              content:verify[1],
              showCancel:false,
              complete(){
                resolve([key,verify[1]]);
              }
            });
          });
        }
      }else{
        const res = verify(formData);

        return res ? [key,res] : [null];
      }
    }

    if(Array.isArray(verifys)){
      for (let i = 0, len = verifys.length; i < len; i++){
        const [err,res] = await that.check(verifys[i],formData,key);
        if(err){
          return [err,res];
        }
      }
      return [null];
    }

    const entries = Object.entries(verifys);

    for( let i = 0, len = entries.length; i < len; i++ ){
      const [key,value] = entries[i];

      const [err,res] = await that.check(value,formData[key],key);

      if(err){
        return [err,res];
      }

    }

    return [null];

  }
 async checkDate(startDate,endDate,message){
    let start = Date.parse(startDate);
    let end = Date.parse(endDate);
    if(start>end){
        uni.showToast({title:message,icon:'none'});
        throw message;
    }
  }
  async checkfrom(verifys,formData,key = verifys,message){
    const that = this;
    if(typeof verifys === 'string'){
      const verify = that.verifys[verifys];
      if(Array.isArray(verify)){
        if(verify[0].test(formData)){
           return [null];
        }else{
          return new Promise(resolve => {
            uni.showModal({
              title:'错误提示',
              content:message||verify[1],
              showCancel:false,
              complete(){
                resolve([key,verify[1]]);
              }
            });
          });
        }
      }else{
        const res = verify(formData);
        if(res){
          uni.showModal({
            title:'错误提示',
            content:message||res,
            showCancel:false,
            // complete(){
            //   resolve([key,res]);
            // }
          });
        }
        return res ? [key,res] : [null];
      }
    }

    if(Array.isArray(verifys)){
      for (let i = 0, len = verifys.length; i < len; i++){
        // if(verifys[i].valuedate){
        //   const reltext = verifys[i].valuedate;
        //   const nowfrom = reltext.from;
        //   console.log(reltext.nowtype)
        //   console.log(nowfrom)
        //   // if(reltext){
        //   //     return new Promise(resolve => {
        //   //       uni.showModal({
        //   //         title:'错误提示',
        //   //         content:reltext,
        //   //         showCancel:false,
        //   //         complete(){
        //   //           return ''
        //   //         }
        //   //       });
        //   //     });
        //   // }
        // }else{
          const [err,res] = await that.checkfrom(verifys[i].type,formData,key,verifys[i].message);
          if(err){
            throw [err,res]
          }
        // }

      }
      return [null];
    }
    const entries = Object.entries(verifys);

    for( let i = 0, len = entries.length; i < len; i++ ){
      const [key,value] = entries[i];
      const [err,res] = await that.checkfrom(value,formData[key],key);
      if(err){
        return [err,res];
      }
    }
    return [null];
  }


  verify(key,value){
    const that = this;
    if(typeof key === 'string'){
      if(Array.isArray(value) || typeof value === 'function'){
        this.verifys[key] = value;
      }
      return this;

    }

    Object.entries(key).forEach( ([key,value]) => {
      that.verify(key,value);
    });

    return this;

  }

}

export default new FormHelper()