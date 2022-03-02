<template>
    <v-container>
        <h1>Title</h1>
        <v-container>
            <bubble-menu class="grey darken-0 text-center rounded" :editor="editor1" :tippy-options="{ duration: 100 }" v-if="editor1">
                <button @click="editor1.chain().focus().toggleBold().run()" :class="{ 'is-active': editor1.isActive('bold') }">
                    <v-icon>mdi-format-bold</v-icon>
                </button>
                <button @click="editor1.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor1.isActive('italic') }">
                    <v-icon>mdi-format-italic</v-icon>
                </button>        
                
            </bubble-menu>          
            <editor-content class="editor-box" :editor="editor1" placeholder="Title"/>
        </v-container>  
    </v-container>       
</template>

<script>
import { Editor } from '@tiptap/core'
import { EditorContent, BubbleMenu  } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
// import { mapGetters, mapMutations} from "vuex";

export default {
    name: "Bubble",
    components: {
        EditorContent,        
        BubbleMenu,
       
    },
    
    data() {
        return {
            editor1: null,
            content1: ''
        }
    },
    computed: {
        
    },
    async mounted() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const postId = urlParams.get('postId')
        let title = '';
        // let postId = this.$route.query.postId
        if (postId) {
            const {data} = await this.$Axios.get('http://localhost:3000/api/post/'+postId);
            title = data.title;
            console.log('data:'+postId + ':'+title);
            this.$store.dispatch("setStoryTitle", title);
        }
        this.editor1 = new Editor({
            content:title,
            extensions: [
                StarterKit,
                
            ],
            onUpdate:() => {

            this.content1 = this.editor1.getHTML();
            this.$store.dispatch("setStoryTitle", this.content1)
            console.log(this.content1);
            
            }
        });
        
        
        
       
    }
};
</script>

<style lang="scss">
.editor-box> * {
    border-color: grey;
    border-style: solid;
    border-width: 1px;
}

.is-active{
    border-color: grey;
    border-style: solid;
    border-width: 1px;
}
/* Basic editor styles */
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }
}
</style>
