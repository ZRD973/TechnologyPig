<template name="PartyMember" >
    <scroll-view  scroll-y class="popupbody"  >
        <view class="popup_title_view" >
            <text class="popup_title">社会职务</text>
            <span @click="close" class="popup_close">X</span>
        </view>
        <view class="from_view">
            <form @submit="formSubmit" @reset="formReset">
                <view class="uni-form-item uni-column from_line_view">
                    <view class="from_left">
                        类型
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <picker @change="bindPickerChangeSociologytype" :value="from.indexSociologytype" name="Sociologytype" range-key="value"  :range="from.arraySociologytype">
                            <view class="uni-input from_input from_input_before" v-if="from.indexSociologytype==''" >请选择</view>
                            <view class="uni-input from_input" v-else >{{reversedMessageSociologytype}}</view>
                        </picker>
                    </view>
                </view>

                <view class="uni-form-item uni-column from_line_view" v-if="JGMC">
                    <view class="from_left">
                        机构名称
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <input class="uni-input from_input" name="Organization" v-model="from.Organization" placeholder="机构名称" />
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view" v-if="ZWMC">
                    <view class="from_left">
                        职务名称
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <input class="uni-input from_input" name="PostName" v-model="from.PostName" placeholder="职务名称" />
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view" v-if="WBZJ">
                    <view class="from_left">
                        专家类型
                        <span class="Required">*</span>
                    </view>
                    <view class="from_right">
                        <picker @change="bindPickerChangeExperttype" :value="from.indexExperttype" name="Experttype" range-key="value"  :range="from.arrayExperttype">
                            <view class="uni-input from_input from_input_before" v-if="from.indexExperttype==''" >请选择</view>
                            <view class="uni-input from_input" v-else >{{reversedMessageExperttype}}</view>
                        </picker>
                    </view>
                </view>
                <view class="uni-form-item uni-column from_line_view" v-if="WBZJ">
                    <view class="from_left">
                        备注
                    </view>
                    <view class="from_right">
                        <input class="uni-input from_input" name="Memo" v-model="from.Memo" placeholder="备注" />
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
                JGMC:false, // 机构名称
                ZWMC:false, // 职务名称
                WBZJ:false, // 外部专家
                isDY:false, // 是党员
                from:{
                    socialpositionID:'',
                    indexSociologytype:'',
                    arraySociologytype:[],
                    Organization:'',
                    PostName:'',
                    Memo:'',

                    pzrq:'',
                    indexExperttype:'',
                    arrayExperttype:[],
                }

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
            reversedMessageSociologytype(){
                if(!this.from.indexSociologytype){
                    this.from.indexSociologytype = 0;
                }
                // return this.from.arraySociologytype[this.from.indexSociologytype].value
                return _.get(this.from.arraySociologytype,`[${this.from.indexSociologytype}].value`)
            },
            reversedMessageExperttype(){
                if(!this.from.indexExperttype){
                    this.from.indexExperttype = 0;
                }
                // return this.from.arrayExperttype[this.from.indexExperttype].value
                return _.get(this.from.arrayExperttype,`[${this.from.indexExperttype}].value`)
            },
        },
        methods: {
            // 父组件传过来的数据处理
            loaddata(){
                const relldata = this.allData;
                this.from.arraySociologytype = helper.ArrReduce(relldata[73],"F_Key","Caption",true);//类型

                this.from.arrayExperttype = helper.ArrReduce(relldata[74],"F_Key","Caption",true);//专家类型
                let ID = this.openid;

                let _this = this
                if(!ID){   //新增
                }else{    //详情
                    relldata[76].forEach(function (value,index) {
                        let lsh = value.ID
                        if(lsh==ID){
                            _this.from.socialpositionID = ID;
                            _this.from.Organization = value.Organization;
                            _this.from.PostName = value.PostName;
                            _this.from.Memo = value.Memo;

                            _this.from.indexSociologytype = helper.indexforeach(_this.from.arraySociologytype,value.Sociologytype,"lable");
                            let Sociologytype = _this.from.indexSociologytype;
                            //外部专家   6
                            //无  7 0
                            _this.JGMC==false;
                            _this.ZWMC=false;
                            _this.WBZJ=false;

                            if(Sociologytype==0||Sociologytype==7){
                                _this.JGMC==false;
                                _this.ZWMC=false;
                                _this.WBZJ=false;
                            }else if(Sociologytype==6){
                                _this.JGMC=true;
                                _this.ZWMC=false;
                                _this.WBZJ=true;
                            }else{
                                _this.JGMC=true;
                                _this.ZWMC=true;
                                _this.WBZJ=false;
                            }
                            _this.from.indexExperttype = helper.indexforeach(_this.from.arrayExperttype,value.Experttype,"lable");
                        }
                    });
                }
            },
            close(){
                // 执行父组件的close事件，关闭弹出层
                this.popup.close()
                // console.log(this.popup);
                this.popFlag = false
                this.$emit('closePopup',this.popFlag)
            },
            changeType:function(type){
                this.$emit("pChangeType")
            },
            bindPickerChangeSociologytype(e){
                this.from.indexSociologytype= e.target.value;
                let Sociologytype = this.from.indexSociologytype;
                //外部专家   6
                //无  7 0
               if(Sociologytype==0||Sociologytype==7){
                   this.JGMC=false;
                   this.ZWMC=false;
                   this.WBZJ=false;
               }else if(Sociologytype==6){
                   this.JGMC=true;
                   this.ZWMC=false;
                   this.WBZJ=true;
               }else{
                   this.JGMC=true;
                   this.ZWMC=true;
                   this.WBZJ=false;
               }
            },
            bindPickerChangeExperttype(e){
                this.from.indexExperttype= e.target.value;
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
                // console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
              const expertTypeObject = this.from.arraySociologytype[this.from.indexSociologytype];
              console.log(expertTypeObject);
                 let verify={
                     indexSociologytype:[{type:'notEmptyAndZero',message:'请选择类型',}],
                     Organization:[{type:'notEmptyAndZero',message:'请填写机构名称',}],
                    //  PostName:[{type:'notEmptyAndZero',message:'请填写职务名称',}],

                 }
                 if(_.get(expertTypeObject,'lable')==="6"){
                    const ExpertChile = {
                         indexExperttype:[{type:'notEmptyAndZero',message:'请选择专家类型',}],
                    }
                    verify={...verify,...ExpertChile}
                 }else{
                     const ExpertChile = {
                          PostName:[{type:'notEmptyAndZero',message:'请填写职务名称',}],
                    }
                    verify={...verify,...ExpertChile}
                 }

                const [fail] = await formHelper.checkfrom(verify,this.from);
                if(fail){
                    console.log("失败了");
                }else{
                        const [err, data] = await helper.reqV4({
                        uri: '/Execute',
                        data: {
                            path: 'hr/managelist/mobile/addsocialposition.txt',
                            manageID: this.ygbh,
                            socialpositionID:this.from.socialpositionID,
                            Sociologytype:this.from.indexSociologytype == '' ? null: this.from.arraySociologytype[this.from.indexSociologytype].lable,
                            Organization:this.from.Organization,
                            PostName:this.from.PostName,
                            Memo:this.from.Memo,
                            Experttype:this.from.indexSociologytype == 6 ? this.from.indexExperttype==''? null: this.from.arrayExperttype[this.from.indexExperttype].lable : null ,
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