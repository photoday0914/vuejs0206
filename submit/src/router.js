import Vue from 'vue';
import VueRouter from "vue-router";


import LandingPage from './views/LandingPage'
import LoginPage from './views/LoginPage'
import RegisterPage from './views/RegisterPage'

Vue.use(VueRouter);

const routes = [
  { path: '/', component: LandingPage },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },  
  // { path: '*', redirect: '/' }
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;