import Vue from 'vue'
import Vuex from 'vuex'

import languages from './languages'
import nativelanguages from './nativelanguages';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    languages,
    nativelanguages
  }
})
