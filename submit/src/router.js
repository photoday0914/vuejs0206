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
import WritePage from './views/WritePage'
import YourStoriesPage from './views/YourStoriesPage'
import EditPage from './views/EditStoryPage'
import ViewPage from './views/ViewStoryPage'

import { refreshToken } from './service/login'

Vue.use(VueRouter);

const routes = [
  { path: '/', component: LandingPage, meta: { unauthorized : true } },
  { path: '/login', component: LoginPage, meta: { unauthorized : true } },
  { path: '/register', component: RegisterPage },  
  { path: '/login-redirect', component: LoginRedirectPage, meta: { unauthorized : true }},
  { path: '/oauth-redirect', component: OauthRedirectPage, meta: { unauthorized : true }},
  { path: '/dashboard', component: DashboardPage, meta: { unauthorized : true }},
  { path: '/profile', component: ProfilePage, meta: { unauthorized : true }},
  { path: '/write', component: WritePage, meta: { unauthorized : true }},
  { path: '/edit', component: EditPage, meta: { unauthorized : true }},
  { path: '/view', component: ViewPage, meta: { unauthorized : true }},
  { path: '/stories', component: YourStoriesPage, meta: { unauthorized : true }},
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