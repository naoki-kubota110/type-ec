import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import { itemList,toppingList,cart,orders,userInfo } from "@/types";
import router from "@/router";
Vue.use(Vuex);

interface stateType {
  drawer: boolean,
  flg: boolean,
  user: any,
  items: itemList[],
  toppings: toppingList[],
  cart: cart,
  orders: orders[],
  userInfo: userInfo
}

export default new Vuex.Store({
  state: {
    drawer: false,
    flg:true,
    user: null,
    items : [],
    toppings:[],
    cart : null,
    orders:[],
    userInfo: null
  } as stateType,
  
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
    fetchItem(state,itemArray:itemList[]){
      state.items= itemArray
    },
    fetchTopping(state,toppingArray:toppingList[]){
      state.toppings  = toppingArray
    },
    fetchCart(state,cartItem){
      state.cart = cartItem
    },
    newCart(state, cartItem:cart){
      state.cart = cartItem
    },
    addCart(state,addCartItem:cart){
      state.cart = addCartItem
    },
    deleteCart(state,deleteItem:cart){
      state.cart = deleteItem
    },
    order(state,orderData:orders[]){
      state.cart = null
    },
    fetchUserInfo(state,userInfo){
      state.userInfo = userInfo
    },
    addUserInfo(state,userInfoData){
      state.userInfo = userInfoData
    },
    updateUserInfo(state, userInfoData){
      state.userInfo = userInfoData
    },
    fetchOrdered(state, orderArray){
      state.orders = orderArray
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
        const toppingArray:Array<toppingList>= []
        snapshot.forEach(topping => {
          const toppingData:toppingList = topping.data() as toppingList
          toppingArray.push(toppingData)
        })
        commit("fetchTopping", toppingArray)
      })
    },
    fetchCart({commit,getters}){
      if(getters.uid){
        firebase.firestore().collection(`users/${getters.uid}/orders`).get().then(snapshot=>{
          let cartItem = null
          snapshot.forEach(item => {
            if(item.data().status === 0){
              cartItem = item.data()
              // if(getters.orderId !== null){
              //   cartItem.orderId = getters.orderId
              // }
            }
          })
          commit("fetchCart", cartItem)
        })
      }
    },
    newCart({commit,getters,state}, cartItem:cart){
      console.log("new")
      if(getters.uid){
        firebase.firestore().collection(`users/${getters.uid}/orders`).add(cartItem).then(doc=>{
          cartItem.orderId = doc.id
          commit("newCart", cartItem)
          firebase.firestore().collection(`users/${getters.uid}/orders`).doc(`${doc.id}`).update(cartItem).then(()=>{
            console.log(cartItem)
          })
        })
      }
    },
    addCart({commit,getters},addCartItem:cart){
      console.log("add")
      if(getters.uid){
        firebase.firestore().collection(`users/${getters.uid}/orders`).doc(`${getters.orderId}`).update(addCartItem).then(() => {
          commit("addCart", addCartItem)
        })
      }
    },
    deleteCart({commit,getters}, deleteItem:cart){
      firebase.firestore().collection(`users/${getters.uid}/orders`).doc(`${getters.orderId}`).update(deleteItem).then(()=> {
        commit("deleteCart", deleteItem)
      })
    },
    order({commit, getters}, orderData:orders){
      firebase.firestore().collection(`users/${getters.uid}/orders`).doc(`${getters.orderId}`).update(orderData).then(()=> {
        commit("order", orderData)
      })
    },
    fetchUserInfo({commit,getters}){
      if(getters.uid){
        firebase.firestore().collection(`users/${getters.uid}/userInfo`).get().then(snapshot => {
          let userInfo = null
          snapshot.forEach(data => {
            userInfo = data.data()
          })
          commit("fetchUserInfo",userInfo)
        })
      }
    },
    addUserInfo({commit,getters}, userInfoData:userInfo){

        firebase.firestore().collection(`users/${getters.uid}/userInfo`).add(userInfoData).then(doc=> {
          userInfoData.id = doc.id
          console.log(userInfoData)
          commit("addUserInfo",userInfoData)
          firebase.firestore().collection(`users/${getters.uid}/userInfo`).doc(`${doc.id}`).update(userInfoData).then(()=>{
            console.log(userInfoData)
          })
        })
    },
    updateUserInfo({commit, getters}, userInfoData:userInfo){
      firebase.firestore().collection(`users/${getters.uid}/userInfo`).doc(`${getters.userInfoId}`).update(userInfoData).then(()=> {
        commit("updateUserInfo", userInfoData)
      })
    },
    fetchOrdered({commit,getters}){
      if(getters.uid){
        firebase.firestore().collection(`users/${getters.uid}/orders`).get().then(snapshot=>{
          const orderArray = []
          snapshot.forEach(order=> {
            if(order.data().status !== 0){
              orderArray.push(order.data())
            }
          })
          commit("fetchOrdered",orderArray)
        })
      }
    }
  },
  getters: {
    uid: (state) => (state.user? state.user.uid : null),
    userName: (state) => (state.user? state.user.displayName : null),
    photoURL: (state) => (state.user ? state.user.photoURL : null),
    orderId: (state) => (state.cart? state.cart.orderId : null),
    cart : (state) => (state.cart? state.cart.itemInfo : null),
    cart2: state => state.cart? state.cart: null,
    userInfo: state => state.userInfo? state.userInfo: null,
    userInfoId :state=> state.userInfo? state.userInfo.id: null
  },
});
