<!--
 * @Author: your name
 * @Date: 2021-03-25 16:10:24
 * @LastEditTime: 2021-03-25 20:39:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \HBMSApp\trunk\src\pagesA\account.vue
-->
<template>
<view class="evan-form-show">
        <evan-form ref="form" :model="form">
            <evan-form-item label="绑定手机：" prop="certCode">
                <input type="text" required disabled v-model="form.mobile" class="form-input" name="certificate" placeholder="请填写证书编号">
            </evan-form-item>
           <evan-form-item label="员工姓名：" prop="certCode">
                <input type="text" required disabled v-model="form.name" class="form-input" name="certificate" placeholder="请填写证书编号">
            </evan-form-item>
                <evan-form-item label="密码：" prop="certCode">
                <input type="text" required disabled v-model="form.password" class="form-input" name="certificate" placeholder="请填写证书编号">
            </evan-form-item>
        </evan-form>
        <!-- <button @click="save" class="evan-form-show__button">保存</button> -->
    </view>
</template>

<script>
// import helper from "../lib/helper";
// import store from "../store";

// import useAsync from "../hooks/useAsync";
import { ref, watch, reactive } from "@vue/composition-api";
import evanForm from "../../src/components/evan-form/evan-form";
export default {
  components:{evanForm},
  setup(props, ctx) {

    const form = reactive({
      name: "",
      mobile: "",
      password: "",
    });

    // const { data } = useAsync(
    //   () =>
    //     helper
    //       .req({
    //         uri: "/Execute",
    //         data: {
    //           path: "user/index.getUser",
    //           ygbh: store.state.userInfo.ygbh,
    //         },
    //       })
    //       .then(([, { data }]) => data),
    //   {
    //     onSuccess: (res) => {
    //       form.name = res[0].xm;
    //       form.mobile = res[0].mobile;
    //       form.password = res[0].password;
    //       ctx.root.$forceUpdate();
    //     },
    //     showLoading: true,
    //   }
    // );

//  const save=async()=>{
//     await helper.reqV3('user/index.updateUser',{
//     ...form,
//     ygbh: store.state.userInfo.ygbh,
//      })
//      setTimeout(()=>{
//      uni.navigateBack({ delta: 1 })
//      },500)
//  }

    return {
       form,
    // save
    };
  },
};
</script>

<style lang="scss" scoped>
.center-list {
  background-color: #ffffff;
  margin-top: 20upx;
  margin-right: 200rpx;
  width: 750upx;
  flex-direction: column;
}

.center-list-item {
  height: 90upx;
  width: 750upx;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  padding: 0upx 20upx;
  justify-content: space-between;
  align-items: center;
  .option-name {
    // font-weight: 500;
  }
  .content {
    margin-right: 20rpx;
    color: rgb(122, 122, 122);
  }
}
</style>