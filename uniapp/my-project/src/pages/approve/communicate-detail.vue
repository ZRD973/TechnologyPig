<template>
  <view>
    <!-- 沟通记录 -->
    <detail-common
      @onGetInfo="handleGetInfo"
      :show-basic-info="false"
      :goalID="goalID"
      :myRole="myRole"
      :Module="Module"
    >
      <template v-slot:info>
        <view class="view_gap">
          <span class="info-title">提出部门：</span>
          <span class="info-content">{{ info.PropodeptCap || "无" }}</span>
        </view>
        <view class="view_gap">
          <span class="info-title">提出日期：</span>
          <span class="info-content">{{
            approvalDetailInfo.ApplyTime || "无"
          }}</span>
        </view>
        <view class="view_gap">
          <span class="info-title">沟通内容：</span>
          <span class="info-content">{{
            approvalDetailInfo.content || "无"
          }}</span>
        </view>
        <view class="view_gap">
          <span class="info-title">沟通结果：</span>
          <span
            :class="['info-content', approvalDetailInfo.approvalStateClass]"
            >{{ approvalDetailInfo.approvalStateName || "无" }}</span
          >
        </view>
        <view class="view_gap">
          <span class="info-title">沟通部门：</span>
          <span class="info-content">{{ info.CommundeptCap || "无" }}</span>
        </view>
        <view class="view_gap">
          <span class="info-title">沟通人员：</span>
          <span class="info-content">{{
            approvalDetailInfo.approvalUserNames || "无"
          }}</span>
        </view>
        <view class="view_gap">
          <span class="info-title">知会人员：</span>
          <span class="info-content">{{
            approvalDetailInfo.copyUserNames || "无"
          }}</span>
        </view>
      </template>
    </detail-common>
  </view>
</template>
<script>
// import { getCommunicationDetailList } from "./api";
import detailCommon from "./detail-common.vue";
import { ref } from "@vue/composition-api";
export default {
  components: { detailCommon },
  setup() {
    const info = ref({});
    const goalID = ref(0);
    const myRole = ref(0);
    const Module = ref("");
    const approvalDetailInfo = ref({});
    const handleGetInfo = (res) => {
      approvalDetailInfo.value = res;
    };
    return {
      info,
      goalID,
      myRole,
      Module,
      handleGetInfo,
      approvalDetailInfo,
    };
  },
  onLoad: function (option) {
    this.goalID = option.ID;
    this.myRole = +option.role;
    this.Module = option.module;
    // 插槽数据
    // getCommunicationDetailList(option.ID).then((res) => {
    //   this.info = res[1].tables[0][0];
    // });
  },
};
</script>
<style lang="scss" scoped>
span {
  font-size: 32rpx;
}
.info-title {
  font-weight: 700;
}
.info_detail {
  margin-left: 10rpx;
  color: #40aaff;
}
.view_gap {
  line-height: 1.5;
}
</style>