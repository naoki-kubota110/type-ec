import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import { itemList,toppingList,cart,orders,userInfo } from "@/types";
import router from "@/router";
Vue.use(Vuex);

interface stateType {
  drawer: boolean,
  flg: boolean,
  loading: boolean,
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
    loading: true,
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
      state.loading = false
    },
    fetchTopping(state,toppingArray:toppingList[]){
      state.toppings  = toppingArray
    },
    fetchCart(state,cartItem:cart){
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
    fetchUserInfo(state,userInfo:userInfo){
      state.userInfo = userInfo
    },
    addUserInfo(state,userInfoData:userInfo){
      state.userInfo = userInfoData
    },
    updateUserInfo(state, userInfoData:userInfo){
      state.userInfo = userInfoData
    },
    fetchOrdered(state, orderArray:orders[]){
      state.orders = orderArray
    },
    setOrdered(state, val){
      state.orders = val
    }
  },
  
  actions: {
    sideNav({commit}){
      commit("sideNav")
    },
    //ログイン・ログアウト
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
    //アイテム・トッピングの取得
    fetchItem({commit}){
      console.log("action")
      firebase.firestore().collection(`items`).get().then
      (snapshot => {
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
    //カート機能全般
    fetchCart({commit,getters}){
      // const user = firebase.auth().currentUser
        firebase.firestore().collection(`users/${getters.uid}/orders`).get().then(snapshot=>{
          let cartItem = null
          snapshot.forEach(item => {
            if(item.data().status === 0){
              cartItem = item.data()
            }
          })
          commit("fetchCart", cartItem)
        })
    },
    newCart({commit,getters,state}, cartItem:cart){
      console.log("new")
      if(getters.uid){
        firebase.firestore().collection(`users/${getters.uid}/orders`).add(cartItem).then(doc=>{
          cartItem.orderId = doc.id
          commit("newCart", cartItem)
          firebase.firestore().collection(`users/${getters.uid}/orders`).doc(`${doc.id}`).update(cartItem).then(()=>{
          })
        })
      }
    },
    addCart({commit,getters},addCartItem:cart){
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
    //注文実行
    order({commit, getters}, orderData:orders){
      firebase.firestore().collection(`users/${getters.uid}/orders`).doc(`${getters.orderId}`).update(orderData).then(()=> {
        console.log(orderData)
        commit("order", orderData)
      })
    },
    //ユーザー情報の追加、取得
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
        commit("addUserInfo",userInfoData)
        firebase.firestore().collection(`users/${getters.uid}/userInfo`).doc(`${doc.id}`).update(userInfoData).then(()=>{})
        })
    },
    updateUserInfo({commit, getters}, userInfoData:userInfo){
      firebase.firestore().collection(`users/${getters.uid}/userInfo`).doc(`${getters.userInfoId}`).update(userInfoData).then(()=> {
        commit("updateUserInfo", userInfoData)
      })
    },

    //注文履歴の表示
    fetchOrdered({commit,getters}){
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
  },
  getters: {
    uid: (state) => (state.user? state.user.uid : null),
    userName: (state) => (state.user? state.user.displayName : null),
    photoURL: (state) => (state.user ? state.user.photoURL : null),
    flg: state => state.flg,
    orderId: (state) => (state.cart? state.cart.orderId : null),
    cart : (state) => (state.cart? state.cart.itemInfo : null),
    userInfo: state => state.userInfo? state.userInfo: null,
    userInfoId :state=> state.userInfo? state.userInfo.id: null,
    orders : state => state.orders? state.orders : null
  },
});