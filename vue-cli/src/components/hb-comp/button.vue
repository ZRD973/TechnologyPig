
<template>
    <el-button :type="elBtnType" size="small" @click="handleClick" :loading="loading">
        <i :class='["fa",elBtnCcss]' ></i>{{text?text:elBtnText}}
    </el-button>
</template>
<script>

import {commonBtnTypes} from './constant'
    export default {
        props:{
            hbBtnType:String,
            type:String,
            returnUrl:String,
            text:String,
            loading:{
                type:Boolean,
                default:false
            }
        },
        setup(props,ctx){
            const handleClick=(event)=>{
                ctx.emit('click',event)
            }
            const elBtnTypes={
                ...commonBtnTypes,
            }
            let {elBtnType='primary',elBtnCcss,elBtnText}=elBtnTypes[props.hbBtnType||ctx.attrs.hbbtntype];
            if(props.type){
                elBtnType=props.type
            }
            return {
                elBtnType,elBtnCcss,elBtnText,handleClick,
            }
        },
    }
</script>

<style lang="scss" scoped>
i{
    font-size: 14px;
}
</style>
