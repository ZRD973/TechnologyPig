<template>
  <div >
    <div class="tabBar">
      <div class="iconBox"  v-for="(item,index) in data" :key="index" @click="handleClick(item.name)">
        <div class="iconBadge" v-if="item.num"><span style="position: absolute;left: 7px;top: -10px;">{{  item.num > 9 ? "9+" : item.num }}</span></div>
        <img class="iconImg" >
        <span class="iconText">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: []
    },
  },
  methods: {
      handleClick(name){
        this.$emit('clickTab',name)
      }

    //  <tab-bar :data="data" @clickTab="handleClick"></tab-bar>

    // const data = reactive([
    //   {name:'食堂',img:'../../static/images/canteenLogo.jpg',num:0},
    //   {name:'通知公告',img:'../../static/images/noticeLogo.png',num:5},
    //   {name:'我的',img:'../../static/images/personage.jpg',num:22},
    // ])
    
    //  const handleClick =(data) =>{
    //  if(data == "食堂"){
    //    console.log("食堂");
    //  }
    //  if(data == "通知公告"){
    //    console.log("通知公告");
    //  }
    //  if(data == "我的"){
    //    console.log("我的");
    //  }
    // }
  }
};
</script>
<style lang="scss" scoped>
.tabBar {
  margin-top: 20px;
  display: flex;
  flex-flow: row wrap;
  .iconBox {
    position: relative;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    flex: 0 1 25%;
    align-items: center;
    line-height: 50px;
    margin-bottom:10px;
    .iconBadge {
      width: 25px;
      height: 25px;
      position: absolute;
      right: 16px;
      top: -12px;
      border-radius: 50%;
      text-align: center;
      color: white;
      background-color: #df4742;
      // background-color: #DD524D;
    }
    .iconImg {
      width: 45px;
      height: 45px;
      border-radius: 10px;
      background-color: aquamarine;
    }
    .iconText {
      line-height: 23px;
    }
  }
}
</style>