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
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-row>
          <v-col cols="12" sm="6" md="8">
            <br />
            <v-text-field
              class="ml-4"
              v-model="replacementWord"
              :placeholder="localeWords['TxtReplace']"
              filled
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-actions>

      <v-card-actions>
        <v-row>
          <v-btn class="ml-8" @click="updateTranslation()" color="green" dark>{{ localeWords['btnSave'] }}</v-btn>
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
      selectedWord: "",
      replacementWord: "",
      saving: false,
    };
  },

  methods: {
    ...call("languageStore", ["UpdateInvoiceTranslation", "fillInvoiceWords"]),
    async updateTranslation() {
      this.saving = true;
      const translateObject = {
        SelectedWord: this.selectedWord,
        ReplacementWord: this.replacementWord,
      };
      try {
        //console.log("this.selectedWord: " + this.selectedWord);
        //console.log("translate Object: " + translateObject.SelectedWord);
        await this.UpdateInvoiceTranslation(translateObject);
        await this.fillInvoiceWords();
      } finally {
        this.saving = false;
      }
    },
  },
  computed: {
    localeWords: get("languageStore/localeWordDict"),

    invoicewords: get("languageStore/invoiceWords"),
  },
};
</script>
