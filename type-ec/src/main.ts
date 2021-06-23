import Vue from "vue";
import App from "./views/App.vue";
import router from "./router";
import store from "./store/index";
import vuetify from './plugins/vuetify'
import firebase from 'firebase'

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyD0Psvn-R0cJyFg-nTCaZ5Ex_tR7sDopJI",
  authDomain: "typescript-780f0.firebaseapp.com",
  projectId: "typescript-780f0",
  storageBucket: "typescript-780f0.appspot.com",
  messagingSenderId: "1006395665174",
  appId: "1:1006395665174:web:bf1a02a46136dd3f443e37",
  measurementId: "G-WXHYR5FNBS"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();


new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
