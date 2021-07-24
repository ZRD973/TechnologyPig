<template>
  <div class="tab-control">
    <div
      class="tab-control-item"
      :class="{ active: currentIndex === index }"
      v-for="(title, index) in titles"
      :key="title"
      @click="tabClick(index)"
    >
      <span>{{ title }}</span>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  setup(props, ctx) {
    const currentIndex = ref(0);
    const tabClick = (index) => {
      currentIndex.value = index;
      ctx.emit("titleClick", index);
    };
    return {
      currentIndex,
      tabClick,
    };
  },
};
</script>

<style lang="scss" scoped>
.tab-control {
  display: flex;
}
.tab-control-item {
  flex: 1;
  text-align: center;
}
.tab-control-item.active {
  color: red;
}
.tab-control-item.active span {
  border-bottom: 3px solid red;
  padding: 5px 10px;
}
</style>