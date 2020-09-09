<!-- App Translation part -->
<template>
  <div>
    <v-card>
      <v-card-title>Edit App {{ localeCode }} Translation</v-card-title>
      <v-card-text>
        <v-container class="pa-0">
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-select
                :label="$t('LanguageLabel')"
                :items="languages"
                item-text="name"
                item-value="code"
              />
            </v-col>
            <!-- :items="localewords" -->
            <v-col cols="12" sm="6" md="4">
                <v-select
                    v-model="selectedLocaleWord"
                    :items="localewords"
                    :label="$t('Locale2Translate')"
                />
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-col cols="12" sm="6" md="8">
          <br />
          <v-text-field name="txtReTranslation" :placeholder="$t('Label4Translate')" filled></v-text-field>
        </v-col>

        <v-btn
          :loading="saving"
          class="ml-6"
          x-large
          color="green"
          dark
          @click="saveMe"
        >{{ $t('btnSave') }}</v-btn>
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
      selectedLocaleWord: "",
      selectedItem: "",
      saving: false
    }
  },
  async created() {
    await this.loadLanguages();
    await this.fillLocaleWords();
  },
  methods: {
    // getTranslatedWord: get("selectedWord")  ,
    loadLanguages: call("languageStore/loadLanguages"),
    ...call("languageStore", ["saveSomething"]),
    //TODO fix list coming back properly
    fillLocaleWords : call("languageStore/fillLocaleWords"),
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
    // fills words in combo box in app translation (Needs to be fixed)
    localewords: get("languageStore/localeWords")
  },
};
</script>
