//import { messages } from '@/i18n';
//import { VueI18n } from 'vue-i18n';
//import { i18n } from '@/plugins/i18n';
//import { messages } from '@/i18n';
import axios from 'axios';
import { make } from "vuex-pathify";
//import enData from "@/i18n/LanguageFileEN.json"

interface LanguageByCode {
  name: string;
  code: string;
}

interface FillWords {
  Word: string;
}

interface LanguageState {
  languages: LanguageByCode[];
  nativeLanguages: LanguageByCode[];
  selectedLocaleCode: string;
  localeLanguageComboBox: string;
  fromLanguageComboBox: string;
 
  Translation: string;

  words: [];
  localeWords: [];
  invoiceTranslatedLanguages: [];
}

const state: LanguageState = {
  languages: [],
  nativeLanguages:[],
  
  selectedLocaleCode: "en",
  fromLanguageComboBox: "From:",
  localeLanguageComboBox: "English",
  Translation: "",

  words: [],
  localeWords: [],
  invoiceTranslatedLanguages: [],
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

  async loadInvoiceTranslatedLanguages({ commit } ) {  
 
    const url = 
    `https://einvoicetranslatorweb.azurewebsites.net/api/fileapi/gettranslatedlanguages`
    const { data } = await axios.get(url);
    
    commit("SET_LANGUAGES", data)
    //console.log("languages set" )
  },

  async fillWords({ commit } ) {  
 
    const url = 
    `https://einvoicetranslatorweb.azurewebsites.net/api/fileapi/getWords`
    const { data } = await axios.get(url);
    
    commit("SET_WORDS", data)
    console.log("data: " + data )
  },

  async fillLocaleWords({ commit, state } ) {  
    //TODO fix words coming back as [object object] might have to make a v2 version
    const url = 
    `https://einvoicetranslatorweb.azurewebsites.net/api/locale/getlocaletranslationv2/?languageCode=${state.selectedLocaleCode}`
    
    const { data } = await axios.get(url);
    
    commit("SET_LOCALE_WORDS", data)
   
    console.log("fromLabel :" + data['fromLabel'])
  },

  /* async loadAppComponentLocale({ commit, state} ) {  
 
    const url = 
    `https://einvoicetranslatorweb.azurewebsites.net//api/locale/gettranslatedlocalev2/?LanguageCode=${state.selectedLocaleCode}`
    const { data } = await axios.get(url);
    
    commit("SET_APP_COMPONENT_LANGUAGES", data);
    //this.$i18n.locale=this.state.selectedLocaleCode;
    //this.i18n.messages=data;
    console.log(`App languages set for ${state.selectedLocaleCode}` )
  }, */


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
    return axios.post(`https://einvoicetranslatorweb.azurewebsites.net/${nroute}`, data
    
    );
  },

  async invoiceCreate({ commit },  data) {
    console.log("data:" + data)
    const nroute="api/translate/convertxml2html";
    const response = await axios.post(`https://einvoicetranslatorweb.azurewebsites.net/${nroute}`, data);
    return response.data
  },

  async testTranslation({ commit, state},  request) {
    console.log("data:" + request)
    
    const nroute="api/translate/testpage/";
    console.log("route: " + nroute)

    const response = await axios.post(`https://einvoicetranslatorweb.azurewebsites.net/${nroute}`, request )
    console.log("response.data:" + response.data)
    commit("SET_TRANSLATION", response.data);
    return response.data    
  },

  async fillTranslation({ commit }, data ) {  
    console.log("data:" + data)
    
    const nroute="api/translate/gettranslationv2";
    console.log("route: " + nroute)

    const response = await axios.post(`https://einvoicetranslatorweb.azurewebsites.net/${nroute}`, data )
    return response.data
  },
  
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}