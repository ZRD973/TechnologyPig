import Vue from 'vue'
import Vuex from 'vuex'
import helper from '../lib/helper';
import {baseApiUrl,FileApi} from '../config/index';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    authLogin:false,//授权登录
    accountLogin:false,//账号登录
    isLaunching:true,//onLaunch执行中
    code:null, // 保存code 或是 公众号返回的code，或是 uni.login返回的code
    loginProvider: "",
    userInfo:null,//用户信息
    currPage:{
      page:null,
      params:null,
      path:null
    },
    forwarding: false,//是否在跳转中
    appid:'HBMSAPP',//不变
    db:'HBMS',//会变--当前项目系统 初始默认db
    tableName:'ProManageAPP',//保存的key
    token:null,//access_token
    openid: null,//用户的openid
    colorIndex: 0,
    redirectUrl:null,//完成登录后跳转的页面
    scene:null, //小程序扫描后进入的场景值
    orgList:[],//公司
    secList:[],//板块
    deptList:[],
    setter:{
      HBMS:{
        appid:'HBMS',
        db:'NewERP',
        // #ifdef H5
        wechat:'XMGK',//所用公众号或小程序

        // #endif

        // #ifdef MP-WEIXIN
        wechat:'HBMAPP',
        // #endif

        fullName:'宏波数字化协同平台', //系统全称
        shortName:'(向数字化转型)', //系统简称
        bindPage:'pages/user/bind2', //绑定页
        noNeedLogin:[ //无需绑定账号页
          'pages/home/user',
          'pages/home/menu',
          'pages/user/login',
          'pages/home/message',
          'pages/canteen/index',
          'pages/home/visitor',
        ],
        apiUrl:{ // 系统可使用地址
          // printurl_t: 'http://www.shhbmh.com:8003/print_t.aspx',
          // printurl: 'http://www.shhbmh.com:8003/print.aspx',
          // CenterDataApi:'https://shhb.group/api/real/CenterDataApi',
          // ProManageApi: 'https://shhb.group/api/real/ProManageApi',
          // defaultApi: 'https://shhb.group/api/real/NewERPApi',
          mongoApi:'https://shhb.group/mongo',
          XMGKFileApi: 'http://www.xmgkfw.cn:8080',
          WeChatApi: baseApiUrl+'/WeChatApi',
          FileApi: FileApi,
          OpenApi: baseApiUrl+'/OpenApi',
          Api : baseApiUrl+'/API'
        }
      },
      ProManage:{
        // appid:'ProManage',
        db:'ProManage',
        // #ifdef H5
        wechat:'XMGK',

        // #endif

        // #ifdef MP-WEIXIN
        wechat:'HBMAPP',
        // #endif
        // tableName:'ProManage',
        fullName:'项目管控服务平台',
        shortName:'(主干版本)',
        bindPage:'pages/user/bind',
        noNeedLogin:[
          'pages/home/user',
          'pages/home/menu',
          'pages/user/login',
          'pages/home/message'
        ],
        apiUrl:{
          // printurl_t: 'http://www.shhbmh.com:8003/print_t.aspx',
          // printurl: 'http://www.shhbmh.com:8003/print.aspx',
          // CenterDataApi:'https://shhb.group/api/real/CenterDataApi',
          // ProManageApi: 'https://shhb.group/api/real/ProManageApi',
          // defaultApi: 'https://shhb.group/api/real/NewERPApi',
          mongoApi:'https://shhb.group/mongo',
          WeChatApi: baseApiUrl+'/WeChatApi',
          FileApi: baseApiUrl+'/FileApi',
          OpenApi: baseApiUrl+'/OpenApi',
          Api : baseApiUrl+'/API'
        }
      }
    },
    // colorList: ['#FF0000','#00FF00','#0000FF']
  },
  mutations: {
    // login(state, provider) {
    //   state.hasLogin = true;
    //   state.loginProvider = provider;
    // },
    setScene(state, scene){
      state.scene = scene;
    },
    forward(state){
      state.forwarding = true;
    },
    logout(state) {
      state.hasLogin = false;
      state.openid = null;
      state.access_token = null;
    },
    setOpenid(state, openid) {
      state.openid = openid;
    },
    setUserInfo(state,userInfo) {
      state.userInfo = userInfo;
      state.accountLogin = !!userInfo.ID;
      state.authLogin = !!userInfo.openid;
    },
    setToken(state,token){
      // token.appid = token.appid || state.setter[state.db].appid;
      state.token = token;
    },
    setDb(state,db){
      state.db = db;
    },
    setCode(state,code){
      state.code = code;
    },
    setRedirectUrl(state,redirectUrl){
      state.redirectUrl = redirectUrl;
    },
    setLaunch(state,status = false){
      state.isLaunching = status;
    },
    setDeptList(state, dept){
      state.deptList = dept;
    },
    setOrgList(state, org){
      state.orgList = org;
    },
    setSecList(state, sec){
      state.secList = sec;
    },
    setCurrPage(state,page = {}){
      const pages = getCurrentPages();
      page.page = page.page || pages[pages.length-1].route;
      page.params = page.params || {};
      page.path = page.page + helper.obj2url(page.params||{},'?');
      state.currPage = page;
    }
  },
  getters:{
    // currentColor(state){
    //   return state.colorList[state.colorIndex]
    // },
    deptList:state => state.deptList,//获取部门列表
    orgList: state => state.orgList,//公司列表
    secList: state => state.secList,//板块列表
    orgTree: state => {

      const dept = helper.list2tree(state.deptList, 'ID', 'PreID');

      return state.orgList.map(x => {
        return {
          ...x,
          dept: dept.filter(y => y['OrgID'] == x['ID'])
        }
      });
    },
    secTree: state => {

      const dept = helper.list2tree(state.deptList, 'ID', 'PreID');

      return state.secList.map(x => {
        return {
          ...x,
          dept: dept.filter(y => y['SectionID'] == x['ID'])
        }
      });
    },
    fullLogin:state => state.authLogin && state.accountLogin, //是否绑定了账户
    baseLogin:state => state.authLogin || state.accountLogin, //是否获取了基本信息
    setter:state => state.setter[state.db], // 获取当前系统的对应配置
  },
  actions: {
    // H5自动登录，小程序进入授权页
    async autoLogin({commit, state, getters,dispatch},options) {//登录

      if (state.hasLogin) {
        return null;
      }

      const {query,path} = options,[err,storage] = await helper.storage(['db','access_token']);

      commit('setRedirectUrl',path + helper.obj2url(query));

      console.log('appLanch:',path);

      if(query.db){
        const db = query.db;
        commit('setDb',db);
        await helper.storage({db});
      }else {
        let db = storage[0] || state.db;
        commit('setDb',db);
        await helper.storage({db});
      }

      const {apiUrl,db:db2} = getters.setter,{Api} = apiUrl;

      if(storage[1]){

        const [err, res] = await helper.req({
          uri:'/GetUserInfoByDB',
          header:{
            'access-token':storage[1],
            db:db2
          }
        });

        console.log('GetUserInfoByDB:', err, res);
        if(res){

          const {data:{userInfo,code},access_token} = res;
          commit('setOpenid', userInfo.openid);
          
          uni.setStorage({
            key: 'openid',
            data: userInfo.openid
          });
          commit('setUserInfo',userInfo);

          commit('setCode',code);
          console.log('GetUserInfoByDB:',res);
          await dispatch('setToken',access_token);

          helper.redirectTo({
            url:'/' + state.redirectUrl
          });

          return null;

        }else{
          await dispatch('setToken',null);
        }
      }

      // #ifdef H5

      //控制返回按钮
      window.onpopstate = function (event) {

        if(event.state && event.state.first){
          window.history.pushState({first:true},null,null);
        }
      };

      const {weixin} = helper.device();//path = 'pages/index/index'

      if(!weixin){
        await uni.redirectTo({
          url: '/pages/user/login'
        });
        return null;
      }

      if(query.code){

        console.log('appLanch code:',query.code);

        const {code} = query;

        const [,res] = await helper.req({
          uri: "/GetUserInfoByCode",
          data: { code }
        });

        const {access_token,data:{userInfo,ExtraData:{RedirectUrl}}} = res;

        commit('setOpenid', userInfo.openid);
        commit('setUserInfo',userInfo);

        commit('setCode',code);
        await dispatch('setToken',access_token);

        await helper.redirectTo({
          url: '/'+RedirectUrl
        });

        window.history.pushState({first:true},null,null);
        window.history.pushState({first:true},null,null);

        return null;
      }

      const [err3, res] = await helper.req({

        uri: '/GetAuthorizeURL',
        data: {
          redirectUrl: Api + '/GetRedirectUrl',
          // redirectUrl: location.origin + location.pathname + '#/pages/user/oauth',
          login: path, // 获取用户信息后跳转页面
          basepath: location.origin + location.pathname,
          register: path,//获取用户信息失败后跳转页面
          scope: 'snsapi_userinfo',
          db: db2,
          connector:'#/',//用于拼接base和login
          join:'&',//用于拼接code
          pass: path + helper.obj2url(query) // 应该需要跳转的页面
        }
      });
      uni.hideLoading();
      if(err3) {
        return uni.showModal({
          title:'自动登录失败',
          content: '请退出重新扫码',
          showCancel:false,
          complete(){
            helper.close();
          }
        });
      }
      commit('forward');
      location.href = res.url;
      // this.$loginIsResolve()
      return null;

      // #endif

      // #ifdef MP-WEIXIN

      await new Promise((resolve, reject) => {
        uni.login({
          success: (data) => {
            console.log('uni.login:',data);
            // commit('login');
            commit('setCode',data.code);
            resolve();
          },
          fail: (err) => {
            console.log('uni.login:',err);
            console.log('uni.login 接口调用失败，将无法正常使用开放接口等服务', err)
            reject();
          }
        });
      });

      const [err1,setting] = await new Promise((resolve, reject) => {
        wx.getSetting({
          success (res){
            console.log('wx.getSetting:',res);
            resolve([null,res]);
          },
          fail:function (err) {
            console.log('wx.getSetting:',err);
            reject([err]);
          }
        })
      });

      if(err1 || !setting.authSetting['scope.userInfo']){
        console.log('uni.navigateTo','/pages/user/oauth');
        uni.hideLoading();

        uni.redirectTo({
          url: '/pages/user/oauth'
        });
        return null
      }

      const [err2,result] = await uni.getUserInfo({});

      await dispatch('authLogin',{code:state.code,...result});
      uni.hideLoading();
      return null;

      // #endif

    },
    // 获取授权的基本用户信息后进行登录
    async authLogin({commit, state, getters,dispatch},options) {//登录

      console.log('action.authLogin',options);

      const {code,iv,encryptedData} = options;

      // #ifdef MP-WEIXIN

      const [err,res] = await helper.req({
        uri:'/GetAuthorizeData',
        data:{
          code,iv,encryptedData,more:true
        }
      });

      if(err){
        console.log('req.GetAuthorizeData:',err);
        uni.showModal({
          title:'登录失败',
          content:'获取用户信息失败，请重试！',
          showCancel:false,
          complete(){

          }
        });
        return null;
      }

      console.log('req.GetAuthorizeData:',res);

      const {access_token,data:{userInfo}} = res;

      commit('setOpenid',userInfo.openid);

      commit('setUserInfo',userInfo);

      await dispatch('setToken',access_token);

      helper.redirectTo({
        url:'/' + state.redirectUrl
      });

      return null;
      // #endif

    },
    //设置token
    async setToken({commit, state, getters,dispatch},access_token){
      commit('setToken',access_token);
      await helper.storage({access_token});

      if(state.accountLogin){
        console.log('action.prepareDept:start');
        await dispatch('prepareDept');
        console.log('action.prepareDept:finish');
      }
    },
    //获取部门，公司，板块信息
    async prepareDept({commit, state, getters}, options) {
      const [err, result] = await helper.req({
        uri: '/Execute',
        data:{
          path: 'hongbo/fullDeptOrg.sql'
        }

      });

      if(err) {
        console.log('req.prepareDept:',err);

        uni.showModal({
          title:'拉取信息失败',
          content:'获取部门信息失败，请重试！',
          showCancel:false,
          complete(){

          }
        });

        return null;
      }

      const [dept, org, sec] = result.tables;

      commit('setDeptList', dept);
      commit('setOrgList', org);
      commit('setSecList', sec);
    }
  }
});

export default store
