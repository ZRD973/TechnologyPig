<template>
  <div>
    <el-row class="frame flex a-c">
      <el-col :span="24">
        <label class="input-text" :style="{ width: labelWidth }">内容</label>
        <el-input v-if="isShowSearch" v-model.trim="inputValue" clearable :placeholder="placeholder" style="width:300px" class="search-input" :style="{ width: inputWidth, marginRight: '15px' }"></el-input>
        <el-button type="primary"  icon="el-icon-search" size="small"  @click="searchBtn">搜索</el-button>
        <div class="filter-box">
          <el-button
            v-if="isShowFilter"
            @click="toggleFilter"
            type="primary"
            :icon="_isShowFilter? 'el-icon-caret-bottom':'el-icon-caret-top'"
            size="small"
          >{{_isShowFilter ? '更多' : '收起'}}</el-button>

          <transition name="el-zoom-in-top" @before-enter="transitionComplete">
            <div v-if="tipVisible" class="el-popover">
              <div class="el-popover__title">
                小提示
                <span @click="closeTip" class="cancel">X</span>
              </div>
              <span>更多查询条件请点这里！</span>
              <div class="popper-arrow"></div>
            </div>
          </transition>
        </div>

        <el-button
          v-show="isShowResetBtn"
          @click="resetBtn"
          type="primary"
          icon="el-icon-refresh-left"
          size="small"
        >重置</el-button>
      </el-col>
      <div class="right_btn">
        <slot></slot>
      </div>
      
    </el-row>
  </div>
</template>
<script>
// import HbElButton from "../hb-comp/button";
import { computed, ref, watch,onMounted } from "vue";
import useToggle from "../../hooks/useToggle";
export default {
  name: "AdvancedSearch",
  // components: { HbElButton },
  props: {
    placeholder: {
      type: String,
      default: "请输入搜索内容",
    },
    content:{
        type:String,
    },
    inputWidth: {
      type: String,
      default: "400px",
    },
    labelWidth: {
      type: String,
      default: "100px",
    },
    isShowSearch: {
      type: Boolean,
      default: true,
    },
    isShowFilter: {
      type: Boolean,
      default: true,
    },
    isShowReset: {
      type: Boolean,
      default: true,
    },
    haveValue: {
      type: Boolean,
      default: false,
    },
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
      _isShowFilter.value = true;
      ctx.emit("searchBtn", inputValue.value);
    };

    // 筛选按钮
    const [_isShowFilter, { toggle }] = useToggle(props.isShowFilter);
    const toggleFilter = () => {
      
      closeTip();
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
    /**
     * 控制提示
     * tipVisible
     */
    const tipVisible = ref(false);
    const show = sessionStorage.getItem("tip");
    const transitionComplete = () => {
      if (!show) {
        setTimeout(() => {
          tipVisible.value = true;
        }, 800);
      }
    };
    // 关闭提示
    const closeTip = () => {
      sessionStorage.setItem("tip", tipVisible.value);
      tipVisible.value = false;
    };
    onMounted(() => {
      transitionComplete();
    });
    /**
     * 是否显示重置按钮
     */
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
      _isShowFilter,
      toggleFilter,
      tipVisible,
      closeTip,
      transitionComplete,
    };
  },
};
</script>
<style lang="scss" scoped>
.frame {
  margin-bottom: 15px;
  // margin-left: 100px;
}
// .search-input{
//     .el-input-group__append{
//         background-color:#409EFF;
//         border-color: #409EFF;
//         .el-icon-search{
//             color: #fff;
//         }
//     }
// }
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
.filter-box {
  display: inline-block;
  margin: 0 10px;
  position: relative;
}
.el-popover {
  margin: 0;
  border-radius: 4px;
  background: #1890ff;
  min-width: 150px;
  border: 1px solid #1890ff;
  color: white;
  line-height: 1.4;
  text-align: justify;
  font-size: 14px;
  word-break: break-all;
  padding: 18px 20px;
  margin-top: 12px;
  width: 160px;
  position: absolute;
  top: 45px;
  left: -65px;
  transform-origin: center top;
  height: 35px;
  box-shadow: 0 2px 12px 0;
}
.el-popover__title {
  color: white;
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
  font-size: 16px;
  text-align: center;
  cursor: pointer;
}
.transition-box {
  margin-bottom: 10px;
  width: 200px;
  height: 100px;
  border-radius: 4px;
  background-color: #409eff;
  text-align: center;
  color: #fff;
  padding: 40px 20px;
  box-sizing: border-box;
  margin-right: 20px;
}
.right_btn{
  position: absolute;
  right: 20px;
}
</style>