<template>
  <view>
    <my-tabbar
      class="tabbar"
      :modelData="items"
      :initIndex="currentPage"
      @change="handleChange"
    ></my-tabbar>
    <view class="search">
       <!-- 已办 0 then '已通过' when 1 then '未通过'  when 2 then '审核中'  when 3 then '已撤销' -->
      <picker class="search_picker" v-if="currentPage == 1" @change="finishedPickerChange" :value="finishedIndex" :range="finishedArray">
        <view class="uni-input" >{{ finishedArray[finishedIndex] }}
          <uni-icons class="arrow_icons" color="#292A2D" type="arrowdown" size="18"></uni-icons>
        </view>
      </picker>
      <!-- 抄送我  0已阅知/1未阅知 -->
      <picker class="search_picker" v-if="currentPage == 2" @change="duplicatePickerChange" :value="duplicateIndex" :range="duplicateArray">
        <view class="uni-input" >{{ duplicateArray[duplicateIndex] }}
          <uni-icons class="arrow_icons" color="#292A2D" type="arrowdown" size="18"></uni-icons>
        </view>
      </picker>
      <!-- 证书借阅/人员调配 -->
      <picker class="search_picker" @change="statePickerChange" :value="stateIndex" :range="stateArray">
        <view class="uni-input" >{{ stateArray[stateIndex] }}
          <uni-icons class="arrow_icons" color="#292A2D" type="arrowdown" size="18"></uni-icons>
        </view>
      </picker>
    </view>
    <list class="data_list" :listData="pendingData" :style="{ display: currentPage == 0 ? 'block' : 'none' }"></list>
    <list class="data_list" :listData="doneData" :style="{ display: currentPage == 1 ? 'block' : 'none' }" ></list>
    <list class="data_list" :listData="duplicateData" :currentPage="currentPage" :style="{ display: currentPage == 2 ? 'block' : 'none' }"></list>
  </view>
</template>
<script>
import myTabbar from "@/components/components/stzhang-tab/stzhang-tab.vue";
import { ref, reactive, toRefs } from "@vue/composition-api";
// import {  mapState } from "vuex";
import list from "./approve-list.vue";
import uniIcons from "@/components/uni-new-icons/uni-icons.vue";
// import { getAllData } from "./api";
export default {
  components: { myTabbar, list, uniIcons },
  computed: {
    // ...mapState(["userInfo"]),
  },
  setup() {

    // tabs标签
    const items = ref([
      { label: "待审批", num: 0 },
      { label: "已办", num: 0 },
      { label: "抄送我", num: 0 },
    ]);
    // 当前页
    const currentPage = ref(0);
    // 点击切换tabs
    const handleChange = (index) => {
      currentPage.value = index;
      //待办
      if (index == 0) {
        getApprovalListData({ Backlog: true });
        statePicker.stateIndex = 0;
      }
      // 已办
      if (index == 1) {
        getApprovalListData({ Finished: true });
        statePicker.stateIndex = 0;
      }
      // 抄送
      if (index == 2) {
        getApprovalListData({Duplicate: true });
        statePicker.stateIndex = 0;
      }
    };
    // 选择   全部类型
    const statePicker = reactive({
      stateArray: ["全部类型", "人员调配", "证书借阅"],
      // stateArray: ["全部类型", "人员调配", "证书借阅","沟通记录" ],
      stateIndex: 0,
    });
    // 选择  证书借阅/人员调配
    const statePickerChange = (e) => {
      statePicker.stateIndex = e.target.value;
      //待办
      if (currentPage.value == 0) {
          getApprovalListData({
            Backlog: true,
            AppType:statePicker.stateIndex == 0 ? '': statePicker.stateArray[statePicker.stateIndex],
          });
      }
      // 已办
      else if (currentPage.value == 1) {
          getApprovalListData({
            Finished: true,
            AppType:statePicker.stateIndex == 0 ? '': statePicker.stateArray[statePicker.stateIndex],
            AppStateY: finishedPicker.finishedIndex == 0 ? '':finishedPicker.finishedIndex - 1,
          });
      }
      // 抄送
      else if (currentPage.value == 2) {
          getApprovalListData({
            Duplicate: true,
            AppType:statePicker.stateIndex == 0 ? '': statePicker.stateArray[statePicker.stateIndex],
            AppStateC: duplicatePicker.duplicateIndex == 0 ? '':duplicatePicker.duplicateIndex-1,
          });
      }
    };
    // 已办选择
    const finishedPicker = reactive({
      finishedArray: ["全部状态", "已通过", "未通过", "审核中", "已撤销"],
      finishedIndex: 0,
    });
    const finishedPickerChange = (e) => {
      finishedPicker.finishedIndex = e.target.value;
        getApprovalListData({
          Finished: true,
          AppType:statePicker.stateIndex == 0 ? '': statePicker.stateArray[statePicker.stateIndex],
          AppStateY: finishedPicker.finishedIndex == 0? '': finishedPicker.finishedIndex - 1,
        });
    };
    // 抄送选择
    const duplicatePicker = reactive({
      duplicateArray: ["全部状态", "未阅知", "已阅知"],
      duplicateIndex: 0,
    });
    const duplicatePickerChange = (e) => {
      duplicatePicker.duplicateIndex = e.target.value;
        getApprovalListData({
          Duplicate: true,
          AppType:statePicker.stateIndex == 0 ? '': statePicker.stateArray[statePicker.stateIndex],
          AppStateC: duplicatePicker.duplicateIndex == 0 ? '':duplicatePicker.duplicateIndex-1,
        });
    };
    // 待审批数据
    const pendingData = ref([]);
    // 已办数据
    const doneData = ref([]);
    // 抄送数据
    const duplicateData = ref([]);
    // 请求数据
    const getApprovalListData = (options={Backlog: true}) => {
      // uni.showLoading({title:'加载中'})
      // getAllData(options).then((res) => {
      //   if(options.Backlog){
      //     pendingData.value = res[1].tables[0];
      //   }else if(options.Finished){
      //     doneData.value = res[1].tables[0];
      //   }else if(options.Duplicate){
      //     duplicateData.value = res[1].tables[0];
      //   }
      // }).finally(()=>{uni.hideLoading()});
    };
    return {
      items,
      currentPage,
      handleChange,
      ...toRefs(statePicker),
      statePickerChange,
      ...toRefs(finishedPicker),
      finishedPickerChange,
      ...toRefs(duplicatePicker),
      duplicatePickerChange,
      pendingData,
      doneData,
      duplicateData,
      getApprovalListData,
    };
  },
  onLoad(){
    // uni.showLoading({title:'加载中'});
    // this.getApprovalListData();
  }
};
</script>
<style lang="scss" scoped>
.tabbar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 999;
}
.search {
  position: fixed;
  top: 88rpx;
  right: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  background-color: #ffffff;
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid #80808036;
  .search_picker{
    width: 50%;
    display: inline-block;
    text-align: center;
    padding: 12rpx 36rpx;
    box-sizing: border-box;
  }
  .uni-input {
    border: 1px solid #00000030;
    padding: 0;
    border-radius: 25rpx;
    .arrow_icons {
      position: relative;
      top: 5rpx;
      right: -60rpx;
    }
  }
}
.data_list {
  position: absolute;
  top: 174rpx;
  left: 50%;
  transform: translateX(-50%);
}
</style>