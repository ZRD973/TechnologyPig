
import useToggle from '../../hooks/useToggle';
import useCompare2Object from "../../hooks/useCompare2Object";
import _ from 'lodash'
const noop=()=>{}
export default function(options={}){
    const {
        onSearch=noop,
        onResetBtn=noop,
        form,
    } = options;
      // 显示更多筛选功能
      const [filterVisible,{toggle:toggleFilter}]=useToggle(false);

      // 搜索按钮
       const searchBtn = (data) =>{
        filterVisible.value = false;
        onSearch(data);
      }
      // 重置按钮
      const resetBtn = () =>{
        onResetBtn();
      }
     //判断是否有值
      const isEqual= useCompare2Object(_.clone(form),form);
      return {
          filterVisible,toggleFilter,
          searchBtn,
          resetBtn,
          isEqual,
      }
}