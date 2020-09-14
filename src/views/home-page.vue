<template>
  <div>
    <v-form
      ref="form"
      target="_blank"
      method="post"
      enctype="multipart/form-data"
      action="https://einvoicetranslatorweb.azurewebsites.net/api/translate/convertxml2htmlv2"
    >
      <v-card class="mb-8">
        <v-card-title>Translate Invoice from {{fromSelectedItem}} to {{toSelectedItem}}</v-card-title>
        <v-card-text>
          <v-container class="pa-0">
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-select 
                  class="ml-3"
                  name="FromLanguageCode"
                  v-model="fromSelectedItem"
                  :label="localeWords['FromLanguage']"
                  :items="languages"
                  item-text="name"
                  item-value="code"
                />
              </v-col>
              <v-spacer />
              <v-col cols="12" sm="6" md="4">
                <v-select
                  name="ToLanguageCode"
                  v-model="toSelectedItem"
                  :label="$t('ToLanguage')"
                  :items="languages"
                  item-text="name"
                  item-value="code"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="4" md="6">
                <v-file-input v-model="XMLFile" name="attachment" prepend-icon placeholder="Click To Upload"></v-file-input>
              </v-col>
              <v-spacer />
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-text>
          <v-container class="ml-3">
            <v-row>
              <v-btn :loading="saving" @click="submit" color="green darken-2" dark>Convert to HTML</v-btn>
              <v-spacer />
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>

      <v-card>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary">Get XML</v-btn>
          <v-spacer />
          <v-btn color="primary">Get PDF</v-btn>
          <v-spacer />
          <v-btn color="primary">Get XSLT</v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-form>
  </div>
</template>

<script>
import { call, get } from "vuex-pathify";

export default {
  data() {
    return {
      fromSelectedItem: "",
      toSelectedItem: "",
      saving: false,
      XMLFile: null,
    };
  },
  async created() {
    await this.loadLanguages();
  },
  methods: {
    async saveMe() {
      this.saving = true;

      try {
        await this.saveSomething({FileContents: "this is OK", FileName:"test.txt"},"api/fileapi/savesomething/");
      }
      finally {
        this.saving = false;
      }
    },

    submit : function(){
      this.saving = true;
      try{
      this.$refs.form.$el.submit()
      console.log("The form Data ", this.XMLFile.FileName)

      }
      finally{
        this.saving = false;
      }
    },

    loadLanguages: call("languageStore/loadLanguages"),
  },
  computed: {
    localeWords: get("languageStore/localeWords"),
    localeCode: get("languageStore/selectedLocaleCode"),
    languages: get("languageStore/languages"),
    //fromLanguageComboBox: get("languageStore/fromLanguageComboBox"),
    ...get("languageStore"),
  },
};
</script>

