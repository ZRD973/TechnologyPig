<template name="HonoraryAward" >
    <scroll-view  scroll-y class="popupbody expend_bottom" >
        <view class="popup_title_view" >
            <text class="popup_title">荣誉奖励</text>
            <span @click="close" class="popup_close">X</span>
        </view>
        <view class="view_warning">
            提示：*荣誉名称请输入2-3字关键词，如已有相同名称有下拉选项可选，如无下拉或相同名称，请输入荣誉全称。
        </view>
        <view class="from_view">
            <form @submit="formSubmit" @reset="formReset">
                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        颁发日期
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <picker mode="date" :value="from.bjsjDate" :start="startDate" name="bjsjDate" :end="endDate" @change="bindDateChange">
                            <view class="uni-input from_input from_input_before" v-if="from.bjsjDate==''" >获奖日期</view>
                            <view class="uni-input from_input" v-else >{{from.bjsjDate}}</view>
                        </picker>
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        荣誉类别
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <picker @change="bindPickerChangerylb" :value="from.indexrylb" name="rylb" range-key="value"  :range="from.arrayrylb">
                            <view class="uni-input from_input from_input_before" v-if="from.indexrylb==''" >请选择</view>
                            <view class="uni-input from_input" v-else >{{reversedMessagerylb}}</view>
                        </picker>
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        对象类别
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <picker @change="bindPickerChangedxlb" :value="from.indexdxlb" name="dxlb" range-key="value"  :range="from.arraydxlb">
                            <view class="uni-input from_input from_input_before" v-if="from.indexdxlb==''" >请选择</view>
                            <view class="uni-input from_input" v-else >{{reversedMessagedxlb}}</view>
                        </picker>
                    </view>
                </view>

<!--个人（员工）-->
                <view class="uni-form-item uni-column from_line_view" v-if="personal">
                    <view class="from_left">
                        获奖员工
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <input class="uni-input from_input" name="onlyone" disabled v-model="from.onlyoneTD" placeholder="获奖员工ID" v-show="false" />
                        <input class="uni-input from_input" name="onlyone" disabled v-model="from.onlyone" placeholder="获奖员工" />
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view" v-if="personal">
                    <view class="from_left">
                        获奖对象
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <input class="uni-input from_input"  name="dxonlyone" v-model="from.dxonlyone" placeholder="获奖对象" />
                    </view>
                </view>

<!--集体（项目团队）-->
                <view class="uni-form-item uni-column from_line_view" v-if="XMTD">
                    <view class="from_left">
                        获奖集体
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <input class="uni-input from_input" name="xmID" v-model="from.xmID" placeholder="获奖集体ID" v-show="false" />
                        <input class="uni-input from_input" name="xm" @click="hongboopen(3)" v-model="from.xm" placeholder="点击库选" />
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view" v-if="XMTD">
                    <view class="from_left">
                        获奖对象
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <input class="uni-input from_input" name="hjdxxmID" v-model="from.hjdxxmID" placeholder="获奖对象ID" v-show="false" />
                        <input class="uni-input from_input" name="hjdxxm"  v-model="from.hjdxxm" placeholder="获奖对象" />
                    </view>
                </view>

<!--集体（部门团队）-->
                <view class="uni-form-item uni-column from_line_view" v-if="BMTD">
                    <view class="from_left">
                        获奖集体
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <input class="uni-input from_input" name="bmID" v-model="from.bmID" placeholder="获奖集体ID" v-show="false" />
                        <input class="uni-input from_input" @click="hongboopen(1)" name="bm" v-model="from.bm" placeholder="获奖集体" />
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view" v-if="BMTD">
                    <view class="from_left">
                        获奖对象
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <input class="uni-input from_input" disabled name="hjdxbmID" v-model="from.hjdxbmID" placeholder="获奖对象ID" v-show="false" />
                        <input class="uni-input from_input" disabled name="hjdxbm" v-model="from.hjdxbm" placeholder="获奖对象" />
                    </view>
                </view>

<!--法人公司-->
                <view class="uni-form-item uni-column from_line_view" v-if="FRGS">
                    <view class="from_left">
                        法人公司
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <picker @change="bindPickerChangegs" :value="from.indexgs" name="dxlb" range-key="value"  :range="from.arraygs">
                            <view class="uni-input from_input from_input_before" v-if="from.indexgs==''" >请选择</view>
                            <view class="uni-input from_input" v-else >{{reversedMessagegs}}</view>
                        </picker>
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view" v-if="FRGS">
                    <view class="from_left">
                        获奖对象
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <input class="uni-input from_input" name="hjdxgsID" v-model="from.hjdxgsID" placeholder="获奖对象ID" v-show="false" />
                        <input class="uni-input from_input" name="hjdxgs" v-model="from.hjdxgs" placeholder="获奖对象" />
                    </view>
                </view>

                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        荣誉名称
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right" style="position: relative;">
                        <!--<input class="uni-input from_input" name="rymc" @click="rymcopen()"  v-model="from.rymc" placeholder="荣誉名称" />-->
                        <input class="uni-input from_input" name="rymc" @input="inputChange" @blur="closeChange" v-model="from.rymc" placeholder="荣誉名称" />
                        <view class="rymc-view"  v-if="rymcShow" >

                        </view>
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        证书编号
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <input class="uni-input from_input" name="zsbh" v-model="from.zsbh" placeholder="证书编号" />
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        颁奖组织
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <input class="uni-input from_input" name="bjzzqc" v-model="from.bjzzqc" placeholder="颁奖组织" />
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        荣誉级别
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <picker @change="bindPickerChangeryjb" :value="from.indexryjb" name="ryjb" range-key="value"  :range="from.arrayryjb">
                            <view class="uni-input from_input from_input_before" v-if="from.indexryjb==''" >请选择</view>
                            <view class="uni-input from_input" v-else >{{reversedMessageryjb}}</view>
                        </picker>
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        原件保管
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <picker @change="bindPickerChangeyjbgd" :value="from.indexyjbgd" name="yjbgd" range-key="value"  :range="from.arrayyjbgd">
                            <view class="uni-input from_input from_input_before" v-if="from.indexyjbgd==''" >请选择</view>
                            <view class="uni-input from_input" v-else >{{reversedMessageyjbgd}}</view>
                        </picker>
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view" v-if="bggs">
                    <view class="from_left">
                        保管机构
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <input class="uni-input from_input" name="OrgedID" v-model="from.OrgedID" placeholder="保管机构" v-show="false" />
                        <input class="uni-input from_input" @click="hongboopen(2)" name="OrgedIDvalue" v-model="from.OrgedIDvalue" placeholder="保管机构" />
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view" v-if="bggr">
                    <view class="from_left">
                        保管个人
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <input class="uni-input from_input" disabled name="bgGoalID" v-model="from.bgGoalID" placeholder="保管个人"  v-show="false" />
                        <input class="uni-input from_input" disabled name="bgGoalIDvalue" v-model="from.bgGoalIDvalue" placeholder="保管个人" />
                    </view>
                </view>

                <!--<view class="uni-form-item uni-column from_line_view">-->
                    <!--<view class="from_left">-->
                        <!--上传-->
                    <!--</view>-->
                    <!--<view class="from_right">-->
                        <!--<button class="from_buttom">资料附件</button>-->
                    <!--</view>-->
                <!--</view>-->
                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        照片
                    </view>
                    <view class="from_right" id="fildnav">
                        <!--<view v-if="imageSrc.length>0" class="image_view">-->
                            <!--<image class="fileImage" v-for="(item,index) in imageSrc" :key="index" :src="item" @click="relshowImage(index,imageSrcbig)" ></image>-->
                        <!--</view>-->
                        <!--<button v-if="haveImage" class="from_buttom" @click="fileUpload">上传</button>-->
                        <!--详情-->
                        <view v-if="haveImg">
                            <view v-if="imageSrc.length>0" class="image_view" >
                                <view v-for="(item,index) in imageSrc" :key="index" class="pic-view">
                                    <image class="fileImage" :src="item.path"  @click="relshowImage(index,imageSrcbig)" ></image>
                                    <span v-if="haveImg" class="deletePic" @click="delectPic(item.ID)" >X</span>
                                </view>
                            </view>
                        </view>
                        <!--上传-->
                        <view v-if="haveImageUpdate">
                            <view v-if="imageSrc.length>0" class="image_view" >
                                <view v-for="(item,index) in imageSrc" :key="index" class="pic-view">
                                    <image class="fileImage" :src="item.path" ></image>
                                </view>
                            </view>
                        </view>
                        <image v-if="haveImage" class="uploadimg" @click="fileUpload" :src="searchImg" ></image>
                    </view>
                </view>
                <view class="uni-btn-v uni-btn-my" >
                    <view class="from_buttom_inline">

                        <button v-if="openid" @click="deleteData" class="from_submit">删除</button>
                        <button v-else form-type="submit" class="from_submit">保存</button>
                        <button type="default" form-type="reset" class="from_reset">取消</button>
                    </view>

                </view>
            </form>
        </view>
        <!--获奖部门-->
        <view class="hongbo_open" v-if="selectTree" >
            <view class="hongbo_open_view" >
                <span class="hongbo_close" @click="hongboclose">X</span>
                <department :departmentID = 'departmentID'  @childataToresid="residchildata" ></department>
            </view>
        </view>
        <!--保管部门-->
        <view class="hongbo_open" v-if="selectTree2" >
            <view class="hongbo_open_view" >
                <span class="hongbo_close" @click="hongboclose">X</span>
                <department :departmentID = 'departmentID2' @childataToresid="residchildata2" ></department>
            </view>
        </view>
<!--获奖项目-->
        <view class="hongbo_open" v-if="project" >
            <view class="hongbo_open_view" >
                <span class="hongbo_close" @click="hongboclose">X</span>
                <project  @childataToresid="residchildata3" ></project>
            </view>
        </view>

        <!--<view class="hongbo_open" v-if="RYMC" >-->
            <!--<view class="hongbo_open_view" >-->
                <!--<span class="hongbo_close" @click="rymcclose">X</span>-->
                <!--<honoraryName :goalID="ygbh" :dxlb="from.arraydxlb[from.indexdxlb].lable"  :bfsj="from.bjsjDate" :rylb="from.arrayrylb[from.indexrylb].lable" ></honoraryName>-->
            <!--</view>-->

        <!--</view>-->

    </scroll-view>
</template>

<script>
    import helper from "../../lib/helper";
    import formHelper from '../../lib/formHelper';
    import department from '../../components/hongbo/department';
    // import radioCheckbox from '../../components/hongbo/radioCheckbox';
    import honoraryName from '../../components/hongbo/honoraryname';
    import project from '../../components/hongbo/project';
    import _ from 'lodash';


    export default {
        components:{
            department,honoraryName,project
        },
        data() {
            const currentDate = this.getDate({
                format: true
            })
            return {
                date: currentDate,
                haveImageUpdate:false,
                haveImage:true,
                haveImg:false,
                searchImg: '../../static/uploatImg.png',
                imageSrc:[],
                imageSrcbig:[],
                options:{},
                goalID:'',
                bggs:false,
                bggr:false,
                rymcShow:false,
                selectTree:false,  // 部门
                selectTree2:false,  // 保管部门
                project:false,  //项目
                RYMC:false,    //荣誉名称
                personal: false,
                XMTD: false,
                BMTD: false,
                FRGS: false,
                departmentID:'', //获奖部门 id
                departmentID2:'', //保管部门 id
                from:{
                    honID:'',
                    ygbh:'',
                    bjsjDate:'',
                    zsbh:'',//证书编号
                    indexrylb: '',
                    arrayrylb: [],
                    indexdxlb: '',
                    arraydxlb: [],
                    indexgs: '',
                    arraygs: [],
                    hjdxgs:'', // 获奖公司对象
                    hjdxgsID:'', // 获奖公司对象
                    bm:'', // 获奖集体 部门
                    bmID:'', // 获奖集体 部门ID
                    hjdxbm:'', // 获奖部门对象
                    hjdxbmID:'', // 获奖部门对象ID
                    xm:'', // 获奖集体 项目
                    xmID:'', // 获奖集体 项目ID
                    hjdxxm:'', // 获奖集体 项目 对象
                    hjdxxmID:'', // 获奖集体 项目 对象ID
                    onlyone:'',
                    dxonlyone:'',  //个人
                    rymc:'',
                    bjzzqc:'',
                    indexryjb: '',   //荣誉级别
                    arrayryjb: [],
                    indexyjbgd: '',
                    arrayyjbgd: [
                        {lable:"",value:"请选择"},
                        {lable:"5",value:"公司保管"},
                        {lable:"10",value:"部门保管"},
                        {lable:"15",value:"个人保管"}
                    ],
                    OrgedID:'',
                    OrgedIDvalue:'',
                    bgGoalID:'',  //  保管个人 id
                    bgGoalIDvalue:'',  //保管个人值
                    DeptID:'',  //部门 id
                },
                verify:{
                    bjsjDate:[{type:'required',message:'请选择颁发日期',}],
                    indexrylb:[{type:'notEmptyAndZero',message:'请选择荣誉类别'}],
                    indexdxlb:[{type:'notEmptyAndZero',message:'请选择对象类别'}],
                    rymc:[{type:'required',message:'请输入荣誉名称'}],
                    zsbh:[{type:'required',message:'请输入证书编号'}],
                    bjzzqc:[{type:'required',message:'请输入颁奖组织'}],
                    indexryjb:[{type:'notEmptyAndZero',message:'请选择荣誉级别'}],
                    indexyjbgd:[{type:'notEmptyAndZero',message:'请选择原件保管'}],
                },
                relvalue:'',
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
            reversedMessagerylb(){
                if(!this.from.indexrylb){
                    this.from.indexrylb = 0;
                }
                return _.get(this.from.arrayrylb,`[${this.from.indexrylb}].value`)
            },
            reversedMessagedxlb(){
                if(!this.from.indexdxlb){
                    this.from.indexdxlb = 0;
                }
                return _.get(this.from.arraydxlb,`[${this.from.indexdxlb}].value`)
            },
            reversedMessagegs(){
                // this.from.hjdxgsID = this.from.arraygs[this.from.indexgs].lable;
                this.from.hjdxgsID = _.get(this.from.arraygs,`[${this.from.indexgs}].lable`);
                this.from.hjdxgs = _.get(this.from.arraygs,`[${this.from.indexgs}].value`);
                return _.get(this.from.arraygs,`[${this.from.indexgs}].value`)
            },
            reversedMessageryjb(){
                if(!this.from.indexryjb){
                    this.from.indexryjb = 0;
                }
                return _.get(this.from.arrayryjb,`[${this.from.indexryjb}].value`)
            },
            reversedMessageyjbgd(){
                if(!this.from.indexyjbgd){
                    this.from.indexyjbgd = 0;
                }
                return _.get(this.from.arrayyjbgd,`[${this.from.indexyjbgd}].value`)
            },
        },
        methods: {
            // 荣誉名称  模糊检索
            closeChange(e){
                this.rymc =  e.detail.value;
                this.rymcShow = false;
            },
            inputChange(e){
                this.rymc =  e.detail.value;
                this.loadData();
                if(this.rymc){
                    this.rymcShow = true;
                }else {
                    this.rymcShow = false;
                }
            },
            async loadData(){
                const [err, data] = await helper.req({
                    uri: '/PageQuery',
                    data: {
                        path: 'hr/managelist/mobile/holist.txt',
                        pageindex:1,
                        pagesize:100,
                        pageorder:'lsh desc',
                        rylb:this.from.arrayrylb[this.from.indexrylb].lable,
                        rymc:this.rymc,
                        bfsj:this.from.bjsjDate,
                        goalID:this.ygbh,
                        dxlb:this.from.arraydxlb[this.from.indexdxlb].lable,
                    }
                })
                console.log([err, data])
            },


            rymcopen(){
                this.RYMC = true;
            },
            rymcclose(){
                this.RYMC = false;
            },
            hongboopen(type){
                this.selectTree = false;
                this.selectTree2 = false;
                this.project = false;
                switch(+type){
                    case 1:  //获奖 部门
                        this.selectTree = true;
                        break;
                    case 2:  //保管部门
                        this.selectTree2 = true;
                        break;
                    case 3:  //获奖项目
                        this.project = true;
                        break;
                    default:
                        break;
                }
            },
            hongboclose(){
                this.selectTree = false;
                this.selectTree2 = false;
                this.project = false;
            },
            // 子组件 传过来的值
            residchildata(e){
                this.selectTree=false;
                // e = 28,行政中心
                const rele= e.split(',');
                const relvalue = rele[1];
                const relid = rele[0];
                this.from.bm = relvalue    //  所属部门团队    获奖集体
                this.from.bmID = relid    //  所属部门团队      获奖集体 ID
                this.from.hjdxbm = relvalue    //  所属部门团队  获奖对象
                this.from.hjdxbmID = relid    //  所属部门团队  获奖对象ID
            },
            residchildata2(e){
                this.selectTree2=false;
                // e = 28,行政中心
                const rele= e.split(',');
                const relvalue = rele[1];
                const relid = rele[0];
                this.from.OrgedID = relid    //   保管机构ID
                this.from.OrgedIDvalue = relvalue    //保管机构
            },
            residchildata3(e){
                //项目
                this.project=false;
                this.from.xm = e.PactCode   //  所属项目    获奖集体
                this.from.xmID = e.gcbid    //  所属项目      获奖集体 ID
                this.from.hjdxxm = e.gcmc   //  所属项目   获奖对象
                this.from.hjdxxmID = e.gcbid   //所属项目    获奖对象ID

            },
            // 父组件传过来的数据处理
            loaddata(){
                const relldata = this.allData;
                this.from.onlyone = relldata[1][0].xm;
                this.from.dxonlyone = relldata[1][0].xm
                this.from.bm = relldata[1][0].dyjc    //  所属部门团队
                this.from.hjdxbm = relldata[1][0].dyjc    //  所属部门团队  获奖对象

                this.from.arrayrylb = helper.ArrReduce(relldata[15],"F_Key","Caption",true);//荣誉类别
                this.from.arraydxlb = helper.ArrReduce(relldata[14],"F_Key","Caption",true);//对象类别
                this.from.arraygs = helper.ArrReduce(relldata[0],"ID","Caption",true);//法人公司

                this.from.arrayryjb = helper.ArrReduce(relldata[60],"F_Key","Caption",true);//荣誉级别
                let ID = this.openid;
                let _this = this
                if(!ID){   //新增
                }else{    //详情
                    relldata[32].forEach(function (value,index) {
                        let lsh = value.lsh
                        if(lsh==ID){
                            _this.relvalue = value;
                            _this.from.bjsjDate = value.bfsjDate;
                            _this.from.rymc = value.rymc;
                            _this.from.bjzzqc = value.bjzzqc;

                            _this.from.honID = ID

                            _this.from.indexdxlb = helper.indexforeach(_this.from.arraydxlb,value.dxlb,"lable");
                            _this.bindPickerChangedxlb("",_this.from.indexdxlb);


                            _this.from.bm = value.hjdx;    //  所属部门团队
                            _this.from.hjdxbm = value.hjdx;    //  所属部门团队  获奖对象
                            _this.from.hjdxxm = value.hjdx;    //  所属项目团队  获奖对象
                            _this.from.xm = value.htbh;    //  所属项目团队  获奖对象
                            _this.from.zsbh = value.zsbh||'';    //  证书编号
                            _this.from.bgGoalID = value.bgGoalID;  //保管个人

                            _this.from.bgGoalIDvalue = value.djryCap;  //保管个人 名字

                            _this.from.OrgedID = value.bgGoalID;  //保管机构id
                            _this.from.OrgedIDvalue = value.bgDeptCaption||value.bgCaption||"";  //保管机构 文本
                            if(value.bgGoalID){
                                _this.departmentID2 = value.bgGoalID;
                            }

                            if(value.goalID){
                                _this.departmentID = value.goalID;
                            }
                            _this.from.hjdxgs = value.hjdx;   //法人公司
                            if((value.goalID)&&(value.goalID)<20){   //法人公司   由于 之前传的错误数据  所以得<20
                                _this.from.indexgs = helper.indexforeach(_this.from.arraygs,value.goalID,"lable");
                            }
                            if(value.rylb){   //荣誉类别
                                _this.from.indexrylb = helper.indexforeach(_this.from.arrayrylb,value.rylb,"lable");
                            }
                            if(value.ryjb){  //荣誉级别
                                _this.from.indexryjb = helper.indexforeach(_this.from.arrayryjb,value.ryjb,"lable");
                            }
                            if(value.yjbgd){  //原件保管
                                _this.from.indexyjbgd = helper.indexforeach(_this.from.arrayyjbgd,value.yjbgd,"lable");
                                _this.bindPickerChangeyjbgd('',_this.from.indexyjbgd );
                            }
                            _this.haveImageUpdate = false;
                            _this.haveImg = true;
                            _this.detailFile(_this,lsh,"荣誉奖项",'荣誉奖项','手机荣誉奖项上传','ryjxxxb')
                        }
                    });
                }

            },

            //详情图片文件
            async detailFile(_this,ID,Keyed,Keys,source,module,){
                const [err, data] = await helper.req({
                    uri: '/Execute',
                    data: {
                        path: 'hr/managelist/mobile/ImageList.txt',
                        ID:ID,
                        Keyed:Keyed,
                        module:module,
                        Keys:Keys,
                        source:source,
                        manageID: _this.ygbh,
                    }
                })
                if(data) {
                    let reltable = data.tables;
                    _this.haveImg = true;  //有数据显示删除按钮
                    _this.imageSrc = [];
                    _this.imageSrcbig = [];
                    for (let i = 0; i < reltable[0].length; i++) {
                        let relimagesrc = helper.filePreviewSrc(reltable[0][i].FullPath, 's');
                        let relimagesrcbig = helper.filePreviewSrc(reltable[0][i].FullPath, 'l');
                        let relimageID = reltable[0][i].ID;
                        let obj = {};
                        obj.path = relimagesrc;
                        obj.ID = relimageID;
                        _this.imageSrc.push(obj)
                        _this.imageSrcbig.push(relimagesrcbig)
                    }
                }
            },
            //上传图片文件
            fileUpload(){
                const _this = this;
                _this.haveImageUpdate = true;
                _this.haveImg = false;
                helper.uploadImage(_this,"荣誉奖项","手机荣誉奖项上传",'ryjxxxb');
            },
            //预览图片
            relshowImage(index,src){
                helper.showImage(index,src)
            },
            //  删除照片
            async delectPic(id){
                let _this = this;
                helper.fileDelete({"ID":id,db:'NewERP'})
                const [err, data] = await helper.req({
                    uri: '/Execute',
                    data: {
                        path: 'hr/managelist/mobile/deletefile.txt',
                        FileID:id,
                        db:'NewERP'
                    }
                })
                if(data){
                    _this.loaddata()
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
            //获奖日期
            bindDateChange: function(e) {
                this.from.bjsjDate = e.target.value
            },
            bindPickerChangerylb(e) {
                this.from.indexrylb = e.target.value
            },
            //  获奖对象类别
            bindPickerChangedxlb(e,indexStated) {
                let relldata = this.allData;
                let statedval;
                if(!e){
                    statedval = indexStated;
                }else {
                    this.from.indexdxlb = e.target.value;
                    statedval = this.from.indexdxlb;
                }
                this.personal = false;
                this.XMTD = false;
                this.BMTD = false;
                this.FRGS = false;

                this.from.ygbh = '';
                this.from.indexgs = 0;
                this.from.hjdxbm = '';
                this.from.hjdxxm = '';
                this.from.dxonlyone = '';
                this.from.bmID = '';
                this.from.xmID = '';
                switch(+this.from.indexdxlb){
                    case 0:  //空
                        break;
                    case 1:  //个人
                        this.personal = true;
                        this.from.ygbh = this.ygbh;
                        this.from.dxonlyone = relldata[1][0].xm
                        break;
                    case 2:  //项目团队
                        this.XMTD = true;
                        break;
                    case 3:  //部门团队
                        this.BMTD = true;
                        this.from.bm = relldata[1][0].dyjc    //  所属部门团队
                        this.from.hjdxbm = relldata[1][0].dyjc    //  所属部门团队  获奖对象
                        break;
                    case 4:  //法人公司
                        this.FRGS = true;
                        this.from.indexgs = 1;
                        break;
                    default:
                        break;
                }
            },
            bindPickerChangegs(e) {
                this.from.indexgs = e.target.value
            },
            bindPickerChangeryjb(e) {
                this.from.indexryjb = e.target.value
            },
            // 原件保管地
            bindPickerChangeyjbgd(e,indexStated) {
                let statedval;
                if(!e){
                    statedval = indexStated;
                }else {
                    this.from.indexyjbgd = e.target.value;
                    statedval = this.from.indexyjbgd;
                }
                this.bggs = false;
                this.bggr = false;

                this.from.bgGoalID = '';
                this.from.bgGoalIDvalue = '';

                switch(+statedval){
                    case 0:  //空
                        break;
                    case 1:  //公司保管
                        this.bggs = true;
                        break;
                    case 2:  //部门保管
                        this.bggs = true;
                        break;
                    case 3:  //个人保管
                        this.bggr = true;
                        this.from.bgGoalID = this.ygbh;
                        if(this.relvalue){
                            this.from.bgGoalIDvalue = (this.relvalue).djryCap
                        }else{
                            this.from.bgGoalIDvalue = (this.allData)[1][0].xm;
                        }
                        break;
                    default:
                        break;
                }

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

            //新增文本以后  添加 goalID;
            async resultUpload(){
                if(this.options.common) {
                    this.options.common.goalID = this.goalID;
                    // helper.uploadFile(this.options);
                    uni.showLoading({
                        title: '上传中',
                        mask:false
                    });
                    const [err, data] = await helper.uploadFile(this.options);
                    if (data) {
                        uni.showLoading({
                            title: '上传成功'
                        });
                        uni.hideLoading();
                    }
                }
            },
            async formSubmit(e) {
                const [fail] = await formHelper.checkfrom(this.verify,this.from);

                if(fail){

                }else{
                    const [err, data] = await helper.reqV4({
                        uri: '/Execute',
                        data: {
                            path: 'hr/managelist/mobile/addhonor.txt',
                            manageID: this.ygbh,
                            honID:this.from.honID,
                            bfsj:this.from.bjsjDate,   //颁发时间
                            rylb: this.from.indexrylb == '' ? null:this.from.arrayrylb[this.from.indexrylb].lable,
                            dxlb: this.from.indexdxlb == '' ? null:this.from.arraydxlb[this.from.indexdxlb].lable, //  对象类别
                            gs: this.from.indexgs == '' ? null:this.from.arraygs[this.from.indexgs].lable,
                            // bm:'13', // 获奖集体 部门团队  id
                            bm:this.from.bmID, // 获奖集体 部门团队  id
                            xm:this.from.xmID, // 获奖集体 项目 id
                            rymc:this.from.rymc,
                            bjzzqc:this.from.bjzzqc,
                            ryjb: this.from.indexryjb == '' ? null:this.from.arrayryjb[this.from.indexryjb].lable,
                            yjbgd:this.from.indexyjbgd == '' ? null:this.from.arrayyjbgd[this.from.indexyjbgd].lable,
                            yg:this.ygbh,  // 用户
                            hjdx:this.from.hjdxgs||this.from.hjdxbm||this.from.hjdxxm||this.from.dxonlyone,      // 获奖对象  文本
                            gc: "",  // 获奖工程   old
                            jtgc: "",  // 获奖集体项目  old
                            goalID: this.from.ygbh||this.from.hjdxgsID||this.from.hjdxbmID||this.from.hjdxxmID,   // 获奖对象 ID
                            fw:'',   // 证明介质  发文
                            jz:'',   // 证明介质  奖状
                            jb:'',   // 证明介质  奖杯
                            jp:'',   // 证明介质  奖牌
                            qt:'1',   // 证明介质  其他
                            qtjz:'',   // 证明介质 其他介质
                            SDept:'',  // 未知，必传
                            bz:'',   // 未知  备注
                            jg:'',   // 未知  机构
                            zsbh:this.from.zsbh,   // 未知  证书编号
                            source:'手机维护',
                            bgGoalID:this.from.bgGoalID||this.from.OrgedID,   // 未知  个人保管 保管id 部门id
                        }
                    })
                    const resultdata = [err,data];
                    if(this.from.honID){
                        if(this.imageSrc.length>0) {
                            this.goalID = this.from.honID;
                            this.resultUpload();
                        }
                    }else{
                        if(this.imageSrc.length>0){
                            this.goalID = data.tables[0][0].honID||data.tables[0][0].lsh;
                            this.resultUpload();
                        }
                    }
                    this.$emit("childataToresid","")
                    this.close()
                }



            },
            formReset: function(e) {
                // console.log('清空数据')
                this.close()
            },
            //删除
             deleteData(){
                const _this = this;
                const imglen = _this.imageSrc.length;
                if(imglen>0){
                    uni.showModal({
                      title:'友情提示',
                      content:'请先删除荣誉照片',
                      showCancel:false,
                    });
                }else{
                    uni.showModal({
                        title: '是否删除该荣誉？',
                        success: async function (res) {
                            if (res.confirm) {
                                const [err, data] = await helper.reqV4({
                                    uri: '/Execute',
                                    data: {
                                        path: 'hr/managelist/mobile/updatehonor.txt',
                                        manageID: _this.ygbh,
                                        dxlb:_this.from.indexdxlb == '' ? "":_this.from.arraydxlb[_this.from.indexdxlb].lable,
                                        rybID:_this.from.honID,
                                    }
                                })
                                const resultdata = [err,data];
                                _this.$emit("childataToresid","")
                                _this.close()
                            } else if (res.cancel) {

                            }
                        }
                    });


                }

            }
        },
        mounted() {
            this.loaddata();
        }
    }
</script>

<style scoped>
    .rymc-view{
        width: 90%;height: 50px;background: #ffffff;position: absolute;top: 27px;left: 5%;z-index: 999;
        border-radius: 0px 0px 5px 5px;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    }
</style>