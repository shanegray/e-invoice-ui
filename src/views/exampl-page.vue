<!-- I'm using this page for examples and how they -->
<template>
  <v-form ref="form">
    <v-select
      v-model="fromSelectedItem"
      :label="$t('FromLanguage')"
      :items="languages"
      item-text="name"
      item-value="code"
    />

    <v-select
      v-model="toSelectedItem"
      :label="$t('ToLanguage')"
      :items="languages"
      item-text="name"
      item-value="code"
    />

    <v-card-text>
      <v-col cols="12" sm="6" md="8">
        <v-text-field placeholder="Enter in new file name" filled></v-text-field>
      </v-col>
    </v-card-text>

    <v-btn class="mr-4">submit</v-btn>
    <v-btn>clear</v-btn>
  </v-form>
</template>

<script>
import { call, get } from "vuex-pathify";

export default {
  data() {
    return {
      fromSelectedItem: "",
      toSelectedItem: "",
    };
  },
  async created() {
    await this.loadLanguages();
  },
  methods: {
    loadLanguages: call("languageStore/loadLanguages"),
  },
  computed: {
    localeCode: get("languageStore/selectedLocaleCode"),
    languages: get("languageStore/languages"),
    fromLanguageComboBox: get("languageStore/fromLanguageComboBox"),
    ...get("languageStore"),
  },
};
</script>