import useBoolean from "./useBoolean";

export default function useToggle(defaultValue){
    const [state,{setTrue,setFalse}]=useBoolean(defaultValue);
    const toggle=()=>{
        // console.log("切换");

        state.value=!state.value;
    }
    return [state,{setTrue,setFalse,toggle}]
}