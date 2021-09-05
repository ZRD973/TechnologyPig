<template name="Car" >
    <scroll-view  scroll-y class="popupbody expend_bottom" >
        <view class="popup_title_view" >
            <text class="popup_title">车辆信息</text>
            <span @click="close" class="popup_close">X</span>
        </view>
        <view class="from_view">
            <form @submit="formSubmit" @reset="formReset">

                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        车牌号
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">

                        <picker class="car_picker" @change="bindPickerChangecity" :value="from.indexcity" name="workplace" range-key="value"  :range="from.arraycity">
                            <view class="uni-input from_input from_input_before" v-if="from.indexcity==''" >--</view>
                            <view class="uni-input from_input" v-else >{{reversedMessagecity}}</view>
                        </picker>
                        <picker class="car_picker" @change="bindPickerChangeCar" :value="from.indexCar" name="workplace" range-key="value"  :range="from.arrayCar">
                            <view class="uni-input from_input from_input_before" v-if="from.indexCar==''" >--</view>
                            <view class="uni-input from_input from_input_before" v-else >{{reversedMessageCar}}</view>
                        </picker>
                        <view style="width: 100px;height: 100%;text-align:center;float:left;margin-left:5px; " >
                            <input class="uni-input from_input picker-input-view" name="license" v-model="from.license" placeholder="数字或字母" />
                        </view>
                    </view>
                </view>

                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        车辆所有人
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <input class="uni-input from_input" name="Holder" v-model="from.Holder" placeholder="车辆所有人" />
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        产权性质
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <picker @change="bindPickerChangeNature" :value="from.indexNature" name="Nature" range-key="value"  :range="from.arrayNature">
                            <view class="uni-input from_input from_input_before" v-if="from.indexNature==''" >请选择</view>
                            <view class="uni-input from_input" v-else >{{reversedMessageNature}}</view>
                        </picker>
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        使用性质
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <picker @change="bindPickerChangepubliccar" :value="from.indexpubliccar" name="publiccar" range-key="value"  :range="from.arraypubliccar">
                            <view class="uni-input from_input from_input_before" v-if="from.indexpubliccar==''" >请选择</view>
                            <view class="uni-input from_input" v-else >{{reversedMessagepubliccar}}</view>
                        </picker>
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        车辆类型
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <picker @change="bindPickerChangeType" :value="from.indexType" name="Type" range-key="value"  :range="from.arrayType">
                            <view class="uni-input from_input from_input_before" v-if="from.indexType==''" >请选择</view>
                            <view class="uni-input from_input" v-else >{{reversedMessageType}}</view>
                        </picker>
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        实际用车人
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <input class="uni-input from_input" @click="hongboopen()" placeholder="点击选择用车人" name="ActualUser" :value="from.ActualUser" :title="from.ActualUserID"  />
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        维修保养
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <picker @change="bindPickerChangeRepair" :value="from.indexRepair" name="Repair" range-key="value"  :range="from.arrayRepair">
                            <view class="uni-input from_input from_input_before" v-if="from.indexRepair==''" >请选择</view>
                            <view class="uni-input from_input" v-else >{{reversedMessageRepair}}</view>
                        </picker>
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        驾驶行驶证
                    </view>
                    <view class="from_right" id="fildnav">
                        <!--<view v-if="imageSrc.length>0" class="image_view">-->
                            <!--<image class="fileImage" v-for="(item,index) in imageSrc" :key="index" :src="item" @click="relshowImage(index,imageSrcbig)" ></image>-->
                        <!--</view>-->
                        <!--&lt;!&ndash;<image v-if="haveImage" class="uploadimg" style="width: 40px;height: 30px;display: block;margin-left: 30upx;" :src="searchImg" ></image>&ndash;&gt;-->
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
                        <button form-type="submit" class="from_submit">保存</button>
                        <button type="default" form-type="reset" class="from_reset">取消</button>
                    </view>
                </view>
            </form>
        </view>
        <view class="hongbo_open" v-if="userpopupopen" >
            <view class="hongbo_open_view" >
                <span class="hongbo_close" @click="hongboclose">X</span>
                <user-people @childataToresid="residchildata" :userpopupopen="userpopupopen"  class="WH100" ></user-people>
            </view>
        </view>

    </scroll-view>
</template>

<script>
    import helper from '../../lib/helper';
    import formHelper from '../../lib/formHelper';
    import uniPopup from '../../components/uni-popup/uni-popup.vue';
    import userPeople from '../../components/hongbo/userpeople.vue';
    import _ from 'lodash';

    export default {
        components:{
            uniPopup,userPeople
        },
        data() {

            const currentDate = this.getDate({
                format: true
            })
            return {
                haveImageUpdate:false,
                haveImage:true,
                haveImg:false,
                searchImg: '../../static/uploatImg.png',
                userpopupopen:false,
                date: currentDate,
                from:{
                    carID:'',
                    ActualUser:'',
                    ActualUserID:'',
                    indexcity:'',
                    arraycity:[],
                    indexCar:'',
                    arrayCar:[
                        {value:'- -',lable:''},{value:'A',lable:'A'},{value:'B',lable:'B'},{value:'C',lable:'C'},
                        {value:'D',lable:'D'},{value:'E',lable:'E'},{value:'F',lable:'F'},{value:'G',lable:'G'},
                        {value:'H',lable:'H'},{value:'I',lable:'I'},{value:'J',lable:'J'},{value:'K',lable:'K'},
                        {value:'L',lable:'L'},{value:'M',lable:'M'},{value:'N',lable:'N'},{value:'O',lable:'O'},
                        {value:'P',lable:'P'},{value:'Q',lable:'Q'},{value:'R',lable:'R'},{value:'S',lable:'S'},
                        {value:'T',lable:'T'},{value:'U',lable:'U'},{value:'V',lable:'V'},{value:'W',lable:'W'},
                        {value:'X',lable:'X'},{value:'Y',lable:'Y'},{value:'Z',lable:'Z'}
                    ],
                    license:'',
                    Holder:'',  //车辆所有人
                    indexNature:'',
                    arrayNature:[],
                    indexpubliccar:'',
                    arraypubliccar:[
                        {lable:'',value:'请选择'},{lable:'1',value:'私车，平时使用人自己开'},{lable:'2',value:'公车，长借部门项目或个人'},
                        // {lable:'3',value:'公车，平时停放公司，商务用途'},
                        {lable:'4',value:'其它未定义'},
                    ],
                    indexType:'',
                    arrayType:[],
                    indexRepair:'',
                    arrayRepair:[
                        {lable:'',value:'请选择'},{lable:'1',value:'用车人自行负责'},{lable:'2',value:'办公室统管代管'},
                    ],
                },
                verify:{
                    indexcity:[{type:'notEmptyAndZero',message:'请正确输入车牌号',}],
                    indexCar:[{type:'notEmptyAndZero',message:'请正确输入车牌号',}],
                    license:[{type:'required',message:'请正确输入车牌号',}],
                    Holder:[{type:'required',message:'车辆所有人',}],
                    indexNature:[{type:'notEmptyAndZero',message:'请选择产权性质',}],
                    indexpubliccar:[{type:'notEmptyAndZero',message:'请选择使用性质',}],
                    indexType:[{type:'notEmptyAndZero',message:'请选择车辆类型',}],
                    ActualUser:[{type:'required',message:'请选择实际用车人',}],
                    indexRepair:[{type:'notEmptyAndZero',message:'请选择维修保养人',}],
                },
                imageSrc:[],
                imageSrcbig:[],
                options:{},
                goalID:'',

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
            reversedMessagecity(){
                if(!this.from.indexcity){
                    this.from.indexcity = 0;
                }
                return _.get(this.from.arraycity,`[${this.from.indexcity}].value`)
            },
            reversedMessageCar(){
                if(!this.from.indexCar){
                    this.from.indexCar = 0;
                }
                return _.get(this.from.arrayCar,`[${this.from.indexCar}].value`)
            },
            reversedMessageNature(){
                if(!this.from.indexNature){
                    this.from.indexNature = 0;
                }
                return _.get(this.from.arrayNature,`[${this.from.indexNature}].value`)
            },
            reversedMessagepubliccar(){
                if(!this.from.indexpubliccar){
                    this.from.indexpubliccar = 0;
                }
                return _.get(this.from.arraypubliccar,`[${this.from.indexpubliccar}].value`)
            },
            reversedMessageType(){
                if(!this.from.indexType){
                    this.from.indexType = 0;
                }
                return _.get(this.from.arrayType,`[${this.from.indexType}].value`)
            },
            reversedMessageRepair(){
                if(!this.from.indexRepair){
                    this.from.indexRepair = 0;
                }
                return _.get(this.from.arrayRepair,`[${this.from.indexRepair}].value`)
            },

        },
        methods: {
            hongboopen(){
                this.userpopupopen = true;
            },
            hongboclose(){
                this.userpopupopen = false;
            },
            // 子组件 传过来的值
            residchildata(e){
                this.userpopupopen=false;
                this.from.ActualUserID = e.ID
                this.from.ActualUser = e.Name
            },

            // 父组件传过来的数据处理
            loaddata(){
                const relldata = this.allData;
                this.from.arraycity = helper.ArrReduce(relldata[10],"NICKNAME","NICKNAME",true);//车牌所在城市
                this.from.arrayNature = helper.ArrReduce(relldata[62],"F_Key","Caption",true);//产权性质
                this.from.arrayType = helper.ArrReduce(relldata[61],"F_Key","Caption",true);//车辆类型
                // this.from.ActualUser = relldata[1][0].xm   实际用车人
                let ID = this.openid;
                let _this = this
                if(!ID){   //新增
                }else{    //详情
                    relldata[33].forEach(function (value,index) {
                        let relID = value.ID

                        if(relID==ID){
                            let rellicense = value.License;
                            _this.from.indexcity = helper.indexforeach(_this.from.arraycity,rellicense.substring(0,1),"value")||'';
                            _this.from.indexCar = helper.indexforeach(_this.from.arrayCar,rellicense.substring(1,2),"lable")||'';
                            _this.from.license = rellicense.substring(2)||''

                            _this.from.carID = ID||'';
                            _this.from.Holder = value.Holder||'';
                            _this.from.ActualUserID =value.ActualUser||''
                            _this.from.ActualUser =value.Name||''
                            _this.from.indexNature = helper.indexforeach(_this.from.arrayNature,value.Nature,"lable")||'';
                            _this.from.indexpubliccar = helper.indexforeach(_this.from.arraypubliccar,value.publiccar,"lable")||'';
                            _this.from.indexType = helper.indexforeach(_this.from.arrayType,value.Type,"lable")||'';
                            _this.from.indexRepair = helper.indexforeach(_this.from.arrayRepair,value.Repair,"lable")||'';

                            _this.haveImageUpdate = false;
                            _this.haveImg = true;
                            _this.detailFile(_this,relID,"车辆","车辆","手机车辆上传",'P_carrecord')
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
                uni.showModal({
                    title: '上传证件',
                    content: '注意！驾驶证，行驶证均要上传！',
                    success: function (res) {
                        if (res.confirm) {
                            helper.uploadImage(_this,"车辆","手机车辆上传",'P_carrecord');
                        } else if (res.cancel) {
                            console.log('用户点击取消');
                        }
                    }
                });



            },
            //大图
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
            changeType(type){
                this.$emit("pChangeType")
            },
            //车牌
            bindPickerChangeCar(e){
                this.from.indexCar = e.target.value
            },
            bindPickerChangecity(e){
                this.from.indexcity = e.target.value
            },
            bindPickerChangeNature(e){
                this.from.indexNature = e.target.value
            },
            bindPickerChangepubliccar(e){
                this.from.indexpubliccar = e.target.value
            },
            bindPickerChangeType(e){
                this.from.indexType = e.target.value
            },
            bindPickerChangeRepair(e){
                this.from.indexRepair = e.target.value
            },

            //申领时间
            bindDateChange(e) {
                this.date = e.target.value
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
                // console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
                const [fail] = await formHelper.checkfrom(this.verify,this.from);

                if(fail){

                }else{
                    const [err, data] = await helper.reqV4({
                        uri: '/Execute',
                        data: {
                            path: 'hr/managelist/mobile/addvehicle.txt',
                            manageID: this.ygbh,
                            carID: this.from.carID,
                            License: this.from.arraycity[this.from.indexcity].lable + this.from.arrayCar[this.from.indexCar].lable + this.from.license,
                            Holder:this.from.Holder,
                            Nature:this.from.indexNature == '' ? null:this.from.arrayNature[this.from.indexNature].lable,
                            publiccar:this.from.indexpubliccar == '' ? null:this.from.arraypubliccar[this.from.indexpubliccar].lable,
                            Type:this.from.indexType == '' ? null:this.from.arrayType[this.from.indexType].lable,
                            Repair:this.from.indexRepair == '' ? null:this.from.arrayRepair[this.from.indexRepair].lable,
                            ActualUser:this.from.ActualUserID,  //用车人id

                        }
                    })
                    const resultdata = [err,data];
                    if(this.from.carID){
                        if(this.imageSrc.length>0) {
                            this.goalID = this.from.carID;
                            this.resultUpload();
                        }
                    }else{
                        if(this.imageSrc.length>0){
                            this.goalID = data.tables[0][0].carID;
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
            }
        },
        mounted() {
            this.loaddata();
        }

    }
</script>

<style scoped>

</style>