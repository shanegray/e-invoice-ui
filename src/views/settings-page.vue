<template>
  <div>
    <v-card class="mb-8">
      <v-card-title>Edit Invoice Translations</v-card-title>
      <v-card-text>
        <v-container class="pa-0">
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-select :label="$t('LanguageLabel')" 
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
                @change="getTranslatedWord"
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
            :items="words"
            :placeholder="$t('Label4Translate')" 
            filled

          ></v-text-field>
        </v-col>

        <v-btn class="ml-6" x-large color="green" dark>{{ $t('btnSave') }}</v-btn>
        <v-spacer></v-spacer>
        <v-btn x-large color="primary"> {{ $t('btnDownload') }}</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
    <!-- App Translation part -->
    <v-card>
      <v-card-title>Edit App {{ localeCode }} Translation</v-card-title>
      <v-card-text>
        <v-container class="pa-0">
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-select :label="$t('LanguageLabel')" 
              :items="languages"
                item-text="name"
                item-value="code"
               />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-select
                v-model="selectedItem"
                :label="$t('Locale2Translate')"
                
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
            name="txtReTranslation"
            :placeholder="$t('Label4Translate')" 
            filled
          ></v-text-field>
        </v-col>
        

        <v-btn
          :loading="saving"
          class="ml-6" 
          x-large 
          color="green" 
          dark 
          @click="saveMe">
          {{ $t('btnSave') }}
        </v-btn>
        
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
      selectedItem: "",
      saving: false
    }
  },
  async created() {
    await this.loadLanguages();
    await this.fillWords();
  },
  methods: {
    // getTranslatedWord: get("selectedWord")  ,
    loadLanguages: call("languageStore/loadLanguages"),
    ...call("languageStore", ["saveSomething"]),
    fillWords : call("languageStore/fillWords"),
    async saveMe() {
      this.saving = true;

      try {
        await this.saveSomething({FileContents: "this is OK", FileName:"test.txt"},"api/fileapi/savesomething/");
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
    words: get("languageStore/words")
  },
};
</script>
