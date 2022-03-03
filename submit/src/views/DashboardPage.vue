<template>
<v-app>
   <Header/>
   <SideMenu/>
   <template v-if="loading">
      <v-progress-linear indeterminate color="yellow darken-2"></v-progress-linear>
   </template>
   <v-container align="center" class="ma-6">
      <v-row>         
         <v-col cols="12" md="12" class="ml-8">            
            <v-row justify="space-around" class="ma-8">
               <v-col cols="12" md="8">
                  <v-row justify="space-around">
                     <v-col cols="12" md = "8">
                        <v-tabs v-model="tab" background-color="transparent" color="basil" grow >
                           <v-tab v-for="item in items" :key="item">
                              {{ item }}
                           </v-tab>
                        </v-tabs>                           
                        <v-tabs-items v-model="tab">
                           <v-tab-item>                              
                              <v-row>
                                 <v-container fluid class="ma-6" style="height: 81px">
                                    <v-sheet class="mx-auto" max-width="600" >
                                       <v-slide-group multiple show-arrows>
                                          <v-slide-item v-for="following in followings" :key="following.id" >
                                             <v-btn fab dark class="mx-2" >
                                                <v-avatar class="ma-2" @click="showProfile(following.id)">
                                                   <v-img :src="following.photo" alt="John"></v-img>
                                                </v-avatar>            
                                             </v-btn>
                                          </v-slide-item>
                                       </v-slide-group>
                                    </v-sheet>
                                 </v-container>
                              </v-row>
                              <v-divider></v-divider>
                              <v-container>
                                 <ul class="list-group" style="list-style: none;">
                                    <li class="list-group-item" v-for="post in posts" :key="post.id">
                                       <v-card tile class="ma-4" @click="viewStory(post.id)"> 
                                          <v-container>
                                             <v-row dense align="center">
                                                <v-col cols="12" md="2">
                                                   <v-avatar class="ma-2">
                                                      <v-img :src="post.photo"></v-img>
                                                   </v-avatar>
                                                </v-col>
                                                <v-col cols="12" md="4" >
                                                   {{post.name}}
                                                </v-col>
                                                <v-col cols="12" md="6" >
                                                   {{post.date}}
                                                </v-col>
                                             </v-row>
                                             
                                                <v-col align="center">
                                                   <h2 v-html="post.title"></h2>
                                                </v-col>
                                             
                                             <v-container>
                                                <span v-html="post.content.substring(0, 200)+'...'"></span>
                                             </v-container>
                                          </v-container>
                                       </v-card>                                 
                                    </li>
                                 </ul>                     
                           <!-- <infinite-loading @infinite="infiniteHandler" spinner="waveDots"></infinite-loading> -->
                              </v-container>                              
                           </v-tab-item>                             
                           <v-tab-item>
                           </v-tab-item>
                          
                        </v-tabs-items>
                     </v-col>
                     <v-col cols="12" md="4" align="center" style="border-left: 1px solid black !important">
                        <v-container>
                           <h2>Recommended Topics</h2>
                           <v-container>
                              <v-chip-group>
                                    <v-chip v-for="hashtag in hashtags" :key="hashtag.id">
                                       {{hashtag.hashtag}}
                                    </v-chip>
                              </v-chip-group>
                           </v-container>
                        </v-container>
                        <v-divider></v-divider>
                        <v-container class="ma-5" >
                           <h2>Who to follow</h2>
                           <v-container class="ma-5">
                              <v-list-item v-for="following in followings" :key="following.id">
                                 <v-container>
                                    <v-row align="center">
                                       <v-col cols="12" md="3">
                                          <v-btn fab dark class="mx-2" >
                                             <v-avatar class="ma-2" @click="showProfile(following.id)">
                                                <v-img :src="following.photo" alt="John"></v-img>
                                             </v-avatar>            
                                          </v-btn>
                                       </v-col>
                                       <v-col cols="12" md="9" >                                       
                                          {{following.name}}
                                       </v-col>
                                    </v-row>
                                 </v-container>
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
   import SideMenu from '../components/SideMenu.vue'
   import { mapGetters, mapMutations} from "vuex";
   import router from '../router'
   // import InfiniteLoading from "vue-infinite-loading";
   export default {
     
   data() {      
      return {
         posts: [],
         loadNum: 0,
         followings: [],
         hashtags:[],
         isActive: false,
         tab: null,        
         items: ['Main', 'Extra',],
         loading: false,         
      }
   },

   computed: {
      ...mapGetters(['getUser']),     
   },

   components: {
      Header,
      SideMenu
      // InfiniteLoading
    },
    methods: {
       ...mapMutations(['getMe']),
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
               alert('error');
               localStorage.clear();
               this.$store.state.loginState = false;
               this.$store.state.token = null;
               // this.$router.push('/');
            })
      },

      getPosts() {
         this.getRecommendedTags();
         this.$Axios.get('http://localhost:3000/api/posts/offset/'+this.loadNum)
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

      getFollowing() {
         // console.log("getFollowing:"+this.getUser.id); 
         //  console.log('http://localhost:3000/api/users/'+this.getUser.id+'/following');
          this.$Axios.get('http://localhost:3000/api/users/'+this.getUser.id+'/following')
         .then(res => {                    
            for(let key in res.data){
               this.followings.push(res.data[key])
            }                 
         })
         .catch(err => {
            console.log(err)
            alert('error');
         })
      },

      showProfile(userId) {
         router.push('/public-profile?postUserId='+userId);
      },

      viewStory(postId) {
         router.push('/view?postId='+postId);
      },

      getRecommendedTags() {
         // console.log('/api/hashtags/recommended');
         this.$Axios.get('/api/hashtags/recommended')
         .then((res) => {  
            // console.log(res);      
            this.hashtags = res.data;
         }).catch(err => {
            console.log(err)
            alert('error');
         })
      }
    },

   mounted() {    
      console.log("mounted");
      
      this.$Axios.get("/api/users/me")
      .then((res) => {
         // console.log(res);
         this.$store.dispatch('setUser', res.data);
         this.getFollowing();
      }).catch((err) => {
         console.log(err);
      })
      // this.$store.dispatch('setUser', res.data);
      // this.getFollowing();
      this.getPosts();       
    }
   
  }
</script>
