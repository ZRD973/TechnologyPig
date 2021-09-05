<template>
  <view class="center">
    <view class="logo" @click="bind" :hover-class="!fullLogin ? 'logo-hover' : ''">
      <!-- <image class="logo-img" :src="userInfo.headimgurl || headImg"></image> -->
      <image class="logo-img" :src="headUrl || headImg"></image>
      <view class="logo-title">
        <text class="uer-name">Hi，{{userInfo.ID ? userInfo.Name : '您未绑定账号'}}</text>
        <text class="go-login navigat-arrow" v-if="!fullLogin">&#xe65e;</text>
      </view>
    </view>
    <view class="center-list">
      <view class="center-list-item border-bottom" @click="accountManage">
        <!-- <text class="list-icon">&#xe60f;</text> -->
        <text class="list-text">帐号管理</text>
        <text class="navigat-arrow">&#xe65e;</text>
      </view>
      <view class="center-list-item border-bottom" @click="selfmessage">
        <!-- <text class="list-icon">&#xe639;</text> -->
        <text class="list-text">个人信息</text>
        <text class="navigat-arrow">&#xe65e;</text>
      </view>
      <view class="center-list-item border-bottom" @click="developMessage">
        <text class="list-text">开发信息</text>
        <text class="navigat-arrow">&#xe65e;</text>
      </view>
    </view>
  </view>
</template>

<script>


  export default {
    setup(){
      const accountManage=()=>{
        uni.navigateTo({ url: '/pagesA/account' })
      }
      const developMessage=()=>{
        uni.navigateTo({ url: '/pagesA/develop' })
      }
      return {
        accountManage,
        developMessage
      }
    },
    data(){
      return {
        headUrl:'',
        headImg : '../../static/user/default.png'
      };
    },
    created(){
    },
    async onLoad(params){
      console.log('user.onLoad:',params);
    },
    methods:{
      async bind(){
        if(!this.fullLogin){
          await uni.navigateTo({
            url:'/' + this.setter.bindPage
          });
        }
      },
        //个人信息
        selfmessage(){
            uni.navigateTo({
                url:'/pagesA/person/info'
            });
        },
    }
  }

</script>

<style>
  @font-face {
    font-family: texticons;
    font-weight: normal;
    font-style: normal;
    src: url('https://at.alicdn.com/t/font_984210_5cs13ndgqsn.ttf') format('truetype');
  }

  page,
  view {
    display: flex;
  }

  page {
    background-color: #f8f8f8;
  }

  .center {
    flex-direction: column;
  }

  .logo {
    width: 750upx;
    height: 200upx;
    padding: 20upx;
    box-sizing: border-box;
    background-color: #0F59A4;
    flex-direction: row;
    align-items: center;
  }

  .logo-hover {
    opacity: 0.8;
  }

  .logo-img {
    width: 120upx;
    height: 120upx;
    border-radius: 50%;
  }

  .logo-title {
    height: 150upx;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    margin-left: 20upx;
  }

  .uer-name {
    height: 60upx;
    line-height: 60upx;
    font-size: 38upx;
    color: white;
  }

  .go-login.navigat-arrow {
    font-size: 38upx;
    color: #FFFFFF;
  }

  .login-title {
    height: 150upx;
    align-items: self-start;
    justify-content: center;
    flex-direction: column;
    margin-left: 20upx;
  }

  .center-list {
    background-color: #FFFFFF;
    margin-top: 20upx;
    width: 750upx;
    flex-direction: column;
  }

  .center-list-item {
    height: 90upx;
    width: 750upx;
    box-sizing: border-box;
    flex-direction: row;
    padding: 0upx 20upx;
  }

  .border-bottom {
    border-bottom-width: 1upx;
    border-color: #c8c7cc;
    border-bottom-style: solid;
  }

  .list-icon {
    width: 40upx;
    height: 90upx;
    line-height: 90upx;
    font-size: 34upx;
    color: #4cd964;
    text-align: center;
    font-family: texticons;
    margin-right: 20upx;
  }

  .list-text {
    height: 90upx;
    line-height: 90upx;
    font-size: 34upx;
    color: #555;
    flex: 1;
    text-align: left;
  }

  .navigat-arrow {
    height: 90upx;
    width: 40upx;
    line-height: 90upx;
    font-size: 34upx;
    color: #555;
    text-align: right;
    font-family: texticons;
  }
</style>
