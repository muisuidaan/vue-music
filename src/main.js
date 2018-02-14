// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
import VueScroller from 'vue-scroller'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import store from './store'
Vue.use(VueScroller)
fastclick.attach(document.body)

Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})

/* eslint-disable no-new */
import 'common/stylus/index.styl'
new Vue({
  el: '#app',
  router,
  store,
  components: { 
      App
    },
  template: '<App/>'
})
