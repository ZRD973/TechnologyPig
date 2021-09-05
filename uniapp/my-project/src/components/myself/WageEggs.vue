<template name="WageEggs" >
    <scroll-view  scroll-y class="popupbody" >
        <view class="popup_title_view" >
            <text class="popup_title">个人收入信息</text>
            <span @click="close" class="popup_close">X</span>
        </view>
        <view class="from_view">
            <view class="uni-form-item uni-column from_line_view">
                <view class="from_left">
                    查询月份
                </view>
                <view class="from_right">
                    <input class="uni-input from_input" placeholder-class="form-input-placeholder" disabled name="Month" v-model="from.Month"  placeholder="无" />
                </view>
            </view>
            <view class="uni-form-item uni-column from_line_view">
                <view class="from_left">
                    应得工资
                </view>
                <view class="from_right">
                    <input class="uni-input from_input" placeholder-class="form-input-placeholder" disabled name="DueSalary" v-model="from.DueSalary"  placeholder="无" />
                </view>
            </view>
            <view class="uni-form-item uni-column from_line_view">
                <view class="from_left">
                    高温补贴
                </view>
                <view class="from_right">
                    <input class="uni-input from_input" placeholder-class="form-input-placeholder" disabled name="HighFee" v-model="from.HighFee"  placeholder="无" />
                </view>
            </view>
            <view class="uni-form-item uni-column from_line_view">
                <view class="from_left">
                    工地补贴
                </view>
                <view class="from_right">
                    <input class="uni-input from_input" placeholder-class="form-input-placeholder" disabled name="SiteSubsidy" v-model="from.SiteSubsidy"  placeholder="无" />
                </view>
            </view>
            <view class="uni-form-item uni-column from_line_view">
                <view class="from_left">
                    节日补贴
                </view>
                <view class="from_right">
                    <input class="uni-input from_input" placeholder-class="form-input-placeholder" disabled name="FestivalFee" v-model="from.FestivalFee"  placeholder="无" />
                </view>
            </view>
            <view class="uni-form-item uni-column from_line_view">
                <view class="from_left">
                    代扣工会
                </view>
                <view class="from_right">
                    <input class="uni-input from_input" placeholder-class="form-input-placeholder" disabled name="TradeUnion" v-model="from.TradeUnion"  placeholder="无" />
                </view>
            </view>
            <view class="uni-form-item uni-column from_line_view">
                <view class="from_left">
                    缴存养老
                </view>
                <view class="from_right">
                    <input class="uni-input from_input" placeholder-class="form-input-placeholder" disabled name="Pension" v-model="from.Pension"  placeholder="无" />
                </view>
            </view>
            <view class="uni-form-item uni-column from_line_view">
                <view class="from_left">
                    缴存公积金
                </view>
                <view class="from_right">
                    <input class="uni-input from_input" placeholder-class="form-input-placeholder" disabled name="AccuFund" v-model="from.AccuFund"  placeholder="无" />
                </view>
            </view>
            <view class="uni-form-item uni-column from_line_view">
                <view class="from_left">
                    缴存医保
                </view>
                <view class="from_right">
                    <input class="uni-input from_input" placeholder-class="form-input-placeholder" disabled name="Medical" v-model="from.Medical"  placeholder="无" />
                </view>
            </view>
            <view class="uni-form-item uni-column from_line_view">
                <view class="from_left">
                    失业险
                </view>
                <view class="from_right">
                    <input class="uni-input from_input" placeholder-class="form-input-placeholder" disabled name="Unemploy" v-model="from.Unemploy"  placeholder="无" />
                </view>
            </view>
            <view class="uni-form-item uni-column from_line_view">
                <view class="from_left">
                    代缴个税
                </view>
                <view class="from_right">
                    <input class="uni-input from_input" placeholder-class="form-input-placeholder" disabled name="IncomeTax" v-model="from.IncomeTax"  placeholder="无" />
                </view>
            </view>
            <view class="uni-form-item uni-column from_line_view">
                <view class="from_left">
                    代扣杂费
                </view>
                <view class="from_right">
                    <input class="uni-input from_input" placeholder-class="form-input-placeholder" disabled name="Others" v-model="from.Others"  placeholder="无" />
                </view>
            </view>
            <view class="uni-form-item uni-column from_line_view">
                <view class="from_left">
                    实得金额
                </view>
                <view class="from_right">
                    <input class="uni-input from_input" placeholder-class="form-input-placeholder" disabled name="Total" v-model="from.Total"  placeholder="无" />
                </view>
            </view>
            <view class="uni-form-item uni-column from_line_view">
                <view class="from_left">
                    税前增减
                </view>
                <view class="from_right">
                    <input class="uni-input from_input" placeholder-class="form-input-placeholder" disabled name="IncDec" v-model="from.IncDec"  placeholder="无" />
                </view>
            </view>
        </view>
    </scroll-view>
</template>

<script>
    import helper from "../../lib/helper";
    // import formHelper from '../../../lib/formHelper'
    export default {
        // components: {EvanForm,EvanFormItem},
        data() {
            return {
                name:'',
                mobile:'',
                from:{
                    Month:'',    //查询月份
                    DueSalary:'',  //应得工资
                    HighFee:'',   //高温
                    SiteSubsidy:'',  //工地
                    FestivalFee:'',  //节日
                    TradeUnion:'',   //代扣工会
                    Pension:'',   // 缴存养老
                    AccuFund:'',   // 缴存公积金
                    Medical:'',   // 医保
                    Unemploy:'',   // 失业险
                    IncomeTax:'',   // 代缴个税
                    Others:'',   // 代扣咋费
                    Total:'',   // 实得金额
                    IncDec:'',   // 税前增减
                },
            }
        },
        props: {
            ygbh: {
                type: String,//属性类型
                value:''
            },
            allData: {

            }
        },
        inject: ['popup'],
        computed: {

        },
        methods: {
            async loaddata(){
                let relldata = this.allData;
                const {mobile,xm} = relldata[1][0];
                this.mobile = mobile;
                this.name = xm;
                const [err, data] = await helper.req({
                    uri: '/Execute',
                    data: {
                        path: 'tools/SalaryInquiry/BasicInfo.txt',
                        Mobile: this.mobile,
                        Name: this.name
                    }
                })
                if(data){
                    const reldata = data.tables;
                    const {Month,DueSalary,HighFee,SiteSubsidy,FestivalFee,TradeUnion,Pension,AccuFund,Medical,Unemploy,IncomeTax,Others,Total,IncDec} = reldata[0][0];
                    this.from.Month = Month;
                    this.from.DueSalary = DueSalary;
                    this.from.HighFee = HighFee;
                    this.from.SiteSubsidy = SiteSubsidy;
                    this.from.FestivalFee = FestivalFee;
                    this.from.TradeUnion = TradeUnion;
                    this.from.Pension = Pension;
                    this.from.AccuFund = AccuFund;
                    this.from.Medical = Medical;
                    this.from.Unemploy = IncomeTax;
                    this.from.IncomeTax = IncomeTax;
                    this.from.Others = Others;
                    this.from.Total = Total;
                    this.from.IncDec = IncDec;
                }


            },
            close(){
                // 执行父组件的close事件，关闭弹出层
                this.popup.close()
            },
        },
        mounted() {
            this.loaddata();
        }
    }
</script>

<style scoped>
    .uni-form-item{
        width: 50%;
        overflow: hidden;
        float: left;
    }
    .from_left{
        width: 80px;
    }
    .from_input{
        border: none;
        border-bottom: 1px solid #dddddd;
    }
    .popup_title{
        left: -60px;
    }
</style>