<template>
  <view>
    <!-- 轮播图 -->
    <!-- <swiper class="swiper" :indicator-dots="indicatorDots" indicator-color="rgba(228,218,255,0.7)" indicator-active-color="#F7B500" :autoplay="autoplay" :interval="interval" :duration="duration"> -->
    <swiper class="swiper" :indicator-dots="indicatorDots" indicator-color="rgba(228,218,255,0.7)" indicator-active-color="#F7B500" :autoplay="autoplay" :interval="interval" :duration="duration">
      <view class="block" v-for="item in swiperList" :key="item.id">
        <swiper-item>
          <view class="swiper-item">
            <image class="header-img" :src=item.pic alt="">
          </view>
        </swiper-item>
      </view>
    </swiper>
    <!-- 菜单 -->
    <view class="body">
      <view class="block" v-for="item in itemlist" :key="item.id">
        <view class="body-item">
          <view class="item-left">
            <image class="item-img" :src=item.pic></image>
            <text class="item-text">{{item.title}}</text>
          </view>
          <view class="item-right">
            <text class="item-price">￥{{item.price.toFixed(2)}}</text>
            <view class="item-btns">
              <view v-if="item.quantity">
                <text class="item-btn" @click="sub(item)">-</text>
                <text class="quantity">{{item.quantity}}</text>
                <text class="item-btn" @click="add(item)">+</text>
              </view>
              <view v-else>
                <text class="item-btn" @click="add(item)">+</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 底部 -->
    <view class="footer" :class="{ selected:isSelected}">
      <view v-if="quantity" class="footer-left chosed">
        <view class="shop-car-v">
          <view>
            <image class="shop-car" src="../../static/images/buying.png"></image>
            <text class="chose-quantity">{{quantity}}</text>
          </view>
          <text class="chose-tip">已选</text>
        </view>
        <view class="chose-amount">
          <text>￥{{amount.toFixed(2)}}元</text>
        </view>
      </view>
      <view v-else class="footer-left">
        <view>
          <image class="shop-car" src="../../static/images/empty.png"></image>
        </view>
        <text class="chose-tip">空的</text>
      </view>
      <view class="footer-right" @click="pay">
        选好了 付款
      </view>
    </view>

  </view>
</template>
<script>
import { ref, reactive, toRefs, toRef, computed } from "@vue/composition-api";
// import {
//   getSwiperList,
//   getMenu,
//   createOrder,
//   GetBrandWCPayRequestParams,
// } from "./api";
export default {
  setup(props, ctx) {
    // getSwiperList().then((res) => {
    //   // swiperModel.swiperList = res[1].tables[0]
    //   // console.log(res);
    // });
    // getMenu().then((res) => {
    //   // foodModel.itemlist = res[1].tables[0]
    //   // console.log(res);
    // });

    // 轮播图
    const swiperModel = reactive({
      indicatorDots: true,
      autoplay: true,
      interval: 2000,
      duration: 500,
      swiperList: [
        { id: 1, pic: "../../static/images/header1.png" },
        { id: 2, pic: "../../static/images/header2.png" },
        { id: 3, pic: "../../static/images/header3.png" }
      ]
    });
    // 菜品
    const foodModel = reactive({
      quantity: 0,
      amount: 0.0,
      isSelected: false,
      itemlist: [
        {
          pic: "../../static/images/food1.jpg",
          title: "两荤两素",
          price: 2,
          type: 2,
          id: 7,
          key: "7",
          quantity: 0
        },
        {
          pic: "../../static/images/food2.jpg",
          title: "一荤两素",
          price: 1.5,
          type: 2,
          id: 8,
          key: "8",
          quantity: 0
        },
        {
          pic: "../../static/images/food2.jpg",
          title: "一荤一素",
          price: 1.0,
          type: 2,
          id: 9,
          key: "9",
          quantity: 0
        },
        {
          pic: "../../static/images/food3.jpg",
          title: "一素",
          price: 0.5,
          type: 2,
          id: 10,
          key: "10",
          quantity: 0
        },
        {
          pic: "../../static/images/food1.jpg",
          title: "面条",
          price: 2,
          type: 2,
          id: 11,
          key: "11",
          quantity: 0
        }
      ]
    });
    const add = item => {
      item.quantity += 1;
      foodModel.quantity++;
      foodModel.amount += item.price;
      foodModel.isSelected = false;
      // 付款染色
      foodModel.itemlist.forEach(item => {
        if (item.quantity > 0) {
          foodModel.isSelected = true;
        }
      });
    };
    const sub = item => {
      item.quantity -= 1;
      foodModel.quantity--;
      foodModel.amount -= item.price;
      foodModel.isSelected = false;
      // 付款染色
      foodModel.itemlist.forEach(item => {
        if (item.quantity > 0) {
          foodModel.isSelected = true;
        }
      });
    };
    const pay = () => {
      let amt = foodModel.amount;
      if (!amt) return;
      let ordId = "";
      let details = [];
      let cont = [];
      let selectedPackage = []; // 选中的套餐
      foodModel.itemlist.forEach((item, index) => {
        if (item.quantity != 0) {
          // 改变id为relateid
          item["relateid"] = item.id;
          item["descr"] = item.title;
          // 改变cont，好像和上面 body 有重复。 组合 什么套餐 * 数量
          cont.push(`${item.title} * ${item.quantity} \r\n`);
          selectedPackage.push(`${item.title} * ${item.quantity}`);
          details.push(item);
        }
      });

      // uni.showLoading({
      //   title: "订单生成中..."
      // });
      uni.showModal({
        title: "提示",
        content: "模拟支付完成了吗",
        success: function(res) {
          if (res.confirm) {
            uni.navigateTo({
              url: "/pages/canteen/finish"
            });
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });

      // createOrder(amt, cont, details).then((res) => {
      //   if (res[1].state != 200 || !res[1].tables[0][0]) {
      //     uni.showToast({
      //       title: "订单生成失败",
      //       icon: "error",
      //       duration: 2000,
      //     });
      //     return;
      //   }
      //   ordId = res[1].tables[0][0].tradeno;
      //   GetBrandWCPayRequestParams(amt, cont, ordId).then((res) => {
      //     // 向微信发起支付申请是否成功
      //     let data = res[1].data;
      //     uni.hideLoading();
      //     if (!data) {
      //       uni.showToast({
      //         title: "请求微信支付失败",
      //         icon: "error",
      //         duration: 2000,
      //       });
      //       return;
      //     }

      //     // 发起小程序端的支付、会弹窗进行支付
      //     uni.requestPayment({
      //       provider: "wxpay",
      //       timeStamp: data.timeStamp,
      //       nonceStr: data.nonceStr,
      //       package: data.package,
      //       signType: "MD5",
      //       paySign: data.paySign,
      //       success: (res) => {
      //         // 支付成功后，跳转到支付完成提示页

      //         // 传参支付套餐 amount, selectedPackage
      //         uni.navigateTo({
      //           url:
      //             "/pages/canteen/finish?amount=" +
      //             foodModel.amount +
      //             "&itemList=" +
      //             selectedPackage.join(";"),
      //         });
      //         // 重置 点餐的量
      //         var itemlist = foodModel.itemlist;
      //         for (var i = 0; i < itemlist.length; i++) {
      //           itemlist[i].quantity = 0;
      //         }
      //         setTimeout(() => {
      //           foodModel.itemlist = itemlist;
      //           foodModel.quantity = 0;
      //           foodModel.amount = 0;
      //         }, 2000);
      //       },
      //       fail: (res) => {},
      //       complete:(res=>{
      //         foodModel.isSelected = false;
      //         uni.hideLoading();
      //       })
      //     });
      //   });
      // });
    };

    // const amount2decimal = computed(() => {
    //   return foodModel.amount.toFixed(2);
    // });
    return {
      ...toRefs(swiperModel),
      ...toRefs(foodModel),
      sub,
      add,
      pay
    };
  }
};
</script>
<style lang="scss" scoped>
.swiper {
  width: 100vw;
  height: 360rpx;
}
.header-img {
  width: 100vw;
  height: 380rpx;
}
.body {
  width: 100vw;
  background-color: #fff;
  .body-item {
    margin: 0 32rpx;
    padding: 30rpx 0;
    height: 80rpx;
    line-height: 80rpx;
    border-bottom: 1px solid #9797971a;
    display: flex;
    justify-content: space-between;
    .item-left {
      .item-img {
        width: 100rpx;
        height: 80rpx;
        border: 1px solid #f7b500;
        vertical-align: middle;
      }
      .item-text {
        font-family: PingFangSC-Medium, PingFangSC;
        margin-left: 20rpx;
        font-size: 32rpx;
        font-weight: 500;
      }
    }
    .item-right {
      display: inline-block;
      text-align: right;
      // line-height: 80rpx;
      // display: flex;
      .item-btns {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        height: 80rpx;
        margin-left: 44rpx;
        .item-btn {
          width: 54rpx;
          height: 54rpx;
          border-radius: 50%;
          display: inline-block;
          align-items: center;
          padding: 0;
          line-height: 46rpx;
          text-align: center;
          font-size: 45rpx;
          font-weight: 800;
          background-color: #f7b500;
          color: #fff;
          overflow: heidden;
          box-sizing: border-box;
          padding-right: 2rpx;
          // margin-top: 5rpx;
        }
        .quantity {
          line-height: 42rpx;
          margin: 0 15rpx;
          width: 36rpx;
          font-size: 32rpx;
          text-align: center;
          overflow: hidden;
        }
      }
    }
  }
}
.footer {
  position: fixed;
  bottom: 0;
  width: 100vw;
  background-color: #ccc;
  display: flex;
  height: 96rpx;
  .footer-left {
    display: inline-block;
    width: 150rpx;
    background-color: #fff;
    text-align: center;
    font-size: 0;
    padding-top: 10rpx;
    .shop-car-v {
      font-size: 0rpx;
      width: 150rpx;
      display: inline-block;
      .chose-quantity {
        position: absolute;
        width: 28rpx;
        height: 28rpx;
        background-color: #de4848;
        color: #ffffff;
        line-height: 28rpx;
        font-size: 24rpx;
        border-radius: 50%;
      }
    }
    .shop-car {
      width: 24px;
      height: 21px;
    }
    .chose-amount {
      font-size: 36rpx;
      display: inline-block;
      width: 60%;
      line-height: 68rpx;
      color: #f7b500;
      text-align: left;
    }
  }
  .chosed {
    width: 560rpx;
    display: inline-flex;
    .chose-tip {
      color: #2d2d2d;
      line-height: 16rpx;
    }
  }
  .footer-right {
    display: inline-block;
    font-size: 46rpx;
    text-align: center;
    width: 100%;
    height: 100%;
    line-height: 96rpx;
    color: #ffffff;
    font-weight: bold;
  }
}
.selected {
  background-color: #1e9fff !important;
}
.footer .footer-left .chose-tip {
  font-size: 24rpx;
  margin-left: 12rpx;
  color: #ababab;
  line-height: 16rpx;
}
</style>