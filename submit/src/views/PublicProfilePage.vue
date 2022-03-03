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
               <v-col cols="12" md="9">
                  <v-row justify="space-around">
                     <v-col cols="12" md = "8">
                        <v-tabs v-model="tab" background-color="transparent" color="basil" grow >
                           <v-tab v-for="item in items" :key="item">
                              {{ item }}
                           </v-tab>
                        </v-tabs>                           
                        <v-tabs-items v-model="tab">
                           <v-tab-item>                              
                              
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
                                             
                                             <v-row>
                                                <v-col cols="12" md="9">
                                                    <span v-html="post.brief+'...'"></span>
                                                 </v-col>
                                                <v-col cols="12" md="3">                                             
                                                    <v-img :src="post.imgUrl" max-height="200" max-width="200"></v-img>
                                                </v-col>
                                             </v-row>
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
                     <v-col cols="12" md="4"  style="border-left: 1px solid black !important">
                        <v-container>
                           <h2>Profile</h2>
                           <v-row align="center">
                                <v-col>
                                    <v-avatar size="80" class="ma-2">
                                        <v-img :src="author.photo" height="80"></v-img>                        
                                    </v-avatar>                            
                                </v-col>                        
                            </v-row>
                            <v-col >
                                <v-row class="ma-n1"> <span class="black--text text-h5">{{author.name}}</span></v-row>                       
                                <v-row class="ma-n1">
                                    <v-col cols="12" md="10">
                                        {{author.follower_count}} followers
                                    </v-col>
                                </v-row>
                                <v-row class="ma-n1">
                                    <v-col cols="12">
                                        {{author.bio}}
                                    </v-col>
                                </v-row>
                                <v-row class="ma-n1">                                     
                                    <v-col v-if="showFollowBtn">
                                        <v-btn v-if="!isFollow" small class="ma-2" outlined color="indigo" @click="followAuthor(author.id)">
                                            follow
                                        </v-btn>
                                        <v-btn v-else small class="ma-2" outlined color="indigo" @click="unfollowAuthor(author.id)">
                                            unfollow
                                        </v-btn>
                                    </v-col>
                                    <v-spacer></v-spacer>
                                </v-row>
                            </v-col>
                        </v-container>
                        <v-divider></v-divider>
                        <v-container class="ma-5" >
                           <h2>Following</h2>
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
   import { mapGetters} from "vuex";
   import router from '../router'
   // import InfiniteLoading from "vue-infinite-loading";
   export default {
     
   data() {      
      return {
         posts: [],         
         followings: [],
         hashtags:[],
         isActive: false,
         tab: null,        
         items: ['Main', 'Extra', ],
         loading: false,
         postUserId: 0,
         author:{},
         isFollow: false,
         showFollowBtn: true,
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
         showProfile(userId) {
            // router.push('/public-profile?postUserId='+userId);
            this.getAuthorInfo(userId);
            if (userId == this.getUser.id) this.showFollowBtn = false;
            this.getPosts(userId);
        },
         
      getPosts(userId) {         
         this.$Axios.get('http://localhost:3000/api/posts/'+userId)
         .then(res => {  
            //  console.log(res); 
            this.posts = [];      
            for(let key in res.data){
               this.posts.push(res.data[key])
            }
            this.loading = false;
            }).catch(err => {
               console.log(err)
               alert('error');              
            })
      },

      getFollowing() {
        
          this.$Axios.get('http://localhost:3000/api/users/'+this.author.id+'/following')
         .then(res => {    
            this.followings = [];                
            for(let key in res.data){
               this.followings.push(res.data[key])
            } 
            // console.log(this.followings) ;         
         })
         .catch(err => {
            console.log(err)
            alert('error');
         })
      },

      viewStory(postId) {
         router.push('/view?postId='+postId);
      },

      getAuthorInfo(authorId) {         
         this.$Axios.get('/api/users/'+authorId)
         .then((res) => {  
            // console.log(res);      
            this.author = res.data;
            this.getFollowing();
         }).catch(err => {
            console.log(err)
            alert('error');
         })
      },

       //"/api/users/:id/follow"
    followAuthor(followedId) {
        const body = {
            followed_id : followedId
        }
        this.$Axios.post('http://localhost:3000/api/users/'+this.getUser.id+'/follow', body).then((res) => {                
            if (res.data.msg == 'ok') this.isFollow = true;
        });
    },
    //"/api/users/:id/follow/:target_id"
    unfollowAuthor(followedId) {
        this.$Axios.delete('http://localhost:3000/api/users/'+this.getUser.id+'/follow/'+followedId).then((res) => {                
            if (res.data.msg == 'delete') this.isFollow = false;
        });
    },

     //"/api/users/:id/follow/:target_id"
    checkFollowing(followedId) {
        this.$Axios.get('http://localhost:3000/api/users/'+this.getUser.id+'/follow/'+followedId).then((res) => {                
            if (res.data.msg == 'exist') this.isFollow = true;
        });
    },

},    

mounted() {    
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.postUserId = urlParams.get('postUserId');
      
    this.$Axios.get("/api/users/me")
      .then((res) => {
         // console.log(res);
         this.$store.dispatch('setUser', res.data);
         this.getAuthorInfo(this.postUserId);
         if (this.postUserId == this.getUser.id) this.showFollowBtn = false;
         else this.checkFollowing(this.postUserId);
         
      }).catch((err) => {
         console.log(err);
      })
      // this.$store.dispatch('setUser', res.data);
      // this.getFollowing();
      this.getPosts(this.postUserId);       
    }
   
  }
</script>
