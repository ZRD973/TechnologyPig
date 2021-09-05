<template name="TechnicalTitle" >
    <scroll-view  scroll-y class="popupbody expend_bottom" >
        <view class="popup_title_view" >
            <text class="popup_title">技术职称</text>
            <span @click="close" class="popup_close">X</span>
        </view>
        <view class="from_view">
            <form @submit="formSubmit" @reset="formReset">

                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        职称类别
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <picker @change="bindPickerChangeCategory" :value="from.indexCategory" name="Category" range-key="value"  :range="from.arrayCategory">
                            <view class="uni-input from_input from_input_before" v-if="from.indexCategory==''" >请选择</view>
                            <view class="uni-input from_input" v-else >{{reversedMessageCategory}}</view>
                        </picker>
                        <!--<input class="uni-input from_input" name="input" placeholder="职称类别" />-->
                    </view>
                </view>

                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        职称名称
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <picker @change="bindPickerChangeCateTitle" :value="from.indexCateTitle" name="CateTitle" range-key="value"  :range="from.arrayCateTitle">
                            <view class="uni-input from_input from_input_before" v-if="from.indexCateTitle==''" >请选择</view>
                            <view class="uni-input from_input" v-else >{{reversedMessageCateTitle}}</view>
                        </picker>
                    </view>
                </view>

                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        专业
                    </view>
                    <view class="from_right">
                        <!--<picker @change="bindPickerChangeRCBG" :value="indexRCBG" name="workplace" range-key="value"  :range="arrayRCBG">-->
                        <!--<view class="uni-input" v-if="indexRCBG==''" >请选择</view>-->
                        <!--<view class="uni-input" v-else >{{arrayRCBG[indexRCBG].value}}</view>-->
                        <!--</picker>-->
                        <input class="uni-input from_input" name="Major" v-model="from.Major" placeholder="专业" />
                    </view>
                </view>

                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        发证机构
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <!--<picker @change="bindPickerChangeRCBG" :value="indexRCBG" name="workplace" range-key="value"  :range="arrayRCBG">-->
                        <!--<view class="uni-input" v-if="indexRCBG==''" >请选择</view>-->
                        <!--<view class="uni-input" v-else >{{arrayRCBG[indexRCBG].value}}</view>-->
                        <!--</picker>-->
                        <input class="uni-input from_input" name="Fzjg" v-model="from.Fzjg" placeholder="发证机构" />
                    </view>
                </view>

                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        发证时间
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <picker mode="date" :value="from.Fzrq" :start="startDate" name="Fzrq" :end="endDate" @change="bindDateChange">
                            <view class="uni-input from_input from_input_before" v-if="from.Fzrq==''" >发证时间</view>
                            <view class="uni-input from_input" v-else >{{from.Fzrq}}</view>
                        </picker>
                    </view>
                </view>

                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        证书编号
                    </view>
                    <view class="from_right">
                        <input class="uni-input from_input" name="Zsbh" v-model="from.Zsbh" placeholder="证书编号" />
                    </view>
                </view>

                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        评审委员会
                    </view>
                    <view class="from_right">
                        <input class="uni-input from_input" name="Committee" v-model="from.Committee" placeholder="评审委员会" />
                    </view>
                </view>

                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        钢印单位全称
                    </view>
                    <view class="from_right">
                        <textarea class="uni-input from_input from_textarea" name="EmbossedOrg" v-model="from.EmbossedOrg" placeholder="钢印单位全称" />
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
                haveImageUpdate:false,
                haveImage:true,
                haveImg:false,
                textInput:false,
                textInputButton:true,
                searchImg: '../../static/uploatImg.png',
                from:{
                    techID:'',
                    indexCategory:'',
                    arrayCategory:[],
                    indexCateTitle:'',
                    arrayCateTitle:[],
                    Major:'',
                    Fzjg:'',
                    Fzrq:'',
                    Zsbh:'',
                    EmbossedOrg:'',
                    Committee:'',
                    Memo:'',
                },
                verify:{
                    indexCategory:[{type:'notEmptyAndZero',message:'请选择职称类别',}],
                    indexCateTitle:[{type:'notEmptyAndZero',message:'请选择职称名称'}],
                    Fzjg:[{type:'required',message:'请输入发证机构'}],
                    Fzrq:[{type:'required',message:'请选择发证时间'}],
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
            reversedMessageCategory(){
                if(!this.from.indexCategory){
                    this.from.indexCategory = 0;
                }
                return _.get(this.from.arrayCategory,`[${this.from.indexCategory}].value`)
            },
            reversedMessageCateTitle(){
                if(!this.from.indexCateTitle){
                    this.from.indexCateTitle = 0;
                }
                return _.get(this.from.arrayCateTitle,`[${this.from.indexCateTitle}].value`)
            },
        },
        methods: {
            // 父组件传过来的数据处理
            loaddata(){
                let relldata = this.allData;
                this.from.arrayCategory = helper.ArrReduce(relldata[40],"F_Key","Caption",true); // 职称类别
                this.from.arrayCateTitle = helper.ArrReduce(relldata[37],"F_Key","Caption",true); // 职称名称

                let ID = this.openid;
                let _this = this
                if(!ID){   //新增

                }else{    //详情
                    relldata[41].forEach(function (value,index) {
                        let relID = value.ID

                        if(relID==ID){
                            _this.from.Major = value.Major;
                            _this.from.Fzjg = value.Fzjg;
                            _this.from.Fzrq = value.Fzrq;
                            _this.from.Zsbh = value.Zsbh;
                            _this.from.EmbossedOrg = value.EmbossedOrg;
                            _this.from.Committee = value.Committee;
                            _this.from.Memo = value.Memo;

                            _this.from.techID = ID;

                            _this.from.indexCategory = helper.indexforeach(_this.from.arrayCategory,value.Category,"lable")
                            _this.from.indexCateTitle = helper.indexforeach(_this.from.arrayCateTitle,value.CateTitle,"lable")

                             _this.haveImageUpdate = false;
                            _this.haveImg = true;
                            _this.detailFile(_this,relID,"职称证书","职称证书","手机职称证书上传",'P_Technicaltitle')
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
                            _this.imageSrc.push(obj);
                            _this.imageSrcbig.push(relimagesrcbig);
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
                helper.uploadImage(_this,"职称证书","手机职称证书上传",'P_Technicaltitle');
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
            //发证时间
            bindDateChange: function(e) {
                this.from.Fzrq = e.target.value
            },
            bindPickerChangeCategory(e){
                this.from.indexCategory = e.target.value
            },
            bindPickerChangeCateTitle(e){
                this.from.indexCateTitle = e.target.value
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
                            path: 'hr/managelist/mobile/addtechnical.txt',
                            manageID: this.ygbh,
                            techID: this.from.techID,
                            Category:this.from.indexCategory == '' ? null:this.from.arrayCategory[this.from.indexCategory].lable,
                            CateTitle:this.from.indexCateTitle == '' ? null:this.from.arrayCateTitle[this.from.indexCateTitle].lable,
                            Major: this.from.Major,
                            Fzjg: this.from.Fzjg,
                            Fzrq: this.from.Fzrq,
                            Zsbh: this.from.Zsbh,
                            EmbossedOrg: this.from.EmbossedOrg,
                            Committee: this.from.Committee,
                            Memo: this.from.Memo,
                        }
                    })
                    const resultdata = [err,data];
                    if(this.from.techID){
                        // if(this.fileoption){
                        //     this.textUpload(this.from.techID);
                        // }
                        if(this.imageSrc.length>0) {
                            this.goalID = this.from.techID;
                            this.resultUpload();
                        }
                    }else{
                        if(this.imageSrc.length>0) {
                            this.goalID = data.tables[0][0].techID;
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
            //             'keys':"职称证书",
            //             'module':'P_Technicaltitle',
            //         },
            //     }
            //
            //
            // }
            // _this.$refs.input.$el.appendChild(input)
        }

    }
</script>

<style scoped>
    .input{
        max-width: 200px;margin: auto;
    }
.from_textarea {
    height: 50px !important;
}
</style>