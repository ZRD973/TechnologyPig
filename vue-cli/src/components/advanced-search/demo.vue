<template>
 <div>

      <advanced-search
        placeholder="请输入员工或专业"
        label-width="100px"
        input-width="400px"
        :have-value="!isEqual"
        @searchBtn="searchBtn"
        @toggleFilter="myToggleFilter"
        @resetBtn="resetBtn">
      </advanced-search>

      <div v-show="Visible">我是内容啊</div>

    </div>


</template>
<script>

import {reactive,ref, watch} from "vue";
import useButtonGroup from "./useButtonGroup";
import AdvancedSearch from "./index";
export default {
  components: {
    AdvancedSearch
  },
  setup(props, ctx) {

    const Visible = ref(false)
    const myToggleFilter = () =>{
      console.log("更多");

      Visible.value = !Visible.value
    }
    const buttonGroupHook=useButtonGroup({
      onSearch:(data)=>{
        console.log("搜索");

      },
      // form,
      onResetBtn:()=>{
        console.log("重置");
      }
    })
    return {
      ...buttonGroupHook,
      Visible,
      myToggleFilter
    };
  },
};
</script>
