<template>
  <div>
    <v-card class="mb-8">
      <v-card-actions>
        <v-btn class="ml-6" x-large color="green" dark>Upload XML File</v-btn>
        <v-spacer></v-spacer>
        <v-col cols="12" sm="6" md="8">
          <br />
          <v-text-field placeholder="XML File Goes Here " filled></v-text-field>
        </v-col>
      </v-card-actions>
    </v-card>
    <v-card class="mb-8">
      <v-card-title>Translate Invoice {{ selectedItem }}</v-card-title>
      <v-card-text>
        <v-container class="pa-0">
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-select class="From-Combo" label="From" :items="languages" item-text="name" item-value="code" />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-select
                v-model="selectedItem"
                label="To"
                :items="languages"
                item-text="name"
                item-value="code"
              />
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
        <v-spacer />
        <v-btn class="btn-space-XML" color="primary">Download XML</v-btn>

        <v-btn class="btn-space-XSLT" color="primary">Download XSLT</v-btn>
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
      selectedItem: "",
    };
  },
  async created() {
    await this.loadLanguages();
  },
  methods: {
    loadLanguages: call("languages/loadLanguages"),
  },
  computed: {
    languages: get("languages/languages"),
    ...get("languages"),
  },
};
</script>
<style>
.btn-space-XML {
  margin-left: 200px;
  margin-right: 200px;
}
.btn-space-XSLT {
  margin-right: 200px;
}
</style>