<template>
  <view>
    <view class="header">
        <uni-icons class="success_icons" color="#0B6FFF" type="checkbox-filled" size="30"></uni-icons>
        <view class="success">支付成功</view>
    </view>
    <view class="smGrid">
        <view class="leftGrid">
            <view class="title">
                <text class="bg">累计支付</text>
                <view class="sm drop_down" >
                    <text @click="handleOpenFilter">{{filter}}<text class="triangle"></text></text>
                    <view class="item" v-if="showFilter" @click="chooseItem">
                        <view class="drop_item" data-value="累计">累计</view>
                        <view class="drop_item" data-value="本周">本周</view>
                        <view class="drop_item" data-value="上周">上周</view>
                        <view class="drop_item" data-value="本月">本月</view>
                        <view class="drop_item" data-value="上月">上月</view>
                    </view>
                </view>
            </view>
            <view class="middle">
                <text >200</text>
                <text class="sm">次</text>
            </view>
            <view class="count">
                <text >5 / 1000</text>
                <text class="sm">名</text>
            </view>
        </view>
        <view class="rightGrid">
            <view class="title">
                <text class="bg">最近支付</text>
            </view>
            <view class="middle">
                <text >8/6/11:26</text>
            </view>
            <view class="count">
                <text style="line-height:1.3" class="sm">最近您的支付次数良好,请继续加油！</text>
            </view>
        </view>
    </view>
    <view class="bgGrid">
        <view class="bg_title">我的平均吃饭时间</view>
        <view class="bg_time">11:35</view>
        <view id="main" style="width: 300px;height:300px;background:#FFCD42">
        </view>
    </view>
    <view class="bottom">
        <view class="b_title">
            <view class="anonymity">匿名</view>
            <view class="evaluate">评价食堂</view>
        </view>
        <view class="rate" >
            <uni-rate v-model="value" @change="onChange" :margin="20" :size="27" active-color="#FFC300" color="#D9D9D9" />
        </view>
        <view class="bottom_tips">您的评价会帮助食堂做的很好！</view>
    </view>
    <uni-popup ref="popup" type="bottom">
        <view class="popup_swaper">
            <view class="top_tips">
                <view class="evaluate_success_icons">✔</view>
                <view class="evaluate_success">评价成功</view>
            </view>
            <view class="bottom_popup">
                <view class="close" @click="closePopup">×</view>
                <view class="evaluate">匿名评价</view>
                <view class="rate">
                    <uni-rate v-model="value" @change="onChange" :margin="20" :size="27" active-color="#FFC300" color="#D9D9D9" />
                </view>
                <view class="bottom_popup_tips">非常满意,各方面都很好</view>
                <textarea class="inputarea" placeholder-class="inputplaceholder" placeholder="您的评价对我们食堂很宝贵"></textarea>
                <view class="picker_swaper">
                    <uni-file-picker
                    class="uploadImage"
                    v-model="imageValue"
                    fileMediatype="image"
                    mode="grid"
                    @select="select">
                    <image style="width:160rpx;height:160rpx;" src="../../static/images/camera.png"></image>
                    </uni-file-picker>
                </view>
                <view class="submit" @click="evalSubmit">匿名评价</view>
            </view>
        </view>

    </uni-popup>
  </view>
</template>
<script>
import uniIcons from "@/components/uni-new-icons/uni-icons.vue";
import uniRate from "../../components/uni-rate/uni-rate";
import uFilePicker from "../../components/uni-file-picker/uni-file-picker.vue";
import { onMounted, reactive, ref } from "@vue/composition-api";
export default {
  components: { uniIcons,uniRate,uFilePicker },
  setup(props,{refs}){
    //   onMounted(()=>{openPopup()})
      console.log(refs);
      const filter = ref("累计");
      const showFilter = ref(false);
      const handleOpenFilter = () =>{
          showFilter.value = !showFilter.value
      }
      const chooseItem = (e) =>{
          filter.value = e.target.dataset.value;
          showFilter.value = false;
      }
      const value = ref(1);
      const onChange = (e)=>{
          openPopup()
          console.log(e.value);
      }
      const closePopup = () =>{
          refs.popup.$vm.close()
      }
      const openPopup = () =>{
          refs.popup.$vm.open()
      }
      const imageValue = ref([])
        // 获取上传状态
       const select=(e)=>{
            console.log('选择文件：',e)
        }
      const evalSubmit = () =>{
         console.log("评价");
      }
      return {
          filter,showFilter,handleOpenFilter,chooseItem,
          value,onChange,
          openPopup,closePopup,
          imageValue,
          select,evalSubmit
      }
  }
};
</script>
<style lang="scss" scoped>
.header {
    display: flex;
    justify-content: center;
    margin-bottom: 30rpx;
  .success_icons {
      width: 48rpx;
      height: 48rpx;
      justify-content: space-around;
      margin-right: 20rpx;
      line-height: 88rpx;
  }
  .success {
    width: 176rpx;
    height: 60rpx;
    color: #1c1c1c;
    font-size: 44rpx;
  }
}
.smGrid{
    display: flex;
    justify-content: space-around;
    margin-bottom: 26rpx;
    .leftGrid ,.rightGrid{
        width: 320rpx;
        height: 250rpx;
        border-radius: 15rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .title,.middle,.count{
            display: flex;
            justify-content: space-between;
            padding: 0 30rpx;
            height: 72rpx;
            line-height: 72rpx;
            color: #FFFFFF;
            font-size: 50rpx;
            font-weight: 500;
            .bg{
                font-weight: 600;
                white-space: nowrap;
            }
            .sm{
                font-size: 28rpx;
                font-weight: 600;
            }
            .drop_down{
                position: relative;
                width: 100rpx;
                height: 48rpx;
                line-height: 48rpx;
                padding-left: 10rpx;
                align-items: center;
                font-weight: 500;
                border-radius: 8rpx;
                color: #3586FB;
                background: #FFFFFF;
                margin-top: 14rpx;
                margin-left: 24rpx;
                .triangle{
                    position: absolute;
                    top: 20rpx;
                    right: 4rpx;
                    width: 0;
                    height: 0;
                    border: 12rpx solid;
                    border-color: #3586FB transparent transparent;
                }
                .item{
                    position: absolute;
                    top: 44rpx;
                    left: 0rpx;
                    @media (max-width:375px) {
                        .drop_item{
                            display: flex;
                            flex-direction:column;
                            width: 100rpx;
                            height: 48rpx;
                            padding: 5rpx 0;
                            line-height: 48rpx;
                            align-items: center;
                            font-weight: 500;
                            color: #3586FB;
                            background: #FFFFFF;
                        }
                    }
                     @media (min-width:376px) and (max-width: 768px){
                        .drop_item{
                            display: flex;
                            flex-direction:column;
                            width: 107rpx;
                            height: 48rpx;
                            padding: 5rpx 0;
                            line-height: 48rpx;
                            align-items: center;
                            font-weight: 500;
                            color: #3586FB;
                            background: #FFFFFF;
                        }
                    }
                    & :last-child{
                        border-bottom-left-radius: 8rpx;
                        border-bottom-right-radius: 8rpx;
                    }
                }

            }
        }
        .title{font-size: 34rpx; }
    }
    .leftGrid{
        background: #3586FB;
    }
    .rightGrid{
        background: #FBB34D;
    }
}
.bgGrid{
    margin: 0 auto;
    width: 690rpx;
    height: 490rpx;
    background:#49D9B9 ;
    border-radius: 15rpx;
    margin-bottom:30rpx;
    .bg_title{
        font-size: 34rpx;
        color: #FFFFFF;
        padding: 20rpx 0 0 30rpx ;
    }
    .bg_time{
        font-size: 60rpx;
        color: #FFFFFF;
        padding: 0 30rpx;
        line-height: 1.1;
    }
}
.bottom{
    margin: 0 auto;
    width: 690rpx;
    height: 290rpx;
    border-radius: 15rpx;
    background: #FFFFFF;
    .b_title{
        display: flex;
        height: 52rpx;
        padding: 30rpx 0 0 44rpx;
        margin-bottom: 30rpx;
        .anonymity{
            line-height: 36rpx;
            width: 72rpx;
            height: 36rpx;
            font-size: 26rpx;
            color: #4F4F4F;
            border: 1px solid #C3C3C3;
            text-align: center;
            margin-right:30rpx;
        }
        .evaluate{
            line-height: 34rpx;
            font-size: 38rpx;
            font-weight: 600;
            color: #000000;
        }

    }
    .rate{
        display: flex;
        justify-content: center;
    }
    .bottom_tips{
        display: flex;
        justify-content: center;
        font-size: 30rpx;
        color: #2D2D2D;
        margin-top: 40rpx;
    }
}
.popup_swaper{
    .top_tips{
        display: flex;
        flex-direction: column;
        .evaluate_success_icons{
            text-align: center;
            width: 60rpx;
            height: 60rpx;
            color: #FFFFFF;
            margin: 0 auto;
            border-radius: 50%;
            background: #0B6FFF;
        }
        .evaluate_success{
            text-align: center;
            font-size: 50rpx;
            color: #FFFFFF;
            font-weight: 500;
        }

    }
    .bottom_popup{
    width: 100%;
    border-radius: 34rpx 34rpx 0px 0px;
    height: 820rpx;
    background: #FFFFFF;
    overflow: auto;
    .evaluate{
        line-height: 100rpx;
        font-size: 38rpx;
        font-weight: 600;
        color: #000000;
        text-align: center;
        margin: 10rpx 0;
    }
    .close{
        position: absolute;
        right: 30rpx;
        font-size: 60rpx;
        color: #000000;
    }
    .bottom_popup_tips{
        display: flex;
        justify-content: center;
        font-size: 30rpx;
        color: #2D2D2D;
        margin: 20rpx 0;
    }
    .inputarea{
        margin: 0 auto;
        padding: 0 20rpx;
        border-radius: 16rpx;
        color: #000000;
        font-size: 28rpx;
        background: #EDEDED;
        height: 200rpx;
    }
    /deep/.inputplaceholder{
        color: #BFBFBF;
        font-size: 28rpx;
    }
    .picker_swaper{
        margin: 0 auto;
        padding: 20rpx 82rpx;
    }
    .uploadImage{
        // width: 100rpx;
        // height: 100rpx;
        // border: 1px solid;
    }
    .submit{
        width: 678rpx;
        height: 92rpx;
        margin: 0 auto 20rpx auto;
        text-align: center;
        font-size: 36rpx;
        font-weight: 500;
        line-height: 92rpx;
        color: #FFFFFF;
        background: #0B6FFF;
        border-radius: 56rpx;
    }
}
}

</style>