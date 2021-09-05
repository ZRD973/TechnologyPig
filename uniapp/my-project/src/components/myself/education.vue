<template name="education" >
    <scroll-view  scroll-y class="popupbody expend_bottom" >
        <view class="popup_title_view" >
            <text class="popup_title">学历信息</text>
            <span @click="close" class="popup_close ">X</span>
        </view>

        <view class="from_view">
                <form @submit="formSubmit" @reset="formReset" class="form">
                    <view class="form-items">
                    <view class="uni-form-item uni-column from_line_view">
                        <view class="from_left">
                            学校名称
                            <span class="Required">*</span>
                        </view>
                        <view class="from_right">
                            <input class="uni-input from_input" name="xxmc" v-model="from.xxmc" placeholder="学校名称" />
                        </view>
                    </view>
                    <view class="uni-form-item uni-column from_line_view">
                        <view class="from_left">
                            学历
                            <span class="Required">*</span>
                        </view>
                        <view class="from_right">
                            <picker @change="bindPickerChangexl" :value="from.indexxl" name="workplace" range-key="value"  :range="from.arrayxl">
                                <view class="uni-input from_input from_input_before" v-if="from.indexxl==''" >请选择</view>
                                <view class="uni-input from_input" v-else >{{reversedMessageXLval}}</view>
                            </picker>
                            <!--<span class="input_DW">年</span>-->
                        </view>
                    </view>
                    <view class="uni-form-item uni-column from_line_view">
                        <view class="from_left">
                            学制
                        </view>
                        <view class="from_right">
                            <input class="uni-input from_input" name="xz" v-model="from.xz" placeholder="学制" />
                            <span class="input_DW">年</span>
                        </view>
                    </view>
                    <view class="uni-form-item uni-column from_line_view">
                        <view class="from_left">
                            学习形式
                            <span class="Required">*</span>
                        </view>
                        <view class="from_right">
                            <picker @change="bindPickerChangexxxs" :value="from.indexxxxs" name="workplace" range-key="value"  :range="from.arrayxxxs">
                                <view class="uni-input from_input from_input_before" v-if="from.indexxxxs==''" >请选择</view>
                                <view class="uni-input from_input" v-else >{{reversedMessageXXXSval}}</view>
                            </picker>
                            <!--<input class="uni-input from_input" name="input" placeholder="请选择" />-->
                        </view>
                    </view>
                    <view class="uni-form-item uni-column from_line_view">
                        <view class="from_left">
                            所学专业
                            <span class="Required">*</span>
                        </view>
                        <view class="from_right">
                            <input class="uni-input from_input" name="sxzy" v-model="from.sxzy" placeholder="所学专业" />
                        </view>
                    </view>
                    <view class="uni-form-item uni-column from_line_view">
                        <view class="from_left">
                            校(院)长
                            <span class="Required">*</span>
                        </view>
                        <view class="from_right">
                            <input class="uni-input from_input" name="xzh" v-model="from.xzh" placeholder="校(院)长名称" />
                        </view>
                    </view>
                    <view class="uni-form-item uni-column from_line_view">
                        <view class="from_left">
                            入学时间
                            <span class="Required">*</span>
                        </view>
                        <view class="from_right">
                            <!--<input class="uni-input from_input" name="input" placeholder="入学时间" />-->
                            <picker mode="date" :value="from.qssj" :start="startDate" name="qssj" :end="endDate" @change="bindDateChange">
                                <!--<view class="uni-input from_input">{{ccslsj}}</view>-->
                                <view class="uni-input from_input from_input_before" v-if="from.qssj==''" >入学时间</view>
                                <view class="uni-input from_input" v-else >{{from.qssj}}</view>
                            </picker>
                        </view>
                    </view>
                    <view class="uni-form-item uni-column from_line_view">
                        <view class="from_left">
                            毕业时间
                            <span class="Required">*</span>
                        </view>
                        <view class="from_right">
                            <!--<input class="uni-input from_input" name="input" placeholder="毕业时间" />-->
                            <picker mode="date" :value="from.jssj" :start="startDate" name="jssj" :end="endDate" @change="bindDateChange2">
                                <!--<view class="uni-input from_input">{{ccslsj}}</view>-->
                                <view class="uni-input from_input from_input_before" v-if="from.jssj==''" >毕业时间</view>
                                <view class="uni-input from_input" v-else >{{from.jssj}}</view>
                            </picker>
                        </view>
                    </view>
                    <view class="uni-form-item uni-column from_line_view">
                        <view class="from_left">
                            证书编号
                            <span class="Required">*</span>
                        </view>
                        <view class="from_right">
                            <input class="uni-input from_input" name="zsbh" v-model="from.zsbh" placeholder="证书编号" />
                            <span class="input_DW input_DW_copy" >复制</span>
                        </view>
                    </view>
                    <view class="uni-form-item uni-column from_line_view">
                        <view class="from_left">
                            发证时间
                            <span class="Required">*</span>
                        </view>
                        <view class="from_right">
                            <!--<input class="uni-input from_input" name="input" placeholder="发证时间" />-->
                            <picker mode="date" :value="from.fzrq" :start="startDate" name="fzrq" :end="endDate" @change="bindDateChange3">
                                <!--<view class="uni-input from_input">{{ccslsj}}</view>-->
                                <view class="uni-input from_input from_input_before" v-if="from.fzrq==''" >发证时间</view>
                                <view class="uni-input from_input" v-else >{{from.fzrq}}</view>
                            </picker>
                        </view>
                    </view>
                    <view class="uni-form-item uni-column from_line_view">
                        <view class="from_left">
                            电子注册码
                            <!-- <span class="Required">*</span> -->
                        </view>
                        <view class="from_right">
                            <input class="uni-input from_input" name="dzzcm" v-model="from.dzzcm"  placeholder="电子注册码" />
                        </view>
                    </view>
                    <!--<view class="uni-form-item uni-column from_line_view">-->
                        <!--<view class="from_left">-->
                            <!--附件上传-->
                        <!--</view>-->
                        <!--<view class="from_right">-->
                            <!--<view v-if="textInput" style="text-indent:15px;color: blue; " @click="sorry">-->
                                <!--<a id="textDoc" >{{textDoc}}</a>-->
                            <!--</view>-->
                            <!--<view  v-if="textInputButton" >-->
                                <!--<view ref="input" class="input"></view>-->
                            <!--</view>-->
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
                                        <image class="fileImage" :src="item.path"></image>
                                    </view>
                                </view>
                            </view>
                            <image v-if="haveImage" class="uploadimg" @click="fileUpload" :src="searchImg" ></image>
                        </view>
                    </view>
                    </view>
                    <view class="uni-btn-v  uni-btn-my" >
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
    import formHelper from '../../lib/formHelper'
    import message from '../uni-popup/message';
    import _ from 'lodash';

    export default {
        data() {
            const currentDate = this.getDate({
                format: true
            })
            return {
                haveImageUpdate:false,
                haveImage:true,
                haveImg:false,
                textInput:false,
                textInputButton:true,
                textDoc:'',
                searchImg: '../../static/uploatImg.png',
                from:{
                    xlID:'',
                    xxmc: '',
                    indexxl: '',
                    arrayxl: [],
                    xz: '',
                    indexxxxs: '',
                    arrayxxxs: [],
                    sxzy: '',
                    xzh: '',
                    qssj: '',
                    jssj: '',
                    zsbh: '',
                    fzrq: '',
                    dzzcm: '',
                },
                verify:{
                    xxmc:[{type:'required',message:'学校名称不能为空',}],
                    indexxl:[{type:'notEmptyAndZero',message:'请选择学历'}],
                    indexxxxs:[{type:'notEmptyAndZero',message:'请选择学习形式'}],
                    sxzy:[{type:'required',message:'所学专业不能为空'}],
                    xzh:[{type:'required',message:'请输入校（院）长'}],
                    qssj:[{type:'required',message:'请选择入学时间'}],
                    jssj:[{type:'required',message:'请选择毕业时间'}],
                    zsbh:[{type:'required',message:'请输入证书编号'}],
                    fzrq:[{type:'required',message:'请选择发证时间'}],
                    // dzzcm:[{type:'required',message:'请输入电子注册码'}],
                },
                imageSrc:[],
                imageSrcbig:[],
                options:{},
                fileoption:{},
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
            reversedMessageXLval(){
                if(!this.from.indexxl){
                    this.from.indexxl = 0;
                }
                // return this.from.arrayxl[this.from.indexxl].value
                return _.get(this.from.arrayxl,`[${this.from.indexxl}].value`)
            },
            reversedMessageXXXSval(){
                if(!this.from.indexxxxs){
                    this.from.indexxxxs = 0;
                }
                // return this.from.arrayxxxs[this.from.indexxxxs].value
                return _.get(this.from.arrayxxxs,`[${this.from.indexxxxs}].value`)

            },
        },
        methods: {
            // 父组件传过来的数据处理
            loaddata(){
                let relldata = this.allData;
                this.from.arrayxl = helper.ArrReduce(relldata[6],"F_Key","Caption",true);//学历
                this.from.arrayxxxs = helper.ArrReduce(relldata[58],"F_Key","Caption",true);//学习形式

                let ID = this.openid;
                let _this = this
                if(!ID){   //新增

                }else{    //详情
                    relldata[27].forEach(function (value,index) {
                        let lsh = value.lsh
                        if(lsh==ID){
                            _this.from.xxmc = value.xxmc;
                            _this.from.xz = value.xz;
                            _this.from.sxzy = value.sxzy;
                            _this.from.xzh = value.xzh;
                            _this.from.qssj = value.qssj;
                            _this.from.jssj = value.jssj;
                            _this.from.zsbh = value.zsbh;
                            _this.from.fzrq = value.fzrq;
                            _this.from.dzzcm = value.dzzcm;

                            _this.from.xlID = ID;

                            if(value.xxxs){
                                _this.from.indexxxxs = helper.indexforeach(_this.from.arrayxxxs,value.xxxs,"lable")
                            }
                            if(value.xl){
                                _this.from.indexxl = helper.indexforeach(_this.from.arrayxl,value.xl,"lable")
                            }


                            _this.haveImageUpdate = false;
                            _this.haveImg = true;
                            _this.detailFile(_this,lsh,"毕业证",'学历','手机学历上传','xlzsb');
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
                        if(reltable[0][i].Ext==".jpg"||reltable[0][i].Ext==".png"||reltable[0][i].Ext==".gif"){
                            let relimagesrc = helper.filePreviewSrc(reltable[0][i].FullPath, 's');
                            let relimagesrcbig = helper.filePreviewSrc(reltable[0][i].FullPath, 'l');
                            let relimageID = reltable[0][i].ID;
                            let obj = {};
                            obj.path = relimagesrc;
                            obj.ID = relimageID;
                            _this.imageSrc.push(obj)
                            _this.imageSrcbig.push(relimagesrcbig)
                        }else{
                            _this.textInput = true;
                            _this.textInputButton = false;
                            _this.textDoc = reltable[0][i].Name;

                        }

                    }
                }
            },
            //上传图片文件
            fileUpload(){
                const _this = this;
                _this.haveImageUpdate = true;
                _this.haveImg = false;
                helper.uploadImage(_this,"毕业证",'手机学历上传','xlzsb');
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
            //入学时间
            bindDateChange: function(e) {
                this.from.qssj = e.target.value
            },
            //入学时间
            bindDateChange2: function(e) {
                this.from.jssj = e.target.value
            },
            //发证时间
            bindDateChange3: function(e) {
                this.from.fzrq = e.target.value
            },

            //学历
            bindPickerChangexl(e) {
                this.from.indexxl = e.target.value
            },
            //学习形式
            bindPickerChangexxxs(e) {
                this.from.indexxxxs = e.target.value
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
            async checkXzIsInteger(num,message){
                let newNum = Number(num)
               if(Math.floor(newNum) !== newNum){
                    uni.showToast({title:message,icon:'none'});
                    throw message;
               }
            },
            async formSubmit(e) {
                const [fail] = await formHelper.checkfrom(this.verify,this.from);
                await formHelper.checkDate(this.from.qssj,this.from.jssj,"毕业时间不能早于入学时间")
                await this.checkXzIsInteger(this.from.xz,"学制必须是整数")
                // console.log( typeof this.from.xz);

                if(fail){

                }else{
                    // console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
                    const [err, data] = await helper.reqV4({
                        uri: '/Execute',
                        data: {
                            path: 'hr/managelist/mobile/addeducation.txt',
                            manageID: this.ygbh,
                            xxmc: this.from.xxmc,
                            xl: this.from.indexxl == '' ? null:this.from.arrayxl[this.from.indexxl].lable,
                            xz: this.from.xz,
                            xxxs: this.from.indexxxxs  == '' ? null:this.from.arrayxxxs[this.from.indexxxxs].lable,
                            sxzy: this.from.sxzy,
                            xzh: this.from.xzh,
                            qssj: this.from.qssj,
                            jssj: this.from.jssj,
                            zsbh: this.from.zsbh,
                            fzrq: this.from.fzrq,
                            dzzcm: this.from.dzzcm,
                            xlID: this.from.xlID,
                        }
                    })
                    const resultdata = [err,data];
                    if(this.from.xlID){
                        // if(this.fileoption){
                        //     this.textUpload(this.from.xlID);
                        // }
                        if(this.imageSrc.length>0) {
                            this.goalID = this.from.xlID;
                            this.resultUpload();
                        }
                    }else{
                        if(this.imageSrc.length>0) {
                            this.goalID = data.tables[0][0].xlID;
                            this.resultUpload();
                        }
                        if(this.fileoption.filePaths){
                            this.textUpload(this.goalID);
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


            sorry(){
                uni.showModal({
                    title: 'sorry!暂时无法下载与预览',
                    success: function (res) {
                        if (res.confirm) {

                        } else if (res.cancel) {

                        }
                    }
                });
            },
            //  上传文件
            async textUpload(id){
                const _this = this;
                _this.fileoption.common.goalID = id;
                const  [err,data] = await helper.uploadFile(_this.fileoption);

            },

        },
        mounted() {
            const  _this = this;
            _this.loaddata();
            // _this.textInput = false;
            // _this.textInputButton = true;
            // const input = document.createElement('input')
            // input.type = 'file'
            // input.onchange = (event) => {
            //     const fileinfo = event.target.files[0];
            //     _this.fileoption = {
            //         filePaths:[fileinfo],
            //         data:[{
            //             "Name": fileinfo.name,
            //             "Size": fileinfo.size
            //         }],
            //         common:{
            //             'path':'hr/managelist/mobile/FileUpload.txt',
            //             'preID':_this.FolderID,
            //             'keys':"学历信息",
            //             'module':'xlzsb',
            //         },
            //     }
            //
            //
            // }
            // _this.$refs.input.$el.appendChild(input)

        }
    }
</script>

<style scoped lang="scss">
    .input{
        max-width: 200px;margin: auto;
    }
    // .from_view{
    //     //  height:800rpx;

    //     .form{
    //         display: flex;
    //         flex-direction: column;
    //         .form-items{
    //             height:740rpx;
    //             overflow:auto;
    //             flex:1;
    //         }
    //         .submit-btns{
    //             height:140rpx;
    //         }
    //     }

    // }

    </style>