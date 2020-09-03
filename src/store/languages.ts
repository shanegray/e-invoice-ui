import axios from 'axios';
import { make } from "vuex-pathify";

interface LanguageByCode {
  name: string;
  code: string;
}

interface LanguageState {
  languages: LanguageByCode[];

}

const state: LanguageState = {
  languages: []
}

const mutations = make.mutations(state);

const actions = {
  async loadLanguages({ commit }) {
    const { data } = await axios.get("https://einvoicetranslatorweb.azurewebsites.net/api/locale/getLanguageNamesByCodev2?LanguageCode=en");
    commit("SET_LANGUAGES", data)
  }//,
  //async loadNativeLanguages({ commit }) {
   // const { data } = await axios.get("https://einvoicetranslatorweb.azurewebsites.net/api/locale/getNativeLanguageNamesFile/");
    //commit("SET_NATIVELANGUAGES", data)
  //}
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}