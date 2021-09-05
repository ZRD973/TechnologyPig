<template name="PartyMember" >
    <scroll-view  scroll-y class="popupbody"  >
        <view class="popup_title_view" >
            <text class="popup_title">政治面貌</text>
            <span @click="close" class="popup_close">X</span>
        </view>
        <view class="from_view">
            <form @submit="formSubmit" @reset="formReset">
                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        政治面貌
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <picker @change="bindPickerChangeStated" :value="from.indexStated" name="Stated" range-key="value"  :range="from.arrayStated">
                            <view class="uni-input from_input from_input_before" v-if="from.indexStated==''" >请选择</view>
                            <view class="uni-input from_input" v-else >{{reversedMessageStated}}</view>
                        </picker>
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view" v-if="isDYLB">
                    <view class="from_left">
                        党员类别
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <picker @change="bindPickerChangedylb" :value="from.indexdylb" name="dylb" range-key="value"  :range="from.arraydylb">
                            <view class="uni-input from_input from_input_before" v-if="from.indexdylb==''" >请选择</view>
                            <view class="uni-input from_input" v-else >{{reversedMessagedylb}}</view>
                        </picker>
                    </view>
                </view>
                <!--预备党员-->
                <view class="uni-form-item uni-column from_line_view" v-if="isDYYB">
                    <view class="from_left">
                        递交入党申请
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <picker mode="date" :value="from.djsqsrq" :start="startDate" name="djsqsrq" :end="endDate" @change="bindDateChange">
                            <view class="uni-input from_input from_input_before" v-if="from.djsqsrq==''" >递交入党申请时间</view>
                            <view class="uni-input from_input" v-else >{{from.djsqsrq}}</view>
                        </picker>
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view" v-if="isDYYB">
                    <view class="from_left">
                        入党日期
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <picker mode="date" :value="from.rdrq" :start="startDate" name="rdrq" :end="endDate" @change="bindDateChange2">
                            <view class="uni-input from_input from_input_before" v-if="from.rdrq==''" >入党日期</view>
                            <view class="uni-input from_input" v-else >{{from.rdrq}}</view>
                        </picker>
                    </view>
                </view>


<!--党员-->
                <view class="uni-form-item uni-column from_line_view" v-if="isDY">
                    <view class="from_left">
                        递交入党申请
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <picker mode="date" :value="from.djsqsrq" :start="startDate" name="djsqsrq" :end="endDate" @change="bindDateChange">
                            <view class="uni-input from_input from_input_before" v-if="from.djsqsrq==''" >递交入党申请时间</view>
                            <view class="uni-input from_input" v-else >{{from.djsqsrq}}</view>
                        </picker>
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view" v-if="isDY">
                    <view class="from_left">
                        入党日期
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <picker mode="date" :value="from.rdrq" :start="startDate" name="rdrq" :end="endDate" @change="bindDateChange2">
                            <view class="uni-input from_input from_input_before" v-if="from.rdrq==''" >入党日期</view>
                            <view class="uni-input from_input" v-else >{{from.rdrq}}</view>
                        </picker>
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view" v-if="isDY">
                    <view class="from_left">
                        批准转正日期
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <picker mode="date" :value="from.pzrq" :start="startDate" name="pzrq" :end="endDate" @change="bindDateChange3">
                            <view class="uni-input from_input from_input_before" v-if="from.pzrq==''" >批准转正日期</view>
                            <view class="uni-input from_input" v-else >{{from.pzrq}}</view>
                        </picker>
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view" v-if="isDY">
                    <view class="from_left">
                        所属党组织
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <picker @change="bindPickerChangessdzz" :value="from.indexssdzz" name="ssdzz" range-key="value"  :range="from.arrayssdzz">
                            <view class="uni-input from_input from_input_before" v-if="from.indexssdzz==''" >请选择</view>
                            <view class="uni-input from_input" v-else >{{reversedMessagessdzz}}</view>
                        </picker>
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view" v-if="isDY">
                    <view class="from_left">
                        所属支部
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <picker @change="bindPickerChangesszb" :value="from.indexsszb" name="sszb" range-key="value"  :range="from.arraysszb">
                            <view class="uni-input from_input from_input_before" v-if="from.indexsszb==''" >请选择</view>
                            <view class="uni-input from_input" v-else >{{reversedMessagesszb}}</view>
                        </picker>
                    </view>
                </view>

                <!--其他党派-->
                <view class="uni-form-item uni-column from_line_view" v-if="isDYother">
                    <view class="from_left">
                        党派名称
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <picker @change="bindPickerChangedpmc" :value="from.indexdpmc" name="dpmc" range-key="value"  :range="from.arraydpmc">
                            <view class="uni-input from_input from_input_before" v-if="from.indexdpmc==''" >请选择</view>
                            <view class="uni-input from_input" v-else >{{reversedMessagedpmc}}</view>
                        </picker>
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view" v-if="isDYother">
                    <view class="from_left">
                        其他情况说明
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <input class="uni-input from_input" name="qtqksm" v-model="from.qtqksm" placeholder="其他情况说明" />
                    </view>
                </view>


                <view class="uni-btn-v" >
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
                isDYLB:false, // 是党员类别
                isDY:false, // 是党员
                isDYYB:false, // 是预备党员
                isDYother:false, // 其他党派
                from:{
                    partyID:'',
                    indexStated:'',
                    arrayStated:[],
                    // arrayStated:[
                    //     {value:'请选择',lable:''},{value:'是',lable:'1'},
                    //     {value:'否',lable:'2'},
                    // ],
                    djsqsrq:'',
                    rdrq:'',
                    pzrq:'',
                    indexssdzz:'',
                    arrayssdzz:[],
                    indexsszb:'',
                    arraysszb:[],
                    indexdylb:'',
                    arraydylb:[],
                    indexdpmc:'',
                    arraydpmc:[],
                    qtqksm:'',
                },
                verify:{
                    indexStated:[{type:'notEmptyAndZero',message:'请选择政治面貌'}]
                },
                //     {
                //     indexStated:[{type:'required',message:'请选择政治面貌'}],
                //     djsqsrq:[{type:'required',message:'请选择递交入党申请时间'}],
                //     rdrq:[{type:'required',message:'请选择入党日期'}],
                //     pzrq:[{type:'required',message:'请选择批准转正日期'}],
                //     indexssdzz:[{type:'required',message:'请选择所属支部所属党组织',}],
                //     indexsszb:[{type:'required',message:'请选择所属支部'}],
                // },


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
            reversedMessageStated(){
                if(!this.from.indexStated){
                    this.from.indexStated = 0;
                }
                return _.get(this.from.arrayStated,`[${this.from.indexStated}].value`)
                // return this.from.arrayStated[this.from.indexStated].value
            },
            reversedMessagessdzz(){
                if(!this.from.indexssdzz){
                    this.from.indexssdzz = 0;
                }
                // return this.from.arrayssdzz[this.from.indexssdzz].value
                return _.get(this.from.arrayssdzz,`[${this.from.indexssdzz}].value`)
            },
            reversedMessagesszb(){
                if(!this.from.indexsszb){
                    this.from.indexsszb = 0;
                }
                // return this.from.arraysszb[this.from.indexsszb].value
                return _.get(this.from.arraysszb,`[${this.from.indexsszb}].value`)
            },
            reversedMessagedylb(){
                if(!this.from.indexdylb){
                    this.from.indexdylb = 0;
                }
                // return this.from.arraydylb[this.from.indexdylb].value
                return _.get(this.from.arraydylb,`[${this.from.indexdylb}].value`)
            },
            reversedMessagedpmc(){
                if(!this.from.indexdpmc){
                    this.from.indexdpmc = 0;
                }
                // return this.from.arraydpmc[this.from.indexdpmc].value
                return _.get(this.from.arraydpmc,`[${this.from.indexdpmc}].value`)
            },
        },
        methods: {
            // 父组件传过来的数据处理
            loaddata(){
                const relldata = this.allData;
                this.verify ={
                    indexStated:[{type:'notEmptyAndZero',message:'请选择政治面貌'}]
                }
                this.from.djsqsrq = "";
                this.from.rdrq = "";
                this.from.pzrq = "";
                this.from.indexssdzz = "";
                this.from.indexsszb = "";
                this.from.qtqksm = "";

                this.from.indexStated = "";
                this.from.indexdylb = "";
                this.from.indexdpmc = "";

                 this.from.arrayStated = helper.ArrReduce(relldata[54],"F_Key","Caption",true);//政治面貌

                this.from.arrayssdzz = helper.ArrReduce(relldata[68],"F_Key","Caption",true);//所属党组织
                this.from.arraysszb = helper.ArrReduce(relldata[69],"F_Key","Caption",true);//所属党支部

                this.from.arraydylb = helper.ArrReduce(relldata[70],"F_Key","Caption",true);//所属党员类别

                this.from.arraydpmc = helper.ArrReduce(relldata[72],"F_Key","Caption",true);//党派名称


                this.usepeople = relldata[1][0].xm;

                let ID = this.openid;
                let _this = this
                if(!ID){   //新增
                }else{    //详情
                    relldata[67].forEach(function (value,index) {
                        let lsh = value.lsh

                        if(lsh==ID){
                            //     Partyage:'',  //党龄


                            _this.from.partyID = ID;
                            _this.from.djsqsrq = value.djsqsrq||'';
                            _this.from.rdrq = value.rdrq||'';
                            _this.from.pzrq = value.pzrq||'';
                            _this.from.qtqksm = value.qtqksm||'';

                            if(!value.zzmm){
                                _this.from.indexStated = ''
                            }else{
                                _this.from.indexStated = helper.indexforeach(_this.from.arrayStated,value.zzmm,"lable");  //政治面貌
                            }
                            if(!value.dylb){
                                _this.from.indexdylb = ''
                            }else{
                                _this.from.indexdylb = helper.indexforeach(_this.from.arraydylb,value.dylb,"lable");  //党员类别
                            }

                            // _this.from.indexStated = helper.indexforeach(_this.from.arrayStated,value.zzmm,"lable");  //政治面貌
                            // _this.from.indexdylb = helper.indexforeach(_this.from.arraydylb,value.dylb,"lable");  //党员类别

                            let Stated = _this.from.indexStated;
                            _this.isDYLB=false;// 是党员类别
                            _this.isDY=false; // 是正式党员
                            _this.isDYYB=false; // 是预备党员
                            _this.isDYother=false; // 其他党派

                            if(Stated==2){

                                _this.isDYLB=true;
                                let Stateddylb = _this.from.indexdylb;

                                if(Stateddylb==1){
                                    _this.isDYYB=true;
                                    _this.verify ={
                                        indexStated:[{type:'notEmptyAndZero',message:'请选择政治面貌'}],
                                        djsqsrq:[{type:'required',message:'请选择递交入党申请时间'}],
                                        rdrq:[{type:'required',message:'请选择入党日期'}]
                                    }
                                }else if(Stateddylb==2){
                                    _this.isDY=true;
                                    _this.verify ={
                                        indexStated:[{type:'notEmptyAndZero',message:'请选择政治面貌'}],
                                        djsqsrq:[{type:'required',message:'请选择递交入党申请时间'}],
                                        rdrq:[{type:'required',message:'请选择入党日期'}],
                                        pzrq:[{type:'required',message:'请选择批准转正日期'}],
                                        indexssdzz:[{type:'notEmptyAndZero',message:'请选择所属支部所属党组织',}],
                                        indexsszb:[{type:'notEmptyAndZero',message:'请选择所属支部'}],
                                    }
                                }else if(Stateddylb==3){
                                    _this.isDYLB=true;
                                    _this.verify ={
                                        indexStated:[{type:'notEmptyAndZero',message:'请选择政治面貌'}],
                                        indexdylb:[{type:'notEmptyAndZero',message:'请选择党员类别'}],
                                    }
                                }else{
                                    _this.isDYLB=false;
                                    _this.verify ={
                                        indexStated:[{type:'notEmptyAndZero',message:'请选择政治面貌'}]
                                    }
                                }

                            }else if(Stated==3){
                                _this.isDYother=true;
                                _this.verify ={
                                    indexStated:[{type:'notEmptyAndZero',message:'请选择政治面貌'}],
                                    indexdpmc:[{type:'notEmptyAndZero',message:'请选择党派名称'}],
                                    qtqksm:[{type:'required',message:'请输入其他说明'}]
                                }
                            }else{
                                _this.verify ={
                                    indexStated:[{type:'notEmptyAndZero',message:'请选择政治面貌'}]
                                }
                            }


                            // // _this.from.indexdylb = helper.indexforeach(_this.from.arraydylb,value.dylb,"lable");
                            // _this.from.indexdpmc = helper.indexforeach(_this.from.arraydpmc,value.dpmc,"lable");
                            // _this.from.indexssdzz = helper.indexforeach(_this.from.arrayssdzz,value.ssdzz,"lable");
                            // _this.from.indexsszb = helper.indexforeach(_this.from.arraysszb,value.sszb,"lable");
                            if(!value.dpmc){
                                _this.from.indexdpmc = ''
                            }else{
                                _this.from.indexdpmc = helper.indexforeach(_this.from.arraydpmc,value.dpmc,"lable");
                            }
                            if(!value.ssdzz){
                                _this.from.indexssdzz = ''
                            }else{
                                _this.from.indexssdzz = helper.indexforeach(_this.from.arrayssdzz,value.ssdzz,"lable");
                            }
                            if(!value.sszb){
                                _this.from.indexsszb = ''
                            }else{
                                _this.from.indexsszb = helper.indexforeach(_this.from.arraysszb,value.sszb,"lable");
                            }
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
            bindPickerChangeStated(e){
                this.from.djsqsrq = "";
                this.from.rdrq = "";
                this.from.pzrq = "";
                this.from.indexssdzz = "";
                this.from.indexsszb = "";
                this.from.qtqksm = "";

                this.from.indexStated = "";
                this.from.indexdylb = "";
                this.from.indexdpmc = "";



                this.from.indexStated= e.target.value;
                let Stated = this.from.indexStated;

                this.isDYLB=false;// 是党员类别
                this.isDY=false; // 是正式党员
                this.isDYYB=false; // 是预备党员
                this.isDYother=false; // 其他党派
                if(Stated==2){
                    this.isDYLB=true;
                    this.verify ={
                        indexStated:[{type:'notEmptyAndZero',message:'请选择政治面貌'}],
                        indexdylb:[{type:'notEmptyAndZero',message:'请选择党员类别'}],
                    }
                }else if(Stated==3){
                    this.isDYother=true;
                    this.verify ={
                        indexStated:[{type:'notEmptyAndZero',message:'请选择政治面貌'}],
                        indexdpmc:[{type:'notEmptyAndZero',message:'请选择党派名称'}],
                        qtqksm:[{type:'required',message:'请输入其他说明'}]
                    }
                }else{
                    this.verify ={
                        indexStated:[{type:'notEmptyAndZero',message:'请选择政治面貌'}]
                    }
                }
            },
            bindPickerChangessdzz(e){
                this.from.indexssdzz= e.target.value;
            },
            bindPickerChangesszb(e){
                this.from.indexsszb= e.target.value;
            },
            bindPickerChangedylb(e){
                this.from.indexdylb= e.target.value;
                let Stated = this.from.indexdylb;

                this.isDY=false; // 是正式党员
                this.isDYYB=false; // 是预备党员
                this.isDYother=false; // 其他党派

                if(Stated==1){
                    this.isDYYB=true;
                    this.verify ={
                        indexStated:[{type:'notEmptyAndZero',message:'请选择政治面貌'}],
                        djsqsrq:[{type:'required',message:'请选择递交入党申请时间'}],
                        rdrq:[{type:'required',message:'请选择入党日期'}]
                    }
                }else if(Stated==2){
                    this.isDY=true;
                    this.verify ={
                        indexStated:[{type:'notEmptyAndZero',message:'请选择政治面貌'}],
                        djsqsrq:[{type:'required',message:'请选择递交入党申请时间'}],
                        rdrq:[{type:'required',message:'请选择入党日期'}],
                        pzrq:[{type:'required',message:'请选择批准转正日期'}],
                        indexssdzz:[{type:'notEmptyAndZero',message:'请选择所属支部所属党组织',}],
                        indexsszb:[{type:'notEmptyAndZero',message:'请选择所属支部'}],
                    }
                }else{
                    this.verify ={
                        indexStated:[{type:'notEmptyAndZero',message:'请选择政治面貌'}],
                        indexdylb:[{type:'notEmptyAndZero',message:'请选择党员类别'}]
                    }
                }

            },
            bindPickerChangedpmc(e){
                this.from.indexdpmc= e.target.value;
            },
            //递交入党申请时间
            bindDateChange: function(e) {
                this.from.djsqsrq = e.target.value
            },
            bindDateChange2: function(e) {
                this.from.rdrq = e.target.value
            },
            bindDateChange3: function(e) {
                this.from.pzrq = e.target.value
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
                const [fail] = await formHelper.checkfrom(this.verify,this.from);
                console.log(this.from);
                await formHelper.checkDate(this.from.djsqsrq,this.from.rdrq,"入党日期不能早于递交入党申请")
                await formHelper.checkDate(this.from.djsqsrq,this.from.pzrq,"批准转正日期不能早于递交入党申请")
                await formHelper.checkDate(this.from.rdrq,this.from.pzrq,"批准转正日期不能早于入党日期")
                if(fail){

                }else{
                    // console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))

                    const [err, data] = await helper.reqV4({
                        uri: '/Execute',
                        data: {
                            path: 'hr/managelist/mobile/addpartymember.txt',
                            manageID: this.ygbh,
                            partyID:this.from.partyID,
                            dylb:this.from.indexdylb == "" ? null : this.from.arraydylb[this.from.indexdylb].lable,
                            // dylb:"", //党员类别
                            dpmc:this.from.indexdpmc == "" ? null : this.from.arraydpmc[this.from.indexdpmc].lable, //党派名称
                            Stated:"",
                            zzmm:this.from.arrayStated[this.from.indexStated].lable,  //政治面貌
                            djsqsrq:this.from.djsqsrq || null,
                            rdrq:this.from.rdrq || null,
                            pzrq:this.from.pzrq || null,
                            ssdzz:this.from.indexssdzz == "" ? null : this.from.arrayssdzz[this.from.indexssdzz].lable,
                            sszb:this.from.indexsszb == "" ? null : this.from.arraysszb[this.from.indexsszb].lable,
                            qtqksm:this.from.qtqksm,
                            // dpmc:,
                            Partyage:'',  //党龄

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