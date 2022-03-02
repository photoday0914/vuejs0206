import Vue from 'vue';
import VueRouter from "vue-router";
import VueCookies from 'vue-cookies'


import LandingPage from './views/LandingPage'
import LoginPage from './views/auth/LoginPage'
import RegisterPage from './views/auth/RegisterPage'
import LoginRedirectPage from './views/auth/AuthRedirectPage'
import OauthRedirectPage from './views/auth/OauthRedirectPage'
import DashboardPage from './views/DashboardPage'
import ProfilePage from './views/ProfilePage'
import WritePage from './views/story/WritePage'
import YourStoriesPage from './views/story/YourStoriesPage'
import EditPage from './views/story/EditStoryPage'
import ViewPage from './views/story/ViewStoryPage'
import SearchPage from './views/SearchPage'
import PublicProfilePage from './views/PublicProfilePage.vue'

import { refreshToken } from './service/login'

Vue.use(VueRouter);

const routes = [
  { path: '/', component: LandingPage, meta: { unauthorized : true } },
  { path: '/login', component: LoginPage, meta: { unauthorized : true } },
  { path: '/register', component: RegisterPage, meta: { unauthorized : true } },  
  { path: '/login-redirect', component: LoginRedirectPage, meta: { unauthorized : true }},
  { path: '/oauth-redirect', component: OauthRedirectPage, meta: { unauthorized : true }},
  { path: '/dashboard', component: DashboardPage, meta: { unauthorized : false }},
  { path: '/profile', component: ProfilePage, meta: { unauthorized : true }},
  { path: '/write', component: WritePage, meta: { unauthorized : true }},
  { path: '/edit', component: EditPage, meta: { unauthorized : true }},
  { path: '/view', component: ViewPage, meta: { unauthorized : true }},
  { path: '/stories', component: YourStoriesPage, meta: { unauthorized : true }},  
  { path: '/search', component: SearchPage, meta: { unauthorized : true }},
  { path: '/public-profile', component: PublicProfilePage, meta: { unauthorized : true }}
  // { path: '*', redirect: '/' }
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach( async(to, from, next) => {

  if(VueCookies.get('token')===null && VueCookies.get('refreshToken') !== null){
    await refreshToken();
  }

  if (to.matched.some(record => record.meta.unauthorized) || VueCookies.get('token')){
    return next();
  }

    alert('Please login');
    return next('/login');
})

export default router;