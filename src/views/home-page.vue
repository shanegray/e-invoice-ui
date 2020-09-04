<template>
  <div>
    <v-card class="mb-8">
      <v-card-actions>
        <v-btn class="ml-6" x-large color="green" dark>Upload XML File</v-btn>
        <v-spacer></v-spacer>
        <v-col cols="12" sm="4" md="8">
          <v-chip label large outlined color="black">XML File Name Goes Here</v-chip>          
        </v-col>
      </v-card-actions>
    </v-card>
    <v-card class="mb-8">
      <v-card-title>Translate in {{localeCode}} Invoice from {{fromSelectedItem}} to {{toSelectedItem}}</v-card-title>
      <v-card-text>
        <v-container class="pa-0">
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-select v-model="fromSelectedItem" 
              label="From" 
              :items="languages" 
              item-text="name" 
              item-value="code" />
            </v-col>
            <v-spacer/>
            <v-col cols="12" sm="6" md="4">
              <v-select
                v-model="toSelectedItem"
                label="To"
                :items="languages"
                item-text="name"
                item-value="code"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary">Create Invoice</v-btn>
      </v-card-actions>
    </v-card>
    <v-card>
      <v-card-actions>
      <v-spacer />
      <v-btn  color="primary">Download XML</v-btn>
      <v-spacer />
      <v-btn  color="primary">Download PDF</v-btn>
      <v-spacer />
      <v-btn  color="primary">Download XSLT</v-btn>
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
    loadLanguages: call("languageStore/loadLanguages"),
    
  },
  computed: {
    localeCode: get("languageStore/selectedLocaleCode"),
    languages: get("languageStore/languages"),
    ...get("languageStore"),
  },
};
</script>

