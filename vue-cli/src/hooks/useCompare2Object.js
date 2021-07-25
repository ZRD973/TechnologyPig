import { watch, ref, computed} from "vue"
import _ from 'lodash';
//是否一致
export default (oldObject, newObject) => {
    return computed(()=>_.isEqual(oldObject,newObject))
}