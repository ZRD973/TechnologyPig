import Vue from 'vue'
import App from './App'
import VueCompositionAPI from '@vue/composition-api';
import UniCompositionAPI from 'uni-composition-api';
Vue.use(VueCompositionAPI);
Vue.use(UniCompositionAPI);
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
