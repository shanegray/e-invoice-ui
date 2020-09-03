<template>
  <div>
    <v-card class="mb-8">
      <v-card-title>Text To Translate</v-card-title>
      <v-card-text>
         <v-col cols="12" sm="6" md="8">
          <v-text-field
           placeholder="Enter In Text" 
           filled
          ></v-text-field>
        </v-col>
      </v-card-text>
    </v-card>
    <v-card class="mb-8">
      <v-card-title>Translate Invoice</v-card-title>
      <v-card-text>
        <v-container class="pa-0">
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-select label="From" :items="languages" />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-select 
                v-model="selectedItem"
                label="To" 
                :items="languages"
                item-text="name"
                item-value="code"  />
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="green" dark>Translate</v-btn>
      </v-card-actions>
    </v-card>
    <v-card>
      <v-card>
      <v-card-title>Translation Display</v-card-title>
      <v-card-text>
         <v-col cols="12" sm="8" md="12">
          <v-text-field
           placeholder="Translation Displayed Here" 
           filled
          ></v-text-field>
        </v-col>
      </v-card-text>
    </v-card>
    </v-card>
  </div>
</template>

<script>
import { call, get } from 'vuex-pathify';

export default {
  data() {
    return {
      selectedItem: ""
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
}
</script>