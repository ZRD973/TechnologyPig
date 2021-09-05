<template name="ProjectExperience" >
    <scroll-view  scroll-y class="popupbody expend_bottom" >
        <view class="popup_title_view" >
            <text class="popup_title">项目经历</text>
            <span @click="close" class="popup_close">X</span>
        </view>
        <view class="from_view">
            <form @submit="formSubmit" @reset="formReset">

                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        从事项目
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <picker @change="bindPickerChangecxxm" :value="from.indexcxxm" name="cxxm" range-key="value"  :range="from.arraycxxm">
                            <view class="uni-input from_input from_input_before" v-if="from.indexcxxm===0" >请选择</view>
                            <view class="uni-input from_input" v-else >{{reversedMessagecxxm}}</view>
                        </picker>
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view"  v-if="nowcompany">
                    <view class="from_left">
                        项目名称
                    </view>
                    <view class="from_right">
                        <input class="uni-input from_input" @click="hongboopen()" name="xmmc" v-model="from.xmmc" placeholder="项目名称" />
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view" v-if="oldcompany">
                    <view class="from_left">
                        项目名称
                    </view>
                    <view class="from_right">
                        <input class="uni-input from_input" name="xmmc2" v-model="from.xmmc2" placeholder="项目名称" />
                    </view>
                </view>

                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        工程类型
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <picker @change="bindPickerChangegclx" :value="from.indexgclx" name="gclx" range-key="value"  :range="from.arraygclx">
                            <view class="uni-input from_input from_input_before" v-if="from.indexgclx==''" >请选择</view>
                            <view class="uni-input from_input" v-else >{{reversedMessagegclx}}</view>
                        </picker>
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        专业类别
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <picker @change="bindPickerChangezylb" :value="from.indexzylb" name="zylb" range-key="value"  :range="from.arrayzylb">
                            <view class="uni-input from_input from_input_before" v-if="from.indexzylb==''" >请选择</view>
                            <view class="uni-input from_input" v-else >{{reversedMessagezylb}}</view>
                        </picker>
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        担任职务
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <picker @change="bindPickerChangedrzw" :value="from.indexdrzw" name="drzw" range-key="value"  :range="from.arraydrzw">
                            <view class="uni-input from_input from_input_before" v-if="from.indexdrzw==''" >请选择</view>
                            <view class="uni-input from_input" v-else >{{reversedMessagedrzw}}</view>
                        </picker>
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        参与程度
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <picker @change="bindPickerChangecycd" :value="from.indexcycd" name="cycd" range-key="value"  :range="from.arraycycd">
                            <view class="uni-input from_input from_input_before" v-if="from.indexcycd==''" >请选择</view>
                            <view class="uni-input from_input" v-else >{{reversedMessagecycd}}</view>
                        </picker>
                    </view>
                </view>
                <!--当前公司项目-->
                <view class="uni-form-item uni-column from_line_view" v-if="nowcompany">
                    <view class="from_left">
                        合同编号
                    </view>
                    <view class="from_right">
                        <input class="uni-input from_input" name="htbh" v-model="from.htbh" placeholder="合同编号" />
                    </view>
                </view>

                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        合同额
                    </view>
                    <view class="from_right">
                        <input class="uni-input from_input" name="the" v-model="from.the" placeholder="请选择" />
                        <span class="input_DW">万元</span>
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        项目开始
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <picker mode="date" :value="from.htkgrq" :start="startDate" name="htkgrq" :end="endDate" @change="bindDateChange1">
                            <!--<view class="uni-input from_input">{{ccslsj}}</view>-->
                            <view class="uni-input from_input from_input_before" v-if="from.htkgrq==''" >项目开工时间</view>
                            <view class="uni-input from_input" v-else >{{from.htkgrq}}</view>
                        </picker>
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        项目结束
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <picker mode="date" :value="from.htjgrq" :start="startDate" name="htjgrq" :end="endDate" @change="bindDateChange2">
                            <!--<view class="uni-input from_input">{{ccslsj}}</view>-->
                            <view class="uni-input from_input from_input_before" v-if="from.htjgrq==''" >项目完工时间</view>
                            <view class="uni-input from_input" v-else >{{from.htjgrq}}</view>
                        </picker>
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        甲方
                    </view>
                    <view class="from_right">
                        <input class="uni-input from_input" name="jfdw" v-model="from.jfdw" placeholder="甲方单位" />
                    </view>
                </view>

                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        描述
                    </view>
                    <view class="from_right from_view_textarea" style="">
                        <textarea  class="uni-input from_input from_textarea"  type="text" name="memo" v-model="from.memo" placeholder="描述" ></textarea>
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

        <view class="hongbo_open" v-if="project" >
            <view class="hongbo_open_view" >
                <span class="hongbo_close" @click="hongboclose">X</span>
                <project  @childataToresid="residchildata" ></project>
            </view>
        </view>

    </scroll-view>
</template>

<script>
    import helper from "../../lib/helper";
    import project from '../../components/hongbo/project';
    import formHelper from '../../lib/formHelper';
    import _ from 'lodash';
    export default {
        components:{
            project
        },
        data() {
            const currentDate = this.getDate({
                format: true
            })
            return {
                date: currentDate,
                nowcompany:false,
                oldcompany:false,
                project:false,  //项目
                from:{
                    gzxmID:'',
                    xmid:'',
                    indexcxxm: 0,
                    arraycxxm: [{lable:"",value:"请选择"},{lable:"1",value:"当前公司项目"},{lable:"2",value:"既往公司项目"}],
                    xmmc:'',
                    xmmc2:'',
                    indexgclx: '',
                    arraygclx: [],
                    indexzylb: '',
                    arrayzylb: [],
                    indexdrzw: '',
                    arraydrzw: [ //担任职务
                        {lable:"",value:"请选择"},
                        {lable:"3",value:"项目经理"},
                        {lable:"2",value:"总监"},
                        {lable:"1",value:"总代"},
                        {lable:"4",value:"总工"},
                        {lable:"5",value:"其他"},
                    ],
                    indexcycd: '',
                    arraycycd: [
                        {lable:"",value:"请选择"},
                        {lable:"1",value:"总负责"},
                        {lable:"2",value:"主要参与"},
                        {lable:"3",value:"一般参与"}
                    ],
                    htbh:'',
                    the:'',
                    htkgrq:'',
                    htjgrq:'',
                    jfdw:'',
                    memo:'',
                    qssj:'',
                    jssj:'',
                },
                verify:{
                    indexcxxm:[{type:'notEmptyAndZero',message:'请选择从事项目',}],
                    indexgclx:[{type:'notEmptyAndZero',message:'请选择工程类型'}],
                    indexzylb:[{type:'notEmptyAndZero',message:'请选择专业类别'}],
                    indexdrzw:[{type:'notEmptyAndZero',message:'请选择担任职务'}],
                    indexcycd:[{type:'notEmptyAndZero',message:'请选择参与程度'}],
                    htkgrq:[{type:'required',message:'请选择项目开始时间'}],
                    htjgrq:[{type:'required',message:'请选择项目结束时间'}],
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
            isAdd:{}
        },
        inject: ['popup'],
        computed: {
            startDate() {
                return this.getDate('start');
            },
            endDate() {
                return this.getDate('end');
            },
            reversedMessagecxxm(){
                if(!this.from.indexcxxm){
                    this.from.indexcxxm = 0;
                }
                return _.get(this.from.arraycxxm,`[${this.from.indexcxxm}].value`)
            },
            reversedMessagegclx(){
                if(!this.from.indexgclx){
                    this.from.indexgclx = 0;
                }
                return _.get(this.from.arraygclx,`[${this.from.indexgclx}].value`)
            },
            reversedMessagezylb(){
                if(!this.from.indexzylb){
                    this.from.indexzylb = 0;
                }
                return _.get(this.from.arrayzylb,`[${this.from.indexzylb}].value`)
            },
            reversedMessagedrzw(){
                if(!this.from.indexdrzw){
                    this.from.indexdrzw = 0;
                }
                return _.get(this.from.arraydrzw,`[${this.from.indexdrzw}].value`)
            },
            reversedMessagecycd(){
                if(!this.from.indexcycd){
                    this.from.indexcycd = 0;
                }
                return _.get(this.from.arraycycd,`[${this.from.indexcycd}].value`)
            },
        },
        methods: {
            hongboopen(){
                this.project = true;
            },
            hongboclose(){
                this.project = false;
            },
            residchildata(e){
                //项目
                this.project=false;
                this.from.xmmc = e.gcmc;
                this.from.xmmc2 = e.gcmc;
            },
            // 父组件传过来的数据处理
            loaddata(){
                let relldata = this.allData;
                this.from.arraygclx = helper.ArrReduce(relldata[64],"F_Key","Caption",true);//工程类型
                this.from.arrayzylb = helper.ArrReduce(relldata[65],"lsh","name",true);//专业类别

                let ID = this.openid;
                let _this = this
                if(!ID){   //新增
                }else{    //详情
                    relldata[31].forEach(function (value,index) {
                        let lsh = value.lsh
                        if(lsh==ID){

                            _this.from.gzxmID = ID;

                            _this.from.xmid = value.xmid;
                            _this.from.xmmc = value.xmmc;
                            _this.from.xmmc2 = value.xmmc2;
                            _this.from.htbh = value.htbh;
                            _this.from.the = value.the;
                            _this.from.htkgrq = value.htkgrq;
                            _this.from.htjgrq = value.htjgrq;
                            _this.from.jfdw = value.jfdw;
                            _this.from.memo = value.memo;
                            _this.from.qssj = value.qssj;
                            _this.from.jssj = value.jssj;

                            _this.from.indexcxxm = helper.indexforeach(_this.from.arraycxxm,value.cxxm,"lable");

                            switch(+_this.from.indexcxxm){
                                case 1:  //当前公司项目
                                    _this.nowcompany = true;
                                    _this.oldcompany = false;
                                    break;
                                case 2:  //既往公司项目
                                    _this.nowcompany = false;
                                    _this.oldcompany = true;
                                    break;
                                default:
                                    break;
                            }

                            _this.from.indexgclx = helper.indexforeach(_this.from.arraygclx,value.gclx,"lable");
                            _this.from.indexzylb = helper.indexforeach(_this.from.arrayzylb,value.zylb,"lable");
                            _this.from.indexdrzw = helper.indexforeach(_this.from.arraydrzw,value.drzw,"lable");
                            _this.from.indexcycd = helper.indexforeach(_this.from.arraycycd,value.cycd,"lable");

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
            //从事项目
            bindPickerChangecxxm(e) {
                this.nowcompany = false;
                this.oldcompany = false;
                this.from.indexcxxm = e.target.value;
                switch(+this.from.indexcxxm){
                    case 1:  //当前公司项目
                        this.nowcompany = true;
                        this.oldcompany = false;

                        break;
                    case 2:  //既往公司项目
                        this.nowcompany = false;
                        this.oldcompany = true;
                        break;
                    default:
                        break;
                }
            },
            //工程类型
            bindPickerChangegclx(e) {
                this.from.indexgclx = e.target.value
            },
            //专业类别
            bindPickerChangezylb(e) {
                this.from.indexzylb = e.target.value
            },
            //担任职务
            bindPickerChangedrzw(e) {
                this.from.indexdrzw = e.target.value
            },
            //参与程度
            bindPickerChangecycd(e) {
                this.from.indexcycd= e.target.value
            },
            //时间
            bindDateChange1: function(e) {
                this.from.htkgrq = e.target.value
            },
            bindDateChange2: function(e) {
                this.from.htjgrq = e.target.value
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
                await formHelper.checkDate(this.from.htkgrq,this.from.htjgrq,"项目结束时间不能早于开始时间")
                const [fail] = await formHelper.checkfrom(this.verify,this.from);


                if(fail){

                }else{

                    const [err, data] = await helper.reqV2({
                        uri: '/Execute',
                        data: {
                            path: this.isAdd?'hr/managelist/managedetail/index.editProjectExperience':'hr/managelist/managedetail/index.addProjectExperience',
                            lsh:this.openid,
                            manageID: this.ygbh,
                            gzxmID: this.from.gzxmID,
                            xmid: +this.from.xmid,
                            cxxm: this.from.arraycxxm[this.from.indexcxxm].lable,
                            xmmc:this.from.xmmc,
                            xmmc2:this.from.xmmc2||null,
                            gclx: this.from.indexgclx == '' ? null:+this.from.arraygclx[this.from.indexgclx].lable,
                            zylb: this.from.indexzylb == '' ? null:+this.from.arrayzylb[this.from.indexzylb].lable,
                            drzw: this.from.indexdrzw == '' ? null:this.from.arraydrzw[this.from.indexdrzw].lable,
                            cycd: this.from.indexcycd == '' ? null:+this.from.arraycycd[this.from.indexcycd].lable,
                            htbh:this.from.htbh,
                            the:+this.from.the,
                            htkgrq:this.from.htkgrq,
                            htjgrq:this.from.htjgrq,
                            jfdw:this.from.jfdw,
                            memo:this.from.memo||null,
                            qssj:this.from.qssj,
                            jssj:this.from.jssj,
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