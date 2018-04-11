// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import './assets/favicons/favicons'
import runtime from 'serviceworker-webpack-plugin/lib/runtime'
import registerEvents from 'serviceworker-webpack-plugin/lib/browser/registerEvents'

Vue.use(Buefy)

Vue.config.productionTip = false

if ('serviceWorker' in navigator) {
  const registration = runtime.register()

  registerEvents(registration, {
    onInstalled: () => {
      console.log('APP-SW ==> onInstalled')
    },
    onUpdateReady: () => {
      console.log('APP-SW ==> onUpdateReady')
    },

    onUpdating: () => {
      console.log('APP-SW ==> onUpdating')
    },
    onUpdateFailed: () => {
      console.log('APP-SW ==> onUpdateFailed')
    },
    onUpdated: () => {
      console.log('APP-SW ==> onUpdated')
    }
  })
} else {
  console.log('APP-SW ==> No service worker avalailable')
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
