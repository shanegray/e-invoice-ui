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

  menuItems: [object,object,object,object];
  Translation: string;

  invoiceWords: [];
  localeWordDict: [];
  localeWordArray: [];

}

const state: LanguageState = {
  languages: [],
  nativeLanguages:[],
  
  selectedLocaleCode: "en",
 
  menuItems: [
    { title: 'Create', icon: 'mdi-file-edit-outline', url: "/" },
    { title: 'Test Translation', icon: 'mdi-file-document-outline', url: "/test" },
    { title: 'Invoice Settings', icon: 'mdi-cog-outline', url: "/invoicesettings" },
    { title: 'App Settings', icon: 'mdi-cogs', url: "/appsettings" },
    // { title: 'example', icon: 'mdi-cog-outline', url: "/example" },
  ],
  Translation: "",

  invoiceWords: [],
  localeWordDict: [],
  localeWordArray: []
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

  async fillInvoiceWords({ commit } ) {  
   console.log("fillInvoiceWords")
    const url = 
    `https://einvoicetranslatorweb.azurewebsites.net/api/fileapi/getWords`
    const { data } = await axios.get(url);
    console.log("data: " + data)
    console.log("first invoice word: " + data[4])
    commit("SET_INVOICE_WORDS", data)
    
  },

  async fillLocaleWords({ commit } ) {  
    
    const url = 
    `https://einvoicetranslatorweb.azurewebsites.net/api/locale/getlocaletranslationv2/?languageCode=${state.selectedLocaleCode}`
    
    const { data } = await axios.get(url);
    
    commit("SET_LOCALE_WORD_DICT", data)
    commit("SET_MENU_ITEMS",
    [
      { title: state.localeWordDict['navbarCreate'], icon: 'mdi-file-edit-outline', url: "/" },
      { title: state.localeWordDict['navbarTest'], icon: 'mdi-file-document-outline', url: "/test" },
      { title: state.localeWordDict['navbarInvoice'], icon: 'mdi-cog-outline', url: "/invoicesettings" },
      { title: state.localeWordDict['navbarApp'], icon: 'mdi-cogs', url: "/appsettings" }
    ])
   
  },

  async loadNativeLanguages({ commit }) {
    const { data } = await axios.get("https://einvoicetranslatorweb.azurewebsites.net/api/locale/getNativeLanguageNamesFilev2/");
    commit("SET_NATIVE_LANGUAGES", data)
  },
  selectLocaleCode({ commit }, code) {
    commit("SET_SELECTED_LOCALE_CODE", code);
   // console.log("Local code = " + code );
  },
  async SetLocaleWordArray({ commit }) {
    console.log("running SetLocaleWordArray()")

    const url = 
    `https://einvoicetranslatorweb.azurewebsites.net/api/locale/getlocaletranslationv2/?languageCode=${state.selectedLocaleCode}`
    
    const { data } = await axios.get(url);
    
 
      const LocaleWords=[];
      const lw = data
                      
      console.log("lw: " + lw);
     Object.values(lw).forEach(function(value){
        console.log("value: " + value)
        LocaleWords.push(value);
    })
    commit("SET_LOCALE_WORD_ARRAY", LocaleWords)
  },
  selectDefaultLocale({ commit }, code) {
    commit("SET_SELECTED_LOCALE_CODE", code);
  },
  /* saveSomething({ commit },  data) {
    console.log("data:" + data)
    const nroute="api/fileapi/savesomething/";
    return axios.post(`https://einvoicetranslatorweb.azurewebsites.net/${nroute}`, data
    
    );
  }, */

  async invoiceCreate(  data) {
    console.log("data:" + data)
    const nroute="api/translate/convertxml2html";
    const response = await axios.post(`https://einvoicetranslatorweb.azurewebsites.net/${nroute}`, data);
    return response.data
  },

  async testTranslation({ commit},  request) {
    console.log("data:" + request)
    
    const nroute="api/translate/testpage/";
    console.log("route: " + nroute)

    const response = await axios.post(`https://einvoicetranslatorweb.azurewebsites.net/${nroute}`, request )
    console.log("response.data:" + response.data)
    commit("SET_TRANSLATION", response.data);
    return response.data    
  },

}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}