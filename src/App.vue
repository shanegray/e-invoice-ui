<template>
  <v-app ref="formContainer">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <NavDrawer />
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">E-Invoice Translator</span>
      </v-toolbar-title>
      <v-spacer />
      <v-col cols="5" sm="3" md="3">
        <v-select
          flat
          solo-inverted
          hide-details
          v-model="selectedLocaleCode"
          label="Select App Language"
          :items="nativelanguages"
          item-text="name"
          item-value="code"
          @change="localeCodeSelected"
        ></v-select>
      </v-col>
    </v-app-bar>
    <v-main>
      <!--<v-label>{{$t('UploadXMLTxt')}}</v-label>-->
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
import NavDrawer from "@/components/nav-drawer";
import { call, get } from "vuex-pathify";
import Vue from "vue";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
// Init plugin
Vue.use(Loading);

//import { LOCALES, Locales } from "@/i18n/locales";
//import { defaultLocale } from "@/i18n";

export default {
  components: {
    NavDrawer,
  },
  data: () => ({
    drawer: null,
    selectedLocaleCode: "",
    fullPage: false,
  }),
  async created() {
    const loader = this.$loading.show({
      // Optional parameters
      loader: "bars",
      color: "#1565C0",
      width: 100,
      height: 75,
      container: this.fullPage ? null : this.$refs.formContainer,
      canCancel: true,
      onCancel: this.onCancel,
    });
    await this.setLocalCode();
    await this.loadNativeLanguages();
    await this.localeCodeSelected();
    loader.hide();
  },

  methods: {
    async setLocalCode() {
      console.log("Browser Language = " + navigator.language.substr(0, 2));
      if (localStorage.localeCode) {
        this.selectedLocaleCode = localStorage.localeCode;
      } else {
        //get browser locale
        this.selectedLocaleCode = navigator.language.substr(0, 2);
      }
      console.log("This selected code: " + this.selectedLocaleCode);
      let appId = 0;
      if (localStorage.appIdentifier) {
        appId = localStorage.appIdentifier;
        console.log(
          "App Identifier in local storage " + localStorage.appIdentifier
        );
      } else {
        localStorage.appIdentifier = Math.floor(Math.random() * 100000000 + 1);
      }
      console.log("App Identifier " + localStorage.appIdentifier);
    },

    ...call("languageStore", ["fillInvoiceWords"]),

    async SetInvoiceWords() {
      await this.fillInvoiceWords();
    },

    ...call("languageStore", [
      "loadNativeLanguages",
      "selectLocaleCode",
      "loadLanguages",
      "fillLocaleWords",
      "SetLocaleWordArray",
    ]),

    async localeCodeSelected() {
      const loader = this.$loading.show({
        // Optional parameters
        loader: "bars",
        color: "#1565C0",
        width: 100,
        height: 75,
      });
      await this.selectLocaleCode(this.selectedLocaleCode),
        await this.loadLanguages();
      await this.fillLocaleWords();
      await this.SetLocaleWordArray();
      await this.fillInvoiceWords();
      loader.hide();

      localStorage["localeCode"] = this.selectedLocaleCode;
    },
  },

  computed: {
    nativelanguages: get("languageStore/nativeLanguages"),
    localeCode: get("languageStore/selectedLocaleCode"),
    ...get("languageStore"),
  },
};
</script>
<style>
.v-main {
  background-color: rgb(241, 241, 241);
}
</style>