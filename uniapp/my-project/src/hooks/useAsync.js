/*
 * @Author: your name
 * @Date: 2021-02-23 15:25:42
 * @LastEditTime: 2021-03-25 18:39:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \trunk\webpack\common\hooks\useAsync.js
 */

import { reactive, ref, toRef } from "uni-composition-api";
import _ from 'lodash'
export default function useAsync(server, options = {}) {
  const loading = ref(false);
  const error = ref(undefined);
  // const data=ref(undefined);
  const data = ref([]);
  const { manual = false,
    pollingInterval,
    debounceInterval, form,
    notLayout = '',
    defaultPageSize = 10,
    defaultPageOrder = '',
    onFinally = function () { },
    onPagined = function () { },
    showLoading =false,
    onSuccess = function () { } } = options;
  const immediate = !manual;
  debounceInterval && _.debounce(run, debounceInterval)
  pollingInterval && setInterval(() => { run() }, pollingInterval)

  const paginationParams = reactive({
    pageCount: 10, currentPage: 1, total: 0, pageOrder: '', layout: 'total,sizes,prev,pager,next,jumper'
  });

  paginationParams.pageCount = defaultPageSize;
  paginationParams.pageOrder = defaultPageOrder;

  const layoutString = paginationParams.layout;
  const layoutArray = layoutString.split(',');
  const notLayoutArray = notLayout.split(',');
  const newLayoutArray = _.difference(layoutArray, notLayoutArray)
  paginationParams.layout = newLayoutArray.join(',')

  immediate && run(paginationParams, form)
  function run(...args) {
    loading.value = true;
    if(showLoading){
      uni.showLoading({
        title: '加载中'
    });
    }
    server(...args).then((res) => {
      data.value = res;
      onSuccess(res, ...args);
      paginationParams.total = res.total;
      onPagined(paginationParams)
    }).catch(err => {
      error.value = err
    }).finally((res) => {
      loading.value = false;
      if(showLoading){
        uni.hideLoading();
      }
      onFinally(res, ...args)
    });
  }
  function reset({ currentPage = 1, pageCount = defaultPageSize,pageOrder=defaultPageOrder }) {
    paginationParams.currentPage = currentPage;
    paginationParams.pageCount = pageCount;
    paginationParams.pageOrder = pageOrder;
    run(paginationParams)
  }
  function resetForm(formData) {
    paginationParams.currentPage = 1;
    paginationParams.pageCount = defaultPageSize;
    paginationParams.pageOrder = defaultPageOrder;
    // debugger
    // onPagined(paginationParams)
    run(paginationParams, formData)
  }
  return {
    loading, error, data, run, paginationParams, reset, resetForm
  };
}
