import { ADD, REDUCE } from './mutations-type'

export default {
  // 购物车添加
  [ADD] (state, payload) {
    // console.log(payload)
    // console.log(payload)
    state.goods[payload.index].num++
    state.totalNum++
    state.totalPrice += state.goods[payload.index].price

  },

  // 购物车减少
  [REDUCE] (state, payload) {
    if (state.goods[payload.index].num > 0) {
      state.goods[payload.index].num--
      state.totalNum--
      state.totalPrice -= state.goods[payload.index].price
    }
  }
}