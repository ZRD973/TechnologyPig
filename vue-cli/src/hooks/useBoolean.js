import { ref } from "vue";
function useBoolean(defaultValue) {
  const state = ref(false);
  state.value = defaultValue;
  function setTrue() {
    state.value = true;
  }
  function setFalse() {
    state.value = false;
  }
  function getBoolean() {
    //废弃
    return state.value;
  }
  return [state, { setTrue, setFalse, getBoolean }];
}
export default useBoolean;
