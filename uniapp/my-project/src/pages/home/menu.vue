<template>
  <view>
    <view class="status_bar"></view>
    <view class="status_text"> 上海宏波工程咨询管理有限公司 </view>
     <view class="swiper_background"></view>
      <swiper class="swiper" circular="true"  :autoplay="autoplay" :interval="interval" :duration="duration">
         <view class="block" v-for="item in swiperList" :key="item.id" @click="clickSwiper(item)">
          <swiper-item>
            <view class="swiper-item">
              <image class="header-img" :src=item.pic alt="">
            </view>
          </swiper-item>
        </view>
      </swiper>
    <view class="tabBar">
      <view class="tabBar_text">
        <text>移动办公</text>
      </view>
      <view class="iconBox" @click="entryCanteen">
        <image class="iconImg" src="../../static/images/canteen.png"></image>
        <text class="iconText">食堂</text>
      </view>
        <view  class="iconBox" @click="entryInform">
          <view class="iconBadge" v-if="unreadNum">{{unreadNum>9?'9+':unreadNum}}</view>
          <image class="iconImg" src="../../static/images/notice.png"></image>
          <text class="iconText">通知公告</text>
        </view>
        <view  class="iconBox" @click="entryApprove">
          <view class="iconBadge" v-if="approveUnreadNum">{{approveUnreadNum>9?'9+':approveUnreadNum}}</view>
          <image class="iconImg" src="../../static/images/approve.png"></image>
          <text class="iconText">审批</text>
        </view>
        <view  class="iconBox" @click="entryVisitor">
          <image class="iconImg" src="../../static/images/visitor.png"></image>
          <text class="iconText">客户码</text>
        </view>
    </view>

    <view v-if="isTiptrue" class="page-cont">
      <view class="cont">
        <view class="circle" @click="closeThis">
          <image class="canteenLogo" src="../../static/images/canteen.png"></image>
          <view class="canteenText">食堂</view>
        </view>
          <image class="tip" src="../../static/images/tips.png"></image>
         <view class="text">点击图标可以进入食堂付款</view>
        <view class="bottom" @click="closeThis">记住了我去试试</view>
      </view>
   </view>
  </view>
</template>

<script>
import { reactive, toRefs, ref } from '@vue/composition-api';

export default {
  components: {},
  created() {
    // console.log("131213")
  },
  setup() {
    const isTiptrue = ref(false);
    console.log(12312);
    let firstOpen = uni.getStorageSync("loadOpen");
    console.log("是否首次打开本页面==", firstOpen);
    if (firstOpen == undefined || firstOpen == "") {
      //根据缓存周期决定是否显示新手引导
      isTiptrue.value = true;
    } else {
      isTiptrue.value = false;
    }

    // 通知公告未读数
    const unreadNum = ref(0);
    // 审批未读数
    const approveUnreadNum = ref(0);
    // 轮播图
    const swiperModel = reactive({
      indicatorDots: true,
      autoplay: true,
      interval: 3000,
      duration: 500,
      swiperList: [
        { id: 1, pic: "../../static/images/banner.png" },
        { id: 2, pic: "../../static/images/banner.png" },
      ],
    });
    return {
      ...toRefs(swiperModel),
      unreadNum,
      approveUnreadNum,
      isTiptrue,
    };
  },
  methods: {
    entryCanteen() {
      uni.navigateTo({
        url: "/pages/canteen/index",
      });
    },
    entryInform() {
      uni.navigateTo({
        url: "/pages/inform/index",
      });
    },
    entryApprove() {
      uni.navigateTo({
        url: "/pages/approve/index",
      });
    },
    entryVisitor() {
      uni.navigateTo({
        url: "/pages/home/visitor",
      });
    },
    clickSwiper(item) {
      uni.navigateTo({
        url: "/pagesA/person/info",
      });
    },
    entryMy() {
      uni.navigateTo({
        url: "/pagesA/person/info",
      });
    },
    closeThis(e) {
      uni.setStorage({
        key: "loadOpen",
        data: "OpenTwo",
      });
      this.isTiptrue = false;
    },
  },
  // computed: {
  //   ...mapGetters([""]),
  // },
  async onLoad(params) {
    // await this.$ready();
    console.log("menu.onLoad:", params);
    // this.getData();
    // this.getApproveData();
  },
};
</script>

<style lang="scss" scoped>
.status_bar {
  height: var(--status-bar-height);
  width: 100%;
  background-color: #0f59a4;
}
.status_text {
  width: 100%;
  height: 100rpx;
  line-height: 100rpx;
  padding: 0 0 0 30rpx;
  font-size: 32rpx;
  color: white;
  background-color: #0f59a4;
}
page {
  padding: 10rpx;
  box-sizing: border-box;
}
.swiper_background {
  position: absolute;
  width: 100%;
  height: 140rpx;
  background-color: #0f59a4;
  border-bottom-left-radius: 12%;
  border-bottom-right-radius: 12%;
}
.swiper {
  width: 100%;
  height: 270rpx;
  margin: 20rpx auto;
  .swiper-item {
    width: 92%;
    height: 270rpx;
    // border-radius: 0.5em / 1em;
    border-radius: 20rpx;
    overflow: hidden;
    margin: 0 auto;
    .header-img {
      width: 100%;
      height: 270rpx;
    }
  }
}

.tabBar {
  width: 85%;
  padding: 20rpx;
  display: flex;
  flex-flow: row wrap;
  margin: 40rpx auto 0 auto;
  background-color: #ffffff;
  border-radius: 5%;
  .tabBar_text {
    width: 100%;
    padding: 15rpx 25rpx;
    font-size: 36rpx;
    font-weight: 600;
    color: #081827;
    border-bottom: 1px solid rgba(145, 139, 139, 0.1);
    text {
      border-bottom: 2px solid #081827;
      padding-bottom: 20rpx;
    }
  }
  .iconBox {
    position: relative;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    flex: 0 1 25%;
    align-items: center;
    line-height: 100rpx;
    margin-bottom: 20rpx;
    margin-top: 20rpx;
    .iconBadge {
      width: 40rpx;
      height: 40rpx;
      line-height: 40rpx;
      position: absolute;
      right: 22rpx;
      top: -22rpx;
      border-radius: 50%;
      text-align: center;
      color: white;
      background-color: #df4742;
    }
    .iconImg {
      width: 58rpx;
      height: 64rpx;
    }
    .iconText {
      line-height: 45rpx;
    }
  }
}
.page-cont {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  background-color: rgba(0, 0, 0, 0.7);
  .cont {
    width: 100%;
    margin-top: 560rpx;
    display: flex;
    position: relative;
    flex-direction: column;
    .circle{
      width: 140rpx;
      height: 140rpx;
      position: absolute;
      border-radius: 50%;
      background: #FFFFFF;
      left: 68rpx;
      top: 18rpx;
      .canteenLogo{
        position: absolute;
        // left: 40rpx;
        // top: 12rpx;
        // width: 58rpx;
        // height: 64rpx;
        left: 40rpx;
        top: 22rpx;
        width: 66rpx;
        height: 76rpx;
      }
      .canteenText{
        // position: absolute;
        // left: 42rpx;
        // top: 74rpx;
          position: absolute;
          left: 48rpx;
          top: 90rpx;
      }
    }
    .tip{
      position: relative;
      width: 150rpx;
      height: 360rpx;
      left: 200rpx;
      top: 160rpx;
      transform-origin: 50% 50%;
      transform: rotate(-15deg);
      margin-bottom: 150rpx;
    }
    .text{
      color: #fff;
      font-size: 30rpx;
      margin: 0 auto;
    }
    .bottom {
    width: 60%;
    font-size: 30rpx;
    line-height: 72rpx;
    text-align: center;
    border-radius: 44rpx;
    border: 1px solid #fff;
    margin: 10rpx auto 0 auto;
    color: #fff;
  }
  }

}
</style>
