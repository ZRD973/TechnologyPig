<!--
 * @Author: lanweipeng
 * @Date: 2020-12-17 14:53:51
 * @LastEditTime: 2021-05-24 16:54:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \trunk\Pages\src\views\components\button.vue
-->
<template>
  <el-button :type="elBtnType" @click="handleClick" :loading="loading">
    <i :class='["fa",elBtnCcss]'></i>{{text?text:elBtnText}}
  </el-button>
</template>
<script>
import { commonBtnTypes } from "./constant";
export default {
  props: {
    hbBtnType: String,
    returnUrl: String,
    text: String,
    loading: {
      type: Boolean,
      default: false
    }
  },
  setup(props, ctx) {
    const handleClick = event => {
      ctx.emit("click", event);
    };
    const elBtnTypes = {
      ...commonBtnTypes
    };
    const { elBtnType = "primary", elBtnCcss, elBtnText } = elBtnTypes[
      props.hbBtnType || ctx.attrs.hbbtntype
    ];
    return {
      elBtnType,
      elBtnCcss,
      elBtnText,
      handleClick
    };
  }
};
</script>

<style lang="scss" scoped>
i {
  font-size: 14px;
}
</style>
