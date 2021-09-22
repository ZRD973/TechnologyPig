<template>
<div class="hello">
  <ul class="shop_container">
    <li class="shop_container_li" v-for="(item,index) in goodsObj" :key="item.index">
      <div class="shop_img">
        <img width="100%" height="100%" :src="item.img" />
      </div>
      <div class="shop_detail">
        <p>{{item.name}}</p>
        <p>{{item.hint}}</p>
        <p>￥{{item.price}}</p>
        <p>
          <span class="shop_reduce" @click="handleReduce({index})">-</span>
          <span class="shop_num">{{item.num}}</span>
          <span class="shop_add" @click="handleAdd({index})">+</span>
        </p>
      </div>
    </li>
  </ul>
  <div class="foot">
    <div class="total_price">
      <span>合计：{{totalNum}}</span>
    </div>
    <div class="total_num">
      <span>去结账：￥{{totalPrice}}</span>
    </div>
  </div>
</div>
</template>

<script>
import {
  mapState,
  mapGetters,
  // mapMutations,
  // mapActions,
} from 'vuex'
export default {
  name: 'HelloWorld',
  data() {
    return {}
  },
  created() {
    console.log(this.$store.getters.getById(1))
  },
  computed: {
    ...mapState(['goods', 'totalNum', 'totalPrice']),
    ...mapGetters(['goodsObj']),
    // ...mapState({
    //   goods: state => state.goods
    // }),
    // goods() {
    //   return this.$store.state.goods
    // }
    // goodsObj() {
    //   return this.$store.getters.goodsObj
    // }
  },
  methods: {
    handleAdd({
      index
    }) {
      // this.$store.commit('add', index)
      // this.$store.commit({
      //   type: 'ADD',
      //   index
      // })
      // this.$store.dispatch('increment', {
      //   index
      // })
      console.log(this.goods);
      console.log(this.totalNum);
      console.log(this.totalPrice);

      this.$store.dispatch({
        type: 'increment',
        index
      })
    },
    handleReduce({
      index
    }) {
      this.$store.dispatch({
        type: 'reduce',
        index
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
body,
li,
ul,
p {
  list-style: none;
  padding: 0;
  margin: 0;
}

.hello {
  position: relative;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.shop_container {
  width: 100%;
}

.shop_container_li {
  background-color: #f5f5f5;
  height: 130px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.shop_img {
  flex: 1;
  padding: 10px;
  height: 110px;
}

.shop_detail {
  flex: 2;
}

.shop_detail p {
  font-size: 14px;
  line-height: 25px;
  height: 25px;
}

.shop_reduce,
.shop_add {
  font-size: 18px;
  font-weight: 700;
  display: inline-block;
  text-align: center;
  width: 20px;
  height: 20px;
  border: 1px solid #f5f5f5;
  background-color: #ffffff;
}

.shop_num {
  margin: 0 5px;
}

.foot {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total_price {
  background-color: #4cd964;
  flex: 2;
  height: 100%;
  line-height: 40px;
}

.total_num {
  flex: 1;
  background-color: #666;
  height: 100%;
  line-height: 40px;
}

.payment {
  background-color: #3b95e9;
}
</style>
