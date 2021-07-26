<template>
  <el-tooltip
    popper-class="setPopperWidth"
    class="item pointer"
    effect="dark"
    :content="content"
    :placement="placement"
    style="cursor: pointer"
  >
    <i :class="[icon]"></i>
  </el-tooltip>
</template>
<script>
export default {
  name: "icon-tip",
  props: {
    content: {
      type: String,
      default: "提示的内容",
    },
    placement: {
      type: String,
      default: "bottom",
    },
    icon: {
      type: String,
      default: "el-icon-question",
    },
  },
};
</script>
<style lang="scss">
.setPopperWidth {
  word-break: break-all;
  max-width: 20%;
  font-size: 14px;
}
</style>