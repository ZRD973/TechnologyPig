<template name="academic" >
    <scroll-view  scroll-y class="popupbody" >
        <view class="popup_title_view" >
            <text class="popup_title">学位</text>
            <span @click="close" class="popup_close">X</span>
        </view>
        <view class="from_view">
            <form @submit="formSubmit" @reset="formReset">
                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        学校名称
                    </view>
                    <view class="from_right">
                        <input v-if="Notabdata" class="uni-input from_input" name="xxmc2" v-model="from.xxmc2" placeholder="" />
                        <picker v-if="tabdata" @change="bindPickerChangeXXMC" :value="from.indexXXMC" name="xxmc" range-key="value"  :range="from.arrayXXMC">
                            <view class="uni-input from_input from_input_before" v-if="from.indexXXMC==''" >请选择</view>
                            <view class="uni-input from_input" v-else >{{reversedMessageXXMC}}</view>
                        </picker>
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        所学专业
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <input v-if="Notabdata" class="uni-input from_input" name="sxzy2" v-model="from.sxzy2" placeholder="" />
                        <picker v-if="tabdata" @change="bindPickerChangeSXZY" :value="from.indexSXZY" name="sxzy" range-key="value"  :range="from.arraySXZY">
                            <view class="uni-input from_input from_input_before" v-if="from.indexSXZY==''" >请选择</view>
                            <view class="uni-input from_input" v-else >{{reversedMessageSXZY}}</view>
                        </picker>
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        学位
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <!--<input class="uni-input from_input" name="input" placeholder="" />-->
                        <picker v-if="tabdata" @change="bindPickerChangeXW" :value="from.indexXW" name="xw" range-key="value"  :range="from.arrayXW">
                            <view class="uni-input from_input from_input_before" v-if="from.indexXW==''" >请选择</view>
                            <view class="uni-input from_input" v-else >{{reversedMessageXW}}</view>
                        </picker>
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        学位名称
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <!--<input class="uni-input from_input" name="input" placeholder="" />-->
                        <picker v-if="tabdata" @change="bindPickerChangeXWMC" :value="from.indexXWMC" name="XWMC" range-key="value"  :range="from.arrayXWMC">
                            <view class="uni-input from_input from_input_before" v-if="from.indexXWMC==''" >请选择</view>
                            <view class="uni-input from_input" v-else >{{reversedMessageXWMC}}</view>
                        </picker>
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        评定主席
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <input class="uni-input from_input" name="xwpdwyhzx" v-model="from.xwpdwyhzx" placeholder="请选择" />
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        证书编号
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <input class="uni-input from_input" name="zsbh" v-model="from.zsbh" placeholder="请选择" />
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        发证时间
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <!--<input class="uni-input from_input" name="input" placeholder="" />-->
                        <picker mode="date" :value="from.fzrq" :start="startDate" name="fzrq" :end="endDate" @change="bindDateChange">
                            <!--<view class="uni-input from_input">{{ccslsj}}</view>-->
                            <view class="uni-input from_input from_input_before" v-if="from.fzrq==''" >发证时间</view>
                            <view class="uni-input from_input" v-else >{{from.fzrq}}</view>
                        </picker>
                    </view>
                </view>
                <!--<view class="uni-form-item uni-column from_line_view">-->
                    <!--<view class="from_left">-->
                        <!--附件上传-->
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
                                    <image class="fileImage" :src="item.path"  @click="relshowImage(index,imageSrcbig)" ></image>
                                </view>
                            </view>
                        </view>
                        <image v-if="haveImage" class="uploadimg" @click="fileUpload" :src="searchImg" ></image>
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
                haveImageUpdate:false,
                haveImage:true,
                haveImg:false,
                searchImg: '../../static/uploatImg.png',
                date: currentDate,
                Notabdata:true,
                tabdata:false,
                from:{
                    xwID: '',
                    xxmc2:'',
                    sxzy2:'',
                    indexXXMC:'',
                    arrayXXMC:[],
                    indexSXZY:'',
                    arraySXZY:[],
                    indexXW:'',
                    arrayXW:[],
                    indexXWMC:'',
                    arrayXWMC:[],
                    xwpdwyhzx:'',
                    zsbh:'',
                    fzrq:'',

                },
                verify:{
                    indexSXZY:[{type:'notEmptyAndZero',message:'所学专业不能为空',}],
                    indexXW:[{type:'notEmptyAndZero',message:'请选择学位'}],
                    indexXWMC:[{type:'notEmptyAndZero',message:'请选择学位名称'}],
                    xwpdwyhzx:[{type:'required',message:'请输入评定主席'}],
                    zsbh:[{type:'required',message:'请输入证书编号'}],
                    fzrq:[{type:'required',message:'请选择发证时间'}],
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

            reversedMessageXXMC(){
                if(!this.from.indexXXMC){
                    this.from.indexXXMC = 0;
                }
                // return this.from.arrayXXMC[this.from.indexXXMC].value
                return _.get(this.from.arrayXXMC,`[${this.from.indexXXMC}].value`)
            },
            reversedMessageSXZY(){
                if(!this.from.indexSXZY){
                    this.from.indexSXZY = 0;
                }
                // return this.from.arraySXZY[this.from.indexSXZY].value
                return _.get(this.from.arraySXZY,`[${this.from.indexSXZY}].value`)
            },
            reversedMessageXW(){
                if(!this.from.indexXW){
                    this.from.indexXW = 0;
                }
                return _.get(this.from.arrayXW,`[${this.from.indexXW}].value`)
            },
            reversedMessageXWMC(){
                if(!this.from.indexXWMC){
                    this.from.indexXWMC = 0;
                }
                return _.get(this.from.arrayXWMC,`[${this.from.indexXWMC}].value`)
            },
        },
        methods: {
            // 父组件传过来的数据处理
           async loaddata(){
                let relldata = this.allData;

                this.from.arrayXW = helper.ArrReduce(relldata[8],"F_Key","Caption",true);//学位
                this.from.arrayXWMC = helper.ArrReduce(relldata[59],"F_Key","Caption",true);//学位

                //如果有学历了
                if(!relldata[27]){
                    this.Notabdata=true
                    this.tabdata=false
                }else{
                    this.Notabdata=false
                    this.tabdata=true
                    await this.select();
                }

                let ID = this.openid;
                let _this = this
                if(!ID){   //新增

                }else{    //详情
                    relldata[28].forEach(function (value,index) {
                        let lsh = value.lsh
                        if(lsh==ID){
                            _this.from.xxmc2 = value.xxmc2;
                            _this.from.sxzy2 = value.sxzy2;
                            _this.from.xwpdwyhzx = value.xwpdwyhzx;
                            _this.from.zsbh = value.zsbh;
                            _this.from.fzrq = value.fzrq;
                            _this.from.xwID = ID;

                            _this.Notabdata=false;
                            _this.tabdata=true;

                            _this.haveImageUpdate = false;
                            _this.haveImg = true;
                            _this.detailFile(_this,lsh,"学位证","学位","手机学位上传",'xwzsb')

                            _this.from.indexXXMC = helper.indexforeach(_this.from.arrayXXMC,value.xxmc,'value')
                            _this.from.indexSXZY = helper.indexforeach(_this.from.arraySXZY,value.sxzy,'value')
                            _this.from.indexXW = helper.indexforeach(_this.from.arrayXW,value.xw+"",'lable')
                            _this.from.indexXWMC = helper.indexforeach(_this.from.arrayXWMC,value.xwmc,'value')
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
                helper.uploadImage(_this,"学位",'手机学位上传','xwzsb');
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
                this.popup.close();
                this.XWXX = false;
                this.popFlag = false
                this.$emit('closePopup',this.popFlag)
            },
            changeType(type){
                this.$emit("pChangeType")
            },
            bindPickerChangeXXMC(e){
                this.from.indexXXMC = e.target.value
            },
            bindPickerChangeSXZY(e){
                this.from.indexSXZY = e.target.value
            },
            bindPickerChangeXW(e){
                this.from.indexXW = e.target.value
            },
            bindPickerChangeXWMC(e){
                this.from.indexXWMC = e.target.value
            },
            //发证时间
            bindDateChange(e) {
                this.from.fzrq = e.target.value
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
            //学校 专业 下拉
            async select() {
                // console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
                // console.log(e)
                //  alert(this.ygbh)   //我是父组件传过来的值

                const [err, data] = await helper.req({
                    uri: '/Execute',
                    data: {
                        path: 'hr/managelist/mobile/xllist.txt',
                        manageID: this.ygbh,
                    }
                })
                const resultdata = [err,data];
                const relldata = resultdata[1].tables[0]
                this.from.arrayXXMC = this.ArrReduceAca(relldata,"lsh","Caption",true);//学校
                this.from.arraySXZY = this.ArrReduceAca(relldata,"lsh","sxzy",true);//专业
            },
            // 学校 专业 下拉数组重构
            ArrReduceAca(arr,lable='lsh',value='Caption',flag=false){
                const relarr =  arr.reduce((sum,Val,Valindex)=>{
                    sum.push({
                        "lable": Val[lable],
                        "value": Val[value]
                    })
                    return sum
                },flag?[
                    {
                        "lable": '',
                        "value": "请选择"
                    }
                ]:[])
                relarr[relarr.length] = {
                    "lable": '其他',
                    "value": "其他"
                }
                return relarr
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
                // console.log(e)
                //  alert(this.ygbh)   //我是父组件传过来的值
                const [fail] = await formHelper.checkfrom(this.verify,this.from);

                if(fail){

                }else{
                    const [err, data] = await helper.reqV4({
                        uri: '/Execute',
                        data: {
                            path: 'hr/managelist/mobile/addacademic.txt',
                            manageID: this.ygbh,
                            xwID:this.from.xwID,
                            xxmc:this.from.indexXXMC == '' ? null:this.from.arrayXXMC[this.from.indexXXMC].value,
                            sxzy:this.from.indexSXZY == '' ? null:this.from.arraySXZY[this.from.indexSXZY].value,
                            xxmc2:this.from.xxmc2,
                            sxzy2:this.from.sxzy2,
                            xw:this.from.indexXW == '' ? null:this.from.arrayXW[this.from.indexXW].lable,
                            xwmc:this.from.indexXWMC == '' ? null:this.from.arrayXWMC[this.from.indexXWMC].value,
                            xwpdwyhzx:this.from.xwpdwyhzx,
                            zsbh:this.from.zsbh,
                            fzrq:this.from.fzrq,
                        }
                    })
                    const resultdata = [err,data];

                    if(this.from.xwID){
                        if(this.imageSrc.length>0) {
                            this.goalID = this.from.xwID;
                            this.resultUpload();
                        }
                    }else{
                        if(this.imageSrc.length>0) {
                            this.goalID = data.tables[0][0].xwID;
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