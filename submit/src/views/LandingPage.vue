<template>
<v-app>
   <v-card
   color="grey lighten-4"
   flat   
   tile
   >
      <v-toolbar dense>                 
         <v-toolbar-title ><div class="font-weight-medium">Medium</div></v-toolbar-title>         
         <v-spacer></v-spacer>
         <router-link    
            to="/login" tag="div">
            <v-btn
            class="ma-2"  
            outlined                      
            color="#009688"       
            >SignIn
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
   <v-container fluid>
      <v-row class="yellow" style="border-bottom: 1px solid black !important">
         <v-col cols="12" md="2">           
         </v-col>
         <v-col cols="12" md="8">
            <v-col cols="12" md="6">               
               <v-row  align="center" style="font-size:3.5em; line-height: 1em;" class="pa-md-4">
                  Medium is a place to write, read, and connect
               </v-row>
               <v-row class="pa-md-4 mx-lg-auto" align="center" >
               It's easy and free to post your thinking on any topic and connect with millions of readers.
               </v-row>
            </v-col>
            <v-col cols="12" md="6">
            </v-col>
         </v-col>
         <v-col cols="12" md="2">            
         </v-col>
      </v-row>
   </v-container>
   <v-container align="center">
      <v-row class="pa-md-4 mx-lg-auto">
         <h1>Trending on medium</h1>
      </v-row>
      <v-row class="pa-md-4 mx-lg-auto">
         <v-col cols="12" md="2"></v-col>
         <v-col cols="12" md="8">
            <v-row>
               <v-col cols="12" md="4" v-for="(post, i) in posts" :key="i">
                  <v-row>
                     <v-col cols="12" md="2" style="color:grey">
                        <h2>0{{i+1}}</h2>
                     </v-col>
                     <v-col cols="12" md="10">
                           <v-row dense align="center">
                              <v-col cols="12" md="3">
                                 <v-avatar>
                                    <img src="{post.photo}">
                                 </v-avatar>
                              </v-col>
                              <v-col cols="12" md="9" >
                                 {{post.name}}
                              </v-col>
                           </v-row>
                           <v-row class="pa-md-4 mx-lg-auto">
                              <h2 v-html="post.title"></h2>
                           </v-row> 
                           <v-row class="pa-md-4 mx-lg-auto">
                              {{post.date}}
                           </v-row>                   
                     </v-col>    
                  </v-row>        
               </v-col>
            </v-row>
         </v-col>
         <v-col cols="12" md="2"></v-col>
      </v-row>
      <v-row>
      </v-row>
   </v-container>
</v-app>
</template>

<script>
import axios from "axios";
  export default {
     
   data() {
      return {
         posts: []
      }
   },
    
    methods: {
       GetPosts() {    
         axios
        .get("http://localhost:3000/api/posts/trending")
        .then(res => {
         //  console.log(this.posts);
          for (var i of res.data)
          {           
            this.posts.push(i);
          }
         // console.log(this.posts);
        })
        .catch(() => {
          console.log("Failed to register. Confirm account info.");
        });
       }
    },
    created() {
      this.GetPosts();
    },
  }
</script>
