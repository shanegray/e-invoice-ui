<template>
  <div>
    <v-card class="mb-8">
      <v-card-title>{{localeWords['InvoiceTitle']}}</v-card-title>
      <v-card-text>
        <v-container class="pa-0">
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-select name="ToLanguage" :label="localeWords['labelSelectLang']"
                v-model="toLanguageCode" 
                 @change="SetInvoiceWords"
                :items="languages"
                item-text="name"
                item-value="code"
              />
            </v-col>
            <v-spacer/>
            <v-col cols="12" sm="6" md="4">
              <v-select
                v-model="SelectedWord"
                :label="localeWords['Cmb4ReTranslate']"
                :items="invoicewords"
               
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-col cols="12" sm="6" md="8">
          <br>
          <v-text-field
            :placeholder="localeWords['TxtReplace']" 
            filled
          ></v-text-field>
        </v-col>

        <v-btn 
         @click="Translation()"
        class="ml-6" 
        x-large color="green" 
        dark
        >{{ localeWords['btnSave'] }}</v-btn>
        <v-spacer></v-spacer>
        <v-btn x-large color="primary"> {{ localeWords['btnGetXSLT'] }}</v-btn>
      </v-card-actions>
    </v-card>
    
  </div>
</template>

<script>
import languageStore from '@/store/languageStore';
import { call, get } from "vuex-pathify";

export default {
  data() {
    return {
      SelectedWord: "",
      toLanguageCode: "",
      saving: false
    }
  },
  async created() {
    //await this.loadLanguages();
    //await this.fillInvoiceWords();
  },
  methods: {
    // getTranslatedWord: get("selectedWord")  ,
    // localeCode: get("languageStore/selectedLocaleCode"),
    ...call("languageStore", ["fillInvoiceWords"]),
    
     async SetInvoiceWords(){
      await this.fillInvoiceWords();
    },
    //loadLanguages: call("languageStore/loadLanguages"),

    ...call("languageStore", ["saveSomething"]),     
    async saveMe() {
      this.saving = true;

      try {
        await this.saveSomething({FileContents: "this is OK", FileName:"test.txt"});
      }
      finally {
        this.saving = false;
      }
    },
     ...call("languageStore", ["fillTranslation"]),
     async Translation() {

      try {
        //TODO Fix so it sends actual language and language code 
        await this.fillTranslation({TextToTranslate: `${this.SelectedWord}`, ToLanguage: "", ToLanguageCode: `${this.toLanguageCode}`, FromLanguageCode: "en", FromLanguage: "English" });
      }
      finally {
        this.saving = false;
      }
      
     }
  },
  computed: {
    languages: get("languageStore/languages"),
    localeWords: get("languageStore/localeWordDict"),
    //...get("languageStore"),
    // fills invoice words in combo box in invoice translation
    invoicewords: get("languageStore/invoiceWords"),
  },
};
</script>
