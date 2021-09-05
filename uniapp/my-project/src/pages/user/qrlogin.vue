

<template>
    <view v-if="fullLogin">
        <view class="status_bar">
            <!-- 这里是状态栏 -->
        </view>
        <view class="text" style="margin-top: 10%">
            <image src="https://shhb.group/promanage/web/images/qrlogin.png" alt="" mode="widthFix"></image>
        </view>
        <view class="text">
            <text style="font-size:16pt;color:#4A4A4A;font-weight:bold;">{{ setter.fullName }}</text>
        </view>
        <view class="text">
            <text style="font-size: 14pt;color: rgba(0,0,0,0.5)">{{ setter.shortName }}</text>
        </view>
        <view style="margin-top: 10%">
            <view>
                <button class="mini-btn" type="primary" @click="login" :loading="loading">确认登录</button>
                <button @click="close" class="mini-btn close">取消</button>
            </view>
        </view>
        <!--<uni-popup ref="popup" :type="popup"><view class="popup"><icon :type="icon"></icon><text class="popup-content">{{ content }}</text></view></uni-popup>-->

    </view>
</template>

<script>
    import helper from '../../lib/helper';
    import { mapState ,mapGetters } from 'vuex';
    // import uniPopup from '../components/uni-popup/uni-popup.vue'

    export default {
        components:{
            // uniPopup
        },
        data(){
            return {
                key:null,
                loading:false,
            }
        },
        computed:{
            ...mapState(['code','scene']),
            ...mapGetters(['setter','fullLogin'])
        },
        async onLoad(params){
            await this.$ready();
            console.log('qrlogin.onLoad:',params);
            this.key = params.key || this.scene;
        },
        methods: {

            close:helper.close,
            login:async function(ev) {
                const vue = this;
                vue.loading = true;

                const {key,code} = vue;

                const [err,res] = await helper.req({
                    url:vue.setter.apiUrl.Api + '/GetUserInfoByWxQrCode',
                    data:{key,code, appid2: vue.setter.appid}
                });

                if(err){
                    uni.showModal({
                        title:'登录失败',
                        content:err.msg||err.errmsg||JSON.stringify(err),
                        showCancel:false
                    });
                    vue.loading = false;
                    return false;
                }

                uni.showToast({
                    title:'登录成功',
                    icon:'success',
                    complete(){
                        vue.loading = false;
                        vue.close();
                    }
                });


            }
        }
    }
</script>

<style scoped>

    .status_bar {
        height: var(--status-bar-height);
        width: 100%;
    }

    page{
        padding: 30rpx;
    }

    button {
        margin-top: 20rpx;
        margin-bottom: 10rpx;
    }

    .text{
        text-align: center;
    }

    .text image{
        width: 60%;
    }

    .mini-btn {
        width: 80%;
    }

    .close{
        border: none;
    }

    // #ifdef H5

       .close::after{
           border: none;
       }

    // #endif
</style>
