<!-- I'm using this page for examples and how they -->
<template>
  <v-form ref="form" target="_blank" method="post" enctype="multipart/form-data" action="https://einvoicetranslatorweb.azurewebsites.net/api/translate/convertxml2htmlv2">
    <v-card>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-select
                name="FromLanguageCode"
                v-model="fromSelectedItem"
                :label="$t('FromLanguage')"
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
            <v-spacer />
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-text>
        <v-container>
          <v-row>            
            <!-- <input type="file" class="mt-4" x-large /> 
            <v-spacer /> -->
            <v-col cols="12" sm="4" md="6">
              <v-file-input name="attachment" prepend-icon="" placeholder="Click To Upload"></v-file-input>
            </v-col>
            <v-spacer />

            
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-text>
        <v-container ml-4>
          <v-row>
            <!-- <input type="submit" value="Send" class="mr-4" color="green" dark/> -->
            <v-btn @click="submit" color="green darken-2" dark>Convert to HTML</v-btn>
            <!-- <v-btn color="red darken-2" dark>clear</v-btn> -->
            <v-spacer />
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>

    <v-card class="mt-5">
      <v-card-actions>
      <v-spacer />
      <v-btn  color="primary">{{ $t('btnSave_XML') }}</v-btn>
      <v-spacer />
      <v-btn  color="primary">Download PDF</v-btn>
      <v-spacer />
      <v-btn  color="primary">{{ $t('btnSaveXSLT') }}</v-btn>
      <v-spacer />
      </v-card-actions>
    </v-card>
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
    submit : function(){
      this.$refs.form.$el.submit()
    }
  },
  computed: {
    localeCode: get("languageStore/selectedLocaleCode"),
    languages: get("languageStore/languages"),
    fromLanguageComboBox: get("languageStore/fromLanguageComboBox"),
    ...get("languageStore"),
  },
};
</script>