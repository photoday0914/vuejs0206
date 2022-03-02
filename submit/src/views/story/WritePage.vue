<template>
  <v-app>
      <Header/>      
      <v-container class="ma-15" align="center">
        <v-row>
            <v-col cols="12" md="2"></v-col>
            <v-col cols="12" md="8">
              <Bubble/>
              <v-container>       
                <h1>Your Story</h1>
                <v-container>
                  <v-row>
                    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
                        <div class="d-flex">
                          <v-container>
                            <v-btn text icon :class="{ 'is-active': isActive.heading({ level: 1 }) }" @click="commands.heading({level: 1})">
                              <b> H1 </b>
                            </v-btn>
                            <v-btn text icon :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
                                <v-icon>mdi-format-bold</v-icon>
                            </v-btn>

                            <v-btn text icon :class="{ 'is-active': isActive.underline() }" @click="commands.underline">
                                <v-icon>mdi-format-underline</v-icon>
                            </v-btn>
                            <v-btn text icon @click="isTextfield=!isTextfield">
                                <v-icon>fas fa-edit</v-icon>
                            </v-btn>
                            <v-text-field v-if="isTextfield" v-model="imageUrl"></v-text-field>
                            <v-btn v-if="isTextfield" @click="loadImage(commands.image)">
                              add
                            </v-btn>
                          </v-container>
                          <v-file-input hide-input accept="image/png, image/jpeg, image/bmp" v-model="chosenfile" @change="uploadImage(commands.image)">                              
                          </v-file-input>
                        </div>
                    </editor-menu-bar>
                  </v-row>
                  <v-row>
                      <v-col cols=12 >
                          <editor-content class="editor-box" :editor="editor"/>
                      </v-col>
                  </v-row>
                  <v-row>
                    <v-container class="d-flex">
                      <v-combobox v-model="chips" :items="items" chips clearable
                        label="Add hashtags"
                        multiple
                        prepend-icon="mdi-filter-variant"
                        solo>
                        <template v-slot:selection="{ attrs, item, select, selected }">
                          <v-chip v-bind="attrs" :input-value="selected" close @click="select" @click:close="remove(item)">
                            <strong>{{ item }}</strong>&nbsp;                            
                          </v-chip>
                        </template>
                      </v-combobox>
                    </v-container>
                  </v-row>
                </v-container>
              </v-container>
            </v-col>
            <v-col cols="12" md="2"></v-col>
        </v-row>
        
        <v-container >
          <v-col align="center">
            <v-btn rounded color="primary" dark @click="postPost">
              Publish
            </v-btn>
          </v-col>
        </v-container>
      </v-container>
  </v-app>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar  } from 'tiptap';
import { Heading, 
        Bold, 
        Underline,
        Image } from 'tiptap-extensions';
import Header from '../../components/Header.vue'
import Bubble from '../../components/Bubble.vue'
import { mapGetters} from "vuex";
import router from '../../router'
// import { Heading, Underline} from 'tiptap-extensions';
export default {
  components: {
    EditorContent,
    EditorMenuBar,
    Header,
    Bubble,
  },
  data() {
    return {
      editor: null,
      isTextfield: false,
      imageUrl: '',
      chosenfile: null,
      content2:'',
      chips: [],
      items: [],
    }
  },
  mounted() {
    
    this.editor = new Editor({
        content: '',
        extensions:[
            new Heading({levels: [1,2,3]}),
            new Bold(),
            new Underline(),
            new Image(),
        ],
        onUpdate:({getHTML}) => {
          this.content2 = getHTML();
          console.log(this.content2)
        }
      })
  },
  computed: {
    ...mapGetters(['getUser', 'getStoryTitle','getStoryContent'])      
  },
  beforeUnmount() {
    this.editor.destroy()
  },
  methods: {
      loadImage:function(command){
          command({src: this.imageUrl});
          this.isTextfield = false;
      },
      async uploadImage(command) {
        const formData = new FormData();
        formData.append('image', this.chosenfile);

        try {
          const {data} = await this.$Axios.post('http://localhost:3000/api/users/upload/'.concat(this.getUser.id), formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
              }
            });
            
          command({src: data.photo});
          // this.$store.dispatch('setAvatar', data.photo)
        } catch(err) {
          console.log(err);
        }
      },

      async postPost() {
        const body = {
          title: this.getStoryTitle,
          content: this.content2,
          hashtags: this.chips
        }
        // console.log(this.chips);
        
        await this.$Axios.post('http://localhost:3000/api/posts/'.concat(this.getUser.id), body)
        router.push('/stories')
        // console.log(this.content2);
        // console.log(this.getStoryTitle);
      }
  }
}
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