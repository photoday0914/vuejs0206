<template>
    <v-app>
        <Header/>
        <SideMenu/>
        <template v-if="loading">
            <v-progress-linear indeterminate color="yellow darken-2"></v-progress-linear>
        </template>
        <v-container class="ma-6">
            <v-row class="ma-8">  
                <v-col align="center" class="ma-6">            
                    <h1 style="border-margin: 10px" v-html="post.title"></h1>
                </v-col>            
            </v-row>
            <v-row align="center">
                <v-col cols="12" md="2"></v-col>
                <v-col cols="12" md="6" class="d-flex">
                    <v-avatar class="ma-2">
                        <v-img :src="post.photo"></v-img>
                    </v-avatar>
                    <v-col cols="12" md="6">   
                        <v-row class="ma-n1" align="center">                     
                            {{post.name}}
                            <!-- <v-spacer></v-spacer> -->
                            <!-- <v-col v-if="showFollowBtn">
                                <v-btn v-if="!isFollow" small class="ma-2" outlined color="indigo" @click="followAuthor(post.user_id)">
                                    follow
                                </v-btn>
                                <v-btn v-else small class="ma-2" outlined color="indigo" @click="unfollowAuthor(post.user_id)">
                                    unfollow
                                </v-btn>
                            </v-col> -->
                            <!-- <v-spacer></v-spacer> -->
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
                
                <v-col cols="12" md="7" class="ml-8">
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
                                <v-btn :disabled="isClap" @click="createClap(post.id, 0)">
                                    <v-icon color="blue darken-2">mdi-thumb-up</v-icon>                            
                                </v-btn>
                                <span class="ml-5">{{post.clap_count}}</span>
                            </v-container>
                            <v-container>
                                <v-btn @click="drawer = !drawer">
                                    <v-icon color="blue darken-2">
                                    mdi-message-text
                                    </v-icon>
                                </v-btn>
                                <span class="ml-5">{{post.response_count}}</span>
                            </v-container>
                        </v-col>
                    </v-row>
                    
                </v-col>
                <v-divider vertical></v-divider>
                <v-col cols="12" md="2">
                    <v-row align="center">
                        <v-col>
                            <v-avatar size="80" class="ma-2">
                                <v-img :src="post.photo" height="80"></v-img>                        
                            </v-avatar>                            
                        </v-col>                        
                    </v-row>
                    <v-col >
                        <v-row class="ma-n1"> <span class="black--text text-h5">{{post.name}}</span></v-row>                       
                        <v-row class="ma-n1">
                            <v-col cols="12" md="10">
                                {{post.follower_count}} followers
                            </v-col>
                        </v-row>
                        <v-row class="ma-n1">
                            <v-col cols="12">
                                {{post.bio}}
                            </v-col>
                        </v-row>
                         <v-row class="ma-n1"> 
                            
                            <v-col v-if="showFollowBtn">
                                <v-btn v-if="!isFollow" small class="ma-2" outlined color="indigo" @click="followAuthor(post.user_id)">
                                    follow
                                </v-btn>
                                <v-btn v-else small class="ma-2" outlined color="indigo" @click="unfollowAuthor(post.user_id)">
                                    unfollow
                                </v-btn>
                            </v-col>
                            <v-spacer></v-spacer>
                        </v-row>
                    </v-col>
                    <v-container>
                        <v-col>
                            <span>Related</span>
                        </v-col>
                        <v-divider></v-divider>
                    </v-container>
                </v-col>
            </v-row>            
        </v-container>
        <v-navigation-drawer v-model="drawer" temporary fixed right width="380">
            <v-list-item>
                <v-list-item-avatar>
                    <v-img :src="this.getUser.photo"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title class="text-h6">{{this.getUser.username}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-container v-if="!isComment">
                <v-textarea auto-grow label="Comment" solo outlined v-model="myComment">                   
                </v-textarea>
                <v-row>
                    <v-col align="center">
                        <v-btn small @click="removeComment()">
                            Cancel
                        </v-btn>
                        <v-btn small @click="createComment(post.id, 0, 0, post.response_count)">
                            Reply
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
            <v-divider></v-divider>

            <v-list dense>
                <v-list-item v-for="item in comments" :key="item.comment.id" link :style="'border-top: '+(item.comment.depth==1? 1 : 0)+'px solid grey'">
                    <Comment :commentData="item" :post="post" @msg="pushComment"/>                    
                    
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </v-app>
</template>

<script>
import Header from '../../components/Header.vue'
import Comment from '../../components/Comment.vue'
import SideMenu from '../../components/SideMenu.vue'
import { mapGetters} from "vuex";

export default ({
    
    data() {
        return {
            post: {},
            loading:true,
            isFollow: false,
            showFollowBtn: true,
            isClap:false,
            isComment: false,
            chips:[],
            drawer: false,
            items: [
                { title: 'Home', icon: 'mdi-view-dashboard' },
                { title: 'About', icon: 'mdi-forum' },
            ],
            myComment:'',
            comments: [],
            isShowWindow: {}
        }
    },
    mounted() {
        this.$Axios.get("/api/users/me")
        .then((res) => {
            // console.log(res);
            this.$store.dispatch('setUser', res.data);            
        }).catch((err) => {
            console.log(err);
        })    
        this.getPost();
        
    },
    computed: {
        ...mapGetters(['getUser'])
    },
    components: {
      Header,
      Comment,
        SideMenu,
   },
    methods: {
        pushComment(data) {            
            this.getComments(data.comment.post_id);
            this.$forceUpdate();
        },

        getPost() {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const postId = urlParams.get('postId');
            // const {data} = await this.$Axios.get('http://localhost:3000/api/post/'+postId);
            this.$Axios.get('http://localhost:3000/api/post/'+postId).then((data)=> {
                this.post = data.data;
                this.loading = false;
                if (this.getUser.id == 0) {
                    this.showFollowBtn = false;
                    this.isClap = true;
                    this.isComment = true;
                }
                if (this.post.user_id == this.getUser.id) this.showFollowBtn = false;
                else {
                    this.checkFollowing(this.post.user_id);
                }
                this.getHashtags(postId);
                this.checkPostClap(postId);
                this.getComments(postId);
            });
            
        },
        //"/api/users/:userId/favorites/create"
        // type==1 => comment
        createClap(postId, type) {
            const body = {
                post_id: postId,
                is_response: type
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
        //"/api/users/:userId/favorites/:postId"
        checkPostClap(postId) {
            //if post author is me, hide clap button
            if (this.post.user_id == this.getUser.id) this.isClap = true;
            else {            
                this.$Axios.get("/api/users/"+this.getUser.id+"/favorites/"+postId).then((res) => {
                    if (res.data.msg == 'exist') this.isClap = true;
                });
            }          
        },       

        async getHashtags(postId) {
            const {data} = await this.$Axios.get("http://localhost:3000/api/hashtags/post/"+postId);
            // console.log(data);
            this.chips = data;
        },

        showCommentWindow(Id) {
            if (this.isShowWindow[Id] == 'undefined' || this.isShowWindow[Id] == false) 
                this.isShowWindow[Id] = true; 
            else
                this.isShowWindow[Id] = false
            console.log(Id+': '+this.isShowWindow[Id]);
        },

        removeComment() {
            this.myComment = '';
        },
        //"/api/comment/:postId"
        createComment(postId, parentId, depth, responseCount) {
            const body = {
                parentId: parentId,
                userId: this.getUser.id,
                depth: depth,
                content: this.myComment,
                response_count: responseCount
            };
            this.$Axios.post("http://localhost:3000/api/comment/"+postId, body).then((res) => {
                    if (res.data.msg == 'ok') {
                        this.getComments(postId);
                        this.post.response_count += 1;                       
                        this.$forceUpdate();
                    }
            })
        },

        getComments(postId) {
            this.$Axios.get("/api/comment/"+postId).then((res) => {
                if (res.data.msg == "ok") {
                    this.comments=[];
                    for (let comment of res.data.data)
                    {
                        this.comments.push(comment);
                    }
                }
                // console.log(this.comments);
            });
        }
    }
})
</script>
