import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import { messages, defaultLocale } from "@/i18n";


import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

const i18n = new VueI18n({
  messages,
  locale: defaultLocale,
  fallbackLocale: defaultLocale
});

Vue.config.productionTip = false
// change
new Vue({
  i18n,
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')


