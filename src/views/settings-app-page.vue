<!-- App Translation part -->
<template>
  <div>
    <v-card>
      <v-card-title>Edit App {{ localeCode }} Translation</v-card-title>
      <v-card-text>
        <v-container class="pa-0">
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-select
                :label="$t('LanguageLabel')"
                :items="languages"
                item-text="name"
                item-value="code"
              />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-select v-model="selectedItem" :label="$t('Locale2Translate')" />
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-col cols="12" sm="6" md="8">
          <br />
          <v-text-field name="txtReTranslation" :placeholder="$t('Label4Translate')" filled></v-text-field>
        </v-col>

        <v-btn
          :loading="saving"
          class="ml-6"
          x-large
          color="green"
          dark
          @click="saveMe"
        >{{ $t('btnSave') }}</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>