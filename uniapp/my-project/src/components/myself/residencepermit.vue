<template name="residencepermit" >
    <scroll-view  scroll-y class="popupbody" >
        <view class="popup_title_view" >
            <text class="popup_title">居住证</text>
            <span @click="close" class="popup_close">X</span>
        </view>
        <view class="from_view">
            <form @submit="formSubmit" @reset="formReset">
                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        申领时间
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <!--<input class="uni-input from_input" name="input" placeholder="初次申领居住证时间" />-->
                        <picker mode="date" :value="from.ccslsj" :start="startDate" name="ccslsj" :end="endDate" @change="bindDateChange">
                            <!--<view class="uni-input from_input">{{ccslsj}}</view>-->
                            <view class="uni-input from_input from_input_before" v-if="from.ccslsj==''" >初次申领居住证时间</view>
                            <view class="uni-input from_input" v-else >{{from.ccslsj}}</view>
                        </picker>
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        有效期至
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <picker mode="date" :value="from.yxqz" :start="startDate" name="yxqz" :end="endDate" @change="bindDateChange2">
                            <!--<view class="uni-input from_input">{{yxqz}}</view>-->
                            <view class="uni-input from_input from_input_before" v-if="from.yxqz==''" >居住证有效期至</view>
                            <view class="uni-input from_input" v-else >{{from.yxqz}}</view>
                        </picker>
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        地址
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <input class="uni-input from_input" placeholder-class="form-input-placeholder" name="jzddz" v-model="from.jzddz"  placeholder="xx市xx区xxx号" />
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
                        <!--<button v-if="haveImage" class="from_buttom" @click="fileUpload">上传</button>-->
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
    // import utils from "../evan-form/utils"
    // import EvanForm from "../evan-form/evan-form";
    // import EvanFormItem from "../evan-form-item/evan-form-item";
    // import ysValidate from "../../../lib/ys-validate"
    export default {
        // components: {EvanForm,EvanFormItem},
        data() {
            const currentDate = this.getDate({
                format: true
            });
            return {
                haveImageUpdate:false,
                haveImage:true,
                haveImg:false,
                searchImg: '../../static/uploatImg.png',
                from:{
                    ccslsj: '',
                    yxqz: '',
                    jzddz: '',
                    jzID: '',
                    field: '',
                },
                verify:{
                    ccslsj:[{type:'required',message:'申领时间不能为空',}],
                    yxqz:[{type:'required',message:'有效期时间不能为空'}],
                    jzddz:[{type:'required',message:'地址不能为空'}],
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
            }
        },
        methods: {
            // 父组件传过来的数据处理
             loaddata(){
                let relldata = this.allData;
                let ID = this.openid;
                let _this = this
                if(!ID){   //新增

                }else{    //详情
                    relldata[26].forEach( function (value,index) {
                        let lsh = value.lsh
                        if(lsh==ID){
                            _this.from.ccslsj = value.ccslsj;
                            _this.from.yxqz = value.yxqz;
                            _this.from.jzddz = value.jzddz;
                            _this.from.jzID = ID;


                            _this.haveImageUpdate = false;
                            _this.haveImg = true;
                            _this.detailFile(_this,lsh,"居住证","居住证","手机居住证上传",'jzzxxb')
                        }
                    });

                }
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
                    // console.log(reltable)
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
                helper.uploadImage(_this,"居住证","手机居住证上传",'jzzxxb');
            },
            //大图
            relshowImage(index,src){
                helper.showImage(index,src)
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
            //申领时间
            bindDateChange: function(e) {
                this.from.ccslsj = e.target.value
            },
            //有效期
            bindDateChange2: function(e) {
                this.from.yxqz = e.target.value



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
                if(this.options.common){
                    this.options.common.goalID = this.goalID;
                    // helper.uploadFile(this.options);
                    uni.showLoading({
                        title:'上传中',
                        mask:false
                    });
                    const  [err,data] = await helper.uploadFile(this.options);
                    if(data){
                        uni.showLoading({
                            title:'上传成功'
                        });
                        uni.hideLoading();
                    }
                }

            },
            async formSubmit(e) {

                const [fail] = await formHelper.checkfrom(this.verify,this.from);

                await formHelper.checkDate(this.from.ccslsj,this.from.yxqz,"有效期不能早于申领时间")

                if(fail){

                }else{
                    const [err, data] = await helper.reqV4({
                        uri: '/Execute',
                        data: {
                            path: 'hr/managelist/mobile/addresidence.txt',
                            manageID: this.ygbh,
                            ccslsj:this.from.ccslsj,
                            yxqz:this.from.yxqz,
                            jzddz:this.from.jzddz,
                            jzID: this.from.jzID,
                        }
                    })
                    const resultdata = [err,data];
                    if(this.from.jzID){
                        if(this.imageSrc.length>0) {
                            this.goalID = this.from.jzID;
                            this.resultUpload();
                        }
                    }else{
                        if(this.imageSrc.length>0){
                            this.goalID = data.tables[0][0].jzID;
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