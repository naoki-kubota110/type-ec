import Vue from "vue";
import Vuex from "vuex";
import firebase from 'firebase'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: false,
    user: null
  },
  mutations: {
    sideNav(state){
      state.drawer = !state.drawer
      console.log(state.drawer)
    },

    setLoginUser(state, user){
      state.user = user
      console.log(user.uid)
    },
    setLogoutUser(state){
      state.user = null
    }
  },
  
  actions: {
    sideNav({commit}){
      commit("sideNav")
    },

    setLoginUser({commit}, user){
      commit("setLoginUser", user)
    },
    login(){
      const google_auth_provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(google_auth_provider)
    },
    setLogoutUser({commit}){
      commit("setLogoutUser")
    },
    logout(){
      alert("ログアウトしますか？")
      firebase.auth().signOut()
    }
  },
  getters: {
    uid: state => state.user? state.user.uid : null,
    userName: state => state.user? state.user.displayName : null,
    photoURL: state => state.user ? state.user.photoURL : ""
  },
});
