<template>
  <v-app>
  </v-app>
</template>
<script>
// import axios from "axios";
import router from '../../router'

// import { reactive } from "vue";

export default {
  data() {
    return {      
     
    };
  },

  mounted() {
    this.redirectToDashboard();
  },

  methods : {
    redirectToDashboard() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      
      const user = {
          id : urlParams.get('id'),
          username: urlParams.get('name'),
          email: urlParams.get('email'),
          bio: urlParams.get('bio'),
          social_notification: false
      };
      const token = {
          token: urlParams.get('accessToken'),
          refreshToken: urlParams.get('refreshToken')
      }
      this.$store.dispatch('setUser', user)
      this.$store.dispatch('setToken', token)

      router.push('/dashboard');
    },   
  }   
};
</script>
