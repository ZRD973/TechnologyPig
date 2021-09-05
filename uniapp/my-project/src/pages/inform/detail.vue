<template>
  <view>
    <view class="title">{{ detailData.Caption }}</view>
    <view class="content">{{ detailData.F_Content }}</view>
    <view class="corner_mark">
      <view>{{ detailData.Creator }}</view>
      <view>{{ detailData.CreateTime }}</view>
    </view>
    <view class="review">
      <uni-list>
        <view class="review_count">{{ detailData.CommentNum }}条评论</view>
        <xw-empty v-if="detailData.CommentNum == 0" text="没有评论哦" ></xw-empty>
        <uni-list-item
          class="border_color"
          v-for="item in reviewData"
          :key="item.ID"
          :title="item.Name"
          :note="item.Comment"
          thumb-size="lg"
        >
          <text class="time" slot="footer">{{ item.CreateTime }}</text>
        </uni-list-item>
      </uni-list>
    </view>

    <view class="footer">
      <view class="footer_container">
        <view v-if="showOptions" class="footer_options" @click="submitOptions">
          <view class="common">常用语</view>
          <view data-value="已阅读">已阅读</view>
          <view data-value="已收到">已收到</view>
          <view data-value="已下载">已下载</view>
        </view>
        <textarea
          v-model="comment"
          class="comment_input uni-input"
          placeholder="写评论……"
          placeholder-style="font-size:30rpx;"
          auto-height
          @focus="showOptions = true"
          @blur="showOptions = false"
          :fixed="true"
          :hold-keyboard="true"
          :show-confirm-bar="false"
          cursor-spacing="12px"
          cols="30"
          rows="10"
        >
        </textarea>
        <button
          type="primary"
          class="comment_btn"
          size="mini"
          @click="sendComment"
        >
          发送
        </button>
      </view>
    </view>
  </view>
</template>
<script>
import { ref } from "@vue/composition-api";
import uniIcons from "../../components/uni-new-icons/uni-icons.vue";
import uniList from "../../components/uni-list/uni-list.vue";
import XwEmpty from "@/components/xw-empty/xw-empty.vue";
// import { Send, ReadIt } from "./api";

export default {
  components: { uniIcons, uniList, XwEmpty },
  setup() {
    const id = ref();
    const detailData = ref({});
    const reviewData = ref({});
    // 发送评论
    const showOptions = ref(false);
    const submitOptions = (event) => {
      comment.value += event.target.dataset.value;
      showOptions.value = false;
    };
    const comment = ref("");
    const sendComment = () => {
      if (comment.value == "") {
        uni.showToast({
          title: "请填写评论内容",
          icon: "error",
          duration: 1000,
        });
      } else {
        // Send(comment.value, detailData.value.ID).then((res) => {
        //   if (res[1].state == 200) {
        //     uni.showToast({
        //       title: "评论成功",
        //       icon: "success",
        //       duration: 1000,
        //     });
        //     comment.value = "";
        //     ReadIt(id.value).then((res) => {
        //       reviewData.value = res[1].tables[1];
        //     });
        //     // uni.$emit('update',{msg:'页面更新'})
        //     let pages = getCurrentPages();
        //     pages[pages.length - 2].$vm.getData();
        //     pages[pages.length - 3].$vm.getData();
        //   } else {
        //     uni.showToast({
        //       title: "评论失败",
        //       icon: "none",
        //       duration: 1000,
        //     });
        //   }
        // });
      }
    };
    return {
      id,
      detailData,
      reviewData,
      sendComment,
      comment,
      showOptions,
      submitOptions,
    };
  },
  onLoad: function (option) {
    this.id = option.id;
    let item = JSON.parse(option.item);
    this.reviewData = item;
    let pages = getCurrentPages();
    let allData = pages[pages.length - 2].data.allData;
    for (let i = 0; i < allData.length; i++) {
      if (allData[i].ID == option.id) {
        this.detailData = allData[i];
      }
    }
  },
};
</script>
<style lang="scss" scoped>
.title {
  padding: 20rpx;
  font-size: 36rpx;
  font-weight: bold;
}
.content {
  padding: 10rpx 30rpx;
  text-indent: 2em;
}
.corner_mark {
  float: right;
  text-align: right;
  margin-right: 100rpx;
  margin-bottom: 20rpx;
}
.review {
  margin-bottom: 80rpx;
  .review_count {
    margin-left: 20rpx;
    font-size: 32rpx;
  }
  .time {
    font-size: 24rpx;
    color: rgb(119, 119, 124);
  }
  .border_color {
    border-bottom: 1px solid #c8c7cc;
  }
}
.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  // height: 80rpx;
  margin: 0 auto;
  padding: 0 20rpx;
  border-top: 1px solid rgba(0, 0, 0, 0.3);
  z-index: 999;
  background: #f4f5f6;
  .footer_container {
    display: flex;
    // height: 80rpx;
    padding: 10rpx 0;
    justify-content: flex-start;
    align-items: center;
    .footer_options {
      position: absolute;
      left: 28rpx;
      bottom: 80rpx;
      color: #f4f5f6;
      background-color: rgb(85, 81, 81);
      padding: 30rpx;
      z-index: 99;
      .common {
        color: rgb(163, 162, 162);
      }
      view {
        padding: 5rpx;
      }
    }
    .comment_input {
      // width: 500rpx;
      // height: 100rpx;
      padding: 10rpx 10rpx;
      border-radius: 0.5em / 1em;
      background-color: rgba(0, 0, 0, 0.15);
    }
    .comment_btn {
      margin-left: 50rpx;
    }
  }
}
</style>
