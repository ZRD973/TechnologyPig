<template>
  <div id="nav">
    <icon-tip content="哈哈哈，真厉害"></icon-tip>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>|
    <router-link to="/mybutton">MyButton</router-link>|
    <router-link to="/tab">Tab</router-link>|
    <router-link to="/advanced">Advanced</router-link>|
  </div>
  <router-view/>
</template>
<script>
import IconTip from './components/NoState/icon-tip.vue'
export default {
  components: { IconTip },
  
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
