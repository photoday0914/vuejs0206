<template>
    <v-app>
        <Header/>
        <template v-if="loading">
            <v-progress-linear
                indeterminate
                color="yellow darken-2"
            ></v-progress-linear>
        </template>
        <v-container class="ma-6">
            <v-row class="ma-8">  
                <v-col align="center" class="ma-6">            
                    <h1 style="border-margin: 10px" v-html="post.title"></h1>
                </v-col>            
            </v-row>
            <v-row align="center">
                <v-col cols="12" md="2"></v-col>
                <v-col cols="12" md="8" class="d-flex">
                    <v-avatar class="ma-2">
                        <img :src="post.photo">
                    </v-avatar>
                    <v-col cols="12" md="6">   
                        <v-row class="ma-n1">                     
                            {{post.name}}
                            <v-spacer></v-spacer>
                            <v-btn v-if="!isFollow" small rounded color="grey" @click="followAuthor(post.user_id)">
                                follow
                            </v-btn>
                            <v-spacer></v-spacer>
                        </v-row>
                        <v-row class="ma-n1">
                            <v-col cols="12" md="10">
                                {{post.date}}
                            </v-col>
                        </v-row>
                    </v-col>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="2"></v-col>
                <v-col cols="12" md="8" class="ml-8">
                    <v-row>
                        <span class="ma-6" v-html="post.content"></span>
                    </v-row>
                    <v-row >
                        <v-col>
                            <v-container dense class="d-flex">
                                <v-col>
                                    <v-container>
                                        <h3>Hashtags: </h3>
                                    </v-container>
                                </v-col>
                                <v-container>
                                    <v-chip v-for="chip in chips" :key="chip" class="ma-2">
                                        {{chip}}
                                    </v-chip>
                                </v-container>
                            </v-container>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="6" class="d-flex">
                            <v-container>
                                <v-btn :disabled="isClap" @click="createClap(post.id)">
                                    <v-icon color="blue darken-2">mdi-thumb-up</v-icon>                            
                                </v-btn>
                                <span class="ml-5">{{post.clap_count}}</span>
                            </v-container>
                            <v-container>
                                <v-btn @click="createComment()">
                                    <v-icon color="blue darken-2">
                                    mdi-message-text
                                    </v-icon>
                                </v-btn>
                                <span class="ml-5">{{post.response_count}}</span>
                            </v-container>
                        </v-col>
                    </v-row>
                    
                </v-col>
                <v-col cols="12" md="2"></v-col>
            </v-row>            
        </v-container>
    </v-app>
</template>

<script>
import Header from '../components/Header.vue'
import { mapGetters} from "vuex";

export default ({
    
    data() {
        return {
            post: {},
            loading:true,
            isFollow: false,
            isClap:false,
            chips:[]
        }
    },
    mounted() {        
        this.getPost();
        
    },
    computed: {
        ...mapGetters(['getUser'])
    },
    components: {
      Header,      
   },
    methods: {
        getPost() {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const postId = urlParams.get('postId');
            // const {data} = await this.$Axios.get('http://localhost:3000/api/post/'+postId);
            this.$Axios.get('http://localhost:3000/api/post/'+postId).then((data)=> {
                this.post = data.data;
                this.loading = false;
                if (this.post.user_id == this.getUser.id) this.isFollow = true;
                else {
                    this.checkFollowing(this.post.user_id);
                }
                this.getHashtags(postId);
                this.checkClap(postId);
            });
            
        },
        //"/api/users/:userId/favorites/create"
        createClap(postId) {
            const body = {
                post_id: postId,
                is_response: 0
            }
            // console.log('http://localhost:3000/api/users/'+this.getUser.id+'/favorites/create');
            this.$Axios.post('http://localhost:3000/api/users/'+this.getUser.id+'/favorites/create', body).then((res) => {                
                if (res.data.msg == 'ok') this.post.clap_count += 1;
                this.isClap = true;
            });
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
        checkFollowing(followedId) {
            this.$Axios.get('http://localhost:3000/api/users/'+this.getUser.id+'/follow/'+followedId).then((res) => {                
                if (res.data.msg == 'exist') this.isFollow = true;
            });
        },
        //"/api/users/:userId/favorites/:postId"
        checkClap(postId) {
            //if post author is me, hide clap button
            if (this.post.user_id == this.getUser.id) this.isClap = true;
            else {            
                this.$Axios.get("/api/users/"+this.getUser.id+"/favorites/"+postId).then((res) => {
                    if (res.data.msg == 'exist') this.isClap = true;
                });
            }          
        },

        async getHashtags(postId) {
        const {data} = await this.$Axios.get("http://localhost:3000/api/hashtags/"+postId);
        console.log(data);
        this.chips = data;
      }
    }
})
</script>
