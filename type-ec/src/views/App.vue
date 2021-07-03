<template>
  <v-app>
    <Header @sidenav="sideNav" @login="login" @logout="logout"/>
    <!-- <SideNav :userName="userName()" :photoURL="photoURL()" :uid="uid()" :drawer="drawer"/> -->
    <v-main>
      <div class="text-center" id="loading" v-if="loading">
        <Loading/>
      </div>
      <div v-else>
        <router-view/>
      </div>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue} from 'vue-property-decorator';
import Header from '../components/AppContents/Header.vue'
import Footer from '../components/AppContents/Footer.vue'
import SideNav from '../components/AppContents/SideNav.vue'
import Loading from '../components/AppContents/Loading.vue'
import firebase from 'firebase'
import { mapActions,mapGetters } from "vuex"

@Component({
  components: {
    Header,
    Footer,
    SideNav,
    Loading
  },
  methods:{
    ...mapActions(["sideNav","login","setLoginUser", "setLogoutUser","logout","fetchItem","fetchToppings"]),
     ...mapGetters(["userName","photoURL","uid"])
  },
  created(){
    this.fetchItem()
    this.fetchToppings()
    firebase.auth().onAuthStateChanged(user=> {
      if(user){
        this.setLoginUser(user)
      }else{
        this.setLogoutUser()
      }
    })
    // this.$store.dispatch("fetchCart")
    // console.log("app fetch")
  },
})
export default class App extends Vue{
  get loading():boolean{
    return this.$store.state.loading
  }
  get drawer(){
    return this.$store.state.drawer
  }
  // showSide(){
  //   this.$store.dispatch("sideNav")
  // }
}
</script>
<style>
#loading{
  margin-top:200px;
}
</style>
