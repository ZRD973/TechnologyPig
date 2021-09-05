<template>
  <view>
    <view class="status_bar">
      <!-- 这里是状态栏 -->
    </view>
    <view style="margin: 100rpx 0; text-align: center;">

      授权后才可以进入使用小程序哦！

    </view>
    <view>
      <button type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo" ref="wxLogin"> <fa-icon type="fa-wechat" :size="36" style="margin-right: 10rpx;"></fa-icon> 微信授权登录</button>
    </view>
    <!--<uni-popup ref="popup" type="center">弹出来</uni-popup>-->
  </view>
</template>

<script>
  import helper from '../../lib/helper'
  import FaIcon from '../../components/faicon/Icon.vue'
  // import uniPopup from '../components/uni-popup/uni-popup.vue'

  import {mapState,mapGetters,mapActions} from 'vuex'

  export default {
    components:{
      FaIcon,
      // uniPopup
    },
    data(){
      return {}
    },
    computed:{
      ...mapState(['redirectUrl','code'])
    },
    async onLoad(params){

      await this.$ready();

      console.log('oauth.onLoad');


      // #ifdef H5

      const {code,state} = params;
      uni.showLoading({
        title:'自动登录中'
      });
      const [err,res] = await helper.req({
        uri:'/GetRedirectUrl',
        data:{
          code,
          state
        }
      });

      if(err){
        return uni.showModal({
          title:'登录失败',
          content:'登录失败，请重试',
          showCancel:false,
          complete(){
            helper.close();
          }
        });
      }

      uni.redirectTo({
        url:res.url
      });

      return null;

      // #endif

      // #ifdef MP-WEIXIN



      // #endif

    },
    methods:{
      ...mapActions(['authLogin']),
      async getUserInfo(res){
        const vue = this;
        console.log('button.getUserInfo',res);
        if(!res.detail.userInfo){
          uni.showModal({
            title:'授权登录失败',
            content:'请进行微信授权',
            showCancel:false,

            // complete(){
            //   vue.$refs.popup.open()
            //   // vue.$refs.wxLogin.$emit('click');
            // }
          });
        }else{
          const {code} = vue;
          await vue.authLogin({code,...res.detail});
        }
      }
    }
  }
</script>

<style scoped>
  button{
    width: 80%;
  }
</style>
