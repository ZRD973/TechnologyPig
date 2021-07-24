<template>
  <div>
      <tab-control :titles="titles" @titleClick="titleClick"></tab-control>
      <h2>{{contents[currentIndex]}}</h2>
  </div>
</template>

<script>
import {  ref } from '@vue/reactivity'
import TabControl from './TabControl.vue'
export default {
    name:"tab",
    components:{
        TabControl
    },
    setup(){
        const titles = ref(['衣服','裤子','鞋子']);
        const contents = ref(['衣服页面','裤子页面','鞋子页面']);
        const currentIndex = ref(0);
        const titleClick = (index) =>{
            currentIndex.value = index;
        }

        return {
            titles,
            contents,
            currentIndex,
            titleClick
        }
    }
}
</script>

<style>

</style>