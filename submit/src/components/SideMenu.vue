<template>
    <div id="inspire">
        <v-navigation-drawer v-model="drawer" app>
            <v-sheet class="pa-4" align="center" justify="center">
                <v-avatar class="mb-4" color="primary" size="64">
                    <v-icon x-large dark>mdi-home-city</v-icon>
                </v-avatar>                 
                <h1>Blog House</h1>
                <p><img style="width:100%" src="https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg" alt="asdf"></p>
            </v-sheet>
            <br><br><br>
            <main>
                <v-list>
                <v-list-item v-for="[icon, text, link] in links" :key="icon" color="primary darken-1">
                    <router-link :to="link" tag="div">
                        <v-btn text>
                            <v-list-item-icon color="primary darken-1" >
                                <v-icon color="primary darken-1" >{{icon}}</v-icon>
                            </v-list-item-icon>
                            {{text}}                                  
                        </v-btn>                                      
                    </router-link>                  
                </v-list-item>
            </v-list>
            </main>
            <template v-slot:append v-if="getUser.id != 0">
                <v-divider></v-divider>
                <v-sheet align="center" justify="center">
                    <v-menu bottom>
                        <template v-slot:activator="{on,attrs}">
                            <v-btn icon v-bind="attrs" v-on="on" height=48 width=48>
                                <v-img :src="getUser.photo" alt="John" height=48 width=48></v-img>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item >
                                <v-list-item-title>
                                    <router-link :to="'/profile'" tag="div">
                                        <v-btn text>Profile Setting</v-btn>
                                    </router-link>
                                </v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                                <!-- <v-list-item-title>Logout</v-list-item-title> -->
                                <v-btn text @click="signout">Logout</v-btn>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-sheet>
            </template>
        </v-navigation-drawer>        
    </div>
</template>

<script>
import {
    mdiAccountTie,
    mdiHomeAnalytics, 
    mdiPencilBoxOutline,
    mdiMessageBadge,
    mdiFormatListGroup 
} from '@mdi/js';
import { mapGetters } from "vuex";
import router from '../router'

export default {
    name: 'SideMenu',
    data: () => ({
        userLink: mdiAccountTie,
        drawer: null,
        links: [
            [mdiHomeAnalytics, 'Home', '/dashboard'],
            [mdiFormatListGroup, 'List', '/stories'],
            [mdiPencilBoxOutline, 'Write', '/write'],
            [mdiMessageBadge, 'Nofitication', '/write'],
        ],
        siteLogo: '../../asssets/logo.png',
        // googlehref: '/profile'
    }),
    computed: {
        ...mapGetters(['getUser'])
    },
    methods: {
        signout()
        {
        this.$store.dispatch('removeToken');
        router.push('/');
        }
    }
}
</script>