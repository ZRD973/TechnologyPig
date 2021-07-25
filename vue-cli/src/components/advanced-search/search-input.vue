
<template>
    <el-input v-model="inputContent" clearable :placeholder="placeholder" style="width:300px" class="search-input">
        <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
    </el-input>
</template>

<script>
import {ref,watch} from 'vue'
export default {
    props:{
        placeholder:{
            type:String,
            default:'请输入'
        },
        content:{
            type:String,
        },
    },
    setup(props,ctx){
        const inputContent=ref(props.content);
        watch(inputContent,nv=>{
            ctx.emit('update:content',nv)
        })
        const handleSearch=()=>{
            ctx.emit('search',inputContent.value)
        }
        return {
           inputContent,handleSearch
        }
    }
}
</script>

<style lang="scss" >
.search-input{
    .el-input-group__append{
        background-color:#409EFF;
        border-color: #409EFF;
        .el-icon-search{
            color: #fff;
        }
    }
}
</style>