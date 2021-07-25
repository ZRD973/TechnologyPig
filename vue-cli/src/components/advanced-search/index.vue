<template>
  <div>
    <el-row class="frame flex a-c">
      <el-col :span="24">
        <label class="input-text" :style="{ width: labelWidth }">内容</label>
        <el-input clearable v-model="inputValue" :placeholder="placeholder" :style="{ width: inputWidth, marginRight: '15px' }"></el-input>
        <hb-el-button v-if="isShowSearch" hbBtnType="search" @click="searchBtn"></hb-el-button>
        <hb-el-button v-if="isShowFilter" @click="toggleFilter" hbBtnType="more" type="default" :text="is_ShowFilter ?'更多':'收起'"></hb-el-button>
        <hb-el-button v-show="isShowResetBtn" @click="resetBtn" hbBtnType="reset"></hb-el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import HbElButton from "../hb-comp/button";
import { computed, ref, watch } from "vue";
import useToggle from "../../hooks/useToggle";
export default {
  name: "AdvancedSearch",
  components: { HbElButton },
  props: {
    placeholder: {
      type: String,
      default: "请输入搜索内容"
    },
    inputWidth: {
      type: String,
      default: "400px"
    },
    labelWidth: {
      type: String,
      default: "100px"
    },
    isShowSearch: {
      type: Boolean,
      default: true
    },
    isShowFilter: {
      type: Boolean,
      default: true
    },
    isShowReset: {
      type: Boolean,
      default: true
    },
    haveValue: {
      type: Boolean,
      default: false
    }
  },
  /**
   * 查询、重置、筛选
   * 点击筛选时，出现查询条件，筛选按钮文字变成收起
   * 只要有筛选条件时，重置出现，没有筛选条件时，重置按钮不出现
   */
  setup(props, ctx) {
    const inputValue = ref("");
    // 搜索
    const searchBtn = () => {
      is_ShowFilter.value = true;
      ctx.emit("searchBtn", inputValue.value);
    };

    // 筛选按钮
    const [is_ShowFilter, { toggle }] = useToggle(props.isShowFilter);
    const toggleFilter = () => {
      toggle();
      ctx.emit("toggleFilter");
    };

    /**
     * 重置按钮
     */
    const resetBtn = () => {
      inputValue.value = "";
      ctx.emit("resetBtn");
    };

    const isShowResetBtn = computed(() => {
      if (!props.isShowReset) {
        return false;
      } else {
        return inputValue.value !== "" || props.haveValue;
      }
    });
    return {
      inputValue,
      searchBtn,
      resetBtn,
      isShowResetBtn,
      is_ShowFilter,
      toggleFilter
    };
  }
};
</script>
<style lang="scss" scoped>
.frame {
  margin-bottom: 15px;
}

.input-text {
  width: 100px;
  height: 40px;
  color: #606266;
  display: inline-block;
  font-family: Helvetica Neue;
  font-size: 14px;
  line-height: 40px;
  padding: 0px 12px 0px 0px;
  text-align: right;
  box-sizing: border-box;
}
</style>