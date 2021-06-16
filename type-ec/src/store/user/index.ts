import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import { itemList } from "@/types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: false,
    user: null,
    items: []
  },
  mutations: {
    sideNav(state){
      state.drawer = !state.drawer
    },

    setLoginUser(state, user){
      state.user = user
    },
    setLogoutUser(state){
      state.user = null
    },
    fetchItem(state,itemArray){
      state.items = itemArray
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
    },
    fetchItem({commit}){
      console.log("actions")
      firebase.firestore().collection(`items`).get().then(snapshot => {
        const itemArray:itemList[] = []
        snapshot.forEach(item => {
              const  itemData = item.data()
              itemArray.push(itemData)
            })
            commit("fetchItem", itemArray)
          })
    }
  },
  getters: {
    uid: state => state.user? state.user.uid : null,
    userName: state => state.user? state.user.displayName : null,
    photoURL: state => state.user ? state.user.photoURL : ""
  },
});
