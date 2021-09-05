<template>
  <view>
    <xw-empty v-if="listData.length === 0" text="没有通知哦"></xw-empty>
    <view class="list" v-for="item in listData" :key="item.ID">
      <view class="list_item"  @click="clickItem(item.ID)">
        <view class="title" :class="[item.State==2?'selected':'']">
          <text class="title_text">{{ item.Caption }}</text>
          <text class="title_time">{{item.CreateTime}}</text>
        </view>
        <view class="content">{{ item.F_Content }}</view>
        <view class="header">
          <text class="header_title">{{item.Type}}</text>
          <text v-if="item.diff > 0" class="header_time" style="color:#F56C6C;border: 1px solid #F56C6C;">还剩{{ item.diff }}天</text>
          <text v-else-if="item.diff === 0" class="header_time" style="color: #F56C6C;border: 1px solid #F56C6C;">今天截止</text>
          <text v-else-if="item.diff < 0" class="header_time" style="color: #d1cfcf;border: 1px solid #d1cfcf;">收摊了</text>
          <text v-else class="header_time" style="color: #07c160;border: 1px solid #07c160;">一直有效</text>
        </view>
        <view class="footer">
          <text class="name">{{item.Creator}}</text>
          <view class="icon_group">
            <uni-icons type="chat" size="12"></uni-icons>
            <text class="comment">{{item.CommentNum}}</text>
            <uni-icons type="eye" size="14"></uni-icons>
            <text class="views">{{item.Topping}}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import uniIcons from "@/components/uni-icons/uni-icons.vue";
import XwEmpty from "@/components/xw-empty/xw-empty.vue";
// import { ReadIt } from "./api";
export default {
  name: "inform-list",
  components: { uniIcons, XwEmpty },
  props: {
    listData: {
      type: Array,
    }
  },
  setup() {
    const clickItem = (ID) => {
      // uni.$emit('update',{msg:'页面更新'})
      // ReadIt(ID).then(res=>{
      //   let pages = getCurrentPages();
      //   pages[pages.length - 1].$vm.getData();
      //   pages[pages.length - 2].$vm.getData();
      //   uni.navigateTo({
      //     url: "detail?id=" + ID +"&item=" + JSON.stringify(res[1].tables[1])
      //   });
      // })
    };
    return {
      clickItem,
    };
  },
};
</script>
<style lang="scss" scoped>
.selected{
  color: rgb(119, 119, 124);
}
.list {
  width: 90vw;
  margin: 0 auto;
  .list_item {
    border-bottom: 1px solid #00000017;
    padding-bottom: 15rpx;
    .header {
      display: flex;
      justify-content: flex-start;

      .header_title {
        color: #409eff;
        font-size: 24rpx;
        padding: 0 15rpx;
        border: 1px solid #409eff;
        border-radius: 10rpx;
        margin-right: 20rpx;
        // background-color: rgba(187, 182, 236, 0.3);
      }
      .header_time {
        font-size: 24rpx;
        padding: 0 15rpx;
        border-radius: 10rpx;
      }
    }
    .title {
      font-size: 28rpx;
      display: flex;
      justify-content: space-between;
      .title_text {
        font-weight: bold;
      }
    }
    .content {
      width: 600rpx;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .footer {
      font-size: 24rpx;
      color: rgb(119, 119, 124);
      width: 90vw;
      .icon_group{
        position: absolute;
        display: inline;
        right: 0;
      }
      .comment {
        padding-left: 10rpx;
        padding-right: 20rpx;
      }
      .views {
        padding-left: 10rpx;
      }
    }
  }
}
</style>