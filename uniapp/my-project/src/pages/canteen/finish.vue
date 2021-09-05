<template>
  <view class="finishbox">
  <view class="title">
    <view><image class="successimg" src="../../static/images/success.png"></image></view>
    <view class="title-money"><text>￥{{amount}}</text></view>
  </view>
  <view class="title">
    <view class="title-menu"><text>{{itemList}}</text></view>
  </view>
  <view class="title">
    <view class="title-menu"><text>{{nowTime}}</text></view>
  </view>
  <view class="title">
    <view><image class="title-img" src="../../static/images/disc.png"></image></view>
    <view class="title-p"><text>光盘行动 保护地球</text></view>
    <view><image class="title-img" src="../../static/images/earth.png"></image></view>
  </view>
  <view class="title">
    <view><image class="title-img" src="../../static/images/Clear.png"></image></view>
    <view class="title-p"><text>清理桌面 干湿分离</text></view>
    <view><image class="title-img" src="../../static/images/separation.png"></image></view>
  </view>
  <view class="title">
    <view><image class="title-img" src="../../static/images/plate.png"></image></view>
    <view class="title-p"><text>餐盘归位 感谢合作</text></view>
    <view><image class="title-img" src="../../static/images/cooperation.png"></image></view>
  </view>
  <button class="finish-btn" @click="clickback">祝您就餐愉快</button>

</view>
</template>
<script>
export default {
    data(){
        return{
            amount: '',
            itemList: '',
            nowTime: '', // 进入页面时间
        }
    },
    onLoad(options){
        this.amount = options.amount
        this.itemList = options.itemList
        // 生成当前时间
        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        let hour = date.getHours()
        let minute = date.getMinutes()
        // let second = date.getSeconds()
        this.nowTime = year + '-' + month + '-' + day + ' ' + hour + '：' + minute
    },
    methods:{
        clickback (){
            // uni.navigateTo({
            //     url:'/pages/home/menu'
            // });
            uni.navigateTo({
                url:'/pages/canteen/index'
            });
        }
    }
};
</script>
<style lang="scss" scoped>
.finish-box{
  margin: 0 auto;
}
.title-img{
  width:60rpx;
  height: 60rpx;
}
.title{
  display: flex;
  justify-content: center;
}
.title-p{
  padding:12rpx 40rpx;
  line-height: 44rpx;
  font-size: 44rpx;
  font-weight: bold;
  color: #333;
}
.finish-btn{
  background: #1E9FFF;
  width: 500rpx;
  height: 90rpx;
  border-radius: 10rpx;
  line-height: 90rpx;
  color:#fff;
  outline: none;
  border: #1E9FFF;
  margin-top: 80rpx;
  font-weight: bold;
  font-size: 19px;
}
.successimg{
  width:80rpx;
  height:80rpx;
  margin:120rpx 40rpx 10rpx 0;
}
.title-money{
  line-height: 80rpx;
  margin-top:120rpx;
  font-size: 80rpx;
  font-weight: bold;
}
.title-menu{
  padding-bottom: 50rpx;
}
</style>
