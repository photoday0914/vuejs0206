import Vue from "vue";
import Vuex from "vuex";
import VueCookies from 'vue-cookies'

Vue.use(Vuex);

export default new Vuex.Store({ 
  state: {
    user: {
      id: 1,
      username: '',
      bio: '',
      email: '',
      social_notification: false,
      photo:''
    },
    menuItems: [
      {title:'Write a Story', link:'/write'}, 
      {title:'Settings', link:'/profile'},
      {title:'Your Stories', link:'/stories'},
      {title:'Sign out', link:'/logout'}
    ],
    storyTitle: '',
    storyContent: ''
  },
  mutations: {
    setStoryTitle(state, payload){
      state.storyTitle = payload;
    },
    setStoryContent(state, payload){
      state.storyContent = payload;
    },
    setUser(state, payload) {
      const buffer = {
        id: payload.id,
        username: payload.username,
        email: payload.email,
        bio: payload.bio,
        social_notification: payload.social_notification,
        photo: payload.photo
      }
      // state.user.username = payload.username;
      // state.user.bio = payload.bio;
      // state.user.email = payload.email;      
      // state.user.social_notification = payload.social_notification;
      state.user = buffer
      console.log('state.user:',state.user);
    },
    setToken(state, token) {
      VueCookies.set('token', token.token);
      VueCookies.set('refreshToken', token.refreshToken);
    },
    setAvatar(state, photo) {
      state.user.photo = photo
    },
    removeUser(state) {
      state.user = null;
    },
    removeToken() {
      VueCookies.remove('token');
      VueCookies.remove('refreshToken');
    }
  },
  actions: {
    setStoryTitle: ({commit}, payload) => {
      commit('setStoryTitle', payload);
    },
    setStoryContent: ({commit}, payload) => {
      commit('setStoryContent', payload);
    },
    setToken: ({commit}, token) => {
      commit('setToken', token);
    },
    setUser: ({commit}, payload) => {
      commit('setUser', payload);
    },
    removeUser: ({commit}) => {
      commit('removeUser');
    },
    removeToken: ({commit}) => {
      commit('removeToken');
    },
    setAvatar: ({commit}, photo) => {
      commit('setAvatar', photo)
    }
  },
  getters: {
    getStoryTitle(state){
      return state.storyTitle
    },
    getStoryContent(state){
      return state.storyContent
    },
    getUser(state) {      
      return state.user
    },
    getmenuItems(state) {
      return state.menuItems
    },
    getAccessToken(){
      return VueCookies.get('token');
    },
    getRefreshToken(){
      return VueCookies.get('refreshToken');
    }
  },
});
