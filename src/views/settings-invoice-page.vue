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
 
  methods: {
   
    ...call("languageStore", ["UpdateInvoiceTranslation"]),
    async updateTranslation() {
      this.saving = true;
      const translateObject={SelectedWord: this.selectedWord, TranslatedWord: this.replacementWord };
      try {
        await this.UpdateInvoiceTranslation(translateObject);
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
