<template name="WorkExperience" >
    <scroll-view  scroll-y class="popupbody expend_bottom" >
        <view class="popup_title_view" >
            <text class="popup_title">工作履历</text>
            <span @click="close" class="popup_close">X</span>
        </view>
        <view class="from_view">
            <form @submit="formSubmit" @reset="formReset">

                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        行业类型
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <picker @change="bindPickerChangehylx" :value="from.indexhylx" name="hylx" range-key="value"  :range="from.arrayhylx">
                            <view class="uni-input from_input from_input_before" v-if="from.indexhylx==''" >请选择</view>
                            <view class="uni-input from_input" v-else >{{reversedMessagehylx}}</view>
                        </picker>
                    </view>
                </view>

                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        工作单位
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <input class="uni-input from_input" name="gzdw" v-model="from.gzdw" placeholder="工作单位" />
                    </view>
                </view>

                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        入职时间
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <picker mode="date" :value="from.qssj" :start="startDate" name="qssj" :end="endDate" @change="bindDateChange1">
                            <!--<view class="uni-input from_input">{{ccslsj}}</view>-->
                            <view class="uni-input from_input from_input_before" v-if="from.qssj==''" >入职时间</view>
                            <view class="uni-input from_input" v-else >{{from.qssj}}</view>
                        </picker>
                    </view>
                </view>

                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        离职时间
                    </view>
                    <view class="from_right">
                        <picker mode="date" :value="from.jssj" :start="startDate" name="jssj" :end="endDate" @change="bindDateChange2">
                            <!--<view class="uni-input from_input">{{ccslsj}}</view>-->
                            <view class="uni-input from_input from_input_before" v-if="from.jssj==''" >离职时间</view>
                            <view class="uni-input from_input" v-else >{{from.jssj}}</view>
                        </picker>
                    </view>
                </view>

                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        职称类别
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <picker @change="bindPickerChangezc" :value="from.indexzc" name="zc" range-key="value"  :range="from.arrayzc">
                            <view class="uni-input from_input from_input_before" v-if="from.indexzc==''" >请选择</view>
                            <view class="uni-input from_input" v-else >{{reversedMessagezc}}</view>
                        </picker>
                    </view>
                </view>

                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        职务
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <input class="uni-input from_input" name="zw" v-model="from.zw" placeholder="职务" />
                    </view>
                </view>

                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        证明人
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <input class="uni-input from_input" name="zmr" v-model="from.zmr" placeholder="证明人" />
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        证明人手机
                    </view>
                    <view class="from_right">
                        <input class="uni-input from_input" name="zmrdh" v-model="from.zmrdh" placeholder="证明人手机" />
                    </view>
                </view>

                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        描述
                    </view>
                    <view class="from_right from_view_textarea" style="">
                        <textarea  class="uni-input from_input from_textarea"  type="text" name="Describe" v-model="from.Describe" placeholder="描述" ></textarea>
                    </view>
                </view>

                <view class="uni-btn-v uni-btn-my" >
                    <view class="from_buttom_inline">
                        <button form-type="submit" class="from_submit">保存</button>
                        <button type="default" form-type="reset" class="from_reset">取消</button>
                    </view>

                </view>
            </form>
        </view>
    </scroll-view>
</template>

<script>
    import helper from "../../lib/helper";
    import formHelper from '../../lib/formHelper';
    import _ from 'lodash';
    export default {
        data() {
            const currentDate = this.getDate({
                format: true
            })
            return {
                date: currentDate,
                from:{
                    gzllID:'',
                    gzdw:'',
                    qssj:'',
                    jssj:'',
                    indexzc:'',
                    arrayzc:[],
                    indexhylx:'',
                    arrayhylx:[],
                    zw:'',
                    zmr:'',
                    zmrdh:'',
                    Describe:'',
                },
                verify:{
                    indexhylx:[{type:'notEmptyAndZero',message:'选择行业类型',}],
                    gzdw:[{type:'required',message:'请输入工作单位'}],
                    qssj:[{type:'required',message:'请选择入职时间'}],
                    indexzc:[{type:'notEmptyAndZero',message:'请选择职称类别'}],
                    zw:[{type:'required',message:'请输入职务'}],
                    zmr:[{type:'required',message:'请输入证明人'}],
                },
            }
        },
        props: {
            ygbh: {
                type: String,//属性类型
                value:''
            },
            allData: {

            },
            openid:{

            },
            FolderID:{

            },
        },
        inject: ['popup'],
        computed: {
            startDate() {
                return this.getDate('start');
            },
            endDate() {
                return this.getDate('end');
            },
            reversedMessagezc(){
                if(!this.from.indexzc){
                    this.from.indexzc = 0;
                }
                return _.get(this.from.arrayzc,`[${this.from.indexzc}].value`)
            },
            reversedMessagehylx(){
                if(!this.from.indexhylx){
                    this.from.indexhylx = 0;
                }
                return _.get(this.from.arrayhylx,`[${this.from.indexhylx}].value`)
            },
        },
        methods: {
            // 父组件传过来的数据处理
            loaddata(){
                let relldata = this.allData;
                this.from.arrayzc = helper.ArrReduce(relldata[7],"F_Key","Caption",true);//职称类别
                this.from.arrayhylx = helper.ArrReduce(relldata[75],"F_Key","Caption",true);//行业类型

                let ID = this.openid;
                let _this = this
                if(!ID){   //新增
                }else{    //详情
                    relldata[30].forEach(function (value,index) {
                        let lsh = value.lsh

                        if(lsh==ID){
                            _this.from.gzdw = value.gzdw;
                            _this.from.qssj = value.qssj;
                            if(value.jssj=="1900-01-01"){
                                _this.from.jssj = '';
                            }else{
                                _this.from.jssj = value.jssj;
                            }

                            _this.from.zw = value.zw;
                            _this.from.zmr = value.zmr;
                            _this.from.Describe = value.Describe;
                            _this.from.gzllID = ID;
                            _this.from.zmrdh = value.zmrdh;
                            _this.from.indexzc = helper.indexforeach(_this.from.arrayzc,value.zc,"lable")
                            _this.from.indexhylx = helper.indexforeach(_this.from.arrayhylx,value.hylx,"lable")
                        }
                    });

                }

            },
            close(){
                // 执行父组件的close事件，关闭弹出层
                this.popup.close()
                this.popFlag = false
                this.$emit('closePopup',this.popFlag)
            },
            changeType:function(type){
                this.$emit("pChangeType")
            },
            bindPickerChangezc(e) {
                this.from.indexzc = e.target.value
            },
            bindPickerChangehylx(e) {
                this.from.indexhylx = e.target.value
            },

            //入职，离职，时间
            bindDateChange1: function(e) {
                this.from.qssj = e.target.value
            },
            bindDateChange2: function(e) {
                this.from.jssj = e.target.value
            },
            getDate(type) {
                const date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();

                if (type === 'start') {
                    year = year - 60;
                } else if (type === 'end') {
                    year = year + 2;
                }
                month = month > 9 ? month : '0' + month;;
                day = day > 9 ? day : '0' + day;
                return `${year}-${month}-${day}`;
            },
            async formSubmit(e) {
                // console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
                const [fail] = await formHelper.checkfrom(this.verify,this.from);
                await formHelper.checkDate(this.from.qssj,this.from.jssj,"离职时间不能早于入职时间")

                if(fail){

                }else{
                    const [err, data] = await helper.reqV4({
                        uri: '/Execute',
                        data: {
                            path: 'hr/managelist/mobile/addwork.txt',
                            manageID: this.ygbh,
                            gzllID: this.from.gzllID,
                            gzdw: this.from.gzdw,
                            qssj: this.from.qssj,
                            jssj: this.from.jssj,
                            zc:this.from.indexzc == '' ? null:this.from.arrayzc[this.from.indexzc].lable,
                            hylx:this.from.indexhylx == '' ? null:this.from.arrayhylx[this.from.indexhylx].lable,
                            zw: this.from.zw,
                            zmr: this.from.zmr,
                            zmrdh: this.from.zmrdh,
                            Describe: this.from.Describe,
                        }
                    })
                    const resultdata = [err,data];
                    this.$emit("childataToresid","")
                    this.close()
                }

            },
            formReset: function(e) {
                // console.log('清空数据')
                this.close()
            }
        },
        mounted() {
            this.loaddata();
        }

    }
</script>

<style scoped>

</style>