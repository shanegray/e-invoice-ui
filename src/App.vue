<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <NavDrawer />
    </v-navigation-drawer>

    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="blue darken-3" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">E-Invoice Translator</span>
      </v-toolbar-title>
      <v-col cols="12" sm="4" md="6">
        <v-select
          flat
          solo-inverted
          hide-details
          v-model="selectedItem"
          label="Select App Language"
          :items="nativelanguages"
          item-text="name"
          item-value="code"
          @change="localeCodeSelected"
        ></v-select>
      </v-col>
    </v-app-bar>
    <v-main>
      <v-label>selected code = {{localeCode}}</v-label>
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

export default {
  components: {
    NavDrawer,
  },
  data: () => ({
    drawer: null,     
    selectedItem: "",    
  }),
  async created() {
    await this.loadNativeLanguages();
  },
  methods: {
  //  ...call("languages", ["loadLanguages"]),
  //  languageSelected() {
  //    this.selectLanguageCode(this.selectedItem)
 //   }
 // },
  ...call("languages", [ "loadNativeLanguages","selectLocaleCode"]),
    localeCodeSelected() {
      call("languages", ["loadFrenchLanguages"]),
      this.selectLocaleCode(this.selectedItem)
    }
    },
  computed: {
    nativelanguages: get("languages/nativeLanguages"),
    localeCode: get("languages/selectedLocaleCode"),
    ...get("languages")
  },
};
</script>