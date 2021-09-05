<template>
  <view>
    <!-- 证书借阅 -->
    <detail-common
    :style="{display:showBookDetail?'block':'none'}"
      :goalID="goalID"
      :myRole="myRole"
      :Module="Module"
    >
      <template v-slot:info class="view_gap">
        <view class="view_gap">
          <span class="info-title">借阅证书：</span>
          <span class="info-content"
            >{{ bookCount }}本
            <span class="info_detail" @click="showBookDetail=false">详情</span>
          </span>
        </view>
      </template>
    </detail-common>

    <view :style="{display:showBookDetail?'none':'block'}" class="bookDetail">
      <view class="view_gap">
        <span class="info-title">姓名：</span>
        <span class="info-content">{{ info.person || "无" }}</span>
      </view>
      <view class="view_gap">
        <span class="info-title">部门：</span>
        <span class="info-content">{{ info.pDeptName || "无"}}</span>
      </view>
      <view class="view_gap">
        <span class="info-title">公司：</span>
        <span class="info-content">{{ info.pOrgName || "无" }}</span>
      </view>
      <view class="view_gap">
        <span class="info-title">证书：</span>
        <span class="info-content">{{ info.certifyName || "无"}}</span>
      </view>
      <view class="view_gap">
        <span class="info-title">专业：</span>
        <span class="info-content">{{ info.SubjectNames || "无"}}</span>
      </view>
      <view class="view_gap">
        <span class="info-title">证书类别：</span>
        <span v-if="info.type===0">资格证书</span>
        <span v-if="info.type===1">注册证书</span>
      </view>
      <button style="margin-top:20rpx;" type="info" @click="showBookDetail=true">返回</button>
    </view>
  </view>
</template>
<script>
import { ref } from "@vue/composition-api";
import detailCommon from "./detail-common.vue";
// import { getBorrowDetailList } from "./api";
export default {
  components: { detailCommon },
  setup() {
    // 插槽数据
    const info = ref({});
    const goalID = ref(0);
    const myRole = ref(0);
    const Module = ref("");
    const bookCount = ref(0);
    const showBookDetail = ref(true);

    return {
      info,
      goalID,
      myRole,
      Module,
      bookCount,
      showBookDetail,
    };
  },
  onLoad: function (option) {
    this.goalID = option.ID;
    this.myRole = +option.role;
    this.Module = option.module;
    // 插槽数据
    // getBorrowDetailList(option.ID).then((res) => {
    //   this.bookCount = res[1].tables[0].length;
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
.bookDetail{
padding: 20rpx;
}
</style>
