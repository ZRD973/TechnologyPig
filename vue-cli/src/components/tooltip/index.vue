<template>
  <div>
    <transition name="el-zoom-in-top" @before-enter="transitionComplete">
      <div v-if="tipVisible" class="popover_tip">
        <div class=" popover__title">
          <span>{{ title }}</span>
          <span @click="closeTip" class="cancel">X</span>
        </div>
        <div class="popover__content">
            <span>{{ content }}</span>
        </div>
        <div class="popper-arrow"></div>
      </div>
    </transition>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from "vue";
export default {
  name: "tooltip",
  props: {
    title: {
      type: String,
      default: "小提示",
    },
    content: {
      type: String,
      default: "这是提示的内容",
    }
  },
  setup(props, ctx) {
    /**
     * 控制提示
     * tipVisible
     */

    const tipVisible = ref(false); //控制提示

    // 关闭提示
    const closeTip = () => {
      tipVisible.value = false;
    };

    const transitionComplete = () => {
     
        setTimeout(() => {
          tipVisible.value = true;
        }, 800);
      
      
    };
    onMounted(()=>{
        transitionComplete();
      })
    return {
      closeTip,
      transitionComplete,
      tipVisible
    };
  },
};
</script>

<style lang="scss" scoped>
.popover_tip{
  border-radius: 4px;
  background: #1890ff;
  min-width: 150px;
  border: 1px solid #1890ff;
  color: white;
  line-height: 1.4;
  text-align: justify;
  padding: 18px 20px;
  margin-top: 12px;
  position: absolute;
  top: 45px;
  left: -65px;
  transform-origin: center top;
  box-shadow: 0 2px 12px 0;
z-index: 9999;
}
.popper-arrow {
  border-bottom-color: #1890ff !important;
  border-color: #1890ff;
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  top: -20px;
  left: 48%;
  border-color: transparent;
  border-style: solid;
  border-width: 10px;
}

.cancel {
  width: 15px;
  height: 15px;
  position: absolute;
  right: 5%;
  top: 8%;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
}

.popover__title {
  font-size:16px;
}


</style>