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
      <v-card-title>Text To Translate</v-card-title>
      <v-card-text >
        <v-col cols="12" sm="6" md="8">
          <v-text-field v-model="textToTranslate" placeholder="Enter In Text" filled></v-text-field>
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
              <v-select
                v-model="fromLanguageCode"
                label="From"
                :items="languages"
                item-text="name"
                item-value="code"
              />
            </v-col>
            <v-spacer />
            <v-col cols="12" sm="6" md="4">
              <v-select                
                :label="$t('ToLanguage')"               
                v-model="toLanguageCode"                
                :items="languages"
                item-text="name"
                item-value="code"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="green" dark>{{ $t('TranslateButton') }}</v-btn>
        <v-btn
        :loading="saving"
        @click="translateClick"
         color="green" dark>Translate</v-btn>
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
  </div>
</template>

<script>
import { call, get } from 'vuex-pathify';
//import axios from 'axios';

export default {
  data() {
    return {
      toLanguageCode: "",
      fromLanguageCode: "",
      textToTranslate: "",
      saving: false,
      translatedText: "Translated text here"
      
    }
  },
  async created() {
    await this.loadLanguages();
  },
  methods: {
    loadLanguages: call("languageStore/loadLanguages"),
    async oldtranslateClick()
    {
      const ToLanguage="detect";
      const FromLanguage="detect";
      const ToLanguageCode=this.toLanguageCode;
      const FromLanguageCode=this.fromLanguageCode;
      const TextToTranslate =this.textToTranslate;

      const nroute="api/translate/testpage/";
      const data = {ToLanguage,FromLanguage,ToLanguageCode,FromLanguageCode,TextToTranslate}
      console.log(data)
     //  this.translation = await axios.post(`https://localhost:44390/${nroute}`,  {body:data})
      
           
    },
    ...call("languageStore", ["loadLanguages","testTranslation"]),
    async translateClick() {
      
      this.saving = true;
      const ToLanguage="detect";
      const FromLanguage="detect";
      const ToLanguageCode=this.toLanguageCode;
      const FromLanguageCode=this.fromLanguageCode;
      const TextToTranslate =this.textToTranslate;
       const data = {ToLanguage, FromLanguage, ToLanguageCode,FromLanguageCode,TextToTranslate}; 
      // console.log("data: " + data)
      try {
        this.translatedText = await this.testTranslation(data)
        
        //console.log("translation:" + this.translatedText)
      }
      finally {
        this.saving = false;
      }
   
  },
  },
  computed: {
    languages: get("languageStore/languages"),
    ...get("languageStore"),
    translation: get("languageStore/testTranslation")

    
}
}
</script>