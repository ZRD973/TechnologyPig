<!--
 * @Author: your name
 * @Date: 2020-12-28 15:56:33
 * @LastEditTime: 2021-03-17 16:42:23
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \HBMSApp\trunk\src\components\hongbo\honoraryname.vue
-->
<template>
    <view class="rymc-content">
        <view class="rymc-input-view" >
            <!--<input class="uni-input from_input" @input="inputChange" v-model="rymc" />-->
            <input class="uni-input from_input rymc-input" v-model="rymc"  />
            <image class="search_img rymc-search" :src="searchImg"></image>
        </view>
        <view class="rymc-list-view" >

        </view>

    </view>
</template>

<script>
    // import {mapGetters} from 'vuex';
    import helper from "../../lib/helper";
    export default {
        data(){
            return{
                searchImg: '../../static/table/search.png',
                rymc:'',
            }
        },
        props:{
            rylb : {
            },
            bfsj:{

            },
            goalID:{

            },
            dxlb:{

            },
        },
        inject:['popup'],
        computed:{

        },
        async onLoad(){
            await this.loadData();
        },
        methods:{

            inputChange(e){
                this.rymc =  e.detail.value;
                this.loadData();
            },

            async loadData(){
                const [err, data] = await helper.req({
                    uri: '/PageQuery',
                    data: {
                        path: 'hr/managelist/mobile/holist.txt',
                        pageindex:1,
                        pagesize:100,
                        pageorder:'lsh desc',
                        rylb:this.rylb,
                        rymc:this.rymc,
                        bfsj:this.bfsj,
                        goalID:this.goalID,
                        dxlb:this.dxlb,
                    }
                })
                console.log([err, data])
            },
        },
        mounted(){

        }

    }
</script>

<style scoped>
    .rymc-content{
        display: flex;width: 100%;height: 100%;flex-direction: column;overflow: hidden;
    }
    .rymc-input-view{
        width: 100%;height: 50px;
    }
    .rymc-input{
        width: 80%;margin: 10px auto;
    }
    .rymc-search{
        width: 27px;height: 27px;border-radius:0px 3px 3px 0px;position:absolute;top:10px;right:10%;background:#C3BEBE;
    }
    .rymc-list-view{
        width: 100%;height: 100%;flex: 1;overflow: auto;
    }
</style>