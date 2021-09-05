<template name="CardBag" >
    <scroll-view  scroll-y class="popupbody expend_bottom" >
        <view class="popup_title_view" >
            <text class="popup_title">卡包</text>
            <span @click="close" class="popup_close">X</span>
        </view>
        <view class="view_warning" >
            告知：*银行卡关系你今后领取工资，报销等工作，请填报准确，及时上传银行卡复印件，复印件本人签名！
        </view>
        <view class="from_view">
            <form @submit="formSubmit" @reset="formReset">
                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        姓名
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <input class="uni-input from_input myself_disabled" style="" disabled name="xm" :value="from.xm" />
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        银行类别
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right " >
                        <!--<input class="uni-input from_input" name="youxiaotime" placeholder="请选择" />-->
                        <picker @change="bindPickerChangekhyh" :disabled="disables.bankType" :value="from.indexkhyh" name="khyh" range-key="value"  :range="from.arraykhyh">
                            <view :class="['uni-input', disables.bankType?'myself_disabled':'' ,'from_input', 'from_input_before']" v-if="from.indexkhyh==''" >请选择</view>
                            <view :class="['uni-input','from_input',disables.bankType?'myself_disabled':'']" v-else >{{reversedMessagekhyh}}</view>
                        </picker>
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        开户行
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <input :class="['uni-input','from_input',disables.depositBank?'myself_disabled':'']" name="khhqc" :disabled="disables.depositBank" v-model="from.khhqc" placeholder="准确全称" />
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        账户(卡)号
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <input :disabled="disables.account" :class="['uni-input','from_input',disables.account?'myself_disabled':'']" name="zhkh" v-model="from.zhkh" placeholder="账号准确、禁插空格" />
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        状态
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <input class="uni-input from_input myself_disabled" disabled v-model="from.zts" name="input" placeholder="在用" />
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        用途
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <radio-group @change="radioChange" >
                            <label class="radio"><radio value="1" :disabled="isAdd" :class="[isAdd?'radio_disabled':'','myself_radius']" name="yt" color="#19D553" :checked="from.yt == 1?true:false" />工资</label>
                            <label class="radio"><radio value="2" :disabled="isAdd" :class="[isAdd?'radio_disabled':'','myself_radius']" name="yt" color="#19D553" :checked="from.yt == 2?true:false" />报销</label>
                            <label class="radio"><radio value="3" :disabled="isAdd" :class="[isAdd?'radio_disabled':'','myself_radius']" name="yt" color="#19D553" :checked="from.yt == 3?true:false" />工会</label>
                        </radio-group>
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
                <view class="uni-btn-v uni-btn-my">
                    <view class="from_buttom_inline" v-if="!disables.save">
                        <button form-type="submit" class="from_submit">保存</button>
                        <button type="default" form-type="reset" class="from_reset">取消</button>
                    </view>

                </view>
            </form>
        </view>
    </scroll-view>
</template>

<script>
    import formHelper from '../../lib/formHelper';
    import helper from '../../lib/helper';
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
                searchImg: '../../static/uploatImg.png',
                from:{
                    bankcardID:'',
                    xm:"",
                    indexkhyh: '',
                    arraykhyh: [],
                    khhqc:'',
                    zhkh:'',
                    indexzt: '',
                    arrayzt: [],
                    yt:'',
                    lsh:'',
                    zts:'在用',
                },
                disables:{
                    bankType:false,
                    depositBank:false,
                    account:false,
                    save:false,
                },
                verify:{
                    indexkhyh:[{type:'notEmptyAndZero',message:'请选择银行类别',}],
                    khhqc:[{type:'required',message:'请输入开户行'}],
                    zhkh:[{type:'required',message:'请输入账户卡号'}],
                    yt:[{type:'required',message:'请选择用途'}],
                },
                imageSrc:[],
                imageSrcbig:[],
                options:{},
                goalID:'',
                isAdd:true,
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
            reversedMessagekhyh(){
                if(!this.from.indexkhyh){
                    this.from.indexkhyh = 0;
                }
                return _.get(this.from.arraykhyh,`[${this.from.indexkhyh}].value`)
            },
            reversedMessagezt(){
                if(!this.from.indexzt){
                    this.from.indexzt = 0;
                }
                return _.get(this.from.arrayzt,`[${this.from.indexzt}].value`)
            },
        },
        methods: {
            // 父组件传过来的数据处理
            loaddata(){
                const relldata = this.allData;
                this.from.arraykhyh = helper.ArrReduce(relldata[50],"F_Key","Caption",true);//银行类别
                this.from.arrayzt = helper.ArrReduce(relldata[49],"F_Key","Caption",true);//状态
                this.from.indexzt = '1';
                this.from.xm = relldata[1][0].xm;

                let ID = this.openid;
                this.isAdd=!!ID;
                let _this = this
                if(!ID){   //新增

                }else{    //详情
                    relldata[47].forEach(function (value,index) {
                        let lsh = value.lsh
                        if(lsh==ID){
                            _this.from.bankcardID = ID;
                            _this.from.xm = value.xm;
                            _this.from.zhkh = value.zhkh;
                            _this.from.zts = value.zts;
                            _this.from.khhqc = value.khhqc;
                            _this.from.yt = value.yt;
                            _this.from.yts = value.yts;
                            _this.from.indexkhyh = helper.indexforeach(_this.from.arraykhyh,value.khyh,"lable");
                            _this.from.indexzt = helper.indexforeach(_this.from.arrayzt,value.zt,"lable");
                            _this.haveImageUpdate = false;
                            _this.haveImg = true;
                            _this.detailFile(_this,lsh,_this.from.yts,'银行卡','手机银行卡上传','gzkxxb');
                            _this.sureDisable();
                        }
                    });
                }

            },
            sureDisable(){
                if(this.from.yt===1||this.from.yt===2){
                    this.disables.bankType=true
                    this.disables.depositBank=true
                    this.disables.account=true
                    this.disables.save=true
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
                if(data){
                    let reltable = data.tables;
                    _this.haveImg = true;  //有数据显示删除按钮
                    _this.imageSrc = [];
                    _this.imageSrcbig = [];
                    for(let i=0;i<reltable[0].length;i++){
                        let relimagesrc = helper.filePreviewSrc(reltable[0][i].FullPath,'s');
                        let relimagesrcbig = helper.filePreviewSrc(reltable[0][i].FullPath,'l');
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
                let yts = '';
                if(this.from.yt == 1){
                    yts = "工资"
                }else if(this.from.yt == 2){
                    yts = "报销"
                }else if(this.from.yt == 3){
                    yts = "工会"
                }
                const _this = this;
                _this.haveImageUpdate = true;
                _this.haveImg = false;
                helper.uploadImage(_this,yts,'手机银行卡上传','gzkxxb');
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
            //用途
            radioChange(e) {
               this.from.yt = e.target.value
            },
            //申领时间
            bindDateChange: function(e) {
                this.date = e.target.value
            },
            //银行类别
            bindPickerChangekhyh(e) {
                this.from.indexkhyh = e.target.value
            },
            bindPickerChangezt(e) {
                this.from.indexzt = e.target.value
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
                    let yts = '';
                    if(this.from.yt == 1){
                        yts = "工资"
                    }else if(this.from.yt == 2){
                        yts = "报销"
                    }else if(this.from.yt == 3){
                        yts = "工会"
                    }
                    let path='';
                    if(this.from.yt==3){
                        path=this.from.bankcardID?'hr/managelist/managedetail/card.editCard':'hr/managelist/managedetail/card.addCard'
                    }else{
                        path='hr/managelist/mobile/addbankcard.txt'
                    }
                    const [err, data] = await helper.reqV4({
                        uri: '/Execute',
                        data: {
                            path,
                            manageID: this.ygbh,
                            bankcardID:this.from.bankcardID,
                            UserID:'',
                            xm:this.from.xm,
                            khyh:this.from.indexkhyh == '' ? null:this.from.arraykhyh[this.from.indexkhyh].lable,
                            zhkh:this.from.zhkh,
                            khhqc:this.from.khhqc,
                            yt:this.from.yt,
                            yts:yts,
                            type:this.from.arraykhyh[this.from.indexkhyh].lable == 2 ? 1 : 2,

                        }
                    })
                    if(data.msg){
                        uni.showToast({
                            title: data.msg,
                            icon: 'success',
                            mask: true
                        })
                    }
                    const resultdata = [err,data];
                    if(this.from.bankcardID){
                        if(this.imageSrc.length>0) {
                            this.goalID = this.from.bankcardID;
                            this.resultUpload();
                        }
                    }else{
                        if(this.imageSrc.length>0) {
                            this.goalID = data.tables[0][0].bankcardID;
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