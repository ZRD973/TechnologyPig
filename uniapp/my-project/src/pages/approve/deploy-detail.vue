<template>
  <view>
      <!-- 人员调配 -->
    <detail-common
    :style="{display:!showCurrentLocaltionList && !showTransferOutLocationList && !showTransferInLocationList ?'block':'none'}"
     :goalID="goalID" :myRole="myRole" :Module="Module">
      <template v-slot:info class="view_gap">
        <view class="view_gap">
          <span class="info-title">调出人员：</span>
          <span class="info-content">{{ info.PersonName || "无" }}</span>
        </view>
        <view class="view_gap">
          <span class="info-title ">身份证号：</span>
          <span class="info-content">{{ Project[2][0].sfzh || "无" }}</span>
        </view>
        <view class="link">
          <view class="primary-color view_project" @click="showCurrentLocaltionList = true"> 原考勤项目（{{Project[0].length || 0}}）</view>
        </view>
        <view class="link">
          <view class="primary-color view_project" @click="showTransferOutLocationList = true"> 调出考勤项目（{{Project[4].length || 0}}）</view>
        </view>
        <view class="link">
          <view class="primary-color view_project" @click="showTransferInLocationList = true"> 调入考勤项目（{{Project[3].length || 0}}）</view>
        </view>
        <view class="view_gap">
          <span class="info-title">成本机构至：</span>
          <span class="info-content">
            <view v-if="Project[1][0]" >
              <view class="view_project">当前发薪机构：{{Project[1][0].fxdw}};</view>
              <view class="view_project">当前参保机构：{{Project[1][0].cbdy}};</view>
              <view class="view_project">当前缴金机构：{{Project[1][0].jjdw}};</view>
            </view>
            <view v-else>无</view>
          </span>
        </view>
        <view class="view_gap">
          <span class="info-title">档案位置至：</span>
          <span class="info-content">
            <view  v-if="Project[2][0]" >
              <view class="view_project">部门：{{Project[2][0].DeptCap}};</view>
              <view class="view_project">单元名称： {{Project[2][0].name}};</view>
              <view class="view_project">单元简称：{{Project[2][0].dyjc}};</view>
            </view>
            <view v-else>无</view>
          </span>
        </view>
      </template>
    </detail-common>
    <!-- 考勤项目 -->
      <view :style="{display:showCurrentLocaltionList?'block':'none'}" >
          <view v-if="Project[0].length" style="margin-bottom:92rpx;">
            <view v-for="item in Project[0]" :key="item.ID" class="project_detail">
              <p>部门：{{item.DeptCap}}</p>
              <p>单元：{{item.name}}</p>
              <p>简称：{{item.dyjc}}</p>
              <p>岗位：{{item.pygw}}</p>
              <p>职级名称：{{item.Rankname}}</p>
              <p>调入时间：{{item.InTime?item.InTime:'无'}}</p>
              <p>调出时间：{{item.OutTime?item.OutTime:'无'}}</p>
            </view>
          </view>
          <xw-empty v-else text="没有考勤项目"></xw-empty>
        <button class="project_detail_btn" type="info" @click="showCurrentLocaltionList=false">返回</button>
    </view>
      <!-- 调出项目 -->
      <view :style="{display:showTransferOutLocationList?'block':'none'}" >
          <view v-if="Project[4].length" style="margin-bottom:92rpx;">
            <view v-for="item in Project[4]" :key="item.ID" class="project_detail">
              <p>部门：{{item.ToDept}}</p>
              <p>单元：{{item.ToCellNo}}</p>
              <p>简称：{{item.ToCellCap}}</p>
              <p>岗位：{{item.pygw}}</p>
              <p>职级名称：{{item.rankname}}</p>
              <p>调入时间：{{item.InTime?item.InTime:'无'}}</p>
              <p>调出时间：{{item.EndTime?item.EndTime:'无'}}</p>
            </view>
          </view>
          <xw-empty v-else text="没有调出项目"></xw-empty>
        <button class="project_detail_btn" type="info" @click="showTransferOutLocationList=false">返回</button>
    </view>
      <!-- 调入项目 -->
      <view :style="{display:showTransferInLocationList?'block':'none'}" >
          <view v-if="Project[3].length" style="margin-bottom:92rpx;">
            <view v-for="item in Project[3]" :key="item.ID" class="project_detail">
              <p>部门：{{item.ToDept}}</p>
              <p>单元：{{item.ToCellNo}}</p>
              <p>简称：{{item.ToCellCap}}</p>
              <p>岗位：{{item.pygw}}</p>
              <p>职级名称：{{item.rankname}}</p>
              <p>调入时间：{{item.InTime?item.InTime:'无'}}</p>
              <p>调出时间：{{item.OutTime?item.OutTime:'无'}}</p>
            </view>
          </view>
           <xw-empty v-else text="没有调入项目"></xw-empty>
        <button class="project_detail_btn" type="info" @click="showTransferInLocationList=false">返回</button>
    </view>
  </view>
</template>


<script>
import detailCommon from "./detail-common.vue";
import XwEmpty from "@/components/xw-empty/xw-empty.vue";
import { ref } from "@vue/composition-api";
// import { getDeployDetaillList,getDeployDetaillProject } from "./api";
export default {
  components: { detailCommon,XwEmpty },
  setup(){
    // 插槽数据
    const info = ref({});
    const Project = ref({});
    const goalID = ref(0);
    const myRole = ref(0);
    const Module = ref('');
    const showCurrentLocaltionList =ref(false);
    const showTransferOutLocationList =ref(false);
    const showTransferInLocationList =ref(false);
      return{
          info,Project,goalID,myRole,Module,
          showCurrentLocaltionList,
          showTransferOutLocationList,
          showTransferInLocationList,
      }
  },
   onLoad: function (option) {
    this.goalID = option.ID;
    this.myRole = +option.role;
    this.Module = option.module;
    // 插槽数据
    // getDeployDetaillList(option.ID).then((res) => {
    //   this.info = res[1].tables[0][0];
    // });
    // getDeployDetaillProject(option.ID).then((res) => {
    //   this.Project = res[1].tables
    // });
   }
};
</script>

<style lang="scss" scoped>
.view_gap {
  line-height: 1.5;
}
.view_project{
  line-height: 1.5;
  font-size: 32rpx;
}
.project_detail{
  background:#fff;
  border-bottom:1px solid #ccc;
  padding:10px;
  view{
    line-height: 1.5;
  }
}
.project_detail_btn{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}
span {
  font-size: 32rpx;
}
.info-title {
  font-weight: 700;
}
.text_header {
  font-weight: 400;
  font-size: 42rpx;
}
</style>