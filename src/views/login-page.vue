<template>
  <div class="text-center pt-10">
    <h2>You must login to access e-Invoice Translator</h2>
    <v-divider class="my-6"></v-divider>
    <div v-if="!$auth.loading">
      <!-- show login when not authenticated -->
      <v-btn
        class="ml-4"
        color="primary"
        v-if="!$auth.isAuthenticated"
        @click="login"
        >Login to eInvoice Translator</v-btn
      >
      <!-- show logout when authenticated -->
      <v-btn
        class="ml-4 white--text"
        color="red darken"
        v-if="$auth.isAuthenticated"
        @click="logout"
        >Logout of eInvoicing</v-btn
      >
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      this.$auth.loginWithRedirect();
    },
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin,
      });
    },
  },
};
</script>