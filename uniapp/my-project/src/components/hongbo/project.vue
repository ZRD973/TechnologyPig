<template>
    <view class="userpeople_view" >
        <view class="uni-form-item uni-column from_line_view nowviewbody">
            <view class="from_view2">
                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        所属部门
                    </view>
                    <view class="from_right">
                        <picker @change="bindPickerChangedept" :value="from.indexdept" name="dept" range-key="value"  :range="from.arraydept">
                            <view class="uni-input from_input from_input_before" v-if="from.indexdept==''" >请选择</view>
                            <view class="uni-input from_input" v-else >{{reversedMessagedept}}</view>
                        </picker>
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        项目名称
                    </view>
                    <view class="from_right">
                        <input class="uni-input from_input" name="Name" v-model="from.Name"  placeholder="模糊检索" />
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        业主单位
                    </view>
                    <view class="from_right">
                        <input class="uni-input from_input" name="OrgCap" v-model="from.OrgCap"  placeholder="模糊检索" />
                    </view>
                </view>
                <view class="uni-form-item uni-column nowbutton ">
                    <view class="userpeople_search" @click="searchdata">
                        <image class="search_img" style="width: 20px;height: 20px;position: relative;top: 5px;left: -5px" :src="searchImg"></image>查询
                    </view>
                </view>
            </view>

        </view>
        <!--表格-->
        <view class="view_table">
            <!--:is-check="true"    表格前面的 checkbox-->
            <t-table border="2" border-color="#ffffff"  @change="change" class="table_table">
                <view class="table_head">
                    <t-tr font-size="14"  style="line-height: 30px;background:#E7F3F1 ;" color="#95b99e" align="left">
                        <t-th align="center">序号</t-th>
                        <t-th align="center">合同编号</t-th>
                        <t-th align="center">项目名称</t-th>
                        <t-th align="center">操作</t-th>
                    </t-tr>
                </view>
                <view class="table_body">
                    <t-tr font-size="12" color="#5d6f61" align="right" v-for="(item, index) in from.tabledata" :key="index">
                        <t-td align="center" >{{ index+1 }}</t-td>
                        <t-td align="center" >{{ item.PactCode }}</t-td>
                        <t-td align="center" >{{ item.gcmc }}</t-td>
                        <t-td align="center" ><view class="table_edit" @click="sure(item)">确定</view></t-td>
                    </t-tr>
                </view>
            </t-table>
            <!--分页-->
            <view class="example-body">
                <uni-pagination :show-icon="true" :total="from.total" @change="page" :page-size="from.pagesize" />
            </view>
        </view>

    </view>
</template>

<script>
    import {mapGetters} from 'vuex';
    import helper from "../../lib/helper";
    import tTable from '../../components/t-table/t-table.vue';
    import tTh from '../../components/t-table/t-th.vue';
    import tTr from '../../components/t-table/t-tr.vue';
    import tTd from '../../components/t-table/t-td.vue';
    import uniPagination from '../../components/uni-pagination/uni-pagination.vue'
    import _ from 'lodash';
    export default {
        components: {
            tTable,tTh,tTr,tTd,
            uniPagination
        },
        data(){
            return {
                searchImg: '../../static/table/search.png',
                popupdata:{
                    data:'',
                },
                from:{
                    indexdept: '',
                    arraydept: [],
                    Name:'',
                    OrgCap:'',
                    total:0,
                    pagesize:8,
                    pageindex:1,
                    tabledata: []
                },

            }
        },
        props: {
            userpopupopen: {

            },
        },
        computed: {
            reversedMessagedept(){
                return _.get(this.from.arraydept,`[${this.from.indexdept}].value`)
            },
        },
        methods:{
            ...mapGetters(['deptList']),
            //部门select
            deptdata(){
                this.popupdata.data = this.deptList() //  部门选择
                this.from.arraydept = helper.ArrReduce(this.popupdata.data,"ID","Caption",true);//学习形式

            },
            bindPickerChangedept(e) {
                this.from.indexdept = e.target.value
            },
            change(e) {
                this.from.pageindex = e.current;
            },
            sure(item) {
                this.$emit("childataToresid",item)
            },
            page(e){
                this.from.pageindex = e.current;
                this.searchdata()
            },
            async searchdata(){
                const [err, data] = await helper.req({
                    uri: '/PageQuery',
                    data: {
                        path: 'hr/managelist/mobile/MainPactList.txt',
                        pageindex:this.from.pageindex,
                        pagesize:this.from.pagesize,
                        pageorder:'gcbid desc',
                        IDList:'',
                        dept: this.from.indexdept == '' ? "":this.from.arraydept[this.from.indexdept].lable,
                        Name: this.from.Name||'',
                        OrgCap:this.from.OrgCap||'',
                    }
                })
                const resultdata = [err,data];
                let reldata = resultdata[1];
                if(!reldata){

                }else{
                    this.from.total = reldata.totalCount;
                    this.from.tabledata = reldata.pageTable;
                }
            },
        },
        mounted(){
            this.deptdata();
            this.searchdata();
        }
    }
</script>

<style scoped>
    .nowviewbody{
        width: 90%;
        margin: auto;
    }
    .table_edit{
        width: 80upx;height: 40upx;
        text-align: center;
        line-height:40upx;
        font-size: 24upx;
        color: white;background: #00B5AA;border-radius: 5px 5px;
    }
    .nowbutton{
        position: relative;
    }
</style>