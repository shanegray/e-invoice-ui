<!-- App Translation part -->
<template>
  <div>
    <v-card>
      <v-card-title class="ml-4">{{localeWords['AppTitle']}}</v-card-title>
      <v-card-text>
        <v-container class="pa-0">
          <v-row>
            <v-col cols="12" sm="4" md="6">
              <v-select
                class="ml-4"
                v-model="selectedLocaleWord"
                :items="GetLocaleWordArray"
                :label="localeWords['Cmb4ReTranslate']"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-row>
          <v-col cols="12" sm="6" md="8">
            <br />
            <v-text-field
              clearable
              class="ml-4"
              v-model="replacementLocaleWord"
              name="txtReTranslation"
              :placeholder="localeWords['TxtReplace']"
              filled
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-actions>

      <v-card-actions>
        <v-row>
          <v-btn
            @click="updateAppTranslation()"
            class="ml-8"
            color="light-green"
          >{{ localeWords['btnSave'] }}</v-btn>
        </v-row>
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
      selectedLocaleWord: "",
      replacementLocaleWord: "",
      wordToTranslate: "",
      saving: false,
      localeWordArray: [],
    };
  },
  async created() {
    //await this.loadLanguages();
    //await this.fillLocaleWords();
    //this.GetLocaleWordArray();
    // await this.SetLocaleWordArray();
  },
  methods: {
    ...call("languageStore", [
      "UpdateAppTranslation",
      "SetLocaleWordArray",
      "fillLocaleWords",
    ]),
    async updateAppTranslation() {
      this.saving = true;
      const translateLocale = {
        SelectedWord: this.selectedLocaleWord,
        ReplacementWord: this.replacementLocaleWord,
      };
      try {
        await this.UpdateAppTranslation(translateLocale);
        await this.fillLocaleWords();
        await this.SetLocaleWordArray();
      } finally {
        this.saving = false;
      }
    },
    //   try {
    //     await this.saveSomething({FileContents: "this is OK", FileName:"test.txt"},"api/fileapi/savesomething/");
    //   }
    //   finally {
    //     this.saving = false;
    //   }
    // }*/
  },
  computed: {
    localeWords: get("languageStore/localeWordDict"),
    GetLocaleWordArray: get("languageStore/localeWordArray"),
  },
};
</script>
