<template>
  <div>
    <v-card class="mb-8">
      <v-card-title>Edit Invoice Translations</v-card-title>
      <v-card-text>
        <v-container class="pa-0">
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-select name="ToLanguage" :label="$t('LanguageLabel')"
                v-model="toLanguageCode" 
                :items="languages"
                item-text="name"
                item-value="code"
              />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-select
                v-model="SelectedWord"
                :label="$t('Locale2Translate')"
                :items="words"
                @change="Translation()"
              />
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-col cols="12" sm="6" md="8">
          <br>
          <v-text-field
            v-model="SelectedWord"            
            :placeholder="$t('Label4Translate')" 
            filled
            @change="Translation()"
          ></v-text-field>
        </v-col>

        <v-btn class="ml-6" x-large color="green" dark>{{ $t('btnSave') }}</v-btn>
        <v-spacer></v-spacer>
        <v-btn x-large color="primary"> {{ $t('btnDownload') }}</v-btn>
        <v-spacer></v-spacer>
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
    await this.loadLanguages();
    await this.fillWords();
  },
  methods: {
    // getTranslatedWord: get("selectedWord")  ,
    fillWords : call("languageStore/fillWords"),  
    loadLanguages: call("languageStore/loadLanguages"),

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
    ...get("languageStore"),
    localeCode: get("languageStore/selectedLocaleCode"),
    // fills words in combo box in invoice translation
    words: get("languageStore/words"),
  },
};
</script>
