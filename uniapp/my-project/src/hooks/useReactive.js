import { ref } from "uni-composition-api";

/*
 * @Author: your name
 * @Date: 2021-03-25 18:44:12
 * @LastEditTime: 2021-03-25 18:50:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \HBMSApp\trunk\src\hooks\useReactive.js
 */
const useReactive=(setReactive=function(){})=>{
const refresh=ref('');
setReactive();
refresh.value='refresh'
}
export default useReactive