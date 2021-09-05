<template>
    <view class="content">
        <view>
            <zzx-tabs :items="items" :current="current" @clickItem="onClickItem" ref="mytabs" lineWidth="100%" >
            </zzx-tabs>
        </view>
        <view class="tabs-nav" >
            <view v-show="current === 0">
                <view class="" v-for="(item,index) in department" :key="index" >
                    <view v-if="(item.dept).length>0">
                        <view class="tabs_kuai" >
                            <span class="company_title" style="">{{item.Caption}}</span>
                            <radio-group @change="radioChange">
                                <view class="overflow-hidden" v-for="(childitem,childindex) in item.dept" :key="childitem.ID">
                                    <view v-if="(childitem.children).length>0" class="overflow-hidden childitem_nav">
                                        <label class="radio">
                                            <radio :checked="reldepartmentID == childitem.ID?true:false" :value="numberTostring(childitem.ID)+','+childitem.Caption"  class="myself_radius" name="yt" color="#19D553"  />
                                            <span class="department_title" >{{childitem.Caption}}</span>
                                        </label>
                                        <label class="radio" v-for="(childchilditem,childchildindex) in childitem.children" :key="childchilditem.ID" >
                                            <radio :checked="reldepartmentID == childchilditem.ID?true:false" :value="numberTostring(childchilditem.ID)+','+childchilditem.Caption"  class="myself_radius" name="yt" color="#19D553"  />
                                            {{childchilditem.Caption}}
                                        </label>
                                    </view>
                                    <view v-else >
                                        <label class="radio">
                                            <radio :checked="reldepartmentID == childitem.ID?true:false" :value="numberTostring(childitem.ID)+','+childitem.Caption" class="myself_radius" name="yt" color="#19D553"  />
                                            <span class="department_title" >{{childitem.Caption}}</span>
                                        </label>
                                    </view>
                                </view>
                            </radio-group>
                        </view>
                    </view>

                </view>
            </view>
            <view v-show="current === 1">
                <view class="" v-for="(item,index) in department2" :key="index" >
                    <view v-if="(item.dept).length>0">
                        <view class="tabs_kuai" >
                            <span class="company_title" style="">{{item.Caption}}</span>
                            <radio-group @change="radioChange">
                                <view class="overflow-hidden" v-for="(childitem,childindex) in item.dept" :key="childitem.ID" >
                                    <view v-if="(childitem.children).length>0" class="overflow-hidden childitem_nav">
                                        <label class="radio">
                                            <radio :checked="reldepartmentID == childitem.ID?true:false" :value="numberTostring(childitem.ID)+','+childitem.Caption"  class="myself_radius" name="yt" color="#19D553"  />
                                            <span class="department_title" >{{childitem.Caption}}</span>
                                        </label>
                                        <label class="radio" v-for="(childchilditem,childchildindex) in childitem.children" :key="childchilditem.ID"  >
                                            <radio :checked="reldepartmentID == childchilditem.ID?true:false"  :value="numberTostring(childchilditem.ID)+','+childchilditem.Caption"  class="myself_radius" name="yt" color="#19D553"  />
                                            {{childchilditem.Caption}}
                                        </label>
                                    </view>
                                    <view v-else >
                                        <label class="radio">
                                            <radio :checked="reldepartmentID == childitem.ID?true:false" :value="numberTostring(childitem.ID)+','+childitem.Caption" class="myself_radius" name="yt" color="#19D553"  />
                                            <span class="department_title" >{{childitem.Caption}}</span>
                                        </label>
                                    </view>
                                </view>
                            </radio-group>
                        </view>
                    </view>

                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import {mapGetters} from 'vuex';
    // import helper from "../../../lib/helper";
    import zzxTabs  from "../../components/zzx-tabs/zzx-tabs"
    export default {
        components: {
            zzxTabs
        },
        data() {
            return {
                items: ['按部门','按业务板块'],
                current: 0,
                department:[],
                departmentdata:'',
                department2:[],
                departmentdata2:'',
                reldepartmentID:'',

            }
        },
        props: {
            departmentID:{},
            departmentID2:{},
        },
        inject: ['popup'],
        computed: {

        },
        methods: {
            ...mapGetters(['orgTree','secTree']),
            //部门select
            deptdata(){
                const reldata = this.orgTree() //  部门选择
                const reldata2 = this.secTree()//板块列表

                this.department = reldata
                this.department2 = reldata2
            },
            //选择  哪个部门
            radioChange(e) {
                this.departmentdata = e.target.value;
                this.$emit("childataToresid",this.departmentdata)
            },
            load(){
                this.reldepartmentID = '';
                if(departmentID){   //  获奖部门
                    this.reldepartmentID = this.departmentID;
                }
                if(departmentID2){  //保管部门
                    this.reldepartmentID = this.departmentID2;
                }
            },
            onClickItem(e) {
                if (this.current !== e.currentIndex) {
                    this.current = e.currentIndex;
                }
            },
            setMydot() {
                this.$refs.mytabs.setDot(0)
            },
            removeMydot() {
                this.$refs.mytabs.removeDot(0);
            },
            // 数字转字符串
            numberTostring(val){
                return  String(val)
            }

        },
        mounted() {
            this.deptdata();
        }
    }
</script>

<style scoped>
    .content{
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }
.tabs-nav{
    width: 95%;
    margin: 0upx auto;
    height: 100%;
    overflow: auto;
    flex:1;
}
    .radio{
        width: 240upx;
        height: 50upx;
        line-height: 50upx;
        display: block;
        float: left;
    }
    .tabs_kuai{
        border: 1px solid #ddd;margin: 50upx auto;
    }
    .company_title{
        background: white;
        font-weight:600;font-size: 28upx;
        padding: 6upx 20upx;
        position: relative;
        top: -13px;
        left: 20px;
    }
    .department_title{
        font-weight:600;font-size: 28upx;
    }
    /*没有 子部门的时候 view */
    .childitem_nav{
        position: relative;
        padding: 10px 0px;
    }
    .childitem_nav::after{
        position: absolute;
        z-index: 3;
        right: 30upx;
        bottom: 0;
        left: 30upx;
        height: 3px;
        content: '';
        -webkit-transform: scaleY(.5);
        transform: scaleY(.5);
        background-color: #c8c7cc;
    }

</style>