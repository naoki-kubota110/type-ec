import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import { itemList,toppingList } from "@/types";
import router from "@/router";
Vue.use(Vuex);

interface stateType {
  drawer: boolean,
  flg: boolean,
  user: any,
  items: itemList[],
  toppings: toppingList[],
  cart: any,
  orders: any,
  userInfo: any
}

export default new Vuex.Store({
  state: {
    drawer: false,
    flg:true,
    user: null,
    items : [],
    toppings:[],
    cart : "",
    orders:[],
    userInfo: ""
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
    newCart(state, cartItem){
      state.cart = cartItem
    },
    addCart(state,addCartItem){
      state.cart = addCartItem
    },
    deleteCart(state,deleteItem){
      state.cart = deleteItem
    },
    order(state,orderData){
      state.cart = ""
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
    newCart({commit,getters,state}, cartItem){
      if(getters.uid){
        firebase.firestore().collection(`users/${getters.uid}/orders`).add(cartItem).then(doc=>{
          cartItem.orderId = doc.id
          commit("newCart", cartItem)
        })
      }
    },
    addCart({commit,getters},addCartItem){
      if(getters.uid){
        firebase.firestore().collection(`users/${getters.uid}/orders`).doc(`${getters.orderId}`).update(addCartItem).then(() => {
          commit("addCart", addCartItem)
        })
      }
    },
    // fetchOrders({commit, getters}){
    //   if(getters.cart2.status === null){
    //     console.log("mis")
    //   }else{
    //   console.log("fetchorder")
    //   firebase.firestore().collection(`users/${getters.uid}/orders`).get().then(snapshot=> {
    //     const beforeOrder = ""
    //     snapshot.forEach(order => {
    //       const orderData = order.data()
    //     })
    //     console.log(this.orderData)
    //     commit("fetchOrders",this.orderData)
    //   })
    //   }
    // },
    deleteCart({commit,getters}, deleteItem){
      firebase.firestore().collection(`users/${getters.uid}/orders`).doc(`${getters.orderId}`).update(deleteItem).then(()=> {
        commit("deleteCart", deleteItem)
      })
    },
    order({commit, getters}, orderData){
      firebase.firestore().collection(`users/${getters.uid}/orders`).doc(`${getters.orderId}`).update(orderData).then(()=> {
        commit("order", orderData)
      })
    },
    addUserInfo({commit,getters}, userInfoData){

        firebase.firestore().collection(`users/${getters.uid}/userInfo`).add(userInfoData).then(doc=> {
          userInfoData.id = doc.id
          commit("addUserInfo",userInfoData)
        })
    },
    updateUserInfo({commit, getters}, userInfoData){
      firebase.firestore().collection(`users/${getters.uid}/userInfo`).doc(userInfoData.id).update(userInfoData).then(()=> {
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
    orders: state => state.orders? state.orders.reverce() : null
  },
});
