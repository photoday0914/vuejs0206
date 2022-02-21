import VueCookies from 'vue-cookies';
import axios from "./axios";

export async function refreshToken(){
    try{
        const token = await axios.post('/RefreshToken');
        VueCookies.set('token', token.data.data.token, '60s' );
        return token;
    }catch(err){
        return err;
    }
}