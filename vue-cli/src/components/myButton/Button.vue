<template>
  <div>
    <button :class="type" @click="click">
      <slot>按钮</slot>
    </button>
  </div>
</template>
<script>
export default {
  props: {
    type: String
  },
  methods: {
    click() {
      this.$emit("onclick");
    }
  }
};
</script>
<style>
.red {
  color: white;
  background: red;
  width: 100px;
  height: 50px;
  border-radius: 10px;
}
.green {
  color: white;
  background: green;
  width: 100px;
  height: 50px;
  border-radius: 10px;
}
.blue {
  color: white;
  background: blue;
  width: 100px;
  height: 50px;
  border-radius: 10px;
}
</style>