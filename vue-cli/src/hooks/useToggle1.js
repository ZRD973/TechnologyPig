import { ref } from "vue";
function useToggle(defaultValue) {
  const state = ref(false);
  state.value = defaultValue;
  function toggle(){
    state.value =!state.value
  }
  function setTrue() {
    state.value = true;
  }
  function setFalse() {
    state.value = false;
  }

  return [state, { setTrue, setFalse, toggle }];
}
export default useToggle;