<template>
<div>
  <h1>孙子组件</h1>
  <h1>{{content}}</h1>

</div>
</template>

<script>
import PubSub from '@/utils/pubsub.js'
export default {
  data() {
    return {
      content: ''
    }
  },
  mounted() {
    let that = this
    PubSub.listen('color', function (data) {
      that.content = data
    })
  },

}
</script>

<style>
</style>
