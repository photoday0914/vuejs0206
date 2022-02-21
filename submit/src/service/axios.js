import axios from 'axios';
import VueCookies from 'vue-cookies';
import store from '../store'
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
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          await axios.post("/api/auth/refreshtoken", {
            refreshToken: store.getters.getRefreshToken,
          }).then((res) => {
            // const { accessToken } = res.data;
            const token = {
              token: res.accessToken,
              refreshToken: res.refreshToken
            }
            //set token info in Vuecookies
            store.dispatch('setToken', token);

            return axios(originalConfig);
          })
          
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  });


export default axios;