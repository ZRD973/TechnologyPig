<template>
  <div>
    <tab-control :titles="titles" @titleClick="titleClick"></tab-control>
    <h2>{{ contents[currentIndex] }}</h2>
    <tab-bar :data="tabBarData" @clickTab="handleClick"></tab-bar>
  </div>
</template>

<script>
import { ref,reactive } from "vue";
import TabControl from "./TabControl.vue";
import TabBar from "./tabBar.vue";
export default {
  name: "tab",
  components: {
    TabControl,
    TabBar,
  },
  setup() {
    const titles = ref(["衣服", "裤子", "鞋子"]);
    const contents = ref(["衣服页面", "裤子页面", "鞋子页面"]);
    const currentIndex = ref(0);
    const titleClick = (index) => {
      currentIndex.value = index;
    };

    const tabBarData = reactive([
      { name: "食堂", img: "./img/canteenLogo.jpg", num: 0 },
      { name: "通知公告", img: "./img/noticeLogo.png", num: 5 },
      { name: "我的", img: "./img/personage.jpg", num: 22 },
    ]);

    const handleClick = (data) => {
      if (data == "食堂") {
        console.log("食堂");
      }
      if (data == "通知公告") {
        console.log("通知公告");
      }
      if (data == "我的") {
        console.log("我的");
      }
    };
    return {
      titles,
      contents,
      currentIndex,
      titleClick,
      tabBarData,
      handleClick
    };
  },
};
</script>

<style>
</style>