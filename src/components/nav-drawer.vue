<template>
  <v-list dense nav>
    <v-list-item 
      v-for="item in items" 
      :key="item.title" 
      :to="item.url"
      link>
      <v-list-item-icon>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>    
  </v-list>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: 'Create', icon: 'mdi-file-edit-outline', url: "/" },
        { title: 'Test Translation', icon: 'mdi-file-document-outline', url: "/test" },
        { title: 'Invoice Settings', icon: 'mdi-cog-outline', url: "/invoicesettings" },
        { title: 'App Settings', icon: 'mdi-cogs', url: "/appsettings" },
        // { title: 'example', icon: 'mdi-cog-outline', url: "/example" },
      ]
    }
  },
};
</script>
