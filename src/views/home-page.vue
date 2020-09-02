<template>
  <div>
    <v-card class="mb-4">
      <v-card-title>Upload XML File</v-card-title>
      <v-card-text>
        Upload Button
      </v-card-text>
    </v-card>
    <v-card class="mb-4">
      <v-card-title>Translate Invoice</v-card-title>
      <v-card-text>
        <v-container class="pa-0">
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-select label="From" :items="languages" />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-select label="To" :items="languages"  />
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
        <v-btn @click="doSomething()" color="primary">Download XML</v-btn>
        <v-btn color="primary">Download XSLT</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      languages: ["English", "Irish", "German"]
    }
  },
  methods: {
    doSomething() {
      console.log("I work")
    }
  },
}
</script>