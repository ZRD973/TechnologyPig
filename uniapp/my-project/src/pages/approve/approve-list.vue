<template>
  <view>
    <xw-empty v-if="listData.length === 0" text="没有数据哦"></xw-empty>
    <view class="list" v-for="item in listData" :key="item.AppID">
      <view class="list_item" @click="clickItem(item)">
        <view class="title">
          <text class="title_text">{{ item.ModuleName || "未知" }}</text>
          <text v-if="currentPage === 2">
            <text
              v-if="item.IsFlow"
              class="title_tips"
              style="color: #07c160; border: 1px solid #07c160"
              >已阅知</text
            >
            <text
              v-else
              class="title_tips"
              style="color: #f56c6c; border: 1px solid #f56c6c"
              >待阅知</text
            >
          </text>
        </view>
        <view class="content">{{ item.Content.split("%")[0] }}</view>
        <view class="content">{{ item.Content.split("%")[1] }}</view>
        <view class="content">调出时间：{{ item.CreateTime }}</view>
      </view>
    </view>
  </view>
</template>
<script>
import XwEmpty from "@/components/xw-empty/xw-empty.vue";
export default {
  name: "inform-list",
  components: { XwEmpty },
  props: {
    listData: {
      type: Array,
    },
    currentPage: {
      type: Number,
    },
  },
  setup() {
    const clickItem = (item) => {
      if (item.ModuleName == "人员调配") {
        uni.navigateTo({
          url: "deploy-detail?ID=" + item.GoalID + "&role=" + item.role + "&module=" + item.Module,
        });
        uni.showLoading({
            title: '加载中'
        });
      } else if (item.ModuleName == "证书借阅") {
        uni.navigateTo({
          url: "certificate-detail?ID=" + item.GoalID + "&role=" + item.role + "&module=" + item.Module,
        });
        uni.showLoading({
            title: '加载中'
        });
      } else if (item.ModuleName == "沟通记录") {
        uni.navigateTo({
          url: "communicate-detail?ID=" + item.GoalID + "&role=" + item.role + "&module=" + item.Module,
        });
        uni.showLoading({
            title: '加载中'
        });
      }
    };
    return {
      clickItem,
    };
  },
};
</script>
<style lang="scss" scoped>
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
      .title_tips {
        color: #409eff;
        font-size: 24rpx;
        padding: 0 15rpx;
        border: 1px solid #409eff;
        border-radius: 10rpx;
        margin-right: 20rpx;
        position: relative;
        top: 10rpx;
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
      .icon_group {
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