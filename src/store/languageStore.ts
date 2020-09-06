//import { messages } from '@/i18n';
//import { VueI18n } from 'vue-i18n';
//import { i18n } from '@/plugins/i18n';
//import { messages } from '@/i18n';
import axios from 'axios';
import { make } from "vuex-pathify";


interface LanguageByCode {
  name: string;
  code: string;
}

interface LanguageState {
  //languages: LanguageByCode[];
  nativeLanguages: LanguageByCode[];
  selectedLocaleCode: string;
  fromLanguageComboBox: string;

}

const state: LanguageState = {
  //languages: [],
  nativeLanguages:[],
  selectedLocaleCode: "en",
  fromLanguageComboBox: "From:"
     
}

const mutations = make.mutations(state);

const actions = {
  async loadLanguages({ commit, state} ) {  
 
    const url = 
    `https://einvoicetranslatorweb.azurewebsites.net/api/locale/getLanguageNamesByCodev2?LanguageCode=${state.selectedLocaleCode}`
    const { data } = await axios.get(url);
    
    commit("SET_LANGUAGES", data)
  },

  async loadAppComponentLocale({ commit, state} ) {  
 
    const url = 
    `https://einvoicetranslatorweb.azurewebsites.net/api/locale/gettranslatedlocale/?LanguageCode=${state.selectedLocaleCode}`
    const { data } = await axios.get(url);
   //TODO update the locale -> 
   //const $i18n.messages=`${state.selectedLocaleCode} + ":"+ ${data}`";
   
    commit("SET_LANGUAGES", data)
  },


  async loadNativeLanguages({ commit }) {
    const { data } = await axios.get("https://einvoicetranslatorweb.azurewebsites.net/api/locale/getNativeLanguageNamesFilev2/");
    commit("SET_NATIVE_LANGUAGES", data)
  },
  selectLocaleCode({ commit }, code) {
    commit("SET_SELECTED_LOCALE_CODE", code);
  },

  selectDefaultLocale({ commit }, code) {
    commit("SET_SELECTED_LOCALE_CODE", code);
  },
  saveSomething({ commit },  data) {
    const nroute="api/fileapi/savesomething/";
    return axios.post(`https://localhost:44390/${nroute}`, data
    
    );
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}