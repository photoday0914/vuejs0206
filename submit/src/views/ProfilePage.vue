 <template> 
  <v-app>
    <Header/>
    <v-container class="mt-10">      
      <v-row>
        <v-col cols="12" md="3"></v-col>
        <v-col cols="12" md="6">
          <v-row class="pa-md-4 mx-lg-auto">
            <v-col>
            <h2 style="border-bottom: 1px solid black !important">About you</h2>
            </v-col>
          </v-row>
          <v-row class="pa-md-4 mx-lg-auto">
            <v-col cols="12" md="8">
              <h2>Name</h2>
              <v-text-field :readonly="readonly1" v-model="getUser.name"></v-text-field>              
              <span class="description">Your name appears on your Profile page, as your byline, and in your responses. It is a required field.</span>
            </v-col>
            <v-col cols="12" md="4" >
              <v-col v-if="readonly1" cols="12" offset="8">
                <v-btn @click="readonly1=false;readonly2=true;readonly3=true">edit</v-btn>
              </v-col>
              <v-col v-else cols="12" offset="3">
                <v-btn @click="saveProfile()">save</v-btn>
                <v-btn @click="cancelChange()">cancel</v-btn>
              </v-col>
            </v-col>
          </v-row>
          <v-row class="pa-md-4 mx-lg-auto">
            <v-col cols="12" md="8">
              <h2>Short Bio</h2>
              <v-text-field :readonly="readonly2" v-model="getUser.bio"></v-text-field>              
              <span class="description">Your short bio appears on your Profile and next to your stories. Max 160 characters.</span>
            </v-col>
            <v-col cols="12" md="4" >
              <v-col v-if="readonly2" cols="12" offset="8">
                <v-btn @click="readonly2=false;readonly1=true;readonly3=true">edit</v-btn>
              </v-col>
              <v-col v-else cols="12" offset="3">
                <v-btn @click="saveProfile()">save</v-btn>
                <v-btn @click="cancelChange()">cancel</v-btn>
              </v-col>
            </v-col>
          </v-row>
          <v-row class="pa-md-4 mx-lg-auto">
            <v-col cols="12" md="8">
              <h2>Email</h2>
              <v-text-field :readonly="readonly3" v-model="getUser.email"></v-text-field>
              <span class="description">This is your email account.</span>
            </v-col>
            <v-col cols="12" md="4" >
              <v-col v-if="readonly3" cols="12" offset="8">
                <v-btn @click="readonly3=false;readonly1=true;readonly2=true;">edit</v-btn>
              </v-col>
              <v-col v-else cols="12" offset="3">
                <v-btn @click="saveProfile()">save</v-btn>
                <v-btn @click="cancelChange()">cancel</v-btn>
              </v-col>
            </v-col>
          </v-row>
          <v-row class="pa-md-4 mx-lg-auto">
            <v-col cols="12" md="8">
              <h2>Social Notification</h2>              
              <span class="description">Turn on social notification to get notified.</span>
            </v-col>
            <v-col cols="12" md="4" >
              <v-col cols="12" offset="8">
                <v-switch
                  v-model="getUser.social_notification"
                  flat
                  @change="saveProfile()"
                ></v-switch>
              </v-col>
            </v-col>
          </v-row>
          <v-row class="pa-md-4 mx-lg-auto">
            <v-col cols="12" md="8">
              <h2>Avatar</h2>
              <v-file-input                
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an avatar"
                prepend-icon="mdi-camera"
                label="Avatar"
                @change="selectFile"
              ></v-file-input>
              <span class="description">Upload your avatar.</span>
            </v-col>
            <v-col cols="12" md="4" >
              <v-col v-if="isSelected" cols="12" offset="8">
                <v-btn @click="uploadAvatar()">upload</v-btn>
              </v-col>              
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="3"></v-col>
      </v-row>
    </v-container>
  </v-app>

</template>

<style scoped>
  .description {
    font-size: 0.8em;
  }
</style>

<script>
  import { mapGetters, mapMutations} from "vuex";
  import Header from '../components/Header.vue'
  // import axios from "axios";
 
  export default {
    data() {
      return {
        boxshow: false,
        readonly1: true,        
        readonly2: true,
        readonly3: true,        
        switch1: true,
        isSelected: false,
        image: '',       
      }
    },
    components: {
      Header
    },
    computed: {
      ...mapGetters(['getmenuItems', 'getUser'])      
    },

    methods: {
      ...mapMutations(['setUser', 'setAvatar']),
      async saveProfile(){
        this.readonly1 = true;        
        this.readonly2 = true;
        this.readonly3 = true;        
        // const user = {
        //   username: this.username,
        //   email: this.email,
        //   bio: this.bio,
        //   social_notification: this.social_notification
        // }
        // this.setUser(user);
        
        await this.$Axios.put("http://localhost:3000/api/users/".concat(this.getUser.id), this.getUser)
        
      },

      cancelChange() {
        this.readonly1 = true;
        this.readonly2 = true;
        this.readonly3 = true;
        // console.log("getUser:".concat(this.$store.state.user.username));
        // this.username = this.getUser.username;
        // this.email = this.getUser.email;
        // this.bio = this.getUser.bio;
      },

      selectFile(file) {
        this.isSelected = true;
        this.image = file;
      },

      async uploadAvatar() {
        const formData = new FormData();
        formData.append('image', this.image);

        try {
          const {data} = await this.$Axios.post('http://localhost:3000/api/users/avatar/'.concat(this.getUser.id), formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
              }
            });
            console.log(data);
          this.$store.dispatch('setAvatar', data.photo)
        } catch(err) {
          console.log(err);
        }
      }

    },
    
    mounted() {
      this.$Axios.get("/api/users/me").then((user) => {         
         this.$store.dispatch('setUser', user.data);
      this.cancelChange()
      });
    }
  }
</script>




