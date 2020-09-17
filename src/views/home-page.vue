<template>
  <div>
    <v-form
      ref="form"
      target="_blank"
      method="post"
      enctype="multipart/form-data"
      action="https://einvoicetranslatorweb.azurewebsites.net/api/translate/convertxml2htmlv2"
    >
      <v-card class="mb-3">
        <v-card-title class="ml-4">{{localeWords['CreateInvoiceTitle']}}</v-card-title>

        <v-card-text>
          <v-container class="py-0">
            <v-row>
              <v-col cols="12" sm="4" md="6" class="pa-0, ml-3">
                <v-file-input
                  class="pa-0, ma-0"
                  v-model="XMLFile"
                  name="attachment"
                  prepend-icon
                  :placeholder="localeWords['inptUpload']"
                ></v-file-input>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-text class="py-0">
          <v-container class="py-0">
            <v-row>
              <v-col hidden cols="12" sm="3" md="4">
                <v-select
                  class="ml-3"
                  name="FromLanguageCode"
                  v-model="fromSelectedItem"
                  :label="localeWords['FromLanguage']"
                  :items="languages"
                  item-text="name"
                  item-value="code"
                />
              </v-col>
              <v-col cols="12" sm="3" md="4">
                <v-select
                  class="ml-3"
                  name="ToLanguageCode"
                  v-model="toSelectedItem"
                  :label="localeWords['ToLanguage']"
                  :items="languages"
                  item-text="name"
                  item-value="code"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-text>
          <v-container class="ml-3">
            <v-row>
              <v-btn
                :loading="saving"
                @click="submit"
                color="green"
                dark
              >{{localeWords['btnConvert']}}</v-btn>
              <v-spacer />
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>

      <v-card v-show="HTMLdownloaded">
        <v-card-title>
          <v-spacer />
          {{localeWords['DownloadTitle']}}
          <v-spacer />
        </v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" class="mr-8">
            <v-icon left>mdi-download</v-icon>
            {{ localeWords['btnGetXML']}}
          </v-btn>
          <v-btn color="primary">
            <v-icon left>mdi-download</v-icon>
            {{ localeWords['btnGetPDF']}}
          </v-btn>
          <v-spacer />
          <!-- <v-btn color="primary"> <v-icon left>mdi-download</v-icon>{{ localeWords['btnGetXSLT']}}</v-btn> -->
          <!-- <v-spacer /> -->
        </v-card-actions>
      </v-card>
    </v-form>
  </div>
</template>

<script>
import { call, get } from "vuex-pathify";

export default {
  data() {
    return {
      fromSelectedItem: "xx",
      toSelectedItem: "",
      saving: false,
      XMLFile: null,
      HTMLdownloaded: false,
    };
  },
  async created() {
    this.toSelectedItem = this.localeCode;
    //await this.loadLanguages();
  },
  methods: {
    async saveMe() {
      this.saving = true;

      try {
        await this.saveSomething(
          { FileContents: "this is OK", FileName: "test.txt" },
          "api/fileapi/savesomething/"
        );
      } finally {
        this.saving = false;
      }
    },

    submit: function () {
      this.saving = true;
      try {
        this.$refs.form.$el.submit();
        console.log("The form Data ", this.XMLFile.FileName);
        this.HTMLdownloaded = true;
      } finally {
        this.saving = false;
      }
    },

    loadLanguages: call("languageStore/loadLanguages"),
  },
  computed: {
    localeWords: get("languageStore/localeWordDict"),
    localeCode: get("languageStore/selectedLocaleCode"),
    languages: get("languageStore/languages"),
    //fromLanguageComboBox: get("languageStore/fromLanguageComboBox"),
    ...get("languageStore"),
  },
};
</script>

