<template>
  <div>
    <v-card class="mb-8">
      <v-card-title>Edit E-Invoice Translation</v-card-title>
      <v-card-text>
        <v-container class="pa-0">
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-select label="Select Language" 
              :items="languages"
              item-text="name"
                item-value="code"
                 />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-select
                v-model="selectedItem"
                label="Select A Word/Phrase To Re-Translate"
                
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
           placeholder="Replace With" 
           filled
          ></v-text-field>
        </v-col>

        <v-btn class="ml-6" x-large color="green" dark>Save</v-btn>
        <v-spacer></v-spacer>
        <v-btn x-large color="primary"> Download XLT</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
    <v-card>
      <v-card-title>Edit App Translation</v-card-title>
      <v-card-text>
        <v-container class="pa-0">
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-select label="Select Language" 
              :items="languages"
                item-text="name"
                item-value="code"
               />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-select
                v-model="selectedItem"
                label="Select A Word/Phrase To Re-Translate"
                
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
           placeholder="Replace With" 
           filled
          ></v-text-field>
        </v-col>
        

        <v-btn class="ml-6" x-large color="green" dark>Save</v-btn>
        
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { call, get } from "vuex-pathify";

export default {
  data() {
    return {
      selectedItem: "",
    }
  },
  async created() {
    await this.loadLanguages();
  },
  methods: {
    loadLanguages: call("languages/loadLanguages")
  },
  computed: {
    languages: get("languages/languages"),
    ...get("languages")
  },
};
</script>
