<template>
    <v-container :class="'ml-'+8*(commentData.comment.depth - 1)">
        <v-row>
            <v-list-item-icon>
                <v-avatar size="36">
                    <v-img :src="commentData.user.photo"></v-img>
                </v-avatar>      
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title class="text-h6">{{ commentData.user.name }}</v-list-item-title>
                <v-list-item-subtitle v-text="commentData.date"></v-list-item-subtitle>
            </v-list-item-content>
        </v-row>
        <v-row>
            <v-textarea auto-grow rows="1" readonly  solo :value="commentData.comment.content"></v-textarea>
        </v-row>
        <v-row>           
            
            <v-container class="flex">
                <!-- <v-container align="center" dense>
                    <span>Comments: {{commentData.comment.response_count}}</span>
                </v-container> -->
                <!-- <v-container> -->
                    <v-col align="right">
                    <v-btn @click="isShowWindow = !isShowWindow " >
                        <v-icon color="blue darken-2">
                        mdi-message-text
                        </v-icon>
                    </v-btn>
                    </v-col>
                <!-- </v-container> -->
            </v-container>
            <v-container v-if="isShowWindow">
                <v-textarea auto-grow rows="1" solo outlined v-model="myComment">
                </v-textarea>
                <v-row>
                    <v-col align="center">
                        <v-btn small @click="myComment=''">
                            Cancel
                        </v-btn>
                        <v-btn :disabled="isComment" small @click="createComment(post.id, commentData.comment.id, commentData.comment.depth, post.response_count)">
                            Reply
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-row>                       
    </v-container>
</template>

<script>
import { mapGetters} from "vuex";

export default ({
    name: 'Comment',
    emits: ['msg'],
    props: {
        commentData: {},
        post: {}
    },
    data() {
        return {
            isShowWindow: false,
            myComment:'',
            isComment: false,
        }
    },

    computed: {
        ...mapGetters(['getUser'])
    },

    mounted() {
        if (this.getUser.id == 0) this.isComment = true;
    },

    methods: {
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
                    this.$emit('msg', res.data.data);
                    this.myComment='';
                    this.isShowWindow = false;
                }
            })
        },

        
    }
})
</script>
