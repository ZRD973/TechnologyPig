export default {
  goodsObj: state => {
    return state.goods
  },
  getById: (state) => (id) => {
    return state.goods.filter((item) => ((item.id - 0) === id))
  }
}