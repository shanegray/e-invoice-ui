import axios from 'axios';
import { make } from "vuex-pathify";

interface LanguageByCode {
  name: string;
  code: string;
}

interface LanguageState {
  languages: LanguageByCode[];
  nativeLanguages: LanguageByCode[];
  selectedLocaleCode: string;
}

const state: LanguageState = {
  languages: [],
  nativeLanguages:[],
  selectedLocaleCode: "en"
}

const mutations = make.mutations(state);

const actions = {
  async loadLanguages({ commit }) {
    const { data } = await axios.get("https://einvoicetranslatorweb.azurewebsites.net/api/locale/getLanguageNamesByCodev2?LanguageCode=en" );
    commit("SET_LANGUAGES", data)
  },
  async loadFrenchLanguages({ commit }) {
    const { data } = await axios.get("https://einvoicetranslatorweb.azurewebsites.net/api/locale/getLanguageNamesByCodev2?LanguageCode=fr" );
    commit("SET_LANGUAGES", data)
  },
  async loadNativeLanguages({ commit }) {
    const { data } = await axios.get("https://einvoicetranslatorweb.azurewebsites.net/api/locale/getNativeLanguageNamesFilev2/");
    commit("SET_NATIVE_LANGUAGES", data)
  },
  selectLocaleCode({ commit }, code) {
    commit("SET_SELECTED_LOCALE_CODE", code);
  },
  saveSomething({ commit }, { something }) {
    return axios.post("https://einvoicetranslatorweb.azurewebsites.net/api/saveSomething", something);
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}