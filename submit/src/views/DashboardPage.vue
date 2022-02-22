<template>
<v-app>
   <Header/>
   
   <v-container align="center" class="ma-6">
      <v-row>
         
         <v-col cols="12" md="12" class="ml-8">
            
            <v-row justify="space-around" class="ma-8">
               <v-col cols="12" md="8">
                  <v-row justify="space-around">
                     <v-col cols="12" md = "8">
                        <v-row>
                           <v-container fluid class="ma-6" style="border-bottom: 1px solid black !important">
                              <v-sheet class="mx-auto" max-width="600">
                                 <v-slide-group multiple show-arrows>
                                    <v-slide-item v-for="following in followings" :key="following.id" >
                                       <v-btn fab dark class="mx-2" >
                                          <v-avatar class="ma-2">
                                             <v-img                                    
                                             :src="following.photo"
                                             alt="John"
                                             ></v-img>
                                          </v-avatar>            
                                       </v-btn>
                                    </v-slide-item>
                                 </v-slide-group>
                              </v-sheet>
                           </v-container>
                        </v-row>
                        <v-container class="ma-6" >                      
                        
                           <ul class="list-group">
                              <li class="list-group-item" v-for="post in posts" :key="post.id">
                                 <v-card color="grey lighten-4" flat tile class="ma-6" @click="viewStory(post.id)"> 
                                    <v-container>
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
                                       <h2 v-html="post.title" style="border-margin: 10px"></h2>
                                       
                                       <span class="ma-6" v-html="post.content.substring(0, 6)"></span>
                                    </v-container>
                                 </v-card>
                                 
                              </li>
                           </ul>
                     
                     <!-- <infinite-loading @infinite="infiniteHandler" spinner="waveDots"></infinite-loading> -->
                        </v-container>
                     </v-col>
                     <v-col cols="12" md="4" align="center" style="border-left: 1px solid black !important">
                        <v-container class="ma-5" >
                           <h2>Who to follow</h2>
                           <v-container class="ma-5">
                              <v-list-item
                                 v-for="following in followings"
                                 :key="following.i"
                              >
                                 <v-btn fab dark class="mx-2" >
                                    <v-avatar class="ma-2">
                                       <v-img                                    
                                       :src="following.photo"
                                       alt="John"
                                       ></v-img>
                                    </v-avatar>            
                                 </v-btn>
                                 <v-col cols="12" md="9" >
                                    {{following.name}}
                                 </v-col>
                              </v-list-item>
                           </v-container>
                        </v-container>
                     </v-col>
                  </v-row>
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
         loadNum: 0,
         followings: [
        
         ],
      isActive: false,
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
      infiniteHandler($state) {
         this.$Axios.get('http://localhost:3000/api/posts/'+this.loadNum)
         .then(res => {
               if(res.data.totalPages == this.loadNum){
                  $state.complete();
               }else{
                  setTimeout(() => {
                        const data = res.data.content;
                        for(let key in data){
                           this.posts.push(data[key])
                        }
                        this.loadNum++;
                        $state.loaded();
                  }, 1000)
               }
            })
            .catch(err => {
               console.log(err)
               alert('에러');
               localStorage.clear();
               this.$store.state.loginState = false;
               this.$store.state.token = null;
               // this.$router.push('/');
            })
      },

      getPosts() {
         this.$Axios.get('http://localhost:3000/api/posts/'+this.loadNum)
         .then(res => {         
            for(let key in res.data){
               this.posts.push(res.data[key])
            }
            })
            .catch(err => {
               console.log(err)
               alert('error');              
            })
      },

      geFollowing() {
         //  console.log('http://localhost:3000/api/users/'+this.getUser.id+'/following');
          this.$Axios.get('http://localhost:3000/api/users/'+this.getUser.id+'/following')
         .then(res => {    
            console.log(res);     
            for(let key in res.data){
               this.followings.push(res.data[key])
            }                 
         })
         .catch(err => {
            console.log(err)
            alert('error');
         })
      },

      viewStory(postId) {
         router.push('/view?postId='+postId);
      }
    },
   

    mounted() {
       this.geFollowing();
       this.getPosts();
       
    }
   
  }
</script>
