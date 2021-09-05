<template>
    <view v-if="baseLogin">
        <view class="weixin-info">
            <view class="head-info">
                <image :src="userInfo.headimgurl" mode="aspectFit"></image>

                <view v-if="true" class="boy">
                    <fa-icon type="fa-mars" :size="28"></fa-icon>
                </view>

                <view v-else-if="userInfo.sex == 2" class="girl">
                    <fa-icon type="fa-venus" :size="28"></fa-icon>
                </view>

                <view v-else></view>

            </view>
            <text class="nick-name">{{ userInfo.nickname }}</text>
            <text class="description">{{ userInfo.province }}{{ userInfo.province && userInfo.city && ' • ' || ''}}{{ userInfo.city }}</text>
        </view>

        <view class="bind-info" v-if="false">
            <view class="user-info">
                <view class="flex-item">
                    <image class="head-img" :src="headImg" mode="aspectFit"></image>
                    <!--<image class="head-img" :src="userInfo.headimgurl"></image>-->
                </view>
                <view class="detail-info flex-item">
                    <view>
                        <text class="bind-name" style="margin-right: 10rpx;">{{ userInfo.Name }}</text><fa-icon type="fa-circle"></fa-icon> <text  style="margin-left: 10rpx;">{{ userInfo.DeptCap }}</text>

                    </view>
                    <view>
                        <text class="bind-mobile">{{ userInfo.Mobile }}</text>
                    </view>

                </view>
                <view class="flex-item" >
                    <text class="green pull-right">已绑账号</text>
                </view>
            </view>
        </view>
        <view v-else>
            <view class="site-tips site-text" style="margin-bottom: 0;">
                <text style="display: block; text-align: center; font-weight: bold; color: #01aaed; line-height: 2em;">根据《中华人民共和国网络安全法》对账号实名制的要求，请输入你的真实姓名和身份证号</text>
            </view>

            <form @submit="bind">
                <view class="bind-info" style="margin-top: 0;">
                    <view>
                        <view class="line">
                            <view class="icon"><fa-icon type="fa-user" :size="40"></fa-icon></view>
                            <view class="item">
                                <text class="label">尊姓大名</text>
                                <view class="block">
                                    <input v-model="form.userName" maxlength="4" confirm-type="next" placeholder="一定要确保是本人哦" />
                                </view>
                            </view>
                        </view>
                        <view class="line">
                            <view class="icon"><fa-icon type="fa-credit-card" :size="36"></fa-icon></view>
                            <view class="item">
                                <text class="label">身份证号</text>
                                <view class="block">
                                    <input type="idcard" v-model="form.idNumber" maxlength="18" placeholder="看看是不是俺们的人" />
                                </view>
                            </view>
                        </view>
                        <view class="line">
                            <view class="icon"><fa-icon type="fa-mobile-phone" :size="50"></fa-icon></view>
                            <view class="item">
                                <text class="label">手机号码</text>
                                <view class="block">
                                    <input type="number" v-model="form.phoneNumber" maxlength="11" placeholder="项目管控注册手机号码"/>
                                </view>
                            </view>
                        </view>
                        <view class="line">
                            <view class="icon"><fa-icon type="fa-lock" :size="40"></fa-icon></view>
                            <view class="item">
                                <text class="label">登录密码</text>
                                <view class="block">
                                    <input :password="true" v-model="form.passWord"  maxlength="16" confirm-type="done" placeholder="项目管控平台登录密码" />
                                </view>
                            </view>
                        </view>
                    </view>
                </view>

                <button class="mini-btn" form-type="submit" type="primary" :loading="loading" >确认并绑定</button>

                <!--<button href="javascript:;" class="check-btn green" lay-submit="" lay-filter="LAY-user-reg-submit"><i class="fa fa-check"></i> 确认并绑定</button>-->

            </form>
        </view>
    </view>
</template>

<script>

    import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
    import helper from '../../lib/helper'
    import form from '../../lib/formHelper'
    import FaIcon from '../../components/faicon/Icon.vue'

    export default {
        components:{
            FaIcon
        },
        data:vue=>{
            return {
                loading:false,
                form:{
                    userName:'',
                    idNumber:'',
                    phoneNumber:'',
                    passWord:''
                },
                verify:{
                    userName:'username',
                    idNumber:'identity',
                    phoneNumber:'phone',
                    passWord:'password'
                }
            }
        },
        computed:{
            ...mapState(['userInfo','redirectUrl']),
            ...mapGetters(['setter','fullLogin','baseLogin']),
            headImg:vue => {
                return vue.setter.apiUrl.XMGKFileApi + '/2017328161953642/' +  vue.userInfo.Picture + '_60.jpg';
            }
        },

        async onLoad(params){
          await this.$ready();
            // this.key = params.key;
        },
        methods:{
            ...mapMutations(['setCode','setUserInfo']),
            ...mapActions(['setToken']),
            close:helper.close,
            bind:async function(ev){
                // console.log(ev);
                const vue = this,{} = this;
                vue.loading = true;

                const [fail] = await form.check(vue.verify,vue.form);

                vue.loading = false;

                if(fail){

                    // uni.showModal({
                    //     title:'温馨提示',
                    //     content:res[1],
                    //     showCancel:false,
                    //     complete:() => {
                    //         vue.loading = false;
                    //     }
                    // });
                    vue.loading = false;
                    return false;
                }

                const {openid,unionid} = vue.userInfo;


                const [err,res] = await helper.req({
                    uri: '/GetUserInfoByReg',
                    data:{
                        ...vue.form,
                        openid,
                        unionid
                    }
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

                const {access_token} = res,{userInfo,code} = res.data;

                if(userInfo.State === 0){
                    uni.showModal({
                        title:'结果',
                        content:'绑定成功！但账号已禁用，请联系单位管理员！',
                        showCancel:false,
                        complete(){
                            vue.close();
                        }
                    });
                    vue.loading = false;
                    return null;
                }

                vue.setCode(code);

                vue.setUserInfo(userInfo);

                await vue.setToken(access_token);

                uni.showModal({
                    title:'绑定结果',
                    content:'绑定成功！',
                    showCancel:false,
                    async complete(){
                        console.log('uni.redirectTo:',vue.redirectUrl);
                        await helper.redirectTo({
                            url: '/'+vue.redirectUrl
                        });
                    }
                });
                vue.loading = false;

                return null;
            }
        }
    }
</script>

<style scoped>
    page {
        background: #eee;
    }

    page input {
        text-align: center;
    }
    .weixin-info {
        background: #0094ff;
        height: 200px;
        color: #fff;
    }
    .head-info {
        margin: 0 auto -10px;
        padding-top: 50px;
        display: block;
        width: 80px;
    }
    .head-info image {
        border-radius: 50%;
        display: block;
        margin: 0 auto;
        height: 80px;
        width: 80px;
    }
    .head-info view {
        display: inline-block;
        position: relative;
        border-radius: 50%;
        bottom: 20px;
        height: 20px;
        width: 20px;
        left: 55px;
    }
    .head-info view.boy {
        display: flex;
        align-items: center;
        justify-content:center;
        background: #00ffff;
    }
    .head-info view.girl {
        display: flex;
        align-items: center;
        justify-content:center;
        background: #ff5ffc;
    }
    /*.head-info view .icon {*/
        /*text-align: center;*/
        /*font-weight: bold;*/
        /*line-height: 23px;*/
        /*font-size: 14px;*/
        /*display: block;*/
    /*}*/
    .nick-name {
        text-align: center;
        font-weight: bold;
        display: block;
    }
    .description {
        text-align: center;
        padding-top: 5px;
        display: block;
    }
    .bind-info {
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
        border-top: 1px solid #e5e5e5;
        margin: 10px auto;
        background: #fff;
    }
    .user-info {
        padding: 15px 10px;
        display: flex;
        flex-direction: row;
    }
    .head-img {
        padding-left: 3px;
        width: 64px;
        height: 64px;
    }
    .detail-info {
        flex:1;
        flex-direction: column;
    }

    .text-success{
        margin: 0 10rpx;
    }

    .flex-item{
        display: flex;
        align-content: center;
        align-items: center;
    }

    .bind-name {
        font-weight: bold;
        font-size: 16px;
    }
    .bind-mobile {
        text-align: left;
        font-size: 16px;
        display: block;
    }
    .green {
        border-radius: .25em;
        background: #00caca;
        padding: .3em .6em;
        line-height: 14px;
        font-weight: bold;
        font-size: 100%;
        color: #fff;
    }

    .link-block{
        margin: 10px auto;
        display: block;
        width: 96%;
    }
    .line {
        height: 80rpx;
        width: 100%;
        line-height: 80rpx;
    }
    .line .icon {
        text-align: center;
        float: left;
        width: 14%;
    }
    /*.line .icon i {*/
        /*line-height: 37px;*/
    /*}*/
    .line .item {
        border-bottom: 2rpx solid #e5e5e5;
        /* display: inline-block; */
        margin-left: 17%;
        padding: 6rpx 0 6rpx 0;
        clear: none;
        width: 80%;
        height: 68rpx;
    }
    .line:last-child .item {
        border-bottom: none;
        /* padding: 10px 0; */
    }
    .label {
        width: 160rpx;
        float: left;
        line-height: 68rpx;
    }
    .block {
        margin: 0 0 0 95px;
        padding-right: 7%;
        min-height: 34px;
    }

    .block input {
        height: 34px;
        line-height: 34px;
    }

    .mini-btn {
        width: 80%;
    }

</style>
