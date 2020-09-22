
import axios from 'axios';
import { make } from "vuex-pathify";

// axios.defaults.baseURL = "https://localhost:44390/"
axios.defaults.baseURL = "https://einvoicetranslatorweb.azurewebsites.net/"
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
    console.log(`state.selectedLocaleCode for loadlanguages: ${state.selectedLocaleCode}` )
    const url = 
    `api/locale/getLanguageNamesByCodev2?LanguageCode=${state.selectedLocaleCode}`
    const { data } = await axios.get(url);
    
    commit("SET_LANGUAGES", data)
    //console.log("languages set" )
  },

  async fillInvoiceWords({ commit } ) {  
   //console.log("fillInvoiceWords")
    const url = 
    `api/fileapi/getinvoiceWords/?languageCode=${state.selectedLocaleCode}`
    const { data } = await axios.get(url);
    //console.log("data: " + data)
    //console.log("first invoice word: " + data[4])
    commit("SET_INVOICE_WORDS", data)
    
  },

  async fillLocaleWords({ commit } ) {  
    
    const url = 
    `api/locale/getlocaletranslationv2/?languageCode=${state.selectedLocaleCode}`
    
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
    const { data } = await axios.get("api/locale/getNativeLanguageNamesFilev2/");
    commit("SET_NATIVE_LANGUAGES", data)
  },
  selectLocaleCode({ commit }, code) {
    commit("SET_SELECTED_LOCALE_CODE", code);
    //console.log("SelectedLocaleCode: " + state.selectedLocaleCode );
  },
  async SetLocaleWordArray({ commit }) {
    //console.log("running SetLocaleWordArray()")

    /* const url = 
    `api/locale/getlocaletranslationv2/?languageCode=${state.selectedLocaleCode}`
    
    const { data } = await axios.get(url);
      console.log("Locale code: " + state.selectedLocaleCode)
  */
      const LocaleWords=[];
      const lw = state.localeWordDict;
                      
      //console.log("lw: " + lw);
     Object.values(lw).forEach(function(value){
        //console.log("value: " + value)
        LocaleWords.push(value);
        
    })
    //console.log("LocaleWords:" + LocaleWords[0])
    commit("SET_LOCALE_WORD_ARRAY", LocaleWords)
    
  },
  // selectDefaultLocale({ commit }, code) {
  //   commit("SET_SELECTED_LOCALE_CODE", code);
  // },
   async UpdateInvoiceTranslation({ commit }, translateInvoice) {
    const data = {"LanguageCode": state.selectedLocaleCode,  "Language": "xxxxxx",  "SelectedWord": translateInvoice.SelectedWord, "TranslatedWord": translateInvoice.ReplacementWord}
    console.log("data:" + translateInvoice.SelectedWord)
    const nroute="api/translate/updateInvoicetranslation/";
    return axios.post(`${nroute}`, data);
    
  }, 

  async UpdateAppTranslation({ commit }, translateLocale) {
    const Appdata = {"LanguageCode": state.selectedLocaleCode,  "Language": "xxxxxx",  "SelectedWord": translateLocale.SelectedWord, "TranslatedWord": translateLocale.ReplacementWord}
   // console.log("data:" + translateLocale.SelectedWord)
    //console.log("data:" + translateLocale.ReplacementWord)
    const nroute="api/locale/updatelocale/";
    return axios.post(`${nroute}`, Appdata);
   
  }, 

  async invoiceCreate(  data) {
    //console.log("data:" + data)
    const nroute="api/translate/convertxml2html";
    const response = await axios.post(`${nroute}`, data);
    return response.data
  },

  async testTranslation({ commit},  request) {
    //console.log("data:" + request)
    
    const nroute="api/translate/testpage/";
    //console.log("route: " + nroute)
    //https://einvoicetranslatorweb.azurewebsites.net/
    //https://localhost:44390/
    const response = await axios.post(`https://einvoicetranslatorweb.azurewebsites.net/${nroute}`, request )
    //console.log("response.data:" + response.data)
    commit("SET_TRANSLATION", response.data);
    return response.data    
  },
  async Getpdf({ commit},userAppIdentification) {
    //console.log("userAppIdentification " + userAppIdentification)
    axios({
          url: `api/fileapi/gettranslatedpdf/?userAppIdentification=${userAppIdentification}`,
          method: 'GET',
          responseType: 'blob',
      }).then((response) => {
           const fileURL = window.URL.createObjectURL(new Blob([response.data]));
           const fileLink = document.createElement('a');

           fileLink.href = fileURL;
           fileLink.setAttribute('download', 'file.pdf');
           document.body.appendChild(fileLink);

           fileLink.click();
      });
},
async Getxml({ commit},userAppIdentification) {
  
  axios({
        url: `api/fileapi/gettranslatedxml/?userAppIdentification=${userAppIdentification}`,
        method: 'GET',
        responseType: 'blob',
    }).then((response) => {
         const fileURL = window.URL.createObjectURL(new Blob([response.data]));
         const fileLink = document.createElement('a');

         fileLink.href = fileURL;
         fileLink.setAttribute('download', 'file.xml');
         document.body.appendChild(fileLink);

         fileLink.click();
    });
},

}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}