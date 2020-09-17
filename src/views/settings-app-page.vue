<!-- App Translation part -->
<template>
  <div>
    <v-card>
      <v-card-title class="ml-4">{{localeWords['AppTitle']}}</v-card-title>
      <v-card-text>
        <v-container class="pa-0">
          <v-row>
            <!-- <v-col cols="12" sm="6" md="4">
              <v-select
                v-model="selectedLocaleWord"
                :label="localeWords['labelSelectLang']"
                :items="languages"
                item-text="name"
                item-value="code"
                @change="SetStoreLocaleWordArray" 
              />
            </v-col>
            <v-spacer/> -->
            
            <v-col cols="12" sm="4" md="6">
                <v-select class="ml-4"
                    v-model="selectedLocaleWord"
                    :items="GetLocaleWordArray"
                    :label="localeWords['Cmb4ReTranslate']"
                />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-col cols="12" sm="6" md="8">
          <br />
          <v-text-field v-model="replacementLocaleWord" name="txtReTranslation" :placeholder="localeWords['TxtReplace']" filled></v-text-field>
        </v-col>

        <v-btn
          @click="updateAppTranslation()"
          class="ml-6"
          x-large
          color="green"
          dark
         
        >{{ localeWords['btnSave'] }}</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import languageStore from '@/store/languageStore';
import { call, get } from "vuex-pathify";

export default {
  data() {
    return {
      selectedLocaleWord: "",
      replacementLocaleWord: "",
      // selectedLocaleWord: "",
      wordToTranslate:"",
     // selectedItem: "",
      saving: false,
      localeWordArray:[]
    }
  },
  async created() {
    //await this.loadLanguages();
    //await this.fillLocaleWords();
    //this.GetLocaleWordArray();
   
    // await this.SetLocaleWordArray();
  },
  methods: {

     ...call("languageStore", ["UpdateAppTranslation", "SetLocaleWordArray"]),
    async updateAppTranslation() {
      this.saving = true;
      const translateLocale={SelectedWord: this.selectedLocaleWord, ReplacementWord: this.replacementLocaleWord };
      try {
        // console.log("this.selectedWord: " + translateLocale.SelectedWord)
        // console.log("translate Object: " + this.replacementWord)
        await this.UpdateAppTranslation(translateLocale);
        await this.SetLocaleWordArray();
      } finally {        
        this.saving = false;
      }
    },
     
    // //loadLanguages: call("languageStore/loadLanguages"),
    // ...call("languageStore", ["SetLocaleWordArray","selectedLocaleCode"]),
    // //TODO fix list coming back properly
    // async SetStoreLocaleWordArray(){
    //   await this.SetLocaleWordArray(this.selectedLocaleCode);
    // }
    
    // //fillLocaleWords : call("languageStore/fillLocaleWords"),
    // /* async saveMe() {
    //   this.saving = true;

    //   try {
    //     await this.saveSomething({FileContents: "this is OK", FileName:"test.txt"},"api/fileapi/savesomething/");
    //   }
    //   finally {
    //     this.saving = false;
    //   }
    // }*/
  }, 
  computed: {
   
    //languages: get("languageStore/languages"),
    localeWords: get("languageStore/localeWordDict"),
    //...get("languageStore"),
    //localeCode: get("languageStore/selectedLocaleCode"),
    // fills words in combo box in app translation (Needs to be fixed)
    GetLocaleWordArray: get("languageStore/localeWordArray")
    
  },
};
</script>
