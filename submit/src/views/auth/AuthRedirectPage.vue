<template>
<v-app>
   <v-card color="grey lighten-4" flat  tile>
      <v-toolbar dense>                 
         <v-toolbar-title ><div class="font-weight-medium">Medium</div></v-toolbar-title>         
         <v-spacer></v-spacer>
         <router-link    
            to="/login" tag="div">
            <v-btn
            class="ma-2"  
            outlined                      
            color="#009688"       
            >SingIn
            </v-btn>
         </router-link>
         <router-link to="/register" tag="div">
            <v-btn
               class="ma-2"  
               outlined                      
               color="#2979FF"            
            >GetStarted
            </v-btn>
         </router-link>
      </v-toolbar>
   </v-card> 
</v-app>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";
import router from '../../router'
  export default {
     
   data() {
      return {
         posts: []
      }
   },
    
   methods: {
      ...mapMutations(["setUser", "setToken"]),
       SendConfirmCode() {
         console.log('gettoken');
         const queryString = window.location.search;
         const urlParams = new URLSearchParams(queryString);
         const confirmation_code = urlParams.get('confirmation_code')
         console.log(confirmation_code)
         axios
        .get("http://localhost:3000/api/auth/confirm/".concat(confirmation_code))
        .then(async res => {
            // console.log(res);

            const user = {
               id : res.data.id,
               name: res.data.name,
               email: res.data.email,
               bio: res.data.bio,
               social_notification: false,
               photo: res.data.photo,
            };
            const token = {
               token: res.data.accessToken,
               refreshToken: res.data.refreshToken
            }
            this.$store.dispatch('setUser', user)
            this.$store.dispatch('setToken', token)

            console.log("here:".concat(this.$store.state.user.id));

            router.push('/dashboard')
        })
        .catch(() => {
          console.log("Failed to register. Confirm account info.");
        });
       },
       
    },

   mounted() {       
      this.SendConfirmCode();
    },
  }
</script>
