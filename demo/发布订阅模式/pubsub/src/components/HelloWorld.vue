<template>
<div class="hello">
  <input type="text" v-model="name" />

  <button @click="doPub">跨组件传值</button>
  <Son />
</div>
</template>

<script>
import PubSub from '@/utils/pubsub.js'
import Son from './Son'
export default {
  name: 'HelloWorld',
  components: {
    Son
  },
  props: {
    msg: String
  },
  data() {
    return {
      name: ''
    }
  },
  methods: {
    doPub() {
      // PubSub
      PubSub.trigger("color", this.name);
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
