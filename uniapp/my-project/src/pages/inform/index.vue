<template>
  <view>
    <my-tabbar
      class="tabbar"
      :modelData="items"
      :initIndex="currentPage"
      @change="handleChange"
    ></my-tabbar>
    <view class="input_box">
      <input class="header_input" placeholder="输入内容进行检索" placeholder-class="placeholder" type="text" v-model="inputValue" />
      <uni-icons class="search_icons" @click="search" color="#FFFFFF" type="search" size="22" ></uni-icons>
      <view class="more_btn" @click="openMore">筛选
        <uni-icons v-if="showMore" class="arrow_icons" color="#FFFFFF" type="arrowdown" size="18"></uni-icons>
        <uni-icons v-if="!showMore" class="arrow_icons" color="#FFFFFF" type="arrowup" size="18"></uni-icons>
      </view>
    </view>
    <view class="filter_mask" v-if="!showMore">
      <view class="filter_row" @click="clickItem">
        <view :class="{'filter_item':true,'active':activeItem===''}" data-value="">全部</view>
        <view :class="{'filter_item':true,'active':activeItem==='0'}" data-value="0">已发布</view>
        <view :class="{'filter_item':true,'active':activeItem==='2'}" data-value="2">已作废</view>
      </view>
      <view class="filter_row" @click="clickStateItem">
        <view :class="{'filter_item':true,'active':activeState===''}" data-value="">全部</view>
        <view :class="{'filter_item':true,'active':activeState==='0'}" data-value="0">有效</view>
        <view :class="{'filter_item':true,'active':activeState==='1'}" data-value="1">无效</view>
      </view>
      <view class="filter_row" @click="clickTypeItem">
        <view :class="{'filter_item':true,'active':activeType===''}" data-value="">全部</view>
        <view :class="{'filter_item':true,'active':activeType==='培训通知'}" data-value="培训通知">培训通知</view>
        <view :class="{'filter_item':true,'active':activeType==='考试通知'}" data-value="考试通知">考试通知</view>
        <view :class="{'filter_item':true,'active':activeType==='活动通知'}" data-value="活动通知">活动通知</view>
        <view :class="{'filter_item':true,'active':activeType==='会议通知'}" data-value="会议通知">会议通知</view>
        <view :class="{'filter_item':true,'active':activeType==='作业反馈'}" data-value="作业反馈">作业反馈</view>
        <view :class="{'filter_item':true,'active':activeType==='行政通知'}" data-value="行政通知">行政通知</view>
        <view :class="{'filter_item':true,'active':activeType==='内部发文'}" data-value="内部发文">内部发文</view>
        <view :class="{'filter_item':true,'active':activeType==='内部公式'}" data-value="内部公式">内部公式</view>
        <view :class="{'filter_item':true,'active':activeType==='内部通知'}" data-value="内部通知">内部通知</view>
        <view :class="{'filter_item':true,'active':activeType==='内部咨询'}" data-value="内部咨询">内部咨询</view>
      </view>
      <view class="btn_group">
        <button class="btn" size="mini" @click="clearFilter">清空</button>
        <button class="btn" size="mini" @click="search">完成</button>
      </view>
      <view class="shadow" @click="showMore = true"></view>
    </view>
    <list
      :listData="allData"
      class="unread_list"
      :style="{ display: currentPage == 0 ? 'block' : 'none' }"
    ></list>
    <!-- v-if="currentPage == 0" -->
    <list
      :listData="allData"
      class="unread_list"
      :style="{ display: currentPage == 1 ? 'block' : 'none' }"
    ></list>
    <!-- v-if="currentPage == 1" -->
  </view>
</template>
<script>
import myTabbar from "@/components/components/stzhang-tab/stzhang-tab.vue";
import uniIcons from "@/components/uni-new-icons/uni-icons.vue";
import list from "./inform-list.vue";
import { ref } from "@vue/composition-api";
// import { getNotice } from "../inform/api";
import { escape2Html, removeHTMLTag } from "./utils";
export default {
  components: { myTabbar, list, uniIcons },
  onLoad: function () {
    // uni.showLoading({title:'加载中'})
    // this.getData();
  },
  setup() {
    // tabs标签
    const items = ref([
      { label: "未读", num: 0 },
      { label: "全部", num: 0 },
    ]);
    // 当前页
    const currentPage = ref("0");
    // 点击切换tabs
    const state = ref(1)
    const handleChange = (index) => {
      currentPage.value = index;
      if(index == 0){
        state.value = 1
        // getData();
      }else if(index == 1){
        state.value = ''
        // getData();
      }
    };
    // 显示筛选条件
    const showMore = ref(true);
    const openMore = () => {
      showMore.value = !showMore.value;
    };
    // 清空筛选条件
    const clearFilter = () => {
        activeItem.value='';
        activeState.value='';
        activeType.value='';
    };
    // timeDiffed条件
    const activeItem = ref('0');
    const clickItem = (event) => {
      if(activeItem.value === event.target.dataset.value || event.target.dataset.value === true){
        activeItem.value='';
      }else{
        activeItem.value = event.target.dataset.value;
      }
    };
    // stated条件
    const activeState = ref('0');
    const clickStateItem = (event) => {
      if(activeState.value === event.target.dataset.value||event.target.dataset.value === true){
        activeState.value='';
      }else{
        activeState.value = event.target.dataset.value;
      }
    };
    // Typed条件
    const activeType = ref('');
    const clickTypeItem = (event) => {
      if(activeType.value === event.target.dataset.value || event.target.dataset.value === true){
        activeType.value='';
      }else{
        activeType.value = event.target.dataset.value;
      }
    };
    // 搜索
    const inputValue = ref('');
    const search = () => {
      showMore.value = true
      // getData()
    };
    // 所有数据
    const allData = ref({});
    const unreadData = ref({});
    // const getData = () => {
      // uni.showLoading({title:'加载中'});
      // getNotice({
      //   search: inputValue.value,
      //   timeDiffed: activeItem.value,
      //   stated: activeState.value,
      //   Typed: activeType.value,
      //   UnRead:state.value
      // }).then((res) => {
      //   for (let i = 0; i < res[1].tables[0].length; i++) {
      //     res[1].tables[0][i].F_Content = removeHTMLTag(escape2Html(res[1].tables[0][i].F_Content));
      //   }
      //   if(state.value == 1){
      //     items.value[0].num = res[1].tables[0].length;
      //   }
      //   allData.value = res[1].tables[0];
      // }).finally(()=>{uni.hideLoading()});
    // };
    return {
      items,
      currentPage,
      handleChange,
      // getData,
      allData,
      unreadData,
      escape2Html,
      removeHTMLTag,
      showMore,
      clearFilter,
      openMore,
      activeItem,
      clickItem,
      activeState,
      clickStateItem,
      activeType,
      clickTypeItem,
      inputValue,
      search,
    };
  },
};
</script>
<style lang="scss" scoped>
.tabbar {
  position: fixed;
  top: 80rpx;
  right: 0;
  left: 0;
  z-index: 999;
}
.input_box {
  position: fixed;
  justify-content: space-around;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 80rpx;
  background: #0f59a4;
  margin: 0 auto;
  .header_input {
    width: 60%;
    height: 50rpx;
    margin: 0 auto;
    padding: 0 15rpx;
    background: rgba(0, 0, 0, 0.3);
    color: white;
    border-radius: 25rpx;
    text-align: center;
  }
  /deep/.placeholder {
    color: rgba(209, 209, 209, 0.7);
  }
  .search_icons {
    position: absolute;
    right: 160rpx;
    top: -12rpx;
    z-index: 9999;
  }
  .more_btn {
    position: absolute;
    right: 60rpx;
    top: 0;
    color: #ffffff;
    .arrow_icons{
      position: absolute;
      top: -5rpx;
      left: 60rpx;
    }
  }
}
.filter_mask{
  position: fixed;
  top: 80rpx;
  left: 0;
  right: 0;
  bottom: 0;
  background: #ffffff;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  .filter_row{
    width: 100%;
    text-align: center;
    display: flex;
    align-content: flex-start;
    flex-flow: row wrap;
    margin-bottom: 40rpx;
    margin-top: 10rpx;
    .filter_item{
      flex: 0 1 28%;
      justify-content: space-between;
      margin: 10rpx 20rpx;
      border-radius: 10rpx;
      background: #f5f3f3;
    }
    .active{
      color: #CE9A2B;
      background: #FEF9E3;
    }
  }
  .btn_group{
    display: flex;
    flex-flow: row nowrap;
    .btn{
      flex: 0 1 50%;
      height: 100rpx;
      line-height: 100rpx;
      font-size: 32rpx;
      background: #f5f3f3;
    }
  }
  .btn_group :nth-child(2){
    background: #ffe692;
  }
  .shadow{
    height: 100%;
    background: #00000030;
  }
}
.unread_list {
  position: absolute;
  top: 170rpx;
  left: 50%;
  transform: translateX(-50%);
}
</style>