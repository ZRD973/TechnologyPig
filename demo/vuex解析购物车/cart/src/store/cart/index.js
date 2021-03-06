
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
export default ({
  state: {
    goods: [
      {
        id: '0',
        name: 'vivo-X20Plus屏幕指纹版',
        hint: '逆光也清晰，照亮你的美',
        price: 3596.00,
        num: 0,
        img: require('@/assets/v.jpg')
      },
      {
        id: '1',
        name: '华为mate10Plus',
        hint: '真正的人工智能芯片',
        price: 4999.00,
        num: 0,
        img: require('@/assets/h.jpeg')
      },
      {
        id: '2',
        name: '华为mate10Plus',
        hint: '真正的人工智能芯片',
        price: 4999.00,
        num: 0,
        img: require('@/assets/v.jpg')
      }
    ],
    totalNum: 0,
    totalPrice: 0
  },
  mutations,
  actions,
  getters
})
