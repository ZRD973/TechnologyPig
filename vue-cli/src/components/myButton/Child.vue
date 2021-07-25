<template>
  <div>
    <div v-show="isShow">
      <h1>子组件</h1>
      <button @click="childBtn">子组件按钮</button>
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            isShow:false
        }
    },
    methods: {
        show(){
            this.isShow =  ! this.isShow
        },
        childBtn(){
          this.$parent.btn3()
        }
    },
};
</script>
