import axios from 'axios';
import VueCookies from 'vue-cookies';
import store from '../store'
import router from '../router'
// import { mapGetters } from 'vuex';
// import { refreshToken } from '../service/login'


axios.defaults.baseURL = 'http://localhost:3000';

// const instance = axios.create({
//   baseURL: 'http://localhost:3000',
//   timeout: 1000
// });

// Add a request interceptor
axios.interceptors.request.use(async function (config) {
    // Do something before request is sent
    config.headers["x-access-token"] = VueCookies.get('token');
    // config.headers.refresh_token = VueCookies.get('refresh_token');
  
    // console.log(config);
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, async function (err) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    
    const originalConfig = err.config;
    if (originalConfig.url !== "/api/auth/signin" && err.response) {
      if (err.response.status == 403) {
        store.dispatch("removeToken");
        router.push('/login');
      }   
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig.retry) {
        originalConfig.retry = true;

        // try {
          let res = await axios.post("/api/auth/refreshtoken", {
            refreshToken: store.getters.getRefreshToken,
          });
          
          // .then(async (res) => {
            // const { accessToken } = res.data;
            // console.log(res);
            const token = {
              token: res.data.accessToken,
              refreshToken: res.data.refreshToken
            }
            // // console.log(originalConfig);
            //set token info in Vuecookies
            await store.dispatch('setToken', token);
            return await axios(originalConfig) 

            // return  axios(originalConfig)
            // .then((data) => {
            //   store.dispatch('setUser', data.data);
            // }).catch((err) => {
            //   alert(err);
            // });
          // })
          
        // } catch (_error) {
        //   return Promise.reject(_error);
        // }
      }
    }
    return Promise.reject(err);
  });


export default axios;