<template>
  <div>
    <v-card class="mb-8">
      <v-card-title>{{ $t('Text2Translate') }}</v-card-title>
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
              <v-select :label="$t('FromLanguage')" 
              :items="languages"
              item-text="name"
              item-value="code"
                 />
            </v-col>
            <v-spacer />
            <v-col cols="12" sm="6" md="4">
              <v-select 
                v-model="selectedItem"
                :label="$t('ToLanguage')" 
                :items="languages"
                item-text="name"
                item-value="code"  />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="green" dark>{{ $t('TranslateButton') }}</v-btn>
      </v-card-actions>
    </v-card>
    <v-card>
      <v-card>
      <v-card-title>Translation Display</v-card-title>
      <v-card-text>
         <v-col cols="12" sm="8" md="12">
          <v-chip label large outlined color="black">{{ $t('TranslatedTextBox') }}</v-chip>
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
    loadLanguages: call("languageStore/loadLanguages")
  },
  computed: {
    languages: get("languageStore/languages"),
    ...get("languageStore")
  },
}
</script>