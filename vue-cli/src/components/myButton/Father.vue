<template>
    <div>
        <h1>父组件</h1>
        <button @click="showChild">按钮</button>
        <Child ref="Child"></Child>
        <myButton type ="red" @onclick="btn1">按钮1</myButton>
        <myButton type ="green"  @onclick="btn2">按钮2</myButton>
        <myButton type ="blue" @onclick="btn3">按钮3</myButton>
    </div>
</template>
<script>
import Child from './Child'
import myButton from './Button'
export default {
    components:{
        Child,myButton
    },
    methods: {
        showChild(){
           const child =  this.$refs.Child;
           console.log(child);
           child.show();
        },
        btn1(){
            console.log(111);
        },
        btn2(){
            console.log(222);
        },
        btn3(){
            console.log(333);
        }
    },
}
</script>
