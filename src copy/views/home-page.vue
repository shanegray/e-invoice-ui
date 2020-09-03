<template>
  <div>
    <v-card class="mb-8">
      <v-card-title>Upload XML File</v-card-title>
      <v-card-text>
        Upload Button
      </v-card-text>
    </v-card>
    <v-card class="mb-8">
      <v-card-title>Translate Invoice {{ selectedItem }}</v-card-title>
      <v-card-text>
        <v-container class="pa-0">
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-select label="From" 
                :items="languages"
                item-text="name"
                item-value="code" />
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
        <v-btn color="primary">Create Invoice</v-btn>
      </v-card-actions>
    </v-card>
    <v-card>
      <v-card-actions>
        <v-btn  color="primary">Download XML</v-btn>
        <v-spacer/>
        <v-btn color="primary">Download XSLT</v-btn>
      </v-card-actions>
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
    loadLanguages: call("languages/loadLanguages"),
  },
  computed: {
    languages: get("languages/languages"),
    ...get("languages")
  },
}
</script>