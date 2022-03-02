<template>
   <v-app id="inspire">
      <v-content>
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="primary">
                        <v-toolbar-title>Register form</v-toolbar-title>
                     </v-toolbar>
                     <v-card-text>
                        <v-form>
                           <v-text-field
                              id="loginEmail"                        
                              name="email"
                              label="Name"
                              type="text"
                              v-model="form.loginName"
                           ></v-text-field>
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
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="register()">Register</v-btn>
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

export default {
  data() {
    return {
      form: {
        loginEmail: "",
        loginName: "",
      }
    };
  },

  methods : {
    register() {
      const args = {
        name: this.form.loginName,
        email: this.form.loginEmail,
      };

      axios
        .post("http://localhost:3000/api/auth/signup", args)
        .then((res) => {
          alert("registered successfully");
          this.account = res.data;
        })
        .catch(() => {
          alert("Failed to register. Confirm account info.");
        });
    }   
  }  
};
</script>
