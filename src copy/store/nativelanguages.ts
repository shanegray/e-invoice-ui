import axios from 'axios';
import { make } from "vuex-pathify";

interface LanguageByCode {
  name: string;
  code: string;
}

interface LanguageState {
  nativelanguages: LanguageByCode[];
}

const state: LanguageState = {
  nativelanguages: []
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
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}