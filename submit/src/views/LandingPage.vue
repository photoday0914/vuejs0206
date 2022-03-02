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
         <!-- <router-link    
            to="/login" tag="div" @click.stop="dialog = true"> -->
            <v-btn class="ma-2"  outlined  color="#009688" @click.stop="dialog1 = true">SignIn
            </v-btn>
         <!-- </router-link> -->
         <!-- <router-link to="/register" tag="div"> -->
            <v-btn class="ma-2" outlined color="#2979FF" @click.stop="dialog2 = true">GetStarted
            </v-btn>
         <!-- </router-link> -->
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
               <v-col cols="12" md="4" v-for="(post, i) in posts" :key="i" @click="viewStory(post.id)">
                  <v-card>
                     <!-- <v-col cols="12" md="2" style="color:grey">
                        <h2>0{{i+1}}</h2>
                     </v-col> -->
                     <v-col cols="12" md="10">
                           <v-row dense align="center">
                              <v-col cols="12" md="3">
                                 <v-avatar>
                                    <v-img :src="post.photo"/>
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
                  </v-card>        
               </v-col>
            </v-row>
         </v-col>
         <v-col cols="12" md="2"></v-col>
      </v-row>
      <v-row>
      </v-row>
   </v-container>
   <template>
      <v-row justify="center">        
        <v-dialog v-model="dialog1" max-width="500" style="align-items: center">
          <v-card>
            <v-container>
               <v-container>
               <v-card-title>
                  <h2>Welcome back</h2>
               </v-card-title>
               <v-container>
                  <v-card-text>
                     <a href="http://localhost:3000/google" class="google-signup" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><title>Google</title><g fill="none" fill-rule="evenodd"><path fill="#4285F4" d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087c1.7018-1.5668 2.6836-3.874 2.6836-6.615z"></path><path fill="#34A853" d="M9 18c2.43 0 4.4673-.806 5.9564-2.1805l-2.9087-2.2581c-.8059.54-1.8368.859-3.0477.859-2.344 0-4.3282-1.5831-5.036-3.7104H.9574v2.3318C2.4382 15.9832 5.4818 18 9 18z"></path><path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.2822-1.1168-.2822-1.71s.1023-1.17.2823-1.71V4.9582H.9573A8.9965 8.9965 0 0 0 0 9c0 1.4523.3477 2.8268.9573 4.0418L3.964 10.71z"></path><path fill="#EA4335" d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C13.4632.8918 11.426 0 9 0 5.4818 0 2.4382 2.0168.9573 4.9582L3.964 7.29C4.6718 5.1627 6.6559 3.5795 9 3.5795z"></path></g></svg>
                        <span> Sign in with google</span>
                     </a>
                  </v-card-text>
                  <v-card-text>
                     <v-icon color="teal darken-2">
                        mdi-email
                     </v-icon>
                     <router-link to="/login">
                        Sign in with email
                     </router-link>
                  </v-card-text>
                  <v-card-text>
                     <router-link to="/register">
                        Create One?
                     </router-link>
                  </v-card-text>
                  
               </v-container>
               </v-container>
            </v-container>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
    <template>
      <v-row justify="center">        
        <v-dialog v-model="dialog2" max-width="500" style="align-items: center">
          <v-card>
            <v-container>
               <v-container>
               <v-card-title>
                  <h2>Welcome back</h2>
               </v-card-title>
               <v-container>
                  <v-card-text>
                     <a href="http://localhost:3000/google" class="google-signup" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><title>Google</title><g fill="none" fill-rule="evenodd"><path fill="#4285F4" d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087c1.7018-1.5668 2.6836-3.874 2.6836-6.615z"></path><path fill="#34A853" d="M9 18c2.43 0 4.4673-.806 5.9564-2.1805l-2.9087-2.2581c-.8059.54-1.8368.859-3.0477.859-2.344 0-4.3282-1.5831-5.036-3.7104H.9574v2.3318C2.4382 15.9832 5.4818 18 9 18z"></path><path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.2822-1.1168-.2822-1.71s.1023-1.17.2823-1.71V4.9582H.9573A8.9965 8.9965 0 0 0 0 9c0 1.4523.3477 2.8268.9573 4.0418L3.964 10.71z"></path><path fill="#EA4335" d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C13.4632.8918 11.426 0 9 0 5.4818 0 2.4382 2.0168.9573 4.9582L3.964 7.29C4.6718 5.1627 6.6559 3.5795 9 3.5795z"></path></g></svg>
                        <span> Sign up with google</span>
                     </a>
                  </v-card-text>
                  <v-card-text>
                     <v-icon color="teal darken-2">
                        mdi-email
                     </v-icon>
                     <router-link to="/register">
                        Sign up with email
                     </router-link>
                  </v-card-text>
                  <v-card-text>
                     <router-link to="/login">
                        Sign in
                     </router-link>
                  </v-card-text>
                  
               </v-container>
               </v-container>
            </v-container>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
</v-app>
</template>

<script>
import axios from "axios";
import router from '../router'
// import SocialLogin from '../components/SocialLoginPage.vue'

  export default {
     
   data() {
      return {
         posts: [],
         dialog1: false,
         dialog2: false,
      }
   },

   components: {
      
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
       },

       viewStory(postId) {
         router.push('/view?postId='+postId);
      }
    },
    created() {
      this.GetPosts();
    },

  }
</script>
