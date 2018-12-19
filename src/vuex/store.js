import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const serverAddress = 'http://localhost:8088'

const state = {
    isLogin:false,
    isAdmin:'',
    userId:'',
    username:''

}

const mutations ={
    changeToLogin(state){
        state.isLogin = true;
    },
    changeToLogout(state){
        state.isLogin = false;
    }
}

export default new Vuex.Store({
    state,
    mutations
})