<template>
    <div class="tips">
        <div class="header">
            <div class="word">温馨提示</div>
        </div>
        <div class="content">
            <div class="word">请使用微信登录</div>
        </div>
    </div>
</template>

<script>
    import helper from "../../lib/helper";

    export default {
      name: 'login',
      data() {
        return {};
      },
      async onLoad(params) {
        await this.$ready();
        this.onLoad(params);
      },
      methods: {
        onLoad(params){

        }
      }
    }
</script>

<style scoped>
    .tips{
        display: flex;
        flex-direction: column;
        height: 100vh;
    }
    .header{
        text-align: center;
        font-size: 45px;
        height: 50px;
        flex: 1;
        display: flex;
        align-items: center;
    }
    .content{
        text-align: center;
        font-size: 50px;
        height: 150px;
        flex: 2;
    }
    .word{
        width: 100%;
    }
</style>
