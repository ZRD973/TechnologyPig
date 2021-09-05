import store from '../store/index'

class Helper {
  async req(options){
    const {success,fail,complete,type,header,showMessage=false} = options,{getters,state} = store,
      {wechat,db,apiUrl:{Api}} = getters.setter,{appid,token:access_token} = state;
      // #ifndef MP-WEIXIN
      const [,device] = await this.platform();
      // #endif

      // #ifdef MP-WEIXIN
      const device = 'wechat';
      // #endif

    let req;

    const promise = new Promise((resolve, reject) => {
      req = uni.request({
        ...options,
        url:options.url || Api + options.uri,
        header:{
          'content-type':'application/json',
          timestamp:new Date().getTime(),
          appid:options.appid||appid,
          'access-token': access_token || '',
          device,
          db:options.db||db,
          wechat:options.wechat||wechat,
          ...header
        },
        method: type ? type.toUpperCase() : 'POST',
        success:res => {
          if(res.data.code === 0){
            if(showMessage){
              uni.showToast({title:res.data.msg})
            }
            resolve([null,res.data]);
            success && success.call(this,res.data);

          }else{
            if(showMessage){
              uni.showToast({title:res.data.msg,icon:'none'})
            }
            resolve([res.data]);
            fail && fail.call(this,res.data);

          }
        },
        fail:(err) => {
          if(showMessage){
            uni.showToast({title:res.data.msg,icon:'none'})
          }
          resolve([err]);
          fail && fail.call(this,err);
        },
        complete
      });
    });

    promise.abort = () => {
      req.abort();
    };

    return promise;
  }
  //相比req方法，错误和成功有提示
  reqV2(options){

    return new Promise((resoleve,reject)=>{
      this.req(options).then((res)=>{
        if(res[0]){
          setTimeout(()=>{
            reject(err)
          },500)
          uni.showToast({title:res[0].msg,icon:'none'});
        }else{
          setTimeout(()=>{
            resoleve(res)
          },500)
          uni.showToast({title:res[1].msg,icon:'success'});
        }


      })
      // .catch((err)=>{
      //   uni.showToast({title:err,icon:'none'});
      //   reject(err)
      // })
    })
  }
  reqV3(path,data){
     return this.reqV2({
        uri:'/Execute',
        data:{
          path,
          ...data
        }
    })
  }
// 对txt接口，错误和成功有提示
  reqV4(options){
    return new Promise((resoleve,reject)=>{
      this.req(options).then((res)=>{
        if(res[0]){
          setTimeout(()=>{
            reject(res[0])
          },500)
          uni.showToast({title:res[0].msg,icon:'none'});
        }
        else{
          setTimeout(()=>{
            resoleve(res)
          },500)
          uni.showToast({title:"操作成功",icon:'success'});
        }
      })
    })
  }

  // async NewERPApi(options){
  //
  //   const {success,fail,complete,type,header} = options,{getters,state} = store,
  //       {wechat,db,apiUrl:{NewERPApi}} = getters.setter,{appid,token:access_token} = state;
  //   // #ifndef MP-WEIXIN
  //   const [,device] = await this.platform();
  //   // #endif
  //
  //   // #ifdef MP-WEIXIN
  //   const device = 'wechat';
  //   // #endif
  //
  //   let req;
  //
  //   const promise = new Promise((resolve, reject) => {
  //
  //     req = uni.request({
  //       ...options,
  //       url:options.url || NewERPApi + options.uri,
  //       header:{
  //         'content-type':'application/json',
  //         timestamp:new Date().getTime(),
  //         appid,
  //         'access-token': access_token || '',
  //         device,
  //         db,
  //         wechat,
  //         ...header
  //       },
  //       method: type ? type.toUpperCase() : 'POST',
  //       success:res => {
  //         if(res.data.code === 0){
  //           resolve([null,res.data]);
  //           success && success.call(this,res.data);
  //         }else{
  //           resolve([res.data]);
  //           fail && fail.call(this,res.data);
  //         }
  //
  //       },
  //       fail:(err) => {
  //         resolve([err]);
  //         fail && fail.call(this,err);
  //       },
  //       complete
  //     });
  //   });
  //
  //   promise.abort = () => {
  //     req.abort();
  //   };
  //
  //   return promise;
  // }
  /**
   * @example
   *
   * const [err, {fail, success, fileIDs}] = await uploadImage({
   *
   *   filePaths:[] // tempFilePaths
   *   common: {} //公用 与 data中每一个元素组合，生成最终请求文件的附加信息
   *   data: [{},{}] // 顺序与filePaths一致，以此补充文件的其余附加信息
   * });
   *
   *
   * @param options {Object}
   * @param [options.url] {string}
   * @param [options.uri = 'FileUpload'] {string} -
   * @param options.filePaths {string[]} - tempFilePaths
   * @param options.data {object[]} - 顺序与filePaths一致，以此补充文件的其余附加信息
   * @param options.common {object} - 与 data中每一个元素组合，生成最终请求文件的附加信息
   * @returns {Promise<*[]>}
   */

  async uploadFile(options){

    const {success,fail,complete,header, filePaths, data, common, url, uri = '/FileUpload'} = options,{getters,state} = store,
      {wechat,db,apiUrl:{Api}} = getters.setter,{appid, token: access_token} = state, result = {fileIDs: [],success: [], fail: []};
    // #ifndef MP-WEIXIN
    const [,device] = await this.platform();
    // #endif

    // #ifdef MP-WEIXIN
    const device = 'wechat';
    // #endif

    const promises = filePaths.map((filePath, index) => {

      const formData = {
        path: "FileUpload.txt",
        canEdit: 'null',
        goalID: "",
        module: "",
        source: "",
        keys: "",
        memo: "",
        ...common,
        ...data[index]
      };

      const file = filePath instanceof File ? {file: filePath}: {filePath};

      return new Promise(resolve => {

        uni.uploadFile({
          ...options,
          url:url || Api + uri,
          header:{
            timestamp:new Date().getTime(),
            appid,
            'access-token': access_token || '',
            device,
            db,
            wechat,
            ...header
          },
          ...file,
          formData,
          name: 'file',
          success:res => {
            let data = {};
            try {
              data = JSON.parse(res.data);
            }catch (e) {
              data = {code: null, err: null, msg: '转换json失败'};
            }
            if(data.code === 0){

              const {fileInfo, tables, fileID} = data;

              result.fileIDs.push(fileID);

              result.success.push({index, fileInfo, tables, fileID, data});

              resolve();
              success && success.call(this,data);
            }else{

              const {err, msg} = data;

              result.fail.push({index, msg, err, data, filePath});

              resolve();
              fail && fail.call(this,data);
            }
          },
          fail:(err) => {
            result.fail.push({index, err, data, filePath});
            resolve();
            fail && fail.call(this,err);
          },
          complete
        });
      });
    });

    await Promise.all(promises);

    return [null, result];
  }

  async fileDelete(options){
     return this.req({
       uri: '/FileDelete',
       data: options
     });
  }

  obj2url(obj,prefix = '?'){//prefix  前缀
    const entry = Object.entries(obj);
    const query =  entry.map(([key,value]) => {
      if(value != null){
        return key + '=' + encodeURIComponent(value);
      }else{
        return key + '=';
      }
    }).join('&');

    return query ? (prefix + query) : query;

  }

  close(){
    // #ifdef H5
    WeixinJSBridge.call('closeWindow');
    // #endif
  }

  async storage(options) {
    try {

      const {tableName: table} = store.state;


      const [err,res] = await uni.getStorage({key: table});

      const storage = err? {} : (res.data || {});

      if (typeof options === 'string') {
        const key = options;

        console.log('helper.storage:',options,[null, storage.hasOwnProperty(key) ? storage[key] : undefined]);

        return [null, storage.hasOwnProperty(key) ? storage[key] : undefined];
      }

      if (Array.isArray(options)){
        console.log('helper.storage:',options,[null, options.map(key => {
          return storage.hasOwnProperty(key) ? storage[key] : undefined;
        })]);
        return [null, options.map(key => {
          return storage.hasOwnProperty(key) ? storage[key] : undefined;
        })];
      }


      if(typeof options === 'object'){
        Object.entries(options).forEach(([key,value]) => {
          storage[key] = value;
        });

        console.log('helper.storage:',options,[null, await uni.setStorage({key:table,data:storage})]);

        return [null, await uni.setStorage({key:table,data:storage})];
      }

    }catch (e) {
      return [e];
    }

  }

  async platform(){
    try {
      // #ifdef H5
      const {android,ios} = this.device();

      return [null, android ? 'android' : (ios ? 'ios' : 'computer')];

      // #endif

      // #ifdef MP-WEIXIN

      // return [null,'wechat'];

      // #endif


      // #ifndef H5

      const res = await uni.getSystemInfo();

      return [null, res.platform];

      // #endif
    }catch (e) {
      return [e];
    }

  }

  redirectTo(obj) {

    const {url} = obj,{currPage:{page,params,path}} = store.state;

    console.log('helper.redirectTo:','/' + path , url);

    if('/' + path  === url){
      this.checkAccount();
      return null;
    }

    uni.redirectTo({
      ...obj,
      fail(){
        uni.switchTab({
          ...obj,
          url
        });
      }
    });

    return null;
  }

  // onLoad自动加载的方法
  async loadCheckAccount(){

    const callTime = lastCallTimeLoadCheckAccount = new Date().getTime().toString() + Math.random().toString().substr(2,5);

    const isLaunched = () => new Promise(async resolve => {
      const {isLaunching} = store.state;
      if(!isLaunching) return resolve();
      await new Promise(resolve1 => {
        setTimeout(resolve1, 10);
      });
      await isLaunched();
      return resolve();
    });

    await isLaunched();
    const {forwarding} = store.state;
    console.log('loadCheckAccount:isLaunched,isForwarding:', forwarding);
    if(callTime === lastCallTimeLoadCheckAccount && !forwarding) {
      helper.checkAccount();
    }
  }
  // 调用时将检测账户是否需要登录
  checkAccount(){
    const {userInfo,isLaunching,currPage} = store.state,
      {setter} = store.getters,
      {page,path} = currPage,
      { noNeedLogin,bindPage } = setter;

    // if(isLaunching){
    //   console.log('checkAccount.isLaunching:', isLaunching);
    //   return setTimeout(() => {
    //     helper.checkAccount();
    //   },10);
    // }

    console.log('helper.checkAccount:',page,bindPage);

    if(page === bindPage || page === 'pages/user/oauth' || page === 'pages/user/login'){
      return null;
    }

    if(userInfo && userInfo.ID){
      return null;
    }

    if(noNeedLogin.includes(page)){

      uni.showModal({
        title:'关联登录',
        content:'您尚未绑定账号，是否绑定账号',
        cancelText:'尚无账号',
        confirmText:'前往关联',
        showCancel:true,
        success({confirm}){
          if(confirm){
            store.commit('setRedirectUrl',path);
            console.log('uni.navigateTo', bindPage);
            uni.navigateTo({
              url:'/' + bindPage,
              success(){
                uni.reLaunch({
                  url: '/' + bindPage
                });
              }
            });
          }
        }
      });

      return null;
    }

    uni.showModal({
      title:'关联登录',
      content:'您尚未绑定账号，前往关联账户',
      showCancel:false,
      complete(){
        store.commit('setRedirectUrl',path);
        console.log('uni.navigateTo', bindPage);
        uni.navigateTo({
          url:'/' + bindPage,
          success(){
            uni.reLaunch({
              url: '/' + bindPage
            });
          }
        });
      }
    });

    return null;
  }

  //#ifdef H5
  device(key){
    const agent = navigator.userAgent.toLowerCase()

      //获取版本号
      ,getVersion = function(label){
        var exp = new RegExp(label + '/([^\\s\\_\\-]+)');
        label = (agent.match(exp)||[])[1];
        return label || false;
      }

      //返回结果集
      ,result = {
        os: function(){ //底层操作系统
          if(/windows/.test(agent)){
            return 'windows';
          } else if(/linux/.test(agent)){
            return 'linux';
          } else if(/iphone|ipod|ipad|ios/.test(agent)){
            return 'ios';
          } else if(/mac/.test(agent)){
            return 'mac';
          }
        }()
        ,ie: function(){ //ie版本
          return (!!window.ActiveXObject || "ActiveXObject" in window) ? (
            (agent.match(/msie\s(\d+)/) || [])[1] || '11' //由于ie11并没有msie的标识
          ) : false;
        }()
        ,weixin: getVersion('micromessenger')  //是否微信
      };

    //任意的key
    if(key && !result[key]){
      result[key] = getVersion(key);
    }

    //移动设备
    result.android = /android/.test(agent);
    result.ios = result.os === 'ios';
    result.mobile = (result.android || result.ios) ? true : false;

    return result;
  }
  // #endif

  //  图片上传
  uploadImage(_this,keys,source,module){
    uni.chooseImage({
      count: 6, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album','camera'], //从相册选择
      success: async function (res) {
        const filespaths  = res.tempFilePaths;
        const files = res.tempFiles;
        const resultfiles = files.reduce((sum,Val,Valindex)=>{
                            sum.push({
                              "Name": Val["name"],
                              "Size": Val["size"]
                            })
                            return sum
                          },[]);
        _this.options.filePaths = filespaths;
        _this.options.data = resultfiles;
        _this.options.common = {
          'path':'hr/managelist/mobile/FileUpload.txt',
          'preID':_this.FolderID,
          'keys':keys,
          'module':module,
          'source':source,
        };
        // _this.imageSrc = [];
        // _this.imageSrcbig = [];
        console.log(filespaths)
        for(let i=0;i<filespaths.length;i++){
          const obj = {}
          obj.path = filespaths[i];
          _this.imageSrc.push(obj);
          _this.imageSrcbig.push(obj);
        }
      }
    });
  }
  uploadImageV2(options){
    return new Promise((resolve,reject)=>{
      uni.chooseImage({
        ...options,
        success:function(res){
          const imagePaths=res.tempFilePaths.map(item=>({path:item}))
          resolve({...res,imagePaths})
        }
      })
    })
  }

  //预览图片
  showImage(index,src){
    uni.previewImage({
      current:index,
      urls: src,
      longPressActions: {
        itemList: ['发送给朋友', '保存图片', '收藏'],
        success: function(data) {
          console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
        },
        fail: function(err) {
          console.log(err.errMsg);
        }
      }
    });
  }


  // 数组重构
  ArrReduce(arr,lable='F_Key',value='Caption',flag=false){
    const relarr =  arr.reduce((sum,Val,Valindex)=>{
      sum.push({
        "lable": Val[lable],
        "value": Val[value]
      })
      return sum
    },flag?[
      {
        "lable": '',
        "value": "请选择"
      }
    ]:[])
    return relarr
  }
  //遍历取值  取picker对应索引
  indexforeach(arr,rellable,eachlable){
    let fromindex;
    const len = arr.length;
    for(let i=0;i<len;i++){
      let nowlable = arr[i][eachlable];
      if(nowlable==rellable){
        fromindex = i;
      }
    }
    return fromindex;
  }



  formatDate(fmt = 'yyyy-MM-dd', date = new Date()){

    var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S+": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;

  }

  filePreviewSrc(fullPath,size){
  	const {getters} = store, {db,apiUrl:{Api}} = getters.setter;

    return `${Api}/FilePreview?appid=${db}&downloadPath=${fullPath}${size ? `&sz=${size}`: ''}`;
  }
}

Helper.prototype.list2tree = function list2tree (list, id = 'id', preId = 'preId', baseId = 0, children = 'children') {
  const match = [], unMatch = [];

  list.forEach(x => {
    if(x[preId] == null || x[preId] === baseId){
      match.push(x);
    }else {
      unMatch.push(x);
    }
  });

  return match.map(x => {
    x[children] = list2tree(unMatch, id, preId, x[id], children);
    return x;
  });
};

let lastCallTimeLoadCheckAccount;

const helper = new Helper();

export default helper;

export let a =3;
