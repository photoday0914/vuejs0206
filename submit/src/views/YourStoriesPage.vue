<template>
<v-app>
   <Header/>
   
   <v-container align="center" class="ma-6">
      <v-row>         
         <v-col cols="12" md="12" class="ml-8">            
            <v-row justify="space-around" class="ma-8">
               <v-col cols="12" md = "8">
                  <v-row>
                     <v-container fluid class="ma-6" style="border-bottom: 1px solid black !important">
                        <h1>Your Stories</h1>
                     </v-container>
                  </v-row>
                  <v-container >
                     <ul class="list-group" style="list-style: none;">
                        <li class="list-group-item" v-for="post in posts" :key="post.id">
                           <v-card color="grey lighten-4" flat tile class="ma-6">
                              <v-row align="center">
                                 <v-col>
                                    <v-container> 
                                       <template v-if="loading">
                                          <v-progress-linear
                                             indeterminate
                                             color="yellow darken-2"
                                          ></v-progress-linear>
                                       </template>
                                       <v-row dense align="center">
                                          <v-col cols="12" md="3">
                                             <v-avatar class="ma-2">
                                                <img src="{post.photo}">
                                             </v-avatar>
                                          </v-col>
                                          <v-col cols="12" md="9" >
                                             <v-row>
                                                <v-col cols="12" md="6">
                                                   <v-container>
                                                      {{post.date}}
                                                   </v-container>
                                                </v-col>
                                                <v-col cols="12" md="6">
                                                   <v-btn @click="viewStory(post.id)">
                                                      <v-icon>fa-solid fa-eye</v-icon>
                                                   </v-btn>
                                                   <v-btn @click="editStory(post.id)">
                                                      <v-icon>fa-solid fa-pen-to-square</v-icon>
                                                   </v-btn>
                                                   <v-btn @click="deleteStory(post.id)">
                                                      <v-icon>fa-solid fa-trash-can</v-icon>
                                                   </v-btn>
                                                </v-col>
                                             </v-row>
                                          </v-col>
                                       </v-row>
                                       <v-row class="ma-5">
                                          <v-container>
                                             <h2 style="border-margin: 10px" v-html="post.title"></h2>
                                          </v-container>                                           
                                          <span class="ma-6" v-html="post.content.substring(0, 6)"></span>
                                       </v-row>
                                    </v-container>
                                 </v-col>
                                 <!-- <v-col cols="12" md="2">
                                    <v-container>
                                       <v-btn @click="viewStory()">
                                          <v-icon>fa-solid fa-eye</v-icon>
                                       </v-btn>
                                       <v-btn @click="editStory(post.id)">
                                          <v-icon>fa-solid fa-pen-to-square</v-icon>
                                       </v-btn>
                                       <v-btn @click="deleteStory()">
                                          <v-icon>fa-solid fa-trash-can</v-icon>
                                       </v-btn>
                                    </v-container>
                                 </v-col> -->
                              </v-row>
                           </v-card>                                 
                        </li>
                     </ul>                     
                  </v-container>
               </v-col>                     
            </v-row>            
         </v-col>         
      </v-row>
   </v-container>
</v-app>
</template>

<script>
// import axios from "axios";
   import Header from '../components/Header.vue'
   import { mapGetters} from "vuex";
   import router from '../router'
   // import InfiniteLoading from "vue-infinite-loading";
export default {     
   data() {      
      return {
         posts: [],
         followings: [],
         isActive: false,
         loading:true,
      }
   },

   computed: {
      ...mapGetters(['getUser'])      
   },
    
   components: {
      Header,
      // InfiniteLoading
   },
   methods: {
      viewStory(postId){
         router.push('/view?postId='+postId);
      },
      editStory(postId) {         
         router.push('/edit?postId='+postId);
      },
      deleteStory(postId) {
         console.log('http://localhost:3000/api/post/'+postId);
         
         this.$Axios.delete('http://localhost:3000/api/post/'+postId).then(() => {
            
            var filtered = this.posts.filter(function(value){ 
               return value.id != postId;
            });
            this.posts = filtered;
            this.$forceUpdate();
         })
      },
      async getMyPosts() {
         this.$Axios.get('http://localhost:3000/api/myposts/'+this.getUser.id)
         .then(res => {           
            for(let key in res.data){
               this.posts.push(res.data[key])
            } 
            this.loading = false;
            
         })
         .catch(err => {
            console.log(err)
            alert('error');
         })
      },
   },
   mounted() {
       this.getMyPosts();
    }
  }
</script>
