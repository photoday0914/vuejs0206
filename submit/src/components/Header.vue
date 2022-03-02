<template>
    <v-card color="grey lighten-4" flat tile>
      <v-app-bar app dark color="primary" elevate-on-scroll>        
          <v-col cols="12" md="2"></v-col>
          <v-col cols="12" md="8">
            <v-row align="center" justify="space-around"> 
              <v-col cols="12" md="3">
                <v-toolbar-title >
                  <router-link to="/dashboard" tag="div">
                    <v-btn text>
                      <h2>Medium</h2>
                    </v-btn>
                  </router-link>    
                </v-toolbar-title>
              </v-col>
              <v-col cols="12" md="3"></v-col>
               <v-col cols="12" md="3">
                <v-text-field v-if="boxshow" label="search word" hide-details="auto" @keydown.enter="searchSubmit" v-model="keyword"></v-text-field>
              </v-col>
              <v-col cols="12" md="1">
                <v-btn icon class="mr-5" @click="boxshow = !boxshow">
                  <v-icon>fas fa-search</v-icon>                  
                </v-btn>
              </v-col>             
              <v-col cols="12" md="2">
                <!-- <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon  v-bind="attrs" v-on="on">
                      <v-avatar class="ma-2">
                        <v-img :src="getUser.photo" alt="John"></v-img>
                      </v-avatar>             
                    </v-btn>                   
                  </template>
                  <v-list>
                    <v-list-item v-for="(item, index) in menuItems" :key="index">
                    <router-link :to="item.link" tag="div">
                      <v-btn text>{{item.title}}</v-btn>                     
                    </router-link>
                    </v-list-item>
                    <v-list-item>                    
                      <v-btn text @click="signout">Sign out</v-btn>
                    </v-list-item>
                  </v-list>
                </v-menu> -->
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="2"></v-col>
        
      </v-app-bar>    
    </v-card>
</template>
<script>
    import { mapGetters } from "vuex";
    import router from '../router'
    export default {
        name: "Header",
        data() {
            return {
                boxshow: 0,       
                photo: '',
                keyword:'',
                menuItems: [
                  {title:'Write a Story', link:'/write'}, 
                  {title:'Settings', link:'/profile'},
                  {title:'Your Stories', link:'/stories'},
                  // {title:'Sign out', link:'/logout'}
                ],
            }
        },
        computed: {
            ...mapGetters(["getmenuItems", "getUser"]),
        },
        mounted() {
          // console.log(this.getUser.photo)
        },
        methods: {
          searchSubmit(event)
          {
            event.preventDefault();
            if (this.keyword != '') router.push('/search?keyword='+this.keyword);
          },

          signout()
          {
            this.$store.dispatch('removeToken');
            router.push('/');
          }
        }
    };
</script>