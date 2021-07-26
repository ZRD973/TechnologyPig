<template>
  <div class="about">
    <div class="frame"> 
        This is an about page        
        <tooltip content="更多查询条件请点这里！"></tooltip>
    </div>
  </div>
</template>
<script>
import Tooltip from "../components/tooltip/index.vue";
export default {
  components: { Tooltip },
};
</script>
<style scoped>
.frame{
  position: relative;
  width: 200px;
  height: 200px;
  margin: auto;
}
</style>
