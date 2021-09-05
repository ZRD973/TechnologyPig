import wx from '../static/js/jweixin-1.6.0'
import helper from './helper'

class Weixin {
  async ready(){

    const [err, res] = await helper.req({
      uri:'/getSign',
      data:{
        curUrl: encodeURIComponent(location.href.split('#')[0])
      }
    });

    if(err){
      console.log('req.getSign:',err);
      return [err];
    }

    const [err1,res1] = await new Promise(resolve => {
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: res.appId, // 必填，公众号的唯一标识
        timestamp: res.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.nonceStr, // 必填，生成签名的随机串
        signature: res.signature,// 必填，签名，见附录1
        jsApiList: ['getNetworkType','openLocation','getLocation','startRecord','stopRecord','onVoiceRecordEnd','playVoice','pauseVoice','stopVoice','onVoicePlayEnd','uploadVoice','downloadVoice','chooseImage','previewImage','uploadImage','downloadImage','translateVoice','scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });

      wx.ready(function () {
        resolve([null,wx]);
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
      });
      wx.error(function (res) {
        console.log('wx.error:',res);
        resolve([res]);
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      });
    });

    this.ready = async function () {
      console.log('weixin.ready[cached]:',[err1,res1]);
      return [err1,res1];
    };

    return [err1,res1];
  }
  //通过微信上传
  async uploadImage(options) {

  }
}

export default new Weixin();