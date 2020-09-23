import Vue from 'vue'
import Vuex from 'vuex'

import languageStore from './languageStore'
//import nativelanguages from './nativelanguages';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    languageStore
  }
})
