<template>
  <div>
    <v-card class="mb-8">
      <v-card-title class="ml-4">{{localeWords['InvoiceTitle']}}</v-card-title>
      <v-card-text>
        <v-container class="pa-0">
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-select
                class="ml-4"
               
                v-model="selectedWord"
                :label="localeWords['Cmb4ReTranslate']"
                :items="invoicewords"
              />
            </v-col>

            <!-- <v-col cols="12" sm="6" md="6">
              <v-select
                name="ToLanguage"
                :label="localeWords['labelSelectLang']"
                v-model="toLanguageCode"
                @change="SetInvoiceWords"
                :items="languages"
                item-text="name"
                item-value="code"
              />
            </v-col> -->
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-col cols="12" sm="6" md="8">
          <br />
          <v-text-field 
          v-model="replacementWord"
          :placeholder="localeWords['TxtReplace']" filled></v-text-field>
        </v-col>

        <v-btn
          @click="updateTranslation()"
          class="ml-6"
          x-large
          color="green"
          dark
        >{{ localeWords['btnSave'] }}</v-btn>
        <v-spacer></v-spacer>
        <v-btn x-large color="primary">{{ localeWords['btnGetXSLT'] }}</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import languageStore from "@/store/languageStore";
import { call, get } from "vuex-pathify";

export default {
  data() {
    return {
      selectedWord: "",
      replacementWord: "",
      saving: false,
    };
  },
  async created() {
    //await this.loadLanguages();
    //await this.fillInvoiceWords();
    // this.toLanguageCode = this.localeCode;
    // await this.SetLocaleWordArray(this.selectedWord);
  },
  methods: {
    // getTranslatedWord: get("selectedWord")  ,
    // localeCode: get("languageStore/selectedLocaleCode"),
    ...call("languageStore", ["fillInvoiceWords"]),

    async SetInvoiceWords() {
      await this.fillInvoiceWords();
    },
    // async SetStoreLocaleWordArray(){
    //   await this.SetLocaleWordArray(this.selectedWord);
    // },
    //loadLanguages: call("languageStore/loadLanguages"),

    // ...call("languageStore", ["saveSomething"]),
    // async saveMe() {
    //   this.saving = true;

    ...call("languageStore", ["UpdateInvoiceTranslation"]),
    async updateTranslation() {
      const translateObject={SelectedWord: this.selectedWord, TranslatedWord: this.replacementWord }
      try {
        this.saving = true;
        await this.UpdateInvoiceTranslation(translateObject);
      } finally {
        this.saving = false;
      }
    },
  },
  computed: {
    //languages: get("languageStore/languages"),
    localeWords: get("languageStore/localeWordDict"),
    //localeCode: get("languageStore/selectedLocaleCode"),
    //...get("languageStore"),
    // fills invoice words in combo box in invoice translation
    invoicewords: get("languageStore/invoiceWords"),
  },
};
</script>
