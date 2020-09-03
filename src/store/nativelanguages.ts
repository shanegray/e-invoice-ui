import axios from 'axios';
import { make } from "vuex-pathify";

interface LanguageByCode {
  name: string;
  code: string;
}

interface LanguageState {
  nativelanguages: LanguageByCode[];
  selectedCode: string;
}

const state: LanguageState = {
  nativelanguages: [],
  selectedCode: ""
}

const mutations = make.mutations(state);

const actions = {
  //async loadLanguages({ commit }) {
    //const { data } = await axios.get("https://einvoicetranslatorweb.azurewebsites.net/api/locale/getLanguageNamesByCodev2?LanguageCode=en");
    //commit("SET_LANGUAGES", data)
  //}//,
  async loadNativeLanguages({ commit }) {
    const { data } = await axios.get("https://einvoicetranslatorweb.azurewebsites.net/api/locale/getNativeLanguageNamesFilev2/");
    commit("SET_NATIVELANGUAGES", data)
  },
  selectLanguageCode({ commit }, code) {
    commit("SET_SELECTED_CODE", code);
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