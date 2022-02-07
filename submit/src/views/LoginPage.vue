<template>
   <v-app id="inspire">
      <v-content>
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>Login form</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form>
                           <v-text-field
                              id="loginEmail"                        
                              name="email"
                              label="Email"
                              type="text"
                              v-model="form.loginEmail"
                           ></v-text-field>
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                        <v-spacer class="pa-md-4 mx-lg-auto"><SocialLogin /></v-spacer>
                        <v-btn color="primary" @click="login()">Login</v-btn>
                        <router-link to="/register" tag="div">
                          <v-btn depressed href="/register">
                            Register
                          </v-btn>
                        </router-link>      
                     </v-card-actions>
                  </v-card>                   
               </v-flex>
              
            </v-layout>           
            
         </v-container>
      </v-content>
   </v-app>
</template>

<script>
import axios from "axios";
import SocialLogin from '../components/SocialLoginPage.vue'
// import { reactive } from "vue";

export default {
  data() {
    return {      
      account: {
        id: null,
        name: "",
      },
      form: {        
        loginEmail: "",
      }     
    };
  },
  components: {
    SocialLogin
  },

  methods : {
    login() {
      const args = {
        // loginId: state.form.loginId,
        email: this.form.loginEmail,
      };

      axios
        .post("http://localhost:3000/api/auth/signin", args)
        .then((res) => {
          alert("Logged in successfully");
          this.account = res.data;
        })
        .catch(() => {
          alert("Failed to log in. Confirm account info.");
        });
    },

    register() {
      const args = {
        // loginId: state.form.loginId,
        email: this.form.loginEmail,
      };

      axios
        .post("http://localhost:3000/api/auth/signup", args)
        .then((res) => {
          alert("registered in successfully");
          this.account = res.data;
        })
        .catch(() => {
          alert("Failed to register. Confirm account info.");
        });
    },

    logout() {
      axios.delete("/api/account").then(() => {
        alert("Logged out.");
        this.account.id = null;
        this.account.name = "";
      });
    }
  } 
  
};
</script>
