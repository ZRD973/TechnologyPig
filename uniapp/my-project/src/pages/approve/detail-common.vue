<template>
  <div class="borrow-detail__mobile" id="borrow_detail_mobile">
    <div class="detail">
      <h2 class="text_header">审批信息</h2>
      <hr />
      <div class="info">
        <div v-if="showBasicInfo">
          <p class="view_gap">
            <span class="info-title">发起人：</span>
            <span class="info-content">{{ approvalDetail.applyUserName }}</span>
          </p>
          <p class="view_gap">
            <span class="info-title">提出日期：</span>
            <span class="info-content">{{ approvalDetail.createTime }}</span>
          </p>
          <p class="view_gap">
            <span class="info-title">审批结果：</span>
            <span
              :class="['info-content', approvalDetail.approvalStateClass]"
              >{{ approvalDetail.approvalStateName }}</span
            >
          </p>
          <p class="view_gap">
            <span class="info-title">审批内容：</span>
            <span class="info-content">{{ approvalDetail.content }}</span>
          </p>
          <p class="view_gap">
            <span class="info-title">审批人员：</span>
            <span class="info-content">{{
              approvalDetail.approvalUserNames
            }}</span>
          </p>
          <p class="view_gap">
            <span class="info-title">知会人员：</span>
            <span class="info-content">{{
              approvalDetail.copyUserNames || "无"
            }}</span>
          </p>
        </div>
        <slot name="info"></slot>

        <div v-if="files.length">
          <view>
            <span class="info-title">附件：</span>
          </view>
          <view class="files">
            <view
              v-for="item in files"
              :key="item"
              class="file-item"
              @click="filePreview(item)"
            >
              <image
                v-if="getFileType(item) === 'image'"
                src="../../static/images/file/image.png"
              />
              <image
                v-if="getFileType(item) === 'word'"
                src="../../static/images/file/word.png"
              />
              <image
                v-if="getFileType(item) === 'pdf'"
                src="../../static/images/file/pdf.png"
              />
              <image
                v-if="getFileType(item) === 'excel'"
                src="../../static/images/file/excel.png"
              />
              <text class="file-name">{{ item.name + item.ext }}</text>
            </view>
          </view>
        </div>

        <h2 class="text_header">表态与评论</h2>
        <view class="review">
          <view class="list">
            <view class="review_count">{{ reviewData.length }}条评论</view>
            <xw-empty
              v-if="reviewData.length == 0"
              text="没有评论哦"
            ></xw-empty>
            <view
              class="list_item border_color"
              v-for="item in reviewData"
              :key="item.id"
            >
              <view class="left">
                <image class="wx-head-pic" :src="item.wxImgUrl" />
                <view class="icon">
                  <uni-icons
                    v-if="item.state === 0"
                    type="checkbox-filled"
                    color="#67c23a"
                    size="21"
                  ></uni-icons>
                  <uni-icons
                    v-if="item.state === 1"
                    type="clear"
                    color="#f56c6c"
                    size="21"
                  ></uni-icons>
                  <uni-icons
                    v-if="item.state === 2"
                    type="help-filled"
                    color="#e6a23c"
                    size="21"
                  ></uni-icons>
                </view>
              </view>
              <view class="right">
                <view class="view_gap">
                  <span class="li-title view_gap">
                    <span class="li-title view_gap" v-if="item.role === 0"
                      >[审批]</span
                    >
                    <span class="li-title view_gap" v-if="item.role === 1"
                      >[知会]</span
                    >
                    <span class="li-title view_gap" v-if="item.role === 2"
                      >[发起]</span
                    >
                    {{ item.commontPerson }} ({{ item.deptName }})
                  </span>
                </view>
                <view class="li-title view_gap" v-if="item.state != null">
                  <span
                    class="li-title view_gap success-color"
                    v-if="item.state === 0"
                    >拟同意</span
                  >
                  <span
                    class="li-title view_gap danger-color"
                    v-if="item.state === 1"
                    >不同意</span
                  >
                  <span
                    class="li-title view_gap warning-color"
                    v-if="item.state === 2"
                    >待定</span
                  >
                </view>
                <view v-if="item.comment" class="comment-text view_gap"
                  >评论：{{ item.comment }}</view
                >
                <view class="time view_gap">{{ item.createTime }}</view>
              </view>
            </view>
          </view>
        </view>
        <view v-if="canSeeBtn" class="footer">
          <view v-if="myRole === 0 && approvalDetail.canSeeRadio">
            <radio-group
              @change="radioChange"
              style="background: #f4f5f6; padding: 10rpx 0"
            >
              表态：
              <radio value="0" /><text style="margin-right: 20rpx">拟同意</text>
              <radio value="1" /><text style="margin-right: 20rpx">不同意</text>
              <radio value="2" /><text style="margin-right: 20rpx">待定</text>
            </radio-group>
          </view>
          <view class="footer_container">
            <textarea
              v-model="comment"
              class="comment_input uni-input"
              :placeholder="placeholderText"
              placeholder-style="font-size:30rpx;"
              auto-height
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
        <view v-else class="oprator_tips"
          >您不是审批人或知会人无法评论，如需审批请联系审批发起人添加您为审批人。
        </view>
      </div>
    </div>
  </div>
</template>
<script>
import { onLoad, ref, watch } from "@vue/composition-api";
import XwEmpty from "@/components/xw-empty/xw-empty.vue";
import uniIcons from "@/components/uni-new-icons/uni-icons.vue";
// import { Preview } from "./api";
import { apiUrl } from '@/config/index';
// import {
//   getApprovalDetail,
//   getComments,
//   getHaveTakeAStand,
//   addComment,
//   getFileList,
// } from "./api";
export default {
  components: { XwEmpty, uniIcons },
  props: {
    myRole: Number,
    goalID: Number,
    Module: String,
    showBasicInfo: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, ctx) {
    setTimeout(() => {
      uni.hideLoading();
    }, 0);
    // 评论数据
    const reviewData = ref([]);
    // 评论按钮
    const canSeeBtn = ref(false);
    const placeholderText = ref("");

    // 发送评论
    const id = ref(0);
    const role = ref(0);
    const module = ref("");
    const comment = ref("");
    const haveTakeAStand = ref(false);
    const radio = ref("");
    const radioChange = (evt) => {
      radio.value = +evt.detail.value;
    };
    const sendComment = () => {
      /**
       * 角色是审批人
       * 还没评论时，表态必填，评论非必填；评论过后，表态和评论二选一必填
       * 角色是知会人和发起人，评论必填
       */
      if (role.value === 0) {
        if (radio.value === "") {
          uni.showToast({
            title: "您未表态",
            icon: "error",
            duration: 1000,
          });
        } else if (comment.value == "" && !haveTakeAStand.value) {
          uni.showToast({
            title: "请填写评论内容",
            icon: "error",
            duration: 1000,
          });
        } else if (radio.value === 1) {
          uni.showModal({
            title: "提示",
            content:
              "您的审批意见为不同意，本条申请将不予通过，证书会退回入库人处，不同意后无法修改审批意见。请确认是否不同意",
            confirmColor: "#ff2424",
            success: function (res) {
              if (res.confirm) {
                handleAddComment(comment.value, radio.value);
              }
            },
          });
        } else if (radio.value === "") {
          handleAddComment(comment.value);
        } else {
          handleAddComment(comment.value, radio.value);
        }
      } else if (role.value === 1 || role.value === 2) {
        if (comment.value == "") {
          uni.showToast({
            title: "请填写评论内容",
            icon: "error",
            duration: 1000,
          });
        } else {
          handleAddComment(comment.value);
        }
      }
    };

    const handleAddComment = (comments, view) => {
      // addComment(id.value, module.value, comments, view).then((res) => {
      //   comment.value = "";
      //   radio.value = "";
      //   if (res[0] === null) {
      //     uni.showToast({ title: res[1].msg, icon: "success", duration: 1000 });
      //   } else {
      //     uni.showToast({ title: res[0].msg, icon: "none", duration: 1000 });
      //   }
      //   // getComments(id.value, module.value).then((res) => {
      //   //   reviewData.value = res[1].data;
      //   //   let pages = getCurrentPages();
      //   //   pages[pages.length - 2].$vm.getApprovalListData();
      //   //   pages[pages.length - 3].$vm.getApproveData();
      //   // });
      // });
    };
    watch(
      () => props,
      (newValues) => {
        let { goalID, myRole, Module } = newValues;
        id.value = goalID;
        role.value = myRole;
        module.value = Module;

        // 公共信息数据
        if (myRole != null && (+myRole === 1 || +myRole === 2)) {
          canSeeBtn.value = true;
          placeholderText.value = "请评论…";
        }
        if (myRole != null && +myRole === 0) {
          canSeeBtn.value = true;
          placeholderText.value = "表态和评论…";
        }

        getApproval(goalID, Module);
        // getHaveTakeAStand(goalID, Module).then((res) => {
        //   haveTakeAStand.value = res[1].data.haveTakeAStand;
        //   if (haveTakeAStand.value) {
        //     placeholderText.value = "请评论…";
        //   }
        // });
        // 评论数据
        // getComments(goalID, Module).then((res) => {
        //   reviewData.value = res[1].data;
        // });
      },
      { deep: true }
    );
    // 公共数据
    const approvalDetail = ref({});
    const files = ref([]);
    const isImg = (ext) => {
      return ["png", "jpg", "jpeg"].includes(ext);
    };
    const isExcel = (ext) => {
      return ["xlsx", "xls"].includes(ext);
    };
    const isWord = (ext) => {
      return ["doc", "docx"].includes(ext);
    };
    const getFileType = (file) => {
      const ext = file.ext.replace(".", "");
      let fileType = ext;
      if (isImg(ext)) {
        fileType = "image";
      }
      if (isExcel(ext)) {
        fileType = "excel";
      }
      if (isWord(ext)) {
        fileType = "isWord";
      }
      return fileType;
    };

    // 文件预览
    const filePreview = (item) => {
      console.log("filePreview", item);
      // var url = item.url || apiUrl.FileApi;
      // var db = item.db = item.db || item.appid;
      // Preview({ ID: item.id}, (res) => {
      //   if (getFileType(item) === "image") {
      //     // uni.previewImage({
      //     //     urls:[url + "/FilePreview?db=" + db + "&downloadCode=" + res[1]['downloadCode']]
      //     //   })
      //     uni.downloadFile({
      //       url: url + "/FilePreview?db=" + db + "&downloadCode=" + res[1]['downloadCode'],
      //       success: function (res) {
      //         var filePath = res.tempFilePath;
      //         uni.previewImage({
      //           urls:[filePath]
      //         })
      //       },
      //     });
      //   } else {
      //     let fileType;
      //     if(getFileType(item) === "word"){
      //       fileType = "doc"
      //     }else if(getFileType(item) === "pdf"){
      //       fileType = "pdf"
      //     }
      //     else if(getFileType(item) === "excel"){
      //       fileType = "xls"
      //     }
      //     uni.downloadFile({
      //       url: url + "/FilePreview?db=" + db + "&downloadCode=" + res[1]['downloadCode'],
      //       success: function (res) {
      //         console.log(res);
      //         var filePath = res.tempFilePath;
      //         uni.openDocument({
      //           filePath: filePath,
      //           fileType: fileType,
      //           success: function (res) {
      //             console.log("打开文档成功");
      //           },
      //         });
      //       },
      //     });
      //   }
      // });
    };

    const getApproval = (id, Module) => {
      // getApprovalDetail(id, Module).then((res) => {
      //   let approvalDetailInfo = {};
      //   approvalDetailInfo = res[1].data.info;
      //   approvalDetailInfo.canSeeRadio = false;
      //   if (
      //     res[1].data.info.approvalPassCounts ===
      //       res[1].data.info.approvalCounts ||
      //     res[1].data.info.resultState == 3
      //   ) {
      //     if (res[1].data.info.resultState == 3) {
      //       approvalDetailInfo.approvalStateName = "已撤销";
      //       approvalDetailInfo.approvalStateClass = "info-color";
      //     } else {
      //       approvalDetailInfo.approvalStateName = "已通过";
      //       approvalDetailInfo.approvalStateClass = "success-color";
      //     }
      //   } else if (res[1].data.info.approvalUnPassCounts != 0) {
      //     approvalDetailInfo.approvalStateName = "不通过";
      //     approvalDetailInfo.approvalStateClass = "danger-color";
      //   } else {
      //     approvalDetailInfo.canSeeRadio = true;
      //     approvalDetailInfo.approvalStateName = "审核中";
      //     approvalDetailInfo.approvalStateClass = "warning-color";
      //   }
      //   ctx.emit("onGetInfo", approvalDetailInfo);
      //   approvalDetail.value = approvalDetailInfo;
      // });
      // 附件

      // getFileList(id, Module).then((res) => {
      //   files.value = res[1].tables[0];
      // });
    };

    return {
      approvalDetail,
      reviewData,
      canSeeBtn,
      placeholderText,
      id,
      role,
      module,
      comment,
      radio,
      radioChange,
      haveTakeAStand,
      sendComment,
      handleAddComment,
      files,
      getFileType,
      filePreview,
    };
  },
};
</script>
<style lang="scss" scoped>
.borrow-detail__mobile {
  height: 100%;
  overflow: hidden;
  .detail {
    height: calc(100% - 200rpx);
    overflow-y: auto;
    padding: 20rpx;
    .info {
      margin-top: 20rpx;
      span {
        font-size: 32rpx;
      }
      .info-title {
        font-weight: 700;
      }
      .files {
        padding: 10px 0;
        .file-item {
          display: flex;
          align-items: center;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: content-box;
          height: 50px;
          margin-bottom: 4px;
          padding: 0 10px;
          image {
            width: 40px;
            height: 40px;
            margin-right: 10px;
          }
          .file-name {
            width: 83%;
            line-height: 1.2;
            overflow: hidden;
          }
        }
      }
    }
  }
}
.view_gap {
  line-height: 1.5;
}
.text_header {
  font-weight: 400;
  font-size: 42rpx;
  background: #eeeeee;
}
.oprator_tips {
  color: #eb7350;
  margin: -120rpx auto;
  padding: 20px;
}
.review {
  margin-bottom: 160rpx;
  .review_count {
    margin-left: 20rpx;
    font-size: 32rpx;
  }
  .list_item {
    padding: 10rpx 20rpx;
    display: flex;
    flex-direction: row;
    .left {
      position: relative;
      margin-right: 20px;
      .wx-head-pic {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
      }
      .icon {
        position: absolute;
        top: 30rpx;
        right: -10rpx;
      }
    }
    .right {
      .li-title {
        font-size: 28rpx;
        margin-right: 10rpx;
      }
    }
  }
}
.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
  padding: 0 20rpx;
  border-top: 1px solid rgba(0, 0, 0, 0.3);
  z-index: 999;
  background: #f4f5f6;
  .footer_container {
    display: flex;
    padding: 10rpx 0;
    justify-content: flex-start;
    align-items: center;
    .comment_input {
      padding: 10rpx 10rpx;
      border-radius: 0.5em / 1em;
      background-color: rgba(0, 0, 0, 0.15);
    }
    .comment_btn {
      margin-left: 50rpx;
    }
  }
}
/deep/ uni-icons {
  font-family: uniicons;
  text-decoration: none;
  text-align: center;
  background: #f4f5f6;
  border-radius: 50%;
}
</style>