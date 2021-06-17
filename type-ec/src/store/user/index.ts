import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import { itemList } from "@/types";
import router from "@/router";
Vue.use(Vuex);

interface sample {
  type: boolean
}

export default new Vuex.Store({
  state: {
    drawer: false,
    flg:true,
    user: null,
    items: [],
    toppings:[]
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
      console.log("mutations")
      state.items = itemArray
    },
    fetchTopping(state,toppingArray){
      state.toppings = toppingArray
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
      router.push("/")
    },
    setLogoutUser({commit}){
      commit("setLogoutUser")
    },
    logout(){
      alert("ログアウトしますか？")
      firebase.auth().signOut()
      router.push("/")
    },
    fetchItem({commit}){
      console.log("actions")
      firebase.firestore().collection(`items`).get().then(snapshot => {
        const itemArray :Array<itemList> = []
        snapshot.forEach(item => {
              const  itemData:itemList = item.data() as itemList
              itemArray.push(itemData)
            })
            commit("fetchItem", itemArray)
          })
    },
    fetchToppings({commit}){
      firebase.firestore().collection(`toppings`).get().then(snapshot => {
        const toppingArray = []
        snapshot.forEach(topping => {
          const toppingData = topping.data()
          toppingArray.push(toppingData)
        })
        commit("fetchTopping", toppingArray)
      })
    }
  },
  getters: {
    uid: state => state.user? state.user.uid : null,
    userName: state => state.user? state.user.displayName : null,
    photoURL: state => state.user ? state.user.photoURL : null,
  },
});
