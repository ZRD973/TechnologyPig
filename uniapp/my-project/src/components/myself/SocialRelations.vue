<template name="SocialRelations" >
    <scroll-view  scroll-y class="popupbody expend_bottom" >
        <view class="popup_title_view" >
            <text class="popup_title">社会关系</text>
            <span @click="close" class="popup_close">X</span>
        </view>
        <view class="from_view">
            <form @submit="formSubmit" @reset="formReset">

                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        关系类别
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">

                        <picker @change="bindPickerChangeStated" :value="from.indexStated" name="Stated" range-key="value"  :range="from.arrayStated">
                            <view class="uni-input from_input from_input_before" v-if="from.indexStated==''" >请选择</view>
                            <view class="uni-input from_input" v-else >{{reversedMessageStated}}</view>
                        </picker>
                    </view>
                </view>
<!--父母-->
                <view class="uni-form-item uni-column from_line_view" v-if="matherANDfather">
                    <view class="from_left">
                        关系
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <picker @change="bindPickerChangeRelationship" :value="from.indexRelationship" name="Relationship" range-key="value"  :range="from.arrayRelationship">
                            <view class="uni-input from_input from_input_before"  v-if="from.indexRelationship==''" >请选择</view>
                            <view class="uni-input from_input"  v-else >{{reversedMessageRelationship}}</view>
                        </picker>
                    </view>
                </view>
 <!--父母-->
                <view class="uni-form-item uni-column from_line_view" v-if="ZZMM">
                    <view class="from_left">
                        政治面貌
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <picker @change="bindPickerChangePolitical" :value="from.indexPolitical" name="Political" range-key="value"  :range="from.arrayPolitical">
                            <view class="uni-input from_input from_input_before"  v-if="from.indexPolitical==''" >请选择</view>
                            <view class="uni-input from_input "   v-else >{{reversedMessagePolitical}}</view>
                        </picker>
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        姓名
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <input class="uni-input from_input" name="Name" v-model="from.Name" placeholder="姓名" />
                    </view>
                </view>

                <!--<view class="uni-form-item uni-column from_line_view" v-if="SFZ">-->
                    <!--<view class="from_left">-->
                        <!--身份证-->
                    <!--</view>-->
                    <!--<view class="from_right">-->
                        <!--<input class="uni-input from_input" name="Sfzh" v-model="from.Sfzh" placeholder="以身份证为主,请勿乱填写" />-->
                    <!--</view>-->
                <!--</view>-->
                <view class="uni-form-item uni-column from_line_view" v-if="SFZ2">
                    <view class="from_left">
                        身份证
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <input class="uni-input from_input" name="Sfzh2" v-model="from.Sfzh2" placeholder="以身份证为主,请勿乱填写" />
                    </view>
                </view>
                <!--父母-->
                <view class="uni-form-item uni-column from_line_view" v-if="mobilePhone">
                    <view class="from_left">
                        手机
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <input class="uni-input from_input" name="Mobile" v-model="from.Mobile" placeholder="联系电话" />
                    </view>
                </view>
                <!--<view class="uni-form-item uni-column from_line_view" v-if="nochildren">-->
                    <!--<view class="from_left">-->
                        <!--出生年月-->
                    <!--</view>-->
                    <!--<view class="from_right">-->
                        <!--<picker mode="date" :value="from.Csny2" :start="startDate" name="Csny2" :end="endDate" @change="bindDateChange2">-->
                            <!--<view class="uni-input from_input from_input_before" v-if="from.Csny2==''" >出生年月</view>-->
                            <!--<view class="uni-input from_input" v-else >{{from.Csny2}}</view>-->
                        <!--</picker>-->
                    <!--</view>-->
                <!--</view>-->
                <view class="uni-form-item uni-column from_line_view" v-if="childrenbirthday">
                    <view class="from_left">
                        出生年月
                    </view>
                    <view class="from_right">
                        <input class="uni-input from_input" disabled style="background:#ccc" name="Csny" v-model="from.Csny" placeholder="出生年月自动根据身份证号获取" />
                    </view>
                </view>

<!--配偶-->
                <view class="uni-form-item uni-column from_line_view" v-if="otherhalf">
                    <view class="from_left">
                        工作单位
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <input class="uni-input from_input" name="gzdw" v-model="from.gzdw" placeholder="工作单位" />
                    </view>
                </view>
<!--紧急联系人-->
                <view class="uni-form-item uni-column from_line_view" v-if="friends">
                    <view class="from_left">
                        住址
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <input class="uni-input from_input" name="Adress" v-model="from.Adress" placeholder="准确全称" />
                    </view>
                </view>
 <!--子女 紧急联系人-->
                <view class="uni-form-item uni-column from_line_view" v-if="SEX">
                    <view class="from_left">
                        性别
                    </view>
                    <view class="from_right">
                        <picker @change="bindPickerChangeSexed" :value="from.indexSexed" name="Sexed" range-key="value"  :range="from.arraySexed">
                            <view class="uni-input from_input from_input_before" v-if="from.indexSexed==''" >请选择</view>
                            <view class="uni-input from_input "  v-else >{{reversedMessageSexed}}</view>
                        </picker>
                    </view>
                </view>
<!--紧急联系人-->
                <!--<view class="uni-form-item uni-column from_line_view" v-if="friends">-->
                    <!--<view class="from_left">-->
                        <!--关系-->
                        <!--<span class="Required">*</span>-->
                    <!--</view>-->
                    <!--<view class="from_right">-->
                        <!--<picker @change="bindPickerChangeGx2" :value="from.indexGx2" name="Gx2" range-key="value"  :range="from.arrayGx2">-->
                            <!--<view class="uni-input from_input from_input_before"  v-if="from.indexGx2==''" >请选择</view>-->
                            <!--<view class="uni-input from_input "  v-else >{{reversedMessageGx2}}</view>-->
                        <!--</picker>-->
                    <!--</view>-->
                <!--</view>-->

                <view class="uni-form-item uni-column from_line_view"  v-if="nofriends">
                    <view class="from_left">
                        文化程度
                    </view>
                    <view class="from_right">
                        <input class="uni-input from_input" name="Culture" v-model="from.Culture" placeholder="文化程度" />
                    </view>
                </view>
<!--子女-->
                <view class="uni-form-item uni-column from_line_view" v-if="children">
                    <view class="from_left">
                        教育就职情况
                    </view>
                    <view class="from_right">
                        <picker @change="bindPickerChangeJyjzqk" :value="from.indexJyjzqk" name="Jyjzqk" range-key="value"  :range="from.arrayJyjzqk">
                            <view class="uni-input from_input from_input_before" v-if="from.indexJyjzqk==''" >请选择</view>
                            <view class="uni-input from_input "  v-else >{{from.arrayJyjzqk[from.indexJyjzqk].value}}</view>
                        </picker>
                    </view>
                </view>


                <view class="uni-form-item uni-column from_line_view"  v-if="Zw">
                    <view class="from_left">
                        职务
                    </view>
                    <view class="from_right">
                        <input class="uni-input from_input" name="Zw" v-model="from.Zw" placeholder="职务" />
                    </view>
                </view>



                <view class="uni-form-item uni-column from_line_view"  v-if="HJSZD">
                    <view class="from_left">
                        户籍所在地
                    </view>
                    <view class="from_right">
                        <input class="uni-input from_input" name="Hjszd" v-model="from.Hjszd" placeholder="户籍所在地" />
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        备注
                    </view>
                    <view class="from_right">
                        <input class="uni-input from_input" name="Memo" v-model="from.Memo" placeholder="补充说明" />
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
    import formHelper from "../../lib/formHelper";
    import _ from 'lodash';
    import moment from 'moment';
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
                SFZ:false,  //身份证 除了 请选择没有  其他都有
                SFZ2:false,  //身份证 子女用 2
                mobilePhone:false, //  手机  除了子女，请选择没有  其他都有
                SEX:false,   // 性别  子女  和紧急联系人有
                ZZMM:false,  // 政治面貌  父母 配偶
                Zw:false,   //职务 父母 配偶有
                HJSZD:false, // 户籍所在地  父母配偶有
                matherANDfather:false,  //父母
                otherhalf:false,    //配偶
                children:false,    //子女
                friends:false, // 紧急联系人
                nofriends:false, //除了紧急联系人，请选择，都显示
                nochildren:false,
                childrenbirthday:false,

                from:{
                    indexStated: '',
                    arrayStated: [],
                    Name:'',  //姓名
                    socialID:'',
                    indexRelationship:'0',
                    arrayRelationship:[
                        {value:'请选择',lable:''},{value:'父亲',lable:'1'},
                        {value:'母亲',lable:'2'},{value:'',lable:'3'},
                    ],   // 父母 关系
                    Sfzh:'',
                    Sfzh2:'',  // 子女 身份证 用2
                    Csny:'',  //出生年月   子女
                    Csny2:'',  //出生年月   其他
                    Mobile:'',  //  手机
                    gzdw:'',  //工作单位，只有 配偶有
                    indexSexed:'0',
                    arraySexed:[
                        {value:'请选择',lable:''},{value:'男',lable:'1'},
                        {value:'女',lable:'2'},
                    ],   // 性别
                    // indexGx2: '',
                    // arrayGx2: [],   // 紧急联系人  关系
                    Culture:'',  // 文化程度
                    indexPolitical: '',
                    arrayPolitical: [],   // 政治面貌 父母 配偶有
                    indexJyjzqk:'0',
                    arrayJyjzqk:[
                        {value:'请选择',lable:''},{value:'学龄前儿童',lable:'1'},
                        {value:'在校生',lable:'2'},{value:'已毕业参加工作',lable:'3'},
                    ],   //   教育就职情况
                    Zw:'',  //职务  父母配偶有
                    Hjszd:'',  //户籍所在地
                    Memo:'',   //备注
                    Zdxx:'',
                    Adress:'',
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
            userName:{

            },
        },
        inject: ['popup'],
        watch:{
            from:{
                handler:function(nv){
                    const that=this;
                    if(nv.Sfzh2.length===18){
                        that.from.Csny=moment(nv.Sfzh2.slice(6,14),'YYYYMMDD').format('YYYY-MM-DD');
                    }
                },
                deep:true,
            }
        },
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
                // return this.from.arrayStated[this.from.indexStated].value
                return _.get(this.from.arrayStated,`[${this.from.indexStated}].value`)

            },
            reversedMessageRelationship(){
                if(!this.from.indexRelationship){
                    this.from.indexRelationship = 0;
                }
                // return this.from.arrayRelationship[this.from.indexRelationship].value
                return _.get(this.from.arrayRelationship,`[${this.from.indexRelationship}].value`)
            },
            // reversedMessageGx2(){
            //     return this.from.arrayGx2[this.from.indexGx2].value
            // },
            reversedMessagePolitical(){
                if(!this.from.indexPolitical){
                    this.from.indexPolitical = 0;
                }
                // return this.from.arrayPolitical[this.from.indexPolitical].value
                return _.get(this.from.arrayPolitical,`[${this.from.indexPolitical}].value`)
            },
            reversedMessageJyjzqk(){
                if(!this.from.indexJyjzqk){
                    this.from.indexJyjzqk = 0;
                }
                // return this.from.arrayJyjzqk[this.from.indexJyjzqk].value
                return _.get(this.from.arrayJyjzqk,`[${this.from.indexJyjzqk}].value`)
            },
            reversedMessageSexed(){
                if(!this.from.indexSexed){
                    this.from.indexSexed = 0;
                }
                // return this.from.arraySexed[this.from.indexSexed].value
                return _.get(this.from.arraySexed,`[${this.from.indexSexed}].value`)
            },
        },
        methods: {
            open(){
                alert("我是一个表格查询弹框")
            },
            // 父组件传过来的数据处理
            loaddata(){
                const relldata = this.allData;
                this.from.arrayStated = helper.ArrReduce(relldata[51],"F_Key","Caption",true);//关系类别
                // this.from.arrayGx2 = helper.ArrReduce(relldata[63],"F_Key","Caption",true);//关系 紧急联系人
                this.from.arrayPolitical = helper.ArrReduce(relldata[54],"F_Key","Caption",true);//政治面貌 父母 配偶
                this.usepeople = relldata[1][0].xm;

                let ID = this.openid;
                let _this = this
                if(!ID){   //新增
                }else{    //详情
                    relldata[52].forEach(function (value,index) {
                        let relID = value.ID

                        if(relID==ID){
                            _this.from.socialID = ID;

                            _this.from.xm = value.xm;
                            _this.from.Csny = value.Csny;
                            _this.from.Csny2 = value.Csny2;
                            _this.from.Name = value.Name;

                            _this.from.Sfzh2 = value.Sfzh;
                            // _this.from.Sfzh = value.Sfzh;
                            // _this.from.Sfzh2 = value.Sfzh2;
                            _this.from.Mobile = value.Mobile;
                            _this.from.gzdw = value.Gzdw;
                            _this.from.Culture = value.Culture;
                            _this.from.Zw = value.Zw;
                            _this.from.Hjszd = value.Hjszd;
                            _this.from.Adress = value.Adress;
                            _this.from.Memo = value.Memo;
                            _this.from.Zdxx = value.Zdxx;

                            if(value.Stated){
                                _this.from.indexStated = helper.indexforeach(_this.from.arrayStated,value.Stated,"lable");
                            }else{
                                _this.from.indexStated = 0;
                            };
                            _this.bindPickerChangeStated("",_this.from.indexStated);
                            if(value.Relationship){
                            _this.from.indexRelationship = helper.indexforeach(_this.from.arrayRelationship,value.Relationship,"lable");
                            }else{
                                _this.from.indexRelationship = 0;
                            };
                            if(value.Sexed){
                            _this.from.indexSexed = helper.indexforeach(_this.from.arraySexed,value.Sexed,"lable");
                            }else{
                                _this.from.indexSexed = 0;
                            };
                            // if(value.Gx2){
                            // _this.from.indexGx2 = helper.indexforeach(_this.from.arrayGx2,value.Gx2,"lable");
                            // }
                            if(value.Political){
                            _this.from.indexPolitical = helper.indexforeach(_this.from.arrayPolitical,value.Political,"lable");
                            }else{
                                _this.from.indexPolitical = 0;
                            };
                            if(value.Jyjzqk){
                            _this.from.indexJyjzqk = helper.indexforeach(_this.from.arrayJyjzqk,value.Jyjzqk,"lable");
                            }else{
                                _this.from.indexJyjzqk = 0;
                            };
                            _this.haveImageUpdate = false;
                            _this.haveImg = true;
                            _this.detailFile(_this,relID,"社会关系",'社会关系','手机社会关系上传','P_Social')
                        }
                    });
                }

            },

            //详情图片文件
            async detailFile(_this,ID,Keyed,Keys,source,module,){
                const [err, data] = await helper.req({
                    uri: '/Execute',
                    data: {
                        path: 'hr/managelist/mobile/socialImageList.sql',
                        ID:ID,
                        Keyed:Keyed,
                        module:module,
                        Keys:Keys,
                        source:source,
                        Tips:_this.userName + helper.formatDate('yyyy-MM-dd,hh:mm:ss'),
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
                _this.uploadImage(_this,"社会关系",'手机社会关系上传','P_Social');
            },

            uploadImage(_this,keys,source,module){
                uni.chooseImage({
                    count: 6, //默认9
                    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album','camera'], //从相册选择
                    success: async function (res) {
                        const filespaths  = res.tempFilePaths;
                        const files = res.tempFiles;
                        const resultfiles = files.reduce((sum,Val,Valindex)=>{
                            sum.push({
                                "Name": Val["name"],
                                "Size": Val["size"]
                            })
                            return sum
                        },[]);
                        _this.options.filePaths = filespaths;
                        _this.options.data = resultfiles;
                        _this.options.common = {
                            'path':'hr/managelist/mobile/FileUpload.txt',
                            'preID':_this.FolderID,
                            'keys':keys,
                            'module':module,
                            'source':source,
                            'Tips':_this.userName + helper.formatDate('yyyy-MM-dd,hh:mm:ss'),
                        };
                        _this.imageSrc = [];
                        _this.imageSrcbig = [];
                        for(let i=0;i<filespaths.length;i++){
                            const obj = {}
                            obj.path = filespaths[i];
                            _this.imageSrc.push(obj);
                            _this.imageSrcbig.push(obj);
                        }
                    }
                });
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
            changeType(type){
                this.$emit("pChangeType")
            },
            //关系类别
            bindPickerChangeStated(e,indexStated) {
                let statedval;
                if(!e){
                    statedval = indexStated;
                }else {
                    this.from.indexStated = e.target.value;
                    statedval = this.from.indexStated;
                }

                this.nochildren = false;
                this.childrenbirthday = false;
                this.matherANDfather = false;
                this.otherhalf = false;
                this.children = false;
                this.friends = false;
                this.nofriends = false;
                this.SFZ = false;
                this.SFZ2 = false;
                this.mobilePhone = false;
                this.SEX = false;
                this.ZZMM = false;
                this.Zw = false;
                this.HJSZD = false;
                switch(+statedval){
                    case 0:  //请选择
                        break;
                    case 1:  //父母
                        this.matherANDfather = true;
                        this.nofriends = true;
                        // this.SFZ = true;
                        this.mobilePhone = true;
                        this.ZZMM = true;
                        this.Zw = true;
                        this.HJSZD = true;
                        break;
                    case 2:  //配偶
                        this.otherhalf = true;
                        this.otherhalf = true;
                        // this.SFZ = true;
                        this.mobilePhone = true;
                        this.ZZMM = true;
                        this.Zw = true;
                        this.HJSZD = true;
                        break;
                    case 3:  //子女
                        this.children = true;
                        this.SFZ2 = true;
                        this.SEX = true;
                        this.childrenbirthday = true;
                        break;
                    case 4:  //紧急联系人
                        this.friends = true;
                        // this.SFZ = true;
                        this.mobilePhone = true;
                        this.SEX = true;
                        break;
                    default:
                        break;
                }
            },

            //政治面貌
            bindPickerChangePolitical(e){
                this.from.indexPolitical = e.target.value
            },
            //性别
            bindPickerChangeSexed(e){
                this.from.indexSexed = e.target.value
            },
            //教育就职
            bindPickerChangeJyjzqk(e){
                this.from.indexJyjzqk = e.target.value
            },
            //关系 是父亲 是母亲
            bindPickerChangeRelationship(e){
                this.from.indexRelationship = e.target.value
            },
            // bindPickerChangeGx2(e){
            //     this.from.indexGx2 = e.target.value
            // },
            //出生年月
            bindDateChange(e) {
                this.from.Csny= e.target.value
            },
            bindDateChange2(e) {
                this.from.Csny2 = e.target.value
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
                //  父母 配偶 紧急联系人 身份证用  Sfzh
                //  子女  身份证用  Sfzh2
                // console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))


            const socialTypeObject=this.from.arrayStated[this.from.indexStated];
            let verify={
                indexStated:[{type:'notEmptyAndZero',message:'请填写类别'}]
            };


            if(_.get(socialTypeObject,'lable')==="1"){ //父母
                const parentRule={
                    indexRelationship:[{type:'notEmptyAndZero',message:'请填写关系'}],
                    indexPolitical:[{type:'notEmptyAndZero',message:'请填写政治面貌'}],
                    Name:[{type:'required',message:'请填写姓名'}],
                    Mobile:[{type:'required',message:'请填写手机'}]
                };
                verify={...verify,...parentRule}
            }
            if(_.get(socialTypeObject,'lable')==="2"){ //配偶
                const coupleRule={
                    indexPolitical:[{type:'notEmptyAndZero',message:'请填写政治面貌'}],
                    Name:[{type:'required',message:'请填写姓名'}],
                    Mobile:[{type:'required',message:'请填写手机'}],
                    gzdw:[{type:'required',message:'请填写工作单位'}]
                };
                verify={...verify,...coupleRule}
            }
            if(_.get(socialTypeObject,'lable')==="3"){//子女
                const childRule={
                    Name:[{type:'required',message:'请填写姓名'}],
                    Sfzh2:[
                        {type:'required',message:'请填写身份证号'},
                        {type:'identity'}]
                };
                verify={...verify,...childRule}
            }
            if(_.get(socialTypeObject,'lable')==="4"){//紧急联系人
                const urgencyRule={
                    Name:[{type:'required',message:'请填写姓名'}],
                    Mobile:[{type:'required',message:'请填写手机'}],
                    Adress:[{type:'required',message:'请填写住址'}]
                };
                verify={...verify,...urgencyRule}
            }
            if(!this.from.indexStated){
                uni.showModal({
                    title:'错误提示',
                    content:'请选择关系类别',
                    showCancel:false,
                });
                throw '请选择关系类别'
            }
            await formHelper.checkfrom(verify, this.from);

                const [err, data] = await helper.reqV4({
                    uri: '/Execute',
                    data: {
                        path: 'hr/managelist/mobile/addsocial.txt',
                        manageID: this.ygbh,
                        socialID:this.from.socialID,
                        Csny:this.from.Csny||"null",
                        Csny2:this.from.Csny2||"null",
                        Stated:this.from.indexStated == '' ? null:this.from.arrayStated[this.from.indexStated].lable,
                        Name:this.from.Name,
                        // Sfzh:this.from.Sfzh,
                        // Sfzh2:this.from.Sfzh2,
                        Sfzh:this.from.Sfzh2,
                        Relationship:this.from.indexRelationship == '' ? null:this.from.arrayRelationship[this.from.indexRelationship].lable,
                        Mobile:this.from.Mobile,
                        Gzdw:this.from.gzdw,
                        Sexed:this.from.indexSexed == '' ? null:this.from.arraySexed[this.from.indexSexed].lable,
                        // Gx2:this.from.indexGx2 == '' ? "":this.from.arrayGx2[this.from.indexGx2].lable,
                        Gx2:'',
                        Culture:this.from.Culture,
                        Political:this.from.indexPolitical == '' ? null:this.from.arrayPolitical[this.from.indexPolitical].lable,
                        Jyjzqk:this.from.arrayJyjzqk[this.from.indexJyjzqk].lable,
                        Zw:this.from.Zw,
                        Hjszd:this.from.Hjszd,
                        Adress:this.from.Adress,
                        Memo:this.from.Memo,
                        Zdxx:'',
                    }
                })
                const resultdata = [err,data];
                if(this.from.socialID){
                    if(this.imageSrc.length>0) {
                        this.goalID = this.from.socialID;
                        this.resultUpload();
                    }
                }else{
                    if(this.imageSrc.length>0) {
                        this.goalID = data.tables[0][0].socialID;
                        this.resultUpload();
                    }
                }

                this.$emit("childataToresid","")
                this.close()
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