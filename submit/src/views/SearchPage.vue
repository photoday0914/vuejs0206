<template>
<v-app>
   <!-- <Header/> -->
   <SideMenu/>
   <v-container align="center" class="ma-6">
      <v-row>         
         <v-col cols="12" md="12" class="ml-8">            
            <v-row justify="space-around" class="ma-8">
               <v-col cols="12" md = "8">
                <template>
                    <v-card>
                        <v-card-title class="text-center justify-center py-6">
                            <v-icon large class="ma-2">fas fa-search</v-icon>
                            <v-container>
                            <v-text-field filled v-model="keyword" @keydown.enter="changeTab"></v-text-field>
                            </v-container>
                            <!-- <span>Search Results for "</span>
                            <span class="font-weight-bold text-h2">
                                {{keyword}}
                            </span>
                            <span>"</span> -->
                        </v-card-title>

                        <v-tabs v-model="tab" background-color="transparent" color="basil" grow @change="changeTab">
                            <v-tab v-for="item in items" :key="item">
                                {{ item }}
                            </v-tab>
                        </v-tabs>
                        <v-tabs-items v-model="tab">                            
                            <v-tab-item>
                                <v-divider></v-divider>
                                <v-container class="ma-3"><h2>Stories</h2></v-container>
                                <v-card color="basil" flat>
                                    <v-container >
                                        <ul class="list-group" style="list-style: none;">
                                            <li class="list-group-item" v-for="post in posts" :key="post.id">
                                            <v-card color="grey lighten-4" flat tile class="ma-6">
                                                <v-row align="center">
                                                    <v-col>
                                                        <v-container> 
                                                            <template v-if="loading">
                                                                <v-progress-linear indeterminate color="yellow darken-2"></v-progress-linear>
                                                            </template>
                                                            <v-row dense align="center">
                                                                <v-col cols="12" md="3">
                                                                    <v-avatar class="ma-2">
                                                                        <v-img :src="post.photo"></v-img>
                                                                    </v-avatar>
                                                                </v-col>
                                                                <v-col cols="12" md="9" >
                                                                    <v-row>
                                                                        <v-col cols="12" md="9">
                                                                        <v-container>
                                                                            {{post.date}}
                                                                        </v-container>
                                                                        </v-col>
                                                                        <v-col cols="12" md="3">
                                                                        <v-btn @click="viewStory(post.id)">
                                                                            <v-icon>fa-solid fa-eye</v-icon>
                                                                        </v-btn>                                                   
                                                                        </v-col>
                                                                    </v-row>
                                                                </v-col>
                                                            </v-row>
                                                            <v-row class="ma-5">
                                                                <v-container>
                                                                    <h2 style="border-margin: 10px" v-html="post.title"></h2>
                                                                </v-container>                                           
                                                                <span class="ma-6" v-html="post.content.substring(0, 100)"></span>
                                                            </v-row>
                                                        </v-container>
                                                    </v-col>                                 
                                                </v-row>
                                            </v-card>                                 
                                            </li>
                                        </ul>                     
                                    </v-container>
                                </v-card>
                            </v-tab-item>
                            <v-tab-item>
                                <v-divider></v-divider>
                                <v-card color="basil" flat>
                                    <ul class="list-group" style="list-style: none;">
                                        <li class="list-group-item" v-for="user in users" :key="user.id">
                                        <v-card color="grey lighten-4" flat tile class="ma-6">
                                            <v-row align="center">
                                                <v-col>
                                                    <v-container> 
                                                        <template v-if="loading">
                                                            <v-progress-linear indeterminate color="yellow darken-2"></v-progress-linear>
                                                        </template>
                                                        <v-row dense align="center">
                                                            <v-col cols="12" md="1">
                                                                <v-btn fab dark class="mx-2" >
                                                                    <v-avatar class="ma-2" @click="showProfile(user.id)">
                                                                        <v-img :src="user.photo"></v-img>
                                                                    </v-avatar>
                                                                </v-btn>
                                                            </v-col>
                                                             <v-col cols="12" md="2">
                                                                <v-container>
                                                                    {{user.name}}
                                                                </v-container>
                                                            </v-col>
                                                            <v-col cols="12" md="9" >
                                                                <v-row>
                                                                    <v-col cols="12" md="9">
                                                                    <v-container>
                                                                        {{user.bio}}
                                                                    </v-container>
                                                                    </v-col>
                                                                    <v-col cols="12" md="3">
                                                                        <v-col v-if="getUser.id != user.id">
                                                                            <v-btn v-if="!user.isFollow" class="ma-2" outlined color="indigo" @click="follow(user)">
                                                                                follow
                                                                            </v-btn>
                                                                            <v-btn v-else class="ma-2" outlined color="indigo" @click="unfollow(user)">
                                                                                unfollow
                                                                            </v-btn>
                                                                        </v-col>
                                                                    </v-col>
                                                                </v-row>
                                                            </v-col>
                                                        </v-row>                                                        
                                                    </v-container>
                                                </v-col>                                 
                                            </v-row>
                                        </v-card>                                 
                                        </li>
                                    </ul>   
                                </v-card>
                            </v-tab-item>
                            <v-tab-item>
                                <v-divider></v-divider>
                                <v-container>
                                <v-card color="basil" flat>
                                    <v-chip-group>
                                        <v-chip v-for="chip in topics" :key="chip.id" @click="getPostsWithTag(chip.id)">
                                            {{chip.hashtag}}
                                        </v-chip>
                                    </v-chip-group>
                                     <v-container >
                                        <ul class="list-group" style="list-style: none;">
                                            <li class="list-group-item" v-for="hashtag_post in hashtag_posts" :key="hashtag_post.id">
                                            <v-card color="grey lighten-4" flat tile class="ma-6">
                                                <v-row align="center">
                                                    <v-col>
                                                        <v-container> 
                                                            <template v-if="loading">
                                                                <v-progress-linear indeterminate color="yellow darken-2"></v-progress-linear>
                                                            </template>
                                                            <v-row dense align="center">
                                                                <v-col cols="12" md="3">
                                                                    <v-avatar class="ma-2">
                                                                        <img :src="hashtag_post.photo">
                                                                    </v-avatar>
                                                                </v-col>
                                                                <v-col cols="12" md="9" >
                                                                    <v-row>
                                                                        <v-col cols="12" md="9">
                                                                        <v-container>
                                                                            {{hashtag_post.date}}
                                                                        </v-container>
                                                                        </v-col>
                                                                        <v-col cols="12" md="3">
                                                                        <v-btn @click="viewStory(hashtag_post.id)">
                                                                            <v-icon>fa-solid fa-eye</v-icon>
                                                                        </v-btn>                                                   
                                                                        </v-col>
                                                                    </v-row>
                                                                </v-col>
                                                            </v-row>
                                                            <v-row class="ma-5">
                                                                <v-container>
                                                                    <h2 style="border-margin: 10px" v-html="hashtag_post.title"></h2>
                                                                </v-container>                                           
                                                                <span class="ma-6" v-html="hashtag_post.content.substring(0, 100)"></span>
                                                            </v-row>
                                                        </v-container>
                                                    </v-col>                                 
                                                </v-row>
                                            </v-card>                                 
                                            </li>
                                        </ul>                     
                                    </v-container>
                                </v-card>
                                </v-container>
                            </v-tab-item>
                        </v-tabs-items>
                    </v-card>
                </template>
               </v-col>                     
            </v-row>            
         </v-col>         
      </v-row>
   </v-container>
</v-app>
</template>

<script>

// import Header from '../components/Header.vue'
import SideMenu from '../components/SideMenu.vue'
import { mapGetters} from "vuex";
import router from '../router'

export default {     
   data() {      
      return {
        posts: [],
        hashtag_posts: [],
        users: [],
        topics: [],
        loading:true,
        keyword: '',
        tab: null,        
        items: [
          'Title', 'User', 'Topic',
        ],       
        content: [],
        // showFollowBtn: true,
      }
   },

   computed: {
      ...mapGetters(['getUser'])      
   },
    
   components: {
    //   Header,
      SideMenu,
      // InfiniteLoading
   },
   created(){
       this.init();
       
   },
   mounted() {
    this.$Axios.get("/api/users/me").then((user) => {         
         this.$store.dispatch('setUser', user.data);
        
    });
   },

   methods: {
       init() {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            this.keyword = urlParams.get('keyword');
        },

        viewStory(postId) {
            router.push('/view?postId='+postId);
        },

        showProfile(userId) {
            router.push('/public-profile?postUserId='+userId);
        },

        changeTab() {
        //    console.log(this.items[this.tab]);
            this.$Axios.get('/api/search/'+this.getUser.id+'/'+this.tab+'?keyword='+this.keyword).then((res) => {
                switch (this.tab){
                    case 0:
                        this.posts = res.data;break;
                    case 1:
                        this.users = res.data;break;
                    case 2:
                        this.topics = res.data;break;
                }
                
                this.loading = false;
                // console.log(res.data);
            })
        },

        follow(user) {
            const body = {
                followed_id : user.id
            }
            this.$Axios.post('http://localhost:3000/api/users/'+this.getUser.id+'/follow', body).then((res) => {                
                if (res.data.msg == 'ok') user.isFollow = true;
            });
        },

        unfollow(user) {
            this.$Axios.delete('http://localhost:3000/api/users/'+this.getUser.id+'/follow/'+user.id).then((res) => {                
                if (res.data.msg == 'delete') user.isFollow = false;
            });
        },


        getPostsWithTag(tagId) {
             this.$Axios.get('http://localhost:3000/api/post/hashtag/'+tagId).then((res) => {                         
                this.hashtag_posts = res.data;
                // console.log(this.hashtag_posts);
                this.$forceUpdate();
            });
        }
   }
}
</script>