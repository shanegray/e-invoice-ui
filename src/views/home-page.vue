<template>
  <div>
    <v-card class="mb-8">
      <v-card-actions>
        <v-btn class="ml-6" x-large color="green" dark> {{ $t('UploadXMLTxt') }} </v-btn>
        <v-spacer></v-spacer>
        <v-col cols="12" sm="4" md="8">
          <v-file-input prepend-icon="" placeholder="XML File Name Goes Here"></v-file-input>          
        </v-col>
      </v-card-actions>
    </v-card>
    <v-card class="mb-8">
      <v-card-title> Translate Invoice from {{fromSelectedItem}} to {{toSelectedItem}}</v-card-title>
      <v-card-text>
        <v-container class="pa-0">
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-select v-model="fromSelectedItem" 
              
              :label="localeWords['FromLanguage']"
              :items="languages" 
              item-text="name" 
              item-value="code" />
            </v-col>
            <v-spacer/>
            <v-col cols="12" sm="6" md="4">
              <v-select
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
      <v-card-actions>
        <v-btn color="primary"
        @click="CreateInvoice()">
           {{ $t('btnCreateInvoiceTxt') }} </v-btn>
      </v-card-actions>
    </v-card>
    <v-card>
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
  </div>
</template>

<script>
import { call, get } from "vuex-pathify";

export default {
  data() {
    return {
      fromSelectedItem: "",
      toSelectedItem: ""
    };
  },
  async created() {
    await this.loadLanguages();
  },
  methods: {
    async CreateInvoice() {
      this.saving = true;

      try {
        await this.CreateInvoice({ToLanguage: "", FromLanguage: "", ToLanguageCode: "", FromLanguageCode: "", TextToTranslate: ""});
      }
      finally {
        this.saving = false;
      }
    },

    loadLanguages: call("languageStore/loadLanguages"),    
  },
  computed: {
    localeWords: get("languageStore/localeWords"),
    localeCode: get("languageStore/selectedLocaleCode"),
    languages: get("languageStore/languages"),
    fromLanguageComboBox: get("languageStore/fromLanguageComboBox"),
    ...get("languageStore"),
  },
};
</script>

