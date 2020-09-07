//import { messages } from '@/i18n';
//import { VueI18n } from 'vue-i18n';
//import { i18n } from '@/plugins/i18n';
//import { messages } from '@/i18n';
import axios from 'axios';
import { make } from "vuex-pathify";
import enData from "@/i18n/LanguageFileEN.json"

interface LanguageByCode {
  name: string;
  code: string;
}

interface LanguageState {
  languages: LanguageByCode[];
  nativeLanguages: LanguageByCode[];
  selectedLocaleCode: string;
  fromLanguageComboBox: string;
  appComponentLanguages: {};


}

const state: LanguageState = {
  languages: [],
  nativeLanguages:[],
  appComponentLanguages:  enData,
  selectedLocaleCode: "en",
  fromLanguageComboBox: "From:",

     
}

const mutations = make.mutations(state);

const actions = {
  async loadLanguages({ commit, state} ) {  
 
    const url = 
    `https://einvoicetranslatorweb.azurewebsites.net/api/locale/getLanguageNamesByCodev2?LanguageCode=${state.selectedLocaleCode}`
    const { data } = await axios.get(url);
    
    commit("SET_LANGUAGES", data)
    //console.log("languages set" )
  },

  async loadAppComponentLocale({ commit, state} ) {  
 
    const url = 
    `https://localhost:44390/api/locale/gettranslatedlocale/?LanguageCode=${state.selectedLocaleCode}`
    const { data } = await axios.get(url);
    
    commit("SET_APP_COMPONENT_LANGUAGES", data);
    //this.$i18n.locale=this.state.selectedLocaleCode;
    //this.i18n.messages=data;
    console.log(`App languages set for ${state.selectedLocaleCode}` )
  },


  async loadNativeLanguages({ commit }) {
    const { data } = await axios.get("https://einvoicetranslatorweb.azurewebsites.net/api/locale/getNativeLanguageNamesFilev2/");
    commit("SET_NATIVE_LANGUAGES", data)
  },
  selectLocaleCode({ commit }, code) {
    commit("SET_SELECTED_LOCALE_CODE", code);
   // console.log("Local code = " + code );
  },

  selectDefaultLocale({ commit }, code) {
    commit("SET_SELECTED_LOCALE_CODE", code);
  },
  saveSomething({ commit },  data) {
    console.log("data:" + data)
    const nroute="api/fileapi/savesomething/";
    return axios.post(`https://localhost:44390/${nroute}`, data
    
    );
  },
  async testTranslation({ commit },  request) {
    console.log("data:" + request)
    
    const nroute="api/translate/testpage/";
    console.log("route: " + nroute)

    const response = await axios.post(`https://localhost:44390/${nroute}`, request )
    return response.data
    
  }
  
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}