<template>
  <view class="container">
    <view class="page">
      <view class="content">
        <view @click="handleOCR" style="text-align: right; font-size: 14px; color: rgb(100, 149, 237)">
          <image class="idcard" src="../../static/images/idCard.png"></image>
          <view>名片OCR</view>
        </view>
        <form @submit="formSubmit" @reset="formReset">
          <view class="cells" style="border-top: 1px solid rgba(0, 0, 0, 0.2)">
            <text class="label_text">姓名</text
            ><text class="label_icon">*</text>
            <input
              @blur="changeName"
              class="cells_input"
              type="text"
              v-model="name"
              value="name"
              placeholder="姓名准确 一字不差"
            />
            <uni-icons
              v-if="showNameIcon && nameIcon"
              class="cells_icon"
              color="green"
              type="checkbox-filled"
              size="25"
            ></uni-icons>
            <uni-icons
              v-if="showNameIcon && !nameIcon"
              class="cells_icon"
              color="red"
              type="info-filled"
              size="25"
            ></uni-icons>
          </view>
          <view class="cells">
            <text class="label_text">单位</text
            ><text class="label_icon">*</text>
            <input
              @blur="changeCompany"
              @input="searchCompany"
              class="cells_input"
              type="text"
              v-model="company"
              placeholder="务必真实 一字不差"
            />
            <view
              v-if="!showEmpty && associateCompany.length"
              class="uni-flex uni-column associate"
              @click="handClickItem"
            >
              <view
                class="flex-item flex-item-V associate_item"
                v-for="item in associateCompany"
                :key="item.Value"
                :data-value="item.Caption"
              >
                {{ item.Caption }}
              </view>
            </view>
            <view v-if="showEmpty" class="uni-flex uni-column associate">
              <view
                class="flex-item flex-item-V associate_item"
                style="background: #ffffff"
                >暂无匹配结果…</view
              >
            </view>
            <uni-icons
              v-if="showCompanyIcon && companyIcon"
              class="cells_icon"
              color="green"
              type="checkbox-filled"
              size="25"
            ></uni-icons>
            <uni-icons
              v-if="showCompanyIcon && !companyIcon"
              class="cells_icon"
              color="red"
              type="info-filled"
              size="25"
            ></uni-icons>
          </view>
          <view class="cells">
            <text class="label_text">职务</text
            ><text class="label_icon">*</text>
            <input
              @blur="changeDuty"
              class="cells_input"
              type="text"
              v-model="duty"
              placeholder="具体职务"
            />
            <uni-icons
              v-if="showDutyIcon && dutyIcon"
              class="cells_icon"
              color="green"
              type="checkbox-filled"
              size="25"
            ></uni-icons>
            <uni-icons
              v-if="showDutyIcon && !dutyIcon"
              class="cells_icon"
              color="red"
              type="info-filled"
              size="25"
            ></uni-icons>
          </view>
          <view class="cells">
            <text class="label_text">手机</text
            ><text class="label_icon">*</text>
            <input
              @blur="changeMobile"
              class="cells_input"
              type="text"
              v-model="mobile"
              placeholder="11位手机号"
            />
            <uni-icons
              v-if="showMobileIcon && mobileIcon"
              class="cells_icon"
              color="green"
              type="checkbox-filled"
              size="25"
            ></uni-icons>
            <uni-icons
              v-if="showMobileIcon && !mobileIcon"
              class="cells_icon"
              color="red"
              type="info-filled"
              size="25"
            ></uni-icons>
          </view>
          <view class="cells">
            <text class="label_text">地址</text
            ><text class="label_icon">*</text>
            <input
              @blur="changeAddress"
              class="cells_input"
              type="text"
              v-model="address"
              placeholder="联系地址，快递邮寄地址"
            />
            <uni-icons
              v-if="showAddressIcon && addressIcon"
              class="cells_icon"
              color="green"
              type="checkbox-filled"
              size="25"
            ></uni-icons>
            <uni-icons
              v-if="showAddressIcon && !addressIcon"
              class="cells_icon"
              color="red"
              type="info-filled"
              size="25"
            ></uni-icons>
          </view>
          <view class="cells">
            <text class="label_text">分管</text>
            <input
              class="cells_input"
              type="text"
              v-model="charge"
              placeholder="工作分工 工作条线"
            />
          </view>
          <view class="cells">
            <text class="label_text">上级</text>
            <input
              class="cells_input"
              type="text"
              v-model="leader"
              placeholder="他的上级领导 宜单人"
            />
          </view>
          <view class="cells">
            <text class="label_text">下属</text>
            <input
              class="cells_input"
              type="text"
              v-model="retinue"
              placeholder="他的下属"
            />
          </view>
          <view class="checkbox">
            <checkbox
              style="transform: scale(0.9)"
              @click="checkboxChange"
              v-model="checkBoxValue"
            />
            <text class="text">今后向他推送企业宣材料</text>
          </view>
          <view class="event_area">
            <view class="title">拜访事项</view>
            <textarea
              @input="showTips"
              v-model="matter"
              class="area"
              placeholder="输入拜访事项"
            ></textarea>
          </view>
          <view class="footer">
            <button type="primary" form-type="submit">保存</button>
          </view>
        </form>
      </view>
    </view>
    <!-- <upload-file></upload-file> -->
  </view>
</template>
<script>
import { reactive, ref, toRefs } from "@vue/composition-api";
import { checkEmpty, checkPhone, checkName,filter } from "./utils";
import uploadFile from "../../components/upload/upload-file.vue";
// import { associate, saveInfo, searchOrg, queryQccInfo, AddOrgInfo,uploadImg } from "./api";
import { apiUrl } from "../../config/index";
// import amap from "../../lib/amap-wx.130";
import graceChecker from "../../lib/graceChecker";
export default {
  components: { uploadFile },
  setup(props, ctx) {
    // 姓名
    const showNameIcon = ref(false);
    const nameIcon = ref(false);
    const changeName = (e) => {
      showNameIcon.value = true;
      checkName(e.target.value)
        ? (nameIcon.value = true)
        : (nameIcon.value = false);
    };
    // 单位
    const showCompanyIcon = ref(false);
    const companyIcon = ref(false);
    const changeCompany = (e) => {
      showCompanyIcon.value = true;
      checkEmpty(e.target.value)
        ? (companyIcon.value = true)
        : (companyIcon.value = false);
      showEmpty.value = false;
    };
    const showEmpty = ref(false);
    const associateCompany = ref([]);
    const searchCompany = (e) => {
      if (e.target.value) {
        // associate(e.target.value).then((res) => {
        //   if (res[1].pageTable.length > 0) {
        //     showEmpty.value = false;
        //     associateCompany.value = res[1].pageTable;
        //   } else {
        //     showEmpty.value = true;
        //     associateCompany.value = [];
        //   }
        // });
      } else {
        showEmpty.value = false;
        associateCompany.value = [];
      }
    };
    const isOK = ref(false);
    const handClickItem = (e) => {
      form.formdata.company = e.target.dataset.value || "";
      associateCompany.value = [];
      // searchOrg(form.formdata.company).then((data) => {
      //   form.formdata.address = data[1].tables[0][0].Address;
      //   queryQccInfo(form.formdata.company).then((res) => {
      //     let datas;
      //     if (typeof res[1].data == "string") {
      //       datas = JSON.parse(res[1].data);
      //     } else {
      //       datas = res[1].data;
      //     }
      //     if (datas.Status == "200") {
      //       if (datas.Result.OriginalName.length) {
      //         var OriginName = datas.Result.OriginalName[0].Name;
      //         var OriginChangeDate = datas.Result.OriginalName[0].ChangeDate;
      //       }
      //       AddOrgInfo(
      //         datas.Result,
      //         OriginChangeDate,
      //         form.formdata.company,
      //         OriginName
      //       ).then((respone) => {
      //         isOK.value = true;
      //       });
      //     }
      //   });
      // });
    };
    // 职务
    const showDutyIcon = ref(false);
    const dutyIcon = ref(false);
    const changeDuty = (e) => {
      showDutyIcon.value = true;
      checkEmpty(e.target.value)
        ? (dutyIcon.value = true)
        : (dutyIcon.value = false);
    };
    // 手机
    const showMobileIcon = ref(false);
    const mobileIcon = ref(false);
    const changeMobile = (e) => {
      showMobileIcon.value = true;
      checkPhone(e.target.value)
        ? (mobileIcon.value = true)
        : (mobileIcon.value = false);
    };
    // 地址
    const showAddressIcon = ref(false);
    const addressIcon = ref(false);
    const changeAddress = (e) => {
      showAddressIcon.value = true;
      checkEmpty(e.target.value)
        ? (addressIcon.value = true)
        : (addressIcon.value = false);
    };
    // 推送选项
    const checkBoxValue = ref(false);
    const notify = ref(0);
    const checkboxChange = (e) => {
      checkBoxValue.value = !checkBoxValue.value;
      notify.value = checkBoxValue.value ? 1 : 0;
    };
    //点击名片
    const handleOCR = () => {
      uni.showToast({
        title:'此功能正在开发',
        icon:'error'
      })
      // uni.chooseImage({
      //   count: 1, //默认9
      //   sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
      //   sourceType: ["album", "camera"], //从相册选择
      //   success: function (res) {
      //     console.log(res);
      //     let imgFiles = res.tempFilePaths[0]
      //     //  uni.previewImage({
      //     //     urls: res.tempFilePaths
      //     // })
      //     uni.uploadFile({
      //         url: apiUrl.Api + "/BusinessCard",
      //         filePath: imgFiles,
      //         db:'HBMS',
      //         sys:'HBMS',
      //         formData: {
      //           file: imgFiles
      //         },
      //         name: 'file',
      //         success(res1) {
      //           console.log(res1)
      //         }
      //     })
      //     // uploadImg(imgFiles).then(data=>{
      //     //   console.log(data);
      //     // })
      //   },
      // });
    };
    const getPos = (cb) => {
      let that = {};
      // 定位
      uni.getLocation({
        type: "wgs84",
        success: function (res) {
          form.formdata.latitude = res.latitude;
          form.formdata.longitude = res.longitude;
          // let geo = new amap.AMapWX({
          //   key: "b4fbb216a08aee331fb66045808a47eb",
          // });
          // geo.getRegeo({
          //   success: (data) => {
          //     console.log(data);
          //     that.address = data[0].regeocodeData.formatted_address;
          //     cb();
          //   },
          // });
        },
        fail: function () {
          uni.showModal({
            title: "自动定位",
            content: "请检查定位是否开启？点击确定后将再次定位！",
            success: function (res) {
              res.confirm && getPos();
            },
          });
        },
      });
    };

    let batch = (function (date) {
      var batch = date.Format("yyyyMMddhhmmss"),
        milli = "000" + new Date().getMilliseconds();
      return (
        batch +
        milli.substr(milli.length - 3) +
        Math.random().toString().substr(2, 3)
      );
    })(new Date());

    const nameList = ref([]);
    const form = reactive({
      formdata: {
        name: "",
        company: "",
        duty: "",
        mobile: "",
        address: "",
        charge: "",
        leader: "",
        retinue: "",
        notify: "",
        matter: "",
      },
    });

    const formSubmit = (e) => {
      form.formdata.notify = notify.value;
      form.formdata.path = "customer/addrbook/mobile/saveinfo.sql";
      form.formdata.batchID = batch;

      let rule = [
        {
          name: "name",
          checkType: "string",
          checkRule: "2,4",
          errorMsg: "姓名格式不正确",
        },
        {
          name: "company",
          checkType: "notnull",
          checkRule: "",
          errorMsg: "单位名称不正确",
        },
        {
          name: "duty",
          checkType: "notnull",
          checkRule: "",
          errorMsg: "职务填写不正确",
        },
        {
          name: "mobile",
          checkType: "phoneno",
          checkRule: "",
          errorMsg: "手机格式不正确",
        },
        {
          name: "address",
          checkType: "notnull",
          checkRule: "",
          errorMsg: "地址填写不正确",
        },
      ];
      var checkRes = graceChecker.check(form.formdata, rule);
      if (!checkRes) {
        uni.showToast({ title: graceChecker.error, icon: "error" });
      } else {
        uni.showModal({
          title: "保存确认",
          content: isOK.value
            ? "请确认数据无误，确定保存"
            : "公司名验证失败,依旧保存吗？",
          success: function (res) {
            if (res.confirm) {
              getPos(function () {
                // saveInfo(form.formdata).then((res) => {
                //   if (res[1].affected[0]) {
                //     nameList.value.push(form.formdata.name);
                //     uni.showModal({
                //       title: "保存成功",
                //       confirmText: "下一个",
                //       cancelText: "退出",
                //       content:
                //         "您拜访" +
                //         form.formdata.name +
                //         "客户的记录已保存。本次共登记了" +
                //         nameList.value.length +
                //         "人。是否继续？",
                //       success: function (res) {
                //         if (res.confirm) {
                //           isOK.value = false;
                //           formReset();
                //         } else if (res.cancel) {
                //           uni.navigateBack({ delta: 1 });
                //         }
                //       },
                //     });
                //   }
                // });
              });
            }
          },
        });
      }
    };
    const formReset = () => {
      form.formdata.name = "";
      form.formdata.company = "";
      form.formdata.duty = "";
      form.formdata.mobile = "";
      form.formdata.address = "";
      form.formdata.charge = "";
      form.formdata.leader = "";
      form.formdata.retinue = "";
      form.formdata.notify = "";
      form.formdata.matter = "";
      checkBoxValue.value = false;
      showNameIcon.value = false;
      showCompanyIcon.value = false;
      showDutyIcon.value = false;
      showMobileIcon.value = false;
      showAddressIcon.value = false;
    };
    const showTips = () => {
      form.formdata.matter = filter(form.formdata.matter)
    };

    return {
      handleOCR,
      checkBoxValue,
      checkboxChange,
      showTips,
      ...toRefs(form.formdata),
      formSubmit,
      formReset,
      showNameIcon,
      nameIcon,
      changeName,
      showCompanyIcon,
      companyIcon,
      changeCompany,
      showEmpty,
      searchCompany,
      associateCompany,
      handClickItem,
      showDutyIcon,
      dutyIcon,
      changeDuty,
      showMobileIcon,
      mobileIcon,
      changeMobile,
      showAddressIcon,
      addressIcon,
      changeAddress,
    };
  },
};
</script>
<style lang="scss" scoped>
$borderColor: rgba(0, 0, 0, 0.2);
.container {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  background-color: #fff;
  .page {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px 10px;
    background-color: #fff;
    .content {
      margin-bottom: 20rpx;
      .idcard {
        width: 50rpx;
        height: 30rpx;
        position: absolute;
        right: 140rpx;
        top: 32rpx;
      }
      .cells {
        display: flex;
        position: relative;
        border-bottom: 1px solid $borderColor;
        padding: 20rpx;
        .label_text {
          font-size: 28rpx;
          font-weight: 700;
          line-height: 45rpx;
          margin-right: 34rpx;
        }
        .label_icon {
          position: absolute;
          left: 88rpx;
          color: red;
          font-size: 28rpx;
          font-weight: 700;
        }
        .cells_input {
          width: 80%;
        }
        .associate {
          position: absolute;
          width: 75%;
          border: 1px solid gray;
          left: 106rpx;
          top: 59rpx;
          border-radius: 16rpx;
          box-sizing: border-box;
          z-index: 99;
          background: #ffffff;
          .associate_item {
            padding: 0 10rpx;
            border-radius: 16rpx;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
        .cells_icon {
          position: absolute;
          right: 30rpx;
          top: 0;
        }
      }
    }
    .checkbox {
      font-size: 28rpx;
      font-weight: 700;
      padding: 20rpx;
      border-top: 1px solid $borderColor;
      border-bottom: 1px solid $borderColor;
      .text {
        padding: 0 20rpx;
      }
    }
    .event_area {
      margin: 20rpx 0;
      .title {
        border-top: 1px solid $borderColor;
        border-bottom: 1px solid $borderColor;
        text-align: center;
        font-size: 28rpx;
        font-weight: 700;
        margin-bottom: 10rpx;
      }
      .area {
        width: 100%;
        height: 110rpx;
        border-bottom: 1px solid $borderColor;
      }
    }
  }
}
.container,
.container * {
  box-sizing: border-box;
}
</style>